const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.get_all_user = (req, res, next) => {
    User.find()
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                data: result
            });
        })
        .catch(err => {
            res.status(404).json({
                success: false,
                message: "Something Went Wrong!"
            });
        });
}

exports.sign_up = (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .exec()
        .then(
            user_info => {
                if (user_info) {
                    res.status(404).json({
                        success: false,
                        message: "User Already exist"
                    });
                }
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) {
                        res.status(404).json({
                            success: false,
                            message: err.message
                        });
                    } else {
                        var user = new User({
                            id: req.body.id,
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(
                                item => {
                                    res.status(200).json({
                                        success: true,
                                        message: "User Successfully Registered!",
                                        data: item
                                    });
                                })
                            .catch(
                                err => {
                                    res.status(404).json({
                                        success: false,
                                        message: "Something Went Wrong!"
                                    });
                                }
                            );
                    }
                });

            });
}

exports.sign_in = (req, res, next) => {
    console.log(req.body);
    User.findOne({
            email: req.body.email
        })
        .exec()
        .then(
            user => {
                console.log(user);
                if (user) {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (err) {
                            res.status(404).json({
                                success: false,
                                message: err.message
                            });
                        }
                        if (result) {
                            const token = jwt.sign({
                                    id: user._id,
                                    email: user.email
                                },
                                process.env.SECRET_KEY, {
                                    expiresIn: '1h'
                                }
                            );
                            res.status(200).json({
                                success: true,
                                message: "Successfully Logged In",
                                data: user,
                                token: token
                            });
                        }
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        message: "User not exist"
                    });
                }
            })
        .catch(
            err => {
                res.status(404).json({
                    success: false,
                    message: "something went wrong"
                });
            }

        );
}