const router = require('express').Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

router.get("/users", userRoutes);
router.get("./posts", postRoutes);
router.get("./comments", commentRoutes);

module.exports = router;