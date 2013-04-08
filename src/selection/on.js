import "../core/array";
import "../core/document";
import "../core/noop";
import "selection";

/**
 * 在 selection 的每个元素上依次调用一个闭包的 listener 注册函数
 *
 * @param type
 * @param listener
 * @param capture
 * @returns {*}
 */
d3_selectionPrototype.on = function (type, listener, capture) {
    var n = arguments.length;
    if (n < 3) {

        // For on(object) or on(object, boolean), the object specifies the event
        // types and listeners to add or remove. The optional boolean specifies
        // whether the listener captures events.
        if (typeof type !== "string") {
            if (n < 2) {
                listener = false;
            }
            for (capture in type) {
                this.each(d3_selection_on(capture, type[capture], listener));
            }
            return this;
        }

        // For on(string), return the listener for the first node.
        if (n < 2) {
            return (n = this.node()["__on" + type]) && n._;
        }

        // For on(string, function), use the default capture.
        capture = false;
    }

    // Otherwise, a type, listener and capture are specified, and handled as below.
    return this.each(d3_selection_on(type, listener, capture));
};

/**
 * @param type 'click'
 * @param listener
 * @param capture 是否是 capture 模式
 * @returns {Function}
 */
function d3_selection_on(type, listener, capture) {
    var name = "__on" + type,
        i = type.indexOf("."),
        wrap = d3_selection_onListener;// 处理事件的函数

    if (i > 0) {
        type = type.substring(0, i);
    }

    // 关联事件需要特别处理
    var filter = d3_selection_onFilters.get(type);
    if (filter) {
        type = filter,
        wrap = d3_selection_onFilter;
    }

    function onRemove() {
        var l = this[name];
        if (l) {
            this.removeEventListener(type, l, l.$);
            delete this[name];
        }
    }

    /**
     * 添加监听者
     *
     * l 本身是闭包函数, 为了能找到原始的 function, 所以 l 上附加了属性
     * l : {
     *     _ : wrap,
     *     $ : capture
     * }
     * this 是 DOM, 为了能识别出注册的事件, 所以事件用特殊的 __ 开头
     */
    function onAdd() {
        var l = wrap(listener, d3_array(arguments));
        onRemove.call(this);
        // 当前元素是 DOM 元素
        this.addEventListener(type, this[name] = l, l.$ = capture);
        l._ = listener;
    }

    function removeAll() {
        var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"),
            match;
        for (var name in this) {
            if (match = name.match(re)) {
                var l = this[name];
                this.removeEventListener(match[1], l, l.$);
                delete this[name];
            }
        }
    }

    // 只要 i 不是 0
    return i
        ? listener ? onAdd : onRemove
        : listener ? d3_noop : removeAll;
}

/**
 * 名字转义, 用来处理 mouse 相关事件
 *
 * @type {*}
 */
var d3_selection_onFilters = d3.map({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
});

/**
 * 如果已经定义了全局函数, 那么就删除对应的转义
 */
d3_selection_onFilters.forEach(function (k) {
    if ("on" + k in d3_document) {
        d3_selection_onFilters.remove(k);
    }
});

/**
 * 为了创建闭包吗?
 *
 * @param listener
 * @param argumentz
 * @returns {Function}
 */
function d3_selection_onListener(listener, argumentz) {
    /**
     * 接受外界事件, 以当前对象为 this 调用 listener
     */
    return function (e) {
        var o = d3.event; // Events can be reentrant (e.g., focus).
        d3.event = e;
        argumentz[0] = this.__data__;
        try {
            listener.apply(this, argumentz);
        } finally {
            d3.event = o;
        }
    };
}

function d3_selection_onFilter(listener, argumentz) {
    var l = d3_selection_onListener(listener, argumentz);
    return function (e) {
        var target = this,
            related = e.relatedTarget;
        if (!related || (related !== target && !(related.compareDocumentPosition(target) & 8))) {
            l.call(target, e);
        }
    };
}
