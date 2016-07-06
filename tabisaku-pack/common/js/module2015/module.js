/*******************************************************************************
 * 汎用関数
 * 
 *******************************************************************************/

// 会員かどうか
function _isMember() {
	return (mstat.match(/^(m1e0|m1e1|m1e0t0|m1e0t1|m1e1t0|m1e1t1)$/) ) ? true : false;
}

// 他頻度会員かどうか
function _isOftenMember() {
	return (mstat.match(/^(m1e1|m1e1t0|m1e1t1)$/) ) ? true : false;
}

//旅達会員かどうか
function _isTabidachiMember() {
	return (mstat.match(/^(m1e0t1|m1e1t1)$/) ) ? true : false;
}

//上級会員も含めた会員かどうか
function isLogin() {

	if (_isMember() || _isOftenMember() || _isTabidachiMember()) {
		return true;
	} else {
		return false;
	}

}

//ユーザーエージェントからMSIE6以下をtrueで返す
function underMSIE6() {
	if (navigator.userAgent.indexOf("MSIE") != -1) {
		var msie_length = navigator.userAgent.indexOf("MSIE") + 5;
		var msie_version = parseInt(navigator.userAgent.substr(msie_length, 1));
		if (msie_version < 6) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

//ユーザーエージェントからSafari3以下をtrueで返す
//Safariは1系及び2系にはVersion表記がない
function underSafari3() {
	if (navigator.userAgent.indexOf("Safari") != -1) {
		if ((navigator.userAgent.indexOf("Chrome") == -1) && (navigator.userAgent.indexOf("Shiira") == -1)) {
			if (navigator.userAgent.indexOf("Version/") == -1) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}

//何日後を取得
function getDays(afterDay, year, month, day) {

	var afterTime = afterDay * 86400000;

	var NowFstDate = new Date(year, (month - 1), day);
	var PlusTwoDate = new Date(year, (month - 1), day);
	PlusTwoDate.setTime(NowFstDate.getTime() + afterTime);
	var PlusTwoYear = PlusTwoDate.getFullYear();
	var PlusTwoDay = PlusTwoDate.getDate();
	var PlusTwoMonth = PlusTwoDate.getMonth() + 1;

	if (String(PlusTwoMonth).length == 1) {
		PlusTwoMonth = '0' + String(PlusTwoMonth);
	} else {
		PlusTwoMonth = String(PlusTwoMonth);
	}
	if (String(PlusTwoDay).length == 1) {
		PlusTwoDay = '0' + String(PlusTwoDay);
	} else {
		PlusTwoDay = String(PlusTwoDay);
	}

	var Dates = new Array();
	Dates["year"] = PlusTwoYear;
	Dates["month"] = PlusTwoMonth;
	Dates["day"] = PlusTwoDay;

	return Dates;

}

// YYMMDD形式で返す
function getyymmdd(m, d){

	var nowDate = new Date();
	var tgtDate = new Date();
	var year = nowDate.getFullYear();
	
	tgtDate.setYear(year);
	tgtDate.setMonth(m);
	tgtDate.setDate(d);

	var y = (nowDate > tgtDate) ? year + 1 : year;
	
	return y + m + d;
}

//年月から日の配列を返す
function createDayList(year, month, ZeroDay) {

	var nowTime = new Date();
	if ((nowTime.getMonth() + 1) > parseInt(month, 10)) {
		var YearPlus = 1;
	} else {
		var YearPlus = 0;
	}
	if (year != "") {
		var Year = parseInt(year, 10) + YearPlus;
	} else {
		var Year = nowTime.getFullYear() + YearPlus;
	}
	var Month = month;
	var Day = new Date(Year, Month, 0);
	var endDay = Day.getDate();
	var dayList = new Array();
	if (ZeroDay == true) {
		endDay++;
	}
	for (var i = 0; i < endDay; i++) {
		currDay = i + 1;
		if (String(currDay).length == 1) {
			currDayValue = '0' + String(currDay);
		} else {
			currDayValue = String(currDay);
		}
		if (ZeroDay == true) {
			currDay = i;
			if (i == 0) {
				currDayValue = "0";
				currDay = "--";
			} else {
				if (String(currDay).length == 1) {
					currDayValue = '0' + String(currDay);
				} else {
					currDayValue = String(currDay);
				}
			}
		}
		dayList[i] = new Object();
		dayList[i].value = currDayValue;
		dayList[i].text = String(currDay) + "日";
	}

	return dayList;

}

//日ドロップダウンの作成
function makeDayDropDown(dayId, year, month, ZeroDay, defaultValue) {

	var dayList = new Array();
	dayList = createDayList(year, month, ZeroDay);
	createDropDown(dayId, dayList, false);
	setDropDown(dayId, defaultValue);
	addWeekDropDown(year, month, dayId);

}

//うるう年判定
function Uruu(year) {
	if ((year != "") && (typeof year != "undefined")) {
		if((year % 4==0 && year % 100 !=0) || year % 400 ==0){
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

//ドメイン振り分け処理
function DominSelect(){

	blnflg=false;
	if (document.getElementById("Search0_ticket").checked == true) {
		nowDate = new Date();
		nowYear = nowDate.getFullYear();
		nowMonth = nowDate.getMonth() + 1;
		nowday = nowDate.getDate();

		//現在日付より2ヶ月先の日程を取得 ただし、月は通常の月を入れるため＋１している
		AddTime = computeMonth(nowYear,nowMonth,nowday,2);
		//日付を時間に変更
		AddSec=AddTime.getTime();

		selectday=document.getElementsByName("segConditionForm.selectedEmbDay")[0].value;
		selectMonth=document.getElementsByName("segConditionForm.selectedEmbMonth")[0].value ;

		//年度取得処理開始
		//初期値
		selectYear=nowYear + 0;
		switch  (nowMonth){
			//８月の場合
			case 8:
				if (selectMonth==1){
					selectYear=nowYear + 1;
				}
				break;
			//９月の場合
			case 9:
				if (selectMonth==1 || selectMonth==2){
					selectYear=nowYear + 1;
				}
				break;
			//１０月の場合
			case 10:
				if (selectMonth==1 || selectMonth==2 || selectMonth==3){
					selectYear=nowYear + 1;
				}
				break;
			//１１月の場合
			case 11:
				if (selectMonth==1 || selectMonth==2 || selectMonth==3 || selectMonth==4){
					selectYear=nowYear + 1;
				}
				break;
			//１２月の場合
			case 12:
				if (selectMonth!=12){
					selectYear=nowYear + 1;
				}
				break;
		}
		
		//月の表示がjsの場合は－１されるため
		selectMonth=selectMonth -1 ;
		
		inputTime=new Date(selectYear, selectMonth, selectday);
		inputSec=inputTime.getTime();

		if(inputSec > AddSec){
			blnflg=true;
		}
	}else{
		blnflg=true;
	}

	//移動先の置換処理
	if (blnflg == true){
		urlEngine = log_url["dom_tic_aswbe_2"] + randQueryString;
		document.segConditionForm.action = urlEngine;
	}else{
		urlEngine = log_url["dom_tic_aswbe_1"] + randQueryString;
		document.segConditionForm.action = urlEngine;	
	}

}

//年月の月度の加算・減産処理
function computeMonth(year, month, day, addMonths) {

	month += addMonths;
	if (month > 12){
		year += 1;
		month = month - 12;
	}
	var TimeZero = new Date(year, month, 0);
	var endDay = TimeZero.getDate();
	if(day > endDay){
		day = endDay;
	}
	var dt = new Date(year, month-1 , day);
	return dt;
}

//2つの配列を比較し、共通のものを新しい配列で返す
function getMatchListValue(arr1, arr2) {

	var temp = new Array();
	for (var i = 0; i < arr1.length; i++) {
		for (var j = 0; j < arr2.length; j++) {
			if(arr1[i] == arr2[j].value) temp.push(arr2[j]);
		}
	}
	return temp;
}

//履歴Cookieの読み込み
function readHistoryCookie() {

	var strs_obj = new Object();
	var hen = new Object();
	if (document.cookie != '') {
		//Cookie読み込み
		var s_cookie = document.cookie.split(';');
		//機能ごとに分解して配列化
		for (i = 0; s_cookie.length > i; i++) {
			//スペースの削除
			var hd_strs = s_cookie[i].replace(' ', '');
			//=で分割
			var strs = hd_strs.split('=');
			strs_obj[strs[0]] = unescape(strs[1]);
		}
		if ((strs_obj["wa"] != '') && (typeof strs_obj["wa"] != 'undefined')) {
			//strs_obj[wa]をさらに分解
			var values = strs_obj["wa"].split(';');
			//変数ごとに分解して配列化してデコード
			for (i = 0; values.length > i; i++) {
				var strs_m = values[i].split('=');
				hen[strs_m[0]] = unescape(strs_m[1]);
			}
		}
		if ((strs_obj["hist"] != '') && (typeof strs_obj["hist"] != 'undefined')) {
			//strs_obj[hist]をさらに分解
			var values = strs_obj["hist"].split(';');
			//変数ごとに分解して配列化してデコード
			for (i = 0; values.length > i; i++) {
				var strs_m = values[i].split('=');
				hen[strs_m[0]] = unescape(strs_m[1]);
			}
		}
	}
	return hen;

}

//Cookieの作成
function writeHistoryCookie(writeStrs, Name, Time) {

	var i;
	var key;
	var tmp_hen = new Object();

	//エンコード
	var enc_compStrs = escape(writeStrs);

	//alert(enc_compStrs);

	//↓（Cookie書き込み
	if (Time == "0") {
		document.cookie = Name + '=' + enc_compStrs + '; path=/';
	} else {
		t = new Date;
		t.setTime(t.getTime() + Time * 24 * 60 * 60 * 1000);
		document.cookie = Name + '=' + enc_compStrs + '; path=/; expires=' + t.toGMTString();
	}
}

//関数のアタッチ
function applyFunc(bind, func) {
	return function() {
		return func.apply(bind, arguments);
	};
}

//イベントリスナのアタッチ
function addMultiEventListener(target, self, type, func) {
	if (target.addEventListener) {
		target.addEventListener(type, applyFunc(self, func), false);
	} else if (target.attachEvent && func.apply) {
		target.attachEvent("on" + type, applyFunc(self, func));
	} else {
		target["on" + type] = func;
	}
}

// ドロップダウンリストの作成
function createDropDown(pulldown, list, oneValue) {

	var elem = document.getElementById(pulldown);

	var newElem;
	var br = (navigator.appName == "Microsoft Internet Explorer") ? -1 : null;

	if (oneValue == true) {
		iValue = 1;
	} else {
		iValue = 0;
	}
	for (var i = elem.options.length; i > iValue; i--) {
		elem.remove(i - 1);
	}

	for (var i = 0; i < list.length; i++) {
		if (typeof list[i].text != "undefined") {
			newElem = document.createElement("option");
			newElem.text = list[i].text;
			newElem.value = list[i].value;
			elem.add(newElem, br);
		}
	}
}

// ドロップダウンリストの作成（空リスト）
function createNODropDown(pulldown) {

	var elem = document.getElementById(pulldown);

	var newElem;
	var br = (navigator.appName == "Microsoft Internet Explorer") ? -1 : null;

	for (var i = elem.options.length; i > 1; i--) {
		elem.remove(i - 1);
	}

}

// ドロップダウンリストに曜日を付加する
function addWeekDropDown(Year, monthValue, pulldown) {
	
	var elem = document.getElementById(pulldown);
	var elemlength = elem.options.length;

	var cdate  = new Date();
	var week_list = new Array("日","月","火","水","木","金","土");
	if ((cdate.getMonth() + 1) > parseInt(monthValue, 10)) {
		var YearPlus = 1;
	} else {
		var YearPlus = 0;
	}
	if (Year != "") {
		targetYear = parseInt(Year, 10) + YearPlus;
	} else {
		targetYear = cdate.getFullYear() + YearPlus;
	}
	w = (new Date(targetYear, parseInt(monthValue, 10)-1, 1)).getDay();

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

// ドロップダウンリストに値をセットする
function setDropDown(pulldown, val) {

	var elem = document.getElementById(pulldown);

	for(var i = 0; i < elem.options.length; i++) {

		if(elem.options[i].value == val) {
			elem.options.selectedIndex = i;
			return true;
		}
	}
	return false;
}

// フォーム要素の活性、非活性を切り替える
function ChangeDisplay(id, Flag) {
	if (Flag == false) {
		Flag = true;
	} else {
		Flag = false;
	}
	document.getElementById(id).disabled = Flag;
}


/*******************************************************************************
 * 要素クラス
 * textTag
 *******************************************************************************/
textTag = function(id) {

	this.id = id;

	addMultiEventListener(document.getElementById(this.id), this, 'click',
		function() {
			this.onClick();
		}
	);

}

/* イベント <クリック> *************************************/
textTag.prototype.onClick = function() {

	// override function
	if (typeof(this.onClickOverride) == "function") {
		this.onClickOverride();
	}

}


/*******************************************************************************
 * 要素クラス
 * listTag
 *******************************************************************************/
listTag = function(id, list, defaultValue, oneValue) {

	this.id = id;
	this.list = list;
	this.defaultValue = defaultValue;
	this.oneValue = oneValue;

	addMultiEventListener(document.getElementById(this.id), this, 'change',
		function() {
			this.onChange();
		}
	);

	this.onLoad();
}

/* イベント <画面ロード> ***********************************/
listTag.prototype.onLoad = function() {

	createDropDown(this.id, this.list, this.oneValue);
	setDropDown(this.id, this.defaultValue);
	
	// override function
	if (typeof(this.onLoadOverride) == "function") {
		this.onLoadOverride();
	}

}

/* イベント <変更> *****************************************/
listTag.prototype.onChange = function() {

	// override function
	if (typeof(this.onChangeOverride) == "function") {
		this.onChangeOverride();
	}

}


/*******************************************************************************
 * 要素クラス
 * airportTag
 *******************************************************************************/
airportTag = function(id, list, defaultListUse, displayFlag, oneValue, defaultValue, connectATag, connectTTag) {

	this.id = id;                          // タグのid
	this.list = list;                      // 空港（地区・地域）リスト
	this.defaultListUse = defaultListUse;  // デフォルト時にlistを作成する（true）、作成しない（false）
	this.displayFlag = displayFlag;        // デフォルト時に活性（true）、非活性（false）
	this.oneValue = oneValue;              // リストの0番目はHTMLの<option>を使用する（true）、使用しない（false）
	this.defaultValue = defaultValue;      // デフォルト値（defaultListUse == trueの時のみ有効）
	this.connectATag = connectATag;        // 子のairportTag
	this.connectTTag = connectTTag;        // 子のtextTag

	addMultiEventListener(document.getElementById(this.id), this, 'change',
		function() {
			this.onChange();
		}
	);

	this.onLoad();
}

airportTag.prototype.connectMakeList = function() {

	var Value = document.getElementById(this.id).value;

	if (this.connectATag != "") {

		if (Value != "") {
			createDropDown(this.connectATag.id, this.connectATag.list[Value], this.connectATag.oneValue);
			ChangeDisplay(this.connectATag.id, true);
			this.connectATag.onChange();
		} else {
			if (this.connectATag.displayFlag == true) {
				if (this.connectATag.defaultListUse == true) {
					var tempList = new Array();
					for (key in this.connectATag.list) {
						tempList = tempList.concat(this.connectATag.list[key], this.connectATag.oneValue);
					}
					createDropDown(this.connectATag.id, tempList, this.connectATag.oneValue);
					setDropDown(this.connectATag.id, this.connectATag.defaultValue);
				} else {
					createNODropDown(this.connectATag.id);
				}
			}
			ChangeDisplay(this.connectATag.id, this.connectATag.displayFlag);
			this.connectATag.onChange();
		}
	}
	if (this.connectTTag != "") {
		document.getElementById(this.connectTTag.id).value = Value;
	}

}


/* イベント <画面ロード> ***********************************/
airportTag.prototype.onLoad = function() {

	if (this.defaultListUse == true) {
		createDropDown(this.id, this.list, this.oneValue);
		setDropDown(this.id, this.defaultValue);
	} else {
		createNODropDown(this.id);
	}
	ChangeDisplay(this.id, this.displayFlag);

	this.connectMakeList();

	// override function
	if (typeof(this.onLoadOverride) == "function") {
		this.onLoadOverride();
	}

}

/* イベント <変更> *****************************************/
airportTag.prototype.onChange = function() {

	var Value = document.getElementById(this.id).value;

	if (Value == "IDX") {
		document.getElementById(this.id).options.selectedIndex = document.getElementById(this.id).options.selectedIndex + 1;
	}

	this.connectMakeList();

	// override function
	if (typeof(this.onChangeOverride) == "function") {
		this.onChangeOverride();
	}

}

/*******************************************************************************
 * 要素クラス
 * monthTag
 *******************************************************************************/
monthTag = function(id, lang, zeroValue, afterMonth, year, defaultValue, connectDTag) {

	this.id = id;
	this.lang = lang;
	this.zeroValue = zeroValue;
	this.afterMonth = afterMonth;
	this.year = year;
	this.defaultValue = defaultValue;
	this.connectDTag = connectDTag;

	addMultiEventListener(document.getElementById(this.id), this, 'change',
		function() {
			this.onChange();
		}
	);

	this.onLoad();
}

/* イベント <画面ロード> ***********************************/
monthTag.prototype.onLoad = function() {

	if (this.afterMonth == "-") {
		var startMonth = 1;
		var endMonth = 12;
	} else {
		var nowTime = new Date();
		var startMonth = nowTime.getMonth() + 1;
		var endMonth = this.afterMonth;
	}
	var currYear = "";
	currYear = this.year;
	if (currYear != "") {
		var nowDate = new Date();
		var nowMonth = nowDate.getMonth() + 1;
		var nowDay = nowDate.getDate();
		var Days10 = new Array();
		if ((Uruu(currYear)) && (nowMonth >= 2) && (nowDay >= 10)) {
			Days10 = getDays(-9, currYear, nowMonth, nowDay);
		} else {
			Days10 = getDays(-10, currYear, nowMonth, nowDay);
		}
	}
	var monthList = new Array();
	for (var i = 0; i < endMonth; i++) {
		currMonth = startMonth + i;
		if (currMonth > 12) {
			if (this.year != "") {
				currYear = this.year + 1;
			}
			currMonth = currMonth - 12;
			var i2 = i;
		} else {
			if (currYear != "") {
				if (Days10["month"] >= currMonth) {
					if ((Days10["month"] == 12) && (nowMonth == 1)) {
						currYear = this.year;
					} else {
						currYear = parseInt(this.year) + 1;
					}
					var i2 = i;
				} else {
					currYear = this.year;
					if (nowMonth == Days10["month"]) {
						var i2 = i + 1;
					} else {
						var i2 = i;
					}
				}
			} else {
				var i2 = i;
			}
		}
		if ((String(currMonth).length == 1) && (this.zeroValue == true)) {
			currMonthValue = '0' + String(currMonth);
		} else {
			currMonthValue = String(currMonth);
		}
		monthList[i2] = new Object();
		if (currYear != "") {
			monthList[i2].value = currYear + currMonthValue;
			monthList[i2].text = String(currYear) + "年" + String(currMonth) + "月";
			if ((Days10["month"] == currMonth) && (nowMonth == currMonth)) {
				i2 = i + 1;
				monthList[i2] = new Object();
				monthList[i2].value = String(currYear - 1) + String(currMonthValue);
				monthList[i2].text = String(currYear - 1) + "年" + String(currMonth) + "月";
			}
		} else {
			monthList[i2].value = currMonthValue;
			monthList[i2].text = String(currMonth) + "月";
		}
	}
	createDropDown(this.id, monthList, false);
	if (currYear != "") {
		setDropDown(this.id, currYear + this.defaultValue);
	} else {
		setDropDown(this.id, this.defaultValue);
	}
	
	// override function
	if (typeof(this.onLoadOverride) == "function") {
		this.onLoadOverride();
	}

}

/* イベント <変更> *****************************************/
monthTag.prototype.onChange = function() {

	if (this.connectDTag != "") {
		if (this.year != "") {
			this.connectDTag.year = document.getElementById(this.id).value.substring(0,4);
			this.connectDTag.month = document.getElementById(this.id).value.substring(4,6);
		} else {
			this.connectDTag.month = document.getElementById(this.id).value;
		}
		this.connectDTag.defaultValue = document.getElementById(this.connectDTag.id).value;
		this.connectDTag.onLoad();
	}

	// override function
	if (typeof(this.onChangeOverride) == "function") {
		this.onChangeOverride();
	}

}


/*******************************************************************************
 * 要素クラス
 * dayTag
 *******************************************************************************/
dayTag = function(id, lang, defaultValue, month) {

	this.id = id;
	this.lang = lang;
	this.year = "";
	this.month = month;
	this.defaultValue = defaultValue;
	this.ZeroDay = false;

	addMultiEventListener(document.getElementById(this.id), this, 'change',
		function() {
			this.onChange();
		}
	);

	this.onLoad();
}

/* イベント <画面ロード> ***********************************/
dayTag.prototype.onLoad = function() {

	makeDayDropDown(this.id, this.year, this.month, this.ZeroDay, this.defaultValue);

	// override function
	if (typeof(this.onLoadOverride) == "function") {
		this.onLoadOverride();
	}

}

/* イベント <変更> *****************************************/
dayTag.prototype.onChange = function() {

	// override function
	if (typeof(this.onChangeOverride) == "function") {
		this.onChangeOverride();
	}

}


/*******************************************************************************
 * 月日プルダウン処理
 *******************************************************************************/

/***** 汎用関数 ****************************************************************/

/**
 * 現在月と選択した月を比較し、年を更新する
 * イベント：DateObjectの各イベントが発生した時
 * 作成日  ：2011/12/5
 * 更新日  ：-
 * 
 * @param {Int} year 現在の年
 * @param {String} selectMonth プルダウンで選択した月
 * @param {String} nowMonth 現在の月
 * @returns {Int} 年（YYYY形式）
 */
function getCorrectYear(year, selectMonth, nowMonth) {

	var retYear = year;
	if (parseInt(selectMonth, 10) < parseInt(nowMonth, 10)) {
		retYear = parseInt(year, 10) + 1;
	}
	return retYear;

}

/**
 * 引数で渡した値が1桁の場合、1桁目に0を追加し、2桁の文字列を返す
 * イベント：DateObjectの各イベントが発生した時
 * 作成日  ：2011/12/5
 * 更新日  ：-
 * 
 * @param {Int} value 2桁にゼロ詰めする値
 * @returns {String} ゼロ詰めした値
 */
function zeroPadding(value) {

	if (value != "") {
		if (String(value).length == 1) {
			value = "0" + String(value);
		} else {
			value = String(value);
		}
	}

	return value;

}

/**
 * 月プルダウンで選択した月と年（year）から配列を作成する
 * 曜日（week_list）が空配列ではない場合は曜日も付加した状態で、日の配列を作成する
 * イベント：DateObjectのonDayLoadで日付プルダウンが生成される時
 * 作成日  ：2011/12/5
 * 更新日  ：-
 * 
 * @param {Int} year 計算された年
 * @param {String} month 対象月
 * @param {String} extra リスト最初の"--日" 空文字の場合追加しない
 * @param {String} extra_value リスト最初のextraのvalue
 * @param {String} day_sign 日の表記（"日"等） 空文字の場合使用しない
 * @param {Array} week_list 曜日の配列（日曜始まり） 空文字の場合使用しない
 * @param {Int} day_flag 期間表示フラグ（0:期間表示しない、1:期間表示）
 * @param {Int} start_day 期間表示フラグが1の場合、日リスト配列の開始日
 * @param {Int} end_day 期間表示フラグが1の場合、日リスト配列の終了日
 * @returns {Array} 日の配列
 */
function createDayArray(year, month, extra, extra_value, day_sign, week_list, day_flag, start_day, end_day) {

	// 曜日の配列の使用フラグ（使用する場合はtrue）
	var week_list_flag;

	// 年の取得
	var Year = year;

	// 月の取得
	var Month = parseInt(month, 10);

	// 年月から月末日を取得
	var Day = new Date(Year, Month, 0);
	var endDay = Day.getDate();

	// 年月から曜日を取得
	if ((typeof week_list[0] != "undefined") && (week_list[0] != "")) {
		var weekDay = new Date(Year, Month - 1, 1);
		var weekday_i = parseInt(weekDay.getDay(), 10);
		week_list_flag = true;
	} else {
		week_list_flag = false;
	}

	// 日の配列を作成する
	var dayList = new Array();
	var loop_index = 0;

	// extraを追加する場合、日リストの最初に付加する
	if (extra != "") {
		dayList[0] = new Object();
		dayList[0].value = extra_value;
		dayList[0].text = extra;
		loop_index = 1;
	}

	// 日のリストを作成する
	var loop_day = 1;
	for (var i = 0; i < endDay; i++) {

		// 日の value と text の初期化
		var day_value = String(loop_day);
		var day_text = String(loop_day);

		// 日が1桁の場合、0詰め
		day_value = zeroPadding(day_value);

		// 配列の日textに曜日を追加
		var week_day = "";
		if (week_list_flag == true) {
			week_day = week_list[weekday_i];
		}

		// 配列に日を追加
		dayList[loop_index] = new Object();
		dayList[loop_index].value = String(day_value);
		dayList[loop_index].text = String(day_text) + day_sign + week_day;

		// 次の日の曜日を取得（土曜の場合は日曜に）
		if ((typeof week_list[0] != "undefined") && (week_list[0] != "")) {
			if (weekday_i == 6) {
				weekday_i = 0;
			} else {
				weekday_i++;
			}
		}

		loop_day++;
		loop_index++;

	}

	var slice_dayList = new Array();
	if (day_flag == 0) {
		// 通常月リスト（1日～月末日まで）
		slice_dayList = dayList;
	} else {
		// 期間表示の日リストの作成
		if (extra != "") {
			slice_dayList = dayList.slice(start_day, end_day + 1);
		} else {
			slice_dayList = dayList.slice(start_day - 1, end_day);
		}
	}

	return slice_dayList;

}


/**
 * 年表記と月表記で今月から始まる12か月分の月の配列を生成する。
 * イベント：DateObjectのonMonthLoadで月プルダウンが生成される時
 * 作成日  ：2011/12/5
 * 更新日  ：-
 * 
 * @param {String} month_sign 月表記
 * @param {String} month_flag 期間表示フラグ（0:期間表示しない、1:期間表示）
 * @param {String} bet_start_month 期間表示する場合の開始月
 * @param {Int} between_month 期間表示する場合の期間（表示開始月から何ヵ月後まで表示する）
 * @param {String} value 現在選択されている月プルダウンのvalue
 * @returns {Array} 月の配列
 */
function createMonthArray(month_sign, month_flag, bet_start_month, between_month, value) {

	// 月のリストを作成する
	var month_list = new Array();
	for (var i = 0; i < 12; i++) {

		// 月の value と text の初期化
		var month_value = i + 1;
		var month_text = i + 1;

		// 月配列の添え字
		arr_idx = i;

		// フラグが1で、日が1桁の場合、0詰め
		month_value = zeroPadding(month_value);

		// 配列に月を追加
		month_list[arr_idx] = new Object();
		month_list[arr_idx].value = String(month_value);
		month_list[arr_idx].text = String(month_text) + String(month_sign);
	}

	var slice_month_list = new Array();
	if (month_flag == 0) {
		// 通常月リスト（1月～12月の12ヶ月）
		slice_month_list = month_list;
	} else {
		// 期間表示の月リストの作成

		// 開始月の取得
		var start_month = parseInt(bet_start_month, 10) - 1;
		// 終了月の取得
		var end_month = parseInt(between_month, 10) + parseInt(bet_start_month, 10) - 1;

		// 月配列を、開始月から終了月までsliceで取得
		slice_month_list = month_list.slice(start_month, end_month);

		if (parseInt(end_month, 10) > 12) {
			// 12月以降の月を算出
			var mon_enough = parseInt(end_month, 10) - 12;
			var add_month = slice_month_list.length;
			// 月のリストを作成する
			for (var a = 0; a < mon_enough; a++) {

				// 月の value と text の初期化
				var array_value = a;

				// 配列に月を追加
				slice_month_list[add_month] = new Object();
				slice_month_list[add_month].value = String(month_list[array_value].value);
				slice_month_list[add_month].text = String(month_list[array_value].text);
				add_month++;
			}
		}
	}

	return slice_month_list;
}


/**
 * 月プルダウンと日プルダウンのidをわたし
 * 日付プルダウンオブジェクトの初期値、イベントの作成、設定を行う
 * イベント：common.jsでDateObjectのインスタンスが作成された時
 * 作成日  ：2011/12/5
 * 更新日  ：-
 * 
 * @param {String} month_id 月プルダウンのid
 * @param {String} day_id 日プルダウンのid
 * @returns {Object} インスタンスオブジェクト
 */
DateObject = function(month_id, day_id) {

	// 月プルダウンパラメータ=====================================================
	// 月プルダウンのid
	this.month_id = month_id;

	// 月プルダウンの初期設定値
	this.init_month = sysMonth;

	// 月のvalue値（module.js内部用変数）
	this.month = this.init_month;

	// 月プルダウンの表記
	this.month_sign = "月";

	// 月プルダウンの期間表示フラグ（0:期間表示しない、1:期間表示）
	this.month_display_flag = 0;

		// プルダウン表示の開始月
		this.start_month = sysMonth;

		// 開始月から何ヶ月表示する場合（6ヶ月間表示の場合は6）
		this.between_month = "";

	// 日プルダウンパラメータ=====================================================
	// 日プルダウンのid
	this.day_id = day_id;

	// 日プルダウンの初期設定値
	this.init_day = sysDay;

	// 日のvalue値（module.js内部用変数）
	this.day = this.init_day;

	// 日プルダウン期間表示フラグ（0:期間表示しない、1:何日間表示）
	this.day_display_flag = 0;

		// 期間表示する場合の開始日
		this.start_day = "1";
		// 期間表示する場合の終了日
		this.end_day = "31";

	// 日プルダウンの1つめの項目（「--日」等 必要ない場合は空文字に設定）
	this.extra = "";
	// this.extraのvalue値
	this.extra_value = "0";

	// 日プルダウンの表記（必要ない場合は空文字に設定）
	this.day_sign = "日";

	// 曜日配列（必要ない場合は空配列に設定）
	this.week_list = new Array("(日)","(月)","(火)","(水)","(木)","(金)","(土)");

	// 共通パラメータ=============================================================

	// 年の設定値（module.js内部用変数）
	this.year = sysYear;

	// 画面ロード時のデフォルト日付からの日数（本日から何日後を設定）
	// 例：国内線ホテルの場合は1日後の為 "1"を設定
	this.plus_day = "";

	// 月を変更した場合の日プルダウンにセットする値
	// 1日にリセットするか、変更前の日をそのまま適用するか
	// そのまま適用する場合は、空文字、1日にする場合 "1"をセット
	this.month_move_value = "";

	// イベントのアタッチ=========================================================
	// 月プルダウンのonChangeイベント
	addMultiEventListener(document.getElementById(this.month_id), this, 'change',
		function() {
			this.onMonthChange();
		}
	);
	// 日プルダウンのonChangeイベント
	addMultiEventListener(document.getElementById(this.day_id), this, 'change',
		function() {
			this.onDayChange();
		}
	);

}

/**
 * 月プルダウンの画面ロード時で日付選択時の動作
 * 月プルダウンから年を取得、年月から月の配列を作成し、月プルダウンを作成
 * 値を月プルダウンにセットする
 * 日プルダウンの生成（onDayLoad）に処理を渡す
 * イベント：往路の場合⇒画面ロード時
 *           復路の場合⇒onDateLinkでの処理が完了した後
 * 作成日  ：2011/12/5
 * 更新日  ：-
 */
DateObject.prototype.onMonthLoad = function() {

	// 月プルダウンの作成

	// 年を取得
	this.year = getCorrectYear(sysYear, this.init_month, sysMonth);

	// 月の配列を作成
	var monthList = new Array();
	monthList = createMonthArray(this.month_sign, this.month_display_flag, this.start_month, this.between_month, this.init_month);

	// 月プルダウンに月の配列を適用
	createDropDown(this.month_id, monthList, false);

	// 「画面ロード時のデフォルト日付からの日数」を取得
	if (this.plus_day == "") {
		// 設定がない場合は、月の初期設定値をプルダウンに適用
		setDropDown(this.month_id, this.init_month);
		// 日の内部変数用の値を設定
		this.day = this.init_day;
	} else {
		// 設定がある場合は、
		// this.plus_day日後の日付を取得、プルダウンに適用
		var YMD_plus = new Array();
		YMD_plus = getDays(this.plus_day, this.year, this.init_month, this.init_day);
		setDropDown(this.month_id, YMD_plus["month"]);
		// 年の内部変数用の値を設定
		this.year = YMD_plus["year"];
		// 日の内部変数用の値を設定
		this.day = YMD_plus["day"];
	}
	// 月の内部変数用の値を設定
	this.month = document.getElementById(this.month_id).value;

	// 日のロード
	this.onDayLoad();

}

/**
 * ユーザーが月プルダウンを選択した時の動作
 * 月日の変数を更新
 * 選択された月で年の変数を更新
 * 日プルダウンの生成（onDayLoad）に処理を渡す
 * イベント：ユーザーが月プルダウンを選択した時
 * 作成日  ：2011/12/5
 * 更新日  ：-
 */
DateObject.prototype.onMonthChange = function() {

	// 日の内部変数用の値を設定
	this.day = document.getElementById(this.day_id).value;
	// 月の内部変数用の値を設定
	this.month = document.getElementById(this.month_id).value;
	// 年の内部変数用の値を設定
	this.year = getCorrectYear(sysYear, this.month, sysMonth);

	// 「月を変更した場合の日プルダウンにセットする値」が設定されている場合
	if (this.month_move_value != "") {
		// 日プルダウンに適用
		setDropDown(this.day_id, this.month_move_value);
		// 日の内部変数用の値を設定
		this.day = document.getElementById(this.day_id).value;
	}

	// 日のロード
	this.onDayLoad();

}

/**
 * 月プルダウンから年を取得、年月日から日の配列を作成し、日プルダウンを作成
 * 値を日プルダウンにセットする
 * 自身が往路の場合、復路の月プルダウンの生成の為にonDateLinkに処理を渡す
 * イベント：月プルダウンの処理が完了した後
 * 作成日  ：2011/12/5
 * 更新日  ：-
 */
DateObject.prototype.onDayLoad = function() {

	// 日プルダウンの作成

	// 日の配列を作成
	var dayList = new Array();
	dayList = createDayArray(this.year, this.month, this.extra, this.extra_value, this.day_sign, this.week_list, this.day_display_flag, this.start_day, this.end_day);

	// 日プルダウンに日の配列を適用
	createDropDown(this.day_id, dayList, false);
	// 日プルダウンに選択日付をセット
	setDropDown(this.day_id, this.day);
	// 日の内部変数用の値を設定
	this.day = document.getElementById(this.day_id).value;

	// 日付連動関数確認（common.js内に設置）
	if (typeof(this.onDateLink) == "function") {
		this.onDateLink();
	}

}

/**
 * ユーザーが日プルダウンを選択した時の動作
 * 年月日をプルダウンから変数を更新
 * 自身が往路の場合、復路の月プルダウンの生成の為にonDateLinkに処理を渡す
 * イベント：ユーザーが日プルダウンを選択した時
 * 作成日  ：2011/12/5
 * 更新日  ：-
 */
DateObject.prototype.onDayChange = function() {

	// 日の内部変数用の値を設定
	this.day = document.getElementById(this.day_id).value;
	// 月の内部変数用の値を設定
	this.month = document.getElementById(this.month_id).value;
	// 年の内部変数用の値を設定
	this.year = getCorrectYear(sysYear, this.month, sysMonth);

	// 日付連動関数確認（common.js内に設置）
	if (typeof(this.onDateLink) == "function") {
		this.onDateLink();
	}

}
