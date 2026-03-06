const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const c of collections) {
    await c.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});