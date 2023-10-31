const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconfig = require('./database/db');
const employee = require('./routes/employee');
const user = require('./routes/user');
const events = require('./routes/events');
const specialEvents = require('./routes/special.events');
const app = express();
const port = 3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

// Express API (employee)
app.use('/employee', employee);

// Express API (Login and Register)
app.use('/user', user);

// Express API (Events)
app.use('/events', events);

// Express API (Special Events)
app.use('/special-events', specialEvents);

// DB connection
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.db, {

}).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Database cant be connected : ' + err);
})


// app.get("/manage", (req, res) => {
//     res.status(200).json({
//         msg: 'manage employess'
//     })
// })

app.listen(port, () => console.log(`Server running at http://localhost${port}`));