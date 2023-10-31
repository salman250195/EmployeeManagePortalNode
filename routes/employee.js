const express = require('express');
const router = express.Router();
const employeeModel = require('../models/employee.model');
const checkAuth = require('../middleware/check.auth');
const verifyToken = require('../routes/user');
// const verifyToken = require('../middleware/check.auth');


// POST method (add employee)
router.post("/addEmployee", async(req, res) => {
    const employe = req.body;
    const addEmployee = new employeeModel(employe);
    // console.log(addEmployee);
    try {
        await addEmployee.save();
        res.status(200).json({ status: 200, messgae: "employee added", AddEmployee: addEmployee })
    } catch (error) {
        errorObj = {
            error_status: 404,
            error_msg: "Not Found"
        }
        res.status(404).json({ errorObj })
    }
});


// GET method (get all employees)
router.get("/employee", verifyToken, async(req, res) => {
    // router.get("/employee", async (req, res) => {
    try {
        const getEmployee = await employeeModel.find();
        console.log(getEmployee);
        res.status(200).json({ status: 200, message: "OK", getemployees: getEmployee })
    } catch (error) {
        errorObj = {
            error_status: 400,
            error_status: "Bad Request"
        }
        res.status(400).json({ errorObj })
    }
});


// GET method (read employee y Id)
router.get("/read/:id", async(req, res) => {
    const id = req.params.id;
    try {
        reademployee = await employeeModel.findById(id);
        console.log(reademployee);
        if (!id) {
            errorObj = {
                message: "Error -> employee not found with id = " + id,
                error: "Not Found!"
            }
            res.status(404).json({ errorObj })
        } else {
            
            res.status(200).send(reademployee)
            //  res.status(200).json({ status: 200, messgae: "OK", ReadEmployee: readEmployee });

        }

    } catch (error) {
        errorObj = {
            error_status: 500,
            error_msg: "Error retrieving employee with id = " + id
        }
        res.status(500).json({ errorObj })
    }
});

// PUT method (update employee y Id) 
router.put("/update/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const updateemployee = await employeeModel.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (!id) {
            errorObj = {
                message: "Error -> Can NOT update a employee with id = " + id,
                error: "Not Found!"
            }
            res.status(404).json({errorObj});
        } else {
            res.status(200).json({ status: 200, message: 'employee updated success', updateEmployee: updateemployee })
        }

        console.log(updateemployee);
    } catch (err) {
        errorObj = {
            message: "Error -> Can Not update employee with id = " + id,
            error: err.message
        }
        res.status(500).json({errorObj});
    }
});

// DELETE method (delete employee y Id)
router.delete("/delete/:id", async(req, res) => {
    let id = req.params.id;
    try {
        const deleteemployee = await employeeModel.findByIdAndRemove(id);
        console.log(deleteemployee);
        if (!id) {
            errorObj = {
                message: "Does Not exist a Employee with id = " + id,
                error: "404"
            }
            res.status(404).json({ errorObj });
        } else {
            res.status(200).json({status: 200, message: 'Data deleted successfully', deleteEmployee: deleteemployee});
            console.log('Data deleted successfully');
        }

    } catch (err) {
        errorObj = {
            message: "Error -> Can Not delete a employee with id = " + id,
            error: err.message
        }
        res.status(500).json({ errorObj });
    }
})


module.exports = router;