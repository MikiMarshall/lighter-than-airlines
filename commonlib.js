/*
	Miki's Common Function Library (JavaScript)
	
	Reusable functions I've written and collected as our 
	class has progressed, along with a few handy functions 
	offered from the textbook.
*/

// Cookies! -----------------------------------------------
// Cookie creation, reading, and deleting functions 
// (from Head First JavaScript, page 118)
// --------------------------------------------------------

//Write a cookie
function writeCookie(name, value, days) 
{
	var expires = "";
			
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
			
	document.cookie = name + "=" + value + expires + "; path=/";
}

//Read a cookie		
function readCookie(name) 
{
	var searchName = name + "=";
	var cookies = document.cookie.split(';');
	for (var i=0; i < cookies.length; i++) {
		var c = cookies[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}

		if (c.indexOf(searchName) == 0) {
			return c.substring(searchName.length, c.length);
		}
	}

	return null;
}

//Erase a cookie		
function eraseCookie(name) 
{
	writeCookie(name, "", -1);
}

// Dates! -------------------------------------------------
// General date manipulation routines.
// --------------------------------------------------------

//Get current date in a nice format
function getNiceDate()
{
	var myDate = new Date();

	//Format the date in to something usable
	var myDay = myDate.getDate();
	var myMonth = myDate.getMonth() + 1;
	var myYear = myDate.getFullYear();
	
	//Format nicely
	var myNiceDate = myMonth + "/" + myDay + "/" + myYear;		
	
	//Return the result
	return myNiceDate;
}

// Fields! ------------------------------------------------
// Simple wrappers for manipulating field values by ID.
// (It's just less typing this way.)
// --------------------------------------------------------

//Set focus on this element
function setFocus(elementId)
{
	window.document.getElementById(elementId).focus();
}

//Retrieve a form input field value by its ID  
function getInputField(elementId)
{
	return window.document.getElementById(elementId).value;
}

//Set a form input field value by its ID
function setInputField(elementId, newValue)
{
	window.document.getElementById(elementId).value = newValue;
}

//Set the value of a page element's property 
function setProperty(element, property, newValue)
{
	//Create a command as a string
	var evalString = "window.document.getElementById('" + element + "')." + property + " = '" + newValue + "';";
	
	//And evaluate it ... (This is pretty Cool!, if it works...)
	eval(evalString);
}

//Retrieve the index of the selected dropdown option
function getSelectedIndex(elementId)
{
	//Return the result
	return window.document.getElementById(elementId).selectedIndex;
}

//Set the value of a page element's style property 
function setStyle(element, property, newValue)
{
	//Create a command as a string
	var evalString = "window.document.getElementById('" + element + "').style." + property + " = '" + newValue + "';";
	
	//And evaluate it ... (This is pretty Cool!, if it works...)
	eval(evalString);
}

//Set html text (innerHTML), given its ID
function setText(elementId, newText)
{
	window.document.getElementById(elementId).innerHTML = newText;
}

//Append html text (innerHTML), given its ID
function appendText(elementId, newText)
{
	window.document.getElementById(elementId).innerHTML += newText;
}

// Forms!- ------------------------------------------------
// Simple wrappers for manipulating form input fields by ID.
// Most especially that problematic radio button (shudder).
// --------------------------------------------------------

//Return a zero-based index of the selected radio button, if any
//(return -1 if none).
function getCheckedRadioButtonIndex(form, group) 
{
	//Local variables
	var value = "";
	var index = -1;
	
	//Retrieve count of buttons in this group
	var count = getRadioButtonCount(form, group);

	//Iterate buttons and find the chosen one
	for (var i = 0; i < count; i++) 
	{
		if (isRadioButtonChecked(form, group, i))
		{
			//Save that index
			index = i;
		}
	}
	
	//Return result
	return index;
}

//Retrieve the number of radio buttons in this group
function getRadioButtonCount(form, group)
{
	//Retrieve count of buttons in group
	return eval("document." + form + "." + group + ".length");
}

//Return a radio button's value
function getRadioButtonValue(form, group, index)
{
	//Retrieve the value of the selected radio button
	return eval("document." + form + "." + group + "[" + index + "].value");
}

//Return whether a radio button has been checked
function isRadioButtonChecked(form, group, index)
{
	//Retrieve the checked property of a given radio button
	return eval("document." + form + "." + group + "[" + index + "].checked");
}

//Set a radio button's style
/* Usage: 	Radio buttons must be nested in a label, as it acts on the 
			parent node (the label) to effect the text in the label. 
			It should look like this:
				<label>
					<input type="radio" name="buttonName" value="my value" />
					Some text to go with the button
				</label>
*/
function setRadioButtonStyle(form, group, index, style, value)
{
	//Set the style of the selected radio button label
	eval("document." + form + "." + group + "[" + index + "].parentNode.style." + style + " = '" + value + "';");
}

//Set a given style for all radio buttons in this group
// (good for clearing an old style)
function setAllRadioButtonStyles(form, group, style, value)
{
	//Retrieve count of buttons in this group
	var count = getRadioButtonCount(form, group);

	//For each button
	for (var i = 0; i < count; i++) 
	{
		//Set the style
		setRadioButtonStyle(form, group, i, style, value);
	}
}


// Math! --------------------------------------------------
// Functions and wrappers that do stuff with numbers.
// --------------------------------------------------------

//Return a random number between "min" and "max" values.
// (Src: Debra Carino, CS133S (CCC), Javascript instructor)
function getRandomNumber(min, max) 
{
	//Generate a random integer between two end points
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Return a number as a properly formatted dollar amount string
//DEBUG ... THIS IS A WORK IN PROGESS ........
function asMoney(amount)
{
	var decimalStr = amount.toFixed(2);			//Given:  9999999.99
	var decimalPos = decimalStr.indexOf(".");	//=7: 0-based pos. of decimal
	var commaCnt = decimalPos / 3;				//=2: # of commas
	var firstCommaPos = decimalPos % 3;			//=1: 0-based pos. of 1st comma
	var relativePos = 0;
	var result = "$";
	
	if (commaCnt > 0)
	{
		//Add the section before the first comma
		if (firstCommaPos > 0)
		{
			result += decimalStr.substr(0, firstCommaPos) + ",";
			relativePos = firstCommaPos;
		}
alert("@A: " + result);		
		//For each remaining comma
		for (var i = 1; i < commaCnt - 1; i++)
		{
			//Append the next group of 3 chars and a comma
			result += decimalStr.substr(relativePos, 3) + ",";
			relativePos += 3;
alert("@B: " + result);		
		}
		
		//Append the rest of the string
		result += decimalStr.substr(relativePos, (decimalStr.length - relativePos));
alert("@C: " + result);		
	}
	else
	{
		//No commas necessary
		result += decimalStr;
alert("@X: " + result);		
	}
	
	//Return what just happened above ...
	return result;
}