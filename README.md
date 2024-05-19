
# User List Management and Email Sending API (MathonGo)

I have completed this interesting assignmend given by MathonGo. Worked well on each required statement of the assignment.

- Implemented a RESTful API for managing a user list with customizable properties, allowing the admin to create lists with titles and custom properties, including default values.
- Developed a RESTful API enabling admins to add users via CSV upload, efficiently handling over 10,000 records.
   - Additionally, we ensure email uniqueness and provide fallback values for unspecified custom properties.    
    - In case of user addition errors, we furnish a detailed CSV report containing the list, error messages, and counts of successful and failed additions, ensuring clarity and ease of troubleshooting.
- RESTful API empowers administrators to send personalized emails to the entire list effortlessly. Custom properties serve as placeholders in the email body, allowing dynamic content replacement upon sending, ensuring tailored communication.
-  RESTful API incorporates an unsubscribe link in the email content. When users click on this link, they are automatically unsubscribed from the list, ensuring they no longer receive emails from the specific list whenever the admin sends out communications.
















## Tech Stack Used

* JavaScript
* Node.js 
* Express.js
* MongoDB
* RabbitMQ


## Steps To Setup Project

- First clone the github repository

```bash
  dummy url
```
- Open the repository folder in any code editor (VS code) or open any terminal.
- Install dependencies

```bash
  npm install
```
- Environment Variables
    - To run this project, firstly you will need to create the file i.e .env file in repository folder and then add the following environment variables to your .env file

```bash
  PORT
  MONGODB_URI
  EMAIL_USER
  EMAIL_PASS
```
- Build and run the project
```bash
  npm start
```

## API Endpoints
- The app defines following RESTful APIs.
```bash
  POST /api/lists
  POST /api/importUser/{listId}
  POST /api/send-email/{listId}
  POST /api/unsubscribe/{listId}
```
## Screenshot
- CreateList
    - Initial Database 

    - Make an API Call

    - after API Call, Database look like:

- User Addidtion to the list having list id is listId
    - Make an API Call

    - after API Call, Database look like:

- Send an email to the complete list having list id = listId.
    - make an Api Call

    - RabbitMQ Analysis

    - Prove that we have received the mail

- Unsubscribe the user from the list
    - Database before making an API Call

    - make an API Call

    - Database after making an API Call