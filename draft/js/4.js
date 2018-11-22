; (function () {
    'use strict';

    const slider = document.querySelector('.slider');

    const items = slider.querySelectorAll('[class^="item"]');

    var prev = document.getElementById('prev');

    var next = document.getElementById('next');

    let current = 0;

    items[0].style.opacity = 1;

    prev.addEventListener("click", function () {
        flip(0);
        console.log(current);
    });

    next.addEventListener("click", function () {
        flip(1);
        console.log(current);
    });

    boot();

    function boot() {
        //设置轮播用定时器
        setInterval(() => {
            flip(1);
        }, 5000);
    };

    function flip(dir) {
        //索引为current,方向dir=1往前
        dir == 1 ?
            (current < items.length - 1 ? current++ : current=0) :
            (current > 0 ? current-- : current = items.length - 1);
        //先全部隐藏
        for (let i = 0; i < items.length; i++) {
            items[i].style.opacity = 0;
        };
        //然后显示当前元素
        items[current].style.opacity = 1;
    }


})();