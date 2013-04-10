/**
 * Created with JetBrains WebStorm.
 * User: jie
 * Date: 13-4-3
 * Time: 上午10:00
 * To change this template use File | Settings | File Templates.
 */
function Selection(root, style) {
    this.root = root;
    this.style = style;
}
Selection.prototype.select = function() {
    return this.root.selectAll('.' + this.style);
}
/**
 * controller
 *
 * @param selector
 * @constructor
 */
function Widget(selector) {
    this.x = 0;
    this.y = 0;
    this.selector = selector;
    this.data = {};
}
Widget.prototype.bind = function(data) {
    var context = this.selector.select().data([this.data]);

    var widget = this;
    context.enter().append('svg:g').attr('class', this.selector.style).each(function(d, i, nindex) {
        widget.enterUI(this, d, i, nindex);
    });
    context.each(function(d, i, nindex) {
        widget.updateUI(this, d, i, nindex);
    });
    context.exit().each(function(d, i, nindex) {
        widget.exitUI(this, d, i, nindex);
    });
}
Widget.prototype.enterUI = function(ui, index) {
}
Widget.prototype.updateUI = function(ui) {
}
Widget.prototype.exitUI = function(ui) {
    d3.select(ui).remove();
}
Widget.enter = function(d, i, nindex) {
    d.enterUI(this, d, i, nindex);
}
Widget.update = function(d, i, nindex) {
    d.updateUI(this, d, i, nindex);
}
Widget.exit = function(d, i, nindex) {
    d.exitUI(this, d, i, nindex);
}
