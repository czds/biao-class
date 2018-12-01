window.formData = {
  get,  // 等同于 get: get
  set   // 等同于 set: set
};

/**
 * 解析表单数据（取值）
 * @param {HTMLFormElement} form 选好的form元素
 * @return {Object}
 */
function get(form) {

  //data为返回的数据
  let data = {};
  //选取表单内具有name属性的元素
  let inputs = form.querySelectorAll('[name]');
  //循环取值
  inputs.forEach(it => {
    switch (it.type) {
      case 'number':
        data[it.name] = parseFloat(it.value);
        break;

      case 'radio':
        //没选的直接跳过
        if (!it.checked)
          return;
        //选中的存入data
        data[it.name] = it.value;
        break;

      case 'checkbox':
        //复选的值存入相应数组
        //第一次存判断是否为数组，不是就创建一个数组
        if (!Array.isArray(data[it.name]))
          data[it.name] = [];
        //选中就存入数组
        if (it.checked)
          data[it.name].push(it.value);
        break;

      case 'date':
      case 'time':
      case 'week':
      case 'month':
      case 'datetime':
      case 'datetime-local':
        // 转为Date对象
        data[it.name] = it.valueAsDate;
        break;
      // 默认取对应字符串的值
      default:
        data[it.name] = it.value;
    };

    //返回数据
    return data;
  });
};

/**
 * 通过数据填表（存值）
 * @param {Object} data
 * @param {HTMLFormElement} form
 */
function set(data, form) {

  //循环数据，再从表单中查找name属性与
  //数据键值对中键同名的元素，判断类型后再填值
  for (let key in data) {
    //声明value用于存对应键的值
    let value = data[key];
    //选取表单中name属性与键同名的所有元素
    let input = form.querySelector(`[name=${key}]`);

    switch (input.type) {
      case 'checkbox':
        //当类型为复选时，先选中所有元素
        input = form.querySelectorAll(`[name=${key}]`);
        //循环所有元素，如果数据里包含相应值，就选中
        input.forEach(el => {
          if (value.includes(el.value))
            el.checked = true;
        });
        break;

      case 'radio':
        //另一种多元素的处理方式
        //直接查询是否有对应值的元素
        let radio = form.querySelector(`[type=radio][name=${key}][value=${value}]`);
        //有就选中
        radio && (radio.checked = true);
        break;

      default:
        input.value = data[key];
    };
  };
};
