
function ab_write()
{
	// 「objectやembedタグで書かれたFlashなどのActivXコンテンツは、一度ユーザーが
	// クリックするなどの動作をするまでは動かなくなる(IE)」問題に対する対応
	// Flash呼び出し部分を外部js化することによって解決する

	htm  = '';
	// IEで実行する時の AccessBook Window の大きさを指定する （デフォルト 970-700, 全画面 100%-100%）
	htm += '<div style="width:914.7; height:650;" id="flashPanel">';
	htm += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,115,0" width="100%" height="100%" align="middle">';
	htm += '<param name="allowScriptAccess" value="sameDomain" />';
	// IEで実行する時のデフォルトエンコードタイプを指定する （utf=UTF-8 , sjis=Shift_JIS）
	//htm += '<param name="FlashVars" value="encode=sjis&openpage=' + myURLParam("openpage") + '" />';
	htm += '<param name="FlashVars" value="encode=sjis&openpage=' + myURLParam("openpage")+ '&returnLength='+ history.length + '&referrer=' + document.referrer + '" />';
	htm += '<param name="movie" value="start.swf" />';
	htm += '<param name="play" value="false" />';
	htm += '<param name="allowFullScreen" value="true" />';
	htm += '<param name="loop" value="false" />';
	htm += '<param name="quality" value="best" />';
	htm += '<param name="bgcolor" value="#ffffff" />';
	htm += '<embed src="start.swf" play="false" loop="false" quality="best" bgcolor="#ffffff" allowFullScreen="true" ';
	// FireFoxで実行する時の AccessBook Window の大きさを指定する （デフォルト 970-700, 全画面 100%-100%）
	htm += 'width="100%" height="100%" ';
	htm += 'name="accessbook_current" align="middle" ';
	// Firefoxで実行する時のデフォルトエンコードタイプを指定する （utf=UTF-8 , sjis=Shift_JIS）
	//htm += 'FlashVars="encode=sjis&openpage=' + myURLParam("openpage") + '" ';
	htm += 'FlashVars="encode=sjis&openpage=' + myURLParam("openpage") + '&returnLength='+ (history.length-1) + '&referrer=' + document.referrer + '" ';
	htm += 'allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
	htm += '</object>';
	htm += '</div>';

	document.write(htm);
}
