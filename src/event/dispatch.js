import "../arrays/map";

/**
 * 建立一个可以分发 arguments 中给定事件的 dispatcher 对象
 *
 * @returns {d3_dispatch}
 */
d3.dispatch = function () {
    var dispatch = new d3_dispatch,
        i = -1,
        n = arguments.length;
    while (++i < n) {
        dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    }
    return dispatch;
};

function d3_dispatch() {
}

/**
 * 注册或者删除 listener
 *
 * @param type event name
 * @param listener
 * @returns {*}
 */
d3_dispatch.prototype.on = function (type, listener) {
    var i = type.indexOf("."),
        name = "";// 监听者的名字

    // Extract optional namespace, e.g., "click.foo"
    if (i >= 0) {
        name = type.substring(i + 1);
        type = type.substring(0, i);// 监听的事件
    }

    if (type) {
        // 注册新的 listener 或者是返回对应的 listener
        return arguments.length < 2
            ? this[type].on(name)
            : this[type].on(name, listener);
    }

    // 删除没有名字的事件监听者? 这里能被执行到吗?
    if (arguments.length === 2) {
        if (listener == null) {
            for (type in this) {
                if (this.hasOwnProperty(type)) {
                    this[type].on(name, null);
                }
            }
        }
        return this;
    }
};

/**
 * 事件对象, 这个对象维护对一个事件感兴趣的所有监听者, 如果调用这个对象.event 方法将出发已经注册的所有监听者
 *
 * @param dispatch
 * @returns {Function}
 */
function d3_dispatch_event(dispatch) {
    var listeners = [], // 关心当前事件的所有监听者
        listenerByName = new d3_Map;

    /**
     * 执行这个方法会触发所有注册的监听者
     *
     * @returns {*}
     */
    function event() {
        var z = listeners, // defensive reference
            i = -1,
            n = z.length,
            l;// listener
        while (++i < n) {
            if (l = z[i].on) {
                l.apply(this, arguments);// 这里 this 指什么? 这个要看代码了
            }
        }
        return dispatch;
    }

    /**
     * 如果不给出 listener, 将返回现在是用的 listener
     * 同时如果指定了listener, 讲返回对应的 dispatcher, 这就方便继续绑定其他 listener
     *
     * @param name 监听者的别名
     * @param listener
     * @returns {*}
     */
    event.on = function (name, listener) {
        var l = listenerByName.get(name),
            i;

        // 如果对应的 key 存在, 那么返回 key.on, key:{on:listener}
        // return the current listener, if any
        if (arguments.length < 2)
            return l && l.on;

        // 注册的 listener 封装为 {on:listener} 对象
        // remove the old listener, if any (with copy-on-write)
        if (l) {
            l.on = null;
            listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
            listenerByName.remove(name);
        }

        // add the new listener, if any
        if (listener) {
            listeners.push(listenerByName.set(name, {on: listener}));
        }

        return dispatch;
    };

    return event;
}
