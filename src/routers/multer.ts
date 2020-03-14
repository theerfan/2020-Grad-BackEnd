import * as Router from '@koa/router';
import * as Multer from '@koa/multer';
import * as fsPath from 'path';
import { ImageModel } from '../models/image.model';
import { AutUserModel } from '../models/autUser.model';
import { unlink } from 'fs';

const generateFileName = (file: Multer.File) => {
    const randStr = Math.random().toString(36).substr(2, 5);
    return Date.now() + randStr + fsPath.extname(file.originalname);
}

const storage = Multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'images/')
    },
    filename(req, file, callback) {
        callback(null, generateFileName(file))
    }
})


export const router = new Router();
const upload = Multer({
    // dest: 'images/',
    storage,
    fileFilter: (req, file, callback) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(fsPath.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return callback(null, true);
        }
        callback(new Error("file extension not supported!"), false);
    }
});

router.post(
    '/upload_profile_picture',
    upload.single('picture'),
    async (ctx) => {

        const studentNumber = ctx.request.body.studentNumber;
        const user = await AutUserModel.findOne({ studentNumber });
        const path = ctx.file.path;
        if (user) {
            const previousPic = await ImageModel.findById(user.profilePicture);
            if (previousPic) {
                unlink(previousPic.path, () => {
                    console.log("Successfully deleted old file.");
                });
                previousPic.path = path;
                ctx.status = 200;
                ctx.message = "Successfully changed image";
            }
            else {
                const newPic = await ImageModel.create({ path });
                user.profilePicture = newPic._id;
                await user.save();
                ctx.status = 200;
                ctx.message = "Successfully added image";
            }
        }
        else {
            ctx.status = 401;
            ctx.message = "User doesn't exist.";
        }

    }
);

router.post(
    '/upload_images',
    upload.fields([
        {
            name: 'comment_pics',
            maxCount: 4
        },
    ]),
    async (ctx) => {
        const res = [];
        const files = (ctx.files as any).comment_pics;
        for (const file of files)
        {
            const path = file.path;
            await ImageModel.create({ path });
            res.push(path);
        }
        ctx.status = 200;
        ctx.response.body = res;
    }
)