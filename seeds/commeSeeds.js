
const {Comment} =require("../models");

const commentData = [{

  
    comment_text: "I love node.js",
    user_id: 1,
    post_id: 1
  },
  {
      comment_text: "I love OOP",
      user_id: 2,
      post_id: 2
    },
    {
      comment_text: "I JavaScript",
      user_id: 3,
      post_id: 3
    }

];

const seedsCommnets = () => Comment.bulkCreate(commentData);

module.exports = seedsCommnets;
