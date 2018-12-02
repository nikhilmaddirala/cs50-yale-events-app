/*
    This is a small function that demonstrates how to
    add client-side javascript behavior.
*/
(function () {
    const catImages = document.querySelectorAll('div.cat-holder img');
    let chosenCat = Math.floor(Math.random() * catImages.length);

    function nextCat() {
        chosenCat = (chosenCat + 1) % catImages.length;
        const previousCat = document.getElementById('chosen-cat');
        if (previousCat !== null) {
            previousCat.setAttribute('id', '');
        }
        catImages[chosenCat].setAttribute('id', 'chosen-cat');
    }
    document.getElementById('next-cat')
        .addEventListener('click', nextCat);
    nextCat();

})();


