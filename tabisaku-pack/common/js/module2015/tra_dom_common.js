/*******************************************************************************
 * 初期化
 * 
 *******************************************************************************/

//現在日の取得
var nowYs = new Date();
var sysYear = nowYs.getFullYear();
var sysMonth = nowYs.getMonth() + 1;
var sysDay = nowYs.getDate();

//モジュール切り替え
function changeTab(unit) {

	switch(unit) {
		case "free":
			freeInit();
		break;
		default:
			freeInit();
		break;
	}

}


//--------------------------------------------------------------------カレンダー

//カレンダー表示（IE6以下、Safari3以下は表示しない）
if ((underMSIE6()) || (underSafari3())) {

	// 旅作4月1日残対応
	if (document.getElementById("calImg5") != null) {
		document.getElementById("calImg52").style.display = "none";
		document.getElementById("calImg5").style.display = "none";
	}

} else {
	//初期月
	var moneMonth = parseInt(sysMonth) - 1;

	//その他
	PCP2 = new PopupCalendarProperties();
	var DU3 = new DateUtil(sysYear, moneMonth, sysDay, PCP2);

	// 旅作4月1日残対応
	if (document.getElementById("calImg5") != null) {
		var cal52 = new freePopupCalendar("cal52", "calid52", "autoDATE_month2", "autoDATE_day2", "8", "calImg52", "10px", "0px", "", 0, 0, "0", document.atourForm, "", 0, DU3);
		var cal5 = new freePopupCalendar("cal5", "calid5", "autoDATE_month", "autoDATE_day", "5", "calImg5", "10px", "0px", "", 0, 0, "1", document.atourForm, cal52, 1, DU3);
	}

	//旅作4月1日残対応
	if (document.getElementById("calImg5") != null) {
		var freeCalendarContoroller = new freeCalendarContoroller(cal52, cal5);
	}

}

//------------------------------------------------ダイナミックパッケージ（旅作）
function freeInit() {

	//初期値変数
	var _depApo1 = "HND";
	var _arrApo1 = "OKA";
	var _dom_region = "";
	var _dom_area = "";
	var _dom_stay = "1";
	var _dom_fromMembers = "1";

	// 2011/2/2 旅作 参加人数と1部屋あたりの利用人数の連動
	var _dom_members = "1";
	var _dom_toMembers = "1";

	// 2011/2/2 旅作 フライト帰り
	var _depApo2 = _arrApo1;
	var _arrApo2 = _depApo1;

	//モジュール初期化（到着空港と宿泊地の履歴はここではセットしない）
	var DepApo_free = new airportTag("DepApo_free", domFreeDepApo_list, true, true, false, _depApo1, "", "");
	var ArrApo_free = new airportTag("ArrApo_free", domFreeArrApo_list, true, true, true, _arrApo1, "", "");
	var Area_free = new airportTag("Area_free", domArea_list, true, false, true, "", "", "");
	var Region_free = new airportTag("Region_free", domRegion_list, true, false, false, "", Area_free, "");
	var Stay_free = new listTag("Stay_free", domStay_list, _dom_stay, false);
	var Members_free = new listTag("Members_free", domMembers_list, _dom_members, false);
	var MembersFrom_free = new listTag("MembersFrom_free", domMembers_list, _dom_fromMembers, false);
	var MembersTo_free = new listTag("MembersTo_free", domMembers_list, _dom_toMembers, false);

	//================================================ 日付処理 {
	//初期値設定
	var RetDays = new Array(); // 13日間の最初の日と最後の日の配列
	var RetEndDay;             // 復路の月末日付（date）

	//------------------------------------------------日付パラメータの設定
	// 往路
	var Date_free = new DateObject("Month_free", "Day_free");
			Date_free.plus_day = "10"; // 何日後設定（10日後）

	// 復路
	var Date2_free = new DateObject("RetMonth_free", "RetDay_free");

	//-----------------復路の表示期間を取得する為、往路日付から 1日後（復路の表示開始日付）
	//                                      13日後（復路の表示終了日付）を取得する
	function getFreeReturnDays() {

		//変数設定
		var RetDaysFree1 = new Array();  // 往路から1日後の配列
		var RetDaysFree13 = new Array(); // 往路から13日後の配列
		var RetDaysFree = new Array();   // 上記2つの配列を合算した配列

		// 往路から1日後を取得
		RetDaysFree1 = getDays(1, Date_free.year, Date_free.month, Date_free.day);
		RetDaysFree["start_year"] = RetDaysFree1["year"];
		RetDaysFree["start_month"] = RetDaysFree1["month"];
		RetDaysFree["start_day"] = RetDaysFree1["day"];
		// 往路から13日後を取得
		RetDaysFree13 = getDays(13, Date_free.year, Date_free.month, Date_free.day);
		RetDaysFree["end_year"] = RetDaysFree13["year"];
		RetDaysFree["end_month"] = RetDaysFree13["month"];
		RetDaysFree["end_day"] = RetDaysFree13["day"];

		return RetDaysFree;

	}

	//--------------------------開始月と終了月の比較（復路で月がまたがっているか、いないか）
	function monthCompFree() {
		// 月がまたがっていない場合はtrue、またがっている場合はfalseを返す
		if (RetDays["start_month"] == RetDays["end_month"]) {
			return true;
		} else {
			return false;
		}
	}

	//----------------------------連動処理（往路処理の直後、復路処理の直前に動作）
	Date_free.onDateLink = function() {

		// 復路の開始・終了日付を取得
		RetDays = getFreeReturnDays();

		// 復路の設定
		Date2_free.month_display_flag = 1;
		Date2_free.day_display_flag = 1;
		Date2_free.init_month = RetDays["start_month"];
		Date2_free.init_day = RetDays["start_day"];
		Date2_free.start_month = RetDays["start_month"];
		Date2_free.start_day = RetDays["start_day"];

		if (monthCompFree() == true) {
			// 往路から1日後の月と、13日後の月が同じ場合
			// （13日間で月がまたがっていない場合）

			// 月プルダウンは1ヶ月のみ表示
			Date2_free.between_month = "1";
			// 表示終了日は13日後の日
			Date2_free.end_day = RetDays["end_day"];

		} else {
			// 往路から1日後の月と、13日後の月が違う場合
			// （13日間で月がまたがっている場合）

			// 月プルダウンは2ヶ月表示
			Date2_free.between_month = "2";
			// 表示終了日は月末日
			RetEndDay = new Date(RetDays["start_year"], RetDays["start_month"], 0);
			Date2_free.end_day = RetEndDay.getDate();

		}
		// 復路初期化
		Date2_free.onMonthLoad();
	}

	//------復路のonMonthChangeのオーバーライド（復路の月のプルダウンを更新した場合に発生）
	Date2_free.onMonthChange = function() {
		// 年月日の変数を再設定
		Date_free.day = document.getElementById(Date_free.day_id).value;
		Date_free.month = document.getElementById(Date_free.month_id).value;
		Date_free.year = getCorrectYear(sysYear, Date_free.month, sysMonth);
		Date2_free.day = document.getElementById(Date2_free.day_id).value;
		Date2_free.month = document.getElementById(Date2_free.month_id).value;
		Date2_free.year = getCorrectYear(sysYear, Date2_free.month, sysMonth);

		// 復路の開始・終了日付を取得
		RetDays = getFreeReturnDays();

		if (monthCompFree() == false) {
			// 往路から1日後の月と、13日後の月が違う場合
			// （13日間で月がまたがっている場合）

			if (RetDays["end_month"] == Date2_free.month) {
				// 13日後の月が、選択した復路の月と同じ場合

				// 表示開始日は1日
				Date2_free.start_day = "1";
				// 表示終了日は13日後の日
				Date2_free.end_day = RetDays["end_day"];
			} else {
				// 13日後の月が、選択した復路の月と違う場合

				// 表示開始日は1日後の日
				Date2_free.start_day = RetDays["start_day"];
				// 表示終了日は月末日
				RetEndDay = new Date(RetDays["start_year"], RetDays["start_month"], 0);
				Date2_free.end_day = RetEndDay.getDate();
			}
		}

		// 日のロード
		Date2_free.onDayLoad();
	}

	//------------------連動処理（復路の日を更新すると発生する宿泊日数プルダウンとの連動）
	Date2_free.onDateLink = function() {
		stayChange();
	}

	// 往路初期化
	Date_free.onMonthLoad();
	//================================================ } 日付処理

	// 2011/2/2 旅作 フライト帰り
	if (document.getElementById("RetDepApo_free") != null) {
		var RetDepApo_free = new airportTag("RetDepApo_free", domFreeArrApo_list, true, true, true, _depApo2, "", "");
	}
	if (document.getElementById("RetArrApo_free") != null) {
		for(var i = 0; i < domFreeDepApo_list.length; i++) {
			if (domFreeDepApo_list[i].value == _arrApo2) {
				document.getElementById("RetArrApo_free").innerHTML = domFreeDepApo_list[i].text;
			}
		}
	}

	//クラスオーバーライド
	// 2011/2/2 旅作 フライト帰り
	Members_free.onChangeOverride = function() {
		if (document.getElementById("RetDepApo_free") != null) {
			setDropDown("MembersTo_free", document.getElementById("Members_free").value);
		}
	}

	// 旅作4月1日残対応
	function stayChange() {
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
	}

	DepApo_free.onChangeOverride = function() {
		if (document.getElementById("RetArrApo_free") != null) {
			for(var i = 0; i < domFreeDepApo_list.length; i++) {
				if (domFreeDepApo_list[i].value == document.getElementById("DepApo_free").value) {
					document.getElementById("RetArrApo_free").innerHTML = domFreeDepApo_list[i].text;
				}
			}
		}
	}

	ArrApo_free.onChangeOverride = function() {
		if (document.getElementById("ArrApo_free").value != "") {
			var Regs = domRelation_obj[document.getElementById("ArrApo_free").value];
			createDropDown("Region_free", Region_free.list[Regs[0]], false);
			setDropDown("Region_free", Regs[1]);
			ChangeDisplay("Region_free", true);
			createDropDown("Area_free", Area_free.list[Regs[1]], true);
			setDropDown("Area_free", Regs[2]);
			ChangeDisplay("Area_free", true);
		} else {
			createNODropDown("Region_free");
			ChangeDisplay("Region_free", false);
			createNODropDown("Area_free");
			ChangeDisplay("Area_free", false);
		}
		// 2011/2/2 旅作 フライト帰り
		if (document.getElementById("RetDepApo_free") != null) {
			setDropDown("RetDepApo_free", document.getElementById("ArrApo_free").value);
		}
	}

	// 旅作4月1日残対応
	if (document.getElementById("calImg5") != null) {
		// フライト帰りの到着空港の初期化
		DepApo_free.onChange();
	}
	if (_arrApo1 != "") {
		ArrApo_free.onChangeOverride();
	}
}


/*******************************************************************************
 * Submit関数
 * 
 *******************************************************************************/

//------------------------------------------------ダイナミックパッケージ（旅作）
function freeSubmit() {

	if (document.getElementById("ArrApo_free").value != "") {
		var Regs = domRelation_obj[document.getElementById("ArrApo_free").value];
		document.getElementById("Mat_free").value = Regs[0];
	} else {
		document.getElementById("Mat_free").value = "PROMPT";
	}
	document.getElementById("Date_free").value = getyymmdd(document.getElementById("Month_free").value, document.getElementById("Day_free").value);

	// 2011/2/2 旅作 フライト帰り
	RetAIRDate = '';
	if (document.getElementById("RetDate_free") != null) {
		document.getElementById("RetDate_free").value = getyymmdd(document.getElementById("RetMonth_free").value, document.getElementById("RetDay_free").value);
		RetAIRDate = 'autoAIRreturnDate='      + document.getElementById("RetDate_free").value        + '&';
		RetAIRDate += 'autoAIRreturnDept='     + document.getElementById("RetDepApo_free").value      + '&';
	}

	document.getElementById("Quickstart_free").value = Quickstart_free;
	document.getElementById("Refid_free").value = Refid_free;

	// クエリーストリング作成
	var querystring = '?' +
		'autoAIRgo='     + document.getElementById("DepApo_free").value      + '&' +  // 出発空港 
		'autoAIRreturn=' + document.getElementById("ArrApo_free").value      + '&' +  // 到着空港
		'autoMAJMAT='    + document.getElementById("Mat_free").value         + '&' +  // 方面（到着空港による）
		'autoREGION='    + document.getElementById("Region_free").value      + '&' +  // 宿泊地区2
		'autoAREA='      + document.getElementById("Area_free").value        + '&' +  // 宿泊地域（到着空港による）
		'autoDATE='      + document.getElementById("Date_free").value        + '&' +  // 出発日
		RetAIRDate +
		'autoNINZU='     + document.getElementById("Members_free").value     + '&' +  // 参加人数
		'autoSTAY='      + document.getElementById("Stay_free").value        + '&' +  // 宿泊日数
		'autoNUMPFROM='  + document.getElementById("MembersFrom_free").value + '&' +  // 一人部屋人数from
		'autoNUMPTO='    + document.getElementById("MembersTo_free").value   + '&' +  // 一人部屋人数to
		'quickstart='    + document.getElementById("Quickstart_free").value  + '&' +  // クイック検索フラグ（固定）
		'refid='         + document.getElementById("Refid_free").value      + '&' +  // リンク元（固定）
	'coopsitebanner=0'                                            + '&' +    // 特定バナー区分（0:モジュール起動）
		'cid=cid=PTN';

	var tabisaku_url = log_url['dom_free_guest'];

	var SUW = (screen.availWidth / 2) - 480;
	var w = window.open(tabisaku_url + querystring, '',"width=960,height=690,left=" + SUW + ",top=0,status=no,scrollbars=yes,resizable=yes");
	w.window.focus();

	return true;

}


/*******************************************************************************
 * 汎用関数
 * 
 *******************************************************************************/

// 期間条件付き月リストの作成
function createMonthDropDown(id, startMonth, endMonth) {

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
function addWeekDropDownExt(startDay, monthValue, pulldown) {
	
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

// 2011/2/2 旅作 フライト帰り
// 年の取得
function getYear(Year, nowMonth, nowDay, selMonth, selDay) {
	if (String(nowMonth).length == 1) { nowMonth = '0' + String(nowMonth); } else { nowMonth = String(nowMonth); }
	if (String(selMonth).length == 1) { selMonth = '0' + String(selMonth); } else { selMonth = String(selMonth); }
	if (String(nowDay).length == 1) { nowDay = '0' + String(nowDay); } else { nowDay = String(nowDay); }
	if (String(selDay).length == 1) { selDay = '0' + String(selDay); } else { selDay = String(selDay); }
	now = String(Year) + String(nowMonth) + String(nowDay);
	sel = String(Year) + String(selMonth) + String(selDay);
	if (parseInt(sel, 10) < parseInt(now, 10)) { Year = parseInt(Year, 10) + 1;}
	return Year;
}

//画面ロード
//window.document.body.onload=function(){
	/*
	document.getElementById("free").style.display = 'block';
	document.getElementById("sky").style.display = 'none';
	document.getElementById("hotel").style.display = 'none';
	document.getElementById("rentacar").style.display = 'none';
	document.getElementById("unit_free").checked = true;
	*/
	//changeTab("hotel");
//}
