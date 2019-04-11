NOT WORKING
GET /users
1) respond with json containing a list of all users


0 passing (89ms)
1 failing

1) GET /users
   respond with json containing a list of all users:
 Uncaught TypeError: Cannot read property 'apply' of undefined
  at Immediate.<anonymous> (node_modules/express/lib/router/index.js:635:15)

  
var express = require('express');
var router = express.Router();

/**
 * get all users
 */
router.get('/', function (req, res, next) {
    return res.json('all users sent');
});

/**
 * Get a specific user
 */
router.get('/:id', function (req, res, next) {
    if (req.params.id === 'U001') { // just to demo
        return res.json("user U001 found");
    }
    return res.status(404).json('user not found');
});

/**
 * Add a user
 */
router.post('/', function (req, res, next) {
    let content = req.body;
    if (content.id) { //just to demo
        return res.status(201).json("user created");
    }
    return res.status(400).json('user not created');
});

module.exports = router;