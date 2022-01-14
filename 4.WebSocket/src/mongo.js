//@ts-check

const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://<id>:<password>@cluster0.mvd9u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  await client.connect();

  const users = client.db('fc21').collection('users');
  await users.deleteMany({});
  await users.insertMany([
    {
      name: 'Foo',
    },
    {
      name: 'Bar',
    },
    {
      name: 'Baz',
    },
  ]);
  const cursor = users.find({});
  await cursor.forEach(console.log);
  await client.close();
}

main();
