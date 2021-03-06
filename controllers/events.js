// Create a function which is a "controller", it
// handles a request, writing the response.

// Establish SQL database connection
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://ioarjjnjqyghjm:2d7daf1f1be437042c63d2368dbf2025f6846d6f11c7b7be73b1e0f93b8b9858@ec2-174-129-41-12.compute-1.amazonaws.com:5432/drbedlvb616fi',
    ssl: true,
});

const modelevents = require('../models/events.js');

// Check e-mail address validity
// Our code for the validate email test was obtained from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(mailaddress) {
  if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mailaddress))
  {
    return (true);
    }
    return (false);
}

// Defining maxID variable
function maxID(request, response) {
    client.connect();
    // define context data
    const contextData = {
        errors: [],
        event: [],
        attendees: [],
        confirmation: [],
        title: []
    };
    client.query('SELECT id FROM events WHERE id=(SELECT max(id) FROM events);', (err, res3) => {
        if (err) {
            throw err;
        } else {
        // query event and attendees
        client.connect();
        var querying = "SELECT * FROM events WHERE id = ' "+ res3.rows[0].id+"'";
        client.query(querying, (err, res) => {
            if (err) {
                    //throw err;
                    console.log(res3);
                    console.log(res3.rows[0].id);
                } else {
                    var querying2 = "SELECT * FROM attendees WHERE id = ' "+ res3.rows[0].id+"'";
                    client.query(querying2, (err2, res2) => {
                        if (err2) {
                            throw err;
                        } else {
                            contextData.event = res.rows[0];
                            contextData.attendees = res2.rows;
                            contextData.title = res.rows[0].title;
                        }
                });
                        console.log(contextData);
                        response.render('singleEvent', contextData);
            }
            });
        }

        });

}

// new event controller
function newEvent(request, response) {
    const contextData = {
        errors: [],
    };
    if (request.method === 'POST') {
        console.log('This is a POST request');
        const errors = [];
        if (!request.body.title || request.body.title.length > 50) {
            errors.push('This is a bad title');
        }
        if (!request.body.image || ((request.body.image.slice(-4)) !== '.png') && ((request.body.image.slice(-4)) !== '.jpg') && ((request.body.image.slice(-4)) !== '.gif')) {
            errors.push('This is a bad image');
        }
        if (!request.body.location || request.body.location.length > 50) {
            errors.push('This is a bad location');
        }
        contextData.errors = errors;
        if (errors.length === 0) {
            client.connect();
            client.query('INSERT INTO events (title, year, month, day, hour, minute, image, location, firstname, lastname, emailaddress, description, donations) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 0);', [request.body.title, request.body.year, request.body.month, request.body.day, request.body.hour, request.body.minute, request.body.image, request.body.location, request.body.firstname, request.body.lastname, request.body.emailaddress, request.body.description], (err) => {
                if (err) {
                    throw err;
                } else {
                    maxID();
                    //return response.redirect('/events');
                }
            });
        } else {
            return response.render('events/new', contextData);
        }
    } else {
        console.log('This is a GET request');
        return response.render('events/new', contextData);
    }
    console.log(contextData.errors);
}


// Index controller
function index(request, response) {
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
            response.render('index', contextData);
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

// New single event controller
function singleEvent(request, response) {
    // define context data
    const contextData = {
        errors: [],
        event: [],
        attendees: [],
        confirmation: [],
        title: []
    };
    // query event and attendees
    client.connect();
    client.query('SELECT * FROM events WHERE id = $1 ORDER BY id;', [request.params.id], (err, res) => {
        if (err) {
            throw err;
        } else {
            client.query('SELECT email FROM attendees WHERE id = $1;', [request.params.id], (err2, res2) => {
                if (err2) {
                    throw err;
                } else {
                    contextData.event = res.rows[0];
                    contextData.attendees = res2.rows;
                    contextData.title = res.rows[0].title;

                    // post request for rsvp
                    if (request.method === 'POST') {
                        // console.log('This is a POST request');
                        const errors = [];
                        // if (request.body.email.slice(-9).toLowerCase() !== '@yale.edu') {
                        //     errors.push('This is a bad email');
                        // }
                        contextData.errors = errors;
                        console.log(contextData.errors);
                        // check for errors
                        if (errors.length === 0) {
                            client.connect();
                            client.query('INSERT INTO attendees (id, email) values ($1, $2);', [request.params.id, request.body.email], (err) => {
                                if (err) {
                                    throw err;
                                } else {
                                    // return response.redirect(`/events/${request.params.id}`);
                                    const crypto = require('crypto');
                                    const email = request.body.email.toLowerCase();
                                    const teamNickname = 'golden-meadow';
                                    const cc = crypto.createHash('sha256')
                                        .update(`${email}-${teamNickname}`)
                                        .digest('hex')
                                        .substring(0, 7);
                                    contextData.confirmation = ['REGISTERED ' + request.body.email + '! Your confirmation code is ' + cc];
                                    console.log(contextData.attendees);
                                    return response.render('singleEvent', contextData);
                                }
                            });
                        } else {
                            return response.render('singleEvent', contextData);
                        }
                    } 
                    // get request
                    else {
                        console.log('this is a get request');
                        console.log(contextData.event);
                        return response.render('singleEvent', contextData);
                    }

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


// new rsvp controller
function rsvp(request, response) {
    const contextData = {
        errors: [],
    };
    if (request.method === 'POST') {
        console.log('This is a POST request');
        const errors = [];
        if (request.body.email.slice(-9) !== '@yale.edu') {
            errors.push('This is a bad email');
        }
        if (validateEmail(request.body.email.toLowerCase()) == false) {
            errors.push('This is an innvalid e-mail');
        }    
        contextData.errors = errors;
        if (errors.length === 0) {
            client.connect();
            client.query('INSERT INTO attendees (id, email) values ($1, $2);', [request.params.id, request.body.email], (err) => {
                if (err) {
                    throw err;
                } else {
                    return response.redirect(`/events/${request.params.id}`);
                }
            });
        } else {
            return response.redirect(`/events/${request.params.id}`);
        }
    } else {
        console.log('This is a GET request');
        return response.redirect(`/events/${request.params.id}`, contextData);
    }
    console.log(contextData.errors);
}

// Events controller
function APIpull(request, response) {
    let events = client.query('SELECT * FROM events');
    for (let i = 0; i < events.length; i +=1) {
    const events2 = {
        id: events[i].id,
        title: events[i].title,
        //date: Date(request.body.datetime),
    //     image: events[i].image,
    //     location: request.body.location,
    //     firstname: request.body.firstname,
    //     lastname: request.body.lastname,
    //     emailaddress: request.body.emailaddress,
    //     description: request.body.description,
    };
            const contextData = {
                events: events2
            };
            //test if there is a query or not
            if (request.query.search) {
                var querysearch = request.query.search.toLowerCase();
                var matchingevents = [];
                for (let i = 0; i < events.length; i +=1) {
                    if(events[i].title.toLowerCase().includes(querysearch) == true) {
                        matchingevents.push(events[i]);
                    }
                }
                const contextData2 = {
                    events: matchingevents
                };
                //if pass test, render subset of events that match
                response.send(contextData2);
                }
                else {
                    response.send(contextData);
                    console.log(contextData);
                }
            }
}

module.exports = {
    singleEvent, eventsSQL, donate, rsvp, newEvent, index, APIpull,
};


// rsvp controller
// function rsvp(request, response) {
//     client.connect();
//     client.query('INSERT INTO attendees (id, email) values ($1, $2);', [request.params.id, request.body.email], (err) => {
//         if (err) {
//             throw err;
//         } else {
//             response.redirect(`/events/${request.params.id}`);
//         }
//     });
// }

// Single event page controller
// function singleEvent(request, response) {
//     client.connect();
//     client.query('SELECT * FROM events WHERE id = $1 ORDER BY id;', [request.params.id], (err, res) => {
//         if (err) {
//             throw err;
//         } else {
//             client.query('SELECT email FROM attendees WHERE id = $1;', [request.params.id], (err2, res2) => {
//                 if (err2) {
//                     throw err;
//                 } else {
//                     const contextData = {
//                         title: 'Eventbrite clone project starter',
//                         salutation: 'Hello Yalies!',
//                         event: res.rows[0],
//                         attendees: res2.rows,
//                     };
//                     response.render('singleEvent', contextData);
//                 }
//             });
//         }
//     });
// }
