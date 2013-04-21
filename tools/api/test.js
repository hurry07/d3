function neednumber(name) {
    var neednumber = 0;
    var m = new Array();
    var h = new Array();
    for (var i = 0; i < name.length; i++) {
        var name = name.toUpperCase()
        m[i] = Math.pow(name.charCodeAt(i), i + 1);
        h[i] = magic(m[i]);
        while (h[i] > 9) {
            h[i] = magic(h[i]);
        }
    }
    for (i = 0; i < name.length; i++) {
        neednumber += h[i];
    }
    while (neednumber > 9) {
        var neednumber = magic(neednumber);
    }
    return neednumber;
}
function magic(a) {
    var b = 0;
    var c = 0;
    while (a) {
        b = a % 10;
        c += a % 10;
        a = (a - b) / 10;
    }
    return c;
}

function test(name) {
    for (var i = 0; i < name.length; i++) {

    }
}