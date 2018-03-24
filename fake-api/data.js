const faker = require('faker');

module.exports = () => {
  const data = {};

  /* Test fake data */
  data.test = {
    expand: 'rendredFilelds,names,schema',
    id: faker.random.number.toString(),
    key: `JICHIBA-${faker.random.number}`,
    fields: {
      [`custom_field_${faker.random.number}`]: null,
      [`custom_field_${faker.random.number}`]: '<h1>Hello</h1>',
    },
    issuedLinks: [
      {
        id: 1,
        name: faker.name.title,
      },
      {
        id: 2,
        name: 'a',
      },
    ],
  };

  return data;
};
