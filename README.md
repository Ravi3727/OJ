##The Online Judge
The Online Judge is a web platform designed for students and coding enthusiasts to practice Data Structures and Algorithms (DSA) without the distractions of advertisements or online courses. It provides features for both regular users and admins, ensuring a seamless experience for problem-solving and contest organization.

##Features
User Authentication: Secure login and registration with OTP validation.
Unified Dashboard: A single dashboard catering to regular users, problem creators, and contest organizers.
Problem Management: Customizable problems table and detailed problem-solving pages.
Contest Management: Features for creating and participating in coding contests, with enhanced security for contest operations.

##Tech Stack

#Frontend:
TypeScript
Next.js
TailwindCSS

#Backend:
Node.js
Express.js
Docker
Zod

#Database:
MongoDB

#Deployment:
Vercel (Frontend)
AWS (Code Compiler)

##Installation

#Clone the repository:
```git clone https://github.com/Ravi3727/OJ.git```
```cd OJ```
##Install frontend dependencies:
```npm install```
##Set up environment variables:
Create a .env file in the OJ folder.
DATABASE_URL = ""
RESEND_API_KEY = ""
NEXTAUTH_SECRET_KEY = ""

##Run the OJ project:
```npm run dev```

##Usage

#Users:
Register and log in to access the dashboard.
Browse and solve problems.
Participate in contests.

$Admins:
Log in to access admin functionalities.
Create and manage problems.
Organize and oversee contests.
Future Enhancements
Security: Enhancing security features for contest operations.
Scalability: Improving the platform to handle a larger number of users and problems.

##Contributing
#I welcome contributions to enhance The Online Judge. Please follow these steps to contribute:
#Fork the repository.
Create a new branch: ```git checkout -b feature-name```.
Make your changes and commit them: ```git commit -m 'Add some feature'```.
Push to the branch:``` git push origin feature-name.```
Open a pull request.

##Contact
For any questions or feedback, please reach out to me at rk3727000@gmail.com.
