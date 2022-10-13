const BREED = require('../models/breed.js');


exports.CreateBreed = (req, res) => {
	const MY_BREED = new BREED({
		name: req.body.name,
		racee: req.body.racee,

	}).save(err => {
		if(err)
			return res.status(406).json(err);

		/* Success */
		res.status(201).json({ message: "breeed  created" });
	});
};
exports.GetBreeds = (req, res) => {
	BREED.find()
		 .populate('breed')
		 .sort([['name', 'ascending']])
		 .exec((err, breeds) => {
			 if(err)
				 return res.status(406).json(err);

			 res.status(200).json(breeds);
		 });
};
exports.GetBreed = (req, res) => {
	BREED.findById(req.query.id, (err, breed) => {
		if(err)
			return res.status(404).json(err);

		res.status(200).json(breed);
	});
};

exports.UpdateBreeed = (req, res) => {
	BREED.findByIdAndUpdate(req.body.id, {
		_id: req.body.id,
		name: req.body.name
	}, err => {
		if(err)
			return res.status(406).json(err);

		res.status(201).json({ message: "breed  up" });
	});
};

exports.Deletebreed = (req, res) => {
	BREED.findByIdAndRemove(req.query.id, err => {
		if(err)
			return res.status(406).json(err);

		res.sendStatus(200);
	});
};
