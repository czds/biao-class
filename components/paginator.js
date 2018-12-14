; (function () {
    'use strict';
    //分页插件
    //传入参数：总页数，当前页数，每页显示几个，当前页数
    window.$paginator = function paginator(elSelector, total, limit, current, fn) {

        //计算导航总数
        let amount = Math.ceil(total / limit);
        //当前页面在导航的索引
        let currentIndex = Math.ceil(current / limit);

        //生成上一页与下一页按钮
        //按钮添加自定义属性$index记录页数
        let prevBtn = document.createElement('button');
        prevBtn.innerHTML = "上一页";
        current > 1 ?
            prevBtn.$index = current - 1 :
            prevBtn.$index = 1;

        let nextBtn = document.createElement('button');
        nextBtn.innerHTML = "下一页";
        current < total ?
            nextBtn.$index = current + 1 :
            nextBtn.$index = total;


        //生成中间按钮内容
        let btns = document.createElement('span');
        //初始化
        btns.innerHTML = "";
        //挨个添加按钮
        //分情况判断，目的让当前页尽可能位于中间
        //根据当前页与每页显示数量判断是否显示在最中间，先处理边际情况
        if (current < limit / 2 || total - current < Math.floor(limit / 2)) {
            //当前页快到总页数末尾
            if (total - current < limit) {
                //添加首页
                let firstBtn = document.createElement('button');
                //按钮内容为页数
                firstBtn.innerHTML = 1;
                firstBtn.$index = 1;
                btns.appendChild(firstBtn);
                for (let i = total - limit + 1; i <= total; i++) {
                    let btn = document.createElement('button');
                    //按钮内容为页数
                    btn.innerHTML = i;
                    //按钮添加附加属性，用于确认导航到那一页
                    btn.$index = i;
                    //如果按钮的索引跟当前页数相同，添加一个类
                    if (btn.$index == current)
                        btn.classList.add('active');
                    //加入到btns集合里
                    btns.appendChild(btn);
                };
            } else {
                //当前页接近最开始
                for (let i = 1; i <= limit; i++) {
                    let btn = document.createElement('button');
                    //按钮内容为页数
                    btn.innerHTML = i;
                    //按钮添加附加属性，用于确认导航到那一页
                    btn.$index = i;
                    //如果按钮的索引跟当前页数相同，添加一个类
                    if (btn.$index == current)
                        btn.classList.add('active');
                    //加入到btns集合里
                    btns.appendChild(btn);
                };
                //添加尾页
                let lasttBtn = document.createElement('button');
                //按钮内容为页数
                lasttBtn.innerHTML = total;
                lasttBtn.$index = total;
                btns.appendChild(lasttBtn);
            };
        } else {
            //当前页可以显示在中间
            //添加首页
            let firstBtn = document.createElement('button');
            //按钮内容为页数
            firstBtn.innerHTML = 1;
            firstBtn.$index = 1;
            btns.appendChild(firstBtn);

            for (let i = current - parseInt(limit / 2) + 1; i <= current + Math.ceil(limit / 2); i++) {
                let btn = document.createElement('button');
                //按钮内容为页数
                btn.innerHTML = i;
                //按钮添加附加属性，用于确认导航到那一页
                btn.$index = i;
                //如果按钮的索引跟当前页数相同，添加一个类
                if (btn.$index == current)
                    btn.classList.add('active');
                //加入到btns集合里
                btns.appendChild(btn);
            };

            //添加尾页
            let lasttBtn = document.createElement('button');
            //按钮内容为页数
            lasttBtn.innerHTML = total;
            lasttBtn.$index = total;
            btns.appendChild(lasttBtn);
        };

        //拼接成页面内容,并插入页面
        let paginator = document.createElement('div');
        paginator.classList.add('paginator');

        paginator.appendChild(prevBtn);
        paginator.appendChild(btns);
        paginator.appendChild(nextBtn);

        let el = document.querySelector(elSelector);
        el.innerHTML = " ";
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
