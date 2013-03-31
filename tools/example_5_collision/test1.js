var param = 'aa';
function test() {
    alert(param);
}

var newfunc = function() {
    var param = 'bb';
    return function() {
        alert(param);
    };
}