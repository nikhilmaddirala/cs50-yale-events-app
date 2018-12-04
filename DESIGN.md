DESIGN.md

#Framework
The framework we used is Node.JS (unlike CS50 Finance, which uses a
Python framework). We chose Node.JS as an opportunity to learn a new
framework, and also for the elegance of using the same language (Javascript) 
everywhere. Another reason for using Node is because we are following the 
cross-course project track, together with MGT 656 (Managing Software Development) 
which emphasizes Javascript. Rather than using the starter code from 
CS50 Finance, we used a similar starter code from our MGT 656 course 
which is based on Node. The starter code we used can be found here 
(https://classroom.github.com/g/5AQeVwXM). 

Our framework follows the MVC (model - view - controller) model of app
development as described in CS50. The main file here is app.js. 
This is the file that integrates the models, views, and controllers of
our app. More specifically, app.js handles all the routes of our app, and it
specifies which controllers handle which routes. 


#Models
We initially started by storing our data in the form of a JSON object 
(which was stored in events.JS), but we soon graduated to a PostgreSQL 
database implementation. We deployed PostgreSQL in Heroku by following the
documentation (https://devcenter.heroku.com/articles/heroku-postgresql). 
Then we set up the connection from our Node app to PostgreSQL by following
the node postgres documentation (https://node-postgres.com/). We created 
the relevant tables in our SQL database and initialized with some data.

#Views
We created a basic layout called layout.html which we then extended using 
the Jinja templating language, following the documentation here 
(https://www.npmjs.com/package/jinja-js). Moreover, we used Bootstrap to 
ensure good styling for all of our forms, buttons, tables, etc.

#Controllers
We defined controllers for each route of our app. In this section, we will
briefly describe some of the main controllers.

/createPost - this is the controller for creating a new event via the POST
method. It takes the form data submitted by the user at the /create route
and executes database script to insert the event details into the database.

/eventsSQL - this controller is for the list of events view. It queries 
the database for a list of events which are called into a table by the view.

/singleEvent - this controller is for displaying a single event page. It 
queries the database (using a nested callback function) for the event
details from the events table and also queries for the attendee details 
from the attendee tables. It then provides this information into the single 
event view.

/donate - this controller simply updates the database to add +1 to the
donation count of a specific event.

#collaboration
Our team opted to use the popular version control tool Github 
to enable development by team members simultaneously, to preserve older 
versions of our codebase, and to facilitate code merging. We first encountered
this tool in our MGT 656 class, but further developed our knowledge and 
experience with the tool working extensively with many versions and many
commits in Github before we could produce the final version of our web
application. Though there was an additional learning curve to become 
well-versed in Git, our team has found tremendous collaboration value from 
this tool. In fact, our final product would not be nearly as complex or
well-designed if we did not use a software version control tool. 

#thornyissues
Callbacks - one of the trickiest parts of working with Javascript was 
understanding the non-linear / asynchronous nature of function execution. 
I started by writing linear functions for controllers; e.g. the first line of
the function would execute a database query and then the second line of the
function would redirect the user to a different route. What we expected was
that the redirect would only occur after the previous line (the database query) 
was executed. However, we soon learned that Javascript is asynchronous and does 
not execute functions in a linear order. To solve this problem, we had to
implement callback functions to ensure that the database query executed first, 
and then moved the redirect to the callback portion of the function. One 
of our routes (singleEvent) even had multiple nested callbacks!


