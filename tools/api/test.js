function A() {
    this.name = 'jack';
}
function B() {
    A.call(this);
    this.job = 'programmer';
}
var b = new B();
_extends(B, A);
console.log(b.name);
console.log(b.job);
console.log(b.hello);
A.prototype.hello = function () {
    console.log('hello ' + this.name);
}
console.log(b.name);
console.log(b.job);
console.log(b.hello);
