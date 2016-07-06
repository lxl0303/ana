//Day list
var day_list = createDbList(31, "日", 1, true);

function getDaylength(month) {
	
	var dayNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var date  = new Date();
	var year = date.getFullYear();
	var mon  = date.getMonth() + 1;
	if (mon > 2) {
		year++;
	}
   	if (typeof month == "undefined") month = date.getMonth() + 1;	
	var lastDay = dayNum[month-1];
	
	if (month == 2) {//閏年の確認
		lastDay += (year%4 == 0 && year%100 != 0 || year%400 == 0);
	}
	
	return lastDay;
}

function getSelectedValue(target) {

	return target.options[target.options.selectedIndex].value;
}

function getDayIndex(targetMonth, targetDay) {
	
	var tempIndex = getSelectedValue(targetDay)*1;
	var dayMax = getDaylength(getSelectedValue(targetMonth));
	
	return (tempIndex > dayMax) ? dayMax: tempIndex;
}

function createDbList(leng, unitName, startNum, extra) {
	
	var dbList = new Array();
	var v;
	var t; 
	
	var index = (typeof startNum == "undefined") ? 1: startNum;
	for (i=index; i<=leng; i++) {	
		v = (typeof extra != "undefined" && i < 10) ? "0" + i: i;
		t = i+unitName;
		dbList.push({value:v, text:t});	
	}
	
	return dbList;
}

function checkParamType(param) {
	if(typeof(param)  == "object") return param;
	return document.getElementsByName(num)[0];
}

function createPulldown(pulldown, db) {

	var elem = checkParamType(pulldown);

	var newElem;
	var br = (navigator.appName == "Microsoft Internet Explorer") ? -1 : null;

	while (elem.options.length) {
		elem.remove(0);
	}

	for (var i = 0; i < db.length; i++) {
		newElem = document.createElement("option");
		newElem.text = db[i].text;
		newElem.value = db[i].value;
		elem.add(newElem, br);
	}
}

function addWeekPulldown(year, pulldown, month) {

	var elem = checkParamType(pulldown);
	var elemlength = elem.options.length;
	var monthElem = checkParamType(month);

	if (monthElem.value.length == 6) {
		var monthz = monthElem.value.substr(4,6);
	} else {
		var monthz = monthElem.value;
	}
	var cdate  = new Date();
	var nowYear = cdate.getFullYear();
	var week_list = new Array("日","月","火","水","木","金","土");
	if ((cdate.getMonth() + 1) > parseInt(monthz, 10)) {
		targetYear  = cdate.getFullYear() + 1;
	} else {
		if (nowYear < year) {
			targetYear  = cdate.getFullYear() + 1;
		} else {
			targetYear  = cdate.getFullYear();
		}
	}
	w = (new Date(targetYear, parseInt(monthz, 10)-1, 1)).getDay();

	for(var i = 0; i < elemlength; i++) {
		if(elem.options[i].value == "") continue;

			if((elem.options[i].text.match(/\(\S+\)/g)) == null){
				elem.options[i].text = elem.options[i].text + "(" + week_list[w] + ")";
			} else {
				elem.options[i].text = elem.options[i].text.replace(/\(\S+\)/g, "(" + week_list[w] + ")");
			}
			w = (w == 6) ? 0 : w+=1;
		}
}

function setPulldown(pulldown, val) {

	var elem = checkParamType(pulldown);
	for(var i = 0; i < elem.options.length; i++) {

		if(elem.options[i].value == val) {
			elem.options.selectedIndex = i;
			return true;
		}
	}
	return false;
}

function resetDay(year, monthElem, dayElem, number, extra, Prop) {
	var elem = document.getElementsByName(monthElem)[number];
	var dayElem = document.getElementsByName(dayElem)[number];

	var dayIndex = getDayIndex(elem, dayElem);

	if (typeof Prop.CalYear != "undefined") {
		month = elem.value.slice(4,6);
	} else{
		//month = month2alpha(elem.value);
		month = elem.value;
	}

	var tempList;
	tempList = day_list.slice(0, getDaylength(month));
	tempList.unshift(extra);// EX){value:"", text:"---"}

	createPulldown(dayElem, tempList);
	if (typeof Prop.weekDay != "undefined") {
		addWeekPulldown(year, dayElem, elem);
	}
	setPulldown(dayElem, dayIndex);
}

function month2alpha(alpha) {

	switch (alpha) {
		case "JAN": month = 1; break;
		case "FEB": month = 2; break;
		case "MAR": month = 3; break;
		case "APR": month = 4; break;
		case "MAY": month = 5; break;
		case "JUN": month = 6; break;
		case "JUL": month = 7; break;
		case "AUG": month = 8; break;
		case "SEP": month = 9; break;
		case "OCT": month = 10; break;
		case "NOV": month = 11; break;
		case "DEC": month = 12; break;
	}
	return month;
}

// *** Browser
var useragent =navigator.userAgent.toLowerCase();
var appVersion = parseInt(navigator.appVersion);

// * IE
var isIe = ((useragent.indexOf("msie") != -1) && (useragent.indexOf("opera") == -1));
var isIe5down = false;
if(isIe){
	var isIe3to5 = ((appVersion < 4) || ((appVersion == 4) && ((useragent.indexOf("msie 4")!=-1) || (useragent.indexOf("msie 5.0")!=-1))));
	isIe5down =(isIe && isIe3to5);
}

// * NN & FF
var isNn  = ((useragent.indexOf("mozilla")!=-1) && (useragent.indexOf("spoofer")==-1) && (useragent.indexOf("compatible") == -1) && (useragent.indexOf("opera")==-1));
var isNn6down = false;
if(isNn){
	var isNn2 = (appVersion == 2);
	var isNn3 = (appVersion == 3);
	var isNn4 = (appVersion == 4);
	var isNn6 = (appVersion == 5) && (useragent.indexOf("netscape6") != -1);
	isNn6down = (isNn2 || isNn3 || isNn4 || isNn6);
}

// * OPERA
var isOpera = (useragent.indexOf("opera") != -1);
var isOpera7down = false;
if(isOpera){
	var isOpera2 = (useragent.indexOf("opera 2") != -1 || useragent.indexOf("opera/2") != -1);
	var isOpera3 = (useragent.indexOf("opera 3") != -1 || useragent.indexOf("opera/3") != -1);
	var isOpera4 = (useragent.indexOf("opera 4") != -1 || useragent.indexOf("opera/4") != -1);
	var isOpera5 = (useragent.indexOf("opera 5") != -1 || useragent.indexOf("opera/5") != -1);
	var isOpera6 = (useragent.indexOf("opera 6") != -1 || useragent.indexOf("opera/6") != -1);
	var isOpera7 = (useragent.indexOf("opera 7") != -1 || useragent.indexOf("opera/7") != -1);
	isOpera7down = (isOpera2 || isOpera3 || isOpera4 || isOpera5 || isOpera6 || isOpera7);
}
// * SAFARI
var isSafari = (useragent.indexOf("safari") != -1);
var isSafari13down = false;
if(isSafari) {
	var tmpAgt = useragent.substring(useragent.indexOf("applewebkit/") + 12);
	var version = tmpAgt.substring(0, tmpAgt.indexOf(" "));
	if(version.indexOf(".") != -1){
		version = version.substring(0, version.indexOf("."));
	}
	version -= 0;
	if(version < 312){
		isSafari13down = true;
	}
}
var is_untarget_brow = (isIe5down || isNn6down || isOpera7down || isSafari13down);

/**
 * <p>bindオブジェクトに対し、funcメソッドを定義する。</p>
 * @param {Object} bind
 * @param {Object} func
 */
function applyFunc(bind, func) {
	return function() {
		return func.apply(bind, arguments);
	};
};
function addMultiEventListener(target, self, type, func) {
	if (target.addEventListener) {
		target.addEventListener(type, applyFunc(self, func), false);
	} else if (target.attachEvent && func.apply) {
		target.attachEvent("on" + type, applyFunc(self, func));
	} else {
		target["on" + type] = func;
	}
};

function cancelEvent(evtObj){
	if (window.attachEvent) {
		window.event.cancelBubble = true;
	} else if (window.addEventListener) {
		evtObj.stopPropagation();
	} else {
		window.event.cancelBubble = true;
	}
}
/*************************************************************
 * <p>Dateの拡張</p>
 *************************************************************/
/**
 * <p>自身の日を加算する。</p>
 * @param {Number} dd 加算する日数
 * @return {Date} 自身
 */
Date.prototype.addDate = function(dd){
   this.setTime(this.getTime() + (60 * 60 * 24 * dd * 1000));
   return this;
};

/**
 * <p>自身の月を加算する</p>
 * @param {Number} mm 加算する日数
 * @return {Date} 自身
 */
Date.prototype.addMonth = function(mm){
var afterDate = new Date(this.getFullYear(), this.getMonth() + mm, 1);
   return afterDate;
};

/**
 * <p>自身の年月日よりyyyymmdd形式の文字列をかえす。<br>
 * yyyy/mm[00-11]/dd[01-31]</p>
 * @return {String} yyyymmdd String yyyymmdd形式のカレンダー
 */
Date.prototype.zeroPaddingFormat = function(){
   return this.getFullYear() + ("0" + this.getMonth()).slice(-2) + ("0" + this.getDate()).slice(-2);
};

/**
 * <p>自身の年月日より各言語の年月表現を返す。<br>
 * "J":yyyy年mm[1-12]月/"E":${英語文字月表現}, yyyy</p>
 * @see DateUtil.PCP.locale
 * @return {String}
 */
Date.prototype.getStringYearMonthFormat = function(PCP){
	var stringMonthFormat = this.getStringMonthFormat(PCP);
	var stringYearMonthFormat;
	switch (PCP.locale) {
		case "J":
			stringYearMonthFormat = this.getFullYear() + "年" +  stringMonthFormat;
			break;
		case "E":
			stringYearMonthFormat = stringMonthFormat + " " + this.getFullYear();
			break;
		default:
			stringYearMonthFormat = "";
    }
	return stringYearMonthFormat;
}

/**
 * <p>自身の年月日より各言語の年表現を返す。<br>
 * "J":mm[1-12]月/"E":$英語文字月表現</p>
 * @see DateUtil.PCP.locale
 * @return {String}
 */
Date.prototype.getStringMonthFormat = function(PCP){
	var stringMonthFormat;
	switch(PCP.locale){
		case "J":
			stringMonthFormat = (this.getMonth() + 1) + "月";break;
		case "E":
			switch(this.getMonth()){
				case 0: stringMonthFormat = "January";break;
				case 1: stringMonthFormat = "February";break;
				case 2: stringMonthFormat = "March";break;
				case 3: stringMonthFormat = "April";break;
				case 4: stringMonthFormat = "May";break;
				case 5: stringMonthFormat = "June";break;
				case 6: stringMonthFormat = "July";break;
				case 7: stringMonthFormat = "August";break;
				case 8: stringMonthFormat = "September";break;
				case 9: stringMonthFormat = "October";break;
				case 10: stringMonthFormat = "November";break;
				case 11: stringMonthFormat = "December";break;
				default: stringMonthFormat = "";break;
			}
			break;
		default:
			stringMonthFormat = "";break;
	}
	return stringMonthFormat;
}

/*************************************************************
 * <p>日付操作系ユーティリティ</p>
 *************************************************************/
DateUtil = function(year, month, day, PCP){
	if(is_untarget_brow) {
		return false;
	}
	
	this.ownYear = [];
	this.dummyDate = new Date();
	this.OFFSET = 1980;
	this.MATH_WEIGHT = 0.242194;
	this.maxLimitDateTime = null;
	this.systemDate = null;
	this.PCP = PCP
	
	this.systemDate = new Date(year, month, day);
	
	var maxLimitDate;
	if(this.PCP.maxLimitDays) {
		maxLimitDate = new Date(this.systemDate.getFullYear(), this.systemDate.getMonth(), this.systemDate.getDate() + this.PCP.maxLimitDays);
	} else if (this.PCP.maxLimitMonths){
		maxLimitDate = new Date(this.systemDate.getFullYear(), this.systemDate.getMonth() + this.PCP.maxLimitMonths, 0);
	} else {
		maxLimitDate = new Date(this.systemDate.getFullYear(), this.systemDate.getMonth() + 6, this.systemDate.getDate());
	}
	this.maxLimitDateTime = maxLimitDate.getTime();
	
	this.dayOfTheWeekClass = ["calendar_sun_label", "calendar_wday_label", "calendar_wday_label", "calendar_wday_label", "calendar_wday_label", "calendar_wday_label", "calendar_sat_label"	];
	this.dayOfTheWeekName = null;
	
	if(this.PCP.locale == "J"){
			this.dayOfTheWeekName = new Array();
			this.dayOfTheWeekName[0] = "日\n";
			this.dayOfTheWeekName[1] = "月\n";
			this.dayOfTheWeekName[2] = "火\n";
			this.dayOfTheWeekName[3] = "水\n";
			this.dayOfTheWeekName[4] = "木\n";
			this.dayOfTheWeekName[5] = "金\n";
			this.dayOfTheWeekName[6] = "土\n";
	} else if (this.PCP.locale == "E"){
		this.dayOfTheWeekName = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
	}
	
	return this;
}

/**
 * <p>システム日付の新しいインスタンスを作成します。<br>
 * @return {Date}
 */
DateUtil.prototype.getSystemDate = function(){
	return new Date(this.systemDate.getFullYear(), this.systemDate.getMonth(), this.systemDate.getDate());
}

/**
 * <p>引数で与えられた日付がシステム的に有効かどうかを判定します。<br>
 * ( システム日付 <= date <= 最大有効日付)である場合有効と判断します。</p>
 * @param {Date} date
 * @return {Boolean}
 */
DateUtil.prototype.isValidDate = function(date) {
	if (this.systemDate.getTime() <= date.getTime() && date.getTime() <= this.maxLimitDateTime) {
		return true;
	} else {
		return false;
	}
};


/**
 * <p>month, dayよりDateオブジェクトを作成します。<br>
 * 妥当でない日付が入力された場合はnullを返却します。</p>
 * @param {Number} month [0-11]
 * @param {Number} date [1-31]
 * @return {Date}
 */
DateUtil.prototype.createDateWithMD = function(month, day){
	
	if (((month < 0) || (11 < month)) || ((day < 1) || (31 < day))) {
		return null;
	}
	
	var year;
	if ((month < this.systemDate.getMonth()) || ((month == this.systemDate.getMonth()) && (day < this.systemDate.getDate()))) {
		// システム日付より前である場合は翌年とみなす。
		year = this.systemDate.getFullYear() + 1;
	} else {
		year = this.systemDate.getFullYear();
	}
	
	return this.createDateWithYMD(year, month, day);
}

/**
 * <p>year, month, dayよりDateオブジェクトを作成します。<br>
 * 妥当でない日付が入力された場合はnullを返却します。</p>
 * @param {Number} year yyyy
 * @param {Number} month [0-11]
 * @param {Number} date [1-31]
 * @return {Date}
 */
DateUtil.prototype.createDateWithYMD = function (year, month, day){
	
	if (((month < 0) || (11 < month)) || ((day < 1) || (31 < day)) || ((year < 2008) || 2999 < year)) {
		return null;
	}
	
	var tmpDate = new Date(year, month, day);
	
	// 妥当性チェック
	if (tmpDate.getFullYear() != year || tmpDate.getMonth() != month || tmpDate.getDate() != day) {
		return null;
	}
	
	if(this.isValidDate(tmpDate)){
		return tmpDate;	
	} else {
		return null;	
	}
}

/**
　* <p>その日が祝日であるかどうかを判定する。</p>
　* @param {Date} date
　* @return {boolean}
　*/
DateUtil.prototype.isHoliday = function(date){
	
	if(!this.PCP.isDispHoliday){
		return false;
	}
	
   var targetYear = date.getFullYear();
   if (!this.ownYear[targetYear]) {
       var map = this.makeHolidayMap(targetYear);
       this.ownYear[targetYear] = map;
   }
   
   var dateZeroPaddingFormat = date.zeroPaddingFormat();
   var holidayMap = this.ownYear[targetYear];
   
   if(holidayMap[dateZeroPaddingFormat]){
		return true;
   } else {
		return false;
   }
};

/**
　* <p>yyyymmdd形式の引数からカレンダーを作成する。</p>
　* @param {String} strDate yyyymmdd形式のカレンダー
　* @return {Date}
　*/
DateUtil.prototype.createCalendarFromFormatVal = function(strDate){
   var year = strDate.substring(0, 4);
   var month = strDate.substring(4, 6);
   if (month.charAt(0) == "0") {
       month = month.slice(-1);
   }
   var date = strDate.substring(6, 8);
   if (date.charAt(0) == "0") {
       date = date.slice(-1);
   }
   return new Date(year, month, date);
};

/**
 * <p>fullYear年の祝日カレンダーを作成します。</p>
 * @param {Number} fullYear 年[数字4桁]
 * @return {Array} holidayMap
 */
DateUtil.prototype.makeHolidayMap = function(fullYear){
   var holidayMap = [];
   
   holidayMap[this.createFormatCalendarVal(fullYear, 0, 1)] = "元日";
   holidayMap[this.createFormatCalendarVal(fullYear, 0, this.getWeekDay(fullYear, 0, 2, 1))] = "成人の日";
   holidayMap[this.createFormatCalendarVal(fullYear, 1, 11)] = "建国記念の日";
   holidayMap[this.createFormatCalendarVal(fullYear, 2, this.getVernal(fullYear))] = "春分の日";
   holidayMap[this.createFormatCalendarVal(fullYear, 3, 29)] = "昭和の日";
   holidayMap[this.createFormatCalendarVal(fullYear, 4, 3)] = "憲法記念日";
   holidayMap[this.createFormatCalendarVal(fullYear, 4, 4)] = "みどりの日";
   holidayMap[this.createFormatCalendarVal(fullYear, 4, 5)] = "こどもの日";
   holidayMap[this.createFormatCalendarVal(fullYear, 6, this.getWeekDay(fullYear, 6, 3, 1))] = "海の日";
   holidayMap[this.createFormatCalendarVal(fullYear, 8, this.getWeekDay(fullYear, 8, 3, 1))] = "敬老の日";
   holidayMap[this.createFormatCalendarVal(fullYear, 8, this.getAutumnal(fullYear))] = "秋分の日";
   holidayMap[this.createFormatCalendarVal(fullYear, 9, this.getWeekDay(fullYear, 9, 2, 1))] = "体育の日";
   holidayMap[this.createFormatCalendarVal(fullYear, 10, 3)] = "文化の日";
   //	if(fullYear == 2009){
   //    holidayMap[this.createFormatCalendarVal(fullYear, 10, 12)] = "天皇陛下御即位二十年奉祝";
   //	}
   holidayMap[this.createFormatCalendarVal(fullYear, 10, 23)] = "勤労感謝の日";
   holidayMap[this.createFormatCalendarVal(fullYear, 11, 23)] = "天皇誕生日";
   
   var tempMap1 = [];
   for (var key1 in holidayMap) {
       var cal1 = this.createCalendarFromFormatVal(key1);
       if (cal1.getDay() == 0) {
           for (;;) {
               cal1.addDate(1);
               var targetFormatCal1 = cal1.zeroPaddingFormat();
               if (!holidayMap[targetFormatCal1]) {
                   tempMap1[targetFormatCal1] = targetFormatCal1;
                   break;
               }
           }
       }
   }
   
   for (var key2 in tempMap1) {
       holidayMap[key2] = "振替休日";
   }
   
   var tempMap2 = [];
   for (var key3 in holidayMap) {
       var cal2 = this.createCalendarFromFormatVal(key3);
       cal2.addDate(2);
       if (holidayMap[cal2.zeroPaddingFormat()]) {
           cal2.addDate(-1);
           var targetFormatCal2 = cal2.zeroPaddingFormat();
           if (!holidayMap[targetFormatCal2]) {
               tempMap2[targetFormatCal2] = targetFormatCal2;
           }
       }
   }
   
   for (var key4 in tempMap2) {
       holidayMap[key4] = "国民の休日";
   }
   
   return holidayMap;
};

/**
 * <p>指定月の第？？曜日の日付を求める。</p>
 * @param {Number} year 年
 * @param {Number} month 月
 * @param {Number} day 日
 */
DateUtil.prototype.createFormatCalendarVal = function(year, month, day){
	this.dummyDate.setFullYear(year, month, day);
	return this.dummyDate.zeroPaddingFormat();
};

/**
 * <p>指定月の第？？曜日の日付を求める。</p>
 * @param {Number} yyyy 年
 * @param {Number} mm 月
 * @param {Number} week 第何週目かの指定[1-6]
 * @param {Number} wday 曜日を指定[0(日)-6(土)]
 * @return {Date} date 指定月の第？？曜日の日付
 */
DateUtil.prototype.getWeekDay = function(yyyy, mm, week, wday){
   var fisrtDate = new Date(yyyy, mm, 1);
   var firstDay = fisrtDate.getDay();
   
   var lastDate = new Date(fisrtDate.getFullYear(), fisrtDate.getMonth() + 1, 0);
   var numOfLastDate = lastDate.getDate();
   
   if (wday >= firstDay) {
       week--;
   }
   var numOfDate = 7 * week + wday + 1 - firstDay;
   if ((numOfDate > numOfLastDate) || (numOfDate <= 0)) {
       return null;
   }
   return numOfDate;
};

/**
 * <p>春分の日を算出する。<br>
 * ※2099年まで有効</p>
 * @param {String} yyyy 現在年
 * @return {String} 指定された年の春分の日を返す
 */
DateUtil.prototype.getVernal = function(yyyy){
   var vernal = 20.8431 + this.MATH_WEIGHT * (yyyy - this.OFFSET) - ((yyyy - this.OFFSET) >> 2);
   return vernal;
};

/**
 * <p>秋分の日を算出する。<br>
 * ※2099年まで有効</p>
 * @param {Number} yyyy 現在年
 * @return {String} 指定された年の秋分の日を返す
 */
DateUtil.prototype.getAutumnal = function(yyyy){
   var autumnal = 23.2488 + this.MATH_WEIGHT * (yyyy - this.OFFSET) - ((yyyy - this.OFFSET) >> 2);
   return autumnal;
};

/*************************************************************
 * <p>表示するカレンダーのコントロールクラスです。</P>
 * 
 *************************************************************/
CalendarContoroller = function() {

	if(is_untarget_brow) {
		return false;
	}
	
	this.displayingCalendarName = null;
	this.cals = arguments;
	var _this = this;
	addMultiEventListener(document, this, 'click',
			function() {
				_this.close();
			});
	return this;	
};

/**
 * <p>与えられたカレンダーの表示を行います。<br>
 * プルダウンで選択された日付を基にカレンダーの表示を行います。<br>
 * プルダウンで日付が選択されていない場合はプライオリティがひとつ前のカレンダーが保持するプルダウン日付を基にカレンダーを表示します。<br>
 * それでも日付が取得できない場合はシステム日付を基にカレンダーを表示します。</p>
 * @param {PopupCalendar} cal
 */
CalendarContoroller.prototype.dispCalendar = function(cal){
	
	// close the displaying calendars
	this.closeAllCalendar();
	
	if(this.isDisplayingCalendar(cal)){
		// update
		this.displayingCalendarName = null;
		return true;
	}
	
    // get the calendar in pull down
    var tmpDate = cal.getPulldownDate();
    if(!tmpDate){
        tmpDate = cal.DU.getSystemDate();
    }

    // describe popupCalendar
    cal.describeCalendar(tmpDate);
	
	// update
	this.displayingCalendarName = cal.name;
	
	return true;
};




/**
 * <p>与えあれらたプライオリティーよりもひとつ前のプライオリティーカレンダーを取得します。</p>
 * @param {PopupCalendar} cal
 * @return {PopupCalendar} tmpCal
 */
CalendarContoroller.prototype.getPrevPriorityCalendar = function(cal){
	for (var i = 0, n = this.cals.length; i < n; i++) {
		var tmpCal = this.cals[i];
		if( tmpCal.priority == (cal.priority - 1)) {
			return tmpCal;
		}
	}
	return null;
};

/**
 * <p>表示されているカレンダーを全て非表示にします。</p>
 */
CalendarContoroller.prototype.closeAllCalendar = function(){
	for (var i = 0, n = this.cals.length; i < n; i++) {
		this.cals[i].close();
	}
	return true;
};

/**
 * <p>カレンダーを設定します。</p>
 * @param {PopupCalendar} arguments
 */
CalendarContoroller.prototype.addCalendar = function() {
	this.cals = arguments;
	return true;
};

/**
 * <p>カレンダーを閉じます。</p>
 */
CalendarContoroller.prototype.close = function() {
	this.closeAllCalendar();
	
	// update
	this.displayingCalendarName = null;
	
	return true;
};

/**
 * <p>表示されているカレンダーであるかどうかを判定します。</p>
 * @param {PopupCalendar} cal 
 * @return {Boolean} true:表示中のカレンダー false:その他
 */
CalendarContoroller.prototype.isDisplayingCalendar = function(cal) {
	return this.displayingCalendarName == cal.name;
};

/**
 * <p>次の月に進む</p>
 * @param {PopupCalendar} cal  
 */
CalendarContoroller.prototype.goNextMonth = function(cal) {
	if(!this.isDisplayingCalendar(cal)){
		this.close();
	} else {
		cal.describeCalendar(cal.baseDate.addMonth(cal.DU.PCP.calendarLength));
	}
	return true;
};

/**
 * <p>前の月に戻る</p>
 * @param {PopupCalendar} cal  
 */
CalendarContoroller.prototype.goPreviousMonth = function(cal) {
	if(!this.isDisplayingCalendar(cal)){
		this.close();
	} else {
		cal.describeCalendar(cal.baseDate.addMonth(-cal.DU.PCP.calendarLength));		
	}
	return true;
};

/**
 * <p>プルダウンに日付を設定する<br>
 * 不正な日付であった場合システム日付をプルダウンに設定する。</p>
 * @param {PopupCalendar} cal
 * @param {Number} year
 * @param {Number} month
 * @param {Number} day
 */
CalendarContoroller.prototype.setDateToForm = function(cal, year, month, day) {
	
	if(!this.isDisplayingCalendar(cal)){
		this.close();
	}
	
	var tmpDate = cal.DU.createDateWithYMD(year, month, day);
	if(!tmpDate){
		tmpDate = cal.DU.getSystemDate();
	} 	
	
	cal.setDatePulldown(tmpDate);
	
	this.close();
	
	return true;
};



/*************************************************************
 * <p>ポップアップカレンダー表示クラス</p>
 * 
 * @param {String} name ポップアップカレンダー名
 * @param {String} id ポップアップカレンダー表示ID
 * @param {String} monthId 月プルダウンID
 * @param {String} dayId 日プルダウンID
 * @param {String} imgId カレンダー画像ID
 * @param {Number} priority  表示優先度
 * @param {String} absolute_position_top 
 * @param {String} absolute_position_top 
 * @param {String} index
 *************************************************************/
PopupCalendar = function(name, id, monthId, dayId, priority, imgId, absolute_position_top, absolute_position_left, index, form_number, zero_value, connectionKind, connectionForm, connectionCal, endDay, DU) {

	this.DU = DU;

	if(is_untarget_brow) {
		return false;
	}

	this.name = name;
	this.id = id;
	this.monthId = monthId;
	this.dayId = dayId;
	this.priority = priority;
	this.imgId = imgId;
	this.absolute_position_top = absolute_position_top;
	this.absolute_position_left = absolute_position_left;
	this.index = index;
	this.form_number = form_number;
	this.zero_value = zero_value;
	this.connectionKind = connectionKind;
	this.connectionForm = connectionForm;
	this.connectionCal = connectionCal;
	this.endDay = endDay;

	this.baseDate = null;
	
	var _this = this;
	addMultiEventListener(document.getElementById(this.imgId), this, 'click', function(event) {
					_this.chgDsc();
					cancelEvent(event || window.event);
			});
	return this;
};

/**
 * <p>（カレンダー）表示の通知を受け取る</p>
 */
PopupCalendar.prototype.chgDsc = function() {
	CalendarContoroller.dispCalendar(this);
	return true;
};

/**
 * <p>（カレンダー）次の月に進む通知を受け取る</p>
 */
PopupCalendar.prototype.chgNext = function() {
	CalendarContoroller.goNextMonth(this);
	return true;
};

/**
 * <p>（カレンダー）前の月に戻る通知を受け取る</p>
 */
PopupCalendar.prototype.chgPrev = function() {
	CalendarContoroller.goPreviousMonth(this);
	return true;
};

/**
 * <p>（カレンダー）閉じる通知を受け取る</p>
 */
PopupCalendar.prototype.chgClose = function() {
	CalendarContoroller.close();
	return true;
};

/**
 * <p>（カレンダー）日付が選択された通知を受け取る</p>
 */
PopupCalendar.prototype.chgSet = function(year, month, day) {
	CalendarContoroller.setDateToForm(this, year, month, day);
	return true;
};


/**
 * <p>カレンダーを閉じる</p>
 */
PopupCalendar.prototype.close = function() {
	var targetElement = document.getElementById(this.id);
	targetElement.style.display = 'none';
	return true;
};

/**
 * <p>プルダウン日付の取得</p>
 * @return {Date} date プルダウン日付
 */
PopupCalendar.prototype.getPulldownDate = function() {
	var monthElement = this.getPullDownMonthElement();
	var dayElement = this.getPullDownDayElement();

	var CalMonth = monthElement.value;
	if (typeof this.DU.PCP.CalYear != "undefined") {
		CalMonth = monthElement.value.substring(4,6);
	}

	if (String(CalMonth).charAt(0) == "0") {
		mstr = String(CalMonth).charAt(1);
	} else {
		mstr = String(CalMonth);
	}

	var month = parseInt(mstr, 10) - 1;
	if (dayElement.value == "") {
		var day = 1;
	} else {
		var day = parseInt(dayElement.value, 10);
	}

	return this.DU.createDateWithMD(month, day);
};

/**
 * <p>プルダウン(月)要素の取得</p>
 * @return {Object} プルダウン要素
 */
PopupCalendar.prototype.getPullDownMonthElement = function() {
	if(!this.index){
		return document.getElementsByName(this.monthId)[this.form_number];
	} else {
		return document.getElementsByName(this.monthId)[this.index];
	}
};

/**
 * <p>プルダウン(日)要素の取得</p>
 * @return {Object} プルダウン要素
 */
PopupCalendar.prototype.getPullDownDayElement = function() {
	if(!this.index){
		return document.getElementsByName(this.dayId)[this.form_number];
	} else {
		return document.getElementsByName(this.dayId)[this.index];
	}
};

/**
 * <p>ポップアップカレンダーの中身を作成します。<br>
 * 与えられたbaseDateの年月を基準にカレンダーを作成します。</p>
 * @param {Date} baseDate  カレンダー表示基準日付
 */
PopupCalendar.prototype.describeCalendar = function(baseDate) {
	
	this.baseDate = baseDate;
	
	var targetElement = document.getElementById(this.id);
	//targetElement.style.display = 'block';
	targetElement.style.display = 'inline';
	
	var htmlArray = new Array();
	var htmlArrayIndex = 0;

	htmlArray[htmlArrayIndex++] = '<div class="calendar_table" style=" top:'+this.absolute_position_top+';left:'+this.absolute_position_left+';">';
	
	htmlArray[htmlArrayIndex++] = '<div class="move_line">';
	htmlArray[htmlArrayIndex++] = '<div class="move_prev">';
	if (this.isEnableToMovePrevMonth(-(this.DU.PCP.calendarLength))) {
		htmlArray[htmlArrayIndex++] = '<a href="javascript:void(0);" onclick="';
		htmlArray[htmlArrayIndex++] = this.name;
		htmlArray[htmlArrayIndex++] = '.chgPrev()" href="javascript:void(0);" style="color:#FFFFFF; text-decoration:underline;">';
		var prevMonthFormat;
		if(this.DU.PCP.locale == "J"){
			prevMonthFormat = "&lt;&lt;&nbsp;前の3ヶ月";
		} else if (this.DU.PCP.locale == "E"){
			prevMonthFormat = "&lt;&lt;&nbsp;Previous 3 Months";
		}
		htmlArray[htmlArrayIndex++] = prevMonthFormat;
		htmlArray[htmlArrayIndex++] = '</a>';
	}
	htmlArray[htmlArrayIndex++] = '</div>';
	
	htmlArray[htmlArrayIndex++] = '<div class="move_next">';
	if (this.isEnableToMoveNextMonth(this.DU.PCP.calendarLength)) {
		htmlArray[htmlArrayIndex++] = '<a href="javascript:void(0);" onclick="';
		htmlArray[htmlArrayIndex++] = this.name;
		htmlArray[htmlArrayIndex++] = '.chgNext()" href="javascript:void(0);" style="color:#FFFFFF; text-decoration:underline;">';
		var nextMonthFormat;
		if(this.DU.PCP.locale == "J"){
			nextMonthFormat = "次の3ヶ月&nbsp;&gt;&gt;";
		} else if (this.DU.PCP.locale == "E"){
			nextMonthFormat = "Next 3 Months&nbsp;&gt;&gt;";
		}
		htmlArray[htmlArrayIndex++] = nextMonthFormat;
		htmlArray[htmlArrayIndex++] = '</a>';
	}
	htmlArray[htmlArrayIndex++] = '</div>';
	htmlArray[htmlArrayIndex++] = '</div>';

	htmlArray[htmlArrayIndex++] = '<div class="calendar_line">';

	for (var i = 0; i < this.DU.PCP.calendarLength; i++) {
		var dummyBaseDate = new Date(this.baseDate.getFullYear(),
				this.baseDate.getMonth() + i, 1);
		htmlArray[htmlArrayIndex++] = '<div class="calendar_month">';
//		htmlArray[htmlArrayIndex++] = '<table class="month_table" cellspacing="1">';
		htmlArray[htmlArrayIndex++] = '<table class="month_table" cellspacing="1" style="background-color: #aaaaaa; border-collapse:separate; border-spacing:1px; padding:0px 0;">';
		htmlArray[htmlArrayIndex++] = '<tbody>';

		htmlArray[htmlArrayIndex++] = '<tr>';
		htmlArray[htmlArrayIndex++] = '<td colspan="7" class="month_label" style="color:#FFFFFF; font-size:12px; vertical-align:middle; padding:0px 0;">';
		htmlArray[htmlArrayIndex++] = dummyBaseDate.getStringYearMonthFormat(this.DU.PCP);
		htmlArray[htmlArrayIndex++] = '</td>';
		htmlArray[htmlArrayIndex++] = '</tr>';

		htmlArray[htmlArrayIndex++] = '<tr class="date_row">';
		for (var j = 0; j < 7; j++) {
			htmlArray[htmlArrayIndex++] = '<td class="' + this.DU.dayOfTheWeekClass[j] + '" style="font-size:12px; padding:0px 0; vertical-align:middle;">' + this.DU.dayOfTheWeekName[j] + '</td>';
		}
		htmlArray[htmlArrayIndex++] = '</tr>';

		var baseDateMonthLastDate = new Date(dummyBaseDate.getFullYear(), dummyBaseDate.getMonth() + 1, 0);

		var date;
		var lastSaturday = baseDateMonthLastDate.getDate()
				+ (6 - baseDateMonthLastDate.getDay());
		var numOfMaxDate = lastSaturday + (6 - Math.ceil(lastSaturday / 7)) * 7;

		for (var j = 1; j <= numOfMaxDate; j++) {
			date = new Date(dummyBaseDate.getFullYear(), dummyBaseDate.getMonth(), j);
			if (j == 1 || date.getDay() == 0) {
				htmlArray[htmlArrayIndex++] = '<tr class="day_row">';
				for (var k = 0; k < date.getDay(); k++) {
					htmlArray[htmlArrayIndex++] = '<td class="emp_date"></td>';
				}
			}

			if (j <= baseDateMonthLastDate.getDate()) {
				var validDateFunction = '';
				var validDateFunctionEnd = '';
				
				if (this.DU.isValidDate(date)) {
					htmlArray[htmlArrayIndex++] = '<td class="' + this.getCalendarCellStyle(date)
					+ '" onclick="' + this.name
					+ '.chgSet(' + date.getFullYear() + ', '
					+ date.getMonth() + ', ' + date.getDate()
					+ ')" style="font-size:12px; height:20px; padding:0px 0px 0px 0px; overflow: hidden; vertical-align:middle;">';
					// dependency code
					var link_style = "";
					if(isIe){
						link_style = 'style="height:100%;"'
					} else {
						link_style = 'style="height:17px;"'
					}
					
					
					htmlArray[htmlArrayIndex++] = '<a href="javascript:void(0);"' + link_style + '>';
					htmlArray[htmlArrayIndex++] = date.getDate();
					htmlArray[htmlArrayIndex++] = '</a>';
					htmlArray[htmlArrayIndex++] = '</td>';
				} else {
				htmlArray[htmlArrayIndex++] = '<td class="' + this.getCalendarCellStyle(date) + '" style="font-size:12px; height:20px; padding:0px 0px 0px 0px; overflow: hidden; vertical-align:middle;">'
						+ validDateFunction + date.getDate()
						+ validDateFunctionEnd + '</td>';
				}

				if (date.getDay() == 6) {
					htmlArray[htmlArrayIndex++] = '</tr>';
				}
			} else {
				htmlArray[htmlArrayIndex++] = '<td class="emp_date"></td>';
				if (date.getDay() == 6) {
					htmlArray[htmlArrayIndex++] = '</tr>';
				}
			}

		}

		htmlArray[htmlArrayIndex++] = '</tbody>';
		htmlArray[htmlArrayIndex++] = '</table>';
		htmlArray[htmlArrayIndex++] = '</div>';
	}
	htmlArray[htmlArrayIndex++] = '</div>';
	htmlArray[htmlArrayIndex++] = '</div>';

	htmlArray[htmlArrayIndex++] = '<!--[if lte IE 6 ]><iframe class="over_popupCalendar" style="top:' + 
	this.absolute_position_top + 
	'; left:' + this.absolute_position_left + 
	'; z-index: 1; position: absolute;" src="javascript:false;"></iframe><![endif]-->';

	targetElement.innerHTML = htmlArray.join("");
	
	addMultiEventListener(targetElement, this, 'click',
			function(event) {
				cancelEvent(event || window.event);
			});
	return true;
};

/**
 * <p>プルダウンにdateの日付を設定します。</p>
 * @param {Date} date
 */
PopupCalendar.prototype.setDatePulldown = function(date) {

	n_date = new Date();
	n_month = n_date.getMonth() + 1;
	n_day = n_date.getDate();

	// 1桁月日付に0をつける
	month = date.getMonth() + 1;
	day = date.getDate();
	if (this.zero_value == 0) {
		if (String(month).length == 1) {
			month = '0' + month;
		}
	}
	if (typeof this.DU.PCP.CalYear != "undefined") {
		if (parseInt(n_month) > parseInt(month)) {
			var month = String(parseInt(this.DU.PCP.CalYear) + 1) + String(month);
		} else if(parseInt(n_month) == parseInt(month)) {
			if (parseInt(n_day) > parseInt(day)) {
				var month = String(parseInt(this.DU.PCP.CalYear) + 1) + String(month);
			} else {
				var month = String(this.DU.PCP.CalYear) + String(month);
			}
		} else {
			var month = String(this.DU.PCP.CalYear) + String(month);
		}
	}
	if (String(day).length == 1) {
		day = '0' + day;
	}

	if (this.connectionKind == "1") {

		//WEBフリープラン対応
		if (document.getElementById("Day2_free") != null) {
			if (document.getElementById("free").style.display != "none") {
				if (document.getElementById("Area_free").value != "") {
					this.endDay = dis_min[document.getElementById("DepApo_free").value][document.getElementById("Area_free").value][1];
				} else {
					this.endDay = 2;
				}
			}
		}

		// 復路にendDay日後を設定する
		var date3 = new Date(date.getTime() + this.endDay * 24 * 60 * 60 * 1000);
		month3 = date3.getMonth() + 1;
		day3 = date3.getDate();
		if (this.zero_value == 0) {
			if (String(month3).length == 1) {
				month3 = '0' + month3;
			}
		}
		if (typeof this.DU.PCP.CalYear != "undefined") {
			if (parseInt(n_month) > parseInt(month3)) {
				month3 = String(parseInt(this.DU.PCP.CalYear) + 1) + String(month3);
			} else if(parseInt(n_month) == parseInt(month3)) {
				if (parseInt(n_day) > parseInt(day3)) {
					month3 = String(parseInt(this.DU.PCP.CalYear) + 1) + String(month3);
				} else {
					month3 = String(this.DU.PCP.CalYear) + String(month3);
				}
			} else {
				month3 = String(this.DU.PCP.CalYear) + String(month3);
			}
		}
		if (String(day3).length == 1) {
			day3 = '0' + day3;
		}
		document.getElementsByName(this.connectionCal.monthId)[this.connectionCal.form_number].value = month3;
		this.getPullDownMonthElement().value = month;

		// 月から日リストを更新する。
		resetDay(date.getFullYear(),this.monthId, this.dayId, this.form_number, {value:"", text:"--日"}, this.DU.PCP);
		resetDay(date3.getFullYear(),this.connectionCal.monthId, this.connectionCal.dayId, this.connectionCal.form_number, {value:"", text:"--日"}, this.DU.PCP);

		document.getElementsByName(this.connectionCal.dayId)[this.connectionCal.form_number].value = day3;
		this.getPullDownDayElement().value = day;

	} else {

		this.getPullDownMonthElement().value = month;

		// 月から日リストを更新する。
		resetDay(date.getFullYear(),this.monthId, this.dayId, this.form_number, {value:"", text:"--日"}, this.DU.PCP);

		this.getPullDownDayElement().value = day;

	}

//	this.getPullDownMonthElement().value = date.getMonth() + 1;
//	if(this.getPullDownMonthElement().onchange){
//		this.getPullDownMonthElement().onchange();
//	}

//	this.getPullDownDayElement().value = date.getDate();
//	if(this.getPullDownDayElement().onchange){
//		this.getPullDownDayElement().onchange();
//	}

	return true;
};


/**
 * <p>カレンダー上の前の月に移動が可能かどうかを判断する。</p>
 * 
 * @param {Number} value 移動する月数
 * @return {boolean} true:可能 false:不可
 */
PopupCalendar.prototype.isEnableToMovePrevMonth = function(value) {
	var tempDate = new Date(this.baseDate.getFullYear(), this.baseDate.getMonth(), 0);
	return this.DU.isValidDate(tempDate);
};

/**
 * <p>カレンダー上の次の月に移動が可能かどうかを判断する。</p>
 * @param {Number} value 移動する月数
 * @return {boolean} true:可能 false:不可
 */
PopupCalendar.prototype.isEnableToMoveNextMonth = function(value) {
	var tempDate = new Date(this.baseDate.getFullYear(), (this.baseDate.getMonth() + value), 1);
	return this.DU.isValidDate(tempDate);
};

/**
 * <p>指定された日付のstyle classを取得します。</p>
 * @param {Date} date
 * @return {String} styleclass名
 */
PopupCalendar.prototype.getCalendarCellStyle = function(date) {
	var cellStyle;
	if (this.DU.isHoliday(date)) {
		cellStyle = 'calendar_holiday';
	} else {
		if (date.getDay() == 0) {
			cellStyle = 'calendar_sun';
		} else if (date.getDay() == 6) {
			cellStyle = 'calendar_sat';
		} else {
			cellStyle = 'calendar_wday';
		}
	}

	if (!this.DU.isValidDate(date)) {
		cellStyle = cellStyle.concat('_invalid');
	}
	return cellStyle;
};
