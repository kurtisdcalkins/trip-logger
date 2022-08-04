
// Event listener for the add trip button which displays the trip type section
const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('trip-selector').style.display = 'flex';
});





// ******** Show/hide the input forms depending on the which radio button is chosen

// Variables for the input divs
const tripSection = document.querySelector('#trip-input');
const dayTripInput = document.querySelector('#day-trip-input');
const multiTripInput = document.querySelector('#multi-trip-input');


// Radio button variables
const dayButton = document.querySelector('#day-trip-radio');
const multiButton = document.querySelector('#multi-day-trip-radio');


// Add event listener to radio day trip radio button
dayButton.addEventListener('click', (event) => {
    tripSection.style.display = 'inherit';
    dayTripInput.style.display = 'inherit';
    multiTripInput.style.display = 'none';
});

// Add event listener to radio multi-day trip radio button
multiButton.addEventListener('click', (event) => {
    tripSection.style.display = 'inherit';
    multiTripInput.style.display = 'inherit';
    dayTripInput.style.display = 'none';
});



// ********* Submit completed form to the Trips List section as readonly and then reset form and rehide

// Assign each form element to a variable
const titleForm = document.querySelector('#title-form');
const dateForm = document.querySelector('#date-details');
const trailForm = document.querySelector('#trail-details');
const groupForm = document.querySelector('#group-details');
const difficultyForm = document.querySelector('#difficulty-details');
const funRatingForm = document.querySelector('#fun-rating-details');

const dayForm = document.querySelector('#day-trip-form');
const multiDayForm =document.querySelector('#multi-trip-form')

const allTripsDiv = document.querySelector('.all-trips-div');

// Submit the form and append it to the Trips List section
function addTripToList(form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
    
        // Creates the div and assigns a class attribute. This div will hold a single trip.
        let tripDiv = document.createElement('div');
        tripDiv.setAttribute('class', 'each-trip');
        // eachTripDiv.setAttribute('data-key', '');
    
        // Clones the form to be added to the trips list section. The original form is thus preserved.
        const clone = form.cloneNode(true);
        clone.setAttribute('id', 'trip');
        tripDiv.appendChild(clone);
        allTripsDiv.insertBefore(tripDiv, allTripsDiv.children[0]);
    
        // Calls functions to set attributes of 'readonly' and 'disabled'
        lockDescriptionItem(clone.querySelectorAll('input'));
        changeToReadonly(clone.querySelector('textarea'));
    
        // Resets the form fields
        dayForm.reset();

        // Re-hide forms and trip type sections
        multiTripInput.style.display = 'none';
        dayTripInput.style.display = 'none';
        document.getElementById('trip-selector').style.display = 'none';
        document.getElementById('trip-input').style.display = 'none';
        clone.querySelector('#description-submit').style.display = 'none';
        
        // // Make the trips list items editable with a double-click
        // const tripsList = document.getElementById('.all-trips-div').document.getElementsByTagName('input');
        
        // tripsList.forEach(createEventListener);
    });
}


// Call addTripToList function on each form
addTripToList(dayForm);
addTripToList(multiDayForm);


// Function to give an HTML element an attribute of 'readonly' and 'disabled' so the text gets locked
function changeToReadonly(item) {
    createEventListener(item);
    item.setAttribute('readonly', true);
    // item.setAttribute('disabled', 'disabled');
}


// Function that steps through each HTML element in an array of elements and calls 'changeToReadonly'
function lockDescriptionItem(arr) {
    arr.forEach(changeToReadonly);
}





// ************ Add event listeners to trips list items in order to edit
function createEventListener(item) {
    item.addEventListener('dblclick', (e) => {

        // item.removeAttribute('disabled');
        item.removeAttribute('readonly');
    });
    item.addEventListener('keyup', event => {
        if (event.code === 'Enter') {
            event.preventDefault();
            item.setAttribute('readonly', true);
        }
    })

}













// A list that stores all of the trips
let allTrips = [];

function addTrip(title, date, trails, group, difficulty, funRating, description) {
    // Create a trip object with each piece of information
    const trip = {
        id: Date.now(),
        title: title,
        date: date,
        trails: trails,
        group: group,
        difficulty: difficulty,
        funRating: funRating,
        description: description,
    };

    // Add the trip to the allTrips list
    allTrips.push(trip);
    // Call renderTrip to set the trip to read-only
    renderTrip(trip);

};






