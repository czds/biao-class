; (function () {
  'use strict';

  //选中class为.board的元素
  const board = document.querySelector('.board');
  //选中.board元素里面的.text元素
  const text = board.querySelector('.text');
  //定义一个存放显示内容的数组
  const services = ['修脚', '保健用品', '贴膜', '回收旧手机', '网络代购'];
  //设置元素显示内容
  let current = 0;
  text.innerHTML = services[current];
  //设置定时器
  setInterval(function () {
    let visible = (getComputedStyle(text).color == 'rgb(255, 0, 0)');
    if (visible) {
      text.style.color = 'rgb(255, 255, 255)';
    } else {
      text.style.color = 'rgb(255, 0, 0)';
      current++;
      if (current >= services.length)
        //当前内容索引超出数组范围时回到初始值
        current = 0;
      text.innerHTML = services[current];
    }
  }, 2000)

})();
