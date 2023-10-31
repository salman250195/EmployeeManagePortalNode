const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check.auth');
const verifyToken = require('../routes/user');



router.get("/special-events", verifyToken, async(req, res) => {
    try {
        let specialEvents = [{
                "_id": "1",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "2",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "3",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "4",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "5",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "6",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "7",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "8",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
            {
                "_id": "9",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2012-04-23T18:25:43.511Z"
            },
        ];

        res.status(200).json({ status: 200, message: "OK", SpecialEvents: specialEvents })

    } catch (error) {
        errorObj = {
            error_status: 400,
            error_msg: "Bad Request"
        }
        res.status(404).json({ errorObj })
    }
})

module.exports = router;