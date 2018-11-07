// Create a function which is a "controller", it
// handles a request, writing the response.

const eventsJS = require('../models/events.js');

const eventsList = eventsJS.all;

function events(request, response) {
    const contextData = {
        title: 'Eventbrite clone project starter',
        salutation: 'Hello Yalies!',
        eventsList,
    };
    response.render('events', contextData);
}

module.exports = {
    events,
};
