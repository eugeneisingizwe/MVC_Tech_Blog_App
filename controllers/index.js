const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
dashboardRoutes = require("./dashboardRoutes");

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.unsubscribe("./", dashboardRoutes);

module.exports = router;
