// Create a function which is a "controller", it
// handles a request, writing the response.
// function index(request, response) {
//     const contextData = {
//         title: 'Eventbrite clone project starter',
//         salutation: 'Hello Yalies!',

//     };
//     response.render('index', contextData);
// }

// New index controller
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


module.exports = {
    index,
};
