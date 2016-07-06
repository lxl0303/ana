function freeResetDay(year, monthElem, dayElem, number, Prop) {
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

	createPulldown(dayElem, tempList);
	if (typeof Prop.weekDay != "undefined") {
		addWeekPulldown(year, dayElem, elem);
	}
	setPulldown(dayElem, dayIndex);
}

// 期間条件付き月リストの作成
function createMonthDropDownCal(id, startMonth, endMonth) {

	currMonth = 0;
	var monthList = new Array();
	if (startMonth > endMonth) {
		endMonth = parseInt(endMonth, 10) + 12;
	}
	for (var i = startMonth; i <= endMonth; i++) {
		monthList[currMonth] = new Object();
		if (12 < i) {
			seti = i - 12;
		} else {
			seti = i;
		}
		if (String(seti).length == 1) {
			seti = "0" + String(seti);
		}
		monthList[currMonth].value = String(seti);
		monthList[currMonth].text = parseInt(seti, 10) + "月";
		currMonth ++;
	}
	createDropDown(id, monthList, false);
}

//  期間条件付きドロップダウンリストに曜日を付加する
function addWeekDropDownExtCal(startDay, monthValue, pulldown) {
	var elem = document.getElementById(pulldown);
	var elemlength = elem.options.length;

	var cdate  = new Date();
	var week_list = new Array("日","月","火","水","木","金","土");
	if ((cdate.getMonth() + 1) > parseInt(monthValue, 10)) {
		targetYear  = cdate.getFullYear() + 1;
	} else {
		targetYear  = cdate.getFullYear();
	}
	w = (new Date(targetYear, parseInt(monthValue, 10)-1, 1)).getDay();
	w = (parseInt(startDay, 10) + w) % 7;

	for(var i = 0; i < elemlength; i++) {
		if(elem.options[i].value == "") continue;
		if(elem.options[i].value == "0") continue;
			if((elem.options[i].text.match(/\(\S+\)/g)) == null){
				elem.options[i].text = elem.options[i].text + "(" + week_list[w] + ")";
			} else {
				elem.options[i].text = elem.options[i].text.replace(/\(\S+\)/g, "(" + week_list[w] + ")");
			}
			w = (w == 6) ? 0 : w+=1;
	}
}


/*************************************************************
 * <p>表示するカレンダーのコントロールクラスです。 国内ツアー系 旅作用 </P>
 * 
 *************************************************************/
freeCalendarContoroller = function() {

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
freeCalendarContoroller.prototype.dispCalendar = function(cal){
	
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
freeCalendarContoroller.prototype.getPrevPriorityCalendar = function(cal){
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
freeCalendarContoroller.prototype.closeAllCalendar = function(){
	for (var i = 0, n = this.cals.length; i < n; i++) {
		this.cals[i].close();
	}
	return true;
};

/**
 * <p>カレンダーを設定します。</p>
 * @param {PopupCalendar} arguments
 */
freeCalendarContoroller.prototype.addCalendar = function() {
	this.cals = arguments;
	return true;
};

/**
 * <p>カレンダーを閉じます。</p>
 */
freeCalendarContoroller.prototype.close = function() {
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
freeCalendarContoroller.prototype.isDisplayingCalendar = function(cal) {
	return this.displayingCalendarName == cal.name;
};

/**
 * <p>次の月に進む</p>
 * @param {PopupCalendar} cal  
 */
freeCalendarContoroller.prototype.goNextMonth = function(cal) {
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
freeCalendarContoroller.prototype.goPreviousMonth = function(cal) {
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
freeCalendarContoroller.prototype.setDateToForm = function(cal, year, month, day) {
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
 * <p>ポップアップカレンダー表示クラス 国内ツアー系 旅作用 </p>
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
freePopupCalendar = function(name, id, monthId, dayId, priority, imgId, absolute_position_top, absolute_position_left, index, form_number, zero_value, connectionKind, connectionForm, connectionCal, endDay, DU) {

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
freePopupCalendar.prototype.chgDsc = function() {
	freeCalendarContoroller.dispCalendar(this);
	return true;
};

/**
 * <p>（カレンダー）次の月に進む通知を受け取る</p>
 */
freePopupCalendar.prototype.chgNext = function() {
	freeCalendarContoroller.goNextMonth(this);
	return true;
};

/**
 * <p>（カレンダー）前の月に戻る通知を受け取る</p>
 */
freePopupCalendar.prototype.chgPrev = function() {
	freeCalendarContoroller.goPreviousMonth(this);
	return true;
};

/**
 * <p>（カレンダー）閉じる通知を受け取る</p>
 */
freePopupCalendar.prototype.chgClose = function() {
	freeCalendarContoroller.close();
	return true;
};

/**
 * <p>（カレンダー）日付が選択された通知を受け取る</p>
 */
freePopupCalendar.prototype.chgSet = function(year, month, day) {
	freeCalendarContoroller.setDateToForm(this, year, month, day);
	return true;
};


/**
 * <p>カレンダーを閉じる</p>
 */
freePopupCalendar.prototype.close = function() {
	var targetElement = document.getElementById(this.id);
	targetElement.style.display = 'none';
	return true;
};

/**
 * <p>プルダウン日付の取得</p>
 * @return {Date} date プルダウン日付
 */
freePopupCalendar.prototype.getPulldownDate = function() {
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
freePopupCalendar.prototype.getPullDownMonthElement = function() {
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
freePopupCalendar.prototype.getPullDownDayElement = function() {
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
freePopupCalendar.prototype.describeCalendar = function(baseDate) {
	
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
freePopupCalendar.prototype.setDatePulldown = function(date) {

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


		this.getPullDownMonthElement().value = month;

		// 月から日リストを更新する(行き)。
		freeResetDay(date.getFullYear(),this.monthId, this.dayId, this.form_number, this.DU.PCP);

		this.getPullDownDayElement().value = day;

	}

	//旅作 帰り＋宿泊日数連動対応

	if (document.getElementById("calImg5") != null) {
		// フライト　行き
		if (this.connectionKind == "1") {
			// 13日リスト作成（帰り月の作成）
			setYear = getYear(sysYear, sysMonth, sysDay, month, day);
			DaysFree13 = getDays(13, setYear, month, day);
			chkDays = getDays(1, setYear, month, day);
			if (parseInt(chkDays["day"], 10) == 1) {
				createMonthDropDownCal("RetMonth_free", DaysFree13["month"], DaysFree13["month"]);
			} else {
				if (parseInt(DaysFree13["month"], 10) == parseInt(month, 10)) {
					createMonthDropDownCal("RetMonth_free", month, month);
				} else {
					createMonthDropDownCal("RetMonth_free", month, DaysFree13["month"]);
				}
			}
			if (parseInt(DaysFree13["month"], 10) == parseInt(month, 10)) {
				// 13日後の月が、行きの月と同じ場合（13日間が月にまたがらない場合）
				dayList = createDayList("", DaysFree13["month"], false);
				var slice_dayList = dayList.slice(parseInt(day, 10), parseInt(DaysFree13["day"], 10));
				var WeekDay = day;
				var StayYear = DaysFree13["year"];
			} else {
				if (parseInt(DaysFree13["month"], 10) == parseInt(month3, 10)) {
					// 13日後の月が、行きの月と違う場合（13日間が月にまたがる場合で、選択された帰りの月が13日後の月と同じ場合）
					dayList = createDayList(DaysFree13["year"], DaysFree13["month"], false);
					var slice_dayList = dayList.slice(0, parseInt(DaysFree13["day"], 10));
					var WeekDay = 0;
					var StayYear = DaysFree13["year"];
				} else {
					// 13日後の月が、行きの月と違う場合（13日間が月にまたがる場合で、選択された帰りの月が13日後の月と違う場合）
					dayList = createDayList("", month, false);
					var slice_dayList = dayList.slice(parseInt(day, 10));
					var WeekDay = day;
					var StayYear = setYear;
				}
			}
			createDropDown("RetDay_free", slice_dayList, false);
			setDropDown("RetDay_free", day3);
			addWeekDropDownExtCal(parseInt(WeekDay, 10), month3, "RetDay_free");
		} else {
			// フライト　帰り

			// 行き日付取得
			var GoMonth = document.getElementById("Month_free").value;
			var GoDay = document.getElementById("Day_free").value;
			setYear = getYear(sysYear, sysMonth, sysDay, GoMonth, GoDay);
			chkDays = getDays(1, setYear, GoMonth, GoDay);
			var Free0Days = String(chkDays["year"]) + String(chkDays["month"]) + String(chkDays["day"]);
			var RetYMonths = String(setYear) + String(GoMonth);

			// 帰り日付取得
			var RetMonth = document.getElementById("RetMonth_free").value;

			// 13日後取得
			DaysFree13 = getDays(13, setYear, GoMonth, GoDay);
			var Free13Days = String(DaysFree13["year"]) + String(DaysFree13["month"]) + String(DaysFree13["day"]);

			// 選択日付取得
			setRetYear = getYear(sysYear, sysMonth, sysDay, month, day);
			var FreeRetDays = String(setRetYear) + String(month) + String(day);
			var FreeRetYMonths = String(setRetYear) + String(month);

			// 月をセット
			if (parseInt(FreeRetDays, 10) < parseInt(Free0Days, 10)) { // 選択した日がフライト帰りの初日より過去日の場合
				setDropDown("RetMonth_free", document.getElementById("RetMonth_free")[0].value);
				var BetweenFlag = "OUT";
			} else {
				if (parseInt(Free13Days, 10) < parseInt(FreeRetDays, 10)) { // 選択した日がフライト帰りの最後日より未来日の場合
					setDropDown("RetMonth_free", document.getElementById("RetMonth_free")[document.getElementById("RetMonth_free").length - 1].value);
					var BetweenFlag = "OVER";
				} else {
					setDropDown("RetMonth_free", month);
					var BetweenFlag = "IN";
				}
			}

			// 日のリストを作成
			if (parseInt(RetMonth, 10) == parseInt(month, 10)) {
			// 選択している月が、カレンダーで選択した月と同一の場合
			} else {
			// 選択している月が、カレンダーで選択した月と異なる場合
				dayList = createDayList(setYear, month, false);

				if ( RetYMonths < FreeRetYMonths ) {
				// 行きの年月より、帰りのカレンダーで選択した年月が未来の場合

					if ( parseInt(GoMonth, 10) == parseInt(DaysFree13["month"], 10) ) {
						// 行きの月と13日後の月が同じ場合（13日間が月にまたがらない場合）
						var slice_dayList = dayList.slice(parseInt(GoDay, 10), parseInt(DaysFree13["day"], 10));
						var WeekDay = GoDay;
						var StayYear = DaysFree13["year"];

						var month_set = GoMonth;

					} else {
						// 行きの月と13日後の月が異なる場合（13日間が月にまたがる場合）

						var slice_dayList = dayList.slice(0, parseInt(DaysFree13["day"], 10));
						var WeekDay = 0;
						var StayYear = DaysFree13["year"];

						var month_set = DaysFree13["month"];

					}

				} else {
				// 行きの年月より、帰りのカレンダーで選択した年月が過去の場合

					if ( parseInt(GoMonth, 10) == parseInt(DaysFree13["month"], 10) ) {
					// 行きの月と13日後の月が同じ場合（13日間が月にまたがらない場合）

						var slice_dayList = dayList.slice(parseInt(GoDay, 10), parseInt(DaysFree13["day"], 10));
						var WeekDay = GoDay;
						var StayYear = setYear;

						var month_set = GoMonth;

					} else {
					// 行きの月と13日後の月が異なる場合（13日間が月にまたがる場合）

						if(parseInt(DaysFree13["month"], 10) == parseInt(document.getElementById("RetMonth_free").value, 10)){
						// 13日後の月が、帰りの月と同じ場合

							dayList = createDayList(setYear, parseInt(document.getElementById("RetMonth_free").value, 10), false);
							var slice_dayList = dayList.slice(0, parseInt(DaysFree13["day"], 10));
							var WeekDay = 0;
							var StayYear = setYear;

							var month_set = parseInt(document.getElementById("RetMonth_free").value, 10);

						} else {
						// 13日後の月が、帰りの月と違う場合
							dayList = createDayList("", GoMonth, false);
							var slice_dayList = dayList.slice(parseInt(GoDay, 10));
							var WeekDay = GoDay;
							var StayYear = setYear;

							var month_set = GoMonth;

						}

					}

				}

				createDropDown("RetDay_free", slice_dayList, false);
				addWeekDropDownExtCal(parseInt(WeekDay, 10), month_set, "RetDay_free");

			}

			// 日をセット
			if (BetweenFlag == "OUT") {
				setDropDown("RetDay_free", document.getElementById("RetDay_free")[0].value);
			} else {
				if (BetweenFlag == "OVER") {
					setDropDown("RetDay_free", document.getElementById("RetDay_free")[document.getElementById("RetDay_free").length - 1].value);
				} else {
					setDropDown("RetDay_free", day);
				}
			}

		}
	}

	// 宿泊日数連動
	var IMonth = document.getElementById("Month_free").value;
	var IDay = document.getElementById("Day_free").value;
	var RetIMonth = document.getElementById("RetMonth_free").value;
	var RetIDay = document.getElementById("RetDay_free").value;
	var IYear = getYear(sysYear, sysMonth, sysDay, IMonth, IDay);
	DaysFree13 = getDays(13, IYear, IMonth, IDay);
	if (parseInt(DaysFree13["month"], 10) == parseInt(IMonth, 10)) {
		var RetIYear = DaysFree13["year"];
	} else {
		if (parseInt(DaysFree13["month"], 10) == parseInt(RetIMonth, 10)) {
			var RetIYear = DaysFree13["year"];
		} else {
			var RetIYear = IYear;
		}
	}
	var gDate = new Date(IYear, parseInt(IMonth, 10) - 1, IDay);
	var rDate = new Date(RetIYear, parseInt(RetIMonth, 10) - 1, RetIDay);
	var betDate = rDate.getTime() - gDate.getTime();
	StayDays = Math.floor(betDate / (1000*60*60*24));

	var slice_stayList = domStay_list.slice(0,StayDays);
	createDropDown("Stay_free", slice_stayList, false);
	setDropDown("Stay_free", slice_stayList.length);


	return true;
};


/**
 * <p>カレンダー上の前の月に移動が可能かどうかを判断する。</p>
 * 
 * @param {Number} value 移動する月数
 * @return {boolean} true:可能 false:不可
 */
freePopupCalendar.prototype.isEnableToMovePrevMonth = function(value) {
	var tempDate = new Date(this.baseDate.getFullYear(), this.baseDate.getMonth(), 0);
	return this.DU.isValidDate(tempDate);
};

/**
 * <p>カレンダー上の次の月に移動が可能かどうかを判断する。</p>
 * @param {Number} value 移動する月数
 * @return {boolean} true:可能 false:不可
 */
freePopupCalendar.prototype.isEnableToMoveNextMonth = function(value) {
	var tempDate = new Date(this.baseDate.getFullYear(), (this.baseDate.getMonth() + value), 1);
	return this.DU.isValidDate(tempDate);
};

/**
 * <p>指定された日付のstyle classを取得します。</p>
 * @param {Date} date
 * @return {String} styleclass名
 */
freePopupCalendar.prototype.getCalendarCellStyle = function(date) {
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
