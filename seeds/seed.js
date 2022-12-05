const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require("./userSeeds");
const postDta = require("./postSeeds");
const commentData = require("./commeSeeds");


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await userData();
    await postDta();
    await commentData();
    process.exit(0);
  };
  
  seedDatabase();
  
