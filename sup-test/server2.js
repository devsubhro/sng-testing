/****
 * a dummy server for tester 1
 * see https://hackernoon.com/api-testing-using-supertest-1f830ce838f1
 */
const express = require('express');
const body_parser = require('body-parser');
const req_parser = body_parser.json();

const app = express();
app.use(req_parser);

/**
 * get all users
 */
app.get('/users', function (req, res, next) {
    return res.json('all users sent');
});

/**
 * Get a specific user
 */
app.get('/user/:id', function (req, res, next) {
    if (req.params.id === 'U001') { // just to demo
        return res.json("user U001 found");
    }
    return res.status(404).json('user not found');
});

/**
 * Add a user
 */
app.post('/user/new', function (req, res, next) {
    let content = req.body;
    if (content.id) { //just to demo
        return res.status(201).json("user created");
    }
    return res.status(400).json('user not created');
});
/*****
 * no need to export this code. We will use agent to open a connection to the running server
 */
app.listen(3333);
