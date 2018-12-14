; (function () {
    'use strict';
    //分页插件
    //传入参数：当前页数,总页数,每页按钮数量,点击回调函数
    window.$paginator = function paginator(elSelector, current, total, btnNumbers, fn) {
        if (total < btnNumbers)
            btnNumbers = total;
        //生成上一页与下一页按钮
        //按钮添加自定义属性$index记录页数
        let prevBtn = document.createElement('button');
        prevBtn.innerHTML = "上一页";
        current > 1 ?
            prevBtn.$index = current - 1 :
            prevBtn.$index = "";

        let nextBtn = document.createElement('button');
        nextBtn.innerHTML = "下一页";
        current < total ?
            nextBtn.$index = current + 1 :
            nextBtn.$index = "";
        //生成指定页跳转

        //生成中间按钮内容
        let btns = document.createElement('span');
        //初始化
        btns.innerHTML = "";
        //根据btnNumbers生成按钮
        //1.数量为奇数且当前页在中间 btn   current +- (btnNumber-1)/2  首页/尾页
        //.数量为偶数且当前页在中间  btn  (current-btnNumbers/2+1)  current   + btnNumbers/2  首页/尾页
        //2.当前页位于总数开始,生成1- btnNumbers 个按钮 +尾页
        //当前页位于总数末尾,生成 total -btnNumbers 个按钮 +首页
        if (current <= btnNumbers || (current + btnNumbers) > total) {
            //当前页位于开始
            if (current <= btnNumbers) {
                for (let i = 1; i <= btnNumbers; i++) {
                    let btn = document.createElement('button');
                    btn.innerHTML = i;
                    btn.$index = i;
                    btns.appendChild(btn);
                };
                //判断是否添加尾页
                if (!(btnNumbers == total)) {
                    let lastBtn = document.createElement('button');
                    lastBtn.innerHTML = "尾页";
                    lastBtn.$index = total;
                    btns.appendChild(lastBtn);
                };
            } else {
                //当前页位于末尾
                let firstBtn = document.createElement('button');
                firstBtn.innerHTML = "首页";
                firstBtn.$index = 1;
                btns.appendChild(firstBtn);
                for (let i = (total - btnNumbers + 1); i <= total; i++) {
                    let btn = document.createElement('button');
                    btn.innerHTML = i;
                    btn.$index = i;
                    btns.appendChild(btn);
                };
            };
        } else {
            let firstBtn = document.createElement('button');
            firstBtn.innerHTML = '首页';
            firstBtn.$index = 1;
            let lastBtn = document.createElement('button');
            lastBtn.innerHTML = '尾页';
            lastBtn.$index = total;

            btns.appendChild(firstBtn);

            //btnNumbers为奇数的情况
            if (btnNumbers % 2 == 1) {
                for (let i = current - (btnNumbers - 1) / 2; i <= current + (btnNumbers - 1) / 2; i++) {
                    let btn = document.createElement('button');
                    btn.innerHTML = i;
                    btn.$index = i;
                    btns.appendChild(btn);
                };
            };
            //btnNumbers为偶数的情况
            if (btnNumbers % 2 == 0) {
                for (let i = (current - btnNumbers / 2 + 1); i <= (current + btnNumbers / 2); i++) {
                    let btn = document.createElement('button');
                    btn.innerHTML = i;
                    btn.$index = i;
                    btns.appendChild(btn);
                };
            };

            btns.appendChild(lastBtn);
        };
        //添加当前页样式
        btns.childNodes.forEach(it=>{
            if(it.$index==current)
            it.classList.add('active');
        });

        //拼接成页面内容,并插入页面
        let paginator = document.createElement('div');
        paginator.classList.add('paginator');

        paginator.appendChild(prevBtn);
        paginator.appendChild(btns);
        paginator.appendChild(nextBtn);
        //添加不可用按钮样式
        paginator.childNodes.forEach(it=>{
            if(it.$index=="")
            it.classList.add('unactive');
        });

        let el = document.querySelector(elSelector);
        el.innerHTML = "";
        el.appendChild(paginator);

        //添加点击事件，当事件源为按钮且
        //$index属性不为空，导航生效
        paginator.addEventListener('click', e => {
            if (e.target.nodeName == "BUTTON") {
                //执行回调函数，传参为点击按钮的页数
                fn(e.target.$index);
            };
        });
    };
})();
