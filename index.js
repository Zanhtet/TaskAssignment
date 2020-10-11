const express = require("express");
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(session({secret: 'test'}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/clientApp/public'));

app.get('/index', (req, res) => {
    if (req.session.username != 'admin') {
        res.redirect('/login');
    } else {
        res.sendFile(__dirname + '/clientApp/index.html');
    }    
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/clientApp/login.html');
});

app.post('/login', (req, res) => {
    if (req.body.username == 'admin' && req.body.password == 'admin'){
        req.session.username = req.body.username;
        res.redirect('/index');
    } else {
        res.send('Password is wrong')
    }
    console.log(req.session);
})

app.listen(9001);
console.log("Application is running on Port 9001");
