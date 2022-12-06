const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all post and JOIN with user, and comment data
      const postData = await Post.findAll({
          attributes:[
              "id",
              "title",
              "description",
             
          ],

          order: [
            ["description", "DESC"]
          ],

          include: [{
            model: User,
            attributes: ["email"]
          },
  
          {
            model: Comment,
            attributes: ['id', "comment_text", "user_id", "post_id"],
        include: {
          model:User,
          attributes: ["email"]
        }
          }
       
        ]
      });
      if (!postData){
        res.status(404).json({message: "No post found with this id!"});
        return;
      }

      res.status(200).json(postData);
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      // Get all post and JOIN with user, and commenet data 
      const postData = await Post.findByPk(req.body, {
        where: {
          id:req.params.id
        },

    attributes: [
        "id", 
        "description"
        
    ],

      include: [{
        model: User, 
        attributes: ["email"]
    },
  
        {
          model: Comment,
          attributes: ['id', "comment_text", "user_id", "post_id"],
      include: {
        model:User,
        attributes: ["email"]
      }
        
    },
       
      ],
    });
         if (!postData){
            res.status(404).json({message:"No post found with this id"});
            return;
         }
         res.json(postData);

    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id

    }).then((postData) => res.json(postData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
  }); 



  router.put('/:id', withAuth, async(req, res) => {
    // update a post's name by its `id` value
  
    try {
      const postDta = await Post.update(req.body, {
        where: {
          id:req.params.id
        },
      });
  
      if (!postDta ){
        res.status(404).json({message: "No post found with this id!"});
        return;
      }
  
      res.status(200).json(postDta);
      
    } catch (error) {
      res.status(500).json(err);
    }
  });
  

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;