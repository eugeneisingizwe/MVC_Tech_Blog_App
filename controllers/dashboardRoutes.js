const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({

        where: {
            user_id: req.session.user_id
        },

        attributes:[
            "id",
            "title",
            "content",
            "created_at"
        ],
      include: [
        {
          model: Comment,
          attributes: ['id', "comment_text", "post_id", "created_at"],
          include: {
            model: User,
            attributes: ["email"]
          }
        },
        {
            model: User,
            attributes: ['email']
        }
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
        attributes: [
            "id",
            "content",
            "created_at"
        ],
      include: [
        {
          model: User,
          attributes: ["email"],
        },
        {
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_id" ],
            include: {
                include: {
                    model: User,
                    attributes: ["email"]
                }
            }
        }
      ],
    });

    const posts = postData.get({ plain: true });

    res.render("editpost", {
      ...posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;