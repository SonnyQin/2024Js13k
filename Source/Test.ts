let users = ['tony', 'betty', 'lufei', 'jack', 'linda'];
console.log('原数组：' + users);
// 【第一个参数】从下标为1的地方开始，【第二个参数】删除1个元素，【第三个参数】插入到数组中代替被删除的元素
let removed2 = users.splice(1, 0, 'thomas');
console.log('被删除的元素为：' + removed2);
console.log('新数组：' + users);