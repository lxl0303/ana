//■■年月セレクトボックス作成
gy = new Date().getFullYear();
gm = new Date().getMonth()+1;

str = ""
sgm = ""
str = "<div class='range'><div class='inner dt_yyyymm'>2016年11月<span></span></div><select name='dt_yyyymm' size='1' class='dt_yyyymm'>"
//str = str + "<option value='2005/03/01' selected >-------- </option>"

for (i=1; i <= 12; i++ ){

	if(gm > 12){
		gm = 1;
		gy = gy + 1;
	}
	if(gm < 10){
		sgm="0" + gm;
	}
	else {
		sgm="" + gm;
	}
	str=str + "<option value=" + gy + "/" + sgm + "/" + "01 >" + gy + "年 " + sgm + "月" + "</option>"
	gm=gm+1;
}

str = str + "</select></div>";
document.write(str);

//■日セレクトボックス作成
str = ""
str = "<div class='range'><div class='inner dt_dd'>31日<span></span></div><select name='dt_dd' size='1' class='dt_dd'>"
//str = str + "<option value='1' selected >--</option>"

  gd = new Date().getDate();
for (i=1; i <= 31; i++ ){
	sgm=""+ i

	if(sgm==gd){
		str=str + "<option value=" + sgm + " selected >" + i + "日" + "</option>";
	}
	else {
		str=str + "<option value=" + sgm + " >" + i + "日" + "</option>";
	}
}

str = str + "</select></div>";
document.write(str);


//	以下関数
function add_action_name_hms(form_name, action) {
	var now = new Date();
	document.getElementById(form_name).action = action + "#" + now.getHours() + now.getMinutes() + now.getSeconds();
	return true;
}