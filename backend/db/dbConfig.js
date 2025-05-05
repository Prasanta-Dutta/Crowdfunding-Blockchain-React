import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDB = async () => {
    try {
        const response = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log(`From dbConfig page: ${response.connection.port}`);
    } catch (error) {
        console.log(`Connection Failed: ${error}`);
        process.exit(1);
    }
}

export default connectDB;

/*
    const { MongoClient } = require('mongodb');

    const uri = 'mongodb://localhost:27017';
        const client = new MongoClient(uri);

        async function connect() {
        await client.connect();
        console.log('✅ Connected');
    }

    connect();

*/

/*
    const { MongoClient } = require('mongodb');

    // ✅ Assign URI to a variable
    const uri = 'mongodb://127.0.0.1:27017';

    const client = new MongoClient(uri);

    async function connect() {
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ Connection failed:', err);
    }
    }

    connect();

*/