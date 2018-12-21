; (function () {
    'use strict';
    //一个提示类插件，new $Alert()调用，传参为title(string 标题内容),config({} 配置)  
    //containerClass: 提示在哪显示（指定类名），默认div，类名alert-container，没有就创建一个追加到body 
    //desc：描述信息，有就显示相关内容 
    // type:提示的类型,页面提示内容div会加上这个type类名，用于加样式区分
    //timeout:默认为0，设置时会延时触发关闭消息这一动作
    //onShow，onClose，onClick，当信息显示，关闭，被点击时触发的回调函数，传参为此对象自身，
    //this.el为页面中的DOM元素..
    class $Alert {
        constructor(title, { type = 'info', desc, onShow, timeout = 0, onClose, onClick, containerClass = 'alert-container' } = {}) {
            this.title = title;
            this.type = type;
            this.desc = desc;
            this.onShow = onShow;
            this.timeout = timeout;
            this.onClose = onClose;
            this.onClick = onClick;
            this.containerClass = containerClass;

            this.prepareEnv();
            this.createEl();
            this.show();
            this.bindClick();
        };

        prepareEnv() {
            if (document.querySelector('.' + this.containerClass)) {
                this.container = document.querySelector('.' + this.containerClass);
                return;
            }

            let container = document.createElement('div');
            container.classList.add(this.containerClass);
            document.body.appendChild(container);

            this.container = container;
        }

        createEl() {
            let el = document.createElement('div');
            el.classList.add('alert');
            el.classList.add(this.type);
            el.innerHTML = `<div class="title">${this.title}</div>
             ${this.desc ? `<div class="desc">${this.desc}</div>` : ''}`;

            this.el = el;
        }

        show() {
            this.onShow && this.onShow(this);

            this.container.appendChild(this.el);

            if (!this.timeout)
                return;

            setTimeout($ => {
                this.close();
            }, this.timeout);
        }

        close() {
            this.onClose && this.onClose(this);

            this.el.remove();
        }

        bindClick() {
            if (this.onClick)
                this.el.addEventListener('click', e => {
                    this.onClick(this, e);
                });
        };
    }

    window.$Alert = $Alert;

})();