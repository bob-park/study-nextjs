import { MongoClient, MongoClientOptions } from 'mongodb';

const url = 'mongodb://study:12345@localhost:27017/forum?authSource=admin';
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// ! 개발시 모든 js 코드를 인터프리터가 읽기 때문에, 다시 실행해버림, 따라서, 개발시에는 다음과 같이 한번만 실행되도록 아래와 같이 사용함
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).

  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(url);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  client = new MongoClient(url, options);
  clientPromise = client.connect();
}

export { client };
export default clientPromise;
