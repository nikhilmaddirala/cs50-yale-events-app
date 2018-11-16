// Create a function which is a "controller", it
// handles a request, writing the response.
function about(request, response) {
    const contextData = {
        title: 'Eventbrite clone project starter',
        salutation: 'Hello Yalies!',

    };
    response.render('about', contextData);
}

module.exports = {
    about,
};
