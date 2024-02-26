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

    // Create sports
    const sports = [
      { name: 'Cricket' },
      { name: 'Football' },
      { name: 'Basketball' },
      { name: 'Tennis' },
      { name: 'Golf' },
      { name: 'Baseball' },
      { name: 'Hockey' },
      { name: 'Soccer' },
      { name: 'Rugby' },
      { name: 'Volleyball' },
      { name: 'Table Tennis' },
      { name: 'Badminton' },
      { name: 'Boxing' },
      { name: 'MMA' },
      { name: 'Wrestling' },
      { name: 'Weightlifting' },
      { name: 'Cycling' },
      { name: 'Swimming' },
      { name: 'Athletics' },
      { name: 'Gymnastics' }
    ];

    sports.forEach((sport, index) => {
      sport.sport_id = index + 1;
    });

    await Sports.insertMany(sports);
    console.log(`${sports.length} sports inserted`);

    // Create events
    const events = [
      { name: 'IPL', sport_id: 1 },
      { name: 'World Cup', sport_id: 1 },
      { name: 'Ashes', sport_id: 1 },
      { name: 'T20 World Cup', sport_id: 1 },
      { name: 'Big Bash League', sport_id: 1 },
      { name: 'Test Series', sport_id: 1 },
      { name: 'Premier League', sport_id: 2 },
      { name: 'La Liga', sport_id: 2 },
      { name: 'Serie A', sport_id: 2 },
      { name: 'Bundesliga', sport_id: 2 },
      { name: 'Ligue 1', sport_id: 2 },
      { name: 'Champions League', sport_id: 2 },
      { name: 'NBA', sport_id: 3 },
      { name: 'WNBA', sport_id: 3 },
      { name: 'FIBA', sport_id: 3 },
      { name: 'EuroLeague', sport_id: 3 },
      { name: 'NCAA', sport_id: 3 },
      { name: 'Olympics', sport_id: 3 },
      { name: 'Wimbledon', sport_id: 4 },
      { name: 'US Open', sport_id: 4 },
      { name: 'French Open', sport_id: 4 },
      { name: 'Australian Open', sport_id: 4 },
      { name: 'ATP Finals', sport_id: 4 },
      { name: 'WTA Finals', sport_id: 4 },
      { name: 'The Masters', sport_id: 5 },
      { name: 'US Open', sport_id: 5 },
      { name: 'The Open', sport_id: 5 },
      { name: 'PGA Championship', sport_id: 5 },
      { name: 'Ryder Cup', sport_id: 5 },
      { name: 'The Players Championship', sport_id: 5 },
      { name: 'World Series', sport_id: 6 },
      { name: 'All-Star Game', sport_id: 6 },
      { name: 'Home Run Derby', sport_id: 6 },
      { name: 'Spring Training', sport_id: 6 },
      { name: 'World Baseball Classic', sport_id: 6 },
      { name: 'MLB Draft', sport_id: 6 },
      { name: 'Stanley Cup', sport_id: 7 },
      { name: 'Winter Classic', sport_id: 7 },
      { name: 'NHL Draft', sport_id: 7 },
      { name: 'NHL All-Star Game', sport_id: 7 },
      { name: 'NHL Stadium Series', sport_id: 7 },
      { name: 'NHL Heritage Classic', sport_id: 7 },
      { name: 'FIFA World Cup', sport_id: 8 },
      { name: 'UEFA Champions League', sport_id: 8 },
      { name: 'UEFA Europa League', sport_id: 8 },
      { name: 'Copa America', sport_id: 8 },
      { name: 'AFC Asian Cup', sport_id: 8 },
      { name: 'CONCACAF Gold Cup', sport_id: 8 },
      { name: 'Six Nations', sport_id: 9 },
      { name: 'Rugby Championship', sport_id: 9 },
      { name: 'Super Rugby', sport_id: 9 },
      { name: 'European Rugby Champions Cup', sport_id: 9 },
      { name: 'Premiership Rugby', sport_id: 9 },
      { name: 'Currie Cup', sport_id: 9 },
      { name: 'FIVB Volleyball World Championship', sport_id: 10 },
      { name: 'Olympic Games', sport_id: 10 },
      { name: 'FIVB Volleyball', sport_id: 10 },
      { name: 'NCAA Volleyball', sport_id: 10 },
      { name: 'FIVB Beach Volleyball World Championships', sport_id: 10 },
      { name: 'NCAA Beach Volleyball', sport_id: 10 },
      { name: 'World Table Tennis Championships', sport_id: 11 },
      { name: 'ITTF World Tour', sport_id: 11 },
      { name: 'Table Tennis World Cup', sport_id: 11 },
      { name: 'Table Tennis European Championships', sport_id: 11 },
      { name: 'Table Tennis Asian Championships', sport_id: 11 },
      { name: 'Table Tennis Commonwealth Championships', sport_id: 11 },
      { name: 'All England Open Badminton Championships', sport_id: 12 },
      { name: 'BWF World Championships', sport_id: 12 },
      { name: 'BWF World Tour', sport_id: 12 },
      { name: 'BWF Super Series', sport_id: 12 },
      { name: 'BWF Grand Prix', sport_id: 12 },
      { name: 'BWF International Challenge', sport_id: 12 },
      { name: 'Floyd Mayweather Jr. vs. Manny Pacquiao', sport_id: 13 },
      { name: 'Mike Tyson vs. Evander Holyfield', sport_id: 13 },
      { name: 'Muhammad Ali vs. Joe Frazier', sport_id: 13 },
      { name: 'Sugar Ray Leonard vs. Thomas Hearns', sport_id: 13 },
      { name: 'George Foreman vs. Muhammad Ali', sport_id: 13 },
      { name: 'Mike Tyson vs. Lennox Lewis', sport_id: 13 },
      { name: 'UFC 229: Khabib vs. McGregor', sport_id: 14 },
      { name: 'UFC 202: Diaz vs. McGregor 2', sport_id: 14 },
      { name: 'UFC 100: Lesnar vs. Mir', sport_id: 14 },
      { name: 'UFC 94: St-Pierre vs. Penn 2', sport_id: 14 },
      { name: 'UFC 1: The Beginning', sport_id: 14 },
      { name: 'UFC 116: Lesnar vs. Carwin', sport_id: 14 },
      { name: 'WrestleMania III', sport_id: 15 },
      { name: 'WrestleMania X-Seven', sport_id: 15 },
      { name: 'WrestleMania 21', sport_id: 15 },
      { name: 'WrestleMania 23', sport_id: 15 },
      { name: 'WrestleMania 28', sport_id: 15 },
      { name: 'WrestleMania 30', sport_id: 15 },
      { name: 'Olympic Games', sport_id: 16 },
      { name: 'Commonwealth Games', sport_id: 16 },
      { name: 'Asian Games', sport_id: 16 },
      { name: 'Pan American Games', sport_id: 16 },
      { name: 'Mediterranean Games', sport_id: 16 },
      { name: 'African Games', sport_id: 16 },
      { name: 'Olympic Games', sport_id: 17 },
      { name: 'Commonwealth Games', sport_id: 17 },
      { name: 'Asian Games', sport_id: 17 },
      { name: 'Pan American Games', sport_id: 17 },
      { name: 'Mediterranean Games', sport_id: 17 },
      { name: 'African Games', sport_id: 17 },
      { name: 'Olympic Games', sport_id: 18 },
      { name: 'Commonwealth Games', sport_id: 18 },
      { name: 'Asian Games', sport_id: 18 },
      { name: 'Pan American Games', sport_id: 18 },
      { name: 'Mediterranean Games', sport_id: 18 },
      { name: 'African Games', sport_id: 18 },
      { name: 'Olympic Games', sport_id: 19 },
      { name: 'Commonwealth Games', sport_id: 19 },
      { name: 'Asian Games', sport_id: 19 },
      { name: 'Pan American Games', sport_id: 19 },
      { name: 'Mediterranean Games', sport_id: 19 },
      { name: 'African Games', sport_id: 19 },
      { name: 'Olympic Games', sport_id: 20 },
      { name: 'Commonwealth Games', sport_id: 20 },
      { name: 'Asian Games', sport_id: 20 },
      { name: 'Pan American Games', sport_id: 20 },
      { name: 'Mediterranean Games', sport_id: 20 },
      { name: 'African Games', sport_id: 20 }
    ];

    // Create users and add random interests in array from sports and event names
    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
        name: faker.name.findName(),
        user_id: i + 1
      });
    }

    await Users.insertMany(users);
    console.log(`${users.length} users inserted`);

    // add event_id
    events.forEach((event, index) => {
      event.event_id = index + 1;
    });

    await Events.insertMany(events);
    console.log(`${events.length} events inserted`);

    // Create posts
    const posts = [];
    for (let i = 0; i < 10000; i++) {
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
