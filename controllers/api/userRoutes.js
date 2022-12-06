const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all users and JOIN with post, and comment data
      const userData = await User.findAll({
          attributes: { exclude: ["[password]"]}

      });

      if (!userData){
        res.status(404).json({message: "No users found with this id!"});
        return;
      }

      res.status(200).json(userData);
  
    } catch (err) {
      res.status(500).json(err);
    }
  });



  router.get('/:id', async (req, res) => {
    try {
      // Get users by their id and JOIN with user, and commenet data 
      const userData = await User.findByPk(req.body, {

        attributes: {exclude: ["password"]},
        where: {
          id:req.params.id
        },

      include: [{
        model: Post, 
        attributes: [
            "id",
            "title",
            "content",
            "created_at"
        ]
    },
  
        {
          model: Comment,
          attributes: ['id', "comment_text", "created_id"],
      include: {
        model:Post,
        attributes: ["title"]
      }
    },
    {
        model: Post,
        attributes: ["title"],
    }
       
      ],
    });
         if (!userData){
            res.status(404).json({message:"No user found with this id"});
            return;
         }
         res.json(userData);

    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/", async (req, res) => {
    try {
      const userData = await User.create({
        where: {
          email: req.body.email,
          password: req.password
        }
      })
      req.session.save(() => {

        req.session.user_id = data.id;
        req.session.email = data.email;
        req.session.loggedIn = true;

        res.json(userData);
      })

    } catch (err) {
      
      res.status(00).json(err)
    }
  })


  // router.post("/", withAuth, (req, res) => {
  //   User.create({
  //   email: req.body.email,
  //   password: req.password

  //   })

  //   }).then(data => {
  //       req.session.save(() => {

  //           req.session.user_id = data.id;
  //           req.session.email = data.email;
  //           req.session.loggedIn = true;

  //           res.json(data);
  //       });

  //     })
   
  //   .catch(err => {
  //       console.log(err)
  //       res.status(500).json(err);
  //   });

    
    router.post('/login', async (req, res) => {
        try {
          const userData = await User.findOne({ where: { email: req.body.email } });
      
          if (!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again' });
            return;
          }
      
          const validPassword = await userData.checkPassword(req.body.password);
      
          if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again' });
            return;
          }
      
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
          });
      
        } catch (err) {
          res.status(400).json(err);
        }
      });

      router.post('/logout', (req, res) => {
        if (req.session.logged_in) {
          req.session.destroy(() => {
            res.status(204).end();
          });
        } else {
          res.status(404).end();
        }
      });




  router.put('/:id', withAuth, async(req, res) => {
    // update a user's name by its `id` value
  
    try {
      const userData = await User.update(req.body, {
        individualHooks: true,
        where: {
          id:req.params.id
        },
      });
  
      if (!userData ){
        res.status(404).json({message: "No post found with this id!"});
        return;
      }
  
      res.status(200).json(userData);
      
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;