(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.loader = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ConfigLoader = function () {
        _createClass(ConfigLoader, [{
            key: 'config',
            get: function get() {
                if (this._config !== undefined) {
                    return this._config;
                }

                var element = void 0;
                var elementId = this.element;

                if (elementId.substr(0, 1) === '#') {
                    elementId = elementId.substr(1);
                }

                if (document === undefined) {
                    if (this.throwError === true) {
                        throw new Error('Can not find the document node to find configuration element "' + this.element + '".');
                    }

                    return {};
                }

                // try to find the user config element
                element = document.getElementById(elementId);
                if (element === null) {
                    if (this.throwError === true) {
                        throw new Error('Can not find the Element "' + this.element + '" for configuration.');
                    }

                    return {};
                }

                // try to parse the JSON from element
                try {
                    this._config = JSON.parse(element.innerHTML);
                } catch (exception) {
                    if (this.throwError === true) {
                        throw new Error('Can not parse the data from Element "' + this.element + '" for configuration.\n' + (exception.message || exception));
                    }

                    return {};
                }

                return this._config;
            }
        }]);

        /**
         * loads config from script type application json
         *
         * @param {String} element
         * @param {Object} [options]
         * @param {Boolean} [options.throwError]
         */
        function ConfigLoader(element, options) {
            _classCallCheck(this, ConfigLoader);

            this.element = element;

            options = options || {};

            this.throwError = options.throwError !== undefined ? options.throwError : this.throwError;
        }

        return ConfigLoader;
    }();

    exports.default = ConfigLoader;
});