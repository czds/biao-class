; (function () {
    'use strict';

    /** 复制元素并且插入到页面中指定位置  
     *  默认位置 beforebegin ,  可选    
     *  beforebegin — 在该元素本身的前面   
     *  afterbegin —在该元素当中的第一个前面  
     *  beforeend —在该元素当中的最后一个后面   
     *  afterend — 在该元素本身的后面  
     * @param {HTMLElement} elSelector
     * @param {HTMLElement} targetElSelector
     * @param {["beforebegin","afterbegin","beforeend","afterend"]} position
     */
    function copyEl(elSelector, targetElSelector, position = "beforebegin") {
        let el = document.querySelector(elSelector),
            targetEl = document.querySelector(targetElSelector);

        let newEl = el.cloneNode(true);
        targetEl.insertAdjacentElement(position, newEl);
    };

    /** 剪切元素并且插入到页面中指定位置  
     *  默认位置 beforebegin , 可选   
     *  beforebegin — 在该元素本身的前面  
     *  afterbegin — 在该元素当中的第一个前面  
     *  beforeend — 在该元素当中的最后一个后面  
     *  afterend — 在该元素本身的后面  
     * @param {HTMLElement} elSelector
     * @param {HTMLElement} targetElSelector
     * @param {["beforebegin","afterbegin","beforeend","afterend"]} position
     */
    function cutEl(elSelector, targetElSelector, position = "beforebegin") {
        let el = document.querySelector(elSelector),
            targetEl = document.querySelector(targetElSelector);

        targetEl.insertAdjacentElement(position, el);
    };

    window.shortkey = {
        copyEl,
        cutEl,
    };
    
})();