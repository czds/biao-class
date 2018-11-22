; (function () {
    'use strict';

    const board = document.querySelector('.board');
    const text = board.querySelector('.text');

    let size = 2;

    boot();

    function boot() {
        startFlash();
    };

    function startFlash() {
        setInterval(() => {
            toogleSize();
        }, 1000);
    }

    function isVisible() {
        return getComputedStyle(text).opacity == 1;
    }

    function toogleSize() {
        size < 4 ? size++ : size = 2;
        board.style.fontSize = size + 'rem';
    }
})();