// 原型链：

function P() {

}

P.prototype.play = function () {
  console.log("我是p");
};

function A() {

}

A.prototype.say = function () {
  console.log("我是a");
};
