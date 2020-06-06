# Spatium
Spatium is a web application aiming to help students (particurarly male) to access mental health support discretely due to the stigma surrounding seeking help.
Spatium can be accessed at https://spatium-unimelb.herokuapp.com/
## Current Components
The two main components at present are the user login/signup functionality and forum posting/commenting which allow user to communicate anonymously.
## Using the page
### Functionality 1: Logging in/Signing up
Logging in allows the user to create forum posts and comment on existing posts.
To access the signup page (https://spatium-unimelb.herokuapp.com/user/signup), the user can use the “sign in” button on the navbar at the top from most pages and from there press the “Create an Account” button on the login screen.
From the home screen the user can also press the ”sign up!” button on the grey bar above the footer and below the images.
The user can then fill out the form to create an account on the database.
The username, password, email, first name and last name have minimum length zero, the passwords must match and the email must be in the correct format.
NOTE: since fields are validated feel free to enter invalid details such as different passwords, missing fields, invalid email, etc. The system will pick up on this and notify the user
Please either create an account or sign in with username: demo and password: 123.
Once an account is created the user will be directed to a sign in screen where they can enter their username and password before hitting the “sign in” button to log in.
The user can log out at any time by pressing the “logout” button on the navbar.
The user can view their profile by pressing “Profile” in the navbar, however there is little information in the profile as of now (yet to implement the social interaction of the user).
### Functionality 2: Forum Posting
The forum page (https://spatium-unimelb.herokuapp.com/forum-posts) can be accessed from the “forum” button on the navbar and the “view forums!” and “online forums!” on the home page.
In the left column will be the forum posts with title, author, time of posting and some body text.
Clicking below the posts, the “Click here to view button” will open that post and display comments made on that forum post.
Clicking on the author of a post or comment while on the post’s page will show all forum posts made by that user.
To make a forum or comment the user must be signed in.
The user can create a post from the forum-posts page by pressing the “Create a Post” button and filling out the form.
NOTE: if the user is not logged in, this button will instead display a “Sign in to create a post” button. This will redirect them to the sign in page: /user/login/
Users are able to edit or delete their own posts via the ‘edit’ and ‘delete’ buttons underneath the post
To create a comment the user must navigate to the appropriate post and enter the comment in the form below the other comments and pressing “Post”
### Functionality 3: Consultations
The consultations  page (https://spatium-unimelb.herokuapp.com/consultations) can be accessed from the "Consultations" button on the navbar and the "Make a consultation" button on the home screen.
The user will need to sign in to book a consultation and the consultations page should prompt them to do so.
Once the user is signed in the page should offer buttons to view previously booked consultations and book new consultations.
If the user is of the counsellor type, the buttons will instead be: "Manage Student Consultations" and "Consultation Requests".
#### Request a Consultation
Upon pressing the Request a consultation button the user will be shown a form in which to enter a date and time of the consultation as well as choose whether the consultation will be online or on campus.
The validator for this form will check that the inputs have length>0 and that the date is in the future.
Upon successful completion the user will be redirected to the My Consultations page.
#### My Consultations
The my consultations page displays each consultation with date, time and venueas booked and status of the consultation(pending, completed or scheduled).
The status will show completed if the date of consultation has passed, pending by default and scheduled if a counsellor has accepted the consultation.
The user can also cancel of edit their consultations using the "edit" and "cancel consultations" buttons.
Editing will take the user back to the same form used to create and cancelling prompt the user to confirm before deleting the consultation.
#### Counsellor
The Manage Student Consultations will lead to the "My Scheduled Consultations" Page
The Scheduled Consultations are divided into upcoming and complete consultations, selecting either will display consultation time, date, venue and the student's name.
The Consultations Request button will lead to the Request Consultations page where the counsellor can view pending consultations and accept them based on venue, date, time and student name.
Attempting to access either of these pages with a student user will display a message indicating lack of authorisation.
## Layout
The folders are layed out as follows:
### Config
Contains passport.js which checks password and username authorization at user login.
### Controllers
Manage the different functionalities called by routes which matches URLs to functions
### Models
Maps the layout of database objects
### Public
CSS contains style.css
### Routes
Functions between app.js and Controllers to manage the specific parts of each functionality such as logging in and signing in for the broader user functionality
### Validators
Houses some functions to confirm new entries to the databse are valid
### Views
Contains pug view engine code to be rendered
### App.js
The main directing code that passes URLs to routes
