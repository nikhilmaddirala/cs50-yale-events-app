README.md

#inro
Welcome to our “event manager” app. We created this app as part of our project for
CS50 at Yale. Check out he app here: https://golden-meadow.herokuapp.com/

This app is intended to be a rudimentary clone of Eventbrite / Facebook events. 
You can use this app to create events, to view existing 
events, to RSVP for existing events, and donate for events.

#setup
You can launch the app in one of two ways. The simplest way is to use this 
heroku link (https://golden-meadow.herokuapp.com/). Alternatively, 
you can run the command “npm start” from the root directory.

#app description
The app consists of 5 pages: home, about us, create event, list of events, 
and single event. The functionalities for each of these pages are described 
below:

Home page: The home page is simply a landing page that welcomes users to our app. 
It provides links to the about us, create event, and the list of events pages.

Create Event page: The create event page contains a form that users can use to 
create new events, the details of which then get stored in our SQL database. 
Once you submit the create event form you will automatically be redirected to 
the list of events page. 

List of Events page: The list of events page shows events which have already 
been created (by querying our SQL database). Each event listed has a link that
takes you to single event details page. 

Single event page: On the single event details page, you can rsvp for an event 
and donate for the event. The single event page also shows you the list of
attendees who have RSVPed, and the number of donations made to the event. 

About Us page: The about us page introduces visitors to our team members 
and our motivation for building this app.
