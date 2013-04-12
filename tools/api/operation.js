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

function ActionGroup() {
    this.actions = Array.prototype.slice.call(arguments, 0);
}
ActionGroup.prototype.prepare = function () {
    for (var i = 0, actions = this.actions, size = actions.length; i < size; i++) {
        actions[i].prepare();
    }
}
ActionGroup.prototype.start = function () {
    for (var i = 0, actions = this.actions, size = actions.length; i < size; i++) {
        actions[i].start();
        if (actions[i].isActive()) {
            this.active = actions[i];
            break;
        }
    }
}
ActionGroup.prototype.handleEvent = function () {
    if (this.active) {
        this.active.handleEvent(Array.prototype.slice.call(arguments, 0));
        if(!this.active.isActive()) {
            this.active = null;
        }
    }
}
ActionGroup.prototype.stop = function () {
    for (var i = 0, actions = this.actions, size = actions.length; i < size; i++) {
        actions[i].stop();
    }
    this.active = null;
}
