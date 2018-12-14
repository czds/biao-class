; (function () {
    'use strict';
    //对外接口
    window.api = post;

    function post(action, data, onSuccess, onError) {
        send('post', action, data, onSuccess, onError);
    }

    function send(method, action, data, onSuccess, onError) {
        //地址
        let baseUrl = 'http://mock.biaoyansu.com/api/1/';
        //时间戳
        let timestamp = (new Date).getTime();
        // SDK
        let appKey = '033d511948453b629b59d583aa6dd6b54c7603f60172fb937bbca9f2987eac0b';

        //开始发消息
        let http = new XMLHttpRequest();
        http.open(method, baseUrl + action);
        //添加请求头信息
        http.setRequestHeader('BIAO-MOCK-APP-KEY', appKey);
        http.setRequestHeader('BIAO-MOCK-TIMESTAMP', timestamp);
        http.setRequestHeader('BIAO-MOCK-SIGNATURE', btoa(appKey + timestamp));
        http.setRequestHeader("Content-Type", "application/json");
        //消息以字符串形式传输
        let json = JSON.stringify(data);
        http.send(json);

        http.addEventListener('load', $ => {
            //成功返回解析后的JSON形式数据
            onSuccess && onSuccess(JSON.parse(http.responseText));
        });

        http.addEventListener('error', $ => {
            //失败返回相应信息
            onError && onError(JSON.parse(http.responseText));
        });
    }
})();