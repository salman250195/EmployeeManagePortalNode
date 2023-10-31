const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');



// SignUp
// router.post("/signup", (req, res, next) => {
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//             return res.status(500).json({
//                 error: err
//             })
//         } else {
//             const user = new userModel({
//                 _id: new mongoose.Types.ObjectId,
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 email: req.body.email,
//                 password: hash,
//                 phone: req.body.phone,
//                 address: req.body.address,
//                 userType: req.body.userType
//             })
//             user.save().then(result => {
//                 // console.log(result);
//                 // res.status(200).json({
//                 //     newUser: result
//                 // })

//                 if (err) {
//                     res.status(401).json({
//                         error: err
//                     })
//                 } else {
//                     let payload = { subject: result._id }
//                     let token = jwt.sign(payload, 'this is dummy text')
//                     res.status(200).json({
//                         newUser: token
//                     })
//                 }
//             }).catch(err => {
//                 res.status(500).json({
//                     error: err
//                 })
//             })
//         }
//     })
// })



// Login
// router.post("/login", (req, res, next) => {
//     userModel.find({ email: req.body.email })
//         .exec()
//         .then(user => {
//             if (user.length < 1) {
//                 res.status(401).json({
//                     msg: 'user not exit'
//                 })
//             }
//             bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//                 if (!result) {
//                     return res.status(401).json({
//                         msg: 'password matching failes!'
//                     })
//                 }
//                 if (result) {
//                     const token = jwt.sign({
//                         email: user[0].email,
//                         userType: user[0].userType,
//                         phone: user[0].phone
//                     },
//                         'this is dummy text',
//                         {
//                             expiresIn: "24h"
//                         }
//                     );
//                     res.status(200).json({
//                         email: user[0].email,
//                         userType: user[0].userType,
//                         phone: user[0].phone,
//                         token: token
//                     })
//                 }
//             })
//         }).catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// })


// 2nd Way



// Middleware
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            msg: 'Unauthorized request'
        })
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).json({
            msg: 'Unauthorized request'
        })
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).json({
            msg: 'Unauthorized request'
        })
    }
    req.userId = payload.subject
    next()
}


// SignUp
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            const user = new userModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                address: req.body.address,
                userType: req.body.userType
            });
            user.save((error, registeredUser) => {
                if (error) {
                    console.log(error);
                } else {
                    let payload = { subject: registeredUser._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).json({status: 200, message: "User registered successfully", token: token
                    })
                }
            })
        }
    })
});


// const user = new userModel({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//     phone: req.body.phone,
//     address: req.body.address,
//     userType: req.body.userType
// });
// user.save((error, registeredUser) => {
//     if(error) {
//         console.log(error);
//     } else { 
//         let payload = { subject: registeredUser._id }
//         let token = jwt.sign(payload, 'secretKey')
//         // res.status(200).json({
//         //     registerUser: token
//         // })

//         res.status(200).send({
//           token
//         })
//     }
// })
// });


// Login
// router.post('/login', async (req, res, next) => {
//     try {
//         // const userData = await req.body;
//         userModel.findOne({ email: req.body.email }, (error, user) => {
//             if (error) {
//                 console.log(error);
//                 res.status(500).json({
//                     error: error
//                 })
//             } else {
//                 if (!user) {
//                     res.status(401).json({
//                         msg: 'Invalid email'
//                     })
//                 } else if (user.password !== req.body.password) {
//                     res.status(401).json({
//                         msg: 'Inavlid password'
//                     })
//                 } else {
//                     let payload = { subject: user._id }
//                     let token = jwt.sign(payload, 'secretKey')
//                     // res.status(200).json({
//                     //     userLogin: user
//                     // })
//                     res.status(200).send({
//                         token
//                     })
//                 }
//             }
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({
//             error: err
//         })
//     }
// });


// router.post('/login', async (req, res, next) => {
//     try {
//         // const userData = await req.body;
//         userModel.findOne({
//             email: req.body.email
//         })
//             .exec()
//             .then(user => {
//                 if (user.length < 1) {
//                     return res.status(401).json({
//                         msg: 'user not exit'
//                     })
//                 }
//                 bcrypt.compare(req.body.password, user.password, (err, result) => {
//                     if (err) {
//                         return res.status(500).json({
//                             error: err
//                         })
//                     }
//                     if (!result) {
//                         res.status(401).json({
//                             msg: 'Invalid email'
//                         })
//                     } else if (result.password !== req.body.password) {
//                         res.status(401).json({
//                             msg: 'Inavlid password'
//                         })
//                     } else {
//                         let payload = { subject: result._id }
//                         let token = jwt.sign(payload, 'secretKey')
//                         // res.status(200).json({
//                         //     userLogin: user
//                         // })
//                         res.status(200).send({
//                             token,
//                             message: "Login success"
//                         })
//                     }
//                 })

//             })
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({
//             error: err
//         })
//     }
// });



router.post('/login', async(req, res, next) => {
    try {
        userModel.find({
                email: req.body.email
            })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        msg: 'user not exit'
                    })
                }
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (!result) {
                        return response.status(401).json({ msg: 'password matching fail' })
                    }
                    if (result) {
                        const token = jwt.sign({
                                firstName: user[0].firstName,
                                lastName: user[0].lastName,
                                email: user[0].email,
                                phone: user[0].phone,
                                address: user[0].address,
                                userType: user[0].userType
                            },
                            'secretKey'
                        );
                        res.status(200).json({
                            status: 200,
                            message: "login successfully",
                            data: {
                                firstName: user[0].firstName,
                                lastName: user[0].lastName,
                                email: user[0].email,
                                phone: user[0].phone,
                                address: user[0].address,
                                userType: user[0].userType,
                                token: token
                            }
                        })
                    }
                })
            })
    } catch (error) {
        console.log(error);
        // res.status(400).json({
        //     error: err
        // })
        errorObj = {
            error_status: 400,
            error_msg: "Bad Request"
        }
        res.status(400).json({ errorObj });
    }
});


module.exports = router;