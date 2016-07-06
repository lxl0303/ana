// AccessBook window を閉じる関数 closeWindow
function closeWindow(){
	//if(document.referrer)
	//{
	//	window.location.href=document.referrer;
	//}else{
	  var nvua = navigator.userAgent;
	  if(nvua.indexOf('MSIE') >= 0){
	    if(nvua.indexOf('MSIE 5.0') == -1) {
	      top.opener = '';
	    }
	  }
	  else if(nvua.indexOf('Gecko') >= 0 || nvua.indexOf('Opera') >= 0) {
	    // Firefox2.0以上では、以下の制限により、Windowをクローズすることが出来ない。
	    //「スクリプトはスクリプトによって開かれたウィンドウ以外を閉じることができません。」
	    // ゆえにダイアログを表示して回避する。
	    //if(nvua.indexOf('Firefox/2') >= 0) {
	    if(nvua.indexOf('Firefox') >= 0){
	      dlg = confirm("このブラウザでは動作しません。ブラウザの×ボタンで閉じてください。");
	      return null;
	    } else {
	      top.name = 'CLOSE_WINDOW';
	      wid = window.open('','CLOSE_WINDOW');
	    }
	  }
	  
	  dlg = true;
	  // 確認のダイアログボックスを出す場合は以下をコメントアウトする
	  // ログ取得上は確認ダイアログを出さない方が良い
	  // dlg = confirm("ウィンドゥを閉じてもよろしいですか？");
	  if(dlg == true) {
	    top.close();
	  }
	//}  
}

function returnWindow(){
	//if(document.referrer)
	//{
	//	window.location.href=document.referrer;
	//}
	window.history.back();
}

// AccessBook HELP Page を呼び出す関数 helpWindow
function helpWindow() {
	window.open('./help/index.html');
}


// AccessBook 外部Page を呼び出す関数 openWindow
function openWindow(fname) {
	window.open(fname, "_blank");
}


// URLパラメータ内の変数名に対するデータを切り出す関数 myGetURLParam
// 書式 : myGetURLParam("変数名")  戻り値 : String(ヒットしないときは 1 )
function myURLParam(myArg){
  myArg = "&" + myArg + "=";
  myDat = 1;
  myStr = location.search;
  myLen = myStr.length;
  myStr = "&" + myStr.substring(1,myLen) + "&";
  myHit = myStr.indexOf(myArg);
  if (myHit != -1){
    myStart = myHit + myArg.length;
    myEnd   = myStr.indexOf("&" , myStart);
    myDat   = myStr.substring(myStart, myEnd);
  }
  return myDat;
}

