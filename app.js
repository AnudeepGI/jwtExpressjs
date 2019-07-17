const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();


app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    console.log(req.token);
    jwt.verify(req.token, 'sercreatkey', (err, authData) => {
        console.log(err);
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                msg: 'post',
                authData
            })
        }
    });
    res.json({
        message: 'post created'
    });
});

app.post('/api/login', (req, res) => {
    // res.json({
    //     message: 'post created'
    // });




    const user = {
        id: 1,
        username: 'brand',
        email: 'brand@gmail.com'
    }

    jwt.sign({ user }, 'sercreatkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        })
    });
});

//Format Of Token 
// Authoriztion : Bearer <access_token>



function verifyToken(req, res, next) {
    const bearerHeader = req.get('authorization');
    if (typeof bearerHeader !== 'undefined') {
        //slipt at space

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


app.listen(5000, () => console.log("Severrrrrrrr"));
