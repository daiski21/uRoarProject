var passport = require('passport');
var User = require('../model/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/register')
  .post(function(req, res, next) {
    User.register(new User({username: req.body.username,email: req.body.email,fname: req.body.fname,lname: req.body.lname,number: req.body.number}), req.body.password, function(err, account) {
      if(err) {
        req.flash('alertMessage', 'Invalid username or email address!');
        return res.redirect('/auth/login');
        //return res.render('register', {account: account});
        //return res.send("Somethings wrong with your Username or Email. Username must be 8-15 characters and you must use appropriate email address.");
      }

      req.login(account, function(err) {
        res.redirect('/');
      });
    })
  })

router.get('/login', function(req, res, next) {
  if(req.user){
    res.redirect('/');
  }
  else{
    res.render('login', {user: req.user,  alertMessage: req.flash('alertMessage')});
  }
});


router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
        if(!err){
            if(!user){
                req.flash('alertMessage', 'Invalid username or password!');
                res.redirect('/auth/login#login');
            }
            else{
                req.logIn(user, function(err) {
                    if(!err){
                        res.redirect('/');
                    }
                    else{
                        res.end(err);
                    }
                })
            }
        }
       
    })(req, res, next);
});

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;