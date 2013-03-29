import "../arrays/map";

/**
 * 只有一个事件发送者?
 * @returns {d3_dispatch}
 */
d3.dispatch = function () {
    var dispatch = new d3_dispatch,
        i = -1,
        n = arguments.length;
    while (++i < n)
        dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    return dispatch;
};

function d3_dispatch() {
}

/**
 *
 * @param type event name
 * @param listener
 * @returns {*}
 */
d3_dispatch.prototype.on = function (type, listener) {
    var i = type.indexOf("."),
        name = "";

    // Extract optional namespace, e.g., "click.foo"
    if (i >= 0) {
        name = type.substring(i + 1);
        type = type.substring(0, i);
    }

    if (type) return arguments.length < 2
        ? this[type].on(name)
        : this[type].on(name, listener);

    if (arguments.length === 2) {
        if (listener == null)
            for (type in this) {
                if (this.hasOwnProperty(type)) this[type].on(name, null);
            }
        return this;
    }
};

function d3_dispatch_event(dispatch) {
    var listeners = [], // 关心当前事件的所有监听者
        listenerByName = new d3_Map;

    function event() {
        var z = listeners, // defensive reference
            i = -1,
            n = z.length,
            l;// listener
        while (++i < n)
            if (l = z[i].on)
                l.apply(this, arguments);
        return dispatch;
    }

    /**
     * 如果不给出 listener, 将返回现在是用的 listener
     * 同时如果指定了listener, 讲返回对应的 dispatcher, 这就方便继续绑定其他 listener
     *
     * @param name
     * @param listener
     * @returns {*}
     */
    event.on = function (name, listener) {
        var l = listenerByName.get(name),
            i;

        // return the current listener, if any
        if (arguments.length < 2)
            return l && l.on;

        // remove the old listener, if any (with copy-on-write)
        if (l) {
            l.on = null;
            listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
            listenerByName.remove(name);
        }

        // add the new listener, if any
        if (listener) listeners.push(listenerByName.set(name, {on: listener}));

        return dispatch;
    };

    return event;
}
