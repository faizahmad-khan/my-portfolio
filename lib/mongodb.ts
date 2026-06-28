import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    return Promise.reject(
      new Error("MONGODB_URI environment variable is not set")
    );
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, {});
      global._mongoClientPromise = client.connect().catch((err) => {
        console.error("MongoDB connection failed:", err.message);
        throw err;
      });
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    client = new MongoClient(uri, {});
    clientPromise = client.connect().catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      clientPromise = null; // allow retry on next request
      throw err;
    });
  }
  return clientPromise;
}

const lazyClientPromise = {
  then: (...args: Parameters<Promise<MongoClient>["then"]>) =>
    getClientPromise().then(...args),
  catch: (...args: Parameters<Promise<MongoClient>["catch"]>) =>
    getClientPromise().catch(...args),
} as Promise<MongoClient>;

export default lazyClientPromise;
