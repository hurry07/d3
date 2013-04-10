/**
 * Created with JetBrains WebStorm.
 * User: jie
 * Date: 13-4-10
 * Time: 下午2:56
 * To change this template use File | Settings | File Templates.
 */
function _extends(sub, super_, props) {
    sub.prototype = Object.create(super_.prototype);
    sub.prototype.constructor = sub;

    if (props) {
        for (var i in props) {
            sub.prototype[i] = props[i];
        }
    }
    return sub;
}

function _defineClass(super_, props) {
    var c = props._constructor;
    function sub() {
        super_.apply(this, arguments);
        c.apply(this, arguments);
    }
    sub.prototype = Object.create(super_.prototype);
    sub.prototype.constructor = sub;
    if (props) {
        for (var i in props) {
            props[i] != c && (sub.prototype[i] = props[i]);
        }
    }
    return sub;
}

// ==========================================
// node is used as basic element of MVC
// ==========================================
/**
 * Node is a controller
 * Node.view is the ui selection
 * Node.data is model
 *
 * @param parent
 * @constructor
 */
function Node(parent) {
    this.parentNode = parent;
    this.init = false;
}
// implement this method to get a id of data
//Node.prototype.identifier = function(data) {
//    return '';
//}
Node.prototype.setData = function (data) {
    this.data = data;
    data.__controller__ = this;
}
/**
 * rebind data
 */
Node.prototype.refresh = function() {
    this.bind(this.data);
}
/**
 * current data was replacing by data that has the same id.
 * this method will be call only as you supply an identifier.
 *
 * see also Node.prototype.identifier
 *
 * @param dnew
 * @param dold
 */
Node.prototype.bindUpdate = function (dold, dnew) {
}
Node.prototype.bind = function (data) {
    // if this is the first time bind is called
    if (!this.init) {
        if (data) {
            this.init = true;
            this.setData(data);
            this.enter();
        }
    } else if (data) {
        this.init = true;
        var dold = this.data;

        this.setData(data);
        var id = this.identifier;
        if(id && (id(dold) != id(data))) {
            this.bindUpdate(dold, data);
        } else {
            this.update(dold, data);
        }
    } else {
        this.unbind();
    }
}
/**
 * create customer ui
 */
Node.prototype.enter = function () {
}
/**
 * data object was replaced, this.data is already equal to dnew
 *
 * @param dold
 * @param dnew
 */
Node.prototype.update = function (dold, dnew) {
}
/**
 * release customer ui, or send release event if needed
 */
Node.prototype.exit = function () {
}
Node.prototype.unbind = function () {
    this.exit();
    this.data = null;
    this.init = false;
}
/**
 * get parent view
 * @returns {*}
 */
Node.prototype.parentView = function () {
    return this.parentNode ? this.parentNode.view : null;
}
Node.prototype.deleteView = function(view) {
    if(view) {
        view.remove();
    }
}
/**
 * create a empty node
 *
 * @param sel
 * @returns {Node}
 */
Node.wrap = function (sel) {
    var n = new Node(null);
    n.view = sel;
    return n;
}
Node.getNode = function(data) {
    return data.__controller__;
}
/**
 * create a Container function with a closure containing certain element type
 *
 * @param type
 * @returns {*}
 */
Node.createContainer = function(type) {
    return _extends(function(p, view) {
        ListNode.call(this, p);
        this.view = view;
        this.childType = type;
    }, ListNode, {
        createChild : function() {
            return new this.childType(this);
        },
        childClass : function() {
            return this.childType;
        }
    });
}

// ==========================================
// ListNode node that take a [] as its data
// ==========================================
function ListNode(parent) {
    Node.call(this, parent);
    this.children = [];
    this.param = {};
}
_extends(ListNode, Node);
/**
 * sub class should overwrite this
 * @returns {Node}
 */
ListNode.prototype.createChild = function() {
    return new Node(this);
}
/**
 * you can implement child cache.
 *
 * @param child
 * @param i
 */
ListNode.prototype.releaseChild = function (child, i) {
    child.unbind();
}
/**
 * sub class should give a specific type, this is like ArrayList<T>
 * @returns {*}
 */
ListNode.prototype.childClass = function() {
    return Node;
}
ListNode.prototype.bindChild = function (child, d, i) {
    this.setChildIndex(child, i);
    child.bind(d);
}
ListNode.prototype.setChildIndex = function (child, i) {
    child.__index__ = i;
}
ListNode.prototype.getChildIndex = function (child) {
    return child.__index__;
}
ListNode.prototype.enter = function () {
    this.data.forEach(function(d, i) {
        var child = this.createChild();
        this.bindChild(child, d, i);
        this.children.push(child);
    }, this);
}
/**
 * render order is changed
 */
ListNode.prototype.sortView = function () {
}
ListNode.prototype.update = function (dold, dnew) {
    var id = this.childClass().prototype.identifier;
    var data = dnew;

    var m = this.children.length;
    var n = data.length;
    var children = this.children;

    if (id) {
        var carr = children.splice(0, m);// remove all element from current children
        var s = 0;// search index
        var cm = new d3.map();

        var sort = false;
        var child;// temp child element
        for (var i = 0, size = n; i < size; i++) {
            var key = id(data[i]);

            // try to find reusable child
            child = null;
            if (cm.has(key)) {
                child = cm.get(key);
                cm.remove(key);
            } else {
                while (s < m) {
                    var ck = id(carr[s].data);
                    if (key == ck) {
                        child = carr[s];
                        s++;
                        break;
                    } else {
                        cm.set(ck, carr[s]);
                    }
                    s++;
                }
            }

            // if find, update it, create new element
            if (child) {
                var cold = child.data;// get data with current reusable child
                child.setData(data[i]);
                if(!sort && this.getChildIndex(child) != i) {
                    sort = true;
                }
                this.setChildIndex(child, i);
                child.bindUpdate(cold, data[i]);
            } else {
                child = this.createChild();
                this.bindChild(child, data[i], i);
            }
            this.children.push(child);
        }

        // remove useless elements if any
        cm.values().forEach(this.releaseChild, this);
        if(sort) {
            this.sortView();
        }
    } else {
        var min = Math.min(m, n);
        for (var i = 0, size = min; i < size; i++) {
            children[i].bind(data[i]);
        }
        // if there is more children than data
        for (var i = min; i < m; i++) {
            this.releaseChild(children[i], i);
        }
        // if there is more data than children
        for (var i = min; i < n; i++) {
            var child = this.createChild();
            this.bindChild(child, data[i], i);
            this.children.push(child);
        }

        this.children = (m < n) ? children : children.slice(0, n);
    }
}
ListNode.prototype.exit = function () {
    this.children.forEach(this.releaseChild, this);
    this.children = [];
}
