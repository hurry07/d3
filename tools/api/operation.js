/**
 * Created with JetBrains WebStorm.
 * User: jie
 * Date: 13-4-12
 * Time: 上午10:34
 * To change this template use File | Settings | File Templates.
 */
function Action() {
    this.active = false;
    this.events = [];
}
Action.prototype.isActive = function () {
    return this.active;
}
Action.prototype.onEvent = function () {
}
Action.prototype.onUserEvent = function () {
}
Action.prototype.fireEvent = function (id, param) {
    if (param) {
        this.manager.handleUserEvent({id: id, param: param});
    } else {
        this.manager.handleUserEvent({id: id});
    }
}
Action.prototype.on = function (id) {
    this.manager.on(id, this);
}
Action.prototype.off = function (id) {
    this.manager.off(id, this);
}
Action.prototype.getParam = function (p, id) {
    if (p.param.has(id)) {
        return p.param.value(id);
    }
    return null;
}
Action.prototype.register = function (manager) {
    this.manager = manager;
    this.onRegister(manager);
}
Action.prototype.onRegister = function (manager) {

}
