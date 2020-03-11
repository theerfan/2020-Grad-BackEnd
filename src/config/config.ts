import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    db: {
        mongo: {
            connectionString: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/alumni',
            connectionPoolSize: Number(process.env.MONGO_CONNECTION_POOL_SIZE) || 5
        }
    },
    oauth: {
        aut: {
            baseUrl: process.env.OAUTH_AUT_BASE_URL || 'https://account.aut.ac.ir/',
            redirectUri: process.env.OAUTH_AUT_REDIRECT_URI || "http://95.ceit.aut.ac.ir",
            clientID: process.env.OAUTH_AUT_CLIENT_ID || "client-id",
            clientSecret: process.env.OAUTH_AUT_CLIENT_SECRET || "client-secret",
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET || "THIS IS A TEMPORARY SECRET",
        expirePeriod: Number(process.env.JWT_EXPIRE_PERIOD || 86400)
    },
    upload: {
        multer: {
            upload_dir: process.env.UPLOAD_DIR || "/storage",
        },
        staticUrl: process.env.STATIC_URL || "https://static.95.ceit.aut.ac.ir/",
    },
    adminBasicAuthConfig: {
        username: process.env.ADMIN_BASIC_AUTH_USERNAME || 'admin',
        password: process.env.ADMIN_BASIC_AUTH_PASSWORD|| 'admin'
    }
};
