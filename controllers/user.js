const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Type = require('../models/type.js');

exports.GetUser = (req, res) => {
	User.findById(req.query.id).exec((err, user) => {
		if(err)
			return res.status(401).json(err);

		if(user == null)
			return res.status(404).json({ error: "User doesn't exists" });

		/* Success */
		res.status(200).json({
			msg: 'User Exists',
			username: user.username,
			type: user.type,
			fullName: user.fullName,
			branchOffice: user.branchOffice
		});
	});
};
exports.Login = (req, res) => {
	User.findOne({ username: req.body.username })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "user not find" });
			}
			bcrypt
				.compare(req.body.password,user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "user wrong password" });
					}
					console.log(valid,"valideee");
					const ACCESS_TOKEN = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
					res.status(200).json({
						msg: 'LogIn Success',
						user: {
							_id: user._id,
							username: user.username,
							type: user.type
						},
						accessToken: ACCESS_TOKEN
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
exports.Signup = (req, res) => {
	const MY_TYPE = new Type({ name: req.body.type });
	bcrypt.hash(req.body.password, 10).then((hash) => {
			const user = new User({
				username: req.body.username,
				type: MY_TYPE,
				password: hash,
				fullName: req.body.fullName,
				branchOffice: req.body.branchOffice
			});
			user.save().then(() => {
					res.status(201).json({ message: "user created" });
				}).catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
exports.Update = (req, res) => {
	bcryptjs.hash(req.body.password, 10, (err, hashed_password) => {
		if(err)
			return res.status(406).json(err);

		/* Success */
		const MY_TYPE = new Type({ name: req.body.type });

		User.findByIdAndUpdate(req.body.id, {
			_id: req.body.id,
			username: req.body.username,
			password: hashed_password,
			type: MY_TYPE,
			fullName: req.body.fullName,
			branchOffice: req.body.branchOffice
		}, err => {
			if(err)
				return res.status(406).json(err);

			/* Success */
			res.sendStatus(201);
		});
	});
};
exports.GetUsers = (req, res, next) => {
	User.find()
		.populate('user')
		.exec((err, users) => {
			if(err)
				return res.status(406).json(err);

			/* Success */
			res.status(200).json(users);
		});
};
exports.Delete = (req, res) => {
	if(req.body.type === 'admin')
		return res.status(406).json({ msg: "Can't remove admin user" });

	User.findByIdAndRemove(req.body.id, (err) => {
		if(err)
			return res.status(406).json(err);

		/* Success */
		res.sendStatus(200);
	});
};
