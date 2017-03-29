;(function (window) {
    /**
     * @param {Object} [options]
     * @param {Array} [options.elements]    DOM数组
     * @param {Function} [options.on]   将要打开时触发的操作,返回true允许打开,否则拒绝
     * @param {Function} [options.off]  将要关闭时触发的操作,返回true允许关闭,否则拒绝
     * @param {Function} [options.changed]  状态发生改变时触发的操作,返回true允许更改状态,否则拒绝
     * @example
     * switchBtn({
     *     elements: document.querySelectorAll('.switch-btn'),
     *     on: function () {
     *         // return true; 允许打开
     *         // return false; 拒绝打开
     *     },
     *     off: function () {
     *         // return true; 允许关闭
     *         // return false; 拒绝关闭
     *     },
     *     changed: function () {
     *         // return true; 允许更改状态
     *         // return false; 拒绝更改状态
     *     }
     * });
     */
    function switchBtn(options) {
        var switchBtn = new SwitchBtn(options);
    }

    function SwitchBtn(options) {
        this._init(options);
    }

    SwitchBtn.prototype = {
        constructor: SwitchBtn,

        /**
         * init
         * @inner
         * @method
         * @param options
         * @private
         */
        _init: function (options) {
            // 接收参数
            options = isObject(options) ? options : {};

            // 需要操作的节点数组
            this.elements = isArray(options.elements) ? options.elements : [];

            // 打开时执行的操作
            this.on = isFunction(options.on) ? options.on : function () {
                    return true;
                };

            // 关闭时执行的操作
            this.off = isFunction(options.off) ? options.off : function () {
                    return true;
                };

            // 状态发生改变时执行的操作
            this.changed = isFunction(options.changed) ? options.changed : function () {
                    return true;
                };

            // 监听状态变化
            this._addEvent();

        },

        /**
         * 添加事件监听
         * @inner
         * @method
         * @private
         */
        _addEvent: function () {
            // 监听事件
            var self = this;
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].addEventListener('change', function (e) {
                    self._toggle(e);
                });
            }
        },

        /**
         *
         * @inner
         * @method
         * @param e
         * @return {boolean}
         * @private
         */
        _toggle: function (e) {
            var res = true;                 // 监视返回值
            var checkbox = e.target;        // CheckBox选择框

            // 开关即将被打开
            // 验证是否允许打开开关
            // on 和 changed返回值都为true时打开
            if (checkbox.checked) {
                // 更改内部this指向，方便调用
                res = this.on.call(checkbox);
                res = res ? this.changed.call(checkbox) : res;
            }

            // 开关即将被关闭
            // 验证是否允许关闭开关
            // off 和 changed返回值都为true时关闭
            if (!checkbox.checked) {
                res = this.off.call(checkbox);
                res = res ? this.changed.call(checkbox) : res;
            }

            // 返回值不为true，不允许执行操作
            if (!res) {
                checkbox.checked = !checkbox.checked;
            }
            return false;
        }
    };

    /**
     *
     * @param obj
     * @return {boolean|*}
     */
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]'
            || obj['length']
            && obj[obj['length']-1];
    }

    /**
     *
     * @param obj
     * @return {boolean}
     */
    function isObject(obj) {
        return typeof obj === 'object';
    }

    /**
     *
     * @param fn
     * @return {boolean}
     */
    function isFunction(fn) {
        return typeof fn === 'function';
    }

    window.switchBtn = switchBtn;
})(window);