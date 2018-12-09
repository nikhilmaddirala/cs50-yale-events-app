// Create a function which is a "controller", it
// handles a request, writing the response.
function newtest(request, response) {
    const contextData = {
        title: 'Eventbrite clone project starter',
        salutation: 'Hello Yalies!',

    };
    response.render('test', contextData);
}

module.exports = {
    newtest,
};
