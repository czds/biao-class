; (function () {
    'use strict';

    const board = document.querySelector('.board');
    const text = board.querySelector('.text');
    boot();

    function boot() {
        startFlash();
    };

    function startFlash() {
        setInterval(function () {
            toogleText();
            // toogleColor();
            toogleBorder();
        }, 1000)
    };

    function isVisible() {
        return getComputedStyle(text).opacity == '1';
    };

    function toogleColor() {
        if (isVisible()) {
            if (getComputedStyle(text).color == 'rgb(255, 0, 0)')
                text.style.color = 'rgb(0, 255, 255)';
            else
                text.style.color = 'rgb(255,0,0)';
        }
    };

    function toogleText() {
        isVisible() ? text.style.opacity = 0 : text.style.opacity = 1;
    };

    function toogleBorder(){
        if (isVisible())
            text.style.borderColor = 'red';
        else
            text.style.borderColor = 'transparent';
    };

})();
