var colours = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];


var wrapper = $('.wrapper'), //  Declare variables
    button = '.submit-btn',
    profile = '.profile',
    profileInput = '.profile-name',
    profileImg = '.profile-image',
    profileImgContainer = '.profile .image',
    profileTextContainer = '.profile .text',
    profileInputMsg = '.profile-feedback',
    sideBar = '.sidebar-wrapper',
    initialsHolder = 'div.initials-holder',
    initialsLastDiv = '.sidebar-wrapper .initials-holder:last',
    inputValue, letters,
    initials; // Store the initials



wrapper.off('click', button).on('click', button, function(e) {
  e.preventDefault();
  checkInput(); //call the function on click
});

wrapper.off('focus', profileInput).on('focus', profileInput, function(e) {
  e.preventDefault();
  checkValOnFocus(); //call the function on focus
});

wrapper.off('keyup', profileInput).on('keyup', profileInput, function(e) {
  e.preventDefault();
  checkValOnKeyUp(); //call the function on keyup
});



function intialsAvatar() { //Declare function

  var profileNameVal = $(profileInput).val(), // Get the value in the input
      coloursIndex = Math.floor(Math.random()*colours.length); // Get a random color from the color set

  if((/ /).test(profileNameVal)) // check if there are two names e.g "Dante Lex"
  {
   profileNameVal = profileNameVal.split(" "); //Split the names into an array
   initials = profileNameVal[0].charAt(0).toUpperCase() + profileNameVal[1].charAt(0).toUpperCase(); // Get the first letter of the first name in the first array and the first lettter of the first name in the second array
  }
  else {
   initials = profileNameVal.charAt(0).toUpperCase() // Get the first letter of the name if it's only one name
  }

  $(profileImgContainer).addClass('hide'); //Hide the image
  $(profileTextContainer).removeClass('hide').addClass('show').text(initials); //Show the initials
  $(profile).css('background-color', colours[coloursIndex]); //Change the background-color
  $(profileTextContainer).attr('data-name', initials); //Set the data attribute to the intitals value
  $(profileImg).attr('data-name', initials); //Set the data attribute to the intitals value

}

function checkInput() { // Declare function

   inputValue = $(profileInput).val(); // Get input value
   letters = !/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/g.test(inputValue); // make sure it is a string

  switch (true) {
   case (inputValue == ""):
     $(profileInputMsg).addClass('warning');  // Add class name
     $(profileInputMsg).text('Please your name should be at least one alphabet'); // Error Message if it is empty
     break;

   case (letters):
     $(profileInputMsg).addClass('warning');  // Add class name
     $(profileInputMsg).text('Please your name should contain only alphabet'); // Error Message if it is not a string
     break;

   default:
     intialsAvatar(); // call the initials function
     postInitialsAndBackColor(); // post the the initials to the side bar
     $(profileInputMsg).text('');   // Clear the error message


  }


}

function checkValOnFocus() { // Declare function

  inputValue = $(profileInput).val(); // Get input value
  letters = !/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/g.test(inputValue); // make sure it is a string

  if(letters == true) { //if it's not a string
    $(profileInput).val(''); // clear the value

  }

}

function checkValOnKeyUp() { // Declare function

   inputValue = $(profileInput).val(); // Get input value
   letters = !/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/g.test(inputValue); // make sure it is a string

   if(letters == true) { //if it's not a string
     $(profileInputMsg).addClass('warning');  // Add class name
     $(profileInputMsg).text('Please your name should contain only alphabet'); // Error Message if it is not a string
   }
   else if (letters == false) { // if it's a string
    $(profileInputMsg).text(''); // clear error message
   }

}

function postInitialsAndBackColor() {

  var getText = $(profileTextContainer).text(), //Get the initials
      getBackgroundColor = $(profile).css("background-color"), // Get the background-color
      contentHolder = $('<div>').addClass('initials-holder').attr('data-name', initials).text(getText).css('background-color', getBackgroundColor); //create the div, add the class, add the initials and the background-color

  if($(initialsHolder).length < 5) { // Check if the divs with the initials are less than 5
   $(sideBar).prepend(contentHolder); // Add the div to the sidebar
  }
  else if ($(initialsHolder).length >= 5) { // Check if the divs with the initials are great than or equal to 5
   $(sideBar).prepend(contentHolder); // Add the div to the sidebar
   $(initialsLastDiv).remove(); // Remove the last div on the sidebar
  }

}
