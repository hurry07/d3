import "../math/number";

/**
 * Given an array, this function calculates the mean of the array.
 * If you want, you can pass in a binary function that will be called on each element before the average is taken.
 *
 * @param array
 * @param f
 * @returns {number}
 */
d3.mean = function (array, f) {
    var n = array.length,
        a,
        m = 0,
        i = -1,
        j = 0;
    if (arguments.length === 1) {
        while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
    } else {
        while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
    }
    return j ? m : undefined;
};
