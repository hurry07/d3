/**
 * Created with JetBrains WebStorm.
 * User: jie
 * Date: 13-4-12
 * Time: 上午10:34
 * To change this template use File | Settings | File Templates.
 */
function Action() {
    this.active = false;
}
Action.prototype.prepare = function () {
    this.active = false;
}
Action.prototype.isActive = function () {
    return this.active;
}
Action.prototype.start = function () {
}
Action.prototype.handleEvent = function () {
}
Action.prototype.stop = function () {
}
Action.prototype.getName = function () {
    return this.name;
}
