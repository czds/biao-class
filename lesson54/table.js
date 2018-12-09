; (function () {
    'use strict';

    window.data_table = {
        set
    };
    function set(tableSelector, data, format, operation) {
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
            theadContent += `<th>${format[key]}</th>`;
        };
        if (operation)
            theadContent += `<th>操作</th>`;
        //需要用中间量存放，不然innerHTML自增默认加tr
        thead.innerHTML = theadContent;

        data.forEach((it, index) => {
            //给数据一个id作为标记
            it.id = index;
            //每条数据对应表格一行内容
            let tr = document.createElement('tr'), trContent = '';

            for (let key in format) {
                let content = it[key] || '-';
                trContent += `<td>${content}</td>`;
            };

            //操作部分，添加按钮，按钮加类，用类名选中相应
            //按钮后绑定点击事件，触发时执行相应操作方法并传参
            if (operation) {
                //生成按钮并放入一个单元格
                let btn = '';
                operation.forEach(e => {
                    if (e.name) {
                        btn += `<button class='${e.class}'>${e.name}</button>`
                    }
                });
                trContent += '<td>' + btn + '</td>';
            };

            tr.innerHTML = trContent;

            tbody.appendChild(tr);

            if (operation) {
                operation.forEach(e => {
                    if (e.class) {
                        tr.querySelector(`.${e.class}`)
                            .addEventListener('click', function () {
                                //执行对应方法，传参为 当前行的数据id和元素
                                e.action(it.id, tr);
                            });
                    };
                });
            };

        });


        //将内容添加到页面中
        table.appendChild(thead);
        table.appendChild(tbody);
    };

})();