'use static';

/* 检验以字母开头的10位字符串 */
function isNameRight(scrString) {
	var rel = /^[a-zA-Z][a-zA-Z0-9]{0,9}$/;
	return isRegular(rel, scrString);
}
//-----------正则验证方法------------------------/
function isEmail(eString) {
	var reg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
	return isRegular(reg, eString);
}

function isMima(mString) {
	var reg = /^.{6,16}$/;
	return isRegular(reg, mString);
}

function isPhone(pString) {
	var reg = /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
	return isRegular(reg, pString);
}

function isRegular(reg, rStr) {
	return reg.test(rStr);
}