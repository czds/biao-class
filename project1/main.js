//记录当前登陆的用户
let currentUser = null;
//选择页面元素
let select = function (name) {
    return document.querySelector(`[name=${name}]`);
};

let username = select('username'),
    password = select('password'),
    age = select('age'), avatar = select('avatar'),
    bio = select('bio');

let username_login = select('username-login'),
    password_login = select('password-login');

let search = select('search');

let userid = select('userid'),
    content = select('content'),
    time = select('time')

time.value = (new Date).Formate();

let form_user = document.querySelector('#user'),
    form_login = document.querySelector("#login"),
    form_toDo = document.querySelector("#toDo");

//添加事件
let signUpBtn = document.querySelector('#sign-up');
signUpBtn.addEventListener('click', e => {
    signUpBtn.hidden = true;
    signInBtn.hidden = true;
    form_user.hidden = false;
    username.focus();
});
let signInBtn = document.querySelector('#sign-in');
signInBtn.addEventListener('click', e => {
    signUpBtn.hidden = true;
    signInBtn.hidden = true;
    form_login.hidden = false;
    username_login.focus();
});

form_user.addEventListener('submit', function (e) {
    e.preventDefault();
    let user = {
        'name': username.value,
        'password': password.value,
        'age': age.value,
        'avatar_url': avatar.value,
        'bio': bio.value,
    };

    api('userinfo/create',
        info => {
            let login = confirm('用户 ' + info.data.name + " 已成功创建,Q号为" + info.data.id + "\n是否登陆此用户？");
            if (login) {
                currentUser = info.data;
                showCurrentUser(currentUser);
            }
            form_user.hidden = true;
        },
        info => { console.log(info) },
        user);
});

search.addEventListener('keyup', function (e) {
    if (e.key == 'Enter' && this.value) {
        api('userinfo/find',
            info => {
                info.data ? alert('用户名 ' + info.data.name + "\n用户简介 " + info.data.bio)
                    : alert('此用户未注册')
            },
            info => { console.log(info) },
            { id: this.value });
    };
    if (e.key == 'Enter' && !this.value) {
        api('userinfo/read',
            info => {
                if (info.data) {
                    let infoContainer = document.querySelector('#info');
                    infoContainer.innerHTML = '';
                    info.data.forEach(it => {
                        let div = document.createElement('div');
                        div.innerHTML = '';
                        for (let key in it) {
                            div.innerHTML += `${key}: ${it[key]}  `
                        }
                        div.innerHTML += `<button>删除</button>`;
                        div.querySelector('button').addEventListener('click', e => {
                            api('userinfo/delete',
                                info => {
                                    if (info.success)
                                        div.remove();
                                },
                                info => { console.log(info) },
                                { id: it.id })
                        })
                        infoContainer.appendChild(div);
                    });

                }
            },
            info => { console.log(info) }
        );
    };
});

form_toDo.addEventListener('submit', function (e) {
    e.preventDefault();
    let thing = {
        'userid': currentUser.id,
        'content': content.value,
        'remind_time': (new Date(time.value)).toISOFormate,
    };
    api('to_do/create', info => { console.log(info) },
        info => { console.log(info) },
        thing);
});

function showCurrentUser(user) {
    document.querySelector('#current-user').innerHTML = `
           <img src="${user.avatar_url}" title="用户id: ${user.id}">
           <div><span>用户</span>${user.name}</div>
           <div><span>年龄</span>${user.age}</div>
           <div><span>简介</span>${user.bio}</div>
           `;
    form_toDo.hidden = false;
}

let a = new $Alert('yo');
let b = new $Alert('余额不足，请充值', {
    desc: '请前往我的余额进行充值',
    type: 'warn',
    onClick(elObj) {
        elObj.el.parentNode.remove();
        elObj.close();
        console.log(elObj.el);
    },
    onShow() {
        console.log('打开');
    },
    onClose() {
        console.log('关闭');
    },
    // containerSelector: "#ddd",
});