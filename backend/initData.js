const Post = require('./models/post.model');

const loadInitData = async () => {
  const data = [
    {
      author: 'user123@example.com',
      status: 'published',
      title: 'Room for rent!',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. ',
      photo: '/images/room.jpeg',
      price: 500,
      phone: '12345678901',
      location: 'New York City, NY',
      created: '2021-08-25T08:53:14.221Z',
      updated: '2021-08-25T08:53:14.221Z',
    },{
      author: 'user123@example.com',
      status: 'published',
      title: 'Explore bonnie Scotland!',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. ',
      photo: '/images/scotland.jpeg',
      price: 4545,
      phone: '12345678901',
      location: '',
      created: '2021-06-20T08:53:14.221Z',
      updated: '2021-06-24T08:53:14.221Z',
    },{
      author: 'user123@example.com',
      status: 'published',
      title: 'House for sale!',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. ',
      photo: '/images/house.jpeg',
      price: 55500,
      phone: '12345678901',
      location: 'Seattle, WA',
      created: '2021-07-28T08:53:14.221Z',
      updated: '2021-07-28T08:53:14.221Z',
    },{
      author: 'user123@example.com',
      status: 'published',
      title: 'Car for sale',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. ',
      photo: '/images/car.jpg',
      price: 7000,
      phone: '12345678901',
      location: 'Chicago, IL',
      created: '2021-07-25T08:53:14.221Z',
      updated: '2021-07-29T08:53:14.221Z',
    },{
      author: 'user123@example.com',
      status: 'published',
      title: 'Work at Cloud9!',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. ',
      photo: '/images/superstore.jpeg',
      price: 800,
      phone: '12345678901',
      location: 'Saint Louis, MO',
      created: '2021-07-28T08:53:14.221Z',
      updated: '2021-07-30T08:53:14.221Z',
    },
  ];

  try {
    let count = await Post.countDocuments();
    if (count === 0) {
      console.log('No posts available. Test data loading');
      await Post.create(data);
      console.log('Test data has been successfully loaded');
    }
  } catch (err) {
    console.log('Could not load test data! Sorry!', err);
  }
};

module.exports = loadInitData;
