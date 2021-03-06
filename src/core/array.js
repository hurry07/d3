import "document";

var d3_array = d3_arraySlice; // conversion for NodeLists

function d3_arrayCopy(pseudoarray) {
    var i = -1,
        n = pseudoarray.length,
        array = [];
    while (++i < n)
        array.push(pseudoarray[i]);
    return array;
}

function d3_arraySlice(pseudoarray) {
    return Array.prototype.slice.call(pseudoarray);
}

try {
    d3_array(d3_document.documentElement.childNodes)[0].nodeType;
} catch (e) {
    d3_array = d3_arrayCopy;
}

/**
 * 改变 array 对象的 prototype 为给定的对象
 *
 * @type {Function}
 */
var d3_arraySubclass = [].__proto__ ?
    // TODO 我只能说这样子做不好了
    // Until ECMAScript supports array subclassing, prototype injection works well.
    function (array, prototype) {
        array.__proto__ = prototype;
    } :

    // And if your browser doesn't support __proto__, we'll use direct extension.
    function (array, prototype) {
        for (var property in prototype)
            array[property] = prototype[property];
    };
