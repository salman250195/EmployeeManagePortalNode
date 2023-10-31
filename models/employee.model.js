const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    }
});

const employeeModel = mongoose.model("employee", employeeSchema);
module.exports = employeeModel;
