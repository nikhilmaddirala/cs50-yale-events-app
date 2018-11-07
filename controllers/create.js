// Create a function which is a "controller", it
// handles a request, writing the response.
function createGet(request, response) {
    const contextData = {
        title: 'Eventbrite clone project starter',
        salutation: 'Hello Yalies!',

    };
    response.render('create', contextData);
}

module.exports = {
    createGet,
};
