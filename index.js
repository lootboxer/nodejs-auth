var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var db = require('./db');
require('hbs');

passport.use(new LocalStrategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));
  
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(session({
  secret: 'This is very improvement random',
  resave:false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week
}));
app.use(require('morgan')('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(passport.session())
const fs = require('fs');
var imagesList = fs.readdirSync(require('path').join(__dirname,'public','images'));

app.get('/', isAuths, (req,res)=>{
  res.render('home', { user: req.user, images: imagesList })
});
function isAuths(req, res, next){
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}
app.post('/login', passport.authenticate('local',
{
          successRedirect: '/', 
          failureRedirect:'/login'
        })
)
app.get('/login',
  function(req, res) {
    res.render('login');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));