const bcrypt = require('bcrypt');
require('dotenv').config();

let usersData = [
  {
    id: 1,
    name: "Mike",
    email: "mdismatsek@brainstation.io",
    password: "password",
  },
  {
    id: 2,
    name: "Nolan",
    email: "nknill@brainstation.io",
    password: "password"
  }
];

usersData = usersData.map(user => ({
  ...user,
  password: bcrypt.hashSync(
    user.password, 
    Number(process.env.BCRYPT_SALT_ROUNDS)
  )
}));

const postsData = [
  {
    user_id: 1,
    title: "Knex is so much fun!",
    content: "It's true"
  },
  {
    user_id: 2,
    title: "The Night King ain't nothing",
    content: "Yup"
  },
  {
    user_id: 2,
    title: "Zombies are cool",
    content: "Way cooler than the direction TWD went"
  },
  {
    user_id: 1,
    title: "The empire did nothing wrong",
    content: "Palpatine was just trying to bring order to the galaxy"
  },
  {
    user_id: 1,
    title: "SkyDome > Rogers Centre",
    content: "It will always be the SkyDome to me"
  },
  {
    user_id: 2,
    title: "Hamilton isn't so bad!",
    content: "Seriously!"
  },
  {
    user_id: 2,
    title: "Blockchain",
    content: "That's it, that's the post"
  }
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del();
  await knex('user').insert(usersData);
  await knex('post').del();
  await knex('post').insert(postsData);
};
