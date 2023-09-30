# VillageHours - A Non-profit Organization Event and Employee Management System
## KSU Fall 2023 Capstone Project - Team 6
### Development Team Members:
- Frederik Ackander
- John Crabtree
- Dominick Founds
- Jeffrey Ganulin
- Fredy Quaicoe
- Evan Vana

# Project Description
This project is aimed at building an accessible and easy-to-use web application for non-profit organization leaders, event managers, their employees, and volunteers to more efficiently manage their time and resources. The application will allow leaders of an organization to schedule and manage events, and manage teams of employees and volunteers, and track their hours worked, expenses, and mileage reported all in one place. Per-event task tracking will allow organizations and their teams to keep track of what needs to be done and what has already been completed. A strong focus on efficient reporting functionality in the system means non-profit organization leaders and team managers can quickly and accurately view the state of their events, teams, and overall organizational performance, with options to export financial reports to CSV or PDF for accessible viewing. As an organization member or volunteer, or even as a guest at a non-profit event, users can check in to events simply by scanning the event's QR code. After creating an account, users can report their attendance, expenses and mileage spent for each event, as well as see all available tasks yet to be completed for the event. All these primary features add up to a system that enables non-profit organizations to spend more time working towards their mission, and less time managing their events, teams, and resources. 

# System Architecture
In accordance with the requirements of the project, and in the interest of following best practices and the principles of clean architecture, the system will be built with a layered architectural style, with layers as follows built using the following technologies:
- Frontend (Presentation Layer): React.js + Redux + Chakra UI
- Backend (Business Logic Layer): Node.js + Express.js
- Database (Data Access Layer): MySQL
The system embraces an Model-View-Controller architectural pattern, with the views, controllers, and model being handled by the frontend, backend, and database layers respectively. The frontend and backend layers will communicate via a RESTful API, and the backend and database layers will communicate via a MySQL connection.
Note that TypeScript will be used for all code written in JavaScript, and the system will be containerized using Docker for deployment.

# Development Environment Setup
- Node.js 18.12.1
- npm 9.7.2, or yarn 3.6.1
- Docker 20.10.22

# Running the Application in Development Mode
1. With all prerequisites installed, clone the repository.
2. Create .env files in the `client` and `server` directories, and copy the contents of the respecetive `.env.example` files into them. Replace the values of the environment variables with the appropriate values for your environment.
3. From the root directory of the repository, open a terminal and install the dependencies for the frontend and backend layers by running `npm install` or `yarn install` in the `client` and `server` directories respectively.
```bash
cd client
npm install
cd ../server
npm install
```
4. With the dependencies installed, in a terminal from the root directory of the repository, run:
```bash
cd server && npm run dev
```
5. In a separate terminal, run:
```bash
cd client && npm start
```
6. The application should now be running in development mode. The output from the client terminal should display the local URL where the application is running, and the output from the server terminal should display the local URL where the API is running. The application can be accessed by navigating to the client URL in a web browser.
