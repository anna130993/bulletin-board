export const initialState = {
  posts: {
    data: [
      {
        id: '1',
        title: 'Something something',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-06-04',
        lastUpdate: '2021-06-05',
        email: 'anna.castillo@gmail.com',
        status: 'published',
        price: '$80',
        photo: 'https://images.pexels.com/photos/7664103/pexels-photo-7664103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      },
      {
        id: '2',
        title: 'Something something 2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-05-05',
        lastUpdate: '2021-05-07',
        email: 'stella.halstead@gmail.com',
        status: 'published',
        price: '$75',
        address: 'NewYorkCity',
        photo: 'https://images.pexels.com/photos/7123083/pexels-photo-7123083.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        id: '3',
        title: 'Something something 3',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-04-15',
        lastUpdate: '2021-04-21',
        email: 'isabel.halstead@gmail.com',
        status: 'published',
        price: '$90',
        tel: '123-456-789',
        photo: 'https://images.pexels.com/photos/6565123/pexels-photo-6565123.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  user: null,
};
