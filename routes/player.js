const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/create', async (req, res) => {
	if (req.body.email && req.body.username && req.body.password){
  		try{
  			password = req.body.password;
  			hashed = bcrypt.hashSync(password, 10);

  			const player = new Player({
  				username: req.body.username,
  				email: req.body.email,
  				password: hashed
  			});

  			player.save().then(data => {
  				res.redirect("http://localhost:3000/homepage");
  			}).catch(err => {
  				res.json({message: err});
  			});
  		}catch(err){
  			res.json({message: err});
  		}
  	}
});

router.post('/login', async (req, res) => {
	var username = req.body.email;
	var password = req.body.password;

	var hashed = bcrypt.hashSync(password, 10);

	Player.find({'username': username, 'password': hashed}, (err, player) => {
		if(err){
			res.json({message:err});
		}

		if(player){
			let token = jwt.sign({username: player.username}, 'cluedoSecret', {expiresIn: '1h'});
			res.json({
				message: "Success!",
				token
			});
		}
	});
});

module.exports = router;