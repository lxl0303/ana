// AccessBook window �����֐� closeWindow
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
	    // Firefox2.0�ȏ�ł́A�ȉ��̐����ɂ��AWindow���N���[�Y���邱�Ƃ��o���Ȃ��B
	    //�u�X�N���v�g�̓X�N���v�g�ɂ���ĊJ���ꂽ�E�B���h�E�ȊO����邱�Ƃ��ł��܂���B�v
	    // �䂦�Ƀ_�C�A���O��\�����ĉ������B
	    //if(nvua.indexOf('Firefox/2') >= 0) {
	    if(nvua.indexOf('Firefox') >= 0){
	      dlg = confirm("���̃u���E�U�ł͓��삵�܂���B�u���E�U�́~�{�^���ŕ��Ă��������B");
	      return null;
	    } else {
	      top.name = 'CLOSE_WINDOW';
	      wid = window.open('','CLOSE_WINDOW');
	    }
	  }
	  
	  dlg = true;
	  // �m�F�̃_�C�A���O�{�b�N�X���o���ꍇ�͈ȉ����R�����g�A�E�g����
	  // ���O�擾��͊m�F�_�C�A���O���o���Ȃ������ǂ�
	  // dlg = confirm("�E�B���h�D����Ă���낵���ł����H");
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

// AccessBook HELP Page ���Ăяo���֐� helpWindow
function helpWindow() {
	window.open('./help/index.html');
}


// AccessBook �O��Page ���Ăяo���֐� openWindow
function openWindow(fname) {
	window.open(fname, "_blank");
}


// URL�p�����[�^���̕ϐ����ɑ΂���f�[�^��؂�o���֐� myGetURLParam
// ���� : myGetURLParam("�ϐ���")  �߂�l : String(�q�b�g���Ȃ��Ƃ��� 1 )
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

