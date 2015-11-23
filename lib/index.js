/**
 * Created by YCXJ-wanglihui on 2015/2/7.
 *
 * 将下划线连接的命名方式转成单词首字符大写的命名方式
 */

'use strict';

var EXCEPT_TYPE = [Buffer, Date];

/**
 * 将下划线命名防止转为大小写方式
 * @param obj
 * @param delete_underline 是否删除下划线命名
 * @returns {*}
 */
function format(obj, delete_underline) {
  if (typeof obj === 'object') {

    var isExcept = false;

    for(var i= 0, ii=EXCEPT_TYPE.length; i<ii; i++) {
      var type = EXCEPT_TYPE[i];
      if (obj instanceof type) {
        isExcept = true;
        break;
      }
    }

    if (isExcept) {
      return obj;
    }

    //遍历对象所有key进行转换
    var keys = Object.keys(obj);
    for(var i= 0, ii= keys.length; i<ii; i++) {
      var key = keys[i];
      var val = obj[key];
      if (delete_underline) {
        delete obj[key];
      }
      key = format(key);
      if (val && typeof val === 'object') {
        val = format(val, delete_underline);
      }
      obj[key] = val;
    }
  } else if (typeof obj === 'string') {
    return _simpleUnderline2Upper(obj)
  } else {
    throw new Error('only support object or string to format! you supply is :' + obj);
  }
  return obj;
}

function _simpleUnderline2Upper(obj) {
  //转换字符串
  var words = obj.split(/_/);
  var tmp_words = [];
  for(var i= 0, ii=words.length; i<ii; i++) {
    //首字符为_不转换
    var word = words[i];
    if (i == 0 && !words[0]) {
      word = '_';
    } else if (i == 1 && !words[0]) {
      word = word.substring(0, 1) + word.substring(1);
    } else if (i >0) {
      word = word.substring(0, 1).toUpperCase() + word.substring(1);
    }
    tmp_words.push(word);
  }
  return tmp_words.join("");
}

/**
 * 将大小写命名方式转为下划线风格命名
 * @param obj
 * @param delete_upper 是否删除大小写命名字段
 * @returns {*}
 */
function upper2underline(obj, delete_upper) {
  if (typeof obj === 'object') {

    var isExcept = false;
    for(var i= 0, ii=EXCEPT_TYPE.length; i<ii; i++) {
      var type = EXCEPT_TYPE[i];
      if (obj instanceof type) {
        isExcept = true;
        break;
      }
    }

    if (isExcept) {
      return obj;
    }

    var keys = Object.keys(obj);
    var tmp_obj = {};
    for(var i= 0, ii=keys.length; i<ii; i++) {
      var key = keys[i];
      var val = obj[key];
      if (delete_upper) {
        delete obj[key];
      }
      key = upper2underline(key);
      if (val && typeof val === 'object') {
        val = upper2underline(val, delete_upper);
      }
      tmp_obj[key] = val;
    }
    return tmp_obj;
  } else if (typeof obj === 'string') {
    var tmp_word = [];
    for(var i= 0, ii=obj.length; i<ii; i++) {
      var reg = /[A-Z]/g;
      var word = obj[i];
      if (reg.test(word)) {
        word = '_' + word.toLowerCase();
      }
      tmp_word.push(word);
    }
    return tmp_word.join("");
  } else {
    throw new Error('only support object or string to format! you supply is :' + obj);
  }
}

exports.format = format;
exports.upper2underline = upper2underline;
exports.underline2uppper = format;