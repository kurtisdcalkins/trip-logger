
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
// Day trip form variables
const titleForm = document.querySelector('#day-title-form');
const dateForm = document.querySelector('#date-details');
const trailForm = document.querySelector('#trail-details');
const groupForm = document.querySelector('#day-group-details');
const difficultyForm = document.querySelector('#difficulty-details');
const funRatingForm = document.querySelector('#fun-rating-details');
const paragraphForm = document.querySelector('#day-trip-paragraph');

// Multi-day trip form variables
const multiTitleForm = document.querySelector('#multi-title-form');
const startDateForm = document.querySelector('#start-date-details');
const endDateForm = document.querySelector('#end-date-details');
const multiGroupForm = document.querySelector('#multi-group-details');
const multiParagraphForm = document.querySelector('#multi-trip-paragraph');


// A list that stores all of the trips
let allTrips = [];

const allTripsDiv = document.querySelector('.all-trips-div');


// For day trips
function addDayTrip(title, date, trails, group, difficulty, funRating, description) {
    // Create a trip object with each piece of information
    const trip = {
        id: Date.now(),
        title: title.value,
        date: date.value,
        trails: trails.value,
        group: group.value,
        difficulty: difficulty.value,
        funRating: funRating.value,
        description: description.value,
    };

    // Add the trip to the allTrips list
    allTrips.push(trip);
};


// For multi-day trips
function addMultiDayTrip(title, startDate, endDate, group, description) {
    // Create a trip object with each piece of information
    const trip = {
        id: Date.now(),
        title: title.value,
        startDate: startDate.value,
        endDate: endDate.value,
        group: group.value,
        description: description.value,
        subTrips: [null],
    };

    // Add the trip to the allTrips list
    allTrips.push(trip);
};




const dayForm = document.querySelector('#day-trip-form');
const multiDayForm =document.querySelector('#multi-trip-form')






// Add all the values to the allTrips list
function formEvent(form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        let tripType;
        // Check which form type it is
        if (form == dayForm) {
            addDayTrip(titleForm, dateForm, trailForm, groupForm, difficultyForm, funRatingForm, paragraphForm);
            // Call renderTrip to set the trip to read-only
            tripType = 'dayTrip'
            renderDayTrip(tripType);
            // Resets the form fields
            dayForm.reset();
        } else {
            addMultiDayTrip(multiTitleForm, startDateForm, endDateForm, multiGroupForm, multiParagraphForm);
            // Call renderTrip to set the trip to read-only
            renderDayTrip(tripType);
            // Resets the form fields
            multiDayForm.reset();
        }
        
        dayButton.checked = false;
        multiButton.checked = false;
        // Re-hide forms and trip type sections
        multiTripInput.style.display = 'none';
        dayTripInput.style.display = 'none';
        document.getElementById('trip-selector').style.display = 'none';
        document.getElementById('trip-input').style.display = 'none';
    });
};

formEvent(dayForm);
formEvent(multiDayForm);



// Renders the day trip to the Trips List section and adds an event listener to make the inputs editable
function renderDayTrip(tripType) {
    const lastTrip = allTrips.length - 1;
    const tripData = allTrips[lastTrip];

    // Create the new div with the correct the above html body
    const eachTripList = document.createElement('div');
    eachTripList.setAttribute('class', "each-trip");

    let submittedTrip;
    if (tripType == 'dayTrip') {
        submittedTrip = `
            <div class="single-trip" id="${tripData.id}">
                <form action="" id="day-trip-form">
                    <input value="${tripData.title}" 'type="text" class="title" id="title" readonly required >
                    <h3 id="date-header">${tripData.date}</h3>
                    <div class="map-details" id="map-details">
                        <img src="./Images/Screenshot_of_map.png" alt="map">
                        <div class="details">
    
                            <div class="detail">
                                <label for="date-detail">Date:</label>
                                <input class="detail" id="date" type="text" readonly required value="${tripData.date}">
                            </div>
                            
                            <div class="detail">
                                <label for="trail-detail">Trail(s):</label>
                                <input class="detail" id="trails" type="text" readonly value="${tripData.trails}">
                            </div>
                            
                            <div class="detail">
                                <label for="group-detail">Group:</label>
                                <input class="detail" id="group" type="text" readonly value="${tripData.group}" >
                            </div>
                            
                            <div class="detail">
                                <label for="difficulty-detail">Difficulty</label>
                                <input class="detail" id="difficulty" type="text" name="" id="" readonly value="${tripData.difficulty}">
                            </div>
                            
                            <div class="detail">
                                <label for="fun-rating-detail">Fun Rating</label>
                                <input class="detail" id="funRating" type="text" name="" id="" readonly value="${tripData.funRating}">
                            </div>
    
                        </div>
                    </div>
                    <div id="paragraph">
                        <label for="trip-detail">Description:</label>
                        <textarea class="paragraph" name="" id="description" cols="30" rows="10" readonly >${tripData.description}</textarea>
                    </div>
                </form>
            </div>
            `;

            eachTripList.setAttribute('id', "day-trip-output");

        } else {
        submittedTrip = `
            <div class="single-trip" id="${tripData.id}">
                <form action="" id="multi-trip-form">
                    <input type="text" class="title" id="title" placeholder="Title" readonly required value="${tripData.title}">
                    <div class="map-details" id="map-details">
                        <img src="./Images/Screenshot_of_map.png" alt="map">
                        <div class="details">
                            
                            <div class="detail">
                                <label for="startDate">Start Date:</label>
                                <input class="detail" id="startDate" type="text" placeholder="Start date"  readonly required value="${tripData.startDate}">
                            </div>
        
                            <div class="detail">
                                <label for="end-date-detail">End Date:</label>
                                <input class="detail" id="endDate" type="text" placeholder="End date" readonly required value="${tripData.endDate}">
                            </div>
        
                            <div class="detail">
                                <label for="group-detail">Group:</label>
                                <input class="detail" id="group" type="text" placeholder="Drive: Vehicle" readonly value="${tripData.group}">
                            </div>
        
                        </div>
                    </div>
                    <div id="paragraph">
                        <label for="trip-detail">Description:</label>
                        <textarea class="paragraph" name="" id="description" cols="30" rows="10" readonly>${tripData.description}</textarea>
                    </div>
                </form>
                <button id="add-subtrip-button">Add a day trip</button>
            </div>
            `;

            eachTripList.setAttribute('id', "multi-trip-output");

            
        }
        
        eachTripList.innerHTML = submittedTrip;
        
        
        // ######## Add event listeners to each input so they can be edited later
        // Making the text editable
        // Save each input element into a varibale
        const inputObjects = eachTripList.getElementsByTagName('input');
        // Iterate through the test object to create an array of each input
        let textInputsList = [];
        for (let i=0; i < inputObjects.length; i++) {
            textInputsList.push(inputObjects[i]);
        }
        // Add the textarea field to the list
        const textAreaInput = eachTripList.querySelector('#description');
        textInputsList.push(textAreaInput)
        
        // Call removeReadOnly on each item in textInputsList to give each one an event listener
        for (let each in textInputsList) {removeReadonly(textInputsList[each], tripData)};
        
        
        // Adding the trip to the Trips List Section at the top
        allTripsDiv.insertBefore(eachTripList, allTripsDiv.children[0]);

        if (tripType !== 'dayTrip') {
            const childTrip = document.createElement('div');
            childTrip.setAttribute('class', 'subtrip');
            const eachTripChild = document.getElementById(tripData.id);

            const useForm = document.getElementById('single-trip-form');
            const clone = useForm.cloneNode(true);
            clone.style.display = 'none';
            childTrip.appendChild(clone);
            eachTripChild.appendChild(childTrip);
            const addSubtripButton = document.querySelector('#add-subtrip-button');
            addSubtripButton.addEventListener('click', event => {
                clone.style.display = 'inherit';
            });
        };
    };




// Allows the readonly input to be edited when double-clicked
function removeReadonly(item, data) {
    //  Add event listener to the item
    item.addEventListener('dblclick', event => {
        // Remove the readonly attribute
        item.removeAttribute('readonly');
        // Add another event listener for when the user presses 'Enter' key
        item.addEventListener('keyup', event => {
            if (event.code == 'Enter') {
                // Reassigns the value of the key to what was typed into the input
                data[item.id] = item.value;
                // Updates the header display of the date
                if (item.id == 'date') {
                    const dateHeader = document.getElementById('date-header');
                    dateHeader.textContent = item.value;
                }
                // Sets the input to readonly again
                item.setAttribute('readonly', 'readonly');
                item.blur();
            }
        })
    })
}






function renderSubTrip() {

}

















