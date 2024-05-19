const csv = require('csv-parser');
// const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
//Require models
const UserList = require('../models/userList');
const nodemailer = require('nodemailer');
//Mailsender:
const mailsender = require("../config/email-config");
//Senddata:
const { publishMessage } = require("../config/queue-config");

const addUsersFromCSV = async (req, res) => {
    try {
        //Extract listId from listId
        const listId = req.params.listId;
        console.log("Id :", listId);
        //To find the userList by using Id:
        const list = await UserList.findById(listId);
        console.log(list);
        //If list has not been found :
        if (!list){
            return res.status(404).json({ error: 'List not found' });
        }
        //Store the user, added successfully
        const results = [];
        //Store the user, not added
        const errors = [];
        //Find the existing users array from the given list:
        const users = list.users; 
        console.log("One");
        //Jo hamari custom properties hai list ke andar, unheih reduce function se aggregate kar lenge:
        // with their default value
        const customProps = list.customProperties.reduce((acc, prop) => {
            acc[prop.title] = prop.fallbackValue;
            return acc;
        }, {});
        console.log("Accumulator : ", customProps);
        console.log("Two");
        console.log("Path : ", req.file.path);
        /******************************* */
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => {
                console.log(data);
                const user = { name: data.name, email: data.email, customProperties: {} };
                console.log("User : ",user);
                for (const [key, value] of Object.entries(data)) {
                    if (key !== 'name' && key !== 'email') {
                        user.customProperties[key] = value || customProps[key];
                    }
                }
                if (users.some(u => u.email === user.email)) {
                    errors.push({ ...user, error: 'Duplicate email' });
                } else {
                    results.push(user);
                }
            })
            .on('end', async () => {
                try {
                    list.users.push(...results);
                    await list.save();
                    res.status(200).json({
                        successCount: results.length,
                        errorCount: errors.length,
                        totalCount: list.users.length,
                        errors
                    });
                } catch (err) {
                    res.status(500).json({ error: err.message });
                } finally {
                    fs.unlinkSync(req.file.path); // clean up the uploaded file
                }
            });
        /******************************* */
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const createList = async (req, res) => {
    try {
        const { title, customProperties } = req.body;
        const newList = new UserList({ title, customProperties });
        //Save into database:
        await newList.save();
        res.status(201).json(newList);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//**************************************** */

/************************************************** */
const sendEmailToList = async (req, res) => {
    try {
        const listId = req.params.listId;
        // console.log("ListId", listId);
        const { subject, body } = req.body;
        const list = await UserList.findById(listId);
        // console.log("List : ", list);
        if (!list) return res.status(404).json({ error: 'List not found' });

        // console.log("Hello");
        const emails = list.users.map(user => {
            let emailBody = body;
            for (const [key, value] of user.customProperties.entries()) {
                emailBody = emailBody.replace(`[${key}]`, value);
            }
            
            emailBody = emailBody.replace('[name]', user.name).replace('[email]', user.email);
            console.log("Body : ", emailBody);
            return {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject,
                text: emailBody
            };
        });
        console.log("Emails : ", emails);
        emails.map((email) => {
            publishMessage({
                from: email.from,
                to: email.to,
                subject: email.subject,
                text: email.text
            });
        });
        // console.log("Done");
        // await Promise.all(emails.map(email => mailsender.sendMail(email)));
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/************************************************** */
const unsubscribeUser = async (req, res) => {
    try {
        const listId = req.params.listId;
        const { email } = req.body;
        const list = await UserList.findById(listId);
        if (!list) return res.status(404).json({ error: 'List not found' });

        list.users = list.users.filter(user => user.email !== email);
        await list.save();
        res.status(200).json({ message: 'User unsubscribed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createList,
    addUsersFromCSV,
    sendEmailToList,
    unsubscribeUser
}
