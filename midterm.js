/*
		CS-133S-01 - JavaScript
		Miki Marshall
		02/16/2012
		Assignment: Midterm
		
		Lighter-than Airlines.
*/

//Global Constants
									//Actual Hindenburg destinations
var DESTINATIONS = [ [ "Frankfurt, Germany", 938 ],		//Destination, $cost
					 [ "Lakehurst, New Jersey", 585 ],
					 [ "Rio de Janeiro", 490] ];
var DESTTEXT = 0;					//Destination array subscripts
var DESTCOST = 1;

var TRANSPORTTAXRATE = 8.35;		//Percentage of ticket cost
var SECURITYFEE = 48.50;			//Per passenger

//Global variables (cuz radio buttons and getElementById() drive me crazy...)
var myTicketCost = 0;
var myTotalCost = 0;


//Create destination list radio buttons
function loadData()
{
	//Create select..option tag to display preset destinations
	var selectString = "<select name='destination' id='destination' onchange='displayTotals();'>";
	
	//Append current data to field labels
	appendText("transtaxlabel", " (" + TRANSPORTTAXRATE + "%)");
	appendText("secfeelabel", " ($" + SECURITYFEE.toFixed(2) + ")");

	//For each destination entry
	for (var i in DESTINATIONS)
	{
		//Append an option entry for this destination (with price)
		selectString += "<option name='dest" + i + "' value=" + i + "'>" + DESTINATIONS[i][DESTTEXT] + " ($" + DESTINATIONS[i][DESTCOST] + ")</option>";
	}
	
	//Append closing select tag
	selectString += "</select>";
	
	//Display in form
	setText("destselect", selectString);
}

//Display destination cost
function displayTotals()
{
	//Retrieve input/option field values
	var ticketCount = getInputField("ticketcount");
	
	//Validate ticket count input
	if (isNaN(ticketCount) || ticketCount < 1)
	{
		//Display an error & refocus user on bad field
		alert("Please enter the number of travelers in this party.")
		setInputField("ticketcount", "");
		setFocus("ticketcount");
		
		//Escape remaining calculations, to wait for good data
		return;
	}

	//Display calculated fields as dollar amounts
											//Destination Cost
	var destinationCost = DESTINATIONS[getSelectedIndex("destination")][DESTCOST] * ticketCount;
	setInputField("destcost", "$" + destinationCost.toFixed(2));

											//Trasportation Tax
	var transTax = destinationCost * (TRANSPORTTAXRATE / 100);
	setInputField("transporttax", "$" + transTax.toFixed(2));

											//Subtotal
	var subtotal = destinationCost + transTax;
	setInputField("subtotal", "$" + subtotal.toFixed(2));
	
											//Security Fee
	setInputField("securityfee", "$" + SECURITYFEE.toFixed(2));
	
											//Subtotal
	var total = subtotal + SECURITYFEE;
	setInputField("totalcost", "$" + total.toFixed(2));
}

//Submit order online
function makeReservation() 
{
	// Display a success message (pretending we actually submitted it)
	alert("Your reservation has been accepted. Welcome aboard our maiden flight!\n\nMay I suggest updating your life insurance policy at this time?");
}
