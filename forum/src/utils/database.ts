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

// * js 에서 좀 늦게 처리되는 코드는 선언하여 기다리지 않고 처리하게 할 수 있음
// * 근데 `await` 키워드를 붙이면 실행을 기달림
// * Promise<T> 가 선언된 녀석만 가능
async function findAll(dbName: string, collectionName: string) {
  return (await clientPromise)
    .db(dbName)
    .collection(collectionName)
    .find()
    .toArray();
}

export { findAll };
export default clientPromise;
