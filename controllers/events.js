// Create a function which is a "controller", it
// handles a request, writing the response.

// SQL
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://rdgcbthbjciawd:51617eca5cb0e1ff91aa0aa16421b6e845085fc57ef743f2b798b5fffe05f5ca@ec2-54-197-249-140.compute-1.amazonaws.com:5432/d2ans71chelej9',
    ssl: true,
});

const eventsJS = require('../models/events.js');

const eventsList = eventsJS.all;

let eventsListSQL = [];

function updateEventsSQL() {
    client.connect();
    client.query('SELECT * FROM events;', (err, res) => {
        if (err) throw err;
        // client.end();
        eventsListSQL = res.rows;
        console.log('Events list update');
        console.log(eventsListSQL);
    });
}

function eventsSQL(request, response) {
    updateEventsSQL();
    const contextData = {
        title: 'Eventbrite clone project starter',
        salutation: 'Hello Yalies!',
        eventsListSQL,
    };
    console.log('Events list final');
    console.log(eventsListSQL);
    response.render('events', contextData);
}


function events(request, response) {
    const contextData = {
        title: 'Eventbrite clone project starter',
        salutation: 'Hello Yalies!',
        eventsList,
    };
    response.render('events', contextData);
}

function singleEvent(request, response) {
    const contextData = {
        event: eventsListSQL[request.params.id],
    };
    response.render('singleEvent', contextData);
}


module.exports = {
    events, singleEvent, eventsSQL, updateEventsSQL,
};
