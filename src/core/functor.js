/**
 * create a function that returns a constant.
 *
 * @param v
 * @returns {*}
 */
function d3_functor(v) {
    return typeof v === "function" ? v : function () {
        return v;
    };
}

d3.functor = d3_functor;
