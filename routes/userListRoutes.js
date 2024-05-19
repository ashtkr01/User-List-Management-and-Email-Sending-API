const express = require('express');
const user = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');


const { createList, addUsersFromCSV, sendEmailToList, unsubscribeUser, demo } = require('../controllers/userListController');

user.use(bodyParser.urlencoded({extended:true}));
//Make the folder i.e. public to be static : 
user.use(express.static(path.resolve(__dirname,'public')));

var storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './public/upload');
    },
    filename:(req,file, cb) => {
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage});

//Tis route is used to create the list:
user.post('/lists', createList);

//This route is used to insert the user data in particular list having listId i.e listId
user.post('/importUser/:listId', upload.single('file'), addUsersFromCSV);

//Send the mail to user belonging to the particular list having the id: listId
user.post('/send-email/:listId', sendEmailToList);

//This route is used to unsubscribe the user from a particular list having list whose id is listId.
user.post('/unsubscribe/:listId', unsubscribeUser);

module.exports = user;