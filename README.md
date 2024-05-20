
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
  git clone https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API.git
```
- Open the repository folder in any code editor (VS code) or open any terminal.
- Run the following command to create the public directory:
```bash
  mkdir public
```
- Then, create the upload directory inside the public directory
```bash
  mkdir public/upload
```
- Purpose : The public/upload directory will be used to temporarily store CSV files that are uploaded. This ensures that the files are organized and easily accessible for further processing.
- Install dependencies

```bash
  npm install
```
- Environment Variables
    - To run this project, firstly you will need to create the file i.e .env file in repository folder and then add the following environment variables to your .env file

```bash
  PORT=<port_number>
  MONGODB_URI=<MongoDB_URI> //Connection string for connecting to the MongoDB database.
  EMAIL_USER=<email_id>
  EMAIL_PASS=<password> // stores the application-specific password (app password) for the email account specified in EMAIL_USER.
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
      ![Initial-Database](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/4e9dc3b0-54ea-4579-85bd-ff2459eb765a)

    - Make an API Call
      ![API-Call](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/8c4338f8-3d25-44d2-90ed-ab559b5dbb1b)

    - after API Call, Database look like:
      ![Final-DataBase](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/ae163dfe-426f-41e9-9d6b-7ecf35ae408b)

- User Addidtion to the list having list id is listId
    - Make an API Call
      ![API-Call-made](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/b584829f-daeb-4138-9277-dc33e5d5cced)

    - after API Call, Database look like:
      ![After-Api-Call-has-been-made](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/294e5324-cb19-4f0c-ace8-5b6d4279cb8d)

- Send an email to the complete list having list id = listId.
    - make an Api Call
      ![Make-an-API-Call](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/deac282e-55d1-41ba-b517-e010b578e959)

    - RabbitMQ Analysis
      ![RabbitMQ-Analysis](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/b3528fb8-58e8-4776-ab24-0eb513aac10b)

    - Prove that we have received the mail
      ![Prove](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/fafb531d-4c4d-4760-8f95-4399bf018f56)

- Unsubscribe the user from the list
    - Database before making an API Call
      ![Database-before-making-an-API-Call](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/46736e0c-0830-42a6-b87e-2360c49fbbe8)

    - make an API Call
      ![Make-an-API-Call](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/e2feb03d-115d-4f8c-8a28-d89eb28a90de)

    - Database after making an API Call
      ![Database-after-making-an-API-Call](https://github.com/ashtkr01/User-List-Management-and-Email-Sending-API/assets/97300337/db33de05-0ca5-4334-9e52-b6efa60fad29)
