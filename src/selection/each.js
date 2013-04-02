import "selection";

d3_selectionPrototype.each = function (callback) {
    return d3_selection_each(this,
        /**
         *
         * @param node
         * @param i node index
         * @param j group index
         */
        function (node, i, j) {
            callback.call(node, node.__data__, i, j);
        }
    );
};

/**
 * 在 groups 上每个group->node 上调用
 * @param groups
 * @param callback
 * @returns {*}
 */
function d3_selection_each(groups, callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
            if (node = group[i]) {
                callback(node, i, j);
            }
        }
    }
    // 返回 group 对象自身, 就可以继续调用其他属性了
    return groups;
}
