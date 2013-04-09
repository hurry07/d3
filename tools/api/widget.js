/**
 * Created with JetBrains WebStorm.
 * User: droidhen69
 * Date: 13-4-7
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 */
function Selection(root, style, key) {
    this.root = root;
    this.style = style;
    this.key = key;
}
Selection.prototype.select = function() {
    return this.root.selectAll('.' + this.style);
}
function Widget(selector) {
    this.x = 0;
    this.y = 0;
    this.selector = selector;
}
Widget.prototype.bind = function(data) {
    var key = this.selector.key;
    var context;
    if(key) {
        context = this.selector.select().data(data, key);
    } else {
        context = this.selector.select().data(data);
    }

    var widget = this;
    var enter = this.init(context.enter());
    enter.each(function(d, i, nindex) {
        widget.enterUI(this, d, i, nindex);
    });
    context.each(function(d, i, nindex) {
        widget.updateUI(this, d, i, nindex);
    });
    context.exit().each(function(d, i, nindex) {
        widget.exitUI(this, d, i, nindex);
    });

    this.data = data;
}
Widget.prototype.enterUI = function(ui, index) {
}
Widget.prototype.updateUI = function(ui) {
}
Widget.prototype.exitUI = function(ui) {
    d3.select(ui).remove();
}
Widget.prototype.init = function(enter) {
    return enter.append('svg:g')
        .attr('class', this.selector.style)
        .attr("transform", function(d) {
            return "translate(" + d.position.x + "," + d.position.y + ")"
        })
}

function Node() {
}
