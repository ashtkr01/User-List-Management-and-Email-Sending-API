const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    email: {
        type: String, 
        required: true, 
        unique: true 
    },
    // This allows each user document to have a flexible set of additional properties that 
    //can be added dynamically without needing to alter the schema definition.
    customProperties: { 
        type: Map, 
        of: String 
    }
});

const listSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    //This schema design allows each list to be extended with additional custom attributes,
    //providing flexibility and extensibility for various application needs.
    customProperties: [{
        title: { 
            type: String, 
            required: true 
        },
        fallbackValue: { 
            type: String, 
            required: true 
        }
    }],
    users: [userSchema]
});

const UserList = mongoose.model('UserList', listSchema);
module.exports = UserList;
