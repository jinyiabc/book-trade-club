// const express = require('express');
// const router = express.Router();
const User = require('../models/users');
const Book = require('../models/books');
// const {google} = require('googleapis');

// let searchBook = require('google-books-search');

module.exports = function (app, passport){

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}


// Define routes.
// app.route('/')
//     .get( function(req, res) {
// 		console.log('session:',req.session);
// /*		Session {
//   cookie:
//    { path: '/',
//      _expires: null,
//      originalMaxAge: null,
//      httpOnly: true },
//   passport: { user: '5a9ed220fe6bb3ea4c52664e' } }*/
//         res.render('home', { user: req.user });
//   });

// app.get('/isAuth',function(req,res){
//
// 	if(req.isAuthenticated()){
// 		res.send({withCredentials: true});
// 	} else {
// 		res.send({withCredentials: false});
// 	}
// });



// app.route('/login')
//     .get( function(req, res){
//         res.render('login');
//   });

// app.post('/login',isLoggedIn,
//   function(req, res) {
//     res.redirect('/');
//   });
app.post('/api/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
      console.log('Is authenticate?',req.isAuthenticated());
      console.log('req.user',req.user);
        /*req.user: {
        _id: 5a9f97cdf099e98fd62437b9,
        email: '1234@1234.com',
        __v: 0,
        displayName: '',
        password: '1234' }*/
    // res.redirect('/');
	res.send({withCredentials: true, email: req.user.email})
	// res.send(true);
  });

app.post('/api/signup',
function(req, res,next) {
    const query = {email: req.body.email}
    const update = {email: req.body.email,
                    password: req.body.password,
                    displayName: req.body.displayName}
    User.findOne({email:req.body.email},function(err,user){
        if(err){return err;}
        if(!user){
            User.findOneAndUpdate(query,{$set:update},{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.
            // res.redirect('/');
			res.send({withCredentials: true, email: req.body.email});
            }).catch(next);
        } else {
            // res.send(` ${req.body.email} has alread been registered!`);
			// res.redirect('/');
			res.send(null);
        }
    });

});

// app.get('/logout',
//   function(req, res){
//     req.logout();
//     res.redirect('/');
//   });

// app.route('/profile')
//     .get(isLoggedIn, function(req, res){
//     res.render('profile', { user: req.user });
//   });

app.route('/api/allbooks')
    .get(function(req, res, next){
        // res.send('Allbooks works fine!');
		Book.find({}).then(function(books){
			res.send(books);
		}).catch(next);
    })
	.post(function(req, res, next){
		const data = [{
				"title": "wind",
				"owner": "alex",
				"requester": ""
			},
			{
				"title": "black and white",
				"owner": "bob",
				"requester": ""
			},
			{
				"title": "beat the market",
				"owner": "chenbin",
				"requester": ""
			},
			{
				"title": "onion",
				"owner": "david",
				"requester": ""
			},
			{
				"title": "ingore",
				"owner": "evan",
				"requester": ""
			}
		];
		Book.insertMany(data).then(function(result){
			res.send(result);
		})
	});


app.route('/api/mybooks')
    .get( function(req, res, next){
		const query = {"owner": 'alex'};
		Book.find(query,function(err,result){
			if(err) throw err;
			res.send(result);
		})
    })
	.post( function(req, res, next){


		const query =  {"owner":req.body.owner,
						"title":req.body.title}
		const update = {$set: {"requester":req.body.requester}}
		Book.findOneAndUpdate(query, update, {upsert: true}).then(function(){
			  Book.findOne(query).then(function(book){
		        res.send(book);
		      })
		}).catch(next);
	});

app.route('/api/mybooks/:email')
    .get( function(req, res, next){
		const query = {"owner": req.params.email};
		Book.find(query,function(err,result){
			if(err) throw err;
			res.send(result);
		})
    })
	.post( function(req, res, next){

		const query =  {"owner":req.params.email,
						"title":req.body.title}
		const update = {$set: {"requester":req.body.requester,"thumbnail":req.body.thumbnail,
		 "isTraded": req.body.isTraded,
	 	 "isApproved": false}}
		Book.findOneAndUpdate(query, update, {upsert: true}).then(function(){
			  Book.findOne(query).then(function(book){
		        res.send(book);
		      })
		}).catch(next);
	});

app.route('/api/myrequests/:email')
    .get( function(req, res, next){
		const query = {"requester": req.params.email,
						"isTraded": true,
						"isApproved": false};
		Book.find(query,function(err,result){
			if(err) throw err;
			res.send(result);
		})
    });
app.route('/api/otherRequest/:email')
    .get( function(req, res, next){
		const query = {"owner": req.params.email,
						"isTraded": true,
					    "isApproved": false};
		Book.find(query,function(err,result){
			if(err) throw err;
			res.send(result);
		})
    });

app.route('/api/otherApprovedRequest/:email')
    .get( function(req, res, next){
		const query = {"owner": req.params.email,
						"isTraded": true,
						"isApproved": true};
		Book.find(query,function(err,result){
			if(err) throw err;
			res.send(result);
		})
    });


app.route('/api/traderequest')
	.post(function(req, res, next){
		const query = {
			"owner": req.body.owner,
			"title": req.body.title
		};
		const update = {
			$set: {
				"requester": req.body.requester,
				"isTraded": true
			}
		};
		Book.findOneAndUpdate(query, update, {upsert: true}).then(function(){
			  Book.findOne(query).then(function(book){
				res.send(book);
			  })
		}).catch(next);

	});

app.route('/api/approveRequest')
	.post(function(req, res, next){
		const query = {
			"owner": req.body.owner,
			"title": req.body.title
		};
		const update = {
			$set: {
				"isApproved": true,
				"isTraded": true
			}
		};
		Book.findOneAndUpdate(query, update, {upsert: true}).then(function(){
			  Book.findOne(query).then(function(book){
				res.send(book);
			  })
		}).catch(next);

	});

app.route('/api/rejectRequest')
	.post(function(req, res, next){
		const query = {
			"owner": req.body.owner,
			"title": req.body.title
		};
		const update = {
			$set: {
				"isApproved": false,
				"isTraded": false
			}
		};
		Book.findOneAndUpdate(query, update, {upsert: true}).then(function(){
			  Book.findOne(query).then(function(book){
				res.send(book);
			  })
		}).catch(next);

	});

app.route('/api/removerequest')
	.post(function(req, res, next){
		const query = {
			"owner": req.body.owner,
			"title": req.body.title
		};
		const update = {
			$set: {
				"requester": '',
				"isTraded": false
			}
		};
		Book.findOneAndUpdate(query, update, {upsert: true}).then(function(){
			  Book.findOne(query).then(function(book){
				res.send(book);
			  })
		}).catch(next);

	});

// Delete one of mybooks
app.route('/api/mybooks/:title')
	.delete( function(req, res, next){
	const query =  {"title":req.params.title};
	Book.deleteOne(query).then(function(){
		Book.find({}).then(function(books){
			res.send(books);
		})
	}).catch(next);

});

// // Get all of mybooks.
// app.route('/mybooks/:owner')
// 	.get(function)

// Post
app.route('/api/:email/:password')
  .post(function(req,res,next){
  const query = {email:req.params.email}
  const update = { email: req.params.email,
                   password: req.params.password};
   User.findOneAndUpdate(query,{$set:update},{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.

     User.findOne(query).then(function(user){
       res.send(user);
     })
   }).catch(next);
});
// Update profile
app.route('/api/settings')
    .post(isLoggedIn,function(req, res, next){
        const query = {email:req.user.email};
        const update = {
                        // password: req.body.password,
                        city: req.body.city,
                        state: req.body.state};
        User.updateOne(query,update,{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.

          User.findOne(query).then(function(user){
            res.send(user);
          })
        }).catch(next);

    });

// Update password
app.route('/api/password')
    .post(isLoggedIn,function(req, res, next){
        const query = {email:req.user.email};
        const update = { password: req.body.newPassword};
        User.findOne(query).then(function(user){
            if(user.password === req.body.currentPassword){
                User.updateOne(query,update,{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.
                    console.log('Password has been updated.');
                    res.redirect('/profile');
                });
            } else {
                console.log('Current Password is not correct.');
                res.redirect('/login');
            }
        }).catch(next);
        // User.updateOne(query,update,{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.
        //
        //   User.findOne(query).then(function(user){
        //     res.send(user);
        //   })
        // }).catch(next);

    });
}
