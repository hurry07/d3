import "dispatch";

/**
 * 全局只有一个, 包装系统的事件
 * @type {null}
 */
d3.event = null;

function d3_eventCancel() {
    d3.event.stopPropagation();
    d3.event.preventDefault();
}

/**
 * 找到事件源
 *
 * @returns {*}
 */
function d3_eventSource() {
    var e = d3.event, s;
    while (s = e.sourceEvent)
        e = s;
    return e;
}

// Like d3.dispatch, but for custom events abstracting native UI events. These
// events have a target component (such as a brush), a target element (such as
// the svg:g element containing the brush) and the standard arguments `d` (the
// target element's data) and `i` (the selection index of the target element).
function d3_eventDispatch(target) {
    var dispatch = new d3_dispatch,
        i = 0,
        n = arguments.length;

    // 对每种事件都注册一个事件对象, 整个dispatch 对象就是一个 事件名字->事件监听者 的 map
    while (++i < n) {
        dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    }

    // Creates a dispatch context for the specified `thiz` (typically, the target
    // DOM element that received the source event) and `argumentz` (typically, the
    // data `d` and index `i` of the target element). The returned function can be
    // used to dispatch an event to any registered listeners; the function takes a
    // single argument as input, being the event to dispatch. The event must have
    // a "type" attribute which corresponds to a type registered in the
    // constructor. This context will automatically populate the "sourceEvent" and
    // "target" attributes of the event, as well as setting the `d3.event` global
    // for the duration of the notification.
    // 调用这个 of 方法将会返回一个包含固定上下文的对象, 事件发送的时候将使用这个上下文作为执行的上下文
    dispatch.of = function (thiz, argumentz) {
        return function (e1) {
            try {
                var e0 = e1.sourceEvent = d3.event;
                e1.target = target;
                d3.event = e1;
                // 调用对应的事件注册
                dispatch[e1.type].apply(thiz, argumentz);
            } finally {
                d3.event = e0;
            }
        };
    };

    return dispatch;
}
