// Create a function which is a "controller", it
// handles a request, writing the response.

const eventsJS = require('../models/events.js');

function createGet(request, response) {
    const contextData = {
        title: 'Eventbrite clone project starter',
        salutation: 'Hello Yalies!',
    };
    response.render('create', contextData);
}

function createPost(request, response) {
    // const contextData = {
    //     title: 'Eventbrite clone project starter',
    //     salutation: 'Hello Yalies!',
    // };
    const event = {
        id: eventsJS.all[eventsJS.all.length - 1].id + 1,
        title: request.body.eventname,
        date: Date(request.body.datetime),
        image: request.body.image,
        location: request.body.location,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        emailaddress: request.body.emailaddress,
    };
    eventsJS.addEvent(event);
    console.log(event);
    eventsJS.addEventSQL(request.body.eventname, request.body.datetime,
        request.body.image, request.body.location, request.body.firstname,
        request.body.lastname, request.body.emailaddress);
    response.redirect('/events');
}


module.exports = {
    createGet, createPost,
};
