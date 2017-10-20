/**
 * Created by lishuo on 2016/6/23.
 */

$.validator.addMethod("CheckMenuCodeFormat", function (value, element) {
    var pattern = /^[a-zA-Z_0-9]{1,256}$/;
    //var pattern = /^[a-zA-Z_0-9]+$/;
    return this.optional(element) || (pattern.test(value));
}, "请使用英文字母、数字、下划线，请勿使用中文");

$.validator.addMethod("CheckMenuCodeUnique", function (value, element) {
    var code = element.value;
    var flag = 1;
    $.ajax({
        type: "POST",
        url: 'test.jsp',
        async: false,
        data: {'code': value},
        success: function (msg) {
            if (msg == 'yes') {
                flag = 0;
            }
        }
    });

    if (flag == 0) {
        return false;
    } else {
        return true;
    }
}, "该代码已经存在");

$.validator.addMethod("isFloat", function (value, element) {
    return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
}, "只能包含数字、小数点");

$.validator.addMethod("floatR", function (value, element, param) {
    if (value == "")
        return true;

    var a = value.split(".")[1];

    if (a == undefined)
        return false;

    if (a.length > parseInt(param))
        return false;
    else
        return true;
}, $.validator.format("小数部分必需小于{0}位"));

$.validator.addMethod("floatL", function (value, element, param) {
    if (value == "")
        return true;

    var a = value.split(".")[0];

    if (a == undefined)
        return false;

    if (a.length > parseInt(param))
        return false;
    else
        return true;
}, $.validator.format("整数部分必需小于{0}位"));

$.validator.addMethod("mobile", function (value, element) {
    var pattern = /^1[0-9]\d{9}$/;
    return this.optional(element) || (pattern.test(value));
}, "请使用正确的手机号");

$.validator.addMethod("phoneZh", function (value, element) {
    var pattern = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
    return this.optional(element) || (pattern.test(value));
}, "请使用正确的电话号码");
