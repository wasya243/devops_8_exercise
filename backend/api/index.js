const express = require('express');

const routes = require('./routes');
const { handleError } = require('../helpers');

const router = express.Router();

router.use('/api', routes.todoRouter);
router.use(handleError);

module.exports = router;
