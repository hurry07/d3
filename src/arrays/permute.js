// 传递新顺序, 数组按新顺序排序后返回
d3.permute = function (array, indexes) {
    var permutes = [],
        i = -1,
        n = indexes.length;
    while (++i < n) permutes[i] = array[indexes[i]];
    return permutes;
};
