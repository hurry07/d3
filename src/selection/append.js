import "../core/document";
import "../core/ns";
import "selection";

// TODO append(node)?
// TODO append(function)?
/**
 *
 * @param name svg:g 可能是这样的格式
 * @returns {*}
 */
d3_selectionPrototype.append = function (name) {
    // space 命名空间 local 本地名字
    // name : {space:'http://www.w3.org/2000/svg', local:name}
    name = d3.ns.qualify(name);

    /**
     * 如果没指定本地名字, 那么就认为要添加对象的和当前对象是同一命名空间的
     * @returns {XML|Node}
     */
    function append() {
        return this.appendChild(d3_document.createElementNS(this.namespaceURI, name));
    }

    /**
     * 否则就建立一个指定命名空间的对象
     * @returns {XML|Node}
     */
    function appendNS() {
        return this.appendChild(d3_document.createElementNS(name.space, name.local));
    }

    return this.select(name.local ? appendNS : append);
};
