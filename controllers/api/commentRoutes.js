const router = require('express').Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get('/', async (req, res) => {
  try {
    // Get all comments 
    const commentData = await Comment.findAll({});

    if (!commentData){
        res.status(404).json({message: "No comment found with this id!"});
        return;
    }
 res.status(200).json(commentData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk({
        where: {
            id: req.params.id
        }
    });

    if (!commentData) {
        res.status(404).json({message: "No comment found with this id!"});
        return;
        
    }

    res.status(200).json(commentData);


  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.post('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const commentData = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.body.user_id,
    })
    
    
    if (!commentData) {
        res.status(404).json({message: "No comment posted with this id!"});
        return;
    }

    res.status(200).json(commentData);


  } catch (err) {
    res.status(500).json(err);
  }
});


router.put("./id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update({comment_text: req.body.comment_text},
            {
                where: {
                    id: req.params.id
                }
        })

        if (!commentData){
            res.status(404).json({message: "No comment posted with this id!"});
        return;
        }
        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("./", withAuth, async (req, res) => {
    try {
          
    const commentData = await Comment.destroy({
        where: {
            id: req.params.id
        }
    })

    if (!commentData){
        res.status(404).json({message: "No comment founded with this id!"});
        return;
    }

    res.status(200).json(commentData);
        
    } catch (err) {
        res.status(500).json(err);
    }
  
});

module.exports = router;