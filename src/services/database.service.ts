// External dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global variables
export const collections: { twitter?: mongoDB.Collection } = {}

//Initialize connection
export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const twitterCollection: mongoDB.Collection = db.collection(process.env.TWITTER_COLLECTION_NAME!);

    collections.twitter = twitterCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${twitterCollection.collectionName}`);
}