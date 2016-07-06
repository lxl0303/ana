PopupCalendarProperties = function (){

	// maximum limit of selectable day from system date
	this.maxLimitDays = null;

	// maximum limit of selectable month from system date
	this.maxLimitMonths = 11;
	
	// shows holiday
	// true:shows false:not shows
	this.isDispHoliday = true;
	
	// locale of the popup calendar
	// "J":Japanese "E":English
	this.locale = "J";
	
	// length of the popup calendar that shows up
	this.calendarLength = 3;
	
	// weekday
	this.weekDay = true;
	
	return this;
};
