'use strict';


// SQL
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://rdgcbthbjciawd:51617eca5cb0e1ff91aa0aa16421b6e845085fc57ef743f2b798b5fffe05f5ca@ec2-54-197-249-140.compute-1.amazonaws.com:5432/d2ans71chelej9',
    ssl: true,
});


// Add event to allEvents
function addEventSQL(title, date, image, location, firstname, lastname, emailaddress, description) {
    client.connect();
    client.query('INSERT INTO events (title, date, image, location, firstname, lastname, emailaddress, description) values ($1, $2, $3, $4, $5, $6, $7, $8);', [title, date, image, location, firstname, lastname, emailaddress, description], (err) => {
        if (err) throw err;
        // console.log(res.rows);
        // client.end();
    });
}

// JSON
const allEvents = [
    {
        id: 0,
        title: 'SOM House Party',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        date: new Date(2018, 0, 17, 16, 30, 0),
        image: 'http://i.imgur.com/pXjrQ.gif',
        location: 'Kyle \'s house',
        attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu'],
    },
    {
        id: 1,
        title: 'BBQ party for hackers and nerds',
        date: new Date(2017, 8, 1, 19, 0, 0),
        image: 'http://i.imgur.com/7pe2k.gif',
        location: 'Sharon Oster\'s house',
        attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu'],
    },
    {
        id: 2,
        title: 'BBQ for managers',
        date: new Date(2017, 12, 20, 18, 0, 0),
        image: 'http://i.imgur.com/CJLrRqh.gif',
        location: 'Barry Nalebuff\'s house',
        attending: ['kim.kardashian@yale.edu'],
    },
    {
        id: 4,
        title: 'Cooking lessons for the busy business student',
        date: new Date(2018, 3, 2, 19, 0, 0),
        image: 'http://i.imgur.com/02KT9.gif',
        location: 'Yale Farm',
        attending: ['homer.simpson@yale.edu'],
    },
];


/**
 * Returns the first event that has a particular id.
 */
function getById(id) {
    for (let i = 0; i < allEvents.length; i += 1) {
        if (id === allEvents[i].id) {
            return allEvents[i];
        }
    }
    return null;
}

// Add event to allEvents
function addEvent(event) {
    allEvents.push(event);
}


module.exports = {
    all: allEvents,
    getById,
    addEvent,
    addEventSQL,
};
