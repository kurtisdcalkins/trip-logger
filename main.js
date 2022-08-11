

// Event listener for the add trip button which displays the trip type section
const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('trip-selector').style.display = 'flex';
    document.querySelector('.day-selector').style.marginBottom = '5rem';
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
    document.querySelector('.day-selector').style.opacity = '.8';
    document.querySelector('.day-selector').style.backgroundColor = 'inherit';
    document.querySelector('.day-selector').style.boxShadow = 'none';
    document.querySelector('.day-selector').style.marginBottom = 'inherit';
});

// Add event listener to radio multi-day trip radio button
multiButton.addEventListener('click', (event) => {
    tripSection.style.display = 'inherit';
    multiTripInput.style.display = 'inherit';
    dayTripInput.style.display = 'none';
    document.querySelector('.day-selector').style.opacity = '.8';
    document.querySelector('.day-selector').style.backgroundColor = 'inherit';
    document.querySelector('.day-selector').style.boxShadow = 'none';
    document.querySelector('.day-selector').style.marginBottom = 'inherit';
});



// ********* Submit completed form to the Trips List section as readonly and then reset form and rehide

// Assign each form element to a variable
// Day trip form variables
const titleForm = document.querySelector('#day-title-form');
const dateForm = document.querySelector('#date-form');
const trailForm = document.querySelector('#day-trail-form');
const groupForm = document.querySelector('#day-group-form');
const difficultyForm = document.querySelector('#day-difficulty-form');
const funRatingForm = document.querySelector('#day-fun-rating-form');
const paragraphForm = document.querySelector('#day-description-form');

// Multi-day trip form variables
const multiTitleForm = document.querySelector('#multi-title-form');
const startDateForm = document.querySelector('#start-date-form');
const endDateForm = document.querySelector('#end-date-form');
const multiGroupForm = document.querySelector('#multi-group-form');
const multiParagraphForm = document.querySelector('#multi-description-form');


// A list that stores all of the trips
let allTrips = [];

const allTripsDiv = document.querySelector('.all-trips-div');


// For day trips
function addDayTrip(title, date, trails, group, difficulty, funRating, description) {
    // Create a trip object with each piece of information
    const trip = {
        id: Date.now(),
        tripType: 'day',
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
        tripType: 'multi',
        title: title.value,
        startDate: startDate.value,
        endDate: endDate.value,
        group: group.value,
        description: description.value,
        subTrips: [],
    };

    // Add the trip to the allTrips list
    allTrips.push(trip);
};

// For sub trips
function addSubTrip(title, date, trails, group, difficulty, funRating, description, parentId) {
    // Create a trip object with each piece of information
    const trip = {
        id: Date.now(),
        tripType: 'sub',
        title: title.value,
        date: date.value,
        trails: trails.value,
        group: group.value,
        difficulty: difficulty.value,
        funRating: funRating.value,
        description: description.value,
    };

    // Add the trip to the parent allTrips list
    for (let i = 0; i < allTrips.length; i++) {
        if (allTrips[i].id === parentId) {
            allTrips[i].subTrips.push(trip);
        }
    }
};







const dayForm = document.querySelector('#day-trip-form');
const multiDayForm =document.querySelector('#multi-trip-form')




// ##**## Function that checks which form is used and calls the appropriate add function
function addTripToList(form) {
    if (form == dayForm) {
        addDayTrip(titleForm, dateForm, trailForm, groupForm, difficultyForm, funRatingForm, paragraphForm);
    } else {
        addMultiDayTrip(multiTitleForm, startDateForm, endDateForm, multiGroupForm, multiParagraphForm);
    }
}


// Calls addTripToList then resets and hides forms
function submitAction(form) {
    addTripToList(form);
    form.reset();
    dayButton.checked = false;
    multiButton.checked = false;
    // Re-hide forms and trip type sections
    multiTripInput.style.display = 'none';
    dayTripInput.style.display = 'none';
    document.getElementById('trip-selector').style.display = 'none';
    document.getElementById('trip-input').style.display = 'none';

}


// Adds event listener to submit button and then calls submitAction
function formEvent(form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        document.querySelector('.day-selector').style.boxShadow = '-1rem 1rem 1rem black';
        document.querySelector('.day-selector').style.backgroundColor = 'cornflowerblue';
        submitAction(form);
        // render(tripsList);
        let lastTrip = getLastTrip(allTrips);
        let html;
        let parentDiv;
        if (lastTrip.tripType == 'day') {
            html = setDayInnerHtml(lastTrip);
            parentDiv = document.getElementById('all-trips-div');
        } else if (lastTrip.tripType == 'multi') {
            html = setMultiInnerHtml(lastTrip);
            parentDiv = document.getElementById('all-trips-div');
        }
        let eachTripList = createTripDiv(html);
        // make text editable
        let textInputsList = createInputsList(eachTripList);
        // Call removeReadOnly on each item in textInputsList to give each one an event listener
        for (let each in textInputsList) {
            removeReadonly(textInputsList[each], allTrips)
        };
        appendNewDiv(eachTripList, parentDiv);

        // To create sub trips
        if (lastTrip.tripType == 'multi') {
            const parentId = lastTrip.id;
            const subForm = document.querySelector('#sub-trip-form');
            const subButton = document.getElementById('add-subtrip-button');

            const parentSubForm = subForm.parentElement;
            // Adds event listener to the 'Add a sub-trip' button to show the the subform
            subButton.addEventListener('click', event => {
                parentSubForm.style.display = 'inherit';
                subForm.style.display = 'inline';
            });
            // Adds event listener to the subform 'submit' button and reproduces the rest of the submission steps for the other forms above
            subForm.addEventListener('submit', event => {
                event.preventDefault();
                parentSubForm.style.display = 'none';

                // Sub trip form variables
                const titleSubForm = document.querySelector('#sub-title-form');
                const dateSubForm = document.querySelector('#sub-date-form');
                const trailSubForm = document.querySelector('#sub-trail-form');
                const groupSubForm = document.querySelector('#sub-group-form');
                const difficultySubForm = document.querySelector('#sub-difficulty-form');
                const funRatingSubForm = document.querySelector('#sub-fun-rating-form');
                const paragraphSubForm = document.querySelector('#sub-description-form');
                const subTripsList = lastTrip.subTrips;
                
                // Calls 'addSubTrips which adds the form input text to an object and appends it to the correct multi-day trip object
                addSubTrip(titleSubForm, dateSubForm, trailSubForm, groupSubForm, difficultySubForm, funRatingSubForm, paragraphSubForm, parentId);
                // Gets the correct sub-trip object
                const lastListTrip = subTripsList[subTripsList.length - 1];
                // Sets the correct innerHTML
                const subHtml = setSubInnerHtml(lastListTrip);
                // Finds the correct multi-trip to use as the parent of the sub trip
                const subParentDiv = document.getElementById(`${parentId}`);
                // Creates a new div with the sub-trip inner HTML
                let subTripDiv = createTripDiv(subHtml);
                // Create a list of all the inputs
                let subTextInputsList = createInputsList(subTripDiv);
                // Adds event listeners to each input to alllow editing
                for (let each in subTextInputsList) {
                    removeReadonly(subTextInputsList[each], subTripsList)
                };
                // Appends the created div to the parent multi-day trip div
                subParentDiv.appendChild(subTripDiv);
                // Resets and hides the form for later use
                subForm.reset();
                subForm.style.display = 'none';
            });
        }
        // Persist the app state to the browser's local storage
        localStorage.setItem('allTripsRef', JSON.stringify(allTrips));
    })
}


// Add the event listener to each form
formEvent(dayForm);
formEvent(multiDayForm);


// Function that grabs last item of allTrips list
function getLastTrip(arr) {
    const lastTrip = arr[arr.length - 1];
    return lastTrip;
}


// ********** Creates and appends new div for the submitted inner HTML

// Creates an empty div with innerHTML as a parameter, so it can be used to create any div
function createTripDiv(html) {
    // Create a new div for the html to 
    const eachTripList = document.createElement('div');
    eachTripList.innerHTML = html;
    eachTripList.setAttribute('class', 'trip-div');
    return eachTripList;
    
}


// Appends the new div to the specified parent
function appendNewDiv(newDiv, parentDiv) {
    // Adding the trip to the Trips List Section at the top
        parentDiv.insertBefore(newDiv, parentDiv.children[0]);
    }

 
    


// Function to grab each form input and place it into a list
function createInputsList(eachTripList) {
    // Save each input element into a varibale
    const inputObjects = eachTripList.getElementsByTagName('input');
    // Iterate through the inputObjects object to create an array of each input
    let textInputsList = [];
    for (let i=0; i < inputObjects.length; i++) {
        textInputsList.push(inputObjects[i]);
    }
    // Add the textarea field to the list
    const textAreaInput = eachTripList.querySelector('.description');
    textInputsList.push(textAreaInput)
    return textInputsList;
}




// Allows the readonly input to be edited when double-clicked
function removeReadonly(item, allTrips) {
    //  Add event listener to the item
    item.addEventListener('dblclick', event => {
        // Remove the readonly attribute
        item.removeAttribute('readonly');
        // Add another event listener for when the user presses 'Enter' key
        item.addEventListener('keyup', event => {
            if (event.code == 'Enter') {
                const attr = item.name;
                // Reassigns the value of the key to what was typed into the input
                allTrips[allTrips.length - 1][attr] = item.value;
                // Sets the input to readonly again
                item.setAttribute('readonly', 'readonly');
                item.blur();
            }
        });
    })
};




// Create an event listener for the add a sub-trip button, which creates a copy of the day trip form
function cloneDayForm(button) {
    button.addEventListener('click', event => {
        const useForm = document.getElementById('single-trip-form');
        const clone = useForm.cloneNode(true);
        return clone;
    })
}




// ******************** The inner HTML to be rendered when the user presses 'Submit ***************


// Sets the innerHTML to the day trip
function setDayInnerHtml(lastTrip) {
    const dayTripHTML = `
        <div class="single-trip" id="${lastTrip.id}">
            <form  id="day-trip">
                <input value="${lastTrip.title}" 'type="text" name="title" class="title" id="day-title" readonly required >
                <div class="date">
                    <input type="date" name="date" class="single-date" id="day-date" readonly placeholder="Date of trip" value="${lastTrip.date}">
                </div>
                <div class="map-details" id="map-details">
                    <img id="image"/>
                    <div class="details">

                        <div class="detail-div">
                            <label for="trail-detail">Trail(s):</label>
                            <input name="trails" class="detail" id="day-trail" type="text" readonly value="${lastTrip.trails}">
                        </div>
                        
                        <div class="detail-div">
                            <label for="group-detail">Group:</label>
                            <input name="group" class="detail" id="day-group" type="text" readonly value="${lastTrip.group}" >
                        </div>
                        
                        <div class="detail-div">
                            <label for="difficulty-detail">Difficulty:</label>
                            <div class="rating">
                                <input name="difficulty" class="detail" id="day-difficulty" type="text" name="" id="" readonly value="${lastTrip.difficulty}" size="1">/10
                            </div>
                        </div>
                        
                        <div class="detail-div">
                            <label for="fun-rating-detail">Fun Rating:</label>
                            <div class="rating">
                                <input name="funRating" class="detail" id="day-fun-rating" type="text" readonly value="${lastTrip.funRating}" size="1">/10
                            </div>
                        </div>

                    </div>
                </div>
                <div class="paragraph" id="paragraph-div">
                    <label for="trip-detail">Description:</label>
                    <textarea name="description" class="description" id="day-description" cols="30" rows="10" readonly >${lastTrip.description}</textarea>
                </div>
            </form>
        </div>
        `;

        return dayTripHTML;
        
    }



    // Sets the innerHTML to the multi trip
function setMultiInnerHtml(lastTrip) {
    const multiTripHTML = `
        <div class="single-trip" id="${lastTrip.id}">
            <form  id="multi-trip">
                <input value="${lastTrip.title}" 'type="text" name="title" class="title" id="multi-title" readonly required >
                <div class="date">
                    <input type="date" name="startDate" class="multi-date" id="start-date" readonly placeholder="Start Date" value="${lastTrip.startDate}" size="7">
                    <p>through<p>
                    <input type="date" name="endDate" class="multi-date" id="end-date" readonly placeholder="End Date" value="${lastTrip.endDate}">
                </div>
                <div class="map-details" id="map-details">
                    <img id="image"/>
                    <div class="details">
                        
                        <div class="detail-div">
                            <label for="group-detail">Group:</label>
                            <input name="group" class="detail" id="multi-group" type="text" readonly value="${lastTrip.group}" >
                        </div>

                    </div>
                </div>
                <div class="paragraph" id="paragraph-div">
                    <label for="trip-detail">Description:</label>
                    <textarea name="description" class="description" id="multi-description" cols="30" rows="10" readonly >${lastTrip.description}</textarea>
                </div>
            </form>
            <button id="add-subtrip-button">+ Add a sub-trip</button>
            <div class="single-trip" id="single-trip-form">
                <form class="trip-form" id="sub-trip-form">
                    <input type="text" class="title" id="sub-title-form" placeholder="Title" required>
                    <div class="date">
                        <input type="date" class="single-date" id="sub-date-form" placeholder="Date of trip">
                    </div>
                    <div class="map-details" id="map-details">
                        <img id="image" />
                        <div class="details">

                            <div class="detail-div">
                                <label for="trail-detail">Trail(s):</label>
                                <input class="detail" id="sub-trail-form" type="text" placeholder="trails">
                            </div>
    
                            <div class="detail-div">
                                <label for="group-detail">Group:</label>
                                <input class="detail" id="sub-group-form" type="text" placeholder="Driver: Vehicle" size="100">
                            </div>

                            <div class="detail-div">
                                <label for="difficulty-detail">Difficulty:</label>
                                <input class="detail" id="sub-difficulty-form" type="text" placeholder="rating out of 10">
                            </div>
    
                            <div class="detail-div">
                                <label for="fun-rating-detail">Fun Rating:</label>
                                <input class="detail" id="sub-fun-rating-form" type="text" placeholder="fun rating out of 10">
                            </div>
    
                        </div>
                    </div>
                    <div class="paragraph" id="paragraph-div">
                        <label for="trip-detail">Description:</label>
                        <textarea class="description" name="" id="sub-description-form" cols="30" rows="10"></textarea>
                        <button id="description-submit" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        `;

        return multiTripHTML;
        
    }

 
// Sets the innerHTML to the sub trip
function setSubInnerHtml(lastTrip) {
    const subTripHTML = `
        <div class="single-trip sub" id="${lastTrip.id}">
            <form  id="sub-trip">
                <input value="${lastTrip.title}" 'type="text" name="title" class="title" id="sub-title" readonly required >
                <div class="date">
                    <input type="date" name="date" class="single-date" id="sub-date" readonly placeholder="Date of trip" value="${lastTrip.date}">
                </div>
                <div class="map-details" id="map-details">
                    <img id="image"/>
                    <div class="details">

                        <div class="detail-div">
                            <label for="trail-detail">Trail(s):</label>
                            <input name="trails" class="detail" id="sub-trail" type="text" readonly value="${lastTrip.trails}">
                        </div>
                        
                        <div class="detail-div">
                            <label for="group-detail">Group:</label>
                            <input name="group" class="detail" id="sub-group" type="text" readonly value="${lastTrip.group}" >
                        </div>
                        
                        <div class="detail-div">
                            <label for="difficulty-detail">Difficulty:</label>
                            <div class="rating">
                                <input name="difficulty" class="detail" id="sub-difficulty" type="text" name="" id="" readonly value="${lastTrip.difficulty}" size="1">/ 10
                            </div>
                        </div>
                        
                        <div class="detail-div">
                            <label for="fun-rating-detail">Fun Rating:</label>
                            <div class="rating">
                                <input name="funRating" class="detail" id="sub-fun-rating" type="text" readonly value="${lastTrip.funRating}" size="1">/ 10
                            </div>
                        </div>

                    </div>
                </div>
                <div class="paragraph" id="paragraph-div">
                    <label for="trip-detail">Description:</label>
                    <textarea name="description" class="description" id="sub-description" cols="30" rows="10" readonly >${lastTrip.description}</textarea>
                </div>
            </form>
        </div>
        `;

        return subTripHTML;
        
    }   





// ###### Section to persist data to local storage

function renderFromAllTrips(tripsList) {
    tripsList.forEach((trip) => {
        const parentDiv = document.getElementById('all-trips-div');
        if (trip.tripType === 'day') {
            let html = setDayInnerHtml(trip);
            let eachTripList = createTripDiv(html);
            let textInputsList = createInputsList(eachTripList);
            for (let each in textInputsList) {
                removeReadonly(textInputsList[each], allTrips);
            }
            appendNewDiv(eachTripList, parentDiv);
        } else {
            let html = setMultiInnerHtml(trip);
            let parentId = trip.id;
            const subTripsList = trip.subTrips;
            let eachTripList = createTripDiv(html);
            let textInputsList = createInputsList(eachTripList);
            for (let each in textInputsList) {
                removeReadonly(textInputsList[each], allTrips);
            }
            appendNewDiv(eachTripList, parentDiv);
            subTripsList.forEach((subTrip) => {
                const subForm = document.querySelector('#sub-trip-form');
                const subButton = document.getElementById('add-subtrip-button');

                const parentSubForm = subForm.parentElement;
                // Adds event listener to the 'Add a sub-trip' button to show the the subform
                subButton.addEventListener('click', event => {
                    parentSubForm.style.display = 'inherit';
                    subForm.style.display = 'inline';
                });
                // Adds event listener to the subform 'submit' button and reproduces the rest of the submission steps for the other forms above
                subForm.addEventListener('submit', event => {
                    event.preventDefault();
                    parentSubForm.style.display = 'none';

                    // Sub trip form variables
                    const titleSubForm = document.querySelector('#sub-title-form');
                    const dateSubForm = document.querySelector('#sub-date-form');
                    const trailSubForm = document.querySelector('#sub-trail-form');
                    const groupSubForm = document.querySelector('#sub-group-form');
                    const difficultySubForm = document.querySelector('#sub-difficulty-form');
                    const funRatingSubForm = document.querySelector('#sub-fun-rating-form');
                    const paragraphSubForm = document.querySelector('#sub-description-form');
                    
                    // Sets the correct innerHTML
                    const subHtml = setSubInnerHtml(subTrip);
                    // Finds the correct multi-trip to use as the parent of the sub trip
                    const subParentDiv = document.getElementById(`${parentId}`);
                    // Creates a new div with the sub-trip inner HTML
                    let subTripDiv = createTripDiv(subHtml);
                    // Create a list of all the inputs
                    let subTextInputsList = createInputsList(subTripDiv);
                    // Adds event listeners to each input to alllow editing
                    for (let each in subTextInputsList) {
                        removeReadonly(subTextInputsList[each], subTripsList)
                    };
                    // Appends the created div to the parent multi-day trip div
                    subParentDiv.appendChild(subTripDiv);
                    // Resets and hides the form for later use
                    subForm.reset();
                    subForm.style.display = 'none';
                }); 
            })
        }
    })
}




document.addEventListener('DOMContentLoaded', () => {
    if (ref) {
        allTrips = JSON.parse(ref);
        renderFromAllTrips(allTrips);
    }
})











