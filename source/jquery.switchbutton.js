;(function ($) {
    // 样式列表
    var types = {
        inside: 1,
        slide: 1,
        dynamic: 1
    };

    // 事件列表
    var events = {
        on: function () {
            return true;
        },
        off: function () {
            return true;
        },
        changed: function () {
            return true;
        }
    };

    /**
     * 生成DOM结构
     * @param {Object} $dom
     * @param {string} type
     */
    function initDOM($dom, type) {
        if (!$dom.hasClass('switch-btn')) {
            $dom.addClass('switch-btn').addClass(type);
        }
        if ($dom.children().length <= 0) {
            $dom.append('<input type="checkbox">').append('<label></label>');
        }
    }

    /**
     * 监听点击事件
     * @param {Object} $doms
     */
    function clickEvent($doms) {
        $doms.click(function (e) {
            var checkbox = e.target;

            if (checkbox.checked) {
                checkbox.checked = !checkbox.checked;

                // 打开状态，判断 on 事件
                if (this.switchBtnEvents.on.call(checkbox) === true) {
                    checkbox.checked = !checkbox.checked;
                    if (this.switchBtnEvents.changed.call(checkbox) !== true) {
                        checkbox.checked = !checkbox.checked;
                    }
                }

            } else {
                checkbox.checked = !checkbox.checked;
                // 关闭状态，判断 off 事件
                if (this.switchBtnEvents.off.call(checkbox) === true) {
                    checkbox.checked = !checkbox.checked;
                    if (this.switchBtnEvents.changed.call(checkbox) !== true) {
                        checkbox.checked = !checkbox.checked;
                    }
                }

            }
        });
    }

    var methods = {
        init: function (options) {
            // 初始化按钮样式
            var type = options.type || '';
            if (!types[type]) {
                type = '';
            }
            this.each(function () {
                initDOM($(this), type);

                // 处理事件，对事件进行记录，防止多个对象之间的事件冲突
                this.switchBtnEvents = {};
                if (typeof options.on == 'function') {
                    this.switchBtnEvents.on = options.on;
                } else {
                    this.switchBtnEvents.on = events.on;
                }
                if (typeof options.off == 'function') {
                    this.switchBtnEvents.off = options.off;
                } else {
                    this.switchBtnEvents.off = events.off;
                }
                if (typeof options.changed == 'function') {
                    this.switchBtnEvents.changed = options.changed;
                } else {
                    this.switchBtnEvents.changed = events.changed;
                }
            });

            // 开启监听
            clickEvent(this);

            return this;
        },
        on: function (type, fn) {
            this.switchbutton({
                type: type,
                on: fn
            });
        },
        off: function (type, fn) {
            this.switchbutton({
                type: type,
                off: fn
            });
        },
        changed: function (type, fn) {
            this.switchbutton({
                type: type,
                changed: fn
            });
        },
        destory: function () {
            return this.each(function (){
                $(window).unbind('.switchbutton');
            });
        }
    };

    $.fn.switchbutton = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method == 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('method' + method + 'not found in jQuery.switchbutton');
        }
    };
})(jQuery);
