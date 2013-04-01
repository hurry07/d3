import "../arrays/map";
import "selection";

d3_selectionPrototype.data = function (value, key) {
    var i = -1,
        n = this.length, // 已经查询到的元素的长度
        group,
        node;

    // If no value is specified, return the first value.
    // 第一个选择值的第一个 value
    if (!arguments.length) {
        value = new Array(n = (group = this[0]).length);
        while (++i < n) {
            if (node = group[i]) {
                value[i] = node.__data__;
            }
        }
        return value;
    }

    /**
     * 当前 group 中的一项
     *
     * @param group 元素中的一项
     * @param groupData 数据
     */
    function bind(group, groupData) {
        var i,
            n = group.length, // group count
            m = groupData.length,
            n0 = Math.min(n, m),
            updateNodes = new Array(m),
            enterNodes = new Array(m),// 最多有 m 各元素会绑定数据
            exitNodes = new Array(n),// 最多有 n 各元素可能会 exit
            node,
            nodeData;

        if (key) {
            var nodeByKeyValue = new d3_Map,
                dataByKeyValue = new d3_Map,
                keyValues = [],
                keyValue;

            for (i = -1; ++i < n;) {
                keyValue = key.call(node = group[i], node.__data__, i);
                if (nodeByKeyValue.has(keyValue)) {
                    exitNodes[i] = node; // duplicate selection key
                } else {
                    nodeByKeyValue.set(keyValue, node);
                }
                keyValues.push(keyValue);
            }

            for (i = -1; ++i < m;) {
                keyValue = key.call(groupData, nodeData = groupData[i], i);
                if (node = nodeByKeyValue.get(keyValue)) {
                    updateNodes[i] = node;
                    node.__data__ = nodeData;
                } else if (!dataByKeyValue.has(keyValue)) { // no duplicate data key
                    enterNodes[i] = d3_selection_dataNode(nodeData);
                }
                dataByKeyValue.set(keyValue, nodeData);
                nodeByKeyValue.remove(keyValue);
            }

            for (i = -1; ++i < n;) {
                if (nodeByKeyValue.has(keyValues[i])) {
                    exitNodes[i] = group[i];
                }
            }
        } else {
            for (i = -1; ++i < n0;) {
                node = group[i];
                nodeData = groupData[i];

                // 如果这个节点已经存在了, 那么就替换它的数据, 幷记录到 updateNodes
                if (node) {
                    node.__data__ = nodeData;
                    updateNodes[i] = node;
                } else {
                    // 否则就记录到 enterNodes, 空白占位符
                    enterNodes[i] = d3_selection_dataNode(nodeData);
                }
            }
            // 如果数据还有富余, 就继续添加空白占位符
            for (; i < m; ++i) {
                enterNodes[i] = d3_selection_dataNode(groupData[i]);
            }
            // 如果节点有剩余, 添加到 exitNodes
            for (; i < n; ++i) {
                exitNodes[i] = group[i];
            }
        }

        enterNodes.update
            = updateNodes;

        enterNodes.parentNode
            = updateNodes.parentNode
            = exitNodes.parentNode
            = group.parentNode;

        enter.push(enterNodes);
        update.push(updateNodes);
        exit.push(exitNodes);
    }

    // 三个空白数组
    var enter = d3_selection_enter([]),
        update = d3_selection([]),
        exit = d3_selection([]);

    // 按下面的逻辑, 一份数据可以绑定在多个节点
    // 如果 value 对象是 function, 那么就引用 group.parentNode 绑定的数据
    if (typeof value === "function") {
        while (++i < n) {
            bind(group = this[i], value.call(group, group.parentNode.__data__, i));
        }
    } else {
        // 否则就依次在当前 group 的元素上绑定数据
        while (++i < n) {
            bind(group = this[i], value);
        }
    }

    update.enter = function () {
        return enter;
    };
    update.exit = function () {
        return exit;
    };
    return update;
};

function d3_selection_dataNode(data) {
    return {__data__: data};
}
