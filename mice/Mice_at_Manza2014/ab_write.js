
function ab_write()
{
	// �uobject��embed�^�O�ŏ����ꂽFlash�Ȃǂ�ActivX�R���e���c�́A��x���[�U�[��
	// �N���b�N����Ȃǂ̓��������܂ł͓����Ȃ��Ȃ�(IE)�v���ɑ΂���Ή�
	// Flash�Ăяo���������O��js�����邱�Ƃɂ���ĉ�������

	htm  = '';
	// IE�Ŏ��s���鎞�� AccessBook Window �̑傫�����w�肷�� �i�f�t�H���g 970-700, �S��� 100%-100%�j
	htm += '<div style="width:914.7; height:650;" id="flashPanel">';
	htm += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,115,0" width="100%" height="100%" align="middle">';
	htm += '<param name="allowScriptAccess" value="sameDomain" />';
	// IE�Ŏ��s���鎞�̃f�t�H���g�G���R�[�h�^�C�v���w�肷�� �iutf=UTF-8 , sjis=Shift_JIS�j
	//htm += '<param name="FlashVars" value="encode=sjis&openpage=' + myURLParam("openpage") + '" />';
	htm += '<param name="FlashVars" value="encode=sjis&openpage=' + myURLParam("openpage")+ '&returnLength='+ history.length + '&referrer=' + document.referrer + '" />';
	htm += '<param name="movie" value="start.swf" />';
	htm += '<param name="play" value="false" />';
	htm += '<param name="allowFullScreen" value="true" />';
	htm += '<param name="loop" value="false" />';
	htm += '<param name="quality" value="best" />';
	htm += '<param name="bgcolor" value="#ffffff" />';
	htm += '<embed src="start.swf" play="false" loop="false" quality="best" bgcolor="#ffffff" allowFullScreen="true" ';
	// FireFox�Ŏ��s���鎞�� AccessBook Window �̑傫�����w�肷�� �i�f�t�H���g 970-700, �S��� 100%-100%�j
	htm += 'width="100%" height="100%" ';
	htm += 'name="accessbook_current" align="middle" ';
	// Firefox�Ŏ��s���鎞�̃f�t�H���g�G���R�[�h�^�C�v���w�肷�� �iutf=UTF-8 , sjis=Shift_JIS�j
	//htm += 'FlashVars="encode=sjis&openpage=' + myURLParam("openpage") + '" ';
	htm += 'FlashVars="encode=sjis&openpage=' + myURLParam("openpage") + '&returnLength='+ (history.length-1) + '&referrer=' + document.referrer + '" ';
	htm += 'allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
	htm += '</object>';
	htm += '</div>';

	document.write(htm);
}
