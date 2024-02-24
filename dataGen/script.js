const { MongoClient } = require('mongodb');
const faker = require('faker');
require('dotenv').config();

const { MONGO_URI: uri } = process.env;

(async () => {
  try {
    const dbClient = await MongoClient.connect(uri, {
      serverApi: { version: '1' }
    });

    const db = dbClient.db('leaguex');

    const Users = db.collection('users');
    const Sports = db.collection('sports');
    const Events = db.collection('events');
    const Posts = db.collection('posts');

    // Drop existing collections (optional)
    await Users.drop();
    await Sports.drop();
    await Events.drop();
    await Posts.drop();

    console.log('Collections dropped');

    // Create users
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.name.findName(),
        interests: faker.random.arrayElements([1, 2, 3, 4], 2),
        user_id: i + 1
      });
    }

    await Users.insertMany(users);
    console.log(`${users.length} users inserted`);

    // Create sports
    const sports = [
      { name: 'Cricket' },
      { name: 'Football' },
      { name: 'Basketball' }
      // Add more sports as needed
    ];

    await Sports.insertMany(sports);
    console.log(`${sports.length} sports inserted`);

    // Create events
    const events = [
      { name: 'IPL', sport_id: 1 },
      { name: 'World Cup', sport_id: 1 },
      { name: 'Test Series', sport_id: 1 },
      { name: 'Premier League', sport_id: 2 },
      { name: 'Champions League', sport_id: 2 },
      { name: 'NBA', sport_id: 3 }
      // Add more events as needed
    ];

    await Events.insertMany(events);
    console.log(`${events.length} events inserted`);

    // Create posts
    const posts = [];
    for (let i = 0; i < 1000; i++) {
      posts.push({
        text: faker.lorem.sentence(),
        sport_id: faker.random.arrayElement([1, 2, 3]),
        event_id: faker.random.arrayElement([1, 2, 3, 4, 5, 6, 17]),
        comments: faker.datatype.number(10),
        likes: faker.datatype.number(50),
        user_id: faker.random.arrayElement(users.map((user) => user.user_id))
      });
    }

    await Posts.insertMany(posts);
    console.log(`${posts.length} posts inserted`);

    await dbClient.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error(error);
  }
})();
