// Create a function which is a "controller", it
// handles a request, writing the response.

// Establish SQL database connection
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://rdgcbthbjciawd:51617eca5cb0e1ff91aa0aa16421b6e845085fc57ef743f2b798b5fffe05f5ca@ec2-54-197-249-140.compute-1.amazonaws.com:5432/d2ans71chelej9',
    ssl: true,
});


// Events controller
function eventsSQL(request, response) {
    client.connect();
    client.query('SELECT * FROM events ORDER BY id;', (err, res) => {
        if (err) {
            throw err;
        } else {
            const contextData = {
                title: 'Eventbrite clone project starter',
                salutation: 'Hello Yalies!',
                eventsListSQL: res.rows,
            };
            response.render('events', contextData);
        }
    });
}


// Single event page controller
function singleEvent(request, response) {
    client.connect();
    client.query('SELECT * FROM events ORDER BY id;', (err, res) => {
        if (err) {
            throw err;
        } else {
            client.query('SELECT email FROM attendees WHERE id = $1;', [request.params.id], (err2, res2) => {
                if (err2) {
                    throw err;
                } else {
                    const contextData = {
                        title: 'Eventbrite clone project starter',
                        salutation: 'Hello Yalies!',
                        event: res.rows[request.params.id - 1],
                        attendees: res2.rows,
                    };
                    console.log('attendees are', contextData.attendees);
                    response.render('singleEvent', contextData);
                }
            });
        }
    });
}


// donate controller
function donate(request, response) {
    client.connect();
    client.query('UPDATE events SET donations = donations + 1 WHERE id = $1;', [request.params.id], (err) => {
        if (err) {
            throw err;
        } else {
            response.redirect(`/events/${request.params.id}`);
        }
    });
}


// rsvp controller
function rsvp(request, response) {
    client.connect();
    client.query('INSERT INTO attendees (id, email) values ($1, $2);', [request.params.id, request.body.email], (err) => {
        if (err) {
            throw err;
        } else {
            response.redirect(`/events/${request.params.id}`);
        }
    });
}


module.exports = {
    singleEvent, eventsSQL, donate, rsvp,
};
