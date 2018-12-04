; (function () {
    'use strict';

    window.data_table = {
        set
    };
    function set(tableSelector, data, format) {
        //选择元素
        let table = document.querySelector(tableSelector);
        //创建表头
        let thead = document.createElement('thead'),
            //必须先赋空值，不然累加第一项undefined
            theadContent = '';
        //表内容
        let tbody = document.createElement('tbody');

        //生成内容
        for (let key in format) {
            //表头内容
            //判断值类型，是数组取第一个内容为操作
            //第二个内容是回调函数
            Array.isArray(format[key]) ?
                theadContent += `<th>操作</th>` :
                theadContent += `<th>${format[key]}</th>`;
        };
        //需要用中间量存放，不然innerHTML自增默认加tr
        thead.innerHTML = theadContent;

        data.forEach(it => {
            let tr = document.createElement('tr'), trContent = '';
            for (let key in format) {
                if (key == 'fn') {
                    //如果没有对应内容则为-
                    let content = format.fn;
                    trContent += `<td><button>${content}</button></td>`;
                    tr.innerHTML = trContent;
                    tr.querySelector('button').$id = it.name;
                } else {
                    let content = it[key] || '-';
                    trContent += `<td>${content}</td>`;
                    tr.innerHTML = trContent;
                };
            };
            tbody.innerHTML += tr.innerHTML;
                    console.dir(tr.querySelector('button'))
        });

        table.addEventListener('click', (e) => {
            if (e.target.nodeName == 'BUTTON') {
                //从页面中移除内容
                // e.target.parentNode.parentNode.remove();
                
                //数组中移除数据,查看当前按钮的_index属性，
                //从数据中删除同name的数据
                let mark = e.target.$id;
                console.dir(e.target);
                if (mark) {
                    data.forEach((it, index) => {
                        for (let key in it) {
                            if (key == mark)
                                data.splice(index, 1);
                        }
                    })
                }
            }
        })

        //将内容添加到页面中
        table.appendChild(thead);
        table.appendChild(tbody);
    };

})();