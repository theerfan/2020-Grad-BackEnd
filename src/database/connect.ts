import * as mongoose from 'mongoose';
import * as config from '../config/config';

const dbConfig = config.config.db.mongo;

const db = mongoose.createConnection(
    dbConfig.connectionString,
    {
        useNewUrlParser: true,
        poolSize: dbConfig.connectionPoolSize,
        // w: 1,
        // authSource: 'grad',
        // user: dbConfig.connectionUser,
        // pass: dbConfig.connectionPassword
    }
)

db.on('error', console.error.bind('connection error: '));
db.once('open', () => {
    console.log('Connection to MongoDB is established!');
});

export { db };