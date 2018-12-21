; (function () {
    'use strict';
    
    window.getLocalTime = getLocalTime;
    //将服务器标准0时区时间转为本地时间Date类型
    function getLocalTime(ISOFormate) {
        let d = new Date(ISOFormate),
            time = d.getTime(),
            localOffset = d.getTimezoneOffset() * 60 * 1000,
            localTime = time - localOffset;
        let date = new Date(localTime);
        return date;
    }
    //用原型加方法，返回时间格式"2018-12-21 04:50:13"
    if (!Date.prototype.toISOFormate) {
        (function () {

            function pad(number) {
                if (number < 10) {
                    return '0' + number;
                }
                return number;
            }

            Date.prototype.toISOFormate = function () {
                return this.getUTCFullYear() +
                    '-' + pad(this.getUTCMonth() + 1) +
                    '-' + pad(this.getUTCDate()) +
                    ' ' + pad(this.getUTCHours()) +
                    ':' + pad(this.getUTCMinutes()) +
                    ':' + pad(this.getUTCSeconds());
            };

        }());
    }
    //用原型加方法，返回时间格式"2018-12-11T12:11"
    //type="datetime-local" 时间输入框的值也为此格式
    if (!Date.prototype.Formate) {
        (function () {

            function pad(number) {
                if (number < 10) {
                    return '0' + number;
                }
                return number;
            }

            Date.prototype.Formate = function () {
                return this.getFullYear() +
                    '-' + pad(this.getMonth() + 1) +
                    '-' + pad(this.getDate()) +
                    'T' + pad(this.getHours()) +
                    ':' + pad(this.getMinutes())
                // +':' + pad(this.getSeconds());
            };

        }());
    }

})();