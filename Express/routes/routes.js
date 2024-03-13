const express = require('express')
const router = express.Router();
const User = require('../models/user')
const Multer = require('multer');


router.get("/Users",(req,res) =>{
    res.json({ "message" : "Hello All"});
    })

var storage = Multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './uploads')
    },
    filenames : function(req,file,cb){
        cb(null, file.fieldname+"_"+ Date.now() +"_"+file.originalname);
    },
})

var upload = Multer({
    storage: storage,}).single("image");
    

router.post('/add', (req,res)=>{
    // console.log("Hello ", req.file.filename)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            // image: req.file.filename
        });
        user.save();
});

router.get('/getUsers', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Respond with the fetched data
        res.status(200).json(users);
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/updateUser/:name', async (req, res) => {
    try {
        const nameToUpdate = req.params.name;

        // Use findOneAndUpdate to find a user by name and update the fields
        const updatedUser = await User.findOneAndUpdate(
            { name: nameToUpdate },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    // image: req.file.filename // Uncomment if updating the image as well
                }
            },
            { new: true } // Return the updated document
        );

        // Check if the user was found and updated
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/deleteUser/:name', async (req, res) => {
    try {
        const nameToDelete = req.params.name;

        // Use findOneAndDelete to find a user by name and delete it
        const deletedUser = await User.findOneAndDelete({ name: nameToDelete });

        // Check if the user was found and deleted
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;