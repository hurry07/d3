import
"selection";

/**
 * 直接设置展示对象的数据, 这在已有展示对象, 初始化对象时候有用
 *
 * @param value
 * @returns {*}
 */
d3_selectionPrototype.datum = function (value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.property("__data__");
};
