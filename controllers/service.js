const SERVICE = require('../models/service.js');


exports.GetServices = (req, res) => {
    SERVICE.find()
        .populate('service')
        .exec((err, services) => {
            if(err)
                return res.status(406).json(err);

            /* Succes */

            res.status(200).json(services);
        });
};
exports.GetService = (req, res) => {
    SERVICE.findById(req.query.id, (err, service) => {
        if(err)
            return res.status(404).json(err);

        /* Success */
        res.status(200).json(service);
    });
};
exports.GetShots = (req, res) => {
    SERVICE.find({ type: req.body.id })
        .populate('service')
        .sort([['name', 'ascending']])
        .exec((err, shots) => {
            if(err)
                return res.status(406).json(err);

            /* Success */
            res.status(200).json(shots);
        });
}
exports.Update = (req, res) => {
    SERVICE.findByIdAndUpdate(req.body.id, {
        _id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        type: req.body.type
    }, (err) => {
        if(err)
            return res.status(406).json(err);

        /* Success */
        res.sendStatus(201);
    });
};
exports.CreateService = (req, res) => {
    const Service = new SERVICE({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type
    }).save(err => {
        if(err)
            return res.status(406).json(err);

        /* Success */
        res.status(201).json({ message: "service  created" });
    });
};
exports.Delete = (req, res) => {
    SERVICE.findByIdAndRemove(req.query.id, (err) => {
        if(err)
            res.status(406).json(err);

        /* Success */
        res.status(201).json({ message: "service  delete" });
    });
};

exports.GetServiceID =  (id) => {
    return SERVICE.findById(id )

};