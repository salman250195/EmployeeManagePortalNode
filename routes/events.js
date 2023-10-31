const express = require('express');
const router = express.Router();

router.get("/events", async(req, res) => {
    try {
        let events = [{
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
        console.log(events);
        res.status(200).json({ status: 200, message: "OK", Events: events })
    } catch (error) {
        console.log('events error : ', error);
        errorObj = {
            error_status: 400,
            error_msg: "Bad Request"
        }
        res.status(404).json({ errorObj })
    }
})

module.exports = router;