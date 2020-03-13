import * as Router from '@koa/router';
import * as Multer from '@koa/multer';

const router = new Router();
const upload = Multer({ dest: 'images/'});

router.post(
    '/upload_profile_picture',
    upload.single('profile_picture'),
    ctx => {
        
    }
);