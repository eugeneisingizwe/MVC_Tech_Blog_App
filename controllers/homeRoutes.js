const router = require('express').Router();
const { Post, User, Comment } = require('../models');


router.get('/', async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const postData = await Post.findAll({
        attributes:[
            "id",
            "title",
            "description",
          
        ],

      include: [
        {
          model: Comment,
          attributes: ['id', "comment_text", "user_id", "post_id"],
      include: {
        model:User,
        attributes: ["email"]
      }
        },
        {
            model: User, 
            attributes: ["email"]
        }
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// if the user isn't login, have the user login in
router.get("/signup", (req, res) => {
  res.res("signup");
})



router.get('post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne(req.params.id, {

        attributes:[
            "id",
            "content",
            "title"
  
        ],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["email"]
          }
        },
        {
            model: User, 
            attributes: ["email"]
        }
      ],
    });

    if (!postData){
      res.status(404).json({message: "No post found with this id"});
      return
    }

    const post = postData.get({ plain: true });

    res.render('singlepost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// //Get comments by id
// router.get('/postComments', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
