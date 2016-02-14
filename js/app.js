var colours = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];

// var random = Math.floor(Math.random()*16777215).toString(16);


var wrapper = $('.js-wrapper'), //  Declare variables
    button = '.js-submit',
    profile = '.js-profile',
    profileInput = '.js-input',
    profileImg = '.js-image',
    profileImgContainer = '.js-image-container',
    profileTextContainer = '.js-initials',
    profileInputMsg = '.js-feedback',
    sideBar = '.js-sidebar-wrapper',
    initialsHold = '.js-initials-holder',
    contentHold = '.js-sidebar-inner-wrapper',
    initialsLastDiv = '.js-sidebar-wrapper .js-sidebar-inner-wrapper:last',
    inputValue, letters;


//Event added to the submit button
//Handles validation on click and if all are true it creates the initials
wrapper.off('click', button).on('click', button, function(e) {
  e.preventDefault();
  checkInput(); // call the function on click
});

//Event added to the input on focus
//Clears the value in the input on focus
wrapper.off('focus', profileInput).on('focus', profileInput, function(e) {
  e.preventDefault();
  checkValOnFocus(); //call the function on focus
});

//Even added to the input on keyup
//Handles validation on keyup
wrapper.off('keyup', profileInput).on('keyup', profileInput, function(e) {
  e.preventDefault();
  checkValOnKeyUp(); //call the function on keyup
});



function intialsAvatar() { //Declare function

  var profileNameVal = $(profileInput).val(), // Get the value in the input
      initials,
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
  $(profileTextContainer).removeClass('hide').text(initials); //Show the initials
  $(profile).css('background-color', colours[coloursIndex]); //Change the background-color

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
      getName = $(profileInput).val();
      getBackgroundColor = $(profile).css("background-color"), // Get the background-color
      contentHolder = $('<div>').addClass('js-sidebar-inner-wrapper'), //create the html for the content holder, add the class
      initialsHolder = $('<div>').addClass('js-initials-holder').text(getText).css('background-color', getBackgroundColor), //create the html for the initials holder, add the class, add the initials and the background-color
      nameHolder = $('<span>').addClass('js-name').text(getName); //create the html for the name holder, add the class and add the name

  if($(contentHold).length < 5) { // Check if the divs created with the initials are less than 5
   $(sideBar).append(contentHolder); // Add the div to the sidebar
   $(contentHolder).prepend(initialsHolder).append(nameHolder); // Add the divs to the sidebar inner wrapper
  }
  else if ($(contentHold).length >= 5) { // Check if the divs created with the initials are great than or equal to 5
   $(initialsLastDiv).remove(); // Remove the last div on the sidebar
   $(sideBar).prepend(contentHolder); // Add the div to the sidebar
   $(contentHolder).prepend(initialsHolder).append(nameHolder); // Add the divs to the sidebar inner wrapper

  }

}


////////////////////////////////////////////////////////////////////////
// Alternative method for creating the initials and the random color. This doesn't allow a colour to be used more than once on an initial. each initial has it's only specific color.

// String.prototype.hashCode = function() {
// 			var hash = 0,
// 						i, chr, len;
// 			if (this.length == 0) return hash;
// 			for (i = 0, len = this.length; i < len; i++) {
// 						chr = this.charCodeAt(i);
// 						hash = ((hash << 5) - hash) + chr;
// 						hash |= 0; // Convert to 32bit integer
// 			}
// 			return hash;
// };
//
// String.prototype.getInitials = function(content) {
// 			if (typeof content == "undefined") {
// 						var content = true;
// 			}
// 			var initials = this.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
// 			if (content) {
// 						return initials.join('').substring(0, 2);
// 			}
// 			return initials.substring(0, 2);
// };
//
// function intialsAvatar() { //Declare function
//
//   var initials = $(profileInput).val().getInitials(), // Get the initials value in the input
//       coloursIndex = Math.floor(Math.abs($(profileInput).val().hashCode())%colours.length); // Get a random color from the color set
//
//   $(profileImgContainer).addClass('hide'); //Hide the image
//   $(profileTextContainer).removeClass('hide').text(initials); //Show the initials
//   $(profile).css('background-color', colours[coloursIndex]); //Change the background-color
// }
