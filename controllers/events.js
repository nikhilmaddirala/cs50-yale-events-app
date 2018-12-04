// Create a function which is a "controller", it
// handles a request, writing the response.

// Establish SQL database connection
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://ioarjjnjqyghjm:2d7daf1f1be437042c63d2368dbf2025f6846d6f11c7b7be73b1e0f93b8b9858@ec2-174-129-41-12.compute-1.amazonaws.com:5432/drbedlvb616fi',
    ssl: true,
});

// create event controller
function createPost(request, response) {
    client.connect();
    client.query('INSERT INTO events (title, date, image, location, firstname, lastname, emailaddress, description, donations) values ($1, $2, $3, $4, $5, $6, $7, $8, 0);', [request.body.title, request.body.datetime, request.body.image, request.body.location, request.body.firstname, request.body.lastname, request.body.emailaddress, request.body.description], (err) => {
        if (err) {
            throw err;
        } else {
            response.redirect('/events');
        }
    });
}


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
    client.query('SELECT * FROM events WHERE id = $1 ORDER BY id;', [request.params.id], (err, res) => {
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
                        event: res.rows[0],
                        attendees: res2.rows,
                    };
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
            console.log('donated');
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
    singleEvent, eventsSQL, donate, rsvp, createPost,
};
