import "../core/document";
import "../core/rebind";
import "../event/event";
import "../event/mouse";
import "../event/touches";
import "behavior";

d3.behavior.drag = function () {
    // 返回的 event 对象是一个含有自定义事件的 map,
    // 同时它还具有 of 函数, 可以创建闭包的一个事件分发者, 能用指定的上下问来执行注册的监听者
    // drag 对象作为 target
    var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"),
        origin = null;

    /**
     * 这个函数为什么作为 target?
     * 这个函数将返回
     */
    function drag() {
        this.on("mousedown.drag", mousedown)
            .on("touchstart.drag", mousedown);
    }

    /**
     * 注册内部函数接受鼠标事件, 然后再分析行为, 构造成自定义事件
     */
    function mousedown() {
        // this 对象是发出事件的 DOM
        var target = this,
            event_ = event.of(target, arguments),
            eventTarget = d3.event.target,
            touchId = d3.event.touches ? d3.event.changedTouches[0].identifier : null,
            offset,
            origin_ = point(),
            moved = 0;

        var w = d3.select(d3_window)
            .on(touchId != null ? "touchmove.drag-" + touchId : "mousemove.drag", dragmove)
            .on(touchId != null ? "touchend.drag-" + touchId : "mouseup.drag", dragend, true);

        if (origin) {
            offset = origin.apply(target, arguments);
            offset = [offset.x - origin_[0], offset.y - origin_[1]];
        } else {
            offset = [0, 0];
        }

        // Only cancel mousedown; touchstart is needed for draggable links.
        if (touchId == null) d3_eventCancel();
        event_({type: "dragstart"});

        function point() {
            var p = target.parentNode;
            return touchId != null
                ? d3.touches(p).filter(function (p) {
                return p.identifier === touchId;
            })[0]
                : d3.mouse(p);
        }

        function dragmove() {
            if (!target.parentNode) return dragend(); // target removed from DOM

            var p = point(),
                dx = p[0] - origin_[0],
                dy = p[1] - origin_[1];

            moved |= dx | dy;
            origin_ = p;
            d3_eventCancel();

            event_({type: "drag", x: p[0] + offset[0], y: p[1] + offset[1], dx: dx, dy: dy});
        }

        function dragend() {
            event_({type: "dragend"});

            // if moved, prevent the mouseup (and possibly click) from propagating
            if (moved) {
                d3_eventCancel();
                if (d3.event.target === eventTarget) w.on("click.drag", click, true);
            }

            w.on(touchId != null ? "touchmove.drag-" + touchId : "mousemove.drag", null)
                .on(touchId != null ? "touchend.drag-" + touchId : "mouseup.drag", null);
        }

        // prevent the subsequent click from propagating (e.g., for anchors)
        function click() {
            d3_eventCancel();
            w.on("click.drag", null);
        }
    }

    /**
     * 对外提供的操作闭包参数 origin 的函数
     *
     * @param x
     * @returns {*}
     */
    drag.origin = function (x) {
        if (!arguments.length) {
            return origin;
        }
        origin = x;
        return drag;
    };

    // rebind 把 event 的 on 函数用闭包的方式绑定到 drag 上, 使之具有可以注册监听者的能力
    return d3.rebind(drag, event, "on");
};
