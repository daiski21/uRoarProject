var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    items = require('../model/items'),
    comment = require('../model/comment'),
    methodOverride = require('method-override');

var date = new Date();
var getDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
//


router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
      }
}))


router.get('/', function(req, res, next) {
    if(req.user){   
          mongoose.model('items').find({}, function (err, items) {
              if (err) {
                  return console.error(err);
              } else {  
                  res.format({  
                    html: function(){
                        res.render('index', {
                              user: req.user,
                              title: 'All my workouts',
                              "items" : items,
                              alertMessage: req.flash('alertMessage')
                        });
                    }
                });
              }     
         });
        
    }
    else{
      res.redirect('/auth/login')
    }    
});
router.post('/', function(req, res){
  
});
router.get('/me', function(req, res, next) {
    if(req.user){   
          mongoose.model('items').find({}, function (err, items) {
              if (err) {
                  return console.error(err);
              } else {  
                  res.format({  
                    html: function(){
                        res.render('me', {
                              user: req.user,
                              title: 'All my workouts',
                              "items" : items,
                              alertMessage: req.flash('alertMessage')
                        });
                    }
                });
              }     
         });
        
    }
    else{
      res.redirect('/auth/login')
    }    
});

router.post('/newcomment', function(req, res) {
        var comment = req.body.comment;
        var user = req.user.username;
        var date = getDate;
        var name = req.item.name;


        mongoose.model('comment').create({
            comment : comment,
            user : req.user.username,
            date : date,
            name : req.item.name,

        }, function (err, items, count) {
              if (err) {
                  req.flash('alertMessage', 'You must fill up the name and steps input boxes. Thank you.');
                  res.redirect('/#');
                 
              } else {  console.log('POST creating new comment: ' + comment);
                res.format({   
                    html: function(){
                        res.location("comment");
                        res.redirect("/");
                    }
                });
               
              }
        })
});

router.post('/new', function(req, res) {
        var name = req.body.item_name;
        var image = req.body.image;
        var description = req.body.description;
        var category = req.body.category;
        var price = req.body.price;
        var number = req.user.number;
        var user = req.user.username;
        var date = getDate;
        var updated = getDate;


        mongoose.model('items').create({
            name : name,
            image : image,
            description : description,
            category : category,
            price : price,
            number : req.user.number,
            user : req.user.username,
            date : date,

        }, function (err, items, count) {
              if (err) {
                  req.flash('alertMessage', 'You must fill up the name and steps input boxes. Thank you.');
                  res.redirect('/#price-section');
                 
              } else {  console.log('POST creating new item: ' + items);
                res.format({   
                    html: function(){
                        res.location("items");
                        res.redirect("/");
                    }
                });
               
              }
        })
});


router.param('id', function(req, res, next, id) {
    mongoose.model('items').findById(id, function (err, item) {
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
    
        } else {
            req.id = id;
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('items').findById(req.id, function (err, item) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
        mongoose.model('comment').findById(req.id, function (err, item) {
          if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
          } else {
            console.log('GET Retrieving ID: ' + comment._id); 
              res.format({
                html: function(){
                    res.render('show', {
                      user: req.user,
                      "item" : item,
                      "comment" : comment,

                    });
                },
              });
          }
        });  
      } else {
        console.log('GET Retrieving ID: ' + item._id); 
          res.format({
            html: function(){
                res.render('show', {
                  user: req.user,
                  "item" : item,
                  "comment" : comment,

                });
            },
          });
      }
    });

  });

  
    
 
router.route('/:id/edit')
  .get(function(req, res) {
      mongoose.model('items').findById(req.id, function (err, item) {
          if (err) {
              console.log('GET Error: There was a problem retrieving: ' + err);
          } else {
              console.log('GET Retrieving ID: ' + item._id);
              res.format({
                  html: function(){
                         res.render('edit', {
                            user: req.user,
                            title: 'item' + item._id,
                            "item" : item,
                            alertMessage: req.flash('alertMessage')
                        });
                   }
              });
          }
      });
  })

  .put(function(req, res) {
      var name = req.body.item_name;
	    var image = req.body.image;
	    var description = req.body.description;
	    var category = req.body.category;
	    var price = req.body.price;
	    var updated = getDate;

      mongoose.model('items').findById(req.id, function (err, item) {
          item.update({
              name : name,
	            image : image,
	            description : description,
	            category : category,
	            price : price,
	            updated : updated,

          }, function (err, itemID, count) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            } 
            else {
                   
                    res.format({
                        html: function(){
                             res.redirect("/me");
                       }
                    });
             }
          })
      });
  })

  .delete(function (req, res, count){
      mongoose.model('items').findById(req.id, function (err, item) {
          
              item.remove(function (err, item ) {
                  if (err) {
                      return console.error(err);
                  } else {
                      console.log('DELETE removing ID: ' + item._id);
                      res.send('Contact removed');
                  }
              });
          
      });
  });
module.exports = router;