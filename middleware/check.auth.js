const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const token = req.headers.authorization;
    // console.log(token);
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token, 'this is dummy text');
        console.log(verify);
        //  if(!verify) {
        //     return res.status(401).json({
        //         msg: 'Unauthorized request'
        //     })
        // }
        //  req.userId = payload.subject;   

        // condition for only admin
        // if(verify.userType == 'admin') {
        //     next();
        // } else {
        //     res.status(401).json({
        //         msg: 'not admin'
        //     })
        // }
        next();
    } catch(err) {
        res.status(401).json({
            msg: 'invalid token'
        })
    }
}



// function verifyToken(req, res, next) {
//     if(!req.headers.authorization) {
//         return res.status(401).json({
//             msg: 'Unauthorized request'
//         })
//     }
//     let token = req.headers.authorization.split(' ')[1]
//     if(token === 'null') {
//         return res.status(401).json({
//             msg: 'Unauthorized request'
//         })
//     }
//     let payload = jwt.verify(token, 'secretKey')
//     if(!payload) {
//         return res.status(401).json({
//             msg: 'Unauthorized request'
//         })
//     }
//     req.userId = payload.subject
//     next()
// }

// module.exports = verifyToken;
