/**
 * Created by YCXJ-wanglihui on 2015/2/7.
 *
 * 将下划线连接的命名方式转成单词首字符大写的命名方式
 */

'use strict';

function format(obj) {
  if (typeof obj === 'object') {
    //遍历对象所有key进行转换
    var keys = Object.keys(obj);
    for(var i= 0, ii= keys.length; i<ii; i++) {
      var key = keys[i];
      var val = obj[key];
      key = format(key);
      if (val && typeof val === 'object') {
        val = format(val);
      }
      obj[key] = val;
    }
  } else if (typeof obj === 'string') {
    //转换字符串
    var words = obj.split(/_/);
    var tmp_words = [];
    for(var i= 0, ii=words.length; i<ii; i++) {
      var word = words[i];
      if (i !=0) {
        word = word.substring(0, 1).toUpperCase() + word.substring(1);
      }
      tmp_words.push(word);
    }
    return tmp_words.join("");
  } else {
    throw new Error('only support object or string to format! you supply is :' + obj);
  }
  return obj;
}

function upper2underline(obj) {
  if (typeof obj === 'object') {
    var keys = Object.keys(obj);
    var tmp_obj = {};
    for(var i= 0, ii=keys.length; i<ii; i++) {
      var key = keys[i];
      var val = obj[key];
      key = upper2underline(key);
      if (val && typeof val === 'object') {
        val = upper2underline(val);
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