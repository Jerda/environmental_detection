webpackJsonp([8],Array(78).concat([
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(363)
}
var normalizeComponent = __webpack_require__(111)
/* script */
var __vue_script__ = __webpack_require__(365)
/* template */
var __vue_template__ = __webpack_require__(385)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/admin/wechat/material/add.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2690a23b", Component.options)
  } else {
    hotAPI.reload("data-v-2690a23b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return warning; });
/* harmony export (immutable) */ __webpack_exports__["d"] = format;
/* harmony export (immutable) */ __webpack_exports__["e"] = isEmptyValue;
/* unused harmony export isEmptyObject */
/* harmony export (immutable) */ __webpack_exports__["a"] = asyncMap;
/* harmony export (immutable) */ __webpack_exports__["b"] = complementError;
/* harmony export (immutable) */ __webpack_exports__["c"] = deepMerge;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);


var formatRegExp = /%[sdj%]/g;

var warning = function warning() {};

// don't print warning message when in production env or node runtime
if ("development" !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function format() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;
  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }
  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case '%s':
          return String(args[i++]);
        case '%d':
          return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
          break;
        default:
          return x;
      }
    });
    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += ' ' + arg;
    }
    return str;
  }
  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }
  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }
  return false;
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index;
    index = index + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var flattenArr = flattenObjArr(objArr);
    return asyncSerialArray(flattenArr, func, callback);
  }
  var firstFields = option.firstFields || [];
  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var next = function next(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === objArrLength) {
      callback(results);
    }
  };
  objArrKeys.forEach(function (key) {
    var arr = objArr[key];
    if (firstFields.indexOf(key) !== -1) {
      asyncSerialArray(arr, func, next);
    } else {
      asyncParallelArray(arr, func, next);
    }
  });
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }
    return {
      message: oe,
      field: oe.field || rule.fullField
    };
  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];
        if ((typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(value)) === 'object' && __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(target[s]) === 'object') {
          target[s] = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__required__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__whitespace__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__range__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enum__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pattern__ = __webpack_require__(218);







/* harmony default export */ __webpack_exports__["a"] = ({
  required: __WEBPACK_IMPORTED_MODULE_0__required__["a" /* default */],
  whitespace: __WEBPACK_IMPORTED_MODULE_1__whitespace__["a" /* default */],
  type: __WEBPACK_IMPORTED_MODULE_2__type__["a" /* default */],
  range: __WEBPACK_IMPORTED_MODULE_3__range__["a" /* default */],
  'enum': __WEBPACK_IMPORTED_MODULE_4__enum__["a" /* default */],
  pattern: __WEBPACK_IMPORTED_MODULE_5__pattern__["a" /* default */]
});

/***/ }),
/* 93 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
exports.default = {
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};

/***/ }),
/* 95 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(97);
var createDesc = __webpack_require__(106);
module.exports = __webpack_require__(98) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(105);
var IE8_DOM_DEFINE = __webpack_require__(139);
var toPrimitive = __webpack_require__(115);
var dP = Object.defineProperty;

exports.f = __webpack_require__(98) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(102)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(142);
var defined = __webpack_require__(116);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(119)('wks');
var uid = __webpack_require__(108);
var Symbol = __webpack_require__(93).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 111);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __webpack_require__(94);

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(112);


/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _input = __webpack_require__(113);

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_input2.default.install = function (Vue) {
  Vue.component(_input2.default.name, _input2.default);
};

exports.default = _input2.default;

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_eddb4a56_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_input_vue__ = __webpack_require__(116);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_eddb4a56_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_input_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

var _migrating = __webpack_require__(7);

var _migrating2 = _interopRequireDefault(_migrating);

var _calcTextareaHeight = __webpack_require__(115);

var _calcTextareaHeight2 = _interopRequireDefault(_calcTextareaHeight);

var _merge = __webpack_require__(9);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElInput',

  componentName: 'ElInput',

  mixins: [_emitter2.default, _migrating2.default],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data: function data() {
    return {
      currentValue: this.value,
      textareaCalcStyle: {},
      prefixOffset: null,
      suffixOffset: null,
      hovering: false,
      focused: false
    };
  },


  props: {
    value: [String, Number],
    placeholder: String,
    size: String,
    resize: String,
    name: String,
    form: String,
    id: String,
    maxlength: Number,
    minlength: Number,
    readonly: Boolean,
    autofocus: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    max: {},
    min: {},
    step: {},
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    validateState: function validateState() {
      return this.elFormItem ? this.elFormItem.validateState : '';
    },
    needStatusIcon: function needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    validateIcon: function validateIcon() {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close'
      }[this.validateState];
    },
    textareaStyle: function textareaStyle() {
      return (0, _merge2.default)({}, this.textareaCalcStyle, { resize: this.resize });
    },
    inputSize: function inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    isGroup: function isGroup() {
      return this.$slots.prepend || this.$slots.append;
    },
    showClear: function showClear() {
      return this.clearable && this.currentValue !== '' && (this.focused || this.hovering);
    }
  },

  watch: {
    'value': function value(val, oldValue) {
      this.setCurrentValue(val);
    }
  },

  methods: {
    focus: function focus() {
      (this.$refs.input || this.$refs.textarea).focus();
    },
    getMigratingConfig: function getMigratingConfig() {
      return {
        props: {
          'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          'click': 'click is removed.'
        }
      };
    },
    handleBlur: function handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
      }
    },
    inputSelect: function inputSelect() {
      (this.$refs.input || this.$refs.textarea).select();
    },
    resizeTextarea: function resizeTextarea() {
      if (this.$isServer) return;
      var autosize = this.autosize,
          type = this.type;

      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: (0, _calcTextareaHeight2.default)(this.$refs.textarea).minHeight
        };
        return;
      }
      var minRows = autosize.minRows;
      var maxRows = autosize.maxRows;

      this.textareaCalcStyle = (0, _calcTextareaHeight2.default)(this.$refs.textarea, minRows, maxRows);
    },
    handleFocus: function handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleInput: function handleInput(event) {
      var value = event.target.value;
      this.$emit('input', value);
      this.setCurrentValue(value);
    },
    handleChange: function handleChange(event) {
      this.$emit('change', event.target.value);
    },
    setCurrentValue: function setCurrentValue(value) {
      var _this = this;

      if (value === this.currentValue) return;
      this.$nextTick(function (_) {
        _this.resizeTextarea();
      });
      this.currentValue = value;
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    },
    calcIconOffset: function calcIconOffset(place) {
      var pendantMap = {
        'suf': 'append',
        'pre': 'prepend'
      };

      var pendant = pendantMap[place];

      if (this.$slots[pendant]) {
        return { transform: 'translateX(' + (place === 'suf' ? '-' : '') + this.$el.querySelector('.el-input-group__' + pendant).offsetWidth + 'px)' };
      }
    },
    clear: function clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.setCurrentValue('');
      this.focus();
    }
  },

  created: function created() {
    this.$on('inputSelect', this.inputSelect);
  },
  mounted: function mounted() {
    this.resizeTextarea();
    if (this.isGroup) {
      this.prefixOffset = this.calcIconOffset('pre');
      this.suffixOffset = this.calcIconOffset('suf');
    }
  }
};

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = calcTextareaHeight;
var hiddenTextarea = void 0;

var HIDDEN_STYLE = '\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';

var CONTEXT_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

function calculateNodeStyling(targetElement) {
  var style = window.getComputedStyle(targetElement);

  var boxSizing = style.getPropertyValue('box-sizing');

  var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

  var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

  var contextStyle = CONTEXT_STYLE.map(function (name) {
    return name + ':' + style.getPropertyValue(name);
  }).join(';');

  return { contextStyle: contextStyle, paddingSize: paddingSize, borderSize: borderSize, boxSizing: boxSizing };
}

function calcTextareaHeight(targetElement) {
  var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  var _calculateNodeStyling = calculateNodeStyling(targetElement),
      paddingSize = _calculateNodeStyling.paddingSize,
      borderSize = _calculateNodeStyling.borderSize,
      boxSizing = _calculateNodeStyling.boxSizing,
      contextStyle = _calculateNodeStyling.contextStyle;

  hiddenTextarea.setAttribute('style', contextStyle + ';' + HIDDEN_STYLE);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  var height = hiddenTextarea.scrollHeight;
  var result = {};

  if (boxSizing === 'border-box') {
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  hiddenTextarea.value = '';
  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    var minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = minHeight + 'px';
  }
  if (maxRows !== null) {
    var maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = height + 'px';
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
};

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
  _vm.type === 'textarea' ? 'el-textarea' : 'el-input',
  _vm.inputSize ? 'el-input--' + _vm.inputSize : '',
  {
    'is-disabled': _vm.disabled,
    'el-input-group': _vm.$slots.prepend || _vm.$slots.append,
    'el-input-group--append': _vm.$slots.append,
    'el-input-group--prepend': _vm.$slots.prepend,
    'el-input--prefix': _vm.$slots.prefix || _vm.prefixIcon,
    'el-input--suffix': _vm.$slots.suffix || _vm.suffixIcon
  }
  ],on:{"mouseenter":function($event){_vm.hovering = true},"mouseleave":function($event){_vm.hovering = false}}},[(_vm.type !== 'textarea')?[(_vm.$slots.prepend)?_c('div',{staticClass:"el-input-group__prepend",attrs:{"tabindex":"0"}},[_vm._t("prepend")],2):_vm._e(),(_vm.type !== 'textarea')?_c('input',_vm._b({ref:"input",staticClass:"el-input__inner",attrs:{"tabindex":_vm.tabindex,"autocomplete":_vm.autoComplete,"aria-label":_vm.label},domProps:{"value":_vm.currentValue},on:{"input":_vm.handleInput,"focus":_vm.handleFocus,"blur":_vm.handleBlur,"change":_vm.handleChange}},'input',_vm.$props,false)):_vm._e(),(_vm.$slots.prefix || _vm.prefixIcon)?_c('span',{staticClass:"el-input__prefix",style:(_vm.prefixOffset)},[_vm._t("prefix"),(_vm.prefixIcon)?_c('i',{staticClass:"el-input__icon",class:_vm.prefixIcon}):_vm._e()],2):_vm._e(),(_vm.$slots.suffix || _vm.suffixIcon || _vm.showClear || _vm.validateState && _vm.needStatusIcon)?_c('span',{staticClass:"el-input__suffix",style:(_vm.suffixOffset)},[_c('span',{staticClass:"el-input__suffix-inner"},[(!_vm.showClear)?[_vm._t("suffix"),(_vm.suffixIcon)?_c('i',{staticClass:"el-input__icon",class:_vm.suffixIcon}):_vm._e()]:_c('i',{staticClass:"el-input__icon el-icon-circle-close el-input__clear",on:{"click":_vm.clear}})],2),(_vm.validateState)?_c('i',{staticClass:"el-input__icon",class:['el-input__validateIcon', _vm.validateIcon]}):_vm._e()]):_vm._e(),(_vm.$slots.append)?_c('div',{staticClass:"el-input-group__append"},[_vm._t("append")],2):_vm._e()]:_c('textarea',_vm._b({ref:"textarea",staticClass:"el-textarea__inner",style:(_vm.textareaStyle),attrs:{"tabindex":_vm.tabindex,"aria-label":_vm.label},domProps:{"value":_vm.currentValue},on:{"input":_vm.handleInput,"focus":_vm.handleFocus,"blur":_vm.handleBlur,"change":_vm.handleChange}},'textarea',_vm.$props,false))],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = __webpack_require__(112);

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = __webpack_require__(9);

/***/ })

/******/ });

/***/ }),
/* 104 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(101);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(141);
var enumBugKeys = __webpack_require__(120);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 108 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 109 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(189);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(201);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 111 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Show migrating guide in browser console.
 *
 * Usage:
 * import Migrating from 'element-ui/src/mixins/migrating';
 *
 * mixins: [Migrating]
 *
 * add getMigratingConfig method for your component.
 *  getMigratingConfig() {
 *    return {
 *      props: {
 *        'allow-no-selection': 'allow-no-selection is removed.',
 *        'selection-mode': 'selection-mode is removed.'
 *      },
 *      events: {
 *        selectionchange: 'selectionchange is renamed to selection-change.'
 *      }
 *    };
 *  },
 */
exports.default = {
  mounted: function mounted() {
    if (false) return;
    if (!this.$vnode) return;

    var _getMigratingConfig = this.getMigratingConfig(),
        _getMigratingConfig$p = _getMigratingConfig.props,
        props = _getMigratingConfig$p === undefined ? {} : _getMigratingConfig$p,
        _getMigratingConfig$e = _getMigratingConfig.events,
        events = _getMigratingConfig$e === undefined ? {} : _getMigratingConfig$e;

    var _$vnode = this.$vnode,
        data = _$vnode.data,
        componentOptions = _$vnode.componentOptions;

    var definedProps = data.attrs || {};
    var definedEvents = componentOptions.listeners || {};

    for (var propName in definedProps) {
      if (definedProps.hasOwnProperty(propName) && props[propName]) {
        console.warn('[Element Migrating][' + this.$options.name + '][Attribute]: ' + props[propName]);
      }
    }

    for (var eventName in definedEvents) {
      if (definedEvents.hasOwnProperty(eventName) && events[eventName]) {
        console.warn('[Element Migrating][' + this.$options.name + '][Event]: ' + events[eventName]);
      }
    }
  },

  methods: {
    getMigratingConfig: function getMigratingConfig() {
      return {
        props: {},
        events: {}
      };
    }
  }
};

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 173);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(174);


/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _button = __webpack_require__(175);

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_button2.default.install = function (Vue) {
  Vue.component(_button2.default.name, _button2.default);
};

exports.default = _button2.default;

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_button_vue__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_button_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_button_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_36b70ef5_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_button_vue__ = __webpack_require__(177);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_button_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_36b70ef5_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_button_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElButton',

  inject: {
    elFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean
  },

  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    buttonSize: function buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  methods: {
    handleClick: function handleClick(evt) {
      this.$emit('click', evt);
    },
    handleInnerClick: function handleInnerClick(evt) {
      if (this.disabled) {
        evt.stopPropagation();
      }
    }
  }
};

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"el-button",class:[
    _vm.type ? 'el-button--' + _vm.type : '',
    _vm.buttonSize ? 'el-button--' + _vm.buttonSize : '',
    {
      'is-disabled': _vm.disabled,
      'is-loading': _vm.loading,
      'is-plain': _vm.plain,
      'is-round': _vm.round
    }
  ],attrs:{"disabled":_vm.disabled,"autofocus":_vm.autofocus,"type":_vm.nativeType},on:{"click":_vm.handleClick}},[(_vm.loading)?_c('i',{staticClass:"el-icon-loading",on:{"click":_vm.handleInnerClick}}):_vm._e(),(_vm.icon && !_vm.loading)?_c('i',{class:_vm.icon,on:{"click":_vm.handleInnerClick}}):_vm._e(),(_vm.$slots.default)?_c('span',{on:{"click":_vm.handleInnerClick}},[_vm._t("default")],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(93);
var core = __webpack_require__(104);
var ctx = __webpack_require__(183);
var hide = __webpack_require__(96);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(101);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 116 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 117 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(119)('keys');
var uid = __webpack_require__(108);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(93);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 120 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 121 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(97).f;
var has = __webpack_require__(95);
var TAG = __webpack_require__(100)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(100);


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(93);
var core = __webpack_require__(104);
var LIBRARY = __webpack_require__(122);
var wksExt = __webpack_require__(125);
var defineProperty = __webpack_require__(97).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 127 */,
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _locale = __webpack_require__(151);

exports.default = {
  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _locale.t.apply(this, args);
    }
  }
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(163);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./button.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./button.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(162);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./input.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./input.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(154);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./col.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./col.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 329);
/******/ })
/************************************************************************/
/******/ ({

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(330);


/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _col = __webpack_require__(331);

var _col2 = _interopRequireDefault(_col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_col2.default.install = function (Vue) {
  Vue.component(_col2.default.name, _col2.default);
};

exports.default = _col2.default;

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
  name: 'ElCol',

  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  computed: {
    gutter: function gutter() {
      var parent = this.$parent;
      while (parent && parent.$options.componentName !== 'ElRow') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render: function render(h) {
    var _this = this;

    var classList = [];
    var style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    ['span', 'offset', 'pull', 'push'].forEach(function (prop) {
      if (_this[prop] || _this[prop] === 0) {
        classList.push(prop !== 'span' ? 'el-col-' + prop + '-' + _this[prop] : 'el-col-' + _this[prop]);
      }
    });

    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(function (size) {
      if (typeof _this[size] === 'number') {
        classList.push('el-col-' + size + '-' + _this[size]);
      } else if (_typeof(_this[size]) === 'object') {
        (function () {
          var props = _this[size];
          Object.keys(props).forEach(function (prop) {
            classList.push(prop !== 'span' ? 'el-col-' + size + '-' + prop + '-' + props[prop] : 'el-col-' + size + '-' + props[prop]);
          });
        })();
      }
    });

    return h(this.tag, {
      class: ['el-col', classList],
      style: style
    }, this.$slots.default);
  }
};

/***/ })

/******/ });

/***/ }),
/* 133 */,
/* 134 */,
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(153);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./row.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./row.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 326);
/******/ })
/************************************************************************/
/******/ ({

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(327);


/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _row = __webpack_require__(328);

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_row2.default.install = function (Vue) {
  Vue.component(_row2.default.name, _row2.default);
};

exports.default = _row2.default;

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  name: 'ElRow',

  componentName: 'ElRow',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },

  computed: {
    style: function style() {
      var ret = {};

      if (this.gutter) {
        ret.marginLeft = '-' + this.gutter / 2 + 'px';
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    }
  },

  render: function render(h) {
    return h(this.tag, {
      class: ['el-row', this.justify !== 'start' ? 'is-justify-' + this.justify : '', this.align !== 'top' ? 'is-align-' + this.align : '', { 'el-row--flex': this.type === 'flex' }],
      style: this.style
    }, this.$slots.default);
  }
};

/***/ })

/******/ });

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(152)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(180);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(98) && !__webpack_require__(102)(function () {
  return Object.defineProperty(__webpack_require__(140)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(101);
var document = __webpack_require__(93).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(95);
var toIObject = __webpack_require__(99);
var arrayIndexOf = __webpack_require__(186)(false);
var IE_PROTO = __webpack_require__(118)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(143);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 143 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(116);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(122);
var $export = __webpack_require__(114);
var redefine = __webpack_require__(146);
var hide = __webpack_require__(96);
var has = __webpack_require__(95);
var Iterators = __webpack_require__(123);
var $iterCreate = __webpack_require__(193);
var setToStringTag = __webpack_require__(124);
var getPrototypeOf = __webpack_require__(196);
var ITERATOR = __webpack_require__(100)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(96);


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(105);
var dPs = __webpack_require__(194);
var enumBugKeys = __webpack_require__(120);
var IE_PROTO = __webpack_require__(118)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(140)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(195).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(141);
var hiddenKeys = __webpack_require__(120).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(91);


/**
 *  Rule for validating required fields.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || __WEBPACK_IMPORTED_MODULE_0__util__["e" /* isEmptyValue */](value, type || rule.type))) {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages.required, rule.fullField));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (required);

/***/ }),
/* 150 */,
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.i18n = exports.use = exports.t = undefined;

var _zhCN = __webpack_require__(235);

var _zhCN2 = _interopRequireDefault(_zhCN);

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _deepmerge = __webpack_require__(236);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _format = __webpack_require__(237);

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = (0, _format2.default)(_vue2.default);
var lang = _zhCN2.default;
var merged = false;
var i18nHandler = function i18nHandler() {
  var vuei18n = Object.getPrototypeOf(this || _vue2.default).$t;
  if (typeof vuei18n === 'function' && !!_vue2.default.locale) {
    if (!merged) {
      merged = true;
      _vue2.default.locale(_vue2.default.config.lang, (0, _deepmerge2.default)(lang, _vue2.default.locale(_vue2.default.config.lang) || {}, { clone: true }));
    }
    return vuei18n.apply(this, arguments);
  }
};

var t = exports.t = function t(path, options) {
  var value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  var array = path.split('.');
  var current = lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

var use = exports.use = function use(l) {
  lang = l || lang;
};

var i18n = exports.i18n = function i18n(fn) {
  i18nHandler = fn || i18nHandler;
};

exports.default = { use: use, t: t, i18n: i18n };

/***/ }),
/* 152 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".el-row{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.el-row::after,.el-row::before{display:table;content:\"\"}.el-row::after{clear:both}.el-row--flex{display:-webkit-box;display:-ms-flexbox;display:flex}.el-row--flex:after,.el-row--flex:before{display:none}.el-row--flex.is-justify-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.el-row--flex.is-justify-end{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.el-row--flex.is-justify-space-between{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.el-row--flex.is-justify-space-around{-ms-flex-pack:distribute;justify-content:space-around}.el-row--flex.is-align-middle{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.el-row--flex.is-align-bottom{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}", ""]);

// exports


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".el-col-pull-1,.el-col-pull-10,.el-col-pull-11,.el-col-pull-12,.el-col-pull-13,.el-col-pull-14,.el-col-pull-15,.el-col-pull-16,.el-col-pull-17,.el-col-pull-18,.el-col-pull-19,.el-col-pull-2,.el-col-pull-20,.el-col-pull-21,.el-col-pull-22,.el-col-pull-23,.el-col-pull-24,.el-col-pull-3,.el-col-pull-4,.el-col-pull-5,.el-col-pull-6,.el-col-pull-7,.el-col-pull-8,.el-col-pull-9,.el-col-push-1,.el-col-push-10,.el-col-push-11,.el-col-push-13,.el-col-push-14,.el-col-push-15,.el-col-push-16,.el-col-push-17,.el-col-push-18,.el-col-push-19,.el-col-push-2,.el-col-push-20,.el-col-push-21,.el-col-push-22,.el-col-push-23,.el-col-push-24,.el-col-push-3,.el-col-push-4,.el-col-push-5,.el-col-push-6,.el-col-push-7,.el-col-push-8,.el-col-push-9{position:relative}[class*=el-col-]{float:left;-webkit-box-sizing:border-box;box-sizing:border-box}.el-col-0{display:none}.el-col-1{width:4.16667%}.el-col-offset-1{margin-left:4.16667%}.el-col-pull-1{right:4.16667%}.el-col-push-1{left:4.16667%}.el-col-2{width:8.33333%}.el-col-offset-2{margin-left:8.33333%}.el-col-pull-2{right:8.33333%}.el-col-push-2{left:8.33333%}.el-col-3{width:12.5%}.el-col-offset-3{margin-left:12.5%}.el-col-pull-3{right:12.5%}.el-col-push-3{left:12.5%}.el-col-4{width:16.66667%}.el-col-offset-4{margin-left:16.66667%}.el-col-pull-4{right:16.66667%}.el-col-push-4{left:16.66667%}.el-col-5{width:20.83333%}.el-col-offset-5{margin-left:20.83333%}.el-col-pull-5{right:20.83333%}.el-col-push-5{left:20.83333%}.el-col-6{width:25%}.el-col-offset-6{margin-left:25%}.el-col-pull-6{right:25%}.el-col-push-6{left:25%}.el-col-7{width:29.16667%}.el-col-offset-7{margin-left:29.16667%}.el-col-pull-7{right:29.16667%}.el-col-push-7{left:29.16667%}.el-col-8{width:33.33333%}.el-col-offset-8{margin-left:33.33333%}.el-col-pull-8{right:33.33333%}.el-col-push-8{left:33.33333%}.el-col-9{width:37.5%}.el-col-offset-9{margin-left:37.5%}.el-col-pull-9{right:37.5%}.el-col-push-9{left:37.5%}.el-col-10{width:41.66667%}.el-col-offset-10{margin-left:41.66667%}.el-col-pull-10{right:41.66667%}.el-col-push-10{left:41.66667%}.el-col-11{width:45.83333%}.el-col-offset-11{margin-left:45.83333%}.el-col-pull-11{right:45.83333%}.el-col-push-11{left:45.83333%}.el-col-12{width:50%}.el-col-offset-12{margin-left:50%}.el-col-pull-12{right:50%}.el-col-push-12{position:relative;left:50%}.el-col-13{width:54.16667%}.el-col-offset-13{margin-left:54.16667%}.el-col-pull-13{right:54.16667%}.el-col-push-13{left:54.16667%}.el-col-14{width:58.33333%}.el-col-offset-14{margin-left:58.33333%}.el-col-pull-14{right:58.33333%}.el-col-push-14{left:58.33333%}.el-col-15{width:62.5%}.el-col-offset-15{margin-left:62.5%}.el-col-pull-15{right:62.5%}.el-col-push-15{left:62.5%}.el-col-16{width:66.66667%}.el-col-offset-16{margin-left:66.66667%}.el-col-pull-16{right:66.66667%}.el-col-push-16{left:66.66667%}.el-col-17{width:70.83333%}.el-col-offset-17{margin-left:70.83333%}.el-col-pull-17{right:70.83333%}.el-col-push-17{left:70.83333%}.el-col-18{width:75%}.el-col-offset-18{margin-left:75%}.el-col-pull-18{right:75%}.el-col-push-18{left:75%}.el-col-19{width:79.16667%}.el-col-offset-19{margin-left:79.16667%}.el-col-pull-19{right:79.16667%}.el-col-push-19{left:79.16667%}.el-col-20{width:83.33333%}.el-col-offset-20{margin-left:83.33333%}.el-col-pull-20{right:83.33333%}.el-col-push-20{left:83.33333%}.el-col-21{width:87.5%}.el-col-offset-21{margin-left:87.5%}.el-col-pull-21{right:87.5%}.el-col-push-21{left:87.5%}.el-col-22{width:91.66667%}.el-col-offset-22{margin-left:91.66667%}.el-col-pull-22{right:91.66667%}.el-col-push-22{left:91.66667%}.el-col-23{width:95.83333%}.el-col-offset-23{margin-left:95.83333%}.el-col-pull-23{right:95.83333%}.el-col-push-23{left:95.83333%}.el-col-24{width:100%}.el-col-offset-24{margin-left:100%}.el-col-pull-24{right:100%}.el-col-push-24{left:100%}@media only screen and (max-width:768px){.el-col-xs-0{display:none}.el-col-xs-1{width:4.16667%}.el-col-xs-offset-1{margin-left:4.16667%}.el-col-xs-pull-1{position:relative;right:4.16667%}.el-col-xs-push-1{position:relative;left:4.16667%}.el-col-xs-2{width:8.33333%}.el-col-xs-offset-2{margin-left:8.33333%}.el-col-xs-pull-2{position:relative;right:8.33333%}.el-col-xs-push-2{position:relative;left:8.33333%}.el-col-xs-3{width:12.5%}.el-col-xs-offset-3{margin-left:12.5%}.el-col-xs-pull-3{position:relative;right:12.5%}.el-col-xs-push-3{position:relative;left:12.5%}.el-col-xs-4{width:16.66667%}.el-col-xs-offset-4{margin-left:16.66667%}.el-col-xs-pull-4{position:relative;right:16.66667%}.el-col-xs-push-4{position:relative;left:16.66667%}.el-col-xs-5{width:20.83333%}.el-col-xs-offset-5{margin-left:20.83333%}.el-col-xs-pull-5{position:relative;right:20.83333%}.el-col-xs-push-5{position:relative;left:20.83333%}.el-col-xs-6{width:25%}.el-col-xs-offset-6{margin-left:25%}.el-col-xs-pull-6{position:relative;right:25%}.el-col-xs-push-6{position:relative;left:25%}.el-col-xs-7{width:29.16667%}.el-col-xs-offset-7{margin-left:29.16667%}.el-col-xs-pull-7{position:relative;right:29.16667%}.el-col-xs-push-7{position:relative;left:29.16667%}.el-col-xs-8{width:33.33333%}.el-col-xs-offset-8{margin-left:33.33333%}.el-col-xs-pull-8{position:relative;right:33.33333%}.el-col-xs-push-8{position:relative;left:33.33333%}.el-col-xs-9{width:37.5%}.el-col-xs-offset-9{margin-left:37.5%}.el-col-xs-pull-9{position:relative;right:37.5%}.el-col-xs-push-9{position:relative;left:37.5%}.el-col-xs-10{width:41.66667%}.el-col-xs-offset-10{margin-left:41.66667%}.el-col-xs-pull-10{position:relative;right:41.66667%}.el-col-xs-push-10{position:relative;left:41.66667%}.el-col-xs-11{width:45.83333%}.el-col-xs-offset-11{margin-left:45.83333%}.el-col-xs-pull-11{position:relative;right:45.83333%}.el-col-xs-push-11{position:relative;left:45.83333%}.el-col-xs-12{width:50%}.el-col-xs-offset-12{margin-left:50%}.el-col-xs-pull-12{position:relative;right:50%}.el-col-xs-push-12{position:relative;left:50%}.el-col-xs-13{width:54.16667%}.el-col-xs-offset-13{margin-left:54.16667%}.el-col-xs-pull-13{position:relative;right:54.16667%}.el-col-xs-push-13{position:relative;left:54.16667%}.el-col-xs-14{width:58.33333%}.el-col-xs-offset-14{margin-left:58.33333%}.el-col-xs-pull-14{position:relative;right:58.33333%}.el-col-xs-push-14{position:relative;left:58.33333%}.el-col-xs-15{width:62.5%}.el-col-xs-offset-15{margin-left:62.5%}.el-col-xs-pull-15{position:relative;right:62.5%}.el-col-xs-push-15{position:relative;left:62.5%}.el-col-xs-16{width:66.66667%}.el-col-xs-offset-16{margin-left:66.66667%}.el-col-xs-pull-16{position:relative;right:66.66667%}.el-col-xs-push-16{position:relative;left:66.66667%}.el-col-xs-17{width:70.83333%}.el-col-xs-offset-17{margin-left:70.83333%}.el-col-xs-pull-17{position:relative;right:70.83333%}.el-col-xs-push-17{position:relative;left:70.83333%}.el-col-xs-18{width:75%}.el-col-xs-offset-18{margin-left:75%}.el-col-xs-pull-18{position:relative;right:75%}.el-col-xs-push-18{position:relative;left:75%}.el-col-xs-19{width:79.16667%}.el-col-xs-offset-19{margin-left:79.16667%}.el-col-xs-pull-19{position:relative;right:79.16667%}.el-col-xs-push-19{position:relative;left:79.16667%}.el-col-xs-20{width:83.33333%}.el-col-xs-offset-20{margin-left:83.33333%}.el-col-xs-pull-20{position:relative;right:83.33333%}.el-col-xs-push-20{position:relative;left:83.33333%}.el-col-xs-21{width:87.5%}.el-col-xs-offset-21{margin-left:87.5%}.el-col-xs-pull-21{position:relative;right:87.5%}.el-col-xs-push-21{position:relative;left:87.5%}.el-col-xs-22{width:91.66667%}.el-col-xs-offset-22{margin-left:91.66667%}.el-col-xs-pull-22{position:relative;right:91.66667%}.el-col-xs-push-22{position:relative;left:91.66667%}.el-col-xs-23{width:95.83333%}.el-col-xs-offset-23{margin-left:95.83333%}.el-col-xs-pull-23{position:relative;right:95.83333%}.el-col-xs-push-23{position:relative;left:95.83333%}.el-col-xs-24{width:100%}.el-col-xs-offset-24{margin-left:100%}.el-col-xs-pull-24{position:relative;right:100%}.el-col-xs-push-24{position:relative;left:100%}}@media only screen and (min-width:768px){.el-col-sm-0{display:none}.el-col-sm-1{width:4.16667%}.el-col-sm-offset-1{margin-left:4.16667%}.el-col-sm-pull-1{position:relative;right:4.16667%}.el-col-sm-push-1{position:relative;left:4.16667%}.el-col-sm-2{width:8.33333%}.el-col-sm-offset-2{margin-left:8.33333%}.el-col-sm-pull-2{position:relative;right:8.33333%}.el-col-sm-push-2{position:relative;left:8.33333%}.el-col-sm-3{width:12.5%}.el-col-sm-offset-3{margin-left:12.5%}.el-col-sm-pull-3{position:relative;right:12.5%}.el-col-sm-push-3{position:relative;left:12.5%}.el-col-sm-4{width:16.66667%}.el-col-sm-offset-4{margin-left:16.66667%}.el-col-sm-pull-4{position:relative;right:16.66667%}.el-col-sm-push-4{position:relative;left:16.66667%}.el-col-sm-5{width:20.83333%}.el-col-sm-offset-5{margin-left:20.83333%}.el-col-sm-pull-5{position:relative;right:20.83333%}.el-col-sm-push-5{position:relative;left:20.83333%}.el-col-sm-6{width:25%}.el-col-sm-offset-6{margin-left:25%}.el-col-sm-pull-6{position:relative;right:25%}.el-col-sm-push-6{position:relative;left:25%}.el-col-sm-7{width:29.16667%}.el-col-sm-offset-7{margin-left:29.16667%}.el-col-sm-pull-7{position:relative;right:29.16667%}.el-col-sm-push-7{position:relative;left:29.16667%}.el-col-sm-8{width:33.33333%}.el-col-sm-offset-8{margin-left:33.33333%}.el-col-sm-pull-8{position:relative;right:33.33333%}.el-col-sm-push-8{position:relative;left:33.33333%}.el-col-sm-9{width:37.5%}.el-col-sm-offset-9{margin-left:37.5%}.el-col-sm-pull-9{position:relative;right:37.5%}.el-col-sm-push-9{position:relative;left:37.5%}.el-col-sm-10{width:41.66667%}.el-col-sm-offset-10{margin-left:41.66667%}.el-col-sm-pull-10{position:relative;right:41.66667%}.el-col-sm-push-10{position:relative;left:41.66667%}.el-col-sm-11{width:45.83333%}.el-col-sm-offset-11{margin-left:45.83333%}.el-col-sm-pull-11{position:relative;right:45.83333%}.el-col-sm-push-11{position:relative;left:45.83333%}.el-col-sm-12{width:50%}.el-col-sm-offset-12{margin-left:50%}.el-col-sm-pull-12{position:relative;right:50%}.el-col-sm-push-12{position:relative;left:50%}.el-col-sm-13{width:54.16667%}.el-col-sm-offset-13{margin-left:54.16667%}.el-col-sm-pull-13{position:relative;right:54.16667%}.el-col-sm-push-13{position:relative;left:54.16667%}.el-col-sm-14{width:58.33333%}.el-col-sm-offset-14{margin-left:58.33333%}.el-col-sm-pull-14{position:relative;right:58.33333%}.el-col-sm-push-14{position:relative;left:58.33333%}.el-col-sm-15{width:62.5%}.el-col-sm-offset-15{margin-left:62.5%}.el-col-sm-pull-15{position:relative;right:62.5%}.el-col-sm-push-15{position:relative;left:62.5%}.el-col-sm-16{width:66.66667%}.el-col-sm-offset-16{margin-left:66.66667%}.el-col-sm-pull-16{position:relative;right:66.66667%}.el-col-sm-push-16{position:relative;left:66.66667%}.el-col-sm-17{width:70.83333%}.el-col-sm-offset-17{margin-left:70.83333%}.el-col-sm-pull-17{position:relative;right:70.83333%}.el-col-sm-push-17{position:relative;left:70.83333%}.el-col-sm-18{width:75%}.el-col-sm-offset-18{margin-left:75%}.el-col-sm-pull-18{position:relative;right:75%}.el-col-sm-push-18{position:relative;left:75%}.el-col-sm-19{width:79.16667%}.el-col-sm-offset-19{margin-left:79.16667%}.el-col-sm-pull-19{position:relative;right:79.16667%}.el-col-sm-push-19{position:relative;left:79.16667%}.el-col-sm-20{width:83.33333%}.el-col-sm-offset-20{margin-left:83.33333%}.el-col-sm-pull-20{position:relative;right:83.33333%}.el-col-sm-push-20{position:relative;left:83.33333%}.el-col-sm-21{width:87.5%}.el-col-sm-offset-21{margin-left:87.5%}.el-col-sm-pull-21{position:relative;right:87.5%}.el-col-sm-push-21{position:relative;left:87.5%}.el-col-sm-22{width:91.66667%}.el-col-sm-offset-22{margin-left:91.66667%}.el-col-sm-pull-22{position:relative;right:91.66667%}.el-col-sm-push-22{position:relative;left:91.66667%}.el-col-sm-23{width:95.83333%}.el-col-sm-offset-23{margin-left:95.83333%}.el-col-sm-pull-23{position:relative;right:95.83333%}.el-col-sm-push-23{position:relative;left:95.83333%}.el-col-sm-24{width:100%}.el-col-sm-offset-24{margin-left:100%}.el-col-sm-pull-24{position:relative;right:100%}.el-col-sm-push-24{position:relative;left:100%}}@media only screen and (min-width:992px){.el-col-md-0{display:none}.el-col-md-1{width:4.16667%}.el-col-md-offset-1{margin-left:4.16667%}.el-col-md-pull-1{position:relative;right:4.16667%}.el-col-md-push-1{position:relative;left:4.16667%}.el-col-md-2{width:8.33333%}.el-col-md-offset-2{margin-left:8.33333%}.el-col-md-pull-2{position:relative;right:8.33333%}.el-col-md-push-2{position:relative;left:8.33333%}.el-col-md-3{width:12.5%}.el-col-md-offset-3{margin-left:12.5%}.el-col-md-pull-3{position:relative;right:12.5%}.el-col-md-push-3{position:relative;left:12.5%}.el-col-md-4{width:16.66667%}.el-col-md-offset-4{margin-left:16.66667%}.el-col-md-pull-4{position:relative;right:16.66667%}.el-col-md-push-4{position:relative;left:16.66667%}.el-col-md-5{width:20.83333%}.el-col-md-offset-5{margin-left:20.83333%}.el-col-md-pull-5{position:relative;right:20.83333%}.el-col-md-push-5{position:relative;left:20.83333%}.el-col-md-6{width:25%}.el-col-md-offset-6{margin-left:25%}.el-col-md-pull-6{position:relative;right:25%}.el-col-md-push-6{position:relative;left:25%}.el-col-md-7{width:29.16667%}.el-col-md-offset-7{margin-left:29.16667%}.el-col-md-pull-7{position:relative;right:29.16667%}.el-col-md-push-7{position:relative;left:29.16667%}.el-col-md-8{width:33.33333%}.el-col-md-offset-8{margin-left:33.33333%}.el-col-md-pull-8{position:relative;right:33.33333%}.el-col-md-push-8{position:relative;left:33.33333%}.el-col-md-9{width:37.5%}.el-col-md-offset-9{margin-left:37.5%}.el-col-md-pull-9{position:relative;right:37.5%}.el-col-md-push-9{position:relative;left:37.5%}.el-col-md-10{width:41.66667%}.el-col-md-offset-10{margin-left:41.66667%}.el-col-md-pull-10{position:relative;right:41.66667%}.el-col-md-push-10{position:relative;left:41.66667%}.el-col-md-11{width:45.83333%}.el-col-md-offset-11{margin-left:45.83333%}.el-col-md-pull-11{position:relative;right:45.83333%}.el-col-md-push-11{position:relative;left:45.83333%}.el-col-md-12{width:50%}.el-col-md-offset-12{margin-left:50%}.el-col-md-pull-12{position:relative;right:50%}.el-col-md-push-12{position:relative;left:50%}.el-col-md-13{width:54.16667%}.el-col-md-offset-13{margin-left:54.16667%}.el-col-md-pull-13{position:relative;right:54.16667%}.el-col-md-push-13{position:relative;left:54.16667%}.el-col-md-14{width:58.33333%}.el-col-md-offset-14{margin-left:58.33333%}.el-col-md-pull-14{position:relative;right:58.33333%}.el-col-md-push-14{position:relative;left:58.33333%}.el-col-md-15{width:62.5%}.el-col-md-offset-15{margin-left:62.5%}.el-col-md-pull-15{position:relative;right:62.5%}.el-col-md-push-15{position:relative;left:62.5%}.el-col-md-16{width:66.66667%}.el-col-md-offset-16{margin-left:66.66667%}.el-col-md-pull-16{position:relative;right:66.66667%}.el-col-md-push-16{position:relative;left:66.66667%}.el-col-md-17{width:70.83333%}.el-col-md-offset-17{margin-left:70.83333%}.el-col-md-pull-17{position:relative;right:70.83333%}.el-col-md-push-17{position:relative;left:70.83333%}.el-col-md-18{width:75%}.el-col-md-offset-18{margin-left:75%}.el-col-md-pull-18{position:relative;right:75%}.el-col-md-push-18{position:relative;left:75%}.el-col-md-19{width:79.16667%}.el-col-md-offset-19{margin-left:79.16667%}.el-col-md-pull-19{position:relative;right:79.16667%}.el-col-md-push-19{position:relative;left:79.16667%}.el-col-md-20{width:83.33333%}.el-col-md-offset-20{margin-left:83.33333%}.el-col-md-pull-20{position:relative;right:83.33333%}.el-col-md-push-20{position:relative;left:83.33333%}.el-col-md-21{width:87.5%}.el-col-md-offset-21{margin-left:87.5%}.el-col-md-pull-21{position:relative;right:87.5%}.el-col-md-push-21{position:relative;left:87.5%}.el-col-md-22{width:91.66667%}.el-col-md-offset-22{margin-left:91.66667%}.el-col-md-pull-22{position:relative;right:91.66667%}.el-col-md-push-22{position:relative;left:91.66667%}.el-col-md-23{width:95.83333%}.el-col-md-offset-23{margin-left:95.83333%}.el-col-md-pull-23{position:relative;right:95.83333%}.el-col-md-push-23{position:relative;left:95.83333%}.el-col-md-24{width:100%}.el-col-md-offset-24{margin-left:100%}.el-col-md-pull-24{position:relative;right:100%}.el-col-md-push-24{position:relative;left:100%}}@media only screen and (min-width:1200px){.el-col-lg-0{display:none}.el-col-lg-1{width:4.16667%}.el-col-lg-offset-1{margin-left:4.16667%}.el-col-lg-pull-1{position:relative;right:4.16667%}.el-col-lg-push-1{position:relative;left:4.16667%}.el-col-lg-2{width:8.33333%}.el-col-lg-offset-2{margin-left:8.33333%}.el-col-lg-pull-2{position:relative;right:8.33333%}.el-col-lg-push-2{position:relative;left:8.33333%}.el-col-lg-3{width:12.5%}.el-col-lg-offset-3{margin-left:12.5%}.el-col-lg-pull-3{position:relative;right:12.5%}.el-col-lg-push-3{position:relative;left:12.5%}.el-col-lg-4{width:16.66667%}.el-col-lg-offset-4{margin-left:16.66667%}.el-col-lg-pull-4{position:relative;right:16.66667%}.el-col-lg-push-4{position:relative;left:16.66667%}.el-col-lg-5{width:20.83333%}.el-col-lg-offset-5{margin-left:20.83333%}.el-col-lg-pull-5{position:relative;right:20.83333%}.el-col-lg-push-5{position:relative;left:20.83333%}.el-col-lg-6{width:25%}.el-col-lg-offset-6{margin-left:25%}.el-col-lg-pull-6{position:relative;right:25%}.el-col-lg-push-6{position:relative;left:25%}.el-col-lg-7{width:29.16667%}.el-col-lg-offset-7{margin-left:29.16667%}.el-col-lg-pull-7{position:relative;right:29.16667%}.el-col-lg-push-7{position:relative;left:29.16667%}.el-col-lg-8{width:33.33333%}.el-col-lg-offset-8{margin-left:33.33333%}.el-col-lg-pull-8{position:relative;right:33.33333%}.el-col-lg-push-8{position:relative;left:33.33333%}.el-col-lg-9{width:37.5%}.el-col-lg-offset-9{margin-left:37.5%}.el-col-lg-pull-9{position:relative;right:37.5%}.el-col-lg-push-9{position:relative;left:37.5%}.el-col-lg-10{width:41.66667%}.el-col-lg-offset-10{margin-left:41.66667%}.el-col-lg-pull-10{position:relative;right:41.66667%}.el-col-lg-push-10{position:relative;left:41.66667%}.el-col-lg-11{width:45.83333%}.el-col-lg-offset-11{margin-left:45.83333%}.el-col-lg-pull-11{position:relative;right:45.83333%}.el-col-lg-push-11{position:relative;left:45.83333%}.el-col-lg-12{width:50%}.el-col-lg-offset-12{margin-left:50%}.el-col-lg-pull-12{position:relative;right:50%}.el-col-lg-push-12{position:relative;left:50%}.el-col-lg-13{width:54.16667%}.el-col-lg-offset-13{margin-left:54.16667%}.el-col-lg-pull-13{position:relative;right:54.16667%}.el-col-lg-push-13{position:relative;left:54.16667%}.el-col-lg-14{width:58.33333%}.el-col-lg-offset-14{margin-left:58.33333%}.el-col-lg-pull-14{position:relative;right:58.33333%}.el-col-lg-push-14{position:relative;left:58.33333%}.el-col-lg-15{width:62.5%}.el-col-lg-offset-15{margin-left:62.5%}.el-col-lg-pull-15{position:relative;right:62.5%}.el-col-lg-push-15{position:relative;left:62.5%}.el-col-lg-16{width:66.66667%}.el-col-lg-offset-16{margin-left:66.66667%}.el-col-lg-pull-16{position:relative;right:66.66667%}.el-col-lg-push-16{position:relative;left:66.66667%}.el-col-lg-17{width:70.83333%}.el-col-lg-offset-17{margin-left:70.83333%}.el-col-lg-pull-17{position:relative;right:70.83333%}.el-col-lg-push-17{position:relative;left:70.83333%}.el-col-lg-18{width:75%}.el-col-lg-offset-18{margin-left:75%}.el-col-lg-pull-18{position:relative;right:75%}.el-col-lg-push-18{position:relative;left:75%}.el-col-lg-19{width:79.16667%}.el-col-lg-offset-19{margin-left:79.16667%}.el-col-lg-pull-19{position:relative;right:79.16667%}.el-col-lg-push-19{position:relative;left:79.16667%}.el-col-lg-20{width:83.33333%}.el-col-lg-offset-20{margin-left:83.33333%}.el-col-lg-pull-20{position:relative;right:83.33333%}.el-col-lg-push-20{position:relative;left:83.33333%}.el-col-lg-21{width:87.5%}.el-col-lg-offset-21{margin-left:87.5%}.el-col-lg-pull-21{position:relative;right:87.5%}.el-col-lg-push-21{position:relative;left:87.5%}.el-col-lg-22{width:91.66667%}.el-col-lg-offset-22{margin-left:91.66667%}.el-col-lg-pull-22{position:relative;right:91.66667%}.el-col-lg-push-22{position:relative;left:91.66667%}.el-col-lg-23{width:95.83333%}.el-col-lg-offset-23{margin-left:95.83333%}.el-col-lg-pull-23{position:relative;right:95.83333%}.el-col-lg-push-23{position:relative;left:95.83333%}.el-col-lg-24{width:100%}.el-col-lg-offset-24{margin-left:100%}.el-col-lg-pull-24{position:relative;right:100%}.el-col-lg-push-24{position:relative;left:100%}}@media only screen and (min-width:1920px){.el-col-xl-0{display:none}.el-col-xl-1{width:4.16667%}.el-col-xl-offset-1{margin-left:4.16667%}.el-col-xl-pull-1{position:relative;right:4.16667%}.el-col-xl-push-1{position:relative;left:4.16667%}.el-col-xl-2{width:8.33333%}.el-col-xl-offset-2{margin-left:8.33333%}.el-col-xl-pull-2{position:relative;right:8.33333%}.el-col-xl-push-2{position:relative;left:8.33333%}.el-col-xl-3{width:12.5%}.el-col-xl-offset-3{margin-left:12.5%}.el-col-xl-pull-3{position:relative;right:12.5%}.el-col-xl-push-3{position:relative;left:12.5%}.el-col-xl-4{width:16.66667%}.el-col-xl-offset-4{margin-left:16.66667%}.el-col-xl-pull-4{position:relative;right:16.66667%}.el-col-xl-push-4{position:relative;left:16.66667%}.el-col-xl-5{width:20.83333%}.el-col-xl-offset-5{margin-left:20.83333%}.el-col-xl-pull-5{position:relative;right:20.83333%}.el-col-xl-push-5{position:relative;left:20.83333%}.el-col-xl-6{width:25%}.el-col-xl-offset-6{margin-left:25%}.el-col-xl-pull-6{position:relative;right:25%}.el-col-xl-push-6{position:relative;left:25%}.el-col-xl-7{width:29.16667%}.el-col-xl-offset-7{margin-left:29.16667%}.el-col-xl-pull-7{position:relative;right:29.16667%}.el-col-xl-push-7{position:relative;left:29.16667%}.el-col-xl-8{width:33.33333%}.el-col-xl-offset-8{margin-left:33.33333%}.el-col-xl-pull-8{position:relative;right:33.33333%}.el-col-xl-push-8{position:relative;left:33.33333%}.el-col-xl-9{width:37.5%}.el-col-xl-offset-9{margin-left:37.5%}.el-col-xl-pull-9{position:relative;right:37.5%}.el-col-xl-push-9{position:relative;left:37.5%}.el-col-xl-10{width:41.66667%}.el-col-xl-offset-10{margin-left:41.66667%}.el-col-xl-pull-10{position:relative;right:41.66667%}.el-col-xl-push-10{position:relative;left:41.66667%}.el-col-xl-11{width:45.83333%}.el-col-xl-offset-11{margin-left:45.83333%}.el-col-xl-pull-11{position:relative;right:45.83333%}.el-col-xl-push-11{position:relative;left:45.83333%}.el-col-xl-12{width:50%}.el-col-xl-offset-12{margin-left:50%}.el-col-xl-pull-12{position:relative;right:50%}.el-col-xl-push-12{position:relative;left:50%}.el-col-xl-13{width:54.16667%}.el-col-xl-offset-13{margin-left:54.16667%}.el-col-xl-pull-13{position:relative;right:54.16667%}.el-col-xl-push-13{position:relative;left:54.16667%}.el-col-xl-14{width:58.33333%}.el-col-xl-offset-14{margin-left:58.33333%}.el-col-xl-pull-14{position:relative;right:58.33333%}.el-col-xl-push-14{position:relative;left:58.33333%}.el-col-xl-15{width:62.5%}.el-col-xl-offset-15{margin-left:62.5%}.el-col-xl-pull-15{position:relative;right:62.5%}.el-col-xl-push-15{position:relative;left:62.5%}.el-col-xl-16{width:66.66667%}.el-col-xl-offset-16{margin-left:66.66667%}.el-col-xl-pull-16{position:relative;right:66.66667%}.el-col-xl-push-16{position:relative;left:66.66667%}.el-col-xl-17{width:70.83333%}.el-col-xl-offset-17{margin-left:70.83333%}.el-col-xl-pull-17{position:relative;right:70.83333%}.el-col-xl-push-17{position:relative;left:70.83333%}.el-col-xl-18{width:75%}.el-col-xl-offset-18{margin-left:75%}.el-col-xl-pull-18{position:relative;right:75%}.el-col-xl-push-18{position:relative;left:75%}.el-col-xl-19{width:79.16667%}.el-col-xl-offset-19{margin-left:79.16667%}.el-col-xl-pull-19{position:relative;right:79.16667%}.el-col-xl-push-19{position:relative;left:79.16667%}.el-col-xl-20{width:83.33333%}.el-col-xl-offset-20{margin-left:83.33333%}.el-col-xl-pull-20{position:relative;right:83.33333%}.el-col-xl-push-20{position:relative;left:83.33333%}.el-col-xl-21{width:87.5%}.el-col-xl-offset-21{margin-left:87.5%}.el-col-xl-pull-21{position:relative;right:87.5%}.el-col-xl-push-21{position:relative;left:87.5%}.el-col-xl-22{width:91.66667%}.el-col-xl-offset-22{margin-left:91.66667%}.el-col-xl-pull-22{position:relative;right:91.66667%}.el-col-xl-push-22{position:relative;left:91.66667%}.el-col-xl-23{width:95.83333%}.el-col-xl-offset-23{margin-left:95.83333%}.el-col-xl-pull-23{position:relative;right:95.83333%}.el-col-xl-push-23{position:relative;left:95.83333%}.el-col-xl-24{width:100%}.el-col-xl-offset-24{margin-left:100%}.el-col-xl-pull-24{position:relative;right:100%}.el-col-xl-push-24{position:relative;left:100%}}", ""]);

// exports


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(156);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./main.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".el-main{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto;-webkit-box-sizing:border-box;box-sizing:border-box;padding:20px}", ""]);

// exports


/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 461);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(462);


/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _main = __webpack_require__(463);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_76da1255_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__ = __webpack_require__(465);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_76da1255_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
//
//
//
//
//
//

exports.default = {
  name: 'ElMain',
  componentName: 'ElMain'
};

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{staticClass:"el-main"},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(159);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./container.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./container.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".el-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:0}.el-container.is-vertical{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}", ""]);

// exports


/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 446);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(447);


/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _main = __webpack_require__(448);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_956d8bb2_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__ = __webpack_require__(450);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_956d8bb2_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
//
//
//
//
//
//

exports.default = {
  name: 'ElContainer',

  componentName: 'ElContainer',

  props: {
    direction: String
  },

  computed: {
    isVertical: function isVertical() {
      if (this.direction === 'vertical') {
        return true;
      } else if (this.direction === 'horizontal') {
        return false;
      }
      return this.$slots && this.$slots.default ? this.$slots.default.some(function (vnode) {
        var tag = vnode.componentOptions && vnode.componentOptions.tag;
        return tag === 'el-header' || tag === 'el-footer';
      }) : false;
    }
  }
};

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"el-container",class:{ 'is-vertical': _vm.isVertical }},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 161 */,
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".el-input{position:relative;font-size:14px;display:inline-block;width:100%}.el-input::-webkit-scrollbar{z-index:11;width:6px}.el-input::-webkit-scrollbar:horizontal{height:6px}.el-input::-webkit-scrollbar-thumb{border-radius:5px;width:6px;background:#b4bccc}.el-input::-webkit-scrollbar-corner{background:#fff}.el-input::-webkit-scrollbar-track{background:#fff}.el-input::-webkit-scrollbar-track-piece{background:#fff;width:6px}.el-input .el-input__clear{color:#c0c4cc;font-size:14px;line-height:16px;cursor:pointer;-webkit-transition:color .2s cubic-bezier(.645,.045,.355,1);transition:color .2s cubic-bezier(.645,.045,.355,1)}.el-input .el-input__clear:hover{color:#909399}.el-input__inner{-webkit-appearance:none;background-color:#fff;background-image:none;border-radius:4px;border:1px solid #dcdfe6;-webkit-box-sizing:border-box;box-sizing:border-box;color:#606266;display:inline-block;font-size:inherit;height:40px;line-height:1;outline:0;padding:0 15px;-webkit-transition:border-color .2s cubic-bezier(.645,.045,.355,1);transition:border-color .2s cubic-bezier(.645,.045,.355,1);width:100%}.el-input__prefix,.el-input__suffix{position:absolute;top:0;-webkit-transition:all .3s;text-align:center;height:100%;color:#c0c4cc}.el-input__inner::-webkit-input-placeholder{color:#c0c4cc}.el-input__inner:-ms-input-placeholder{color:#c0c4cc}.el-input__inner::placeholder{color:#c0c4cc}.el-input__inner:hover{border-color:#c0c4cc}.el-input.is-active .el-input__inner,.el-input__inner:focus{border-color:#409EFF;outline:0}.el-input__suffix{right:5px;transition:all .3s;pointer-events:none}.el-input__suffix-inner{pointer-events:all}.el-input__prefix{left:5px;transition:all .3s}.el-input__icon{height:100%;width:25px;text-align:center;-webkit-transition:all .3s;transition:all .3s;line-height:40px}.el-input__icon:after{content:'';height:100%;width:0;display:inline-block;vertical-align:middle}.el-input__validateIcon{pointer-events:none}.el-input.is-disabled .el-input__inner{background-color:#f5f7fa;border-color:#e4e7ed;color:#c0c4cc;cursor:not-allowed}.el-input.is-disabled .el-input__inner::-webkit-input-placeholder{color:#c0c4cc}.el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:#c0c4cc}.el-input.is-disabled .el-input__inner::placeholder{color:#c0c4cc}.el-input.is-disabled .el-input__icon{cursor:not-allowed}.el-input--suffix .el-input__inner{padding-right:30px}.el-input--prefix .el-input__inner{padding-left:30px}.el-input--medium{font-size:14px}.el-input--medium .el-input__inner{height:36px}.el-input--medium .el-input__icon{line-height:36px}.el-input--small{font-size:13px}.el-input--small .el-input__inner{height:32px}.el-input--small .el-input__icon{line-height:32px}.el-input--mini{font-size:12px}.el-input--mini .el-input__inner{height:28px}.el-input--mini .el-input__icon{line-height:28px}.el-input-group{line-height:normal;display:inline-table;width:100%;border-collapse:separate}.el-input-group>.el-input__inner{vertical-align:middle;display:table-cell}.el-input-group__append,.el-input-group__prepend{background-color:#f5f7fa;color:#909399;vertical-align:middle;display:table-cell;position:relative;border:1px solid #dcdfe6;border-radius:4px;padding:0 20px;width:1px;white-space:nowrap}.el-input-group--prepend .el-input__inner,.el-input-group__append{border-top-left-radius:0;border-bottom-left-radius:0}.el-input-group--append .el-input__inner,.el-input-group__prepend{border-top-right-radius:0;border-bottom-right-radius:0}.el-input-group__append:focus,.el-input-group__prepend:focus{outline:0}.el-input-group__append .el-button,.el-input-group__append .el-select,.el-input-group__prepend .el-button,.el-input-group__prepend .el-select{display:inline-block;margin:-20px}.el-input-group__append button.el-button,.el-input-group__append div.el-select .el-input__inner,.el-input-group__append div.el-select:hover .el-input__inner,.el-input-group__prepend button.el-button,.el-input-group__prepend div.el-select .el-input__inner,.el-input-group__prepend div.el-select:hover .el-input__inner{border-color:transparent;background-color:transparent;color:inherit;border-top:0;border-bottom:0}.el-input-group__append .el-button,.el-input-group__append .el-input,.el-input-group__prepend .el-button,.el-input-group__prepend .el-input{font-size:inherit}.el-input-group__prepend{border-right:0}.el-input-group__append{border-left:0}.el-input-group--append .el-select .el-input.is-focus .el-input__inner,.el-input-group--prepend .el-select .el-input.is-focus .el-input__inner{border-color:transparent}.el-textarea{display:inline-block;width:100%;vertical-align:bottom;font-size:14px}.el-textarea__inner{display:block;resize:vertical;padding:5px 15px;line-height:1.5;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;font-size:inherit;color:#606266;background-color:#fff;background-image:none;border:1px solid #dcdfe6;border-radius:4px;-webkit-transition:border-color .2s cubic-bezier(.645,.045,.355,1);transition:border-color .2s cubic-bezier(.645,.045,.355,1)}.el-textarea__inner::-webkit-input-placeholder{color:#c0c4cc}.el-textarea__inner:-ms-input-placeholder{color:#c0c4cc}.el-textarea__inner::placeholder{color:#c0c4cc}.el-textarea__inner:hover{border-color:#c0c4cc}.el-textarea__inner:focus{outline:0;border-color:#409EFF}.el-textarea.is-disabled .el-textarea__inner{background-color:#f5f7fa;border-color:#e4e7ed;color:#c0c4cc;cursor:not-allowed}.el-textarea.is-disabled .el-textarea__inner::-webkit-input-placeholder{color:#c0c4cc}.el-textarea.is-disabled .el-textarea__inner:-ms-input-placeholder{color:#c0c4cc}.el-textarea.is-disabled .el-textarea__inner::placeholder{color:#c0c4cc}", ""]);

// exports


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".el-button{display:inline-block;line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;color:#606266;-webkit-appearance:none;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;outline:0;margin:0;-webkit-transition:.1s;transition:.1s;font-weight:500;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:12px 20px;font-size:14px;border-radius:4px}.el-button+.el-button{margin-left:10px}.el-button:focus,.el-button:hover{color:#409EFF;border-color:#c6e2ff;background-color:#ecf5ff}.el-button:active{color:#3a8ee6;border-color:#3a8ee6;outline:0}.el-button::-moz-focus-inner{border:0}.el-button [class*=el-icon-]+span{margin-left:5px}.el-button.is-plain:focus,.el-button.is-plain:hover{background:#fff;border-color:#409EFF;color:#409EFF}.el-button.is-active,.el-button.is-plain:active{color:#3a8ee6;border-color:#3a8ee6}.el-button.is-plain:active{background:#fff;outline:0}.el-button.is-disabled,.el-button.is-disabled:focus,.el-button.is-disabled:hover{color:#c0c4cc;cursor:not-allowed;background-image:none;background-color:#fff;border-color:#ebeef5}.el-button.is-disabled.el-button--text{background-color:transparent}.el-button.is-disabled.is-plain,.el-button.is-disabled.is-plain:focus,.el-button.is-disabled.is-plain:hover{background-color:#fff;border-color:#ebeef5;color:#c0c4cc}.el-button.is-loading{position:relative;pointer-events:none}.el-button.is-loading:before{pointer-events:none;content:'';position:absolute;left:-1px;top:-1px;right:-1px;bottom:-1px;border-radius:inherit;background-color:rgba(255,255,255,.35)}.el-button.is-round{border-radius:20px;padding:12px 23px}.el-button--primary{color:#fff;background-color:#409EFF;border-color:#409EFF}.el-button--primary:focus,.el-button--primary:hover{background:#66b1ff;border-color:#66b1ff;color:#fff}.el-button--primary.is-active,.el-button--primary:active{background:#3a8ee6;border-color:#3a8ee6;color:#fff}.el-button--primary:active{outline:0}.el-button--primary.is-disabled,.el-button--primary.is-disabled:active,.el-button--primary.is-disabled:focus,.el-button--primary.is-disabled:hover{color:#fff;background-color:#a0cfff;border-color:#a0cfff}.el-button--primary.is-plain{color:#409EFF;background:#ecf5ff;border-color:#b3d8ff}.el-button--primary.is-plain:focus,.el-button--primary.is-plain:hover{background:#409EFF;border-color:#409EFF;color:#fff}.el-button--primary.is-plain:active{background:#3a8ee6;border-color:#3a8ee6;color:#fff;outline:0}.el-button--primary.is-plain.is-disabled,.el-button--primary.is-plain.is-disabled:active,.el-button--primary.is-plain.is-disabled:focus,.el-button--primary.is-plain.is-disabled:hover{color:#8cc5ff;background-color:#ecf5ff;border-color:#d9ecff}.el-button--success{color:#fff;background-color:#67c23a;border-color:#67c23a}.el-button--success:focus,.el-button--success:hover{background:#85ce61;border-color:#85ce61;color:#fff}.el-button--success.is-active,.el-button--success:active{background:#5daf34;border-color:#5daf34;color:#fff}.el-button--success:active{outline:0}.el-button--success.is-disabled,.el-button--success.is-disabled:active,.el-button--success.is-disabled:focus,.el-button--success.is-disabled:hover{color:#fff;background-color:#b3e19d;border-color:#b3e19d}.el-button--success.is-plain{color:#67c23a;background:#f0f9eb;border-color:#c2e7b0}.el-button--success.is-plain:focus,.el-button--success.is-plain:hover{background:#67c23a;border-color:#67c23a;color:#fff}.el-button--success.is-plain:active{background:#5daf34;border-color:#5daf34;color:#fff;outline:0}.el-button--success.is-plain.is-disabled,.el-button--success.is-plain.is-disabled:active,.el-button--success.is-plain.is-disabled:focus,.el-button--success.is-plain.is-disabled:hover{color:#a4da89;background-color:#f0f9eb;border-color:#e1f3d8}.el-button--warning{color:#fff;background-color:#e6a23c;border-color:#e6a23c}.el-button--warning:focus,.el-button--warning:hover{background:#ebb563;border-color:#ebb563;color:#fff}.el-button--warning.is-active,.el-button--warning:active{background:#cf9236;border-color:#cf9236;color:#fff}.el-button--warning:active{outline:0}.el-button--warning.is-disabled,.el-button--warning.is-disabled:active,.el-button--warning.is-disabled:focus,.el-button--warning.is-disabled:hover{color:#fff;background-color:#f3d19e;border-color:#f3d19e}.el-button--warning.is-plain{color:#e6a23c;background:#fdf6ec;border-color:#f5dab1}.el-button--warning.is-plain:focus,.el-button--warning.is-plain:hover{background:#e6a23c;border-color:#e6a23c;color:#fff}.el-button--warning.is-plain:active{background:#cf9236;border-color:#cf9236;color:#fff;outline:0}.el-button--warning.is-plain.is-disabled,.el-button--warning.is-plain.is-disabled:active,.el-button--warning.is-plain.is-disabled:focus,.el-button--warning.is-plain.is-disabled:hover{color:#f0c78a;background-color:#fdf6ec;border-color:#faecd8}.el-button--danger{color:#fff;background-color:#f56c6c;border-color:#f56c6c}.el-button--danger:focus,.el-button--danger:hover{background:#f78989;border-color:#f78989;color:#fff}.el-button--danger.is-active,.el-button--danger:active{background:#dd6161;border-color:#dd6161;color:#fff}.el-button--danger:active{outline:0}.el-button--danger.is-disabled,.el-button--danger.is-disabled:active,.el-button--danger.is-disabled:focus,.el-button--danger.is-disabled:hover{color:#fff;background-color:#fab6b6;border-color:#fab6b6}.el-button--danger.is-plain{color:#f56c6c;background:#fef0f0;border-color:#fbc4c4}.el-button--danger.is-plain:focus,.el-button--danger.is-plain:hover{background:#f56c6c;border-color:#f56c6c;color:#fff}.el-button--danger.is-plain:active{background:#dd6161;border-color:#dd6161;color:#fff;outline:0}.el-button--danger.is-plain.is-disabled,.el-button--danger.is-plain.is-disabled:active,.el-button--danger.is-plain.is-disabled:focus,.el-button--danger.is-plain.is-disabled:hover{color:#f9a7a7;background-color:#fef0f0;border-color:#fde2e2}.el-button--info{color:#fff;background-color:#909399;border-color:#909399}.el-button--info:focus,.el-button--info:hover{background:#a6a9ad;border-color:#a6a9ad;color:#fff}.el-button--info.is-active,.el-button--info:active{background:#82848a;border-color:#82848a;color:#fff}.el-button--info:active{outline:0}.el-button--info.is-disabled,.el-button--info.is-disabled:active,.el-button--info.is-disabled:focus,.el-button--info.is-disabled:hover{color:#fff;background-color:#c8c9cc;border-color:#c8c9cc}.el-button--info.is-plain{color:#909399;background:#f4f4f5;border-color:#d3d4d6}.el-button--info.is-plain:focus,.el-button--info.is-plain:hover{background:#909399;border-color:#909399;color:#fff}.el-button--info.is-plain:active{background:#82848a;border-color:#82848a;color:#fff;outline:0}.el-button--info.is-plain.is-disabled,.el-button--info.is-plain.is-disabled:active,.el-button--info.is-plain.is-disabled:focus,.el-button--info.is-plain.is-disabled:hover{color:#bcbec2;background-color:#f4f4f5;border-color:#e9e9eb}.el-button--text,.el-button--text.is-disabled,.el-button--text.is-disabled:focus,.el-button--text.is-disabled:hover,.el-button--text:active{border-color:transparent}.el-button--medium{padding:10px 20px;font-size:14px;border-radius:4px}.el-button--mini,.el-button--small{font-size:12px;border-radius:3px}.el-button--medium.is-round{padding:10px 20px}.el-button--small,.el-button--small.is-round{padding:9px 15px}.el-button--mini,.el-button--mini.is-round{padding:7px 15px}.el-button--text{color:#409EFF;background:0 0;padding-left:0;padding-right:0}.el-button--text:focus,.el-button--text:hover{color:#66b1ff;border-color:transparent;background-color:transparent}.el-button--text:active{color:#3a8ee6;background-color:transparent}.el-button-group{display:inline-block;vertical-align:middle}.el-button-group::after,.el-button-group::before{display:table;content:\"\"}.el-button-group::after{clear:both}.el-button-group .el-button{float:left;position:relative}.el-button-group .el-button+.el-button{margin-left:0}.el-button-group .el-button:first-child{border-top-right-radius:0;border-bottom-right-radius:0}.el-button-group .el-button:last-child{border-top-left-radius:0;border-bottom-left-radius:0}.el-button-group .el-button:not(:first-child):not(:last-child){border-radius:0}.el-button-group .el-button:not(:last-child){margin-right:-1px}.el-button-group .el-button.is-active,.el-button-group .el-button:active,.el-button-group .el-button:focus,.el-button-group .el-button:hover{z-index:1}.el-button-group .el-button--primary:first-child{border-right-color:rgba(255,255,255,.5)}.el-button-group .el-button--primary:last-child{border-left-color:rgba(255,255,255,.5)}.el-button-group .el-button--primary:not(:first-child):not(:last-child){border-left-color:rgba(255,255,255,.5);border-right-color:rgba(255,255,255,.5)}.el-button-group .el-button--success:first-child{border-right-color:rgba(255,255,255,.5)}.el-button-group .el-button--success:last-child{border-left-color:rgba(255,255,255,.5)}.el-button-group .el-button--success:not(:first-child):not(:last-child){border-left-color:rgba(255,255,255,.5);border-right-color:rgba(255,255,255,.5)}.el-button-group .el-button--warning:first-child{border-right-color:rgba(255,255,255,.5)}.el-button-group .el-button--warning:last-child{border-left-color:rgba(255,255,255,.5)}.el-button-group .el-button--warning:not(:first-child):not(:last-child){border-left-color:rgba(255,255,255,.5);border-right-color:rgba(255,255,255,.5)}.el-button-group .el-button--danger:first-child{border-right-color:rgba(255,255,255,.5)}.el-button-group .el-button--danger:last-child{border-left-color:rgba(255,255,255,.5)}.el-button-group .el-button--danger:not(:first-child):not(:last-child){border-left-color:rgba(255,255,255,.5);border-right-color:rgba(255,255,255,.5)}.el-button-group .el-button--info:first-child{border-right-color:rgba(255,255,255,.5)}.el-button-group .el-button--info:last-child{border-left-color:rgba(255,255,255,.5)}.el-button-group .el-button--info:not(:first-child):not(:last-child){border-left-color:rgba(255,255,255,.5);border-right-color:rgba(255,255,255,.5)}", ""]);

// exports


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(178);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./form-item.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./form-item.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 260);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __webpack_require__(94);

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(261);


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _formItem = __webpack_require__(262);

var _formItem2 = _interopRequireDefault(_formItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_formItem2.default.install = function (Vue) {
  Vue.component(_formItem2.default.name, _formItem2.default);
};

exports.default = _formItem2.default;

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_item_vue__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f06fe54a_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_form_item_vue__ = __webpack_require__(265);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_item_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f06fe54a_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_form_item_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _asyncValidator = __webpack_require__(264);

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

var _merge = __webpack_require__(9);

var _merge2 = _interopRequireDefault(_merge);

var _util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElFormItem',

  componentName: 'ElFormItem',

  mixins: [_emitter2.default],

  provide: function provide() {
    return {
      elFormItem: this
    };
  },


  inject: ['elForm'],

  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: {
      type: Boolean,
      default: undefined
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: ''
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String
  },
  watch: {
    error: {
      immediate: true,
      handler: function handler(value) {
        this.validateMessage = value;
        this.validateState = value ? 'error' : '';
      }
    },
    validateStatus: function validateStatus(value) {
      this.validateState = value;
    }
  },
  computed: {
    labelFor: function labelFor() {
      return this.for || this.prop;
    },
    labelStyle: function labelStyle() {
      var ret = {};
      if (this.form.labelPosition === 'top') return ret;
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.width = labelWidth;
      }
      return ret;
    },
    contentStyle: function contentStyle() {
      var ret = {};
      var label = this.label;
      if (this.form.labelPosition === 'top' || this.form.inline) return ret;
      if (!label && !this.labelWidth && this.isNested) return ret;
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.marginLeft = labelWidth;
      }
      return ret;
    },
    form: function form() {
      var parent = this.$parent;
      var parentName = parent.$options.componentName;
      while (parentName !== 'ElForm') {
        if (parentName === 'ElFormItem') {
          this.isNested = true;
        }
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },

    fieldValue: {
      cache: false,
      get: function get() {
        var model = this.form.model;
        if (!model || !this.prop) {
          return;
        }

        var path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        return (0, _util.getPropByPath)(model, path, true).v;
      }
    },
    isRequired: function isRequired() {
      var rules = this.getRules();
      var isRequired = false;

      if (rules && rules.length) {
        rules.every(function (rule) {
          if (rule.required) {
            isRequired = true;
            return false;
          }
          return true;
        });
      }
      return isRequired;
    },
    _formSize: function _formSize() {
      return this.elForm.size;
    },
    elFormItemSize: function elFormItemSize() {
      return this.size || this._formSize;
    },
    sizeClass: function sizeClass() {
      return (this.$ELEMENT || {}).size || this.elFormItemSize;
    }
  },
  data: function data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false
    };
  },

  methods: {
    validate: function validate(trigger) {
      var _this = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util.noop;

      this.validateDisabled = false;
      var rules = this.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback();
        return true;
      }

      this.validateState = 'validating';

      var descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(function (rule) {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;

      var validator = new _asyncValidator2.default(descriptor);
      var model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, function (errors, fields) {
        _this.validateState = !errors ? 'success' : 'error';
        _this.validateMessage = errors ? errors[0].message : '';

        callback(_this.validateMessage);
      });
    },
    clearValidate: function clearValidate() {
      this.validateState = '';
      this.validateMessage = '';
      this.validateDisabled = false;
    },
    resetField: function resetField() {
      this.validateState = '';
      this.validateMessage = '';

      var model = this.form.model;
      var value = this.fieldValue;
      var path = this.prop;
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      var prop = (0, _util.getPropByPath)(model, path, true);

      if (Array.isArray(value)) {
        this.validateDisabled = true;
        prop.o[prop.k] = [].concat(this.initialValue);
      } else {
        this.validateDisabled = true;
        prop.o[prop.k] = this.initialValue;
      }
    },
    getRules: function getRules() {
      var formRules = this.form.rules;
      var selfRules = this.rules;
      var requiredRule = this.required !== undefined ? { required: !!this.required } : [];

      formRules = formRules ? (0, _util.getPropByPath)(formRules, this.prop || '').o[this.prop || ''] : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    getFilteredRule: function getFilteredRule(trigger) {
      var rules = this.getRules();

      return rules.filter(function (rule) {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
      }).map(function (rule) {
        return (0, _merge2.default)({}, rule);
      });
    },
    onFieldBlur: function onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange: function onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }

      this.validate('change');
    }
  },
  mounted: function mounted() {
    if (this.prop) {
      this.dispatch('ElForm', 'el.form.addField', [this]);

      var initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      });

      var rules = this.getRules();

      if (rules.length || this.required !== undefined) {
        this.$on('el.form.blur', this.onFieldBlur);
        this.$on('el.form.change', this.onFieldChange);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.dispatch('ElForm', 'el.form.removeField', [this]);
  }
};

/***/ }),

/***/ 264:
/***/ (function(module, exports) {

module.exports = __webpack_require__(179);

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-form-item",class:[{
    'el-form-item--feedback': _vm.elForm && _vm.elForm.statusIcon,
    'is-error': _vm.validateState === 'error',
    'is-validating': _vm.validateState === 'validating',
    'is-success': _vm.validateState === 'success',
    'is-required': _vm.isRequired || _vm.required
  },
  _vm.sizeClass ? 'el-form-item--' + _vm.sizeClass : ''
]},[(_vm.label || _vm.$slots.label)?_c('label',{staticClass:"el-form-item__label",style:(_vm.labelStyle),attrs:{"for":_vm.labelFor}},[_vm._t("label",[_vm._v(_vm._s(_vm.label + _vm.form.labelSuffix))])],2):_vm._e(),_c('div',{staticClass:"el-form-item__content",style:(_vm.contentStyle)},[_vm._t("default"),_c('transition',{attrs:{"name":"el-zoom-in-top"}},[(_vm.validateState === 'error' && _vm.showMessage && _vm.form.showMessage)?_c('div',{staticClass:"el-form-item__error",class:{
          'el-form-item__error--inline': typeof _vm.inlineMessage === 'boolean'
            ? _vm.inlineMessage
            : (_vm.elForm && _vm.elForm.inlineMessage || false)
        }},[_vm._v("\n        "+_vm._s(_vm.validateMessage)+"\n      ")]):_vm._e()])],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = __webpack_require__(21);

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = __webpack_require__(9);

/***/ })

/******/ });

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(233);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./form.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./form.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 167 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 255);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(256);


/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _form = __webpack_require__(257);

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_form2.default.install = function (Vue) {
  Vue.component(_form2.default.name, _form2.default);
};

exports.default = _form2.default;

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_vue__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0876c296_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_form_vue__ = __webpack_require__(259);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_form_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0876c296_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_form_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElForm',

  componentName: 'ElForm',

  provide: function provide() {
    return {
      elForm: this
    };
  },


  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: ''
    },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String
  },
  watch: {
    rules: function rules() {
      this.validate();
    }
  },
  data: function data() {
    return {
      fields: []
    };
  },
  created: function created() {
    var _this = this;

    this.$on('el.form.addField', function (field) {
      if (field) {
        _this.fields.push(field);
      }
    });
    /* istanbul ignore next */
    this.$on('el.form.removeField', function (field) {
      if (field.prop) {
        _this.fields.splice(_this.fields.indexOf(field), 1);
      }
    });
  },

  methods: {
    resetFields: function resetFields() {
      if (!this.model) {
        "production" !== 'production' && console.warn('[Element Warn][Form]model is required for resetFields to work.');
        return;
      }
      this.fields.forEach(function (field) {
        field.resetField();
      });
    },
    clearValidate: function clearValidate() {
      this.fields.forEach(function (field) {
        field.clearValidate();
      });
    },
    validate: function validate(callback) {
      var _this2 = this;

      if (!this.model) {
        console.warn('[Element Warn][Form]model is required for validate to work!');
        return;
      }

      var promise = void 0;
      // if no callback, return promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise(function (resolve, reject) {
          callback = function callback(valid) {
            valid ? resolve(valid) : reject(valid);
          };
        });
      }

      var valid = true;
      var count = 0;
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true);
      }
      this.fields.forEach(function (field, index) {
        field.validate('', function (errors) {
          if (errors) {
            valid = false;
          }
          if (typeof callback === 'function' && ++count === _this2.fields.length) {
            callback(valid);
          }
        });
      });

      if (promise) {
        return promise;
      }
    },
    validateField: function validateField(prop, cb) {
      var field = this.fields.filter(function (field) {
        return field.prop === prop;
      })[0];
      if (!field) {
        throw new Error('must call validateField with valid prop string!');
      }

      field.validate('', cb);
    }
  }
};

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{staticClass:"el-form",class:[
  _vm.labelPosition ? 'el-form--label-' + _vm.labelPosition : '',
  { 'el-form--inline': _vm.inline }
]},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 168 */,
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(170);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./breadcrumb-item.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./breadcrumb-item.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 250);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(251);


/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _breadcrumbItem = __webpack_require__(252);

var _breadcrumbItem2 = _interopRequireDefault(_breadcrumbItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_breadcrumbItem2.default.install = function (Vue) {
  Vue.component(_breadcrumbItem2.default.name, _breadcrumbItem2.default);
};

exports.default = _breadcrumbItem2.default;

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_breadcrumb_item_vue__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_breadcrumb_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_breadcrumb_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d50178a_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_breadcrumb_item_vue__ = __webpack_require__(254);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_breadcrumb_item_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d50178a_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_breadcrumb_item_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElBreadcrumbItem',
  props: {
    to: {},
    replace: Boolean
  },
  data: function data() {
    return {
      separator: '',
      separatorClass: ''
    };
  },


  inject: ['elBreadcrumb'],

  mounted: function mounted() {
    var _this = this;

    this.separator = this.elBreadcrumb.separator;
    this.separatorClass = this.elBreadcrumb.separatorClass;
    var self = this;
    if (this.to) {
      var link = this.$refs.link;
      link.setAttribute('role', 'link');
      link.addEventListener('click', function (_) {
        var to = _this.to;
        self.replace ? self.$router.replace(to) : self.$router.push(to);
      });
    }
  }
};

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"el-breadcrumb__item"},[_c('span',{ref:"link",staticClass:"el-breadcrumb__inner",attrs:{"role":"link"}},[_vm._t("default")],2),(_vm.separatorClass)?_c('i',{staticClass:"el-breadcrumb__separator",class:_vm.separatorClass}):_c('span',{staticClass:"el-breadcrumb__separator",attrs:{"role":"presentation"}},[_vm._v(_vm._s(_vm.separator))])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(173);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./breadcrumb.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./breadcrumb.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".el-breadcrumb{font-size:14px;line-height:1}.el-breadcrumb::after,.el-breadcrumb::before{display:table;content:\"\"}.el-breadcrumb::after{clear:both}.el-breadcrumb__separator{margin:0 9px;font-weight:700;color:#c0c4cc}.el-breadcrumb__separator[class*=icon]{margin:0 6px;font-weight:400}.el-breadcrumb__item{float:left}.el-breadcrumb__inner,.el-breadcrumb__inner a{font-weight:700;-webkit-transition:color .2s cubic-bezier(.645,.045,.355,1);transition:color .2s cubic-bezier(.645,.045,.355,1);color:#303133}.el-breadcrumb__inner a:hover,.el-breadcrumb__inner:hover{color:#409EFF;cursor:pointer}.el-breadcrumb__item:last-child .el-breadcrumb__inner,.el-breadcrumb__item:last-child .el-breadcrumb__inner a,.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{font-weight:400;color:#606266;cursor:text}.el-breadcrumb__item:last-child .el-breadcrumb__separator{display:none}", ""]);

// exports


/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 245);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(246);


/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _breadcrumb = __webpack_require__(247);

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_breadcrumb2.default.install = function (Vue) {
  Vue.component(_breadcrumb2.default.name, _breadcrumb2.default);
};

exports.default = _breadcrumb2.default;

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_breadcrumb_vue__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_breadcrumb_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_breadcrumb_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_19d7ebd5_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_breadcrumb_vue__ = __webpack_require__(249);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_breadcrumb_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_19d7ebd5_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_breadcrumb_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
//
//
//
//
//

exports.default = {
  name: 'ElBreadcrumb',

  props: {
    separator: {
      type: String,
      default: '/'
    },
    separatorClass: {
      type: String,
      default: ''
    }
  },

  provide: function provide() {
    return {
      elBreadcrumb: this
    };
  },
  mounted: function mounted() {
    var items = this.$el.querySelectorAll('.el-breadcrumb__item');
    if (items.length) {
      items[items.length - 1].setAttribute('aria-current', 'page');
    }
  }
};

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-breadcrumb",attrs:{"aria-label":"Breadcrumb","role":"navigation"}},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 137);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __webpack_require__(94);

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(138);


/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _checkbox = __webpack_require__(139);

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_checkbox2.default.install = function (Vue) {
  Vue.component(_checkbox2.default.name, _checkbox2.default);
};

exports.default = _checkbox2.default;

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59b8b1d6_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_checkbox_vue__ = __webpack_require__(141);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59b8b1d6_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_checkbox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElCheckbox',

  mixins: [_emitter2.default],

  inject: {
    elFormItem: {
      default: ''
    }
  },

  componentName: 'ElCheckbox',

  data: function data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },


  computed: {
    model: {
      get: function get() {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel;
      },
      set: function set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true);

          this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true);

          this.isLimitExceeded === false && this.dispatch('ElCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },

    isChecked: function isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },
    isGroup: function isGroup() {
      var parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'ElCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    store: function store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    isDisabled: function isDisabled() {
      return this.isGroup ? this._checkboxGroup.disabled || this.disabled : this.disabled;
    },
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    checkboxSize: function checkboxSize() {
      var temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize;
    }
  },

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    border: Boolean,
    size: String
  },

  methods: {
    addToStore: function addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange: function handleChange(ev) {
      var _this = this;

      if (this.isLimitExceeded) return;
      var value = void 0;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(function () {
        if (_this.isGroup) {
          _this.dispatch('ElCheckboxGroup', 'change', [_this._checkboxGroup.value]);
        }
      });
    }
  },

  created: function created() {
    this.checked && this.addToStore();
  },
  mounted: function mounted() {
    // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"el-checkbox",class:[
    _vm.border && _vm.checkboxSize ? 'el-checkbox--' + _vm.checkboxSize : '',
    { 'is-disabled': _vm.isDisabled },
    { 'is-bordered': _vm.border },
    { 'is-checked': _vm.isChecked }
  ],attrs:{"role":"checkbox","aria-checked":_vm.indeterminate ? 'mixed': _vm.isChecked,"aria-disabled":_vm.isDisabled,"id":_vm.id}},[_c('span',{staticClass:"el-checkbox__input",class:{
      'is-disabled': _vm.isDisabled,
      'is-checked': _vm.isChecked,
      'is-indeterminate': _vm.indeterminate,
      'is-focus': _vm.focus
    },attrs:{"aria-checked":"mixed"}},[_c('span',{staticClass:"el-checkbox__inner"}),(_vm.trueLabel || _vm.falseLabel)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],staticClass:"el-checkbox__original",attrs:{"type":"checkbox","name":_vm.name,"disabled":_vm.isDisabled,"true-value":_vm.trueLabel,"false-value":_vm.falseLabel},domProps:{"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,null)>-1:_vm._q(_vm.model,_vm.trueLabel)},on:{"change":[function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(_vm.trueLabel):(_vm.falseLabel);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]))}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.model=$$c}},_vm.handleChange],"focus":function($event){_vm.focus = true},"blur":function($event){_vm.focus = false}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],staticClass:"el-checkbox__original",attrs:{"type":"checkbox","disabled":_vm.isDisabled,"name":_vm.name},domProps:{"value":_vm.label,"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,_vm.label)>-1:(_vm.model)},on:{"change":[function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.label,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]))}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.model=$$c}},_vm.handleChange],"focus":function($event){_vm.focus = true},"blur":function($event){_vm.focus = false}}})]),(_vm.$slots.default || _vm.label)?_c('span',{staticClass:"el-checkbox__label"},[_vm._t("default"),(!_vm.$slots.default)?[_vm._v(_vm._s(_vm.label))]:_vm._e()],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 176 */,
/* 177 */,
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validator___ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messages__ = __webpack_require__(232);






/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */
function Schema(descriptor) {
  this.rules = null;
  this._messages = __WEBPACK_IMPORTED_MODULE_4__messages__["a" /* messages */];
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* deepMerge */])(Object(__WEBPACK_IMPORTED_MODULE_4__messages__["b" /* newMessages */])(), _messages);
    }
    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }
    if ((typeof rules === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(rules)) !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }
    this.rules = {};
    var z = void 0;
    var item = void 0;
    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_) {
    var _this = this;

    var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var oc = arguments[2];

    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    function complete(results) {
      var i = void 0;
      var field = void 0;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          errors = errors.concat.apply(errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        for (i = 0; i < errors.length; i++) {
          field = errors[i].field;
          fields[field] = fields[field] || [];
          fields[field].push(errors[i]);
        }
      }
      callback(errors, fields);
    }

    if (options.messages) {
      var messages = this.messages();
      if (messages === __WEBPACK_IMPORTED_MODULE_4__messages__["a" /* messages */]) {
        messages = Object(__WEBPACK_IMPORTED_MODULE_4__messages__["b" /* newMessages */])();
      }
      Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* deepMerge */])(messages, options.messages);
      options.messages = messages;
    } else {
      options.messages = this.messages();
    }
    var arr = void 0;
    var value = void 0;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;
        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, source);
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === 'function') {
          rule = {
            validator: rule
          };
        } else {
          rule = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, rule);
        }
        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);
        if (!rule.validator) {
          return;
        }
        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z
        });
      });
    });
    var errorFields = {};
    Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* asyncMap */])(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(rule.fields) === 'object' || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(rule.defaultField) === 'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullfield(key, schema) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, schema, {
          fullField: rule.fullField + '.' + key
        });
      }

      function cb() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var errors = e;
        if (!Array.isArray(errors)) {
          errors = [errors];
        }
        if (errors.length) {
          Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* warning */])('async-validator:', errors);
        }
        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* complementError */])(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }
        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* complementError */])(rule));
            } else if (options.error) {
              errors = [options.error(rule, Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* format */])(options.messages.required, rule.field))];
            } else {
              errors = [];
            }
            return doIt(errors);
          }

          var fieldsSchema = {};
          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }
          fieldsSchema = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, fieldsSchema, data.rule.fields);
          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }
          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function (errs) {
            doIt(errs && errs.length ? errors.concat(errs) : errs);
          });
        }
      }

      var res = rule.validator(rule, data.value, cb, data.source, options);
      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }
    if (typeof rule.validator !== 'function' && rule.type && !__WEBPACK_IMPORTED_MODULE_3__validator___["a" /* default */].hasOwnProperty(rule.type)) {
      throw new Error(Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* format */])('Unknown rule type %s', rule.type));
    }
    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === 'required') {
      return __WEBPACK_IMPORTED_MODULE_3__validator___["a" /* default */].required;
    }
    return __WEBPACK_IMPORTED_MODULE_3__validator___["a" /* default */][this.getType(rule)] || false;
  }
};

Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }
  __WEBPACK_IMPORTED_MODULE_3__validator___["a" /* default */][type] = validator;
};

Schema.messages = __WEBPACK_IMPORTED_MODULE_4__messages__["a" /* messages */];

/* harmony default export */ __webpack_exports__["default"] = (Schema);

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(181), __esModule: true };

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(182);
module.exports = __webpack_require__(104).Object.assign;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(114);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(185) });


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(184);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 184 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(107);
var gOPS = __webpack_require__(121);
var pIE = __webpack_require__(109);
var toObject = __webpack_require__(144);
var IObject = __webpack_require__(142);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(102)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(99);
var toLength = __webpack_require__(187);
var toAbsoluteIndex = __webpack_require__(188);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(117);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(117);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(190), __esModule: true };

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(191);
__webpack_require__(197);
module.exports = __webpack_require__(125).f('iterator');


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(192)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(145)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(117);
var defined = __webpack_require__(116);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(147);
var descriptor = __webpack_require__(106);
var setToStringTag = __webpack_require__(124);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(96)(IteratorPrototype, __webpack_require__(100)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(97);
var anObject = __webpack_require__(105);
var getKeys = __webpack_require__(107);

module.exports = __webpack_require__(98) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(93).document;
module.exports = document && document.documentElement;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(95);
var toObject = __webpack_require__(144);
var IE_PROTO = __webpack_require__(118)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(198);
var global = __webpack_require__(93);
var hide = __webpack_require__(96);
var Iterators = __webpack_require__(123);
var TO_STRING_TAG = __webpack_require__(100)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(199);
var step = __webpack_require__(200);
var Iterators = __webpack_require__(123);
var toIObject = __webpack_require__(99);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(145)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 200 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(202), __esModule: true };

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(203);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
module.exports = __webpack_require__(104).Symbol;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(93);
var has = __webpack_require__(95);
var DESCRIPTORS = __webpack_require__(98);
var $export = __webpack_require__(114);
var redefine = __webpack_require__(146);
var META = __webpack_require__(204).KEY;
var $fails = __webpack_require__(102);
var shared = __webpack_require__(119);
var setToStringTag = __webpack_require__(124);
var uid = __webpack_require__(108);
var wks = __webpack_require__(100);
var wksExt = __webpack_require__(125);
var wksDefine = __webpack_require__(126);
var enumKeys = __webpack_require__(205);
var isArray = __webpack_require__(206);
var anObject = __webpack_require__(105);
var isObject = __webpack_require__(101);
var toIObject = __webpack_require__(99);
var toPrimitive = __webpack_require__(115);
var createDesc = __webpack_require__(106);
var _create = __webpack_require__(147);
var gOPNExt = __webpack_require__(207);
var $GOPD = __webpack_require__(208);
var $DP = __webpack_require__(97);
var $keys = __webpack_require__(107);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(148).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(109).f = $propertyIsEnumerable;
  __webpack_require__(121).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(122)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(96)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(108)('meta');
var isObject = __webpack_require__(101);
var has = __webpack_require__(95);
var setDesc = __webpack_require__(97).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(102)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(107);
var gOPS = __webpack_require__(121);
var pIE = __webpack_require__(109);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(143);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(99);
var gOPN = __webpack_require__(148).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(109);
var createDesc = __webpack_require__(106);
var toIObject = __webpack_require__(99);
var toPrimitive = __webpack_require__(115);
var has = __webpack_require__(95);
var IE8_DOM_DEFINE = __webpack_require__(139);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(98) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 209 */
/***/ (function(module, exports) {



/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126)('asyncIterator');


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126)('observable');


/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__string__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__method__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__number__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__boolean__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__regexp__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__integer__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__float__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__array__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__object__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__enum__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pattern__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__date__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__required__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__type__ = __webpack_require__(231);















/* harmony default export */ __webpack_exports__["a"] = ({
  string: __WEBPACK_IMPORTED_MODULE_0__string__["a" /* default */],
  method: __WEBPACK_IMPORTED_MODULE_1__method__["a" /* default */],
  number: __WEBPACK_IMPORTED_MODULE_2__number__["a" /* default */],
  boolean: __WEBPACK_IMPORTED_MODULE_3__boolean__["a" /* default */],
  regexp: __WEBPACK_IMPORTED_MODULE_4__regexp__["a" /* default */],
  integer: __WEBPACK_IMPORTED_MODULE_5__integer__["a" /* default */],
  float: __WEBPACK_IMPORTED_MODULE_6__float__["a" /* default */],
  array: __WEBPACK_IMPORTED_MODULE_7__array__["a" /* default */],
  object: __WEBPACK_IMPORTED_MODULE_8__object__["a" /* default */],
  'enum': __WEBPACK_IMPORTED_MODULE_9__enum__["a" /* default */],
  pattern: __WEBPACK_IMPORTED_MODULE_10__pattern__["a" /* default */],
  date: __WEBPACK_IMPORTED_MODULE_11__date__["a" /* default */],
  url: __WEBPACK_IMPORTED_MODULE_13__type__["a" /* default */],
  hex: __WEBPACK_IMPORTED_MODULE_13__type__["a" /* default */],
  email: __WEBPACK_IMPORTED_MODULE_13__type__["a" /* default */],
  required: __WEBPACK_IMPORTED_MODULE_12__required__["a" /* default */]
});

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);



/**
 *  Performs validation for string types.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'string') && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options, 'string');
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'string')) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (string);

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(91);


/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages.whitespace, rule.fullField));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (whitespace);

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__required__ = __webpack_require__(149);




/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  float: function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  object: function object(value) {
    return (typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(value)) === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  }
};

/**
 *  Rule for validating the type of a value.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    Object(__WEBPACK_IMPORTED_MODULE_2__required__["a" /* default */])(rule, value, source, errors, options);
    return;
  }
  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* format */](options.messages.types[ruleType], rule.fullField, rule.type));
    }
    // straight typeof check
  } else if (ruleType && (typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(value)) !== rule.type) {
    errors.push(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* format */](options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (type);

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(91);


/**
 *  Rule for validating minimum and maximum allowed values.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number';
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);
  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  }
  // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type
  if (!key) {
    return false;
  }
  if (str || arr) {
    val = value.length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (range);

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(91);

var ENUM = 'enum';

/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (enumerable);

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(91);


/**
 *  Rule for validating a regular expression pattern.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (pattern);

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);



/**
 *  Validates a function.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (method);

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);



/**
 *  Validates a number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (number);

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rule___ = __webpack_require__(92);



/**
 *  Validates a boolean.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_1__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_1__rule___["a" /* default */].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (boolean);

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);



/**
 *  Validates the regular expression type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value)) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (regexp);

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);



/**
 *  Validates a number is an integer.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (integer);

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);



/**
 *  Validates a number is a floating point number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (floatFn);

/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);


/**
 *  Validates an array.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'array') && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options, 'array');
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'array')) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (array);

/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);



/**
 *  Validates an object.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (object);

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);


var ENUM = 'enum';

/**
 *  Validates an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function enumerable(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */][ENUM](rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (enumerable);

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);



/**
 *  Validates a regular expression pattern.
 *
 *  Performs validation when a rule only contains
 *  a pattern property but is not declared as a string type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function pattern(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'string') && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'string')) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (pattern);

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);



function date(rule, value, callback, source, options) {
  // console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  // console.log('validate on %s value', value);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value)) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      if (value) {
        __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (date);

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rule___ = __webpack_require__(92);



function required(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(value);
  __WEBPACK_IMPORTED_MODULE_1__rule___["a" /* default */].required(rule, value, source, errors, options, type);
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (required);

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(91);



function type(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, ruleType) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options, ruleType);
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, ruleType)) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (type);

/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = newMessages;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return messages; });
function newMessages() {
  return {
    'default': 'Validation error on field %s',
    required: '%s is required',
    'enum': '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid'
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s'
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters'
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s'
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length'
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s'
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}

var messages = newMessages();

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".el-form--inline .el-form-item,.el-form--inline .el-form-item__content{display:inline-block;vertical-align:top}.el-form-item::after,.el-form-item__content::after{clear:both}.el-form--label-left .el-form-item__label{text-align:left}.el-form--label-top .el-form-item__label{float:none;display:inline-block;text-align:left;padding:0 0 10px}.el-form--inline .el-form-item{margin-right:10px}.el-form--inline .el-form-item__label{float:none;display:inline-block}.el-form--inline.el-form--label-top .el-form-item__content{display:block}.el-form-item{margin-bottom:22px}.el-form-item::after,.el-form-item::before{display:table;content:\"\"}.el-form-item .el-form-item{margin-bottom:0}.el-form-item--mini.el-form-item,.el-form-item--small.el-form-item{margin-bottom:18px}.el-form-item .el-input__validateIcon{display:none}.el-form-item--medium .el-form-item__content,.el-form-item--medium .el-form-item__label{line-height:36px}.el-form-item--small .el-form-item__content,.el-form-item--small .el-form-item__label{line-height:32px}.el-form-item--small .el-form-item__error{padding-top:2px}.el-form-item--mini .el-form-item__content,.el-form-item--mini .el-form-item__label{line-height:28px}.el-form-item--mini .el-form-item__error{padding-top:1px}.el-form-item__label{text-align:right;vertical-align:middle;float:left;font-size:14px;color:#606266;line-height:40px;padding:0 12px 0 0;-webkit-box-sizing:border-box;box-sizing:border-box}.el-form-item__content{line-height:40px;position:relative;font-size:14px}.el-form-item__content::after,.el-form-item__content::before{display:table;content:\"\"}.el-form-item__error{color:#f56c6c;font-size:12px;line-height:1;padding-top:4px;position:absolute;top:100%;left:0}.el-form-item__error--inline{position:relative;top:auto;left:auto;display:inline-block;margin-left:10px}.el-form-item.is-required .el-form-item__label:before{content:'*';color:#f56c6c;margin-right:4px}.el-form-item.is-error .el-input__inner,.el-form-item.is-error .el-input__inner:focus,.el-form-item.is-error .el-textarea__inner,.el-form-item.is-error .el-textarea__inner:focus{border-color:#f56c6c}.el-form-item.is-error .el-input-group__append .el-input__inner,.el-form-item.is-error .el-input-group__prepend .el-input__inner{border-color:transparent}.el-form-item.is-error .el-input__validateIcon{color:#f56c6c}.el-form-item.is-success .el-input__inner,.el-form-item.is-success .el-input__inner:focus,.el-form-item.is-success .el-textarea__inner,.el-form-item.is-success .el-textarea__inner:focus{border-color:#67c23a}.el-form-item.is-success .el-input-group__append .el-input__inner,.el-form-item.is-success .el-input-group__prepend .el-input__inner{border-color:transparent}.el-form-item.is-success .el-input__validateIcon{color:#67c23a}.el-form-item--feedback .el-input__validateIcon{display:inline-block}", ""]);

// exports


/***/ }),
/* 234 */,
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  el: {
    colorpicker: {
      confirm: '确定',
      clear: '清空'
    },
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '确定',
      selectDate: '选择日期',
      selectTime: '选择时间',
      startDate: '开始日期',
      startTime: '开始时间',
      endDate: '结束日期',
      endTime: '结束时间',
      prevYear: '前一年',
      nextYear: '后一年',
      prevMonth: '上个月',
      nextMonth: '下个月',
      year: '年',
      month1: '1 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      // week: '周次',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      },
      months: {
        jan: '一月',
        feb: '二月',
        mar: '三月',
        apr: '四月',
        may: '五月',
        jun: '六月',
        jul: '七月',
        aug: '八月',
        sep: '九月',
        oct: '十月',
        nov: '十一月',
        dec: '十二月'
      }
    },
    select: {
      loading: '加载中',
      noMatch: '无匹配数据',
      noData: '无数据',
      placeholder: '请选择'
    },
    cascader: {
      noMatch: '无匹配数据',
      loading: '加载中',
      placeholder: '请选择'
    },
    pagination: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {total} 条',
      pageClassifier: '页'
    },
    messagebox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      error: '输入的数据不合法!'
    },
    upload: {
      deleteTip: '按 delete 键可删除',
      delete: '删除',
      preview: '查看图片',
      continue: '继续上传'
    },
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合计'
    },
    tree: {
      emptyText: '暂无数据'
    },
    transfer: {
      noMatch: '无匹配数据',
      noData: '无数据',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '请输入搜索内容',
      noCheckedFormat: '共 {total} 项',
      hasCheckedFormat: '已选 {checked}/{total} 项'
    }
  }
};

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
        return cloneIfNecessary(source, optionsArgument)
    } else if (sourceIsArray) {
        var arrayMerge = options.arrayMerge || defaultArrayMerge;
        return arrayMerge(target, source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (Vue) {

  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 1 && _typeof(args[0]) === 'object') {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, function (match, prefix, i, index) {
      var result = void 0;

      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i;
      } else {
        result = (0, _util.hasOwn)(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return '';
        }

        return result;
      }
    });
  }

  return template;
};

var _util = __webpack_require__(21);

var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

/***/ }),
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(364);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(137)("628f7d71", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2690a23b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./add.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2690a23b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./add.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.ql-container{\n    height: 200px;\n}\n.avatar-uploader .el-upload {\n    border: 1px dashed #d9d9d9;\n    border-radius: 6px;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n    height: 100px;\n    width: 100px;\n}\n.avatar-uploader .el-upload:hover {\n    border-color: #409EFF;\n}\n.avatar-uploader-icon {\n    font-size: 28px;\n    color: #8c939d;\n    width: 50px;\n    /*height: 178px;*/\n    line-height: 100px;\n    text-align: center;\n}\n.avatar {\n    width: 50px;\n    height: 50px;\n    display: block;\n}\n", ""]);

// exports


/***/ }),
/* 365 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_lib_theme_chalk_form_item_css__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_lib_theme_chalk_form_item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_element_ui_lib_theme_chalk_form_item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui_lib_theme_chalk_base_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui_lib_theme_chalk_base_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_element_ui_lib_theme_chalk_base_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui_lib_form_item__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui_lib_form_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_element_ui_lib_form_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_lib_theme_chalk_form_css__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_lib_theme_chalk_form_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_element_ui_lib_theme_chalk_form_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui_lib_form__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui_lib_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_element_ui_lib_form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_element_ui_lib_theme_chalk_breadcrumb_item_css__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_element_ui_lib_theme_chalk_breadcrumb_item_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_element_ui_lib_theme_chalk_breadcrumb_item_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_element_ui_lib_breadcrumb_item__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_element_ui_lib_breadcrumb_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_element_ui_lib_breadcrumb_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_element_ui_lib_theme_chalk_breadcrumb_css__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_element_ui_lib_theme_chalk_breadcrumb_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_element_ui_lib_theme_chalk_breadcrumb_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_element_ui_lib_breadcrumb__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_element_ui_lib_breadcrumb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_element_ui_lib_breadcrumb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_element_ui_lib_theme_chalk_input_css__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_element_ui_lib_theme_chalk_input_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_element_ui_lib_theme_chalk_input_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_element_ui_lib_input__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_element_ui_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_element_ui_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_element_ui_lib_theme_chalk_button_css__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_element_ui_lib_theme_chalk_button_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_element_ui_lib_theme_chalk_button_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_element_ui_lib_button__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_element_ui_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_element_ui_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_element_ui_lib_theme_chalk_row_css__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_element_ui_lib_theme_chalk_row_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_element_ui_lib_theme_chalk_row_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_element_ui_lib_row__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_element_ui_lib_row___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_element_ui_lib_row__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_element_ui_lib_theme_chalk_col_css__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_element_ui_lib_theme_chalk_col_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_element_ui_lib_theme_chalk_col_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_element_ui_lib_col__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_element_ui_lib_col___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_element_ui_lib_col__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_element_ui_lib_theme_chalk_main_css__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_element_ui_lib_theme_chalk_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_element_ui_lib_theme_chalk_main_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_element_ui_lib_main__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_element_ui_lib_main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_element_ui_lib_main__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_element_ui_lib_theme_chalk_container_css__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_element_ui_lib_theme_chalk_container_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_element_ui_lib_theme_chalk_container_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_element_ui_lib_container__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_element_ui_lib_container___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_element_ui_lib_container__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_element_ui_lib_theme_chalk_checkbox_css__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_element_ui_lib_theme_chalk_checkbox_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_element_ui_lib_theme_chalk_checkbox_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_element_ui_lib_checkbox__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_element_ui_lib_checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_element_ui_lib_checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_element_ui_lib_theme_chalk_upload_css__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_element_ui_lib_theme_chalk_upload_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_element_ui_lib_theme_chalk_upload_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_element_ui_lib_upload__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_element_ui_lib_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_element_ui_lib_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_vue_quill_editor__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_vue_quill_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_vue_quill_editor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_quill_dist_quill_core_css__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_quill_dist_quill_core_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_quill_dist_quill_core_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_quill_dist_quill_snow_css__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_quill_dist_quill_snow_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27_quill_dist_quill_snow_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_quill_dist_quill_bubble_css__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_quill_dist_quill_bubble_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_quill_dist_quill_bubble_css__);





































 //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        quillEditor: __WEBPACK_IMPORTED_MODULE_25_vue_quill_editor__["quillEditor"],
        'el-upload': __WEBPACK_IMPORTED_MODULE_24_element_ui_lib_upload___default.a,
        'el-checkbox': __WEBPACK_IMPORTED_MODULE_22_element_ui_lib_checkbox___default.a,
        'el-container': __WEBPACK_IMPORTED_MODULE_20_element_ui_lib_container___default.a,
        'el-main': __WEBPACK_IMPORTED_MODULE_18_element_ui_lib_main___default.a,
        'el-col': __WEBPACK_IMPORTED_MODULE_16_element_ui_lib_col___default.a,
        'el-row': __WEBPACK_IMPORTED_MODULE_14_element_ui_lib_row___default.a,
        'el-button': __WEBPACK_IMPORTED_MODULE_12_element_ui_lib_button___default.a,
        'el-input': __WEBPACK_IMPORTED_MODULE_10_element_ui_lib_input___default.a,
        'el-breadcrumb': __WEBPACK_IMPORTED_MODULE_8_element_ui_lib_breadcrumb___default.a,
        'el-breadcrumb-item': __WEBPACK_IMPORTED_MODULE_6_element_ui_lib_breadcrumb_item___default.a,
        'el-form': __WEBPACK_IMPORTED_MODULE_4_element_ui_lib_form___default.a,
        'el-form-item': __WEBPACK_IMPORTED_MODULE_2_element_ui_lib_form_item___default.a
    },
    data: function data() {
        return {
            /*editorOption: {
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline','strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['image', 'link','code-block']
                    ]
                },
            },*/
            form: {
                title: '',
                author: '',
                content: '',
                checked: ''
            },
            imageUrl: ''

        };
    },

    methods: {},
    mounted: function mounted() {}
});

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(367);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./checkbox.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./checkbox.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";.el-checkbox,.el-checkbox__input{display:inline-block;position:relative}.el-checkbox-button__inner,.el-checkbox__input{white-space:nowrap;vertical-align:middle;outline:0}.el-checkbox{color:#606266;font-weight:500;font-size:14px;cursor:pointer;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-checkbox.is-bordered{padding:9px 20px 9px 10px;border-radius:4px;border:1px solid #dcdfe6;-webkit-box-sizing:border-box;box-sizing:border-box;line-height:normal;height:40px}.el-checkbox.is-bordered.is-checked{border-color:#409EFF}.el-checkbox.is-bordered.is-disabled{border-color:#ebeef5;cursor:not-allowed}.el-checkbox.is-bordered+.el-checkbox.is-bordered{margin-left:10px}.el-checkbox.is-bordered.el-checkbox--medium{padding:7px 20px 7px 10px;border-radius:4px;height:36px}.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__label{line-height:17px;font-size:14px}.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__inner{height:14px;width:14px}.el-checkbox.is-bordered.el-checkbox--small{padding:5px 15px 5px 10px;border-radius:3px;height:32px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label{line-height:15px;font-size:12px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner{height:12px;width:12px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner::after{height:6px;width:2px}.el-checkbox.is-bordered.el-checkbox--mini{padding:3px 15px 3px 10px;border-radius:3px;height:28px}.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__label{line-height:12px;font-size:12px}.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner{height:12px;width:12px}.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner::after{height:6px;width:2px}.el-checkbox__input{cursor:pointer;line-height:1}.el-checkbox__input.is-disabled .el-checkbox__inner{background-color:#edf2fc;border-color:#dcdfe6;cursor:not-allowed}.el-checkbox__input.is-disabled .el-checkbox__inner::after{cursor:not-allowed;border-color:#c0c4cc}.el-checkbox__input.is-disabled .el-checkbox__inner+.el-checkbox__label{cursor:not-allowed}.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{background-color:#f2f6fc;border-color:#dcdfe6}.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{border-color:#c0c4cc}.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner{background-color:#f2f6fc;border-color:#dcdfe6}.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before{background-color:#c0c4cc;border-color:#c0c4cc}.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color:#409EFF;border-color:#409EFF}.el-checkbox__input.is-disabled+span.el-checkbox__label{color:#c0c4cc;cursor:not-allowed}.el-checkbox__input.is-checked .el-checkbox__inner::after{-webkit-transform:rotate(45deg) scaleY(1);transform:rotate(45deg) scaleY(1)}.el-checkbox__input.is-checked+.el-checkbox__label{color:#409EFF}.el-checkbox__input.is-focus .el-checkbox__inner{border-color:#409EFF}.el-checkbox__input.is-indeterminate .el-checkbox__inner::before{content:'';position:absolute;display:block;background-color:#fff;height:2px;-webkit-transform:scale(.5);transform:scale(.5);left:0;right:0;top:5px}.el-checkbox__input.is-indeterminate .el-checkbox__inner::after{display:none}.el-checkbox__inner{display:inline-block;position:relative;border:1px solid #dcdfe6;border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;width:14px;height:14px;background-color:#fff;z-index:1;-webkit-transition:border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);transition:border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)}.el-checkbox__inner:hover{border-color:#409EFF}.el-checkbox__inner::after{-webkit-box-sizing:content-box;box-sizing:content-box;content:\"\";border:1px solid #fff;border-left:0;border-top:0;height:7px;left:4px;position:absolute;top:1px;-webkit-transform:rotate(45deg) scaleY(0);transform:rotate(45deg) scaleY(0);width:3px;-webkit-transition:-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;transition:-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;transition:transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;transition:transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;-webkit-transform-origin:center;transform-origin:center}.el-checkbox__original{opacity:0;outline:0;position:absolute;margin:0;width:0;height:0;left:-999px}.el-checkbox-button,.el-checkbox-button__inner{display:inline-block;position:relative}.el-checkbox__label{display:inline-block;padding-left:10px;line-height:19px;font-size:14px}.el-checkbox+.el-checkbox{margin-left:30px}.el-checkbox-button__inner{line-height:1;font-weight:500;cursor:pointer;background:#fff;border:1px solid #dcdfe6;border-left:0;color:#606266;-webkit-appearance:none;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;-webkit-transition:all .3s cubic-bezier(.645,.045,.355,1);transition:all .3s cubic-bezier(.645,.045,.355,1);-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:12px 20px;font-size:14px;border-radius:0}.el-checkbox-button__inner.is-round{padding:12px 20px}.el-checkbox-button__inner:hover{color:#409EFF}.el-checkbox-button__inner [class*=el-icon-]{line-height:.9}.el-checkbox-button__inner [class*=el-icon-]+span{margin-left:5px}.el-checkbox-button__original{opacity:0;outline:0;position:absolute;margin:0;left:-999px}.el-checkbox-button.is-checked .el-checkbox-button__inner{color:#fff;background-color:#409EFF;border-color:#409EFF;-webkit-box-shadow:-1px 0 0 0 #8cc5ff;box-shadow:-1px 0 0 0 #8cc5ff}.el-checkbox-button.is-disabled .el-checkbox-button__inner{color:#c0c4cc;cursor:not-allowed;background-image:none;background-color:#fff;border-color:#ebeef5;-webkit-box-shadow:none;box-shadow:none}.el-checkbox-button:first-child .el-checkbox-button__inner{border-left:1px solid #dcdfe6;border-radius:4px 0 0 4px;-webkit-box-shadow:none!important;box-shadow:none!important}.el-checkbox-button.is-focus .el-checkbox-button__inner{border-color:#409EFF}.el-checkbox-button:last-child .el-checkbox-button__inner{border-radius:0 4px 4px 0}.el-checkbox-button--medium .el-checkbox-button__inner{padding:10px 20px;font-size:14px;border-radius:0}.el-checkbox-button--medium .el-checkbox-button__inner.is-round{padding:10px 20px}.el-checkbox-button--small .el-checkbox-button__inner{padding:9px 15px;font-size:12px;border-radius:0}.el-checkbox-button--small .el-checkbox-button__inner.is-round{padding:9px 15px}.el-checkbox-button--mini .el-checkbox-button__inner{padding:7px 15px;font-size:12px;border-radius:0}.el-checkbox-button--mini .el-checkbox-button__inner.is-round{padding:7px 15px}.el-checkbox-group{font-size:0}", ""]);

// exports


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(369);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./upload.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./upload.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";.el-upload-cover__title,.el-upload-list__item-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.el-progress{position:relative;line-height:1}.el-progress__text{font-size:14px;color:#606266;display:inline-block;vertical-align:middle;margin-left:10px;line-height:1}.el-progress__text i{vertical-align:middle;display:block}.el-progress--circle{display:inline-block}.el-progress--circle .el-progress__text{position:absolute;top:50%;left:0;width:100%;text-align:center;margin:0;-webkit-transform:translate(0,-50%);transform:translate(0,-50%)}.el-progress--circle .el-progress__text i{vertical-align:middle;display:inline-block}.el-progress--without-text .el-progress__text{display:none}.el-progress--without-text .el-progress-bar{padding-right:0;margin-right:0;display:block}.el-progress--text-inside .el-progress-bar{padding-right:0;margin-right:0}.el-progress.is-success .el-progress-bar__inner{background-color:#67c23a}.el-progress.is-success .el-progress__text{color:#67c23a}.el-progress.is-exception .el-progress-bar__inner{background-color:#f56c6c}.el-progress.is-exception .el-progress__text{color:#f56c6c}.el-progress-bar{padding-right:50px;display:inline-block;vertical-align:middle;width:100%;margin-right:-55px;-webkit-box-sizing:border-box;box-sizing:border-box}.el-upload--picture-card,.el-upload-dragger{-webkit-box-sizing:border-box;cursor:pointer}.el-progress-bar__outer{height:6px;border-radius:100px;background-color:#ebeef5;overflow:hidden;position:relative;vertical-align:middle}.el-progress-bar__inner{position:absolute;left:0;top:0;height:100%;background-color:#409EFF;text-align:right;border-radius:100px;line-height:1;white-space:nowrap}.el-progress-bar__inner::after{display:inline-block;content:\"\";height:100%;vertical-align:middle}.el-progress-bar__innerText{display:inline-block;vertical-align:middle;color:#fff;font-size:12px;margin:0 5px}@-webkit-keyframes progress{0%{background-position:0 0}100%{background-position:32px 0}}@keyframes progress{0%{background-position:0 0}100%{background-position:32px 0}}.el-upload{display:inline-block;text-align:center;cursor:pointer;outline:0}.el-upload__input{display:none}.el-upload__tip{font-size:12px;color:#606266;margin-top:7px}.el-upload iframe{position:absolute;z-index:-1;top:0;left:0;opacity:0;filter:alpha(opacity=0)}.el-upload--picture-card{background-color:#fbfdff;border:1px dashed #c0ccda;border-radius:6px;box-sizing:border-box;width:148px;height:148px;line-height:146px;vertical-align:top}.el-upload--picture-card i{font-size:28px;color:#8c939d}.el-upload--picture-card:hover,.el-upload:focus{border-color:#409EFF;color:#409EFF}.el-upload:focus .el-upload-dragger{border-color:#409EFF}.el-upload-dragger{background-color:#fff;border:1px dashed #d9d9d9;border-radius:6px;box-sizing:border-box;width:360px;height:180px;text-align:center;position:relative;overflow:hidden}.el-upload-dragger .el-icon-upload{font-size:67px;color:#c0c4cc;margin:40px 0 16px;line-height:50px}.el-upload-dragger+.el-upload__tip{text-align:center}.el-upload-dragger~.el-upload__files{border-top:1px solid #dcdfe6;margin-top:7px;padding-top:5px}.el-upload-dragger .el-upload__text{color:#606266;font-size:14px;text-align:center}.el-upload-dragger .el-upload__text em{color:#409EFF;font-style:normal}.el-upload-dragger:hover{border-color:#409EFF}.el-upload-dragger.is-dragover{background-color:rgba(32,159,255,.06);border:2px dashed #409EFF}.el-upload-list{margin:0;padding:0;list-style:none}.el-upload-list__item{-webkit-transition:all .5s cubic-bezier(.55,0,.1,1);transition:all .5s cubic-bezier(.55,0,.1,1);font-size:14px;color:#606266;line-height:1.8;margin-top:5px;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:4px;width:100%}.el-upload-list__item .el-progress{position:absolute;top:20px;width:100%}.el-upload-list__item .el-progress__text{position:absolute;right:0;top:-13px}.el-upload-list__item .el-progress-bar{margin-right:0;padding-right:0}.el-upload-list__item:first-child{margin-top:10px}.el-upload-list__item .el-icon-upload-success{color:#67c23a}.el-upload-list__item .el-icon-close{display:none;position:absolute;top:5px;right:5px;cursor:pointer;opacity:.75;color:#606266}.el-upload-list__item .el-icon-close:hover{opacity:1}.el-upload-list__item .el-icon-close-tip{display:none;position:absolute;top:5px;right:5px;font-size:12px;cursor:pointer;opacity:1;color:#409EFF}.el-upload-list__item:hover{background-color:#f5f7fa}.el-upload-list__item:hover .el-icon-close{display:inline-block}.el-upload-list__item:hover .el-progress__text{display:none}.el-upload-list__item.is-success .el-upload-list__item-status-label{display:block}.el-upload-list__item.is-success .el-upload-list__item-name:focus,.el-upload-list__item.is-success .el-upload-list__item-name:hover{color:#409EFF;cursor:pointer}.el-upload-list__item.is-success:focus:not(:hover) .el-icon-close-tip{display:inline-block}.el-upload-list__item.is-success:active,.el-upload-list__item.is-success:not(.focusing):focus{outline-width:0}.el-upload-list__item.is-success:active .el-icon-close-tip,.el-upload-list__item.is-success:focus .el-upload-list__item-status-label,.el-upload-list__item.is-success:hover .el-upload-list__item-status-label,.el-upload-list__item.is-success:not(.focusing):focus .el-icon-close-tip{display:none}.el-upload-list.is-disabled .el-upload-list__item:hover .el-upload-list__item-status-label{display:block}.el-upload-list__item-name{color:#606266;display:block;margin-right:40px;padding-left:4px;-webkit-transition:color .3s;transition:color .3s}.el-upload-list__item-name [class^=el-icon]{height:100%;margin-right:7px;color:#909399;line-height:inherit}.el-upload-list__item-status-label{position:absolute;right:5px;top:0;line-height:inherit;display:none}.el-upload-list__item-delete{position:absolute;right:10px;top:0;font-size:12px;color:#606266;display:none}.el-upload-list__item-delete:hover{color:#409EFF}.el-upload-list--picture-card{margin:0;display:inline;vertical-align:top}.el-upload-list--picture-card .el-upload-list__item{overflow:hidden;background-color:#fff;border:1px solid #c0ccda;border-radius:6px;-webkit-box-sizing:border-box;box-sizing:border-box;width:148px;height:148px;margin:0 8px 8px 0;display:inline-block}.el-upload-list--picture-card .el-upload-list__item .el-icon-check,.el-upload-list--picture-card .el-upload-list__item .el-icon-circle-check{color:#fff}.el-upload-list--picture-card .el-upload-list__item .el-icon-close,.el-upload-list--picture-card .el-upload-list__item:hover .el-upload-list__item-status-label{display:none}.el-upload-list--picture-card .el-upload-list__item:hover .el-progress__text{display:block}.el-upload-list--picture-card .el-upload-list__item-name{display:none}.el-upload-list--picture-card .el-upload-list__item-thumbnail{width:100%;height:100%}.el-upload-list--picture-card .el-upload-list__item-status-label{position:absolute;right:-15px;top:-6px;width:40px;height:24px;background:#13ce66;text-align:center;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-box-shadow:0 0 1pc 1px rgba(0,0,0,.2);box-shadow:0 0 1pc 1px rgba(0,0,0,.2)}.el-upload-list--picture-card .el-upload-list__item-status-label i{font-size:12px;margin-top:11px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.el-upload-list--picture-card .el-upload-list__item-actions{position:absolute;width:100%;height:100%;left:0;top:0;cursor:default;text-align:center;color:#fff;opacity:0;font-size:20px;background-color:rgba(0,0,0,.5);-webkit-transition:opacity .3s;transition:opacity .3s}.el-upload-list--picture-card .el-upload-list__item-actions::after{display:inline-block;content:\"\";height:100%;vertical-align:middle}.el-upload-list--picture-card .el-upload-list__item-actions span{display:none;cursor:pointer}.el-upload-list--picture-card .el-upload-list__item-actions span+span{margin-left:15px}.el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete{position:static;font-size:inherit;color:inherit}.el-upload-list--picture-card .el-upload-list__item-actions:hover{opacity:1}.el-upload-list--picture-card .el-upload-list__item-actions:hover span{display:inline-block}.el-upload-list--picture-card .el-progress{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);bottom:auto;width:126px}.el-upload-list--picture-card .el-progress .el-progress__text{top:50%}.el-upload-list--picture .el-upload-list__item{overflow:hidden;background-color:#fff;border:1px solid #c0ccda;border-radius:6px;-webkit-box-sizing:border-box;box-sizing:border-box;margin-top:10px;padding:10px 10px 10px 90px;height:92px}.el-upload-list--picture .el-upload-list__item .el-icon-check,.el-upload-list--picture .el-upload-list__item .el-icon-circle-check{color:#fff}.el-upload-list--picture .el-upload-list__item:hover .el-upload-list__item-status-label{background:0 0;-webkit-box-shadow:none;box-shadow:none;top:-2px;right:-12px}.el-upload-list--picture .el-upload-list__item:hover .el-progress__text{display:block}.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name{line-height:70px;margin-top:0}.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name i{display:none}.el-upload-list--picture .el-upload-list__item-thumbnail{vertical-align:middle;display:inline-block;width:70px;height:70px;float:left;position:relative;z-index:1;margin-left:-80px}.el-upload-list--picture .el-upload-list__item-name{display:block;margin-top:20px}.el-upload-list--picture .el-upload-list__item-name i{font-size:70px;line-height:1;position:absolute;left:9px;top:10px}.el-upload-list--picture .el-upload-list__item-status-label{position:absolute;right:-17px;top:-7px;width:46px;height:26px;background:#13ce66;text-align:center;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-box-shadow:0 1px 1px #ccc;box-shadow:0 1px 1px #ccc}.el-upload-list--picture .el-upload-list__item-status-label i{font-size:12px;margin-top:12px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.el-upload-list--picture .el-progress{position:relative;top:-7px}.el-upload-cover{position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;z-index:10;cursor:default}.el-upload-cover::after{display:inline-block;content:\"\";height:100%;vertical-align:middle}.el-upload-cover img{display:block;width:100%;height:100%}.el-upload-cover__label{position:absolute;right:-15px;top:-6px;width:40px;height:24px;background:#13ce66;text-align:center;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-box-shadow:0 0 1pc 1px rgba(0,0,0,.2);box-shadow:0 0 1pc 1px rgba(0,0,0,.2)}.el-upload-cover__label i{font-size:12px;margin-top:11px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);color:#fff}.el-upload-cover__progress{display:inline-block;vertical-align:middle;position:static;width:243px}.el-upload-cover__progress+.el-upload__inner{opacity:0}.el-upload-cover__content{position:absolute;top:0;left:0;width:100%;height:100%}.el-upload-cover__interact{position:absolute;bottom:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.72);text-align:center}.el-upload-cover__interact .btn{display:inline-block;color:#fff;font-size:14px;cursor:pointer;vertical-align:middle;-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);margin-top:60px}.el-upload-cover__interact .btn span{opacity:0;-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.el-upload-cover__interact .btn:not(:first-child){margin-left:35px}.el-upload-cover__interact .btn:hover{-webkit-transform:translateY(-13px);transform:translateY(-13px)}.el-upload-cover__interact .btn:hover span{opacity:1}.el-upload-cover__interact .btn i{color:#fff;display:block;font-size:24px;line-height:inherit;margin:0 auto 5px}.el-upload-cover__title{position:absolute;bottom:0;left:0;background-color:#fff;height:36px;width:100%;font-weight:400;text-align:left;padding:0 10px;margin:0;line-height:36px;font-size:14px;color:#303133}.el-upload-cover+.el-upload__inner{opacity:0;position:relative;z-index:1}", ""]);

// exports


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 332);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(333);


/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _src = __webpack_require__(334);

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_src2.default.install = function (Vue) {
  Vue.component(_src2.default.name, _src2.default);
};

exports.default = _src2.default;

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _uploadList = __webpack_require__(336);

var _uploadList2 = _interopRequireDefault(_uploadList);

var _upload = __webpack_require__(339);

var _upload2 = _interopRequireDefault(_upload);

var _iframeUpload = __webpack_require__(344);

var _iframeUpload2 = _interopRequireDefault(_iframeUpload);

var _progress = __webpack_require__(50);

var _progress2 = _interopRequireDefault(_progress);

var _migrating = __webpack_require__(7);

var _migrating2 = _interopRequireDefault(_migrating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

exports.default = {
  name: 'ElUpload',

  mixins: [_migrating2.default],

  components: {
    ElProgress: _progress2.default,
    UploadList: _uploadList2.default,
    Upload: _upload2.default,
    IframeUpload: _iframeUpload2.default
  },

  provide: {
    uploader: undefined
  },

  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file'
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: String,
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    fileList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'text' // text,picture,picture-card
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    }
  },

  data: function data() {
    return {
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1
    };
  },


  watch: {
    fileList: {
      immediate: true,
      handler: function handler(fileList) {
        var _this = this;

        this.uploadFiles = fileList.map(function (item) {
          item.uid = item.uid || Date.now() + _this.tempIndex++;
          item.status = 'success';
          return item;
        });
      }
    }
  },

  methods: {
    handleStart: function handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      var file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };

      try {
        file.url = URL.createObjectURL(rawFile);
      } catch (err) {
        console.error(err);
        return;
      }

      this.uploadFiles.push(file);
      this.onChange(file, this.uploadFiles);
    },
    handleProgress: function handleProgress(ev, rawFile) {
      var file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },
    handleSuccess: function handleSuccess(res, rawFile) {
      var file = this.getFile(rawFile);

      if (file) {
        file.status = 'success';
        file.response = res;

        this.onSuccess(res, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
      }
    },
    handleError: function handleError(err, rawFile) {
      var file = this.getFile(rawFile);
      var fileList = this.uploadFiles;

      file.status = 'fail';

      fileList.splice(fileList.indexOf(file), 1);

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
    },
    handleRemove: function handleRemove(file, raw) {
      var _this2 = this;

      if (raw) {
        file = this.getFile(raw);
      }
      var doRemove = function doRemove() {
        _this2.abort(file);
        var fileList = _this2.uploadFiles;
        fileList.splice(fileList.indexOf(file), 1);
        _this2.onRemove(file, fileList);
      };

      if (!this.beforeRemove) {
        doRemove();
      } else if (typeof this.beforeRemove === 'function') {
        var before = this.beforeRemove(file, this.uploadFiles);
        if (before && before.then) {
          before.then(function () {
            doRemove();
          }, noop);
        } else if (before !== false) {
          doRemove();
        }
      }
    },
    getFile: function getFile(rawFile) {
      var fileList = this.uploadFiles;
      var target = void 0;
      fileList.every(function (item) {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort: function abort(file) {
      this.$refs['upload-inner'].abort(file);
    },
    clearFiles: function clearFiles() {
      this.uploadFiles = [];
    },
    submit: function submit() {
      var _this3 = this;

      this.uploadFiles.filter(function (file) {
        return file.status === 'ready';
      }).forEach(function (file) {
        _this3.$refs['upload-inner'].upload(file.raw);
      });
    },
    getMigratingConfig: function getMigratingConfig() {
      return {
        props: {
          'default-file-list': 'default-file-list is renamed to file-list.',
          'show-upload-list': 'show-upload-list is renamed to show-file-list.',
          'thumbnail-mode': 'thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan'
        }
      };
    }
  },

  render: function render(h) {
    var uploadList = void 0;

    if (this.showFileList) {
      uploadList = h(
        _uploadList2.default,
        {
          attrs: {
            disabled: this.disabled,
            listType: this.listType,
            files: this.uploadFiles,

            handlePreview: this.onPreview },
          on: {
            'remove': this.handleRemove
          }
        },
        []
      );
    }

    var uploadData = {
      props: {
        type: this.type,
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.disabled,
        limit: this.limit,
        'on-exceed': this.onExceed,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest
      },
      ref: 'upload-inner'
    };

    var trigger = this.$slots.trigger || this.$slots.default;
    var uploadComponent = typeof FormData !== 'undefined' || this.$isServer ? h(
      'upload',
      uploadData,
      [trigger]
    ) : h(
      'iframeUpload',
      uploadData,
      [trigger]
    );

    return h(
      'div',
      null,
      [this.listType === 'picture-card' ? uploadList : '', this.$slots.trigger ? [uploadComponent, this.$slots.default] : uploadComponent, this.$slots.tip, this.listType !== 'picture-card' ? uploadList : '']
    );
  }
};

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_list_vue__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_list_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_list_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_43fbf886_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_upload_list_vue__ = __webpack_require__(338);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_list_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_43fbf886_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_upload_list_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _locale = __webpack_require__(4);

var _locale2 = _interopRequireDefault(_locale);

var _progress = __webpack_require__(50);

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  mixins: [_locale2.default],

  data: function data() {
    return {
      focusing: false
    };
  },

  components: { ElProgress: _progress2.default },

  props: {
    files: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: Function,
    listType: String
  },
  methods: {
    parsePercentage: function parsePercentage(val) {
      return parseInt(val, 10);
    },
    handleClick: function handleClick(file) {
      this.handlePreview && this.handlePreview(file);
    }
  }
};

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition-group',{class:[
    'el-upload-list',
    'el-upload-list--' + _vm.listType,
    { 'is-disabled': _vm.disabled }
  ],attrs:{"tag":"ul","name":"el-list"}},_vm._l((_vm.files),function(file,index){return _c('li',{key:index,class:['el-upload-list__item', 'is-' + file.status, _vm.focusing ? 'focusing' : ''],attrs:{"tabindex":"0"},on:{"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"delete",[8,46],$event.key)){ return null; }!_vm.disabled && _vm.$emit('remove', file)},"focus":function($event){_vm.focusing = true},"blur":function($event){_vm.focusing = false},"click":function($event){_vm.focusing = false}}},[(file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(_vm.listType) > -1)?_c('img',{staticClass:"el-upload-list__item-thumbnail",attrs:{"src":file.url,"alt":""}}):_vm._e(),_c('a',{staticClass:"el-upload-list__item-name",on:{"click":function($event){_vm.handleClick(file)}}},[_c('i',{staticClass:"el-icon-document"}),_vm._v(_vm._s(file.name)+"\n    ")]),_c('label',{staticClass:"el-upload-list__item-status-label"},[_c('i',{class:{
        'el-icon-upload-success': true,
        'el-icon-circle-check': _vm.listType === 'text',
        'el-icon-check': ['picture-card', 'picture'].indexOf(_vm.listType) > -1
      }})]),(!_vm.disabled)?_c('i',{staticClass:"el-icon-close",on:{"click":function($event){_vm.$emit('remove', file)}}}):_vm._e(),(!_vm.disabled)?_c('i',{staticClass:"el-icon-close-tip"},[_vm._v(_vm._s(_vm.t('el.upload.deleteTip')))]):_vm._e(),(file.status === 'uploading')?_c('el-progress',{attrs:{"type":_vm.listType === 'picture-card' ? 'circle' : 'line',"stroke-width":_vm.listType === 'picture-card' ? 6 : 2,"percentage":_vm.parsePercentage(file.percentage)}}):_vm._e(),(_vm.listType === 'picture-card')?_c('span',{staticClass:"el-upload-list__item-actions"},[(_vm.handlePreview && _vm.listType === 'picture-card')?_c('span',{staticClass:"el-upload-list__item-preview",on:{"click":function($event){_vm.handlePreview(file)}}},[_c('i',{staticClass:"el-icon-zoom-in"})]):_vm._e(),(!_vm.disabled)?_c('span',{staticClass:"el-upload-list__item-delete",on:{"click":function($event){_vm.$emit('remove', file)}}},[_c('i',{staticClass:"el-icon-delete"})]):_vm._e()]):_vm._e()],1)}))}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_vue__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_vue__);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_vue___default.a,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _babelHelperVueJsxMergeProps = __webpack_require__(44);

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _ajax = __webpack_require__(341);

var _ajax2 = _interopRequireDefault(_ajax);

var _uploadDragger = __webpack_require__(51);

var _uploadDragger2 = _interopRequireDefault(_uploadDragger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  inject: ['uploader'],
  components: {
    UploadDragger: _uploadDragger2.default
  },
  props: {
    type: String,
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'file'
    },
    data: Object,
    headers: Object,
    withCredentials: Boolean,
    multiple: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    drag: Boolean,
    onPreview: {
      type: Function,
      default: function _default() {}
    },
    onRemove: {
      type: Function,
      default: function _default() {}
    },
    fileList: Array,
    autoUpload: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: _ajax2.default
    },
    disabled: Boolean,
    limit: Number,
    onExceed: Function
  },

  data: function data() {
    return {
      mouseover: false,
      reqs: {}
    };
  },


  methods: {
    isImage: function isImage(str) {
      return str.indexOf('image') !== -1;
    },
    handleChange: function handleChange(ev) {
      var files = ev.target.files;

      if (!files) return;
      this.uploadFiles(files);
    },
    uploadFiles: function uploadFiles(files) {
      var _this = this;

      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }

      var postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      if (postFiles.length === 0) {
        return;
      }

      postFiles.forEach(function (rawFile) {
        _this.onStart(rawFile);
        if (_this.autoUpload) _this.upload(rawFile);
      });
    },
    upload: function upload(rawFile, file) {
      var _this2 = this;

      this.$refs.input.value = null;

      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      var before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(function (processedFile) {
          var fileType = Object.prototype.toString.call(processedFile);
          if (fileType === '[object File]' || fileType === '[object Blob]') {
            _this2.post(processedFile);
          } else {
            _this2.post(rawFile);
          }
        }, function () {
          _this2.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    },
    abort: function abort(file) {
      var reqs = this.reqs;

      if (file) {
        var uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        Object.keys(reqs).forEach(function (uid) {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },
    post: function post(rawFile) {
      var _this3 = this;

      var uid = rawFile.uid;

      var options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: function onProgress(e) {
          _this3.onProgress(e, rawFile);
        },
        onSuccess: function onSuccess(res) {
          _this3.onSuccess(res, rawFile);
          delete _this3.reqs[uid];
        },
        onError: function onError(err) {
          _this3.onError(err, rawFile);
          delete _this3.reqs[uid];
        }
      };
      var req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    handleClick: function handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleKeydown: function handleKeydown(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick();
      }
    }
  },

  render: function render(h) {
    var handleClick = this.handleClick,
        drag = this.drag,
        name = this.name,
        handleChange = this.handleChange,
        multiple = this.multiple,
        accept = this.accept,
        listType = this.listType,
        uploadFiles = this.uploadFiles,
        disabled = this.disabled,
        handleKeydown = this.handleKeydown;

    var data = {
      class: {
        'el-upload': true
      },
      on: {
        click: handleClick,
        keydown: handleKeydown
      }
    };
    data.class['el-upload--' + listType] = true;
    return h(
      'div',
      (0, _babelHelperVueJsxMergeProps2.default)([data, {
        attrs: { tabindex: '0' }
      }]),
      [drag ? h(
        'upload-dragger',
        {
          attrs: { disabled: disabled },
          on: {
            'file': uploadFiles
          }
        },
        [this.$slots.default]
      ) : this.$slots.default, h(
        'input',
        { 'class': 'el-upload__input', attrs: { type: 'file', name: name, multiple: multiple, accept: accept },
          ref: 'input', on: {
            'change': handleChange
          }
        },
        []
      )]
    );
  }
};

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = upload;
function getError(action, option, xhr) {
  var msg = void 0;
  if (xhr.response) {
    msg = '' + (xhr.response.error || xhr.response);
  } else if (xhr.responseText) {
    msg = '' + xhr.responseText;
  } else {
    msg = 'fail to post ' + action + ' ' + xhr.status;
  }

  var err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr) {
  var text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  var xhr = new XMLHttpRequest();
  var action = option.action;

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }

  var formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach(function (key) {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    option.onSuccess(getBody(xhr));
  };

  xhr.open('post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  var headers = option.headers || {};

  for (var item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElUploadDrag',
  props: {
    disabled: Boolean
  },
  data: function data() {
    return {
      dragover: false
    };
  },

  methods: {
    onDragover: function onDragover() {
      if (!this.disabled) {
        this.dragover = true;
      }
    },
    onDrop: function onDrop(e) {
      if (!this.disabled) {
        this.dragover = false;
        this.$emit('file', e.dataTransfer.files);
      }
    }
  }
};

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-upload-dragger",class:{
    'is-dragover': _vm.dragover
  },on:{"drop":function($event){$event.preventDefault();_vm.onDrop($event)},"dragover":function($event){$event.preventDefault();_vm.onDragover($event)},"dragleave":function($event){$event.preventDefault();_vm.dragover = false}}},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_iframe_upload_vue__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_iframe_upload_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_iframe_upload_vue__);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_iframe_upload_vue___default.a,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _uploadDragger = __webpack_require__(51);

var _uploadDragger2 = _interopRequireDefault(_uploadDragger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    UploadDragger: _uploadDragger2.default
  },
  props: {
    type: String,
    data: {},
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    onPreview: {
      type: Function,
      default: function _default() {}
    },
    onRemove: {
      type: Function,
      default: function _default() {}
    },
    drag: Boolean,
    listType: String,
    disabled: Boolean,
    limit: Number,
    onExceed: Function
  },

  data: function data() {
    return {
      mouseover: false,
      domain: '',
      file: null,
      submitting: false
    };
  },


  methods: {
    isImage: function isImage(str) {
      return str.indexOf('image') !== -1;
    },
    handleClick: function handleClick() {
      if (!this.disabled) {
        this.$refs.input.click();
      }
    },
    handleChange: function handleChange(ev) {
      var file = ev.target.value;
      if (file) {
        this.uploadFiles(file);
      }
    },
    uploadFiles: function uploadFiles(file) {
      if (this.limit && this.$parent.uploadFiles.length + file.length > this.limit) {
        this.onExceed && this.onExceed(this.fileList);
        return;
      }

      if (this.submitting) return;
      this.submitting = true;
      this.file = file;
      this.onStart(file);

      var formNode = this.getFormNode();
      var dataSpan = this.getFormDataNode();
      var data = this.data;
      if (typeof data === 'function') {
        data = data(file);
      }
      var inputs = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          inputs.push('<input name="' + key + '" value="' + data[key] + '"/>');
        }
      }
      dataSpan.innerHTML = inputs.join('');
      formNode.submit();
      dataSpan.innerHTML = '';
    },
    getFormNode: function getFormNode() {
      return this.$refs.form;
    },
    getFormDataNode: function getFormDataNode() {
      return this.$refs.data;
    }
  },

  created: function created() {
    this.frameName = 'frame-' + Date.now();
  },
  mounted: function mounted() {
    var self = this;
    !this.$isServer && window.addEventListener('message', function (event) {
      if (!self.file) return;
      var targetOrigin = new URL(self.action).origin;
      if (event.origin !== targetOrigin) return;
      var response = event.data;
      if (response.result === 'success') {
        self.onSuccess(response, self.file);
      } else if (response.result === 'failed') {
        self.onError(response, self.file);
      }
      self.submitting = false;
      self.file = null;
    }, false);
  },
  render: function render(h) {
    var drag = this.drag,
        uploadFiles = this.uploadFiles,
        listType = this.listType,
        frameName = this.frameName,
        disabled = this.disabled;

    var oClass = { 'el-upload': true };
    oClass['el-upload--' + listType] = true;

    return h(
      'div',
      {
        'class': oClass,
        on: {
          'click': this.handleClick
        },
        nativeOn: {
          'drop': this.onDrop,
          'dragover': this.handleDragover,
          'dragleave': this.handleDragleave
        }
      },
      [h(
        'iframe',
        {
          on: {
            'load': this.onload
          },

          ref: 'iframe',
          attrs: { name: frameName
          }
        },
        []
      ), h(
        'form',
        { ref: 'form', attrs: { action: this.action, target: frameName, enctype: 'multipart/form-data', method: 'POST' }
        },
        [h(
          'input',
          {
            'class': 'el-upload__input',
            attrs: { type: 'file',

              name: 'file',

              accept: this.accept },
            ref: 'input', on: {
              'change': this.handleChange
            }
          },
          []
        ), h(
          'input',
          {
            attrs: { type: 'hidden', name: 'documentDomain', value: this.$isServer ? '' : document.domain }
          },
          []
        ), h(
          'span',
          { ref: 'data' },
          []
        )]
      ), drag ? h(
        'upload-dragger',
        {
          on: {
            'file': uploadFiles
          },
          attrs: { disabled: disabled }
        },
        [this.$slots.default]
      ) : this.$slots.default]
    );
  }
};

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = __webpack_require__(128);

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

module.exports = __webpack_require__(371);

/***/ }),

/***/ 50:
/***/ (function(module, exports) {

module.exports = __webpack_require__(372);

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_dragger_vue__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_dragger_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_dragger_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d4d91e8_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_upload_dragger_vue__ = __webpack_require__(343);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload_dragger_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d4d91e8_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_upload_dragger_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = __webpack_require__(112);

/***/ })

/******/ });

/***/ }),
/* 371 */
/***/ (function(module, exports) {

var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/

module.exports = function mergeJSXProps (objs) {
  return objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp
    for (key in b) {
      aa = a[key]
      bb = b[key]
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa
            a[key] = aa = {}
            aa[temp] = true
          }
          if (typeof bb === 'string') {
            temp = bb
            b[key] = bb = {}
            bb[temp] = true
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey])
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb)
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb)
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey]
          }
        }
      } else {
        a[key] = b[key]
      }
    }
    return a
  }, {})
}

function mergeFn (a, b) {
  return function () {
    a && a.apply(this, arguments)
    b && b.apply(this, arguments)
  }
}


/***/ }),
/* 372 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 346);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(347);


/***/ }),

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _progress = __webpack_require__(348);

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_progress2.default.install = function (Vue) {
  Vue.component(_progress2.default.name, _progress2.default);
};

exports.default = _progress2.default;

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_progress_vue__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_progress_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_progress_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ddec355_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_progress_vue__ = __webpack_require__(350);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_progress_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ddec355_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_progress_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElProgress',
  props: {
    type: {
      type: String,
      default: 'line',
      validator: function validator(val) {
        return ['line', 'circle'].indexOf(val) > -1;
      }
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: function validator(val) {
        return val >= 0 && val <= 100;
      }
    },
    status: {
      type: String
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    textInside: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 126
    },
    showText: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    barStyle: function barStyle() {
      var style = {};
      style.width = this.percentage + '%';
      return style;
    },
    relativeStrokeWidth: function relativeStrokeWidth() {
      return (this.strokeWidth / this.width * 100).toFixed(1);
    },
    trackPath: function trackPath() {
      var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);

      return 'M 50 50 m 0 -' + radius + ' a ' + radius + ' ' + radius + ' 0 1 1 0 ' + radius * 2 + ' a ' + radius + ' ' + radius + ' 0 1 1 0 -' + radius * 2;
    },
    perimeter: function perimeter() {
      var radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
      return 2 * Math.PI * radius;
    },
    circlePathStyle: function circlePathStyle() {
      var perimeter = this.perimeter;
      return {
        strokeDasharray: perimeter + 'px,' + perimeter + 'px',
        strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      };
    },
    stroke: function stroke() {
      var ret;
      switch (this.status) {
        case 'success':
          ret = '#13ce66';
          break;
        case 'exception':
          ret = '#ff4949';
          break;
        default:
          ret = '#20a0ff';
      }
      return ret;
    },
    iconClass: function iconClass() {
      if (this.type === 'line') {
        return this.status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-cross';
      } else {
        return this.status === 'success' ? 'el-icon-check' : 'el-icon-close';
      }
    },
    progressTextSize: function progressTextSize() {
      return this.type === 'line' ? 12 + this.strokeWidth * 0.4 : this.width * 0.111111 + 2;
    }
  }
};

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-progress",class:[
    'el-progress--' + _vm.type,
    _vm.status ? 'is-' + _vm.status : '',
    {
      'el-progress--without-text': !_vm.showText,
      'el-progress--text-inside': _vm.textInside,
    }
  ],attrs:{"role":"progressbar","aria-valuenow":_vm.percentage,"aria-valuemin":"0","aria-valuemax":"100"}},[(_vm.type === 'line')?_c('div',{staticClass:"el-progress-bar"},[_c('div',{staticClass:"el-progress-bar__outer",style:({height: _vm.strokeWidth + 'px'})},[_c('div',{staticClass:"el-progress-bar__inner",style:(_vm.barStyle)},[(_vm.showText && _vm.textInside)?_c('div',{staticClass:"el-progress-bar__innerText"},[_vm._v(_vm._s(_vm.percentage)+"%")]):_vm._e()])])]):_c('div',{staticClass:"el-progress-circle",style:({height: _vm.width + 'px', width: _vm.width + 'px'})},[_c('svg',{attrs:{"viewBox":"0 0 100 100"}},[_c('path',{staticClass:"el-progress-circle__track",attrs:{"d":_vm.trackPath,"stroke":"#e5e9f2","stroke-width":_vm.relativeStrokeWidth,"fill":"none"}}),_c('path',{staticClass:"el-progress-circle__path",style:(_vm.circlePathStyle),attrs:{"d":_vm.trackPath,"stroke-linecap":"round","stroke":_vm.stroke,"stroke-width":_vm.relativeStrokeWidth,"fill":"none"}})])]),(_vm.showText && !_vm.textInside)?_c('div',{staticClass:"el-progress__text",style:({fontSize: _vm.progressTextSize + 'px'})},[(!_vm.status)?[_vm._v(_vm._s(_vm.percentage)+"%")]:_c('i',{class:_vm.iconClass})],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(374)):"function"==typeof define&&define.amd?define(["quill"],e):"object"==typeof exports?exports.VueQuillEditor=e(require("quill")):t.VueQuillEditor=e(t.quill)}(this,function(t){return function(t){function e(i){if(n[i])return n[i].exports;var l=n[i]={i:i,l:!1,exports:{}};return t[i].call(l.exports,l,l.exports,e),l.l=!0,l.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=2)}([function(e,n){e.exports=t},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(4),l=n.n(i),o=n(6),r=n(5),u=r(l.a,o.a,!1,null,null,null);e.default=u.exports},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.install=e.quillEditor=e.Quill=void 0;var l=n(0),o=i(l),r=n(1),u=i(r),s=window.Quill||o.default,a=function(t,e){e&&(u.default.props.globalOptions.default=function(){return e}),t.component(u.default.name,u.default)},c={Quill:s,quillEditor:u.default,install:a};e.default=c,e.Quill=s,e.quillEditor=u.default,e.install=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={theme:"snow",boundary:document.body,modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image","video"]]},placeholder:"Insert text here ...",readOnly:!1}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var l=n(0),o=i(l),r=n(3),u=i(r),s=window.Quill||o.default;"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(t),i=1;i<arguments.length;i++){var l=arguments[i];if(null!=l)for(var o in l)Object.prototype.hasOwnProperty.call(l,o)&&(n[o]=l[o])}return n},writable:!0,configurable:!0}),e.default={name:"quill-editor",data:function(){return{_options:{},_content:"",defaultOptions:u.default}},props:{content:String,value:String,disabled:Boolean,options:{type:Object,required:!1,default:function(){return{}}},globalOptions:{type:Object,required:!1,default:function(){return{}}}},mounted:function(){this.initialize()},beforeDestroy:function(){this.quill=null,delete this.quill},methods:{initialize:function(){var t=this;this.$el&&(this._options=Object.assign({},this.defaultOptions,this.globalOptions,this.options),this.quill=new s(this.$refs.editor,this._options),(this.value||this.content)&&this.quill.pasteHTML(this.value||this.content),this.disabled&&this.quill.enable(!1),this.quill.on("selection-change",function(e){e?t.$emit("focus",t.quill):t.$emit("blur",t.quill)}),this.quill.on("text-change",function(e,n,i){var l=t.$refs.editor.children[0].innerHTML,o=t.quill,r=t.quill.getText();"<p><br></p>"===l&&(l=""),t._content=l,t.$emit("input",t._content),t.$emit("change",{html:l,text:r,quill:o})}),this.$emit("ready",this.quill))}},watch:{content:function(t,e){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},value:function(t,e){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},disabled:function(t,e){this.quill&&this.quill.enable(!t)}}}},function(t,e){t.exports=function(t,e,n,i,l,o){var r,u=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(r=t,u=t.default);var a="function"==typeof u?u.options:u;e&&(a.render=e.render,a.staticRenderFns=e.staticRenderFns,a._compiled=!0),n&&(a.functional=!0),l&&(a._scopeId=l);var c;if(o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},a._ssrRegister=c):i&&(c=i),c){var d=a.functional,f=d?a.render:a.beforeCreate;d?(a._injectStyles=c,a.render=function(t,e){return c.call(e),f(t,e)}):a.beforeCreate=f?[].concat(f,c):[c]}return{esModule:r,exports:u,options:a}}},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"quill-editor"},[t._t("toolbar"),t._v(" "),n("div",{ref:"editor"})],2)},l=[],o={render:i,staticRenderFns:l};e.a=o}])});

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
 * Quill Editor v1.3.4
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Quill"] = factory();
	else
		root["Quill"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 109);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(17);
var format_1 = __webpack_require__(18);
var leaf_1 = __webpack_require__(19);
var scroll_1 = __webpack_require__(45);
var inline_1 = __webpack_require__(46);
var block_1 = __webpack_require__(47);
var embed_1 = __webpack_require__(48);
var text_1 = __webpack_require__(49);
var attributor_1 = __webpack_require__(12);
var class_1 = __webpack_require__(32);
var style_1 = __webpack_require__(33);
var store_1 = __webpack_require__(31);
var Registry = __webpack_require__(1);
var Parchment = {
    Scope: Registry.Scope,
    create: Registry.create,
    find: Registry.find,
    query: Registry.query,
    register: Registry.register,
    Container: container_1.default,
    Format: format_1.default,
    Leaf: leaf_1.default,
    Embed: embed_1.default,
    Scroll: scroll_1.default,
    Block: block_1.default,
    Inline: inline_1.default,
    Text: text_1.default,
    Attributor: {
        Attribute: attributor_1.default,
        Class: class_1.default,
        Style: style_1.default,
        Store: store_1.default,
    },
};
exports.default = Parchment;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ParchmentError = /** @class */ (function (_super) {
    __extends(ParchmentError, _super);
    function ParchmentError(message) {
        var _this = this;
        message = '[Parchment] ' + message;
        _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = _this.constructor.name;
        return _this;
    }
    return ParchmentError;
}(Error));
exports.ParchmentError = ParchmentError;
var attributes = {};
var classes = {};
var tags = {};
var types = {};
exports.DATA_KEY = '__blot';
var Scope;
(function (Scope) {
    Scope[Scope["TYPE"] = 3] = "TYPE";
    Scope[Scope["LEVEL"] = 12] = "LEVEL";
    Scope[Scope["ATTRIBUTE"] = 13] = "ATTRIBUTE";
    Scope[Scope["BLOT"] = 14] = "BLOT";
    Scope[Scope["INLINE"] = 7] = "INLINE";
    Scope[Scope["BLOCK"] = 11] = "BLOCK";
    Scope[Scope["BLOCK_BLOT"] = 10] = "BLOCK_BLOT";
    Scope[Scope["INLINE_BLOT"] = 6] = "INLINE_BLOT";
    Scope[Scope["BLOCK_ATTRIBUTE"] = 9] = "BLOCK_ATTRIBUTE";
    Scope[Scope["INLINE_ATTRIBUTE"] = 5] = "INLINE_ATTRIBUTE";
    Scope[Scope["ANY"] = 15] = "ANY";
})(Scope = exports.Scope || (exports.Scope = {}));
function create(input, value) {
    var match = query(input);
    if (match == null) {
        throw new ParchmentError("Unable to create " + input + " blot");
    }
    var BlotClass = match;
    var node = input instanceof Node || input['nodeType'] === Node.TEXT_NODE ? input : BlotClass.create(value);
    return new BlotClass(node, value);
}
exports.create = create;
function find(node, bubble) {
    if (bubble === void 0) { bubble = false; }
    if (node == null)
        return null;
    if (node[exports.DATA_KEY] != null)
        return node[exports.DATA_KEY].blot;
    if (bubble)
        return find(node.parentNode, bubble);
    return null;
}
exports.find = find;
function query(query, scope) {
    if (scope === void 0) { scope = Scope.ANY; }
    var match;
    if (typeof query === 'string') {
        match = types[query] || attributes[query];
    }
    else if (query instanceof Text || query['nodeType'] === Node.TEXT_NODE) {
        match = types['text'];
    }
    else if (typeof query === 'number') {
        if (query & Scope.LEVEL & Scope.BLOCK) {
            match = types['block'];
        }
        else if (query & Scope.LEVEL & Scope.INLINE) {
            match = types['inline'];
        }
    }
    else if (query instanceof HTMLElement) {
        var names = (query.getAttribute('class') || '').split(/\s+/);
        for (var i in names) {
            match = classes[names[i]];
            if (match)
                break;
        }
        match = match || tags[query.tagName];
    }
    if (match == null)
        return null;
    if (scope & Scope.LEVEL & match.scope && scope & Scope.TYPE & match.scope)
        return match;
    return null;
}
exports.query = query;
function register() {
    var Definitions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Definitions[_i] = arguments[_i];
    }
    if (Definitions.length > 1) {
        return Definitions.map(function (d) {
            return register(d);
        });
    }
    var Definition = Definitions[0];
    if (typeof Definition.blotName !== 'string' && typeof Definition.attrName !== 'string') {
        throw new ParchmentError('Invalid definition');
    }
    else if (Definition.blotName === 'abstract') {
        throw new ParchmentError('Cannot register abstract class');
    }
    types[Definition.blotName || Definition.attrName] = Definition;
    if (typeof Definition.keyName === 'string') {
        attributes[Definition.keyName] = Definition;
    }
    else {
        if (Definition.className != null) {
            classes[Definition.className] = Definition;
        }
        if (Definition.tagName != null) {
            if (Array.isArray(Definition.tagName)) {
                Definition.tagName = Definition.tagName.map(function (tagName) {
                    return tagName.toUpperCase();
                });
            }
            else {
                Definition.tagName = Definition.tagName.toUpperCase();
            }
            var tagNames = Array.isArray(Definition.tagName) ? Definition.tagName : [Definition.tagName];
            tagNames.forEach(function (tag) {
                if (tags[tag] == null || Definition.className == null) {
                    tags[tag] = Definition;
                }
            });
        }
    }
    return Definition;
}
exports.register = register;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var diff = __webpack_require__(51);
var equal = __webpack_require__(11);
var extend = __webpack_require__(3);
var op = __webpack_require__(20);


var NULL_CHARACTER = String.fromCharCode(0);  // Placeholder char for embed in diff()


var Delta = function (ops) {
  // Assume we are given a well formed ops
  if (Array.isArray(ops)) {
    this.ops = ops;
  } else if (ops != null && Array.isArray(ops.ops)) {
    this.ops = ops.ops;
  } else {
    this.ops = [];
  }
};


Delta.prototype.insert = function (text, attributes) {
  var newOp = {};
  if (text.length === 0) return this;
  newOp.insert = text;
  if (attributes != null && typeof attributes === 'object' && Object.keys(attributes).length > 0) {
    newOp.attributes = attributes;
  }
  return this.push(newOp);
};

Delta.prototype['delete'] = function (length) {
  if (length <= 0) return this;
  return this.push({ 'delete': length });
};

Delta.prototype.retain = function (length, attributes) {
  if (length <= 0) return this;
  var newOp = { retain: length };
  if (attributes != null && typeof attributes === 'object' && Object.keys(attributes).length > 0) {
    newOp.attributes = attributes;
  }
  return this.push(newOp);
};

Delta.prototype.push = function (newOp) {
  var index = this.ops.length;
  var lastOp = this.ops[index - 1];
  newOp = extend(true, {}, newOp);
  if (typeof lastOp === 'object') {
    if (typeof newOp['delete'] === 'number' && typeof lastOp['delete'] === 'number') {
      this.ops[index - 1] = { 'delete': lastOp['delete'] + newOp['delete'] };
      return this;
    }
    // Since it does not matter if we insert before or after deleting at the same index,
    // always prefer to insert first
    if (typeof lastOp['delete'] === 'number' && newOp.insert != null) {
      index -= 1;
      lastOp = this.ops[index - 1];
      if (typeof lastOp !== 'object') {
        this.ops.unshift(newOp);
        return this;
      }
    }
    if (equal(newOp.attributes, lastOp.attributes)) {
      if (typeof newOp.insert === 'string' && typeof lastOp.insert === 'string') {
        this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
        if (typeof newOp.attributes === 'object') this.ops[index - 1].attributes = newOp.attributes
        return this;
      } else if (typeof newOp.retain === 'number' && typeof lastOp.retain === 'number') {
        this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
        if (typeof newOp.attributes === 'object') this.ops[index - 1].attributes = newOp.attributes
        return this;
      }
    }
  }
  if (index === this.ops.length) {
    this.ops.push(newOp);
  } else {
    this.ops.splice(index, 0, newOp);
  }
  return this;
};

Delta.prototype.chop = function () {
  var lastOp = this.ops[this.ops.length - 1];
  if (lastOp && lastOp.retain && !lastOp.attributes) {
    this.ops.pop();
  }
  return this;
};

Delta.prototype.filter = function (predicate) {
  return this.ops.filter(predicate);
};

Delta.prototype.forEach = function (predicate) {
  this.ops.forEach(predicate);
};

Delta.prototype.map = function (predicate) {
  return this.ops.map(predicate);
};

Delta.prototype.partition = function (predicate) {
  var passed = [], failed = [];
  this.forEach(function(op) {
    var target = predicate(op) ? passed : failed;
    target.push(op);
  });
  return [passed, failed];
};

Delta.prototype.reduce = function (predicate, initial) {
  return this.ops.reduce(predicate, initial);
};

Delta.prototype.changeLength = function () {
  return this.reduce(function (length, elem) {
    if (elem.insert) {
      return length + op.length(elem);
    } else if (elem.delete) {
      return length - elem.delete;
    }
    return length;
  }, 0);
};

Delta.prototype.length = function () {
  return this.reduce(function (length, elem) {
    return length + op.length(elem);
  }, 0);
};

Delta.prototype.slice = function (start, end) {
  start = start || 0;
  if (typeof end !== 'number') end = Infinity;
  var ops = [];
  var iter = op.iterator(this.ops);
  var index = 0;
  while (index < end && iter.hasNext()) {
    var nextOp;
    if (index < start) {
      nextOp = iter.next(start - index);
    } else {
      nextOp = iter.next(end - index);
      ops.push(nextOp);
    }
    index += op.length(nextOp);
  }
  return new Delta(ops);
};


Delta.prototype.compose = function (other) {
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  var delta = new Delta();
  while (thisIter.hasNext() || otherIter.hasNext()) {
    if (otherIter.peekType() === 'insert') {
      delta.push(otherIter.next());
    } else if (thisIter.peekType() === 'delete') {
      delta.push(thisIter.next());
    } else {
      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
      var thisOp = thisIter.next(length);
      var otherOp = otherIter.next(length);
      if (typeof otherOp.retain === 'number') {
        var newOp = {};
        if (typeof thisOp.retain === 'number') {
          newOp.retain = length;
        } else {
          newOp.insert = thisOp.insert;
        }
        // Preserve null when composing with a retain, otherwise remove it for inserts
        var attributes = op.attributes.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
        if (attributes) newOp.attributes = attributes;
        delta.push(newOp);
      // Other op should be delete, we could be an insert or retain
      // Insert + delete cancels out
      } else if (typeof otherOp['delete'] === 'number' && typeof thisOp.retain === 'number') {
        delta.push(otherOp);
      }
    }
  }
  return delta.chop();
};

Delta.prototype.concat = function (other) {
  var delta = new Delta(this.ops.slice());
  if (other.ops.length > 0) {
    delta.push(other.ops[0]);
    delta.ops = delta.ops.concat(other.ops.slice(1));
  }
  return delta;
};

Delta.prototype.diff = function (other, index) {
  if (this.ops === other.ops) {
    return new Delta();
  }
  var strings = [this, other].map(function (delta) {
    return delta.map(function (op) {
      if (op.insert != null) {
        return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;
      }
      var prep = (delta === other) ? 'on' : 'with';
      throw new Error('diff() called ' + prep + ' non-document');
    }).join('');
  });
  var delta = new Delta();
  var diffResult = diff(strings[0], strings[1], index);
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  diffResult.forEach(function (component) {
    var length = component[1].length;
    while (length > 0) {
      var opLength = 0;
      switch (component[0]) {
        case diff.INSERT:
          opLength = Math.min(otherIter.peekLength(), length);
          delta.push(otherIter.next(opLength));
          break;
        case diff.DELETE:
          opLength = Math.min(length, thisIter.peekLength());
          thisIter.next(opLength);
          delta['delete'](opLength);
          break;
        case diff.EQUAL:
          opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
          var thisOp = thisIter.next(opLength);
          var otherOp = otherIter.next(opLength);
          if (equal(thisOp.insert, otherOp.insert)) {
            delta.retain(opLength, op.attributes.diff(thisOp.attributes, otherOp.attributes));
          } else {
            delta.push(otherOp)['delete'](opLength);
          }
          break;
      }
      length -= opLength;
    }
  });
  return delta.chop();
};

Delta.prototype.eachLine = function (predicate, newline) {
  newline = newline || '\n';
  var iter = op.iterator(this.ops);
  var line = new Delta();
  var i = 0;
  while (iter.hasNext()) {
    if (iter.peekType() !== 'insert') return;
    var thisOp = iter.peek();
    var start = op.length(thisOp) - iter.peekLength();
    var index = typeof thisOp.insert === 'string' ?
      thisOp.insert.indexOf(newline, start) - start : -1;
    if (index < 0) {
      line.push(iter.next());
    } else if (index > 0) {
      line.push(iter.next(index));
    } else {
      if (predicate(line, iter.next(1).attributes || {}, i) === false) {
        return;
      }
      i += 1;
      line = new Delta();
    }
  }
  if (line.length() > 0) {
    predicate(line, {}, i);
  }
};

Delta.prototype.transform = function (other, priority) {
  priority = !!priority;
  if (typeof other === 'number') {
    return this.transformPosition(other, priority);
  }
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  var delta = new Delta();
  while (thisIter.hasNext() || otherIter.hasNext()) {
    if (thisIter.peekType() === 'insert' && (priority || otherIter.peekType() !== 'insert')) {
      delta.retain(op.length(thisIter.next()));
    } else if (otherIter.peekType() === 'insert') {
      delta.push(otherIter.next());
    } else {
      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
      var thisOp = thisIter.next(length);
      var otherOp = otherIter.next(length);
      if (thisOp['delete']) {
        // Our delete either makes their delete redundant or removes their retain
        continue;
      } else if (otherOp['delete']) {
        delta.push(otherOp);
      } else {
        // We retain either their retain or insert
        delta.retain(length, op.attributes.transform(thisOp.attributes, otherOp.attributes, priority));
      }
    }
  }
  return delta.chop();
};

Delta.prototype.transformPosition = function (index, priority) {
  priority = !!priority;
  var thisIter = op.iterator(this.ops);
  var offset = 0;
  while (thisIter.hasNext() && offset <= index) {
    var length = thisIter.peekLength();
    var nextType = thisIter.peekType();
    thisIter.next();
    if (nextType === 'delete') {
      index -= Math.min(length, index - offset);
      continue;
    } else if (nextType === 'insert' && (offset < index || !priority)) {
      index += length;
    }
    offset += length;
  }
  return index;
};


module.exports = Delta;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockEmbed = exports.bubbleFormats = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _break = __webpack_require__(16);

var _break2 = _interopRequireDefault(_break);

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NEWLINE_LENGTH = 1;

var BlockEmbed = function (_Parchment$Embed) {
  _inherits(BlockEmbed, _Parchment$Embed);

  function BlockEmbed() {
    _classCallCheck(this, BlockEmbed);

    return _possibleConstructorReturn(this, (BlockEmbed.__proto__ || Object.getPrototypeOf(BlockEmbed)).apply(this, arguments));
  }

  _createClass(BlockEmbed, [{
    key: 'attach',
    value: function attach() {
      _get(BlockEmbed.prototype.__proto__ || Object.getPrototypeOf(BlockEmbed.prototype), 'attach', this).call(this);
      this.attributes = new _parchment2.default.Attributor.Store(this.domNode);
    }
  }, {
    key: 'delta',
    value: function delta() {
      return new _quillDelta2.default().insert(this.value(), (0, _extend2.default)(this.formats(), this.attributes.values()));
    }
  }, {
    key: 'format',
    value: function format(name, value) {
      var attribute = _parchment2.default.query(name, _parchment2.default.Scope.BLOCK_ATTRIBUTE);
      if (attribute != null) {
        this.attributes.attribute(attribute, value);
      }
    }
  }, {
    key: 'formatAt',
    value: function formatAt(index, length, name, value) {
      this.format(name, value);
    }
  }, {
    key: 'insertAt',
    value: function insertAt(index, value, def) {
      if (typeof value === 'string' && value.endsWith('\n')) {
        var block = _parchment2.default.create(Block.blotName);
        this.parent.insertBefore(block, index === 0 ? this : this.next);
        block.insertAt(0, value.slice(0, -1));
      } else {
        _get(BlockEmbed.prototype.__proto__ || Object.getPrototypeOf(BlockEmbed.prototype), 'insertAt', this).call(this, index, value, def);
      }
    }
  }]);

  return BlockEmbed;
}(_parchment2.default.Embed);

BlockEmbed.scope = _parchment2.default.Scope.BLOCK_BLOT;
// It is important for cursor behavior BlockEmbeds use tags that are block level elements


var Block = function (_Parchment$Block) {
  _inherits(Block, _Parchment$Block);

  function Block(domNode) {
    _classCallCheck(this, Block);

    var _this2 = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, domNode));

    _this2.cache = {};
    return _this2;
  }

  _createClass(Block, [{
    key: 'delta',
    value: function delta() {
      if (this.cache.delta == null) {
        this.cache.delta = this.descendants(_parchment2.default.Leaf).reduce(function (delta, leaf) {
          if (leaf.length() === 0) {
            return delta;
          } else {
            return delta.insert(leaf.value(), bubbleFormats(leaf));
          }
        }, new _quillDelta2.default()).insert('\n', bubbleFormats(this));
      }
      return this.cache.delta;
    }
  }, {
    key: 'deleteAt',
    value: function deleteAt(index, length) {
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'deleteAt', this).call(this, index, length);
      this.cache = {};
    }
  }, {
    key: 'formatAt',
    value: function formatAt(index, length, name, value) {
      if (length <= 0) return;
      if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK)) {
        if (index + length === this.length()) {
          this.format(name, value);
        }
      } else {
        _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'formatAt', this).call(this, index, Math.min(length, this.length() - index - 1), name, value);
      }
      this.cache = {};
    }
  }, {
    key: 'insertAt',
    value: function insertAt(index, value, def) {
      if (def != null) return _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, index, value, def);
      if (value.length === 0) return;
      var lines = value.split('\n');
      var text = lines.shift();
      if (text.length > 0) {
        if (index < this.length() - 1 || this.children.tail == null) {
          _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, Math.min(index, this.length() - 1), text);
        } else {
          this.children.tail.insertAt(this.children.tail.length(), text);
        }
        this.cache = {};
      }
      var block = this;
      lines.reduce(function (index, line) {
        block = block.split(index, true);
        block.insertAt(0, line);
        return line.length;
      }, index + text.length);
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(blot, ref) {
      var head = this.children.head;
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertBefore', this).call(this, blot, ref);
      if (head instanceof _break2.default) {
        head.remove();
      }
      this.cache = {};
    }
  }, {
    key: 'length',
    value: function length() {
      if (this.cache.length == null) {
        this.cache.length = _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'length', this).call(this) + NEWLINE_LENGTH;
      }
      return this.cache.length;
    }
  }, {
    key: 'moveChildren',
    value: function moveChildren(target, ref) {
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'moveChildren', this).call(this, target, ref);
      this.cache = {};
    }
  }, {
    key: 'optimize',
    value: function optimize(context) {
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'optimize', this).call(this, context);
      this.cache = {};
    }
  }, {
    key: 'path',
    value: function path(index) {
      return _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'path', this).call(this, index, true);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'removeChild', this).call(this, child);
      this.cache = {};
    }
  }, {
    key: 'split',
    value: function split(index) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (force && (index === 0 || index >= this.length() - NEWLINE_LENGTH)) {
        var clone = this.clone();
        if (index === 0) {
          this.parent.insertBefore(clone, this);
          return this;
        } else {
          this.parent.insertBefore(clone, this.next);
          return clone;
        }
      } else {
        var next = _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'split', this).call(this, index, force);
        this.cache = {};
        return next;
      }
    }
  }]);

  return Block;
}(_parchment2.default.Block);

Block.blotName = 'block';
Block.tagName = 'P';
Block.defaultChild = 'break';
Block.allowedChildren = [_inline2.default, _parchment2.default.Embed, _text2.default];

function bubbleFormats(blot) {
  var formats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (blot == null) return formats;
  if (typeof blot.formats === 'function') {
    formats = (0, _extend2.default)(formats, blot.formats());
  }
  if (blot.parent == null || blot.parent.blotName == 'scroll' || blot.parent.statics.scope !== blot.statics.scope) {
    return formats;
  }
  return bubbleFormats(blot.parent, formats);
}

exports.bubbleFormats = bubbleFormats;
exports.BlockEmbed = BlockEmbed;
exports.default = Block;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.overload = exports.expandConfig = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(50);

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _editor = __webpack_require__(14);

var _editor2 = _interopRequireDefault(_editor);

var _emitter3 = __webpack_require__(8);

var _emitter4 = _interopRequireDefault(_emitter3);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _selection = __webpack_require__(15);

var _selection2 = _interopRequireDefault(_selection);

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

var _theme = __webpack_require__(34);

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _logger2.default)('quill');

var Quill = function () {
  _createClass(Quill, null, [{
    key: 'debug',
    value: function debug(limit) {
      if (limit === true) {
        limit = 'log';
      }
      _logger2.default.level(limit);
    }
  }, {
    key: 'find',
    value: function find(node) {
      return node.__quill || _parchment2.default.find(node);
    }
  }, {
    key: 'import',
    value: function _import(name) {
      if (this.imports[name] == null) {
        debug.error('Cannot import ' + name + '. Are you sure it was registered?');
      }
      return this.imports[name];
    }
  }, {
    key: 'register',
    value: function register(path, target) {
      var _this = this;

      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (typeof path !== 'string') {
        var name = path.attrName || path.blotName;
        if (typeof name === 'string') {
          // register(Blot | Attributor, overwrite)
          this.register('formats/' + name, path, target);
        } else {
          Object.keys(path).forEach(function (key) {
            _this.register(key, path[key], target);
          });
        }
      } else {
        if (this.imports[path] != null && !overwrite) {
          debug.warn('Overwriting ' + path + ' with', target);
        }
        this.imports[path] = target;
        if ((path.startsWith('blots/') || path.startsWith('formats/')) && target.blotName !== 'abstract') {
          _parchment2.default.register(target);
        } else if (path.startsWith('modules') && typeof target.register === 'function') {
          target.register();
        }
      }
    }
  }]);

  function Quill(container) {
    var _this2 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Quill);

    this.options = expandConfig(container, options);
    this.container = this.options.container;
    if (this.container == null) {
      return debug.error('Invalid Quill container', container);
    }
    if (this.options.debug) {
      Quill.debug(this.options.debug);
    }
    var html = this.container.innerHTML.trim();
    this.container.classList.add('ql-container');
    this.container.innerHTML = '';
    this.container.__quill = this;
    this.root = this.addContainer('ql-editor');
    this.root.classList.add('ql-blank');
    this.root.setAttribute('data-gramm', false);
    this.scrollingContainer = this.options.scrollingContainer || this.root;
    this.emitter = new _emitter4.default();
    this.scroll = _parchment2.default.create(this.root, {
      emitter: this.emitter,
      whitelist: this.options.formats
    });
    this.editor = new _editor2.default(this.scroll);
    this.selection = new _selection2.default(this.scroll, this.emitter);
    this.theme = new this.options.theme(this, this.options);
    this.keyboard = this.theme.addModule('keyboard');
    this.clipboard = this.theme.addModule('clipboard');
    this.history = this.theme.addModule('history');
    this.theme.init();
    this.emitter.on(_emitter4.default.events.EDITOR_CHANGE, function (type) {
      if (type === _emitter4.default.events.TEXT_CHANGE) {
        _this2.root.classList.toggle('ql-blank', _this2.editor.isBlank());
      }
    });
    this.emitter.on(_emitter4.default.events.SCROLL_UPDATE, function (source, mutations) {
      var range = _this2.selection.lastRange;
      var index = range && range.length === 0 ? range.index : undefined;
      modify.call(_this2, function () {
        return _this2.editor.update(null, mutations, index);
      }, source);
    });
    var contents = this.clipboard.convert('<div class=\'ql-editor\' style="white-space: normal;">' + html + '<p><br></p></div>');
    this.setContents(contents);
    this.history.clear();
    if (this.options.placeholder) {
      this.root.setAttribute('data-placeholder', this.options.placeholder);
    }
    if (this.options.readOnly) {
      this.disable();
    }
  }

  _createClass(Quill, [{
    key: 'addContainer',
    value: function addContainer(container) {
      var refNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (typeof container === 'string') {
        var className = container;
        container = document.createElement('div');
        container.classList.add(className);
      }
      this.container.insertBefore(container, refNode);
      return container;
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.selection.setRange(null);
    }
  }, {
    key: 'deleteText',
    value: function deleteText(index, length, source) {
      var _this3 = this;

      var _overload = overload(index, length, source);

      var _overload2 = _slicedToArray(_overload, 4);

      index = _overload2[0];
      length = _overload2[1];
      source = _overload2[3];

      return modify.call(this, function () {
        return _this3.editor.deleteText(index, length);
      }, source, index, -1 * length);
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.enable(false);
    }
  }, {
    key: 'enable',
    value: function enable() {
      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.scroll.enable(enabled);
      this.container.classList.toggle('ql-disabled', !enabled);
    }
  }, {
    key: 'focus',
    value: function focus() {
      var scrollTop = this.scrollingContainer.scrollTop;
      this.selection.focus();
      this.scrollingContainer.scrollTop = scrollTop;
      this.scrollIntoView();
    }
  }, {
    key: 'format',
    value: function format(name, value) {
      var _this4 = this;

      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter4.default.sources.API;

      return modify.call(this, function () {
        var range = _this4.getSelection(true);
        var change = new _quillDelta2.default();
        if (range == null) {
          return change;
        } else if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK)) {
          change = _this4.editor.formatLine(range.index, range.length, _defineProperty({}, name, value));
        } else if (range.length === 0) {
          _this4.selection.format(name, value);
          return change;
        } else {
          change = _this4.editor.formatText(range.index, range.length, _defineProperty({}, name, value));
        }
        _this4.setSelection(range, _emitter4.default.sources.SILENT);
        return change;
      }, source);
    }
  }, {
    key: 'formatLine',
    value: function formatLine(index, length, name, value, source) {
      var _this5 = this;

      var formats = void 0;

      var _overload3 = overload(index, length, name, value, source);

      var _overload4 = _slicedToArray(_overload3, 4);

      index = _overload4[0];
      length = _overload4[1];
      formats = _overload4[2];
      source = _overload4[3];

      return modify.call(this, function () {
        return _this5.editor.formatLine(index, length, formats);
      }, source, index, 0);
    }
  }, {
    key: 'formatText',
    value: function formatText(index, length, name, value, source) {
      var _this6 = this;

      var formats = void 0;

      var _overload5 = overload(index, length, name, value, source);

      var _overload6 = _slicedToArray(_overload5, 4);

      index = _overload6[0];
      length = _overload6[1];
      formats = _overload6[2];
      source = _overload6[3];

      return modify.call(this, function () {
        return _this6.editor.formatText(index, length, formats);
      }, source, index, 0);
    }
  }, {
    key: 'getBounds',
    value: function getBounds(index) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var bounds = void 0;
      if (typeof index === 'number') {
        bounds = this.selection.getBounds(index, length);
      } else {
        bounds = this.selection.getBounds(index.index, index.length);
      }
      var containerBounds = this.container.getBoundingClientRect();
      return {
        bottom: bounds.bottom - containerBounds.top,
        height: bounds.height,
        left: bounds.left - containerBounds.left,
        right: bounds.right - containerBounds.left,
        top: bounds.top - containerBounds.top,
        width: bounds.width
      };
    }
  }, {
    key: 'getContents',
    value: function getContents() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;

      var _overload7 = overload(index, length);

      var _overload8 = _slicedToArray(_overload7, 2);

      index = _overload8[0];
      length = _overload8[1];

      return this.editor.getContents(index, length);
    }
  }, {
    key: 'getFormat',
    value: function getFormat() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getSelection(true);
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (typeof index === 'number') {
        return this.editor.getFormat(index, length);
      } else {
        return this.editor.getFormat(index.index, index.length);
      }
    }
  }, {
    key: 'getIndex',
    value: function getIndex(blot) {
      return blot.offset(this.scroll);
    }
  }, {
    key: 'getLength',
    value: function getLength() {
      return this.scroll.length();
    }
  }, {
    key: 'getLeaf',
    value: function getLeaf(index) {
      return this.scroll.leaf(index);
    }
  }, {
    key: 'getLine',
    value: function getLine(index) {
      return this.scroll.line(index);
    }
  }, {
    key: 'getLines',
    value: function getLines() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;

      if (typeof index !== 'number') {
        return this.scroll.lines(index.index, index.length);
      } else {
        return this.scroll.lines(index, length);
      }
    }
  }, {
    key: 'getModule',
    value: function getModule(name) {
      return this.theme.modules[name];
    }
  }, {
    key: 'getSelection',
    value: function getSelection() {
      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (focus) this.focus();
      this.update(); // Make sure we access getRange with editor in consistent state
      return this.selection.getRange()[0];
    }
  }, {
    key: 'getText',
    value: function getText() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;

      var _overload9 = overload(index, length);

      var _overload10 = _slicedToArray(_overload9, 2);

      index = _overload10[0];
      length = _overload10[1];

      return this.editor.getText(index, length);
    }
  }, {
    key: 'hasFocus',
    value: function hasFocus() {
      return this.selection.hasFocus();
    }
  }, {
    key: 'insertEmbed',
    value: function insertEmbed(index, embed, value) {
      var _this7 = this;

      var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Quill.sources.API;

      return modify.call(this, function () {
        return _this7.editor.insertEmbed(index, embed, value);
      }, source, index);
    }
  }, {
    key: 'insertText',
    value: function insertText(index, text, name, value, source) {
      var _this8 = this;

      var formats = void 0;

      var _overload11 = overload(index, 0, name, value, source);

      var _overload12 = _slicedToArray(_overload11, 4);

      index = _overload12[0];
      formats = _overload12[2];
      source = _overload12[3];

      return modify.call(this, function () {
        return _this8.editor.insertText(index, text, formats);
      }, source, index, text.length);
    }
  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return !this.container.classList.contains('ql-disabled');
    }
  }, {
    key: 'off',
    value: function off() {
      return this.emitter.off.apply(this.emitter, arguments);
    }
  }, {
    key: 'on',
    value: function on() {
      return this.emitter.on.apply(this.emitter, arguments);
    }
  }, {
    key: 'once',
    value: function once() {
      return this.emitter.once.apply(this.emitter, arguments);
    }
  }, {
    key: 'pasteHTML',
    value: function pasteHTML(index, html, source) {
      this.clipboard.dangerouslyPasteHTML(index, html, source);
    }
  }, {
    key: 'removeFormat',
    value: function removeFormat(index, length, source) {
      var _this9 = this;

      var _overload13 = overload(index, length, source);

      var _overload14 = _slicedToArray(_overload13, 4);

      index = _overload14[0];
      length = _overload14[1];
      source = _overload14[3];

      return modify.call(this, function () {
        return _this9.editor.removeFormat(index, length);
      }, source, index);
    }
  }, {
    key: 'scrollIntoView',
    value: function scrollIntoView() {
      this.selection.scrollIntoView(this.scrollingContainer);
    }
  }, {
    key: 'setContents',
    value: function setContents(delta) {
      var _this10 = this;

      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;

      return modify.call(this, function () {
        delta = new _quillDelta2.default(delta);
        var length = _this10.getLength();
        var deleted = _this10.editor.deleteText(0, length);
        var applied = _this10.editor.applyDelta(delta);
        var lastOp = applied.ops[applied.ops.length - 1];
        if (lastOp != null && typeof lastOp.insert === 'string' && lastOp.insert[lastOp.insert.length - 1] === '\n') {
          _this10.editor.deleteText(_this10.getLength() - 1, 1);
          applied.delete(1);
        }
        var ret = deleted.compose(applied);
        return ret;
      }, source);
    }
  }, {
    key: 'setSelection',
    value: function setSelection(index, length, source) {
      if (index == null) {
        this.selection.setRange(null, length || Quill.sources.API);
      } else {
        var _overload15 = overload(index, length, source);

        var _overload16 = _slicedToArray(_overload15, 4);

        index = _overload16[0];
        length = _overload16[1];
        source = _overload16[3];

        this.selection.setRange(new _selection.Range(index, length), source);
        if (source !== _emitter4.default.sources.SILENT) {
          this.selection.scrollIntoView(this.scrollingContainer);
        }
      }
    }
  }, {
    key: 'setText',
    value: function setText(text) {
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;

      var delta = new _quillDelta2.default().insert(text);
      return this.setContents(delta, source);
    }
  }, {
    key: 'update',
    value: function update() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter4.default.sources.USER;

      var change = this.scroll.update(source); // Will update selection before selection.update() does if text changes
      this.selection.update(source);
      return change;
    }
  }, {
    key: 'updateContents',
    value: function updateContents(delta) {
      var _this11 = this;

      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;

      return modify.call(this, function () {
        delta = new _quillDelta2.default(delta);
        return _this11.editor.applyDelta(delta, source);
      }, source, true);
    }
  }]);

  return Quill;
}();

Quill.DEFAULTS = {
  bounds: null,
  formats: null,
  modules: {},
  placeholder: '',
  readOnly: false,
  scrollingContainer: null,
  strict: true,
  theme: 'default'
};
Quill.events = _emitter4.default.events;
Quill.sources = _emitter4.default.sources;
// eslint-disable-next-line no-undef
Quill.version =  false ? 'dev' : "1.3.4";

Quill.imports = {
  'delta': _quillDelta2.default,
  'parchment': _parchment2.default,
  'core/module': _module2.default,
  'core/theme': _theme2.default
};

function expandConfig(container, userConfig) {
  userConfig = (0, _extend2.default)(true, {
    container: container,
    modules: {
      clipboard: true,
      keyboard: true,
      history: true
    }
  }, userConfig);
  if (!userConfig.theme || userConfig.theme === Quill.DEFAULTS.theme) {
    userConfig.theme = _theme2.default;
  } else {
    userConfig.theme = Quill.import('themes/' + userConfig.theme);
    if (userConfig.theme == null) {
      throw new Error('Invalid theme ' + userConfig.theme + '. Did you register it?');
    }
  }
  var themeConfig = (0, _extend2.default)(true, {}, userConfig.theme.DEFAULTS);
  [themeConfig, userConfig].forEach(function (config) {
    config.modules = config.modules || {};
    Object.keys(config.modules).forEach(function (module) {
      if (config.modules[module] === true) {
        config.modules[module] = {};
      }
    });
  });
  var moduleNames = Object.keys(themeConfig.modules).concat(Object.keys(userConfig.modules));
  var moduleConfig = moduleNames.reduce(function (config, name) {
    var moduleClass = Quill.import('modules/' + name);
    if (moduleClass == null) {
      debug.error('Cannot load ' + name + ' module. Are you sure you registered it?');
    } else {
      config[name] = moduleClass.DEFAULTS || {};
    }
    return config;
  }, {});
  // Special case toolbar shorthand
  if (userConfig.modules != null && userConfig.modules.toolbar && userConfig.modules.toolbar.constructor !== Object) {
    userConfig.modules.toolbar = {
      container: userConfig.modules.toolbar
    };
  }
  userConfig = (0, _extend2.default)(true, {}, Quill.DEFAULTS, { modules: moduleConfig }, themeConfig, userConfig);
  ['bounds', 'container', 'scrollingContainer'].forEach(function (key) {
    if (typeof userConfig[key] === 'string') {
      userConfig[key] = document.querySelector(userConfig[key]);
    }
  });
  userConfig.modules = Object.keys(userConfig.modules).reduce(function (config, name) {
    if (userConfig.modules[name]) {
      config[name] = userConfig.modules[name];
    }
    return config;
  }, {});
  return userConfig;
}

// Handle selection preservation and TEXT_CHANGE emission
// common to modification APIs
function modify(modifier, source, index, shift) {
  if (this.options.strict && !this.isEnabled() && source === _emitter4.default.sources.USER) {
    return new _quillDelta2.default();
  }
  var range = index == null ? null : this.getSelection();
  var oldDelta = this.editor.delta;
  var change = modifier();
  if (range != null) {
    if (index === true) index = range.index;
    if (shift == null) {
      range = shiftRange(range, change, source);
    } else if (shift !== 0) {
      range = shiftRange(range, index, shift, source);
    }
    this.setSelection(range, _emitter4.default.sources.SILENT);
  }
  if (change.length() > 0) {
    var _emitter;

    var args = [_emitter4.default.events.TEXT_CHANGE, change, oldDelta, source];
    (_emitter = this.emitter).emit.apply(_emitter, [_emitter4.default.events.EDITOR_CHANGE].concat(args));
    if (source !== _emitter4.default.sources.SILENT) {
      var _emitter2;

      (_emitter2 = this.emitter).emit.apply(_emitter2, args);
    }
  }
  return change;
}

function overload(index, length, name, value, source) {
  var formats = {};
  if (typeof index.index === 'number' && typeof index.length === 'number') {
    // Allow for throwaway end (used by insertText/insertEmbed)
    if (typeof length !== 'number') {
      source = value, value = name, name = length, length = index.length, index = index.index;
    } else {
      length = index.length, index = index.index;
    }
  } else if (typeof length !== 'number') {
    source = value, value = name, name = length, length = 0;
  }
  // Handle format being object, two format name/value strings or excluded
  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
    formats = name;
    source = value;
  } else if (typeof name === 'string') {
    if (value != null) {
      formats[name] = value;
    } else {
      source = name;
    }
  }
  // Handle optional source
  source = source || _emitter4.default.sources.API;
  return [index, length, formats, source];
}

function shiftRange(range, index, length, source) {
  if (range == null) return null;
  var start = void 0,
      end = void 0;
  if (index instanceof _quillDelta2.default) {
    var _map = [range.index, range.index + range.length].map(function (pos) {
      return index.transformPosition(pos, source !== _emitter4.default.sources.USER);
    });

    var _map2 = _slicedToArray(_map, 2);

    start = _map2[0];
    end = _map2[1];
  } else {
    var _map3 = [range.index, range.index + range.length].map(function (pos) {
      if (pos < index || pos === index && source === _emitter4.default.sources.USER) return pos;
      if (length >= 0) {
        return pos + length;
      } else {
        return Math.max(index, pos + length);
      }
    });

    var _map4 = _slicedToArray(_map3, 2);

    start = _map4[0];
    end = _map4[1];
  }
  return new _selection.Range(start, end - start);
}

exports.expandConfig = expandConfig;
exports.overload = overload;
exports.default = Quill;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inline = function (_Parchment$Inline) {
  _inherits(Inline, _Parchment$Inline);

  function Inline() {
    _classCallCheck(this, Inline);

    return _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
  }

  _createClass(Inline, [{
    key: 'formatAt',
    value: function formatAt(index, length, name, value) {
      if (Inline.compare(this.statics.blotName, name) < 0 && _parchment2.default.query(name, _parchment2.default.Scope.BLOT)) {
        var blot = this.isolate(index, length);
        if (value) {
          blot.wrap(name, value);
        }
      } else {
        _get(Inline.prototype.__proto__ || Object.getPrototypeOf(Inline.prototype), 'formatAt', this).call(this, index, length, name, value);
      }
    }
  }, {
    key: 'optimize',
    value: function optimize(context) {
      _get(Inline.prototype.__proto__ || Object.getPrototypeOf(Inline.prototype), 'optimize', this).call(this, context);
      if (this.parent instanceof Inline && Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
        var parent = this.parent.isolate(this.offset(), this.length());
        this.moveChildren(parent);
        parent.wrap(this);
      }
    }
  }], [{
    key: 'compare',
    value: function compare(self, other) {
      var selfIndex = Inline.order.indexOf(self);
      var otherIndex = Inline.order.indexOf(other);
      if (selfIndex >= 0 || otherIndex >= 0) {
        return selfIndex - otherIndex;
      } else if (self === other) {
        return 0;
      } else if (self < other) {
        return -1;
      } else {
        return 1;
      }
    }
  }]);

  return Inline;
}(_parchment2.default.Inline);

Inline.allowedChildren = [Inline, _parchment2.default.Embed, _text2.default];
// Lower index means deeper in the DOM tree, since not found (-1) is for embeds
Inline.order = ['cursor', 'inline', // Must be lower
'underline', 'strike', 'italic', 'bold', 'script', 'link', 'code' // Must be higher
];

exports.default = Inline;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextBlot = function (_Parchment$Text) {
  _inherits(TextBlot, _Parchment$Text);

  function TextBlot() {
    _classCallCheck(this, TextBlot);

    return _possibleConstructorReturn(this, (TextBlot.__proto__ || Object.getPrototypeOf(TextBlot)).apply(this, arguments));
  }

  return TextBlot;
}(_parchment2.default.Text);

exports.default = TextBlot;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _eventemitter = __webpack_require__(54);

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = (0, _logger2.default)('quill:events');

var EVENTS = ['selectionchange', 'mousedown', 'mouseup', 'click'];

EVENTS.forEach(function (eventName) {
  document.addEventListener(eventName, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    [].slice.call(document.querySelectorAll('.ql-container')).forEach(function (node) {
      // TODO use WeakMap
      if (node.__quill && node.__quill.emitter) {
        var _node$__quill$emitter;

        (_node$__quill$emitter = node.__quill.emitter).handleDOM.apply(_node$__quill$emitter, args);
      }
    });
  });
});

var Emitter = function (_EventEmitter) {
  _inherits(Emitter, _EventEmitter);

  function Emitter() {
    _classCallCheck(this, Emitter);

    var _this = _possibleConstructorReturn(this, (Emitter.__proto__ || Object.getPrototypeOf(Emitter)).call(this));

    _this.listeners = {};
    _this.on('error', debug.error);
    return _this;
  }

  _createClass(Emitter, [{
    key: 'emit',
    value: function emit() {
      debug.log.apply(debug, arguments);
      _get(Emitter.prototype.__proto__ || Object.getPrototypeOf(Emitter.prototype), 'emit', this).apply(this, arguments);
    }
  }, {
    key: 'handleDOM',
    value: function handleDOM(event) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (this.listeners[event.type] || []).forEach(function (_ref) {
        var node = _ref.node,
            handler = _ref.handler;

        if (event.target === node || node.contains(event.target)) {
          handler.apply(undefined, [event].concat(args));
        }
      });
    }
  }, {
    key: 'listenDOM',
    value: function listenDOM(eventName, node, handler) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push({ node: node, handler: handler });
    }
  }]);

  return Emitter;
}(_eventemitter2.default);

Emitter.events = {
  EDITOR_CHANGE: 'editor-change',
  SCROLL_BEFORE_UPDATE: 'scroll-before-update',
  SCROLL_OPTIMIZE: 'scroll-optimize',
  SCROLL_UPDATE: 'scroll-update',
  SELECTION_CHANGE: 'selection-change',
  TEXT_CHANGE: 'text-change'
};
Emitter.sources = {
  API: 'api',
  SILENT: 'silent',
  USER: 'user'
};

exports.default = Emitter;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = function Module(quill) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, Module);

  this.quill = quill;
  this.options = options;
};

Module.DEFAULTS = {};

exports.default = Module;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var levels = ['error', 'warn', 'log', 'info'];
var level = 'warn';

function debug(method) {
  if (levels.indexOf(method) <= levels.indexOf(level)) {
    var _console;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_console = console)[method].apply(_console, args); // eslint-disable-line no-console
  }
}

function namespace(ns) {
  return levels.reduce(function (logger, method) {
    logger[method] = debug.bind(console, method, ns);
    return logger;
  }, {});
}

debug.level = namespace.level = function (newLevel) {
  level = newLevel;
};

exports.default = namespace;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(52);
var isArguments = __webpack_require__(53);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Registry = __webpack_require__(1);
var Attributor = /** @class */ (function () {
    function Attributor(attrName, keyName, options) {
        if (options === void 0) { options = {}; }
        this.attrName = attrName;
        this.keyName = keyName;
        var attributeBit = Registry.Scope.TYPE & Registry.Scope.ATTRIBUTE;
        if (options.scope != null) {
            // Ignore type bits, force attribute bit
            this.scope = (options.scope & Registry.Scope.LEVEL) | attributeBit;
        }
        else {
            this.scope = Registry.Scope.ATTRIBUTE;
        }
        if (options.whitelist != null)
            this.whitelist = options.whitelist;
    }
    Attributor.keys = function (node) {
        return [].map.call(node.attributes, function (item) {
            return item.name;
        });
    };
    Attributor.prototype.add = function (node, value) {
        if (!this.canAdd(node, value))
            return false;
        node.setAttribute(this.keyName, value);
        return true;
    };
    Attributor.prototype.canAdd = function (node, value) {
        var match = Registry.query(node, Registry.Scope.BLOT & (this.scope | Registry.Scope.TYPE));
        if (match != null && (this.whitelist == null || this.whitelist.indexOf(value) > -1)) {
            return true;
        }
        return false;
    };
    Attributor.prototype.remove = function (node) {
        node.removeAttribute(this.keyName);
    };
    Attributor.prototype.value = function (node) {
        var value = node.getAttribute(this.keyName);
        return this.canAdd(node, value) ? value : '';
    };
    return Attributor;
}());
exports.default = Attributor;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Code = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Code = function (_Inline) {
  _inherits(Code, _Inline);

  function Code() {
    _classCallCheck(this, Code);

    return _possibleConstructorReturn(this, (Code.__proto__ || Object.getPrototypeOf(Code)).apply(this, arguments));
  }

  return Code;
}(_inline2.default);

Code.blotName = 'code';
Code.tagName = 'CODE';

var CodeBlock = function (_Block) {
  _inherits(CodeBlock, _Block);

  function CodeBlock() {
    _classCallCheck(this, CodeBlock);

    return _possibleConstructorReturn(this, (CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock)).apply(this, arguments));
  }

  _createClass(CodeBlock, [{
    key: 'delta',
    value: function delta() {
      var _this3 = this;

      var text = this.domNode.textContent;
      if (text.endsWith('\n')) {
        // Should always be true
        text = text.slice(0, -1);
      }
      return text.split('\n').reduce(function (delta, frag) {
        return delta.insert(frag).insert('\n', _this3.formats());
      }, new _quillDelta2.default());
    }
  }, {
    key: 'format',
    value: function format(name, value) {
      if (name === this.statics.blotName && value) return;

      var _descendant = this.descendant(_text2.default, this.length() - 1),
          _descendant2 = _slicedToArray(_descendant, 1),
          text = _descendant2[0];

      if (text != null) {
        text.deleteAt(text.length() - 1, 1);
      }
      _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'format', this).call(this, name, value);
    }
  }, {
    key: 'formatAt',
    value: function formatAt(index, length, name, value) {
      if (length === 0) return;
      if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK) == null || name === this.statics.blotName && value === this.statics.formats(this.domNode)) {
        return;
      }
      var nextNewline = this.newlineIndex(index);
      if (nextNewline < 0 || nextNewline >= index + length) return;
      var prevNewline = this.newlineIndex(index, true) + 1;
      var isolateLength = nextNewline - prevNewline + 1;
      var blot = this.isolate(prevNewline, isolateLength);
      var next = blot.next;
      blot.format(name, value);
      if (next instanceof CodeBlock) {
        next.formatAt(0, index - prevNewline + length - isolateLength, name, value);
      }
    }
  }, {
    key: 'insertAt',
    value: function insertAt(index, value, def) {
      if (def != null) return;

      var _descendant3 = this.descendant(_text2.default, index),
          _descendant4 = _slicedToArray(_descendant3, 2),
          text = _descendant4[0],
          offset = _descendant4[1];

      text.insertAt(offset, value);
    }
  }, {
    key: 'length',
    value: function length() {
      var length = this.domNode.textContent.length;
      if (!this.domNode.textContent.endsWith('\n')) {
        return length + 1;
      }
      return length;
    }
  }, {
    key: 'newlineIndex',
    value: function newlineIndex(searchIndex) {
      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!reverse) {
        var offset = this.domNode.textContent.slice(searchIndex).indexOf('\n');
        return offset > -1 ? searchIndex + offset : -1;
      } else {
        return this.domNode.textContent.slice(0, searchIndex).lastIndexOf('\n');
      }
    }
  }, {
    key: 'optimize',
    value: function optimize(context) {
      if (!this.domNode.textContent.endsWith('\n')) {
        this.appendChild(_parchment2.default.create('text', '\n'));
      }
      _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'optimize', this).call(this, context);
      var next = this.next;
      if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === next.statics.formats(next.domNode)) {
        next.optimize(context);
        next.moveChildren(this);
        next.remove();
      }
    }
  }, {
    key: 'replace',
    value: function replace(target) {
      _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'replace', this).call(this, target);
      [].slice.call(this.domNode.querySelectorAll('*')).forEach(function (node) {
        var blot = _parchment2.default.find(node);
        if (blot == null) {
          node.parentNode.removeChild(node);
        } else if (blot instanceof _parchment2.default.Embed) {
          blot.remove();
        } else {
          blot.unwrap();
        }
      });
    }
  }], [{
    key: 'create',
    value: function create(value) {
      var domNode = _get(CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock), 'create', this).call(this, value);
      domNode.setAttribute('spellcheck', false);
      return domNode;
    }
  }, {
    key: 'formats',
    value: function formats() {
      return true;
    }
  }]);

  return CodeBlock;
}(_block2.default);

CodeBlock.blotName = 'code-block';
CodeBlock.tagName = 'PRE';
CodeBlock.TAB = '  ';

exports.Code = Code;
exports.default = CodeBlock;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _op = __webpack_require__(20);

var _op2 = _interopRequireDefault(_op);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _code = __webpack_require__(13);

var _code2 = _interopRequireDefault(_code);

var _cursor = __webpack_require__(23);

var _cursor2 = _interopRequireDefault(_cursor);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

var _break = __webpack_require__(16);

var _break2 = _interopRequireDefault(_break);

var _clone = __webpack_require__(21);

var _clone2 = _interopRequireDefault(_clone);

var _deepEqual = __webpack_require__(11);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ASCII = /^[ -~]*$/;

var Editor = function () {
  function Editor(scroll) {
    _classCallCheck(this, Editor);

    this.scroll = scroll;
    this.delta = this.getDelta();
  }

  _createClass(Editor, [{
    key: 'applyDelta',
    value: function applyDelta(delta) {
      var _this = this;

      var consumeNextNewline = false;
      this.scroll.update();
      var scrollLength = this.scroll.length();
      this.scroll.batchStart();
      delta = normalizeDelta(delta);
      delta.reduce(function (index, op) {
        var length = op.retain || op.delete || op.insert.length || 1;
        var attributes = op.attributes || {};
        if (op.insert != null) {
          if (typeof op.insert === 'string') {
            var text = op.insert;
            if (text.endsWith('\n') && consumeNextNewline) {
              consumeNextNewline = false;
              text = text.slice(0, -1);
            }
            if (index >= scrollLength && !text.endsWith('\n')) {
              consumeNextNewline = true;
            }
            _this.scroll.insertAt(index, text);

            var _scroll$line = _this.scroll.line(index),
                _scroll$line2 = _slicedToArray(_scroll$line, 2),
                line = _scroll$line2[0],
                offset = _scroll$line2[1];

            var formats = (0, _extend2.default)({}, (0, _block.bubbleFormats)(line));
            if (line instanceof _block2.default) {
              var _line$descendant = line.descendant(_parchment2.default.Leaf, offset),
                  _line$descendant2 = _slicedToArray(_line$descendant, 1),
                  leaf = _line$descendant2[0];

              formats = (0, _extend2.default)(formats, (0, _block.bubbleFormats)(leaf));
            }
            attributes = _op2.default.attributes.diff(formats, attributes) || {};
          } else if (_typeof(op.insert) === 'object') {
            var key = Object.keys(op.insert)[0]; // There should only be one key
            if (key == null) return index;
            _this.scroll.insertAt(index, key, op.insert[key]);
          }
          scrollLength += length;
        }
        Object.keys(attributes).forEach(function (name) {
          _this.scroll.formatAt(index, length, name, attributes[name]);
        });
        return index + length;
      }, 0);
      delta.reduce(function (index, op) {
        if (typeof op.delete === 'number') {
          _this.scroll.deleteAt(index, op.delete);
          return index;
        }
        return index + (op.retain || op.insert.length || 1);
      }, 0);
      this.scroll.batchEnd();
      return this.update(delta);
    }
  }, {
    key: 'deleteText',
    value: function deleteText(index, length) {
      this.scroll.deleteAt(index, length);
      return this.update(new _quillDelta2.default().retain(index).delete(length));
    }
  }, {
    key: 'formatLine',
    value: function formatLine(index, length) {
      var _this2 = this;

      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      this.scroll.update();
      Object.keys(formats).forEach(function (format) {
        if (_this2.scroll.whitelist != null && !_this2.scroll.whitelist[format]) return;
        var lines = _this2.scroll.lines(index, Math.max(length, 1));
        var lengthRemaining = length;
        lines.forEach(function (line) {
          var lineLength = line.length();
          if (!(line instanceof _code2.default)) {
            line.format(format, formats[format]);
          } else {
            var codeIndex = index - line.offset(_this2.scroll);
            var codeLength = line.newlineIndex(codeIndex + lengthRemaining) - codeIndex + 1;
            line.formatAt(codeIndex, codeLength, format, formats[format]);
          }
          lengthRemaining -= lineLength;
        });
      });
      this.scroll.optimize();
      return this.update(new _quillDelta2.default().retain(index).retain(length, (0, _clone2.default)(formats)));
    }
  }, {
    key: 'formatText',
    value: function formatText(index, length) {
      var _this3 = this;

      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      Object.keys(formats).forEach(function (format) {
        _this3.scroll.formatAt(index, length, format, formats[format]);
      });
      return this.update(new _quillDelta2.default().retain(index).retain(length, (0, _clone2.default)(formats)));
    }
  }, {
    key: 'getContents',
    value: function getContents(index, length) {
      return this.delta.slice(index, index + length);
    }
  }, {
    key: 'getDelta',
    value: function getDelta() {
      return this.scroll.lines().reduce(function (delta, line) {
        return delta.concat(line.delta());
      }, new _quillDelta2.default());
    }
  }, {
    key: 'getFormat',
    value: function getFormat(index) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var lines = [],
          leaves = [];
      if (length === 0) {
        this.scroll.path(index).forEach(function (path) {
          var _path = _slicedToArray(path, 1),
              blot = _path[0];

          if (blot instanceof _block2.default) {
            lines.push(blot);
          } else if (blot instanceof _parchment2.default.Leaf) {
            leaves.push(blot);
          }
        });
      } else {
        lines = this.scroll.lines(index, length);
        leaves = this.scroll.descendants(_parchment2.default.Leaf, index, length);
      }
      var formatsArr = [lines, leaves].map(function (blots) {
        if (blots.length === 0) return {};
        var formats = (0, _block.bubbleFormats)(blots.shift());
        while (Object.keys(formats).length > 0) {
          var blot = blots.shift();
          if (blot == null) return formats;
          formats = combineFormats((0, _block.bubbleFormats)(blot), formats);
        }
        return formats;
      });
      return _extend2.default.apply(_extend2.default, formatsArr);
    }
  }, {
    key: 'getText',
    value: function getText(index, length) {
      return this.getContents(index, length).filter(function (op) {
        return typeof op.insert === 'string';
      }).map(function (op) {
        return op.insert;
      }).join('');
    }
  }, {
    key: 'insertEmbed',
    value: function insertEmbed(index, embed, value) {
      this.scroll.insertAt(index, embed, value);
      return this.update(new _quillDelta2.default().retain(index).insert(_defineProperty({}, embed, value)));
    }
  }, {
    key: 'insertText',
    value: function insertText(index, text) {
      var _this4 = this;

      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      this.scroll.insertAt(index, text);
      Object.keys(formats).forEach(function (format) {
        _this4.scroll.formatAt(index, text.length, format, formats[format]);
      });
      return this.update(new _quillDelta2.default().retain(index).insert(text, (0, _clone2.default)(formats)));
    }
  }, {
    key: 'isBlank',
    value: function isBlank() {
      if (this.scroll.children.length == 0) return true;
      if (this.scroll.children.length > 1) return false;
      var block = this.scroll.children.head;
      if (block.statics.blotName !== _block2.default.blotName) return false;
      if (block.children.length > 1) return false;
      return block.children.head instanceof _break2.default;
    }
  }, {
    key: 'removeFormat',
    value: function removeFormat(index, length) {
      var text = this.getText(index, length);

      var _scroll$line3 = this.scroll.line(index + length),
          _scroll$line4 = _slicedToArray(_scroll$line3, 2),
          line = _scroll$line4[0],
          offset = _scroll$line4[1];

      var suffixLength = 0,
          suffix = new _quillDelta2.default();
      if (line != null) {
        if (!(line instanceof _code2.default)) {
          suffixLength = line.length() - offset;
        } else {
          suffixLength = line.newlineIndex(offset) - offset + 1;
        }
        suffix = line.delta().slice(offset, offset + suffixLength - 1).insert('\n');
      }
      var contents = this.getContents(index, length + suffixLength);
      var diff = contents.diff(new _quillDelta2.default().insert(text).concat(suffix));
      var delta = new _quillDelta2.default().retain(index).concat(diff);
      return this.applyDelta(delta);
    }
  }, {
    key: 'update',
    value: function update(change) {
      var mutations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var cursorIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      var oldDelta = this.delta;
      if (mutations.length === 1 && mutations[0].type === 'characterData' && mutations[0].target.data.match(ASCII) && _parchment2.default.find(mutations[0].target)) {
        // Optimization for character changes
        var textBlot = _parchment2.default.find(mutations[0].target);
        var formats = (0, _block.bubbleFormats)(textBlot);
        var index = textBlot.offset(this.scroll);
        var oldValue = mutations[0].oldValue.replace(_cursor2.default.CONTENTS, '');
        var oldText = new _quillDelta2.default().insert(oldValue);
        var newText = new _quillDelta2.default().insert(textBlot.value());
        var diffDelta = new _quillDelta2.default().retain(index).concat(oldText.diff(newText, cursorIndex));
        change = diffDelta.reduce(function (delta, op) {
          if (op.insert) {
            return delta.insert(op.insert, formats);
          } else {
            return delta.push(op);
          }
        }, new _quillDelta2.default());
        this.delta = oldDelta.compose(change);
      } else {
        this.delta = this.getDelta();
        if (!change || !(0, _deepEqual2.default)(oldDelta.compose(change), this.delta)) {
          change = oldDelta.diff(this.delta, cursorIndex);
        }
      }
      return change;
    }
  }]);

  return Editor;
}();

function combineFormats(formats, combined) {
  return Object.keys(combined).reduce(function (merged, name) {
    if (formats[name] == null) return merged;
    if (combined[name] === formats[name]) {
      merged[name] = combined[name];
    } else if (Array.isArray(combined[name])) {
      if (combined[name].indexOf(formats[name]) < 0) {
        merged[name] = combined[name].concat([formats[name]]);
      }
    } else {
      merged[name] = [combined[name], formats[name]];
    }
    return merged;
  }, {});
}

function normalizeDelta(delta) {
  return delta.reduce(function (delta, op) {
    if (op.insert === 1) {
      var attributes = (0, _clone2.default)(op.attributes);
      delete attributes['image'];
      return delta.insert({ image: op.attributes.image }, attributes);
    }
    if (op.attributes != null && (op.attributes.list === true || op.attributes.bullet === true)) {
      op = (0, _clone2.default)(op);
      if (op.attributes.list) {
        op.attributes.list = 'ordered';
      } else {
        op.attributes.list = 'bullet';
        delete op.attributes.bullet;
      }
    }
    if (typeof op.insert === 'string') {
      var text = op.insert.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      return delta.insert(text, op.attributes);
    }
    return delta.push(op);
  }, new _quillDelta2.default());
}

exports.default = Editor;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Range = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _clone = __webpack_require__(21);

var _clone2 = _interopRequireDefault(_clone);

var _deepEqual = __webpack_require__(11);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _emitter3 = __webpack_require__(8);

var _emitter4 = _interopRequireDefault(_emitter3);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _logger2.default)('quill:selection');

var Range = function Range(index) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  _classCallCheck(this, Range);

  this.index = index;
  this.length = length;
};

var Selection = function () {
  function Selection(scroll, emitter) {
    var _this = this;

    _classCallCheck(this, Selection);

    this.emitter = emitter;
    this.scroll = scroll;
    this.composing = false;
    this.mouseDown = false;
    this.root = this.scroll.domNode;
    this.cursor = _parchment2.default.create('cursor', this);
    // savedRange is last non-null range
    this.lastRange = this.savedRange = new Range(0, 0);
    this.handleComposition();
    this.handleDragging();
    this.emitter.listenDOM('selectionchange', document, function () {
      if (!_this.mouseDown) {
        setTimeout(_this.update.bind(_this, _emitter4.default.sources.USER), 1);
      }
    });
    this.emitter.on(_emitter4.default.events.EDITOR_CHANGE, function (type, delta) {
      if (type === _emitter4.default.events.TEXT_CHANGE && delta.length() > 0) {
        _this.update(_emitter4.default.sources.SILENT);
      }
    });
    this.emitter.on(_emitter4.default.events.SCROLL_BEFORE_UPDATE, function () {
      if (!_this.hasFocus()) return;
      var native = _this.getNativeRange();
      if (native == null) return;
      if (native.start.node === _this.cursor.textNode) return; // cursor.restore() will handle
      // TODO unclear if this has negative side effects
      _this.emitter.once(_emitter4.default.events.SCROLL_UPDATE, function () {
        try {
          _this.setNativeRange(native.start.node, native.start.offset, native.end.node, native.end.offset);
        } catch (ignored) {}
      });
    });
    this.emitter.on(_emitter4.default.events.SCROLL_OPTIMIZE, function (mutations, context) {
      if (context.range) {
        var _context$range = context.range,
            startNode = _context$range.startNode,
            startOffset = _context$range.startOffset,
            endNode = _context$range.endNode,
            endOffset = _context$range.endOffset;

        _this.setNativeRange(startNode, startOffset, endNode, endOffset);
      }
    });
    this.update(_emitter4.default.sources.SILENT);
  }

  _createClass(Selection, [{
    key: 'handleComposition',
    value: function handleComposition() {
      var _this2 = this;

      this.root.addEventListener('compositionstart', function () {
        _this2.composing = true;
      });
      this.root.addEventListener('compositionend', function () {
        _this2.composing = false;
        if (_this2.cursor.parent) {
          var range = _this2.cursor.restore();
          if (!range) return;
          setTimeout(function () {
            _this2.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);
          }, 1);
        }
      });
    }
  }, {
    key: 'handleDragging',
    value: function handleDragging() {
      var _this3 = this;

      this.emitter.listenDOM('mousedown', document.body, function () {
        _this3.mouseDown = true;
      });
      this.emitter.listenDOM('mouseup', document.body, function () {
        _this3.mouseDown = false;
        _this3.update(_emitter4.default.sources.USER);
      });
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.hasFocus()) return;
      this.root.focus();
      this.setRange(this.savedRange);
    }
  }, {
    key: 'format',
    value: function format(_format, value) {
      if (this.scroll.whitelist != null && !this.scroll.whitelist[_format]) return;
      this.scroll.update();
      var nativeRange = this.getNativeRange();
      if (nativeRange == null || !nativeRange.native.collapsed || _parchment2.default.query(_format, _parchment2.default.Scope.BLOCK)) return;
      if (nativeRange.start.node !== this.cursor.textNode) {
        var blot = _parchment2.default.find(nativeRange.start.node, false);
        if (blot == null) return;
        // TODO Give blot ability to not split
        if (blot instanceof _parchment2.default.Leaf) {
          var after = blot.split(nativeRange.start.offset);
          blot.parent.insertBefore(this.cursor, after);
        } else {
          blot.insertBefore(this.cursor, nativeRange.start.node); // Should never happen
        }
        this.cursor.attach();
      }
      this.cursor.format(_format, value);
      this.scroll.optimize();
      this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length);
      this.update();
    }
  }, {
    key: 'getBounds',
    value: function getBounds(index) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var scrollLength = this.scroll.length();
      index = Math.min(index, scrollLength - 1);
      length = Math.min(index + length, scrollLength - 1) - index;
      var node = void 0,
          _scroll$leaf = this.scroll.leaf(index),
          _scroll$leaf2 = _slicedToArray(_scroll$leaf, 2),
          leaf = _scroll$leaf2[0],
          offset = _scroll$leaf2[1];
      if (leaf == null) return null;

      var _leaf$position = leaf.position(offset, true);

      var _leaf$position2 = _slicedToArray(_leaf$position, 2);

      node = _leaf$position2[0];
      offset = _leaf$position2[1];

      var range = document.createRange();
      if (length > 0) {
        range.setStart(node, offset);

        var _scroll$leaf3 = this.scroll.leaf(index + length);

        var _scroll$leaf4 = _slicedToArray(_scroll$leaf3, 2);

        leaf = _scroll$leaf4[0];
        offset = _scroll$leaf4[1];

        if (leaf == null) return null;

        var _leaf$position3 = leaf.position(offset, true);

        var _leaf$position4 = _slicedToArray(_leaf$position3, 2);

        node = _leaf$position4[0];
        offset = _leaf$position4[1];

        range.setEnd(node, offset);
        return range.getBoundingClientRect();
      } else {
        var side = 'left';
        var rect = void 0;
        if (node instanceof Text) {
          if (offset < node.data.length) {
            range.setStart(node, offset);
            range.setEnd(node, offset + 1);
          } else {
            range.setStart(node, offset - 1);
            range.setEnd(node, offset);
            side = 'right';
          }
          rect = range.getBoundingClientRect();
        } else {
          rect = leaf.domNode.getBoundingClientRect();
          if (offset > 0) side = 'right';
        }
        return {
          bottom: rect.top + rect.height,
          height: rect.height,
          left: rect[side],
          right: rect[side],
          top: rect.top,
          width: 0
        };
      }
    }
  }, {
    key: 'getNativeRange',
    value: function getNativeRange() {
      var selection = document.getSelection();
      if (selection == null || selection.rangeCount <= 0) return null;
      var nativeRange = selection.getRangeAt(0);
      if (nativeRange == null) return null;
      var range = this.normalizeNative(nativeRange);
      debug.info('getNativeRange', range);
      return range;
    }
  }, {
    key: 'getRange',
    value: function getRange() {
      var normalized = this.getNativeRange();
      if (normalized == null) return [null, null];
      var range = this.normalizedToRange(normalized);
      return [range, normalized];
    }
  }, {
    key: 'hasFocus',
    value: function hasFocus() {
      return document.activeElement === this.root;
    }
  }, {
    key: 'normalizedToRange',
    value: function normalizedToRange(range) {
      var _this4 = this;

      var positions = [[range.start.node, range.start.offset]];
      if (!range.native.collapsed) {
        positions.push([range.end.node, range.end.offset]);
      }
      var indexes = positions.map(function (position) {
        var _position = _slicedToArray(position, 2),
            node = _position[0],
            offset = _position[1];

        var blot = _parchment2.default.find(node, true);
        var index = blot.offset(_this4.scroll);
        if (offset === 0) {
          return index;
        } else if (blot instanceof _parchment2.default.Container) {
          return index + blot.length();
        } else {
          return index + blot.index(node, offset);
        }
      });
      var end = Math.min(Math.max.apply(Math, _toConsumableArray(indexes)), this.scroll.length() - 1);
      var start = Math.min.apply(Math, [end].concat(_toConsumableArray(indexes)));
      return new Range(start, end - start);
    }
  }, {
    key: 'normalizeNative',
    value: function normalizeNative(nativeRange) {
      if (!contains(this.root, nativeRange.startContainer) || !nativeRange.collapsed && !contains(this.root, nativeRange.endContainer)) {
        return null;
      }
      var range = {
        start: { node: nativeRange.startContainer, offset: nativeRange.startOffset },
        end: { node: nativeRange.endContainer, offset: nativeRange.endOffset },
        native: nativeRange
      };
      [range.start, range.end].forEach(function (position) {
        var node = position.node,
            offset = position.offset;
        while (!(node instanceof Text) && node.childNodes.length > 0) {
          if (node.childNodes.length > offset) {
            node = node.childNodes[offset];
            offset = 0;
          } else if (node.childNodes.length === offset) {
            node = node.lastChild;
            offset = node instanceof Text ? node.data.length : node.childNodes.length + 1;
          } else {
            break;
          }
        }
        position.node = node, position.offset = offset;
      });
      return range;
    }
  }, {
    key: 'rangeToNative',
    value: function rangeToNative(range) {
      var _this5 = this;

      var indexes = range.collapsed ? [range.index] : [range.index, range.index + range.length];
      var args = [];
      var scrollLength = this.scroll.length();
      indexes.forEach(function (index, i) {
        index = Math.min(scrollLength - 1, index);
        var node = void 0,
            _scroll$leaf5 = _this5.scroll.leaf(index),
            _scroll$leaf6 = _slicedToArray(_scroll$leaf5, 2),
            leaf = _scroll$leaf6[0],
            offset = _scroll$leaf6[1];
        var _leaf$position5 = leaf.position(offset, i !== 0);

        var _leaf$position6 = _slicedToArray(_leaf$position5, 2);

        node = _leaf$position6[0];
        offset = _leaf$position6[1];

        args.push(node, offset);
      });
      if (args.length < 2) {
        args = args.concat(args);
      }
      return args;
    }
  }, {
    key: 'scrollIntoView',
    value: function scrollIntoView(scrollingContainer) {
      var range = this.lastRange;
      if (range == null) return;
      var bounds = this.getBounds(range.index, range.length);
      if (bounds == null) return;
      var limit = this.scroll.length() - 1;

      var _scroll$line = this.scroll.line(Math.min(range.index, limit)),
          _scroll$line2 = _slicedToArray(_scroll$line, 1),
          first = _scroll$line2[0];

      var last = first;
      if (range.length > 0) {
        var _scroll$line3 = this.scroll.line(Math.min(range.index + range.length, limit));

        var _scroll$line4 = _slicedToArray(_scroll$line3, 1);

        last = _scroll$line4[0];
      }
      if (first == null || last == null) return;
      var scrollBounds = scrollingContainer.getBoundingClientRect();
      if (bounds.top < scrollBounds.top) {
        scrollingContainer.scrollTop -= scrollBounds.top - bounds.top;
      } else if (bounds.bottom > scrollBounds.bottom) {
        scrollingContainer.scrollTop += bounds.bottom - scrollBounds.bottom;
      }
    }
  }, {
    key: 'setNativeRange',
    value: function setNativeRange(startNode, startOffset) {
      var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : startNode;
      var endOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : startOffset;
      var force = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      debug.info('setNativeRange', startNode, startOffset, endNode, endOffset);
      if (startNode != null && (this.root.parentNode == null || startNode.parentNode == null || endNode.parentNode == null)) {
        return;
      }
      var selection = document.getSelection();
      if (selection == null) return;
      if (startNode != null) {
        if (!this.hasFocus()) this.root.focus();
        var native = (this.getNativeRange() || {}).native;
        if (native == null || force || startNode !== native.startContainer || startOffset !== native.startOffset || endNode !== native.endContainer || endOffset !== native.endOffset) {

          if (startNode.tagName == "BR") {
            startOffset = [].indexOf.call(startNode.parentNode.childNodes, startNode);
            startNode = startNode.parentNode;
          }
          if (endNode.tagName == "BR") {
            endOffset = [].indexOf.call(endNode.parentNode.childNodes, endNode);
            endNode = endNode.parentNode;
          }
          var range = document.createRange();
          range.setStart(startNode, startOffset);
          range.setEnd(endNode, endOffset);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        selection.removeAllRanges();
        this.root.blur();
        document.body.focus(); // root.blur() not enough on IE11+Travis+SauceLabs (but not local VMs)
      }
    }
  }, {
    key: 'setRange',
    value: function setRange(range) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter4.default.sources.API;

      if (typeof force === 'string') {
        source = force;
        force = false;
      }
      debug.info('setRange', range);
      if (range != null) {
        var args = this.rangeToNative(range);
        this.setNativeRange.apply(this, _toConsumableArray(args).concat([force]));
      } else {
        this.setNativeRange(null);
      }
      this.update(source);
    }
  }, {
    key: 'update',
    value: function update() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter4.default.sources.USER;

      var oldRange = this.lastRange;

      var _getRange = this.getRange(),
          _getRange2 = _slicedToArray(_getRange, 2),
          lastRange = _getRange2[0],
          nativeRange = _getRange2[1];

      this.lastRange = lastRange;
      if (this.lastRange != null) {
        this.savedRange = this.lastRange;
      }
      if (!(0, _deepEqual2.default)(oldRange, this.lastRange)) {
        var _emitter;

        if (!this.composing && nativeRange != null && nativeRange.native.collapsed && nativeRange.start.node !== this.cursor.textNode) {
          this.cursor.restore();
        }
        var args = [_emitter4.default.events.SELECTION_CHANGE, (0, _clone2.default)(this.lastRange), (0, _clone2.default)(oldRange), source];
        (_emitter = this.emitter).emit.apply(_emitter, [_emitter4.default.events.EDITOR_CHANGE].concat(args));
        if (source !== _emitter4.default.sources.SILENT) {
          var _emitter2;

          (_emitter2 = this.emitter).emit.apply(_emitter2, args);
        }
      }
    }
  }]);

  return Selection;
}();

function contains(parent, descendant) {
  try {
    // Firefox inserts inaccessible nodes around video elements
    descendant.parentNode;
  } catch (e) {
    return false;
  }
  // IE11 has bug with Text nodes
  // https://connect.microsoft.com/IE/feedback/details/780874/node-contains-is-incorrect
  if (descendant instanceof Text) {
    descendant = descendant.parentNode;
  }
  return parent.contains(descendant);
}

exports.Range = Range;
exports.default = Selection;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Break = function (_Parchment$Embed) {
  _inherits(Break, _Parchment$Embed);

  function Break() {
    _classCallCheck(this, Break);

    return _possibleConstructorReturn(this, (Break.__proto__ || Object.getPrototypeOf(Break)).apply(this, arguments));
  }

  _createClass(Break, [{
    key: 'insertInto',
    value: function insertInto(parent, ref) {
      if (parent.children.length === 0) {
        _get(Break.prototype.__proto__ || Object.getPrototypeOf(Break.prototype), 'insertInto', this).call(this, parent, ref);
      } else {
        this.remove();
      }
    }
  }, {
    key: 'length',
    value: function length() {
      return 0;
    }
  }, {
    key: 'value',
    value: function value() {
      return '';
    }
  }], [{
    key: 'value',
    value: function value() {
      return undefined;
    }
  }]);

  return Break;
}(_parchment2.default.Embed);

Break.blotName = 'break';
Break.tagName = 'BR';

exports.default = Break;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var linked_list_1 = __webpack_require__(44);
var shadow_1 = __webpack_require__(30);
var Registry = __webpack_require__(1);
var ContainerBlot = /** @class */ (function (_super) {
    __extends(ContainerBlot, _super);
    function ContainerBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContainerBlot.prototype.appendChild = function (other) {
        this.insertBefore(other);
    };
    ContainerBlot.prototype.attach = function () {
        var _this = this;
        _super.prototype.attach.call(this);
        this.children = new linked_list_1.default();
        // Need to be reversed for if DOM nodes already in order
        [].slice
            .call(this.domNode.childNodes)
            .reverse()
            .forEach(function (node) {
            try {
                var child = makeBlot(node);
                _this.insertBefore(child, _this.children.head);
            }
            catch (err) {
                if (err instanceof Registry.ParchmentError)
                    return;
                else
                    throw err;
            }
        });
    };
    ContainerBlot.prototype.deleteAt = function (index, length) {
        if (index === 0 && length === this.length()) {
            return this.remove();
        }
        this.children.forEachAt(index, length, function (child, offset, length) {
            child.deleteAt(offset, length);
        });
    };
    ContainerBlot.prototype.descendant = function (criteria, index) {
        var _a = this.children.find(index), child = _a[0], offset = _a[1];
        if ((criteria.blotName == null && criteria(child)) ||
            (criteria.blotName != null && child instanceof criteria)) {
            return [child, offset];
        }
        else if (child instanceof ContainerBlot) {
            return child.descendant(criteria, offset);
        }
        else {
            return [null, -1];
        }
    };
    ContainerBlot.prototype.descendants = function (criteria, index, length) {
        if (index === void 0) { index = 0; }
        if (length === void 0) { length = Number.MAX_VALUE; }
        var descendants = [], lengthLeft = length;
        this.children.forEachAt(index, length, function (child, index, length) {
            if ((criteria.blotName == null && criteria(child)) ||
                (criteria.blotName != null && child instanceof criteria)) {
                descendants.push(child);
            }
            if (child instanceof ContainerBlot) {
                descendants = descendants.concat(child.descendants(criteria, index, lengthLeft));
            }
            lengthLeft -= length;
        });
        return descendants;
    };
    ContainerBlot.prototype.detach = function () {
        this.children.forEach(function (child) {
            child.detach();
        });
        _super.prototype.detach.call(this);
    };
    ContainerBlot.prototype.formatAt = function (index, length, name, value) {
        this.children.forEachAt(index, length, function (child, offset, length) {
            child.formatAt(offset, length, name, value);
        });
    };
    ContainerBlot.prototype.insertAt = function (index, value, def) {
        var _a = this.children.find(index), child = _a[0], offset = _a[1];
        if (child) {
            child.insertAt(offset, value, def);
        }
        else {
            var blot = def == null ? Registry.create('text', value) : Registry.create(value, def);
            this.appendChild(blot);
        }
    };
    ContainerBlot.prototype.insertBefore = function (childBlot, refBlot) {
        if (this.statics.allowedChildren != null &&
            !this.statics.allowedChildren.some(function (child) {
                return childBlot instanceof child;
            })) {
            throw new Registry.ParchmentError("Cannot insert " + childBlot.statics.blotName + " into " + this.statics.blotName);
        }
        childBlot.insertInto(this, refBlot);
    };
    ContainerBlot.prototype.length = function () {
        return this.children.reduce(function (memo, child) {
            return memo + child.length();
        }, 0);
    };
    ContainerBlot.prototype.moveChildren = function (targetParent, refNode) {
        this.children.forEach(function (child) {
            targetParent.insertBefore(child, refNode);
        });
    };
    ContainerBlot.prototype.optimize = function (context) {
        _super.prototype.optimize.call(this, context);
        if (this.children.length === 0) {
            if (this.statics.defaultChild != null) {
                var child = Registry.create(this.statics.defaultChild);
                this.appendChild(child);
                child.optimize(context);
            }
            else {
                this.remove();
            }
        }
    };
    ContainerBlot.prototype.path = function (index, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        var _a = this.children.find(index, inclusive), child = _a[0], offset = _a[1];
        var position = [[this, index]];
        if (child instanceof ContainerBlot) {
            return position.concat(child.path(offset, inclusive));
        }
        else if (child != null) {
            position.push([child, offset]);
        }
        return position;
    };
    ContainerBlot.prototype.removeChild = function (child) {
        this.children.remove(child);
    };
    ContainerBlot.prototype.replace = function (target) {
        if (target instanceof ContainerBlot) {
            target.moveChildren(this);
        }
        _super.prototype.replace.call(this, target);
    };
    ContainerBlot.prototype.split = function (index, force) {
        if (force === void 0) { force = false; }
        if (!force) {
            if (index === 0)
                return this;
            if (index === this.length())
                return this.next;
        }
        var after = this.clone();
        this.parent.insertBefore(after, this.next);
        this.children.forEachAt(index, this.length(), function (child, offset, length) {
            child = child.split(offset, force);
            after.appendChild(child);
        });
        return after;
    };
    ContainerBlot.prototype.unwrap = function () {
        this.moveChildren(this.parent, this.next);
        this.remove();
    };
    ContainerBlot.prototype.update = function (mutations, context) {
        var _this = this;
        var addedNodes = [], removedNodes = [];
        mutations.forEach(function (mutation) {
            if (mutation.target === _this.domNode && mutation.type === 'childList') {
                addedNodes.push.apply(addedNodes, mutation.addedNodes);
                removedNodes.push.apply(removedNodes, mutation.removedNodes);
            }
        });
        removedNodes.forEach(function (node) {
            // Check node has actually been removed
            // One exception is Chrome does not immediately remove IFRAMEs
            // from DOM but MutationRecord is correct in its reported removal
            if (node.parentNode != null &&
                node.tagName !== 'IFRAME' &&
                document.body.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                return;
            }
            var blot = Registry.find(node);
            if (blot == null)
                return;
            if (blot.domNode.parentNode == null || blot.domNode.parentNode === _this.domNode) {
                blot.detach();
            }
        });
        addedNodes
            .filter(function (node) {
            return node.parentNode == _this.domNode;
        })
            .sort(function (a, b) {
            if (a === b)
                return 0;
            if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {
                return 1;
            }
            return -1;
        })
            .forEach(function (node) {
            var refBlot = null;
            if (node.nextSibling != null) {
                refBlot = Registry.find(node.nextSibling);
            }
            var blot = makeBlot(node);
            if (blot.next != refBlot || blot.next == null) {
                if (blot.parent != null) {
                    blot.parent.removeChild(_this);
                }
                _this.insertBefore(blot, refBlot);
            }
        });
    };
    return ContainerBlot;
}(shadow_1.default));
function makeBlot(node) {
    var blot = Registry.find(node);
    if (blot == null) {
        try {
            blot = Registry.create(node);
        }
        catch (e) {
            blot = Registry.create(Registry.Scope.INLINE);
            [].slice.call(node.childNodes).forEach(function (child) {
                blot.domNode.appendChild(child);
            });
            node.parentNode.replaceChild(blot.domNode, node);
            blot.attach();
        }
    }
    return blot;
}
exports.default = ContainerBlot;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var attributor_1 = __webpack_require__(12);
var store_1 = __webpack_require__(31);
var container_1 = __webpack_require__(17);
var Registry = __webpack_require__(1);
var FormatBlot = /** @class */ (function (_super) {
    __extends(FormatBlot, _super);
    function FormatBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormatBlot.formats = function (domNode) {
        if (typeof this.tagName === 'string') {
            return true;
        }
        else if (Array.isArray(this.tagName)) {
            return domNode.tagName.toLowerCase();
        }
        return undefined;
    };
    FormatBlot.prototype.attach = function () {
        _super.prototype.attach.call(this);
        this.attributes = new store_1.default(this.domNode);
    };
    FormatBlot.prototype.format = function (name, value) {
        var format = Registry.query(name);
        if (format instanceof attributor_1.default) {
            this.attributes.attribute(format, value);
        }
        else if (value) {
            if (format != null && (name !== this.statics.blotName || this.formats()[name] !== value)) {
                this.replaceWith(name, value);
            }
        }
    };
    FormatBlot.prototype.formats = function () {
        var formats = this.attributes.values();
        var format = this.statics.formats(this.domNode);
        if (format != null) {
            formats[this.statics.blotName] = format;
        }
        return formats;
    };
    FormatBlot.prototype.replaceWith = function (name, value) {
        var replacement = _super.prototype.replaceWith.call(this, name, value);
        this.attributes.copy(replacement);
        return replacement;
    };
    FormatBlot.prototype.update = function (mutations, context) {
        var _this = this;
        _super.prototype.update.call(this, mutations, context);
        if (mutations.some(function (mutation) {
            return mutation.target === _this.domNode && mutation.type === 'attributes';
        })) {
            this.attributes.build();
        }
    };
    FormatBlot.prototype.wrap = function (name, value) {
        var wrapper = _super.prototype.wrap.call(this, name, value);
        if (wrapper instanceof FormatBlot && wrapper.statics.scope === this.statics.scope) {
            this.attributes.move(wrapper);
        }
        return wrapper;
    };
    return FormatBlot;
}(container_1.default));
exports.default = FormatBlot;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shadow_1 = __webpack_require__(30);
var Registry = __webpack_require__(1);
var LeafBlot = /** @class */ (function (_super) {
    __extends(LeafBlot, _super);
    function LeafBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeafBlot.value = function (domNode) {
        return true;
    };
    LeafBlot.prototype.index = function (node, offset) {
        if (this.domNode === node ||
            this.domNode.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
            return Math.min(offset, 1);
        }
        return -1;
    };
    LeafBlot.prototype.position = function (index, inclusive) {
        var offset = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
        if (index > 0)
            offset += 1;
        return [this.parent.domNode, offset];
    };
    LeafBlot.prototype.value = function () {
        return _a = {}, _a[this.statics.blotName] = this.statics.value(this.domNode) || true, _a;
        var _a;
    };
    LeafBlot.scope = Registry.Scope.INLINE_BLOT;
    return LeafBlot;
}(shadow_1.default));
exports.default = LeafBlot;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var equal = __webpack_require__(11);
var extend = __webpack_require__(3);


var lib = {
  attributes: {
    compose: function (a, b, keepNull) {
      if (typeof a !== 'object') a = {};
      if (typeof b !== 'object') b = {};
      var attributes = extend(true, {}, b);
      if (!keepNull) {
        attributes = Object.keys(attributes).reduce(function (copy, key) {
          if (attributes[key] != null) {
            copy[key] = attributes[key];
          }
          return copy;
        }, {});
      }
      for (var key in a) {
        if (a[key] !== undefined && b[key] === undefined) {
          attributes[key] = a[key];
        }
      }
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    },

    diff: function(a, b) {
      if (typeof a !== 'object') a = {};
      if (typeof b !== 'object') b = {};
      var attributes = Object.keys(a).concat(Object.keys(b)).reduce(function (attributes, key) {
        if (!equal(a[key], b[key])) {
          attributes[key] = b[key] === undefined ? null : b[key];
        }
        return attributes;
      }, {});
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    },

    transform: function (a, b, priority) {
      if (typeof a !== 'object') return b;
      if (typeof b !== 'object') return undefined;
      if (!priority) return b;  // b simply overwrites us without priority
      var attributes = Object.keys(b).reduce(function (attributes, key) {
        if (a[key] === undefined) attributes[key] = b[key];  // null is a valid value
        return attributes;
      }, {});
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
  },

  iterator: function (ops) {
    return new Iterator(ops);
  },

  length: function (op) {
    if (typeof op['delete'] === 'number') {
      return op['delete'];
    } else if (typeof op.retain === 'number') {
      return op.retain;
    } else {
      return typeof op.insert === 'string' ? op.insert.length : 1;
    }
  }
};


function Iterator(ops) {
  this.ops = ops;
  this.index = 0;
  this.offset = 0;
};

Iterator.prototype.hasNext = function () {
  return this.peekLength() < Infinity;
};

Iterator.prototype.next = function (length) {
  if (!length) length = Infinity;
  var nextOp = this.ops[this.index];
  if (nextOp) {
    var offset = this.offset;
    var opLength = lib.length(nextOp)
    if (length >= opLength - offset) {
      length = opLength - offset;
      this.index += 1;
      this.offset = 0;
    } else {
      this.offset += length;
    }
    if (typeof nextOp['delete'] === 'number') {
      return { 'delete': length };
    } else {
      var retOp = {};
      if (nextOp.attributes) {
        retOp.attributes = nextOp.attributes;
      }
      if (typeof nextOp.retain === 'number') {
        retOp.retain = length;
      } else if (typeof nextOp.insert === 'string') {
        retOp.insert = nextOp.insert.substr(offset, length);
      } else {
        // offset should === 0, length should === 1
        retOp.insert = nextOp.insert;
      }
      return retOp;
    }
  } else {
    return { retain: Infinity };
  }
};

Iterator.prototype.peek = function () {
  return this.ops[this.index];
};

Iterator.prototype.peekLength = function () {
  if (this.ops[this.index]) {
    // Should never return 0 if our index is being managed correctly
    return lib.length(this.ops[this.index]) - this.offset;
  } else {
    return Infinity;
  }
};

Iterator.prototype.peekType = function () {
  if (this.ops[this.index]) {
    if (typeof this.ops[this.index]['delete'] === 'number') {
      return 'delete';
    } else if (typeof this.ops[this.index].retain === 'number') {
      return 'retain';
    } else {
      return 'insert';
    }
  }
  return 'retain';
};


module.exports = lib;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = new Buffer(parent.length);
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _emitter = __webpack_require__(8);

var _emitter2 = _interopRequireDefault(_emitter);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

var _break = __webpack_require__(16);

var _break2 = _interopRequireDefault(_break);

var _code = __webpack_require__(13);

var _code2 = _interopRequireDefault(_code);

var _container = __webpack_require__(24);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isLine(blot) {
  return blot instanceof _block2.default || blot instanceof _block.BlockEmbed;
}

var Scroll = function (_Parchment$Scroll) {
  _inherits(Scroll, _Parchment$Scroll);

  function Scroll(domNode, config) {
    _classCallCheck(this, Scroll);

    var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this, domNode));

    _this.emitter = config.emitter;
    if (Array.isArray(config.whitelist)) {
      _this.whitelist = config.whitelist.reduce(function (whitelist, format) {
        whitelist[format] = true;
        return whitelist;
      }, {});
    }
    // Some reason fixes composition issues with character languages in Windows/Chrome, Safari
    _this.domNode.addEventListener('DOMNodeInserted', function () {});
    _this.optimize();
    _this.enable();
    return _this;
  }

  _createClass(Scroll, [{
    key: 'batchStart',
    value: function batchStart() {
      this.batch = true;
    }
  }, {
    key: 'batchEnd',
    value: function batchEnd() {
      this.batch = false;
      this.optimize();
    }
  }, {
    key: 'deleteAt',
    value: function deleteAt(index, length) {
      var _line = this.line(index),
          _line2 = _slicedToArray(_line, 2),
          first = _line2[0],
          offset = _line2[1];

      var _line3 = this.line(index + length),
          _line4 = _slicedToArray(_line3, 1),
          last = _line4[0];

      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'deleteAt', this).call(this, index, length);
      if (last != null && first !== last && offset > 0) {
        if (first instanceof _block.BlockEmbed || last instanceof _block.BlockEmbed) {
          this.optimize();
          return;
        }
        if (first instanceof _code2.default) {
          var newlineIndex = first.newlineIndex(first.length(), true);
          if (newlineIndex > -1) {
            first = first.split(newlineIndex + 1);
            if (first === last) {
              this.optimize();
              return;
            }
          }
        } else if (last instanceof _code2.default) {
          var _newlineIndex = last.newlineIndex(0);
          if (_newlineIndex > -1) {
            last.split(_newlineIndex + 1);
          }
        }
        var ref = last.children.head instanceof _break2.default ? null : last.children.head;
        first.moveChildren(last, ref);
        first.remove();
      }
      this.optimize();
    }
  }, {
    key: 'enable',
    value: function enable() {
      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.domNode.setAttribute('contenteditable', enabled);
    }
  }, {
    key: 'formatAt',
    value: function formatAt(index, length, format, value) {
      if (this.whitelist != null && !this.whitelist[format]) return;
      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'formatAt', this).call(this, index, length, format, value);
      this.optimize();
    }
  }, {
    key: 'insertAt',
    value: function insertAt(index, value, def) {
      if (def != null && this.whitelist != null && !this.whitelist[value]) return;
      if (index >= this.length()) {
        if (def == null || _parchment2.default.query(value, _parchment2.default.Scope.BLOCK) == null) {
          var blot = _parchment2.default.create(this.statics.defaultChild);
          this.appendChild(blot);
          if (def == null && value.endsWith('\n')) {
            value = value.slice(0, -1);
          }
          blot.insertAt(0, value, def);
        } else {
          var embed = _parchment2.default.create(value, def);
          this.appendChild(embed);
        }
      } else {
        _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'insertAt', this).call(this, index, value, def);
      }
      this.optimize();
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(blot, ref) {
      if (blot.statics.scope === _parchment2.default.Scope.INLINE_BLOT) {
        var wrapper = _parchment2.default.create(this.statics.defaultChild);
        wrapper.appendChild(blot);
        blot = wrapper;
      }
      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'insertBefore', this).call(this, blot, ref);
    }
  }, {
    key: 'leaf',
    value: function leaf(index) {
      return this.path(index).pop() || [null, -1];
    }
  }, {
    key: 'line',
    value: function line(index) {
      if (index === this.length()) {
        return this.line(index - 1);
      }
      return this.descendant(isLine, index);
    }
  }, {
    key: 'lines',
    value: function lines() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;

      var getLines = function getLines(blot, index, length) {
        var lines = [],
            lengthLeft = length;
        blot.children.forEachAt(index, length, function (child, index, length) {
          if (isLine(child)) {
            lines.push(child);
          } else if (child instanceof _parchment2.default.Container) {
            lines = lines.concat(getLines(child, index, lengthLeft));
          }
          lengthLeft -= length;
        });
        return lines;
      };
      return getLines(this, index, length);
    }
  }, {
    key: 'optimize',
    value: function optimize() {
      var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.batch === true) return;
      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'optimize', this).call(this, mutations, context);
      if (mutations.length > 0) {
        this.emitter.emit(_emitter2.default.events.SCROLL_OPTIMIZE, mutations, context);
      }
    }
  }, {
    key: 'path',
    value: function path(index) {
      return _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'path', this).call(this, index).slice(1); // Exclude self
    }
  }, {
    key: 'update',
    value: function update(mutations) {
      if (this.batch === true) return;
      var source = _emitter2.default.sources.USER;
      if (typeof mutations === 'string') {
        source = mutations;
      }
      if (!Array.isArray(mutations)) {
        mutations = this.observer.takeRecords();
      }
      if (mutations.length > 0) {
        this.emitter.emit(_emitter2.default.events.SCROLL_BEFORE_UPDATE, source, mutations);
      }
      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'update', this).call(this, mutations.concat([])); // pass copy
      if (mutations.length > 0) {
        this.emitter.emit(_emitter2.default.events.SCROLL_UPDATE, source, mutations);
      }
    }
  }]);

  return Scroll;
}(_parchment2.default.Scroll);

Scroll.blotName = 'scroll';
Scroll.className = 'ql-editor';
Scroll.tagName = 'DIV';
Scroll.defaultChild = 'block';
Scroll.allowedChildren = [_block2.default, _block.BlockEmbed, _container2.default];

exports.default = Scroll;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cursor = function (_Parchment$Embed) {
  _inherits(Cursor, _Parchment$Embed);

  _createClass(Cursor, null, [{
    key: 'value',
    value: function value() {
      return undefined;
    }
  }]);

  function Cursor(domNode, selection) {
    _classCallCheck(this, Cursor);

    var _this = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this, domNode));

    _this.selection = selection;
    _this.textNode = document.createTextNode(Cursor.CONTENTS);
    _this.domNode.appendChild(_this.textNode);
    _this._length = 0;
    return _this;
  }

  _createClass(Cursor, [{
    key: 'detach',
    value: function detach() {
      // super.detach() will also clear domNode.__blot
      if (this.parent != null) this.parent.removeChild(this);
    }
  }, {
    key: 'format',
    value: function format(name, value) {
      if (this._length !== 0) {
        return _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'format', this).call(this, name, value);
      }
      var target = this,
          index = 0;
      while (target != null && target.statics.scope !== _parchment2.default.Scope.BLOCK_BLOT) {
        index += target.offset(target.parent);
        target = target.parent;
      }
      if (target != null) {
        this._length = Cursor.CONTENTS.length;
        target.optimize();
        target.formatAt(index, Cursor.CONTENTS.length, name, value);
        this._length = 0;
      }
    }
  }, {
    key: 'index',
    value: function index(node, offset) {
      if (node === this.textNode) return 0;
      return _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'index', this).call(this, node, offset);
    }
  }, {
    key: 'length',
    value: function length() {
      return this._length;
    }
  }, {
    key: 'position',
    value: function position() {
      return [this.textNode, this.textNode.data.length];
    }
  }, {
    key: 'remove',
    value: function remove() {
      _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'remove', this).call(this);
      this.parent = null;
    }
  }, {
    key: 'restore',
    value: function restore() {
      if (this.selection.composing || this.parent == null) return;
      var textNode = this.textNode;
      var range = this.selection.getNativeRange();
      var restoreText = void 0,
          start = void 0,
          end = void 0;
      if (range != null && range.start.node === textNode && range.end.node === textNode) {
        var _ref = [textNode, range.start.offset, range.end.offset];
        restoreText = _ref[0];
        start = _ref[1];
        end = _ref[2];
      }
      // Link format will insert text outside of anchor tag
      while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {
        this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
      }
      if (this.textNode.data !== Cursor.CONTENTS) {
        var text = this.textNode.data.split(Cursor.CONTENTS).join('');
        if (this.next instanceof _text2.default) {
          restoreText = this.next.domNode;
          this.next.insertAt(0, text);
          this.textNode.data = Cursor.CONTENTS;
        } else {
          this.textNode.data = text;
          this.parent.insertBefore(_parchment2.default.create(this.textNode), this);
          this.textNode = document.createTextNode(Cursor.CONTENTS);
          this.domNode.appendChild(this.textNode);
        }
      }
      this.remove();
      if (start != null) {
        var _map = [start, end].map(function (offset) {
          return Math.max(0, Math.min(restoreText.data.length, offset - 1));
        });

        var _map2 = _slicedToArray(_map, 2);

        start = _map2[0];
        end = _map2[1];

        return {
          startNode: restoreText,
          startOffset: start,
          endNode: restoreText,
          endOffset: end
        };
      }
    }
  }, {
    key: 'update',
    value: function update(mutations, context) {
      var _this2 = this;

      if (mutations.some(function (mutation) {
        return mutation.type === 'characterData' && mutation.target === _this2.textNode;
      })) {
        var range = this.restore();
        if (range) context.range = range;
      }
    }
  }, {
    key: 'value',
    value: function value() {
      return '';
    }
  }]);

  return Cursor;
}(_parchment2.default.Embed);

Cursor.blotName = 'cursor';
Cursor.className = 'ql-cursor';
Cursor.tagName = 'span';
Cursor.CONTENTS = '\uFEFF'; // Zero width no break space


exports.default = Cursor;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_Parchment$Container) {
  _inherits(Container, _Parchment$Container);

  function Container() {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
  }

  return Container;
}(_parchment2.default.Container);

Container.allowedChildren = [_block2.default, _block.BlockEmbed, Container];

exports.default = Container;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GUARD_TEXT = '\uFEFF';

var Embed = function (_Parchment$Embed) {
  _inherits(Embed, _Parchment$Embed);

  function Embed(node) {
    _classCallCheck(this, Embed);

    var _this = _possibleConstructorReturn(this, (Embed.__proto__ || Object.getPrototypeOf(Embed)).call(this, node));

    _this.contentNode = document.createElement('span');
    _this.contentNode.setAttribute('contenteditable', false);
    [].slice.call(_this.domNode.childNodes).forEach(function (childNode) {
      _this.contentNode.appendChild(childNode);
    });
    _this.leftGuard = document.createTextNode(GUARD_TEXT);
    _this.rightGuard = document.createTextNode(GUARD_TEXT);
    _this.domNode.appendChild(_this.leftGuard);
    _this.domNode.appendChild(_this.contentNode);
    _this.domNode.appendChild(_this.rightGuard);
    return _this;
  }

  _createClass(Embed, [{
    key: 'index',
    value: function index(node, offset) {
      if (node === this.leftGuard) return 0;
      if (node === this.rightGuard) return 1;
      return _get(Embed.prototype.__proto__ || Object.getPrototypeOf(Embed.prototype), 'index', this).call(this, node, offset);
    }
  }, {
    key: 'restore',
    value: function restore(node) {
      var range = void 0,
          textNode = void 0;
      var text = node.data.split(GUARD_TEXT).join('');
      if (node === this.leftGuard) {
        if (this.prev instanceof _text2.default) {
          var prevLength = this.prev.length();
          this.prev.insertAt(prevLength, text);
          range = {
            startNode: this.prev.domNode,
            startOffset: prevLength + text.length
          };
        } else {
          textNode = document.createTextNode(text);
          this.parent.insertBefore(_parchment2.default.create(textNode), this);
          range = {
            startNode: textNode,
            startOffset: text.length
          };
        }
      } else if (node === this.rightGuard) {
        if (this.next instanceof _text2.default) {
          this.next.insertAt(0, text);
          range = {
            startNode: this.next.domNode,
            startOffset: text.length
          };
        } else {
          textNode = document.createTextNode(text);
          this.parent.insertBefore(_parchment2.default.create(textNode), this.next);
          range = {
            startNode: textNode,
            startOffset: text.length
          };
        }
      }
      node.data = GUARD_TEXT;
      return range;
    }
  }, {
    key: 'update',
    value: function update(mutations, context) {
      var _this2 = this;

      mutations.forEach(function (mutation) {
        if (mutation.type === 'characterData' && (mutation.target === _this2.leftGuard || mutation.target === _this2.rightGuard)) {
          var range = _this2.restore(mutation.target);
          if (range) context.range = range;
        }
      });
    }
  }]);

  return Embed;
}(_parchment2.default.Embed);

exports.default = Embed;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorStyle = exports.ColorClass = exports.ColorAttributor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorAttributor = function (_Parchment$Attributor) {
  _inherits(ColorAttributor, _Parchment$Attributor);

  function ColorAttributor() {
    _classCallCheck(this, ColorAttributor);

    return _possibleConstructorReturn(this, (ColorAttributor.__proto__ || Object.getPrototypeOf(ColorAttributor)).apply(this, arguments));
  }

  _createClass(ColorAttributor, [{
    key: 'value',
    value: function value(domNode) {
      var value = _get(ColorAttributor.prototype.__proto__ || Object.getPrototypeOf(ColorAttributor.prototype), 'value', this).call(this, domNode);
      if (!value.startsWith('rgb(')) return value;
      value = value.replace(/^[^\d]+/, '').replace(/[^\d]+$/, '');
      return '#' + value.split(',').map(function (component) {
        return ('00' + parseInt(component).toString(16)).slice(-2);
      }).join('');
    }
  }]);

  return ColorAttributor;
}(_parchment2.default.Attributor.Style);

var ColorClass = new _parchment2.default.Attributor.Class('color', 'ql-color', {
  scope: _parchment2.default.Scope.INLINE
});
var ColorStyle = new ColorAttributor('color', 'color', {
  scope: _parchment2.default.Scope.INLINE
});

exports.ColorAttributor = ColorAttributor;
exports.ColorClass = ColorClass;
exports.ColorStyle = ColorStyle;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitize = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_Inline) {
  _inherits(Link, _Inline);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
  }

  _createClass(Link, [{
    key: 'format',
    value: function format(name, value) {
      if (name !== this.statics.blotName || !value) return _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), 'format', this).call(this, name, value);
      value = this.constructor.sanitize(value);
      this.domNode.setAttribute('href', value);
    }
  }], [{
    key: 'create',
    value: function create(value) {
      var node = _get(Link.__proto__ || Object.getPrototypeOf(Link), 'create', this).call(this, value);
      value = this.sanitize(value);
      node.setAttribute('href', value);
      node.setAttribute('target', '_blank');
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      return domNode.getAttribute('href');
    }
  }, {
    key: 'sanitize',
    value: function sanitize(url) {
      return _sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
    }
  }]);

  return Link;
}(_inline2.default);

Link.blotName = 'link';
Link.tagName = 'A';
Link.SANITIZED_URL = 'about:blank';
Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];

function _sanitize(url, protocols) {
  var anchor = document.createElement('a');
  anchor.href = url;
  var protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}

exports.default = Link;
exports.sanitize = _sanitize;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dropdown = __webpack_require__(107);

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Picker = function () {
  function Picker(select) {
    var _this = this;

    _classCallCheck(this, Picker);

    this.select = select;
    this.container = document.createElement('span');
    this.buildPicker();
    this.select.style.display = 'none';
    this.select.parentNode.insertBefore(this.container, this.select);
    this.label.addEventListener('mousedown', function () {
      _this.container.classList.toggle('ql-expanded');
    });
    this.select.addEventListener('change', this.update.bind(this));
  }

  _createClass(Picker, [{
    key: 'buildItem',
    value: function buildItem(option) {
      var _this2 = this;

      var item = document.createElement('span');
      item.classList.add('ql-picker-item');
      if (option.hasAttribute('value')) {
        item.setAttribute('data-value', option.getAttribute('value'));
      }
      if (option.textContent) {
        item.setAttribute('data-label', option.textContent);
      }
      item.addEventListener('click', function () {
        _this2.selectItem(item, true);
      });
      return item;
    }
  }, {
    key: 'buildLabel',
    value: function buildLabel() {
      var label = document.createElement('span');
      label.classList.add('ql-picker-label');
      label.innerHTML = _dropdown2.default;
      this.container.appendChild(label);
      return label;
    }
  }, {
    key: 'buildOptions',
    value: function buildOptions() {
      var _this3 = this;

      var options = document.createElement('span');
      options.classList.add('ql-picker-options');
      [].slice.call(this.select.options).forEach(function (option) {
        var item = _this3.buildItem(option);
        options.appendChild(item);
        if (option.selected === true) {
          _this3.selectItem(item);
        }
      });
      this.container.appendChild(options);
    }
  }, {
    key: 'buildPicker',
    value: function buildPicker() {
      var _this4 = this;

      [].slice.call(this.select.attributes).forEach(function (item) {
        _this4.container.setAttribute(item.name, item.value);
      });
      this.container.classList.add('ql-picker');
      this.label = this.buildLabel();
      this.buildOptions();
    }
  }, {
    key: 'close',
    value: function close() {
      this.container.classList.remove('ql-expanded');
    }
  }, {
    key: 'selectItem',
    value: function selectItem(item) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var selected = this.container.querySelector('.ql-selected');
      if (item === selected) return;
      if (selected != null) {
        selected.classList.remove('ql-selected');
      }
      if (item == null) return;
      item.classList.add('ql-selected');
      this.select.selectedIndex = [].indexOf.call(item.parentNode.children, item);
      if (item.hasAttribute('data-value')) {
        this.label.setAttribute('data-value', item.getAttribute('data-value'));
      } else {
        this.label.removeAttribute('data-value');
      }
      if (item.hasAttribute('data-label')) {
        this.label.setAttribute('data-label', item.getAttribute('data-label'));
      } else {
        this.label.removeAttribute('data-label');
      }
      if (trigger) {
        if (typeof Event === 'function') {
          this.select.dispatchEvent(new Event('change'));
        } else if ((typeof Event === 'undefined' ? 'undefined' : _typeof(Event)) === 'object') {
          // IE11
          var event = document.createEvent('Event');
          event.initEvent('change', true, true);
          this.select.dispatchEvent(event);
        }
        this.close();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var option = void 0;
      if (this.select.selectedIndex > -1) {
        var item = this.container.querySelector('.ql-picker-options').children[this.select.selectedIndex];
        option = this.select.options[this.select.selectedIndex];
        this.selectItem(item);
      } else {
        this.selectItem(null);
      }
      var isActive = option != null && option !== this.select.querySelector('option[selected]');
      this.label.classList.toggle('ql-active', isActive);
    }
  }]);

  return Picker;
}();

exports.default = Picker;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

var _break = __webpack_require__(16);

var _break2 = _interopRequireDefault(_break);

var _container = __webpack_require__(24);

var _container2 = _interopRequireDefault(_container);

var _cursor = __webpack_require__(23);

var _cursor2 = _interopRequireDefault(_cursor);

var _embed = __webpack_require__(25);

var _embed2 = _interopRequireDefault(_embed);

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

var _scroll = __webpack_require__(22);

var _scroll2 = _interopRequireDefault(_scroll);

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

var _clipboard = __webpack_require__(55);

var _clipboard2 = _interopRequireDefault(_clipboard);

var _history = __webpack_require__(42);

var _history2 = _interopRequireDefault(_history);

var _keyboard = __webpack_require__(35);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_quill2.default.register({
  'blots/block': _block2.default,
  'blots/block/embed': _block.BlockEmbed,
  'blots/break': _break2.default,
  'blots/container': _container2.default,
  'blots/cursor': _cursor2.default,
  'blots/embed': _embed2.default,
  'blots/inline': _inline2.default,
  'blots/scroll': _scroll2.default,
  'blots/text': _text2.default,

  'modules/clipboard': _clipboard2.default,
  'modules/history': _history2.default,
  'modules/keyboard': _keyboard2.default
});

_parchment2.default.register(_block2.default, _break2.default, _cursor2.default, _inline2.default, _scroll2.default, _text2.default);

exports.default = _quill2.default;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Registry = __webpack_require__(1);
var ShadowBlot = /** @class */ (function () {
    function ShadowBlot(domNode) {
        this.domNode = domNode;
        this.attach();
    }
    Object.defineProperty(ShadowBlot.prototype, "statics", {
        // Hack for accessing inherited static methods
        get: function () {
            return this.constructor;
        },
        enumerable: true,
        configurable: true
    });
    ShadowBlot.create = function (value) {
        if (this.tagName == null) {
            throw new Registry.ParchmentError('Blot definition missing tagName');
        }
        var node;
        if (Array.isArray(this.tagName)) {
            if (typeof value === 'string') {
                value = value.toUpperCase();
                if (parseInt(value).toString() === value) {
                    value = parseInt(value);
                }
            }
            if (typeof value === 'number') {
                node = document.createElement(this.tagName[value - 1]);
            }
            else if (this.tagName.indexOf(value) > -1) {
                node = document.createElement(value);
            }
            else {
                node = document.createElement(this.tagName[0]);
            }
        }
        else {
            node = document.createElement(this.tagName);
        }
        if (this.className) {
            node.classList.add(this.className);
        }
        return node;
    };
    ShadowBlot.prototype.attach = function () {
        this.domNode[Registry.DATA_KEY] = { blot: this };
    };
    ShadowBlot.prototype.clone = function () {
        var domNode = this.domNode.cloneNode(false);
        return Registry.create(domNode);
    };
    ShadowBlot.prototype.detach = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        delete this.domNode[Registry.DATA_KEY];
    };
    ShadowBlot.prototype.deleteAt = function (index, length) {
        var blot = this.isolate(index, length);
        blot.remove();
    };
    ShadowBlot.prototype.formatAt = function (index, length, name, value) {
        var blot = this.isolate(index, length);
        if (Registry.query(name, Registry.Scope.BLOT) != null && value) {
            blot.wrap(name, value);
        }
        else if (Registry.query(name, Registry.Scope.ATTRIBUTE) != null) {
            var parent = Registry.create(this.statics.scope);
            blot.wrap(parent);
            parent.format(name, value);
        }
    };
    ShadowBlot.prototype.insertAt = function (index, value, def) {
        var blot = def == null ? Registry.create('text', value) : Registry.create(value, def);
        var ref = this.split(index);
        this.parent.insertBefore(blot, ref);
    };
    ShadowBlot.prototype.insertInto = function (parentBlot, refBlot) {
        if (this.parent != null) {
            this.parent.children.remove(this);
        }
        parentBlot.children.insertBefore(this, refBlot);
        if (refBlot != null) {
            var refDomNode = refBlot.domNode;
        }
        if (this.next == null || this.domNode.nextSibling != refDomNode) {
            parentBlot.domNode.insertBefore(this.domNode, typeof refDomNode !== 'undefined' ? refDomNode : null);
        }
        this.parent = parentBlot;
        this.scroll = parentBlot.scroll;
    };
    ShadowBlot.prototype.isolate = function (index, length) {
        var target = this.split(index);
        target.split(length);
        return target;
    };
    ShadowBlot.prototype.length = function () {
        return 1;
    };
    ShadowBlot.prototype.offset = function (root) {
        if (root === void 0) { root = this.parent; }
        if (this.parent == null || this == root)
            return 0;
        return this.parent.children.offset(this) + this.parent.offset(root);
    };
    ShadowBlot.prototype.optimize = function (context) {
        // TODO clean up once we use WeakMap
        if (this.domNode[Registry.DATA_KEY] != null) {
            delete this.domNode[Registry.DATA_KEY].mutations;
        }
    };
    ShadowBlot.prototype.remove = function () {
        if (this.domNode.parentNode != null) {
            this.domNode.parentNode.removeChild(this.domNode);
        }
        this.detach();
    };
    ShadowBlot.prototype.replace = function (target) {
        if (target.parent == null)
            return;
        target.parent.insertBefore(this, target.next);
        target.remove();
    };
    ShadowBlot.prototype.replaceWith = function (name, value) {
        var replacement = typeof name === 'string' ? Registry.create(name, value) : name;
        replacement.replace(this);
        return replacement;
    };
    ShadowBlot.prototype.split = function (index, force) {
        return index === 0 ? this : this.next;
    };
    ShadowBlot.prototype.update = function (mutations, context) {
        // Nothing to do by default
    };
    ShadowBlot.prototype.wrap = function (name, value) {
        var wrapper = typeof name === 'string' ? Registry.create(name, value) : name;
        if (this.parent != null) {
            this.parent.insertBefore(wrapper, this.next);
        }
        wrapper.appendChild(this);
        return wrapper;
    };
    ShadowBlot.blotName = 'abstract';
    return ShadowBlot;
}());
exports.default = ShadowBlot;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var attributor_1 = __webpack_require__(12);
var class_1 = __webpack_require__(32);
var style_1 = __webpack_require__(33);
var Registry = __webpack_require__(1);
var AttributorStore = /** @class */ (function () {
    function AttributorStore(domNode) {
        this.attributes = {};
        this.domNode = domNode;
        this.build();
    }
    AttributorStore.prototype.attribute = function (attribute, value) {
        // verb
        if (value) {
            if (attribute.add(this.domNode, value)) {
                if (attribute.value(this.domNode) != null) {
                    this.attributes[attribute.attrName] = attribute;
                }
                else {
                    delete this.attributes[attribute.attrName];
                }
            }
        }
        else {
            attribute.remove(this.domNode);
            delete this.attributes[attribute.attrName];
        }
    };
    AttributorStore.prototype.build = function () {
        var _this = this;
        this.attributes = {};
        var attributes = attributor_1.default.keys(this.domNode);
        var classes = class_1.default.keys(this.domNode);
        var styles = style_1.default.keys(this.domNode);
        attributes
            .concat(classes)
            .concat(styles)
            .forEach(function (name) {
            var attr = Registry.query(name, Registry.Scope.ATTRIBUTE);
            if (attr instanceof attributor_1.default) {
                _this.attributes[attr.attrName] = attr;
            }
        });
    };
    AttributorStore.prototype.copy = function (target) {
        var _this = this;
        Object.keys(this.attributes).forEach(function (key) {
            var value = _this.attributes[key].value(_this.domNode);
            target.format(key, value);
        });
    };
    AttributorStore.prototype.move = function (target) {
        var _this = this;
        this.copy(target);
        Object.keys(this.attributes).forEach(function (key) {
            _this.attributes[key].remove(_this.domNode);
        });
        this.attributes = {};
    };
    AttributorStore.prototype.values = function () {
        var _this = this;
        return Object.keys(this.attributes).reduce(function (attributes, name) {
            attributes[name] = _this.attributes[name].value(_this.domNode);
            return attributes;
        }, {});
    };
    return AttributorStore;
}());
exports.default = AttributorStore;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var attributor_1 = __webpack_require__(12);
function match(node, prefix) {
    var className = node.getAttribute('class') || '';
    return className.split(/\s+/).filter(function (name) {
        return name.indexOf(prefix + "-") === 0;
    });
}
var ClassAttributor = /** @class */ (function (_super) {
    __extends(ClassAttributor, _super);
    function ClassAttributor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassAttributor.keys = function (node) {
        return (node.getAttribute('class') || '').split(/\s+/).map(function (name) {
            return name
                .split('-')
                .slice(0, -1)
                .join('-');
        });
    };
    ClassAttributor.prototype.add = function (node, value) {
        if (!this.canAdd(node, value))
            return false;
        this.remove(node);
        node.classList.add(this.keyName + "-" + value);
        return true;
    };
    ClassAttributor.prototype.remove = function (node) {
        var matches = match(node, this.keyName);
        matches.forEach(function (name) {
            node.classList.remove(name);
        });
        if (node.classList.length === 0) {
            node.removeAttribute('class');
        }
    };
    ClassAttributor.prototype.value = function (node) {
        var result = match(node, this.keyName)[0] || '';
        var value = result.slice(this.keyName.length + 1); // +1 for hyphen
        return this.canAdd(node, value) ? value : '';
    };
    return ClassAttributor;
}(attributor_1.default));
exports.default = ClassAttributor;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var attributor_1 = __webpack_require__(12);
function camelize(name) {
    var parts = name.split('-');
    var rest = parts
        .slice(1)
        .map(function (part) {
        return part[0].toUpperCase() + part.slice(1);
    })
        .join('');
    return parts[0] + rest;
}
var StyleAttributor = /** @class */ (function (_super) {
    __extends(StyleAttributor, _super);
    function StyleAttributor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StyleAttributor.keys = function (node) {
        return (node.getAttribute('style') || '').split(';').map(function (value) {
            var arr = value.split(':');
            return arr[0].trim();
        });
    };
    StyleAttributor.prototype.add = function (node, value) {
        if (!this.canAdd(node, value))
            return false;
        node.style[camelize(this.keyName)] = value;
        return true;
    };
    StyleAttributor.prototype.remove = function (node) {
        node.style[camelize(this.keyName)] = '';
        if (!node.getAttribute('style')) {
            node.removeAttribute('style');
        }
    };
    StyleAttributor.prototype.value = function (node) {
        var value = node.style[camelize(this.keyName)];
        return this.canAdd(node, value) ? value : '';
    };
    return StyleAttributor;
}(attributor_1.default));
exports.default = StyleAttributor;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Theme = function () {
  function Theme(quill, options) {
    _classCallCheck(this, Theme);

    this.quill = quill;
    this.options = options;
    this.modules = {};
  }

  _createClass(Theme, [{
    key: 'init',
    value: function init() {
      var _this = this;

      Object.keys(this.options.modules).forEach(function (name) {
        if (_this.modules[name] == null) {
          _this.addModule(name);
        }
      });
    }
  }, {
    key: 'addModule',
    value: function addModule(name) {
      var moduleClass = this.quill.constructor.import('modules/' + name);
      this.modules[name] = new moduleClass(this.quill, this.options.modules[name] || {});
      return this.modules[name];
    }
  }]);

  return Theme;
}();

Theme.DEFAULTS = {
  modules: {}
};
Theme.themes = {
  'default': Theme
};

exports.default = Theme;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHORTKEY = exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clone = __webpack_require__(21);

var _clone2 = _interopRequireDefault(_clone);

var _deepEqual = __webpack_require__(11);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _op = __webpack_require__(20);

var _op2 = _interopRequireDefault(_op);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _embed = __webpack_require__(25);

var _embed2 = _interopRequireDefault(_embed);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = (0, _logger2.default)('quill:keyboard');

var SHORTKEY = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';

var Keyboard = function (_Module) {
  _inherits(Keyboard, _Module);

  _createClass(Keyboard, null, [{
    key: 'match',
    value: function match(evt, binding) {
      binding = normalize(binding);
      if (['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some(function (key) {
        return !!binding[key] !== evt[key] && binding[key] !== null;
      })) {
        return false;
      }
      return binding.key === (evt.which || evt.keyCode);
    }
  }]);

  function Keyboard(quill, options) {
    _classCallCheck(this, Keyboard);

    var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, quill, options));

    _this.bindings = {};
    Object.keys(_this.options.bindings).forEach(function (name) {
      if (name === 'list autofill' && quill.scroll.whitelist != null && !quill.scroll.whitelist['list']) {
        return;
      }
      if (_this.options.bindings[name]) {
        _this.addBinding(_this.options.bindings[name]);
      }
    });
    _this.addBinding({ key: Keyboard.keys.ENTER, shiftKey: null }, handleEnter);
    _this.addBinding({ key: Keyboard.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function () {});
    if (/Firefox/i.test(navigator.userAgent)) {
      // Need to handle delete and backspace for Firefox in the general case #1171
      _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: true }, handleBackspace);
      _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: true }, handleDelete);
    } else {
      _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: true, prefix: /^.?$/ }, handleBackspace);
      _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: true, suffix: /^.?$/ }, handleDelete);
    }
    _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: false }, handleDeleteRange);
    _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: false }, handleDeleteRange);
    _this.addBinding({ key: Keyboard.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: true, offset: 0 }, handleBackspace);
    _this.listen();
    return _this;
  }

  _createClass(Keyboard, [{
    key: 'addBinding',
    value: function addBinding(key) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var handler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var binding = normalize(key);
      if (binding == null || binding.key == null) {
        return debug.warn('Attempted to add invalid keyboard binding', binding);
      }
      if (typeof context === 'function') {
        context = { handler: context };
      }
      if (typeof handler === 'function') {
        handler = { handler: handler };
      }
      binding = (0, _extend2.default)(binding, context, handler);
      this.bindings[binding.key] = this.bindings[binding.key] || [];
      this.bindings[binding.key].push(binding);
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      this.quill.root.addEventListener('keydown', function (evt) {
        if (evt.defaultPrevented) return;
        var which = evt.which || evt.keyCode;
        var bindings = (_this2.bindings[which] || []).filter(function (binding) {
          return Keyboard.match(evt, binding);
        });
        if (bindings.length === 0) return;
        var range = _this2.quill.getSelection();
        if (range == null || !_this2.quill.hasFocus()) return;

        var _quill$getLine = _this2.quill.getLine(range.index),
            _quill$getLine2 = _slicedToArray(_quill$getLine, 2),
            line = _quill$getLine2[0],
            offset = _quill$getLine2[1];

        var _quill$getLeaf = _this2.quill.getLeaf(range.index),
            _quill$getLeaf2 = _slicedToArray(_quill$getLeaf, 2),
            leafStart = _quill$getLeaf2[0],
            offsetStart = _quill$getLeaf2[1];

        var _ref = range.length === 0 ? [leafStart, offsetStart] : _this2.quill.getLeaf(range.index + range.length),
            _ref2 = _slicedToArray(_ref, 2),
            leafEnd = _ref2[0],
            offsetEnd = _ref2[1];

        var prefixText = leafStart instanceof _parchment2.default.Text ? leafStart.value().slice(0, offsetStart) : '';
        var suffixText = leafEnd instanceof _parchment2.default.Text ? leafEnd.value().slice(offsetEnd) : '';
        var curContext = {
          collapsed: range.length === 0,
          empty: range.length === 0 && line.length() <= 1,
          format: _this2.quill.getFormat(range),
          offset: offset,
          prefix: prefixText,
          suffix: suffixText
        };
        var prevented = bindings.some(function (binding) {
          if (binding.collapsed != null && binding.collapsed !== curContext.collapsed) return false;
          if (binding.empty != null && binding.empty !== curContext.empty) return false;
          if (binding.offset != null && binding.offset !== curContext.offset) return false;
          if (Array.isArray(binding.format)) {
            // any format is present
            if (binding.format.every(function (name) {
              return curContext.format[name] == null;
            })) {
              return false;
            }
          } else if (_typeof(binding.format) === 'object') {
            // all formats must match
            if (!Object.keys(binding.format).every(function (name) {
              if (binding.format[name] === true) return curContext.format[name] != null;
              if (binding.format[name] === false) return curContext.format[name] == null;
              return (0, _deepEqual2.default)(binding.format[name], curContext.format[name]);
            })) {
              return false;
            }
          }
          if (binding.prefix != null && !binding.prefix.test(curContext.prefix)) return false;
          if (binding.suffix != null && !binding.suffix.test(curContext.suffix)) return false;
          return binding.handler.call(_this2, range, curContext) !== true;
        });
        if (prevented) {
          evt.preventDefault();
        }
      });
    }
  }]);

  return Keyboard;
}(_module2.default);

Keyboard.keys = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46
};

Keyboard.DEFAULTS = {
  bindings: {
    'bold': makeFormatHandler('bold'),
    'italic': makeFormatHandler('italic'),
    'underline': makeFormatHandler('underline'),
    'indent': {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: Keyboard.keys.TAB,
      format: ['blockquote', 'indent', 'list'],
      handler: function handler(range, context) {
        if (context.collapsed && context.offset !== 0) return true;
        this.quill.format('indent', '+1', _quill2.default.sources.USER);
      }
    },
    'outdent': {
      key: Keyboard.keys.TAB,
      shiftKey: true,
      format: ['blockquote', 'indent', 'list'],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler: function handler(range, context) {
        if (context.collapsed && context.offset !== 0) return true;
        this.quill.format('indent', '-1', _quill2.default.sources.USER);
      }
    },
    'outdent backspace': {
      key: Keyboard.keys.BACKSPACE,
      collapsed: true,
      shiftKey: null,
      metaKey: null,
      ctrlKey: null,
      altKey: null,
      format: ['indent', 'list'],
      offset: 0,
      handler: function handler(range, context) {
        if (context.format.indent != null) {
          this.quill.format('indent', '-1', _quill2.default.sources.USER);
        } else if (context.format.list != null) {
          this.quill.format('list', false, _quill2.default.sources.USER);
        }
      }
    },
    'indent code-block': makeCodeBlockHandler(true),
    'outdent code-block': makeCodeBlockHandler(false),
    'remove tab': {
      key: Keyboard.keys.TAB,
      shiftKey: true,
      collapsed: true,
      prefix: /\t$/,
      handler: function handler(range) {
        this.quill.deleteText(range.index - 1, 1, _quill2.default.sources.USER);
      }
    },
    'tab': {
      key: Keyboard.keys.TAB,
      handler: function handler(range) {
        this.quill.history.cutoff();
        var delta = new _quillDelta2.default().retain(range.index).delete(range.length).insert('\t');
        this.quill.updateContents(delta, _quill2.default.sources.USER);
        this.quill.history.cutoff();
        this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
      }
    },
    'list empty enter': {
      key: Keyboard.keys.ENTER,
      collapsed: true,
      format: ['list'],
      empty: true,
      handler: function handler(range, context) {
        this.quill.format('list', false, _quill2.default.sources.USER);
        if (context.format.indent) {
          this.quill.format('indent', false, _quill2.default.sources.USER);
        }
      }
    },
    'checklist enter': {
      key: Keyboard.keys.ENTER,
      collapsed: true,
      format: { list: 'checked' },
      handler: function handler(range) {
        var _quill$getLine3 = this.quill.getLine(range.index),
            _quill$getLine4 = _slicedToArray(_quill$getLine3, 2),
            line = _quill$getLine4[0],
            offset = _quill$getLine4[1];

        var delta = new _quillDelta2.default().retain(range.index).insert('\n', { list: 'checked' }).retain(line.length() - offset - 1).retain(1, { list: 'unchecked' });
        this.quill.updateContents(delta, _quill2.default.sources.USER);
        this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
        this.quill.scrollIntoView();
      }
    },
    'header enter': {
      key: Keyboard.keys.ENTER,
      collapsed: true,
      format: ['header'],
      suffix: /^$/,
      handler: function handler(range, context) {
        var _quill$getLine5 = this.quill.getLine(range.index),
            _quill$getLine6 = _slicedToArray(_quill$getLine5, 2),
            line = _quill$getLine6[0],
            offset = _quill$getLine6[1];

        var delta = new _quillDelta2.default().retain(range.index).insert('\n', context.format).retain(line.length() - offset - 1).retain(1, { header: null });
        this.quill.updateContents(delta, _quill2.default.sources.USER);
        this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
        this.quill.scrollIntoView();
      }
    },
    'list autofill': {
      key: ' ',
      collapsed: true,
      format: { list: false },
      prefix: /^\s*?(\d+\.|-|\[ ?\]|\[x\])$/,
      handler: function handler(range, context) {
        var length = context.prefix.length;

        var _quill$getLine7 = this.quill.getLine(range.index),
            _quill$getLine8 = _slicedToArray(_quill$getLine7, 2),
            line = _quill$getLine8[0],
            offset = _quill$getLine8[1];

        if (offset > length) return true;
        var value = void 0;
        switch (context.prefix.trim()) {
          case '[]':case '[ ]':
            value = 'unchecked';
            break;
          case '[x]':
            value = 'checked';
            break;
          case '-':
            value = 'bullet';
            break;
          default:
            value = 'ordered';
        }
        this.quill.insertText(range.index, ' ', _quill2.default.sources.USER);
        this.quill.history.cutoff();
        var delta = new _quillDelta2.default().retain(range.index - offset).delete(length + 1).retain(line.length() - 2 - offset).retain(1, { list: value });
        this.quill.updateContents(delta, _quill2.default.sources.USER);
        this.quill.history.cutoff();
        this.quill.setSelection(range.index - length, _quill2.default.sources.SILENT);
      }
    },
    'code exit': {
      key: Keyboard.keys.ENTER,
      collapsed: true,
      format: ['code-block'],
      prefix: /\n\n$/,
      suffix: /^\s+$/,
      handler: function handler(range) {
        var _quill$getLine9 = this.quill.getLine(range.index),
            _quill$getLine10 = _slicedToArray(_quill$getLine9, 2),
            line = _quill$getLine10[0],
            offset = _quill$getLine10[1];

        var delta = new _quillDelta2.default().retain(range.index + line.length() - offset - 2).retain(1, { 'code-block': null }).delete(1);
        this.quill.updateContents(delta, _quill2.default.sources.USER);
      }
    },
    'embed left': makeEmbedArrowHandler(Keyboard.keys.LEFT, false),
    'embed left shift': makeEmbedArrowHandler(Keyboard.keys.LEFT, true),
    'embed right': makeEmbedArrowHandler(Keyboard.keys.RIGHT, false),
    'embed right shift': makeEmbedArrowHandler(Keyboard.keys.RIGHT, true)
  }
};

function makeEmbedArrowHandler(key, shiftKey) {
  var _ref3;

  var where = key === Keyboard.keys.LEFT ? 'prefix' : 'suffix';
  return _ref3 = {
    key: key,
    shiftKey: shiftKey
  }, _defineProperty(_ref3, where, /^$/), _defineProperty(_ref3, 'handler', function handler(range) {
    var index = range.index;
    if (key === Keyboard.keys.RIGHT) {
      index += range.length + 1;
    }

    var _quill$getLeaf3 = this.quill.getLeaf(index),
        _quill$getLeaf4 = _slicedToArray(_quill$getLeaf3, 1),
        leaf = _quill$getLeaf4[0];

    if (!(leaf instanceof _embed2.default)) return true;
    if (key === Keyboard.keys.LEFT) {
      if (shiftKey) {
        this.quill.setSelection(range.index - 1, range.length + 1, _quill2.default.sources.USER);
      } else {
        this.quill.setSelection(range.index - 1, _quill2.default.sources.USER);
      }
    } else {
      if (shiftKey) {
        this.quill.setSelection(range.index, range.length + 1, _quill2.default.sources.USER);
      } else {
        this.quill.setSelection(range.index + range.length + 1, _quill2.default.sources.USER);
      }
    }
    return false;
  }), _ref3;
}

function handleBackspace(range, context) {
  if (range.index === 0 || this.quill.getLength() <= 1) return;

  var _quill$getLine11 = this.quill.getLine(range.index),
      _quill$getLine12 = _slicedToArray(_quill$getLine11, 1),
      line = _quill$getLine12[0];

  var formats = {};
  if (context.offset === 0) {
    var _quill$getLine13 = this.quill.getLine(range.index - 1),
        _quill$getLine14 = _slicedToArray(_quill$getLine13, 1),
        prev = _quill$getLine14[0];

    if (prev != null && prev.length() > 1) {
      var curFormats = line.formats();
      var prevFormats = this.quill.getFormat(range.index - 1, 1);
      formats = _op2.default.attributes.diff(curFormats, prevFormats) || {};
    }
  }
  // Check for astral symbols
  var length = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix) ? 2 : 1;
  this.quill.deleteText(range.index - length, length, _quill2.default.sources.USER);
  if (Object.keys(formats).length > 0) {
    this.quill.formatLine(range.index - length, length, formats, _quill2.default.sources.USER);
  }
  this.quill.focus();
}

function handleDelete(range, context) {
  // Check for astral symbols
  var length = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(context.suffix) ? 2 : 1;
  if (range.index >= this.quill.getLength() - length) return;
  var formats = {},
      nextLength = 0;

  var _quill$getLine15 = this.quill.getLine(range.index),
      _quill$getLine16 = _slicedToArray(_quill$getLine15, 1),
      line = _quill$getLine16[0];

  if (context.offset >= line.length() - 1) {
    var _quill$getLine17 = this.quill.getLine(range.index + 1),
        _quill$getLine18 = _slicedToArray(_quill$getLine17, 1),
        next = _quill$getLine18[0];

    if (next) {
      var curFormats = line.formats();
      var nextFormats = this.quill.getFormat(range.index, 1);
      formats = _op2.default.attributes.diff(curFormats, nextFormats) || {};
      nextLength = next.length();
    }
  }
  this.quill.deleteText(range.index, length, _quill2.default.sources.USER);
  if (Object.keys(formats).length > 0) {
    this.quill.formatLine(range.index + nextLength - 1, length, formats, _quill2.default.sources.USER);
  }
}

function handleDeleteRange(range) {
  var lines = this.quill.getLines(range);
  var formats = {};
  if (lines.length > 1) {
    var firstFormats = lines[0].formats();
    var lastFormats = lines[lines.length - 1].formats();
    formats = _op2.default.attributes.diff(lastFormats, firstFormats) || {};
  }
  this.quill.deleteText(range, _quill2.default.sources.USER);
  if (Object.keys(formats).length > 0) {
    this.quill.formatLine(range.index, 1, formats, _quill2.default.sources.USER);
  }
  this.quill.setSelection(range.index, _quill2.default.sources.SILENT);
  this.quill.focus();
}

function handleEnter(range, context) {
  var _this3 = this;

  if (range.length > 0) {
    this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
  }
  var lineFormats = Object.keys(context.format).reduce(function (lineFormats, format) {
    if (_parchment2.default.query(format, _parchment2.default.Scope.BLOCK) && !Array.isArray(context.format[format])) {
      lineFormats[format] = context.format[format];
    }
    return lineFormats;
  }, {});
  this.quill.insertText(range.index, '\n', lineFormats, _quill2.default.sources.USER);
  // Earlier scroll.deleteAt might have messed up our selection,
  // so insertText's built in selection preservation is not reliable
  this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
  this.quill.focus();
  Object.keys(context.format).forEach(function (name) {
    if (lineFormats[name] != null) return;
    if (Array.isArray(context.format[name])) return;
    if (name === 'link') return;
    _this3.quill.format(name, context.format[name], _quill2.default.sources.USER);
  });
}

function makeCodeBlockHandler(indent) {
  return {
    key: Keyboard.keys.TAB,
    shiftKey: !indent,
    format: { 'code-block': true },
    handler: function handler(range) {
      var CodeBlock = _parchment2.default.query('code-block');
      var index = range.index,
          length = range.length;

      var _quill$scroll$descend = this.quill.scroll.descendant(CodeBlock, index),
          _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 2),
          block = _quill$scroll$descend2[0],
          offset = _quill$scroll$descend2[1];

      if (block == null) return;
      var scrollIndex = this.quill.getIndex(block);
      var start = block.newlineIndex(offset, true) + 1;
      var end = block.newlineIndex(scrollIndex + offset + length);
      var lines = block.domNode.textContent.slice(start, end).split('\n');
      offset = 0;
      lines.forEach(function (line, i) {
        if (indent) {
          block.insertAt(start + offset, CodeBlock.TAB);
          offset += CodeBlock.TAB.length;
          if (i === 0) {
            index += CodeBlock.TAB.length;
          } else {
            length += CodeBlock.TAB.length;
          }
        } else if (line.startsWith(CodeBlock.TAB)) {
          block.deleteAt(start + offset, CodeBlock.TAB.length);
          offset -= CodeBlock.TAB.length;
          if (i === 0) {
            index -= CodeBlock.TAB.length;
          } else {
            length -= CodeBlock.TAB.length;
          }
        }
        offset += line.length + 1;
      });
      this.quill.update(_quill2.default.sources.USER);
      this.quill.setSelection(index, length, _quill2.default.sources.SILENT);
    }
  };
}

function makeFormatHandler(format) {
  return {
    key: format[0].toUpperCase(),
    shortKey: true,
    handler: function handler(range, context) {
      this.quill.format(format, !context.format[format], _quill2.default.sources.USER);
    }
  };
}

function normalize(binding) {
  if (typeof binding === 'string' || typeof binding === 'number') {
    return normalize({ key: binding });
  }
  if ((typeof binding === 'undefined' ? 'undefined' : _typeof(binding)) === 'object') {
    binding = (0, _clone2.default)(binding, false);
  }
  if (typeof binding.key === 'string') {
    if (Keyboard.keys[binding.key.toUpperCase()] != null) {
      binding.key = Keyboard.keys[binding.key.toUpperCase()];
    } else if (binding.key.length === 1) {
      binding.key = binding.key.toUpperCase().charCodeAt(0);
    } else {
      return null;
    }
  }
  if (binding.shortKey) {
    binding[SHORTKEY] = binding.shortKey;
    delete binding.shortKey;
  }
  return binding;
}

exports.default = Keyboard;
exports.SHORTKEY = SHORTKEY;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlignStyle = exports.AlignClass = exports.AlignAttribute = undefined;

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  scope: _parchment2.default.Scope.BLOCK,
  whitelist: ['right', 'center', 'justify']
};

var AlignAttribute = new _parchment2.default.Attributor.Attribute('align', 'align', config);
var AlignClass = new _parchment2.default.Attributor.Class('align', 'ql-align', config);
var AlignStyle = new _parchment2.default.Attributor.Style('align', 'text-align', config);

exports.AlignAttribute = AlignAttribute;
exports.AlignClass = AlignClass;
exports.AlignStyle = AlignStyle;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundStyle = exports.BackgroundClass = undefined;

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _color = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BackgroundClass = new _parchment2.default.Attributor.Class('background', 'ql-bg', {
  scope: _parchment2.default.Scope.INLINE
});
var BackgroundStyle = new _color.ColorAttributor('background', 'background-color', {
  scope: _parchment2.default.Scope.INLINE
});

exports.BackgroundClass = BackgroundClass;
exports.BackgroundStyle = BackgroundStyle;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionStyle = exports.DirectionClass = exports.DirectionAttribute = undefined;

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  scope: _parchment2.default.Scope.BLOCK,
  whitelist: ['rtl']
};

var DirectionAttribute = new _parchment2.default.Attributor.Attribute('direction', 'dir', config);
var DirectionClass = new _parchment2.default.Attributor.Class('direction', 'ql-direction', config);
var DirectionStyle = new _parchment2.default.Attributor.Style('direction', 'direction', config);

exports.DirectionAttribute = DirectionAttribute;
exports.DirectionClass = DirectionClass;
exports.DirectionStyle = DirectionStyle;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontClass = exports.FontStyle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = {
  scope: _parchment2.default.Scope.INLINE,
  whitelist: ['serif', 'monospace']
};

var FontClass = new _parchment2.default.Attributor.Class('font', 'ql-font', config);

var FontStyleAttributor = function (_Parchment$Attributor) {
  _inherits(FontStyleAttributor, _Parchment$Attributor);

  function FontStyleAttributor() {
    _classCallCheck(this, FontStyleAttributor);

    return _possibleConstructorReturn(this, (FontStyleAttributor.__proto__ || Object.getPrototypeOf(FontStyleAttributor)).apply(this, arguments));
  }

  _createClass(FontStyleAttributor, [{
    key: 'value',
    value: function value(node) {
      return _get(FontStyleAttributor.prototype.__proto__ || Object.getPrototypeOf(FontStyleAttributor.prototype), 'value', this).call(this, node).replace(/["']/g, '');
    }
  }]);

  return FontStyleAttributor;
}(_parchment2.default.Attributor.Style);

var FontStyle = new FontStyleAttributor('font', 'font-family', config);

exports.FontStyle = FontStyle;
exports.FontClass = FontClass;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizeStyle = exports.SizeClass = undefined;

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SizeClass = new _parchment2.default.Attributor.Class('size', 'ql-size', {
  scope: _parchment2.default.Scope.INLINE,
  whitelist: ['small', 'large', 'huge']
});
var SizeStyle = new _parchment2.default.Attributor.Style('size', 'font-size', {
  scope: _parchment2.default.Scope.INLINE,
  whitelist: ['10px', '18px', '32px']
});

exports.SizeClass = SizeClass;
exports.SizeStyle = SizeStyle;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  'align': {
    '': __webpack_require__(76),
    'center': __webpack_require__(77),
    'right': __webpack_require__(78),
    'justify': __webpack_require__(79)
  },
  'background': __webpack_require__(80),
  'blockquote': __webpack_require__(81),
  'bold': __webpack_require__(82),
  'clean': __webpack_require__(83),
  'code': __webpack_require__(58),
  'code-block': __webpack_require__(58),
  'color': __webpack_require__(84),
  'direction': {
    '': __webpack_require__(85),
    'rtl': __webpack_require__(86)
  },
  'float': {
    'center': __webpack_require__(87),
    'full': __webpack_require__(88),
    'left': __webpack_require__(89),
    'right': __webpack_require__(90)
  },
  'formula': __webpack_require__(91),
  'header': {
    '1': __webpack_require__(92),
    '2': __webpack_require__(93)
  },
  'italic': __webpack_require__(94),
  'image': __webpack_require__(95),
  'indent': {
    '+1': __webpack_require__(96),
    '-1': __webpack_require__(97)
  },
  'link': __webpack_require__(98),
  'list': {
    'ordered': __webpack_require__(99),
    'bullet': __webpack_require__(100),
    'check': __webpack_require__(101)
  },
  'script': {
    'sub': __webpack_require__(102),
    'super': __webpack_require__(103)
  },
  'strike': __webpack_require__(104),
  'underline': __webpack_require__(105),
  'video': __webpack_require__(106)
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastChangeIndex = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var History = function (_Module) {
  _inherits(History, _Module);

  function History(quill, options) {
    _classCallCheck(this, History);

    var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, quill, options));

    _this.lastRecorded = 0;
    _this.ignoreChange = false;
    _this.clear();
    _this.quill.on(_quill2.default.events.EDITOR_CHANGE, function (eventName, delta, oldDelta, source) {
      if (eventName !== _quill2.default.events.TEXT_CHANGE || _this.ignoreChange) return;
      if (!_this.options.userOnly || source === _quill2.default.sources.USER) {
        _this.record(delta, oldDelta);
      } else {
        _this.transform(delta);
      }
    });
    _this.quill.keyboard.addBinding({ key: 'Z', shortKey: true }, _this.undo.bind(_this));
    _this.quill.keyboard.addBinding({ key: 'Z', shortKey: true, shiftKey: true }, _this.redo.bind(_this));
    if (/Win/i.test(navigator.platform)) {
      _this.quill.keyboard.addBinding({ key: 'Y', shortKey: true }, _this.redo.bind(_this));
    }
    return _this;
  }

  _createClass(History, [{
    key: 'change',
    value: function change(source, dest) {
      if (this.stack[source].length === 0) return;
      var delta = this.stack[source].pop();
      this.lastRecorded = 0;
      this.ignoreChange = true;
      this.quill.updateContents(delta[source], _quill2.default.sources.USER);
      this.ignoreChange = false;
      var index = getLastChangeIndex(delta[source]);
      this.quill.setSelection(index);
      this.stack[dest].push(delta);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.stack = { undo: [], redo: [] };
    }
  }, {
    key: 'cutoff',
    value: function cutoff() {
      this.lastRecorded = 0;
    }
  }, {
    key: 'record',
    value: function record(changeDelta, oldDelta) {
      if (changeDelta.ops.length === 0) return;
      this.stack.redo = [];
      var undoDelta = this.quill.getContents().diff(oldDelta);
      var timestamp = Date.now();
      if (this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0) {
        var delta = this.stack.undo.pop();
        undoDelta = undoDelta.compose(delta.undo);
        changeDelta = delta.redo.compose(changeDelta);
      } else {
        this.lastRecorded = timestamp;
      }
      this.stack.undo.push({
        redo: changeDelta,
        undo: undoDelta
      });
      if (this.stack.undo.length > this.options.maxStack) {
        this.stack.undo.shift();
      }
    }
  }, {
    key: 'redo',
    value: function redo() {
      this.change('redo', 'undo');
    }
  }, {
    key: 'transform',
    value: function transform(delta) {
      this.stack.undo.forEach(function (change) {
        change.undo = delta.transform(change.undo, true);
        change.redo = delta.transform(change.redo, true);
      });
      this.stack.redo.forEach(function (change) {
        change.undo = delta.transform(change.undo, true);
        change.redo = delta.transform(change.redo, true);
      });
    }
  }, {
    key: 'undo',
    value: function undo() {
      this.change('undo', 'redo');
    }
  }]);

  return History;
}(_module2.default);

History.DEFAULTS = {
  delay: 1000,
  maxStack: 100,
  userOnly: false
};

function endsWithNewlineChange(delta) {
  var lastOp = delta.ops[delta.ops.length - 1];
  if (lastOp == null) return false;
  if (lastOp.insert != null) {
    return typeof lastOp.insert === 'string' && lastOp.insert.endsWith('\n');
  }
  if (lastOp.attributes != null) {
    return Object.keys(lastOp.attributes).some(function (attr) {
      return _parchment2.default.query(attr, _parchment2.default.Scope.BLOCK) != null;
    });
  }
  return false;
}

function getLastChangeIndex(delta) {
  var deleteLength = delta.reduce(function (length, op) {
    length += op.delete || 0;
    return length;
  }, 0);
  var changeIndex = delta.length() - deleteLength;
  if (endsWithNewlineChange(delta)) {
    changeIndex -= 1;
  }
  return changeIndex;
}

exports.default = History;
exports.getLastChangeIndex = getLastChangeIndex;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BaseTooltip = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _emitter = __webpack_require__(8);

var _emitter2 = _interopRequireDefault(_emitter);

var _keyboard = __webpack_require__(35);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _theme = __webpack_require__(34);

var _theme2 = _interopRequireDefault(_theme);

var _colorPicker = __webpack_require__(59);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _iconPicker = __webpack_require__(60);

var _iconPicker2 = _interopRequireDefault(_iconPicker);

var _picker = __webpack_require__(28);

var _picker2 = _interopRequireDefault(_picker);

var _tooltip = __webpack_require__(61);

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ALIGNS = [false, 'center', 'right', 'justify'];

var COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];

var FONTS = [false, 'serif', 'monospace'];

var HEADERS = ['1', '2', '3', false];

var SIZES = ['small', false, 'large', 'huge'];

var BaseTheme = function (_Theme) {
  _inherits(BaseTheme, _Theme);

  function BaseTheme(quill, options) {
    _classCallCheck(this, BaseTheme);

    var _this = _possibleConstructorReturn(this, (BaseTheme.__proto__ || Object.getPrototypeOf(BaseTheme)).call(this, quill, options));

    var listener = function listener(e) {
      if (!document.body.contains(quill.root)) {
        return document.body.removeEventListener('click', listener);
      }
      if (_this.tooltip != null && !_this.tooltip.root.contains(e.target) && document.activeElement !== _this.tooltip.textbox && !_this.quill.hasFocus()) {
        _this.tooltip.hide();
      }
      if (_this.pickers != null) {
        _this.pickers.forEach(function (picker) {
          if (!picker.container.contains(e.target)) {
            picker.close();
          }
        });
      }
    };
    quill.emitter.listenDOM('click', document.body, listener);
    return _this;
  }

  _createClass(BaseTheme, [{
    key: 'addModule',
    value: function addModule(name) {
      var module = _get(BaseTheme.prototype.__proto__ || Object.getPrototypeOf(BaseTheme.prototype), 'addModule', this).call(this, name);
      if (name === 'toolbar') {
        this.extendToolbar(module);
      }
      return module;
    }
  }, {
    key: 'buildButtons',
    value: function buildButtons(buttons, icons) {
      buttons.forEach(function (button) {
        var className = button.getAttribute('class') || '';
        className.split(/\s+/).forEach(function (name) {
          if (!name.startsWith('ql-')) return;
          name = name.slice('ql-'.length);
          if (icons[name] == null) return;
          if (name === 'direction') {
            button.innerHTML = icons[name][''] + icons[name]['rtl'];
          } else if (typeof icons[name] === 'string') {
            button.innerHTML = icons[name];
          } else {
            var value = button.value || '';
            if (value != null && icons[name][value]) {
              button.innerHTML = icons[name][value];
            }
          }
        });
      });
    }
  }, {
    key: 'buildPickers',
    value: function buildPickers(selects, icons) {
      var _this2 = this;

      this.pickers = selects.map(function (select) {
        if (select.classList.contains('ql-align')) {
          if (select.querySelector('option') == null) {
            fillSelect(select, ALIGNS);
          }
          return new _iconPicker2.default(select, icons.align);
        } else if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
          var format = select.classList.contains('ql-background') ? 'background' : 'color';
          if (select.querySelector('option') == null) {
            fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000');
          }
          return new _colorPicker2.default(select, icons[format]);
        } else {
          if (select.querySelector('option') == null) {
            if (select.classList.contains('ql-font')) {
              fillSelect(select, FONTS);
            } else if (select.classList.contains('ql-header')) {
              fillSelect(select, HEADERS);
            } else if (select.classList.contains('ql-size')) {
              fillSelect(select, SIZES);
            }
          }
          return new _picker2.default(select);
        }
      });
      var update = function update() {
        _this2.pickers.forEach(function (picker) {
          picker.update();
        });
      };
      this.quill.on(_emitter2.default.events.EDITOR_CHANGE, update);
    }
  }]);

  return BaseTheme;
}(_theme2.default);

BaseTheme.DEFAULTS = (0, _extend2.default)(true, {}, _theme2.default.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula: function formula() {
          this.quill.theme.tooltip.edit('formula');
        },
        image: function image() {
          var _this3 = this;

          var fileInput = this.container.querySelector('input.ql-image[type=file]');
          if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
            fileInput.classList.add('ql-image');
            fileInput.addEventListener('change', function () {
              if (fileInput.files != null && fileInput.files[0] != null) {
                var reader = new FileReader();
                reader.onload = function (e) {
                  var range = _this3.quill.getSelection(true);
                  _this3.quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert({ image: e.target.result }), _emitter2.default.sources.USER);
                  _this3.quill.setSelection(range.index + 1, _emitter2.default.sources.SILENT);
                  fileInput.value = "";
                };
                reader.readAsDataURL(fileInput.files[0]);
              }
            });
            this.container.appendChild(fileInput);
          }
          fileInput.click();
        },
        video: function video() {
          this.quill.theme.tooltip.edit('video');
        }
      }
    }
  }
});

var BaseTooltip = function (_Tooltip) {
  _inherits(BaseTooltip, _Tooltip);

  function BaseTooltip(quill, boundsContainer) {
    _classCallCheck(this, BaseTooltip);

    var _this4 = _possibleConstructorReturn(this, (BaseTooltip.__proto__ || Object.getPrototypeOf(BaseTooltip)).call(this, quill, boundsContainer));

    _this4.textbox = _this4.root.querySelector('input[type="text"]');
    _this4.listen();
    return _this4;
  }

  _createClass(BaseTooltip, [{
    key: 'listen',
    value: function listen() {
      var _this5 = this;

      this.textbox.addEventListener('keydown', function (event) {
        if (_keyboard2.default.match(event, 'enter')) {
          _this5.save();
          event.preventDefault();
        } else if (_keyboard2.default.match(event, 'escape')) {
          _this5.cancel();
          event.preventDefault();
        }
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.hide();
    }
  }, {
    key: 'edit',
    value: function edit() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'link';
      var preview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      this.root.classList.remove('ql-hidden');
      this.root.classList.add('ql-editing');
      if (preview != null) {
        this.textbox.value = preview;
      } else if (mode !== this.root.getAttribute('data-mode')) {
        this.textbox.value = '';
      }
      this.position(this.quill.getBounds(this.quill.selection.savedRange));
      this.textbox.select();
      this.textbox.setAttribute('placeholder', this.textbox.getAttribute('data-' + mode) || '');
      this.root.setAttribute('data-mode', mode);
    }
  }, {
    key: 'restoreFocus',
    value: function restoreFocus() {
      var scrollTop = this.quill.scrollingContainer.scrollTop;
      this.quill.focus();
      this.quill.scrollingContainer.scrollTop = scrollTop;
    }
  }, {
    key: 'save',
    value: function save() {
      var value = this.textbox.value;
      switch (this.root.getAttribute('data-mode')) {
        case 'link':
          {
            var scrollTop = this.quill.root.scrollTop;
            if (this.linkRange) {
              this.quill.formatText(this.linkRange, 'link', value, _emitter2.default.sources.USER);
              delete this.linkRange;
            } else {
              this.restoreFocus();
              this.quill.format('link', value, _emitter2.default.sources.USER);
            }
            this.quill.root.scrollTop = scrollTop;
            break;
          }
        case 'video':
          {
            value = extractVideoUrl(value);
          } // eslint-disable-next-line no-fallthrough
        case 'formula':
          {
            if (!value) break;
            var range = this.quill.getSelection(true);
            if (range != null) {
              var index = range.index + range.length;
              this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, _emitter2.default.sources.USER);
              if (this.root.getAttribute('data-mode') === 'formula') {
                this.quill.insertText(index + 1, ' ', _emitter2.default.sources.USER);
              }
              this.quill.setSelection(index + 2, _emitter2.default.sources.USER);
            }
            break;
          }
        default:
      }
      this.textbox.value = '';
      this.hide();
    }
  }]);

  return BaseTooltip;
}(_tooltip2.default);

function extractVideoUrl(url) {
  var match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return (match[1] || 'https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
  }
  if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {
    // eslint-disable-line no-cond-assign
    return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
  }
  return url;
}

function fillSelect(select, values) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  values.forEach(function (value) {
    var option = document.createElement('option');
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected');
    } else {
      option.setAttribute('value', value);
    }
    select.appendChild(option);
  });
}

exports.BaseTooltip = BaseTooltip;
exports.default = BaseTheme;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = this.tail = undefined;
        this.length = 0;
    }
    LinkedList.prototype.append = function () {
        var nodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nodes[_i] = arguments[_i];
        }
        this.insertBefore(nodes[0], undefined);
        if (nodes.length > 1) {
            this.append.apply(this, nodes.slice(1));
        }
    };
    LinkedList.prototype.contains = function (node) {
        var cur, next = this.iterator();
        while ((cur = next())) {
            if (cur === node)
                return true;
        }
        return false;
    };
    LinkedList.prototype.insertBefore = function (node, refNode) {
        node.next = refNode;
        if (refNode != null) {
            node.prev = refNode.prev;
            if (refNode.prev != null) {
                refNode.prev.next = node;
            }
            refNode.prev = node;
            if (refNode === this.head) {
                this.head = node;
            }
        }
        else if (this.tail != null) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        else {
            node.prev = undefined;
            this.head = this.tail = node;
        }
        this.length += 1;
    };
    LinkedList.prototype.offset = function (target) {
        var index = 0, cur = this.head;
        while (cur != null) {
            if (cur === target)
                return index;
            index += cur.length();
            cur = cur.next;
        }
        return -1;
    };
    LinkedList.prototype.remove = function (node) {
        if (!this.contains(node))
            return;
        if (node.prev != null)
            node.prev.next = node.next;
        if (node.next != null)
            node.next.prev = node.prev;
        if (node === this.head)
            this.head = node.next;
        if (node === this.tail)
            this.tail = node.prev;
        this.length -= 1;
    };
    LinkedList.prototype.iterator = function (curNode) {
        if (curNode === void 0) { curNode = this.head; }
        // TODO use yield when we can
        return function () {
            var ret = curNode;
            if (curNode != null)
                curNode = curNode.next;
            return ret;
        };
    };
    LinkedList.prototype.find = function (index, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        var cur, next = this.iterator();
        while ((cur = next())) {
            var length = cur.length();
            if (index < length ||
                (inclusive && index === length && (cur.next == null || cur.next.length() !== 0))) {
                return [cur, index];
            }
            index -= length;
        }
        return [null, 0];
    };
    LinkedList.prototype.forEach = function (callback) {
        var cur, next = this.iterator();
        while ((cur = next())) {
            callback(cur);
        }
    };
    LinkedList.prototype.forEachAt = function (index, length, callback) {
        if (length <= 0)
            return;
        var _a = this.find(index), startNode = _a[0], offset = _a[1];
        var cur, curIndex = index - offset, next = this.iterator(startNode);
        while ((cur = next()) && curIndex < index + length) {
            var curLength = cur.length();
            if (index > curIndex) {
                callback(cur, index - curIndex, Math.min(length, curIndex + curLength - index));
            }
            else {
                callback(cur, 0, Math.min(curLength, index + length - curIndex));
            }
            curIndex += curLength;
        }
    };
    LinkedList.prototype.map = function (callback) {
        return this.reduce(function (memo, cur) {
            memo.push(callback(cur));
            return memo;
        }, []);
    };
    LinkedList.prototype.reduce = function (callback, memo) {
        var cur, next = this.iterator();
        while ((cur = next())) {
            memo = callback(memo, cur);
        }
        return memo;
    };
    return LinkedList;
}());
exports.default = LinkedList;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(17);
var Registry = __webpack_require__(1);
var OBSERVER_CONFIG = {
    attributes: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true,
};
var MAX_OPTIMIZE_ITERATIONS = 100;
var ScrollBlot = /** @class */ (function (_super) {
    __extends(ScrollBlot, _super);
    function ScrollBlot(node) {
        var _this = _super.call(this, node) || this;
        _this.parent = null;
        _this.observer = new MutationObserver(function (mutations) {
            _this.update(mutations);
        });
        _this.observer.observe(_this.domNode, OBSERVER_CONFIG);
        _this.scroll = _this;
        return _this;
    }
    ScrollBlot.prototype.detach = function () {
        _super.prototype.detach.call(this);
        this.observer.disconnect();
    };
    ScrollBlot.prototype.deleteAt = function (index, length) {
        this.update();
        if (index === 0 && length === this.length()) {
            this.children.forEach(function (child) {
                child.remove();
            });
        }
        else {
            _super.prototype.deleteAt.call(this, index, length);
        }
    };
    ScrollBlot.prototype.formatAt = function (index, length, name, value) {
        this.update();
        _super.prototype.formatAt.call(this, index, length, name, value);
    };
    ScrollBlot.prototype.insertAt = function (index, value, def) {
        this.update();
        _super.prototype.insertAt.call(this, index, value, def);
    };
    ScrollBlot.prototype.optimize = function (mutations, context) {
        var _this = this;
        if (mutations === void 0) { mutations = []; }
        if (context === void 0) { context = {}; }
        _super.prototype.optimize.call(this, context);
        // We must modify mutations directly, cannot make copy and then modify
        var records = [].slice.call(this.observer.takeRecords());
        // Array.push currently seems to be implemented by a non-tail recursive function
        // so we cannot just mutations.push.apply(mutations, this.observer.takeRecords());
        while (records.length > 0)
            mutations.push(records.pop());
        // TODO use WeakMap
        var mark = function (blot, markParent) {
            if (markParent === void 0) { markParent = true; }
            if (blot == null || blot === _this)
                return;
            if (blot.domNode.parentNode == null)
                return;
            if (blot.domNode[Registry.DATA_KEY].mutations == null) {
                blot.domNode[Registry.DATA_KEY].mutations = [];
            }
            if (markParent)
                mark(blot.parent);
        };
        var optimize = function (blot) {
            // Post-order traversal
            if (blot.domNode[Registry.DATA_KEY] == null ||
                blot.domNode[Registry.DATA_KEY].mutations == null) {
                return;
            }
            if (blot instanceof container_1.default) {
                blot.children.forEach(optimize);
            }
            blot.optimize(context);
        };
        var remaining = mutations;
        for (var i = 0; remaining.length > 0; i += 1) {
            if (i >= MAX_OPTIMIZE_ITERATIONS) {
                throw new Error('[Parchment] Maximum optimize iterations reached');
            }
            remaining.forEach(function (mutation) {
                var blot = Registry.find(mutation.target, true);
                if (blot == null)
                    return;
                if (blot.domNode === mutation.target) {
                    if (mutation.type === 'childList') {
                        mark(Registry.find(mutation.previousSibling, false));
                        [].forEach.call(mutation.addedNodes, function (node) {
                            var child = Registry.find(node, false);
                            mark(child, false);
                            if (child instanceof container_1.default) {
                                child.children.forEach(function (grandChild) {
                                    mark(grandChild, false);
                                });
                            }
                        });
                    }
                    else if (mutation.type === 'attributes') {
                        mark(blot.prev);
                    }
                }
                mark(blot);
            });
            this.children.forEach(optimize);
            remaining = [].slice.call(this.observer.takeRecords());
            records = remaining.slice();
            while (records.length > 0)
                mutations.push(records.pop());
        }
    };
    ScrollBlot.prototype.update = function (mutations, context) {
        var _this = this;
        if (context === void 0) { context = {}; }
        mutations = mutations || this.observer.takeRecords();
        // TODO use WeakMap
        mutations
            .map(function (mutation) {
            var blot = Registry.find(mutation.target, true);
            if (blot == null)
                return;
            if (blot.domNode[Registry.DATA_KEY].mutations == null) {
                blot.domNode[Registry.DATA_KEY].mutations = [mutation];
                return blot;
            }
            else {
                blot.domNode[Registry.DATA_KEY].mutations.push(mutation);
                return null;
            }
        })
            .forEach(function (blot) {
            if (blot == null || blot === _this || blot.domNode[Registry.DATA_KEY] == null)
                return;
            blot.update(blot.domNode[Registry.DATA_KEY].mutations || [], context);
        });
        if (this.domNode[Registry.DATA_KEY].mutations != null) {
            _super.prototype.update.call(this, this.domNode[Registry.DATA_KEY].mutations, context);
        }
        this.optimize(mutations, context);
    };
    ScrollBlot.blotName = 'scroll';
    ScrollBlot.defaultChild = 'block';
    ScrollBlot.scope = Registry.Scope.BLOCK_BLOT;
    ScrollBlot.tagName = 'DIV';
    return ScrollBlot;
}(container_1.default));
exports.default = ScrollBlot;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = __webpack_require__(18);
var Registry = __webpack_require__(1);
// Shallow object comparison
function isEqual(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length)
        return false;
    for (var prop in obj1) {
        if (obj1[prop] !== obj2[prop])
            return false;
    }
    return true;
}
var InlineBlot = /** @class */ (function (_super) {
    __extends(InlineBlot, _super);
    function InlineBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineBlot.formats = function (domNode) {
        if (domNode.tagName === InlineBlot.tagName)
            return undefined;
        return _super.formats.call(this, domNode);
    };
    InlineBlot.prototype.format = function (name, value) {
        var _this = this;
        if (name === this.statics.blotName && !value) {
            this.children.forEach(function (child) {
                if (!(child instanceof format_1.default)) {
                    child = child.wrap(InlineBlot.blotName, true);
                }
                _this.attributes.copy(child);
            });
            this.unwrap();
        }
        else {
            _super.prototype.format.call(this, name, value);
        }
    };
    InlineBlot.prototype.formatAt = function (index, length, name, value) {
        if (this.formats()[name] != null || Registry.query(name, Registry.Scope.ATTRIBUTE)) {
            var blot = this.isolate(index, length);
            blot.format(name, value);
        }
        else {
            _super.prototype.formatAt.call(this, index, length, name, value);
        }
    };
    InlineBlot.prototype.optimize = function (context) {
        _super.prototype.optimize.call(this, context);
        var formats = this.formats();
        if (Object.keys(formats).length === 0) {
            return this.unwrap(); // unformatted span
        }
        var next = this.next;
        if (next instanceof InlineBlot && next.prev === this && isEqual(formats, next.formats())) {
            next.moveChildren(this);
            next.remove();
        }
    };
    InlineBlot.blotName = 'inline';
    InlineBlot.scope = Registry.Scope.INLINE_BLOT;
    InlineBlot.tagName = 'SPAN';
    return InlineBlot;
}(format_1.default));
exports.default = InlineBlot;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = __webpack_require__(18);
var Registry = __webpack_require__(1);
var BlockBlot = /** @class */ (function (_super) {
    __extends(BlockBlot, _super);
    function BlockBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlockBlot.formats = function (domNode) {
        var tagName = Registry.query(BlockBlot.blotName).tagName;
        if (domNode.tagName === tagName)
            return undefined;
        return _super.formats.call(this, domNode);
    };
    BlockBlot.prototype.format = function (name, value) {
        if (Registry.query(name, Registry.Scope.BLOCK) == null) {
            return;
        }
        else if (name === this.statics.blotName && !value) {
            this.replaceWith(BlockBlot.blotName);
        }
        else {
            _super.prototype.format.call(this, name, value);
        }
    };
    BlockBlot.prototype.formatAt = function (index, length, name, value) {
        if (Registry.query(name, Registry.Scope.BLOCK) != null) {
            this.format(name, value);
        }
        else {
            _super.prototype.formatAt.call(this, index, length, name, value);
        }
    };
    BlockBlot.prototype.insertAt = function (index, value, def) {
        if (def == null || Registry.query(value, Registry.Scope.INLINE) != null) {
            // Insert text or inline
            _super.prototype.insertAt.call(this, index, value, def);
        }
        else {
            var after = this.split(index);
            var blot = Registry.create(value, def);
            after.parent.insertBefore(blot, after);
        }
    };
    BlockBlot.prototype.update = function (mutations, context) {
        if (navigator.userAgent.match(/Trident/)) {
            this.attach();
        }
        else {
            _super.prototype.update.call(this, mutations, context);
        }
    };
    BlockBlot.blotName = 'block';
    BlockBlot.scope = Registry.Scope.BLOCK_BLOT;
    BlockBlot.tagName = 'P';
    return BlockBlot;
}(format_1.default));
exports.default = BlockBlot;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var leaf_1 = __webpack_require__(19);
var EmbedBlot = /** @class */ (function (_super) {
    __extends(EmbedBlot, _super);
    function EmbedBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmbedBlot.formats = function (domNode) {
        return undefined;
    };
    EmbedBlot.prototype.format = function (name, value) {
        // super.formatAt wraps, which is what we want in general,
        // but this allows subclasses to overwrite for formats
        // that just apply to particular embeds
        _super.prototype.formatAt.call(this, 0, this.length(), name, value);
    };
    EmbedBlot.prototype.formatAt = function (index, length, name, value) {
        if (index === 0 && length === this.length()) {
            this.format(name, value);
        }
        else {
            _super.prototype.formatAt.call(this, index, length, name, value);
        }
    };
    EmbedBlot.prototype.formats = function () {
        return this.statics.formats(this.domNode);
    };
    return EmbedBlot;
}(leaf_1.default));
exports.default = EmbedBlot;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var leaf_1 = __webpack_require__(19);
var Registry = __webpack_require__(1);
var TextBlot = /** @class */ (function (_super) {
    __extends(TextBlot, _super);
    function TextBlot(node) {
        var _this = _super.call(this, node) || this;
        _this.text = _this.statics.value(_this.domNode);
        return _this;
    }
    TextBlot.create = function (value) {
        return document.createTextNode(value);
    };
    TextBlot.value = function (domNode) {
        var text = domNode.data;
        if (text['normalize'])
            text = text['normalize']();
        return text;
    };
    TextBlot.prototype.deleteAt = function (index, length) {
        this.domNode.data = this.text = this.text.slice(0, index) + this.text.slice(index + length);
    };
    TextBlot.prototype.index = function (node, offset) {
        if (this.domNode === node) {
            return offset;
        }
        return -1;
    };
    TextBlot.prototype.insertAt = function (index, value, def) {
        if (def == null) {
            this.text = this.text.slice(0, index) + value + this.text.slice(index);
            this.domNode.data = this.text;
        }
        else {
            _super.prototype.insertAt.call(this, index, value, def);
        }
    };
    TextBlot.prototype.length = function () {
        return this.text.length;
    };
    TextBlot.prototype.optimize = function (context) {
        _super.prototype.optimize.call(this, context);
        this.text = this.statics.value(this.domNode);
        if (this.text.length === 0) {
            this.remove();
        }
        else if (this.next instanceof TextBlot && this.next.prev === this) {
            this.insertAt(this.length(), this.next.value());
            this.next.remove();
        }
    };
    TextBlot.prototype.position = function (index, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        return [this.domNode, index];
    };
    TextBlot.prototype.split = function (index, force) {
        if (force === void 0) { force = false; }
        if (!force) {
            if (index === 0)
                return this;
            if (index === this.length())
                return this.next;
        }
        var after = Registry.create(this.domNode.splitText(index));
        this.parent.insertBefore(after, this.next);
        this.text = this.statics.value(this.domNode);
        return after;
    };
    TextBlot.prototype.update = function (mutations, context) {
        var _this = this;
        if (mutations.some(function (mutation) {
            return mutation.type === 'characterData' && mutation.target === _this.domNode;
        })) {
            this.text = this.statics.value(this.domNode);
        }
    };
    TextBlot.prototype.value = function () {
        return this.text;
    };
    TextBlot.blotName = 'text';
    TextBlot.scope = Registry.Scope.INLINE_BLOT;
    return TextBlot;
}(leaf_1.default));
exports.default = TextBlot;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elem = document.createElement('div');
elem.classList.toggle('test-class', false);
if (elem.classList.contains('test-class')) {
  var _toggle = DOMTokenList.prototype.toggle;
  DOMTokenList.prototype.toggle = function (token, force) {
    if (arguments.length > 1 && !this.contains(token) === !force) {
      return force;
    } else {
      return _toggle.call(this, token);
    }
  };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
    value: function value(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Disable resizing in Firefox
  document.execCommand("enableObjectResizing", false, false);
  // Disable automatic linkifying in IE11
  document.execCommand("autoUrlDetect", false, false);
});

/***/ }),
/* 51 */
/***/ (function(module, exports) {

/**
 * This library modifies the diff-patch-match library by Neil Fraser
 * by removing the patch and match functionality and certain advanced
 * options in the diff function. The original license is as follows:
 *
 * ===
 *
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;


/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {Int} cursor_pos Expected edit position in text1 (optional)
 * @return {Array} Array of diff tuples.
 */
function diff_main(text1, text2, cursor_pos) {
  // Check for equality (speedup).
  if (text1 == text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  // Check cursor_pos within bounds
  if (cursor_pos < 0 || text1.length < cursor_pos) {
    cursor_pos = null;
  }

  // Trim off common prefix (speedup).
  var commonlength = diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = diff_compute_(text1, text2);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  diff_cleanupMerge(diffs);
  if (cursor_pos != null) {
    diffs = fix_cursor(diffs, cursor_pos);
  }
  diffs = fix_emoji(diffs);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 */
function diff_compute_(text1, text2) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
             [DIFF_EQUAL, shorttext],
             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  // Check to see if the problem can be split in two.
  var hm = diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = diff_main(text1_a, text2_a);
    var diffs_b = diff_main(text1_b, text2_b);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  return diff_bisect_(text1, text2);
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 * @private
 */
function diff_bisect_(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 != 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length &&
             text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length &&
             text1.charAt(text1_length - x2 - 1) ==
             text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @return {Array} Array of diff tuples.
 */
function diff_bisectSplit_(text1, text2, x, y) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = diff_main(text1a, text2a);
  var diffsb = diff_main(text1b, text2b);

  return diffs.concat(diffsb);
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
function diff_commonPrefix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
function diff_commonSuffix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 ||
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 */
function diff_halfMatch_(text1, text2) {
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = diff_commonPrefix(longtext.substring(i),
                                           shorttext.substring(j));
      var suffixLength = diff_commonSuffix(longtext.substring(0, i),
                                           shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b,
              best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {Array} diffs Array of diff tuples.
 */
function diff_cleanupMerge(diffs) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if ((pointer - count_delete - count_insert) > 0 &&
                  diffs[pointer - count_delete - count_insert - 1][0] ==
                  DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] +=
                    text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL,
                                    text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length -
                  commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length -
                  commonlength);
              text_delete = text_delete.substring(0, text_delete.length -
                  commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          if (count_delete === 0) {
            diffs.splice(pointer - count_insert,
                count_delete + count_insert, [DIFF_INSERT, text_insert]);
          } else if (count_insert === 0) {
            diffs.splice(pointer - count_delete,
                count_delete + count_insert, [DIFF_DELETE, text_delete]);
          } else {
            diffs.splice(pointer - count_delete - count_insert,
                count_delete + count_insert, [DIFF_DELETE, text_delete],
                [DIFF_INSERT, text_insert]);
          }
          pointer = pointer - count_delete - count_insert +
                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length -
                                        diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    diff_cleanupMerge(diffs);
  }
};


var diff = diff_main;
diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;

module.exports = diff;

/*
 * Modify a diff such that the cursor position points to the start of a change:
 * E.g.
 *   cursor_normalize_diff([[DIFF_EQUAL, 'abc']], 1)
 *     => [1, [[DIFF_EQUAL, 'a'], [DIFF_EQUAL, 'bc']]]
 *   cursor_normalize_diff([[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xyz']], 2)
 *     => [2, [[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xy'], [DIFF_DELETE, 'z']]]
 *
 * @param {Array} diffs Array of diff tuples
 * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
 * @return {Array} A tuple [cursor location in the modified diff, modified diff]
 */
function cursor_normalize_diff (diffs, cursor_pos) {
  if (cursor_pos === 0) {
    return [DIFF_EQUAL, diffs];
  }
  for (var current_pos = 0, i = 0; i < diffs.length; i++) {
    var d = diffs[i];
    if (d[0] === DIFF_DELETE || d[0] === DIFF_EQUAL) {
      var next_pos = current_pos + d[1].length;
      if (cursor_pos === next_pos) {
        return [i + 1, diffs];
      } else if (cursor_pos < next_pos) {
        // copy to prevent side effects
        diffs = diffs.slice();
        // split d into two diff changes
        var split_pos = cursor_pos - current_pos;
        var d_left = [d[0], d[1].slice(0, split_pos)];
        var d_right = [d[0], d[1].slice(split_pos)];
        diffs.splice(i, 1, d_left, d_right);
        return [i + 1, diffs];
      } else {
        current_pos = next_pos;
      }
    }
  }
  throw new Error('cursor_pos is out of bounds!')
}

/*
 * Modify a diff such that the edit position is "shifted" to the proposed edit location (cursor_position).
 *
 * Case 1)
 *   Check if a naive shift is possible:
 *     [0, X], [ 1, Y] -> [ 1, Y], [0, X]    (if X + Y === Y + X)
 *     [0, X], [-1, Y] -> [-1, Y], [0, X]    (if X + Y === Y + X) - holds same result
 * Case 2)
 *   Check if the following shifts are possible:
 *     [0, 'pre'], [ 1, 'prefix'] -> [ 1, 'pre'], [0, 'pre'], [ 1, 'fix']
 *     [0, 'pre'], [-1, 'prefix'] -> [-1, 'pre'], [0, 'pre'], [-1, 'fix']
 *         ^            ^
 *         d          d_next
 *
 * @param {Array} diffs Array of diff tuples
 * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
 * @return {Array} Array of diff tuples
 */
function fix_cursor (diffs, cursor_pos) {
  var norm = cursor_normalize_diff(diffs, cursor_pos);
  var ndiffs = norm[1];
  var cursor_pointer = norm[0];
  var d = ndiffs[cursor_pointer];
  var d_next = ndiffs[cursor_pointer + 1];

  if (d == null) {
    // Text was deleted from end of original string,
    // cursor is now out of bounds in new string
    return diffs;
  } else if (d[0] !== DIFF_EQUAL) {
    // A modification happened at the cursor location.
    // This is the expected outcome, so we can return the original diff.
    return diffs;
  } else {
    if (d_next != null && d[1] + d_next[1] === d_next[1] + d[1]) {
      // Case 1)
      // It is possible to perform a naive shift
      ndiffs.splice(cursor_pointer, 2, d_next, d)
      return merge_tuples(ndiffs, cursor_pointer, 2)
    } else if (d_next != null && d_next[1].indexOf(d[1]) === 0) {
      // Case 2)
      // d[1] is a prefix of d_next[1]
      // We can assume that d_next[0] !== 0, since d[0] === 0
      // Shift edit locations..
      ndiffs.splice(cursor_pointer, 2, [d_next[0], d[1]], [0, d[1]]);
      var suffix = d_next[1].slice(d[1].length);
      if (suffix.length > 0) {
        ndiffs.splice(cursor_pointer + 2, 0, [d_next[0], suffix]);
      }
      return merge_tuples(ndiffs, cursor_pointer, 3)
    } else {
      // Not possible to perform any modification
      return diffs;
    }
  }
}

/*
 * Check diff did not split surrogate pairs.
 * Ex. [0, '\uD83D'], [-1, '\uDC36'], [1, '\uDC2F'] -> [-1, '\uD83D\uDC36'], [1, '\uD83D\uDC2F']
 *     '\uD83D\uDC36' === '🐶', '\uD83D\uDC2F' === '🐯'
 *
 * @param {Array} diffs Array of diff tuples
 * @return {Array} Array of diff tuples
 */
function fix_emoji (diffs) {
  var compact = false;
  var starts_with_pair_end = function(str) {
    return str.charCodeAt(0) >= 0xDC00 && str.charCodeAt(0) <= 0xDFFF;
  }
  var ends_with_pair_start = function(str) {
    return str.charCodeAt(str.length-1) >= 0xD800 && str.charCodeAt(str.length-1) <= 0xDBFF;
  }
  for (var i = 2; i < diffs.length; i += 1) {
    if (diffs[i-2][0] === DIFF_EQUAL && ends_with_pair_start(diffs[i-2][1]) &&
        diffs[i-1][0] === DIFF_DELETE && starts_with_pair_end(diffs[i-1][1]) &&
        diffs[i][0] === DIFF_INSERT && starts_with_pair_end(diffs[i][1])) {
      compact = true;

      diffs[i-1][1] = diffs[i-2][1].slice(-1) + diffs[i-1][1];
      diffs[i][1] = diffs[i-2][1].slice(-1) + diffs[i][1];

      diffs[i-2][1] = diffs[i-2][1].slice(0, -1);
    }
  }
  if (!compact) {
    return diffs;
  }
  var fixed_diffs = [];
  for (var i = 0; i < diffs.length; i += 1) {
    if (diffs[i][1].length > 0) {
      fixed_diffs.push(diffs[i]);
    }
  }
  return fixed_diffs;
}

/*
 * Try to merge tuples with their neigbors in a given range.
 * E.g. [0, 'a'], [0, 'b'] -> [0, 'ab']
 *
 * @param {Array} diffs Array of diff tuples.
 * @param {Int} start Position of the first element to merge (diffs[start] is also merged with diffs[start - 1]).
 * @param {Int} length Number of consecutive elements to check.
 * @return {Array} Array of merged diff tuples.
 */
function merge_tuples (diffs, start, length) {
  // Check from (start-1) to (start+length).
  for (var i = start + length - 1; i >= 0 && i >= start - 1; i--) {
    if (i + 1 < diffs.length) {
      var left_d = diffs[i];
      var right_d = diffs[i+1];
      if (left_d[0] === right_d[1]) {
        diffs.splice(i, 2, [left_d[0], left_d[1] + right_d[1]]);
      }
    }
  }
  return diffs;
}


/***/ }),
/* 52 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 53 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

'use strict';

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchText = exports.matchSpacing = exports.matchNewline = exports.matchBlot = exports.matchAttributor = exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend2 = __webpack_require__(3);

var _extend3 = _interopRequireDefault(_extend2);

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

var _align = __webpack_require__(36);

var _background = __webpack_require__(37);

var _code = __webpack_require__(13);

var _code2 = _interopRequireDefault(_code);

var _color = __webpack_require__(26);

var _direction = __webpack_require__(38);

var _font = __webpack_require__(39);

var _size = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = (0, _logger2.default)('quill:clipboard');

var DOM_KEY = '__ql-matcher';

var CLIPBOARD_CONFIG = [[Node.TEXT_NODE, matchText], [Node.TEXT_NODE, matchNewline], ['br', matchBreak], [Node.ELEMENT_NODE, matchNewline], [Node.ELEMENT_NODE, matchBlot], [Node.ELEMENT_NODE, matchSpacing], [Node.ELEMENT_NODE, matchAttributor], [Node.ELEMENT_NODE, matchStyles], ['li', matchIndent], ['b', matchAlias.bind(matchAlias, 'bold')], ['i', matchAlias.bind(matchAlias, 'italic')], ['style', matchIgnore]];

var ATTRIBUTE_ATTRIBUTORS = [_align.AlignAttribute, _direction.DirectionAttribute].reduce(function (memo, attr) {
  memo[attr.keyName] = attr;
  return memo;
}, {});

var STYLE_ATTRIBUTORS = [_align.AlignStyle, _background.BackgroundStyle, _color.ColorStyle, _direction.DirectionStyle, _font.FontStyle, _size.SizeStyle].reduce(function (memo, attr) {
  memo[attr.keyName] = attr;
  return memo;
}, {});

var Clipboard = function (_Module) {
  _inherits(Clipboard, _Module);

  function Clipboard(quill, options) {
    _classCallCheck(this, Clipboard);

    var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this, quill, options));

    _this.quill.root.addEventListener('paste', _this.onPaste.bind(_this));
    _this.container = _this.quill.addContainer('ql-clipboard');
    _this.container.setAttribute('contenteditable', true);
    _this.container.setAttribute('tabindex', -1);
    _this.matchers = [];
    CLIPBOARD_CONFIG.concat(_this.options.matchers).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          selector = _ref2[0],
          matcher = _ref2[1];

      if (!options.matchVisual && matcher === matchSpacing) return;
      _this.addMatcher(selector, matcher);
    });
    return _this;
  }

  _createClass(Clipboard, [{
    key: 'addMatcher',
    value: function addMatcher(selector, matcher) {
      this.matchers.push([selector, matcher]);
    }
  }, {
    key: 'convert',
    value: function convert(html) {
      if (typeof html === 'string') {
        this.container.innerHTML = html.replace(/\>\r?\n +\</g, '><'); // Remove spaces between tags
        return this.convert();
      }
      var formats = this.quill.getFormat(this.quill.selection.savedRange.index);
      if (formats[_code2.default.blotName]) {
        var text = this.container.innerText;
        this.container.innerHTML = '';
        return new _quillDelta2.default().insert(text, _defineProperty({}, _code2.default.blotName, formats[_code2.default.blotName]));
      }

      var _prepareMatching = this.prepareMatching(),
          _prepareMatching2 = _slicedToArray(_prepareMatching, 2),
          elementMatchers = _prepareMatching2[0],
          textMatchers = _prepareMatching2[1];

      var delta = traverse(this.container, elementMatchers, textMatchers);
      // Remove trailing newline
      if (deltaEndsWith(delta, '\n') && delta.ops[delta.ops.length - 1].attributes == null) {
        delta = delta.compose(new _quillDelta2.default().retain(delta.length() - 1).delete(1));
      }
      debug.log('convert', this.container.innerHTML, delta);
      this.container.innerHTML = '';
      return delta;
    }
  }, {
    key: 'dangerouslyPasteHTML',
    value: function dangerouslyPasteHTML(index, html) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _quill2.default.sources.API;

      if (typeof index === 'string') {
        return this.quill.setContents(this.convert(index), html);
      } else {
        var paste = this.convert(html);
        return this.quill.updateContents(new _quillDelta2.default().retain(index).concat(paste), source);
      }
    }
  }, {
    key: 'onPaste',
    value: function onPaste(e) {
      var _this2 = this;

      if (e.defaultPrevented || !this.quill.isEnabled()) return;
      var range = this.quill.getSelection();
      var delta = new _quillDelta2.default().retain(range.index);
      var scrollTop = this.quill.scrollingContainer.scrollTop;
      this.container.focus();
      this.quill.selection.update(_quill2.default.sources.SILENT);
      setTimeout(function () {
        delta = delta.concat(_this2.convert()).delete(range.length);
        _this2.quill.updateContents(delta, _quill2.default.sources.USER);
        // range.length contributes to delta.length()
        _this2.quill.setSelection(delta.length() - range.length, _quill2.default.sources.SILENT);
        _this2.quill.scrollingContainer.scrollTop = scrollTop;
        _this2.quill.focus();
      }, 1);
    }
  }, {
    key: 'prepareMatching',
    value: function prepareMatching() {
      var _this3 = this;

      var elementMatchers = [],
          textMatchers = [];
      this.matchers.forEach(function (pair) {
        var _pair = _slicedToArray(pair, 2),
            selector = _pair[0],
            matcher = _pair[1];

        switch (selector) {
          case Node.TEXT_NODE:
            textMatchers.push(matcher);
            break;
          case Node.ELEMENT_NODE:
            elementMatchers.push(matcher);
            break;
          default:
            [].forEach.call(_this3.container.querySelectorAll(selector), function (node) {
              // TODO use weakmap
              node[DOM_KEY] = node[DOM_KEY] || [];
              node[DOM_KEY].push(matcher);
            });
            break;
        }
      });
      return [elementMatchers, textMatchers];
    }
  }]);

  return Clipboard;
}(_module2.default);

Clipboard.DEFAULTS = {
  matchers: [],
  matchVisual: true
};

function applyFormat(delta, format, value) {
  if ((typeof format === 'undefined' ? 'undefined' : _typeof(format)) === 'object') {
    return Object.keys(format).reduce(function (delta, key) {
      return applyFormat(delta, key, format[key]);
    }, delta);
  } else {
    return delta.reduce(function (delta, op) {
      if (op.attributes && op.attributes[format]) {
        return delta.push(op);
      } else {
        return delta.insert(op.insert, (0, _extend3.default)({}, _defineProperty({}, format, value), op.attributes));
      }
    }, new _quillDelta2.default());
  }
}

function computeStyle(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) return {};
  var DOM_KEY = '__ql-computed-style';
  return node[DOM_KEY] || (node[DOM_KEY] = window.getComputedStyle(node));
}

function deltaEndsWith(delta, text) {
  var endText = "";
  for (var i = delta.ops.length - 1; i >= 0 && endText.length < text.length; --i) {
    var op = delta.ops[i];
    if (typeof op.insert !== 'string') break;
    endText = op.insert + endText;
  }
  return endText.slice(-1 * text.length) === text;
}

function isLine(node) {
  if (node.childNodes.length === 0) return false; // Exclude embed blocks
  var style = computeStyle(node);
  return ['block', 'list-item'].indexOf(style.display) > -1;
}

function traverse(node, elementMatchers, textMatchers) {
  // Post-order
  if (node.nodeType === node.TEXT_NODE) {
    return textMatchers.reduce(function (delta, matcher) {
      return matcher(node, delta);
    }, new _quillDelta2.default());
  } else if (node.nodeType === node.ELEMENT_NODE) {
    return [].reduce.call(node.childNodes || [], function (delta, childNode) {
      var childrenDelta = traverse(childNode, elementMatchers, textMatchers);
      if (childNode.nodeType === node.ELEMENT_NODE) {
        childrenDelta = elementMatchers.reduce(function (childrenDelta, matcher) {
          return matcher(childNode, childrenDelta);
        }, childrenDelta);
        childrenDelta = (childNode[DOM_KEY] || []).reduce(function (childrenDelta, matcher) {
          return matcher(childNode, childrenDelta);
        }, childrenDelta);
      }
      return delta.concat(childrenDelta);
    }, new _quillDelta2.default());
  } else {
    return new _quillDelta2.default();
  }
}

function matchAlias(format, node, delta) {
  return applyFormat(delta, format, true);
}

function matchAttributor(node, delta) {
  var attributes = _parchment2.default.Attributor.Attribute.keys(node);
  var classes = _parchment2.default.Attributor.Class.keys(node);
  var styles = _parchment2.default.Attributor.Style.keys(node);
  var formats = {};
  attributes.concat(classes).concat(styles).forEach(function (name) {
    var attr = _parchment2.default.query(name, _parchment2.default.Scope.ATTRIBUTE);
    if (attr != null) {
      formats[attr.attrName] = attr.value(node);
      if (formats[attr.attrName]) return;
    }
    attr = ATTRIBUTE_ATTRIBUTORS[name];
    if (attr != null && attr.attrName === name) {
      formats[attr.attrName] = attr.value(node) || undefined;
    }
    attr = STYLE_ATTRIBUTORS[name];
    if (attr != null && attr.attrName === name) {
      attr = STYLE_ATTRIBUTORS[name];
      formats[attr.attrName] = attr.value(node) || undefined;
    }
  });
  if (Object.keys(formats).length > 0) {
    delta = applyFormat(delta, formats);
  }
  return delta;
}

function matchBlot(node, delta) {
  var match = _parchment2.default.query(node);
  if (match == null) return delta;
  if (match.prototype instanceof _parchment2.default.Embed) {
    var embed = {};
    var value = match.value(node);
    if (value != null) {
      embed[match.blotName] = value;
      delta = new _quillDelta2.default().insert(embed, match.formats(node));
    }
  } else if (typeof match.formats === 'function') {
    delta = applyFormat(delta, match.blotName, match.formats(node));
  }
  return delta;
}

function matchBreak(node, delta) {
  if (!deltaEndsWith(delta, '\n')) {
    delta.insert('\n');
  }
  return delta;
}

function matchIgnore() {
  return new _quillDelta2.default();
}

function matchIndent(node, delta) {
  var match = _parchment2.default.query(node);
  if (match == null || match.blotName !== 'list-item' || !deltaEndsWith(delta, '\n')) {
    return delta;
  }
  var indent = -1,
      parent = node.parentNode;
  while (!parent.classList.contains('ql-clipboard')) {
    if ((_parchment2.default.query(parent) || {}).blotName === 'list') {
      indent += 1;
    }
    parent = parent.parentNode;
  }
  if (indent <= 0) return delta;
  return delta.compose(new _quillDelta2.default().retain(delta.length() - 1).retain(1, { indent: indent }));
}

function matchNewline(node, delta) {
  if (!deltaEndsWith(delta, '\n')) {
    if (isLine(node) || delta.length() > 0 && node.nextSibling && isLine(node.nextSibling)) {
      delta.insert('\n');
    }
  }
  return delta;
}

function matchSpacing(node, delta) {
  if (isLine(node) && node.nextElementSibling != null && !deltaEndsWith(delta, '\n\n')) {
    var nodeHeight = node.offsetHeight + parseFloat(computeStyle(node).marginTop) + parseFloat(computeStyle(node).marginBottom);
    if (node.nextElementSibling.offsetTop > node.offsetTop + nodeHeight * 1.5) {
      delta.insert('\n');
    }
  }
  return delta;
}

function matchStyles(node, delta) {
  var formats = {};
  var style = node.style || {};
  if (style.fontStyle && computeStyle(node).fontStyle === 'italic') {
    formats.italic = true;
  }
  if (style.fontWeight && (computeStyle(node).fontWeight.startsWith('bold') || parseInt(computeStyle(node).fontWeight) >= 700)) {
    formats.bold = true;
  }
  if (Object.keys(formats).length > 0) {
    delta = applyFormat(delta, formats);
  }
  if (parseFloat(style.textIndent || 0) > 0) {
    // Could be 0.5in
    delta = new _quillDelta2.default().insert('\t').concat(delta);
  }
  return delta;
}

function matchText(node, delta) {
  var text = node.data;
  // Word represents empty line with <o:p>&nbsp;</o:p>
  if (node.parentNode.tagName === 'O:P') {
    return delta.insert(text.trim());
  }
  if (text.trim().length === 0 && node.parentNode.classList.contains('ql-clipboard')) {
    return delta;
  }
  if (!computeStyle(node.parentNode).whiteSpace.startsWith('pre')) {
    // eslint-disable-next-line func-style
    var replacer = function replacer(collapse, match) {
      match = match.replace(/[^\u00a0]/g, ''); // \u00a0 is nbsp;
      return match.length < 1 && collapse ? ' ' : match;
    };
    text = text.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
    text = text.replace(/\s\s+/g, replacer.bind(replacer, true)); // collapse whitespace
    if (node.previousSibling == null && isLine(node.parentNode) || node.previousSibling != null && isLine(node.previousSibling)) {
      text = text.replace(/^\s+/, replacer.bind(replacer, false));
    }
    if (node.nextSibling == null && isLine(node.parentNode) || node.nextSibling != null && isLine(node.nextSibling)) {
      text = text.replace(/\s+$/, replacer.bind(replacer, false));
    }
  }
  return delta.insert(text);
}

exports.default = Clipboard;
exports.matchAttributor = matchAttributor;
exports.matchBlot = matchBlot;
exports.matchNewline = matchNewline;
exports.matchSpacing = matchSpacing;
exports.matchText = matchText;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bold = function (_Inline) {
  _inherits(Bold, _Inline);

  function Bold() {
    _classCallCheck(this, Bold);

    return _possibleConstructorReturn(this, (Bold.__proto__ || Object.getPrototypeOf(Bold)).apply(this, arguments));
  }

  _createClass(Bold, [{
    key: 'optimize',
    value: function optimize(context) {
      _get(Bold.prototype.__proto__ || Object.getPrototypeOf(Bold.prototype), 'optimize', this).call(this, context);
      if (this.domNode.tagName !== this.statics.tagName[0]) {
        this.replaceWith(this.statics.blotName);
      }
    }
  }], [{
    key: 'create',
    value: function create() {
      return _get(Bold.__proto__ || Object.getPrototypeOf(Bold), 'create', this).call(this);
    }
  }, {
    key: 'formats',
    value: function formats() {
      return true;
    }
  }]);

  return Bold;
}(_inline2.default);

Bold.blotName = 'bold';
Bold.tagName = ['STRONG', 'B'];

exports.default = Bold;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addControls = exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = (0, _logger2.default)('quill:toolbar');

var Toolbar = function (_Module) {
  _inherits(Toolbar, _Module);

  function Toolbar(quill, options) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, quill, options));

    if (Array.isArray(_this.options.container)) {
      var container = document.createElement('div');
      addControls(container, _this.options.container);
      quill.container.parentNode.insertBefore(container, quill.container);
      _this.container = container;
    } else if (typeof _this.options.container === 'string') {
      _this.container = document.querySelector(_this.options.container);
    } else {
      _this.container = _this.options.container;
    }
    if (!(_this.container instanceof HTMLElement)) {
      var _ret;

      return _ret = debug.error('Container required for toolbar', _this.options), _possibleConstructorReturn(_this, _ret);
    }
    _this.container.classList.add('ql-toolbar');
    _this.controls = [];
    _this.handlers = {};
    Object.keys(_this.options.handlers).forEach(function (format) {
      _this.addHandler(format, _this.options.handlers[format]);
    });
    [].forEach.call(_this.container.querySelectorAll('button, select'), function (input) {
      _this.attach(input);
    });
    _this.quill.on(_quill2.default.events.EDITOR_CHANGE, function (type, range) {
      if (type === _quill2.default.events.SELECTION_CHANGE) {
        _this.update(range);
      }
    });
    _this.quill.on(_quill2.default.events.SCROLL_OPTIMIZE, function () {
      var _this$quill$selection = _this.quill.selection.getRange(),
          _this$quill$selection2 = _slicedToArray(_this$quill$selection, 1),
          range = _this$quill$selection2[0]; // quill.getSelection triggers update


      _this.update(range);
    });
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'addHandler',
    value: function addHandler(format, handler) {
      this.handlers[format] = handler;
    }
  }, {
    key: 'attach',
    value: function attach(input) {
      var _this2 = this;

      var format = [].find.call(input.classList, function (className) {
        return className.indexOf('ql-') === 0;
      });
      if (!format) return;
      format = format.slice('ql-'.length);
      if (input.tagName === 'BUTTON') {
        input.setAttribute('type', 'button');
      }
      if (this.handlers[format] == null) {
        if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[format] == null) {
          debug.warn('ignoring attaching to disabled format', format, input);
          return;
        }
        if (_parchment2.default.query(format) == null) {
          debug.warn('ignoring attaching to nonexistent format', format, input);
          return;
        }
      }
      var eventName = input.tagName === 'SELECT' ? 'change' : 'click';
      input.addEventListener(eventName, function (e) {
        var value = void 0;
        if (input.tagName === 'SELECT') {
          if (input.selectedIndex < 0) return;
          var selected = input.options[input.selectedIndex];
          if (selected.hasAttribute('selected')) {
            value = false;
          } else {
            value = selected.value || false;
          }
        } else {
          if (input.classList.contains('ql-active')) {
            value = false;
          } else {
            value = input.value || !input.hasAttribute('value');
          }
          e.preventDefault();
        }
        _this2.quill.focus();

        var _quill$selection$getR = _this2.quill.selection.getRange(),
            _quill$selection$getR2 = _slicedToArray(_quill$selection$getR, 1),
            range = _quill$selection$getR2[0];

        if (_this2.handlers[format] != null) {
          _this2.handlers[format].call(_this2, value);
        } else if (_parchment2.default.query(format).prototype instanceof _parchment2.default.Embed) {
          value = prompt('Enter ' + format);
          if (!value) return;
          _this2.quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert(_defineProperty({}, format, value)), _quill2.default.sources.USER);
        } else {
          _this2.quill.format(format, value, _quill2.default.sources.USER);
        }
        _this2.update(range);
      });
      // TODO use weakmap
      this.controls.push([format, input]);
    }
  }, {
    key: 'update',
    value: function update(range) {
      var formats = range == null ? {} : this.quill.getFormat(range);
      this.controls.forEach(function (pair) {
        var _pair = _slicedToArray(pair, 2),
            format = _pair[0],
            input = _pair[1];

        if (input.tagName === 'SELECT') {
          var option = void 0;
          if (range == null) {
            option = null;
          } else if (formats[format] == null) {
            option = input.querySelector('option[selected]');
          } else if (!Array.isArray(formats[format])) {
            var value = formats[format];
            if (typeof value === 'string') {
              value = value.replace(/\"/g, '\\"');
            }
            option = input.querySelector('option[value="' + value + '"]');
          }
          if (option == null) {
            input.value = ''; // TODO make configurable?
            input.selectedIndex = -1;
          } else {
            option.selected = true;
          }
        } else {
          if (range == null) {
            input.classList.remove('ql-active');
          } else if (input.hasAttribute('value')) {
            // both being null should match (default values)
            // '1' should match with 1 (headers)
            var isActive = formats[format] === input.getAttribute('value') || formats[format] != null && formats[format].toString() === input.getAttribute('value') || formats[format] == null && !input.getAttribute('value');
            input.classList.toggle('ql-active', isActive);
          } else {
            input.classList.toggle('ql-active', formats[format] != null);
          }
        }
      });
    }
  }]);

  return Toolbar;
}(_module2.default);

Toolbar.DEFAULTS = {};

function addButton(container, format, value) {
  var input = document.createElement('button');
  input.setAttribute('type', 'button');
  input.classList.add('ql-' + format);
  if (value != null) {
    input.value = value;
  }
  container.appendChild(input);
}

function addControls(container, groups) {
  if (!Array.isArray(groups[0])) {
    groups = [groups];
  }
  groups.forEach(function (controls) {
    var group = document.createElement('span');
    group.classList.add('ql-formats');
    controls.forEach(function (control) {
      if (typeof control === 'string') {
        addButton(group, control);
      } else {
        var format = Object.keys(control)[0];
        var value = control[format];
        if (Array.isArray(value)) {
          addSelect(group, format, value);
        } else {
          addButton(group, format, value);
        }
      }
    });
    container.appendChild(group);
  });
}

function addSelect(container, format, values) {
  var input = document.createElement('select');
  input.classList.add('ql-' + format);
  values.forEach(function (value) {
    var option = document.createElement('option');
    if (value !== false) {
      option.setAttribute('value', value);
    } else {
      option.setAttribute('selected', 'selected');
    }
    input.appendChild(option);
  });
  container.appendChild(input);
}

Toolbar.DEFAULTS = {
  container: null,
  handlers: {
    clean: function clean() {
      var _this3 = this;

      var range = this.quill.getSelection();
      if (range == null) return;
      if (range.length == 0) {
        var formats = this.quill.getFormat();
        Object.keys(formats).forEach(function (name) {
          // Clean functionality in existing apps only clean inline formats
          if (_parchment2.default.query(name, _parchment2.default.Scope.INLINE) != null) {
            _this3.quill.format(name, false);
          }
        });
      } else {
        this.quill.removeFormat(range, _quill2.default.sources.USER);
      }
    },
    direction: function direction(value) {
      var align = this.quill.getFormat()['align'];
      if (value === 'rtl' && align == null) {
        this.quill.format('align', 'right', _quill2.default.sources.USER);
      } else if (!value && align === 'right') {
        this.quill.format('align', false, _quill2.default.sources.USER);
      }
      this.quill.format('direction', value, _quill2.default.sources.USER);
    },
    indent: function indent(value) {
      var range = this.quill.getSelection();
      var formats = this.quill.getFormat(range);
      var indent = parseInt(formats.indent || 0);
      if (value === '+1' || value === '-1') {
        var modifier = value === '+1' ? 1 : -1;
        if (formats.direction === 'rtl') modifier *= -1;
        this.quill.format('indent', indent + modifier, _quill2.default.sources.USER);
      }
    },
    link: function link(value) {
      if (value === true) {
        value = prompt('Enter link URL:');
      }
      this.quill.format('link', value, _quill2.default.sources.USER);
    },
    list: function list(value) {
      var range = this.quill.getSelection();
      var formats = this.quill.getFormat(range);
      if (value === 'check') {
        if (formats['list'] === 'checked' || formats['list'] === 'unchecked') {
          this.quill.format('list', false, _quill2.default.sources.USER);
        } else {
          this.quill.format('list', 'unchecked', _quill2.default.sources.USER);
        }
      } else {
        this.quill.format('list', value, _quill2.default.sources.USER);
      }
    }
  }
};

exports.default = Toolbar;
exports.addControls = addControls;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <polyline class=\"ql-even ql-stroke\" points=\"5 7 3 9 5 11\"></polyline> <polyline class=\"ql-even ql-stroke\" points=\"13 7 15 9 13 11\"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>";

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _picker = __webpack_require__(28);

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_Picker) {
  _inherits(ColorPicker, _Picker);

  function ColorPicker(select, label) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, select));

    _this.label.innerHTML = label;
    _this.container.classList.add('ql-color-picker');
    [].slice.call(_this.container.querySelectorAll('.ql-picker-item'), 0, 7).forEach(function (item) {
      item.classList.add('ql-primary');
    });
    return _this;
  }

  _createClass(ColorPicker, [{
    key: 'buildItem',
    value: function buildItem(option) {
      var item = _get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'buildItem', this).call(this, option);
      item.style.backgroundColor = option.getAttribute('value') || '';
      return item;
    }
  }, {
    key: 'selectItem',
    value: function selectItem(item, trigger) {
      _get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'selectItem', this).call(this, item, trigger);
      var colorLabel = this.label.querySelector('.ql-color-label');
      var value = item ? item.getAttribute('data-value') || '' : '';
      if (colorLabel) {
        if (colorLabel.tagName === 'line') {
          colorLabel.style.stroke = value;
        } else {
          colorLabel.style.fill = value;
        }
      }
    }
  }]);

  return ColorPicker;
}(_picker2.default);

exports.default = ColorPicker;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _picker = __webpack_require__(28);

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconPicker = function (_Picker) {
  _inherits(IconPicker, _Picker);

  function IconPicker(select, icons) {
    _classCallCheck(this, IconPicker);

    var _this = _possibleConstructorReturn(this, (IconPicker.__proto__ || Object.getPrototypeOf(IconPicker)).call(this, select));

    _this.container.classList.add('ql-icon-picker');
    [].forEach.call(_this.container.querySelectorAll('.ql-picker-item'), function (item) {
      item.innerHTML = icons[item.getAttribute('data-value') || ''];
    });
    _this.defaultItem = _this.container.querySelector('.ql-selected');
    _this.selectItem(_this.defaultItem);
    return _this;
  }

  _createClass(IconPicker, [{
    key: 'selectItem',
    value: function selectItem(item, trigger) {
      _get(IconPicker.prototype.__proto__ || Object.getPrototypeOf(IconPicker.prototype), 'selectItem', this).call(this, item, trigger);
      item = item || this.defaultItem;
      this.label.innerHTML = item.innerHTML;
    }
  }]);

  return IconPicker;
}(_picker2.default);

exports.default = IconPicker;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tooltip = function () {
  function Tooltip(quill, boundsContainer) {
    var _this = this;

    _classCallCheck(this, Tooltip);

    this.quill = quill;
    this.boundsContainer = boundsContainer || document.body;
    this.root = quill.addContainer('ql-tooltip');
    this.root.innerHTML = this.constructor.TEMPLATE;
    if (this.quill.root === this.quill.scrollingContainer) {
      this.quill.root.addEventListener('scroll', function () {
        _this.root.style.marginTop = -1 * _this.quill.root.scrollTop + 'px';
      });
    }
    this.hide();
  }

  _createClass(Tooltip, [{
    key: 'hide',
    value: function hide() {
      this.root.classList.add('ql-hidden');
    }
  }, {
    key: 'position',
    value: function position(reference) {
      var left = reference.left + reference.width / 2 - this.root.offsetWidth / 2;
      // root.scrollTop should be 0 if scrollContainer !== root
      var top = reference.bottom + this.quill.root.scrollTop;
      this.root.style.left = left + 'px';
      this.root.style.top = top + 'px';
      this.root.classList.remove('ql-flip');
      var containerBounds = this.boundsContainer.getBoundingClientRect();
      var rootBounds = this.root.getBoundingClientRect();
      var shift = 0;
      if (rootBounds.right > containerBounds.right) {
        shift = containerBounds.right - rootBounds.right;
        this.root.style.left = left + shift + 'px';
      }
      if (rootBounds.left < containerBounds.left) {
        shift = containerBounds.left - rootBounds.left;
        this.root.style.left = left + shift + 'px';
      }
      if (rootBounds.bottom > containerBounds.bottom) {
        var height = rootBounds.bottom - rootBounds.top;
        var verticalShift = reference.bottom - reference.top + height;
        this.root.style.top = top - verticalShift + 'px';
        this.root.classList.add('ql-flip');
      }
      return shift;
    }
  }, {
    key: 'show',
    value: function show() {
      this.root.classList.remove('ql-editing');
      this.root.classList.remove('ql-hidden');
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _emitter = __webpack_require__(8);

var _emitter2 = _interopRequireDefault(_emitter);

var _base = __webpack_require__(43);

var _base2 = _interopRequireDefault(_base);

var _link = __webpack_require__(27);

var _link2 = _interopRequireDefault(_link);

var _selection = __webpack_require__(15);

var _icons = __webpack_require__(41);

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TOOLBAR_CONFIG = [[{ header: ['1', '2', '3', false] }], ['bold', 'italic', 'underline', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']];

var SnowTheme = function (_BaseTheme) {
  _inherits(SnowTheme, _BaseTheme);

  function SnowTheme(quill, options) {
    _classCallCheck(this, SnowTheme);

    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
      options.modules.toolbar.container = TOOLBAR_CONFIG;
    }

    var _this = _possibleConstructorReturn(this, (SnowTheme.__proto__ || Object.getPrototypeOf(SnowTheme)).call(this, quill, options));

    _this.quill.container.classList.add('ql-snow');
    return _this;
  }

  _createClass(SnowTheme, [{
    key: 'extendToolbar',
    value: function extendToolbar(toolbar) {
      toolbar.container.classList.add('ql-snow');
      this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), _icons2.default);
      this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), _icons2.default);
      this.tooltip = new SnowTooltip(this.quill, this.options.bounds);
      if (toolbar.container.querySelector('.ql-link')) {
        this.quill.keyboard.addBinding({ key: 'K', shortKey: true }, function (range, context) {
          toolbar.handlers['link'].call(toolbar, !context.format.link);
        });
      }
    }
  }]);

  return SnowTheme;
}(_base2.default);

SnowTheme.DEFAULTS = (0, _extend2.default)(true, {}, _base2.default.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link: function link(value) {
          if (value) {
            var range = this.quill.getSelection();
            if (range == null || range.length == 0) return;
            var preview = this.quill.getText(range);
            if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
              preview = 'mailto:' + preview;
            }
            var tooltip = this.quill.theme.tooltip;
            tooltip.edit('link', preview);
          } else {
            this.quill.format('link', false);
          }
        }
      }
    }
  }
});

var SnowTooltip = function (_BaseTooltip) {
  _inherits(SnowTooltip, _BaseTooltip);

  function SnowTooltip(quill, bounds) {
    _classCallCheck(this, SnowTooltip);

    var _this2 = _possibleConstructorReturn(this, (SnowTooltip.__proto__ || Object.getPrototypeOf(SnowTooltip)).call(this, quill, bounds));

    _this2.preview = _this2.root.querySelector('a.ql-preview');
    return _this2;
  }

  _createClass(SnowTooltip, [{
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      _get(SnowTooltip.prototype.__proto__ || Object.getPrototypeOf(SnowTooltip.prototype), 'listen', this).call(this);
      this.root.querySelector('a.ql-action').addEventListener('click', function (event) {
        if (_this3.root.classList.contains('ql-editing')) {
          _this3.save();
        } else {
          _this3.edit('link', _this3.preview.textContent);
        }
        event.preventDefault();
      });
      this.root.querySelector('a.ql-remove').addEventListener('click', function (event) {
        if (_this3.linkRange != null) {
          var range = _this3.linkRange;
          _this3.restoreFocus();
          _this3.quill.formatText(range, 'link', false, _emitter2.default.sources.USER);
          delete _this3.linkRange;
        }
        event.preventDefault();
        _this3.hide();
      });
      this.quill.on(_emitter2.default.events.SELECTION_CHANGE, function (range, oldRange, source) {
        if (range == null) return;
        if (range.length === 0 && source === _emitter2.default.sources.USER) {
          var _quill$scroll$descend = _this3.quill.scroll.descendant(_link2.default, range.index),
              _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 2),
              link = _quill$scroll$descend2[0],
              offset = _quill$scroll$descend2[1];

          if (link != null) {
            _this3.linkRange = new _selection.Range(range.index - offset, link.length());
            var preview = _link2.default.formats(link.domNode);
            _this3.preview.textContent = preview;
            _this3.preview.setAttribute('href', preview);
            _this3.show();
            _this3.position(_this3.quill.getBounds(_this3.linkRange));
            return;
          }
        } else {
          delete _this3.linkRange;
        }
        _this3.hide();
      });
    }
  }, {
    key: 'show',
    value: function show() {
      _get(SnowTooltip.prototype.__proto__ || Object.getPrototypeOf(SnowTooltip.prototype), 'show', this).call(this);
      this.root.removeAttribute('data-mode');
    }
  }]);

  return SnowTooltip;
}(_base.BaseTooltip);

SnowTooltip.TEMPLATE = ['<a class="ql-preview" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join('');

exports.default = SnowTheme;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(29);

var _core2 = _interopRequireDefault(_core);

var _align = __webpack_require__(36);

var _direction = __webpack_require__(38);

var _indent = __webpack_require__(64);

var _blockquote = __webpack_require__(65);

var _blockquote2 = _interopRequireDefault(_blockquote);

var _header = __webpack_require__(66);

var _header2 = _interopRequireDefault(_header);

var _list = __webpack_require__(67);

var _list2 = _interopRequireDefault(_list);

var _background = __webpack_require__(37);

var _color = __webpack_require__(26);

var _font = __webpack_require__(39);

var _size = __webpack_require__(40);

var _bold = __webpack_require__(56);

var _bold2 = _interopRequireDefault(_bold);

var _italic = __webpack_require__(68);

var _italic2 = _interopRequireDefault(_italic);

var _link = __webpack_require__(27);

var _link2 = _interopRequireDefault(_link);

var _script = __webpack_require__(69);

var _script2 = _interopRequireDefault(_script);

var _strike = __webpack_require__(70);

var _strike2 = _interopRequireDefault(_strike);

var _underline = __webpack_require__(71);

var _underline2 = _interopRequireDefault(_underline);

var _image = __webpack_require__(72);

var _image2 = _interopRequireDefault(_image);

var _video = __webpack_require__(73);

var _video2 = _interopRequireDefault(_video);

var _code = __webpack_require__(13);

var _code2 = _interopRequireDefault(_code);

var _formula = __webpack_require__(74);

var _formula2 = _interopRequireDefault(_formula);

var _syntax = __webpack_require__(75);

var _syntax2 = _interopRequireDefault(_syntax);

var _toolbar = __webpack_require__(57);

var _toolbar2 = _interopRequireDefault(_toolbar);

var _icons = __webpack_require__(41);

var _icons2 = _interopRequireDefault(_icons);

var _picker = __webpack_require__(28);

var _picker2 = _interopRequireDefault(_picker);

var _colorPicker = __webpack_require__(59);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _iconPicker = __webpack_require__(60);

var _iconPicker2 = _interopRequireDefault(_iconPicker);

var _tooltip = __webpack_require__(61);

var _tooltip2 = _interopRequireDefault(_tooltip);

var _bubble = __webpack_require__(108);

var _bubble2 = _interopRequireDefault(_bubble);

var _snow = __webpack_require__(62);

var _snow2 = _interopRequireDefault(_snow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_core2.default.register({
  'attributors/attribute/direction': _direction.DirectionAttribute,

  'attributors/class/align': _align.AlignClass,
  'attributors/class/background': _background.BackgroundClass,
  'attributors/class/color': _color.ColorClass,
  'attributors/class/direction': _direction.DirectionClass,
  'attributors/class/font': _font.FontClass,
  'attributors/class/size': _size.SizeClass,

  'attributors/style/align': _align.AlignStyle,
  'attributors/style/background': _background.BackgroundStyle,
  'attributors/style/color': _color.ColorStyle,
  'attributors/style/direction': _direction.DirectionStyle,
  'attributors/style/font': _font.FontStyle,
  'attributors/style/size': _size.SizeStyle
}, true);

_core2.default.register({
  'formats/align': _align.AlignClass,
  'formats/direction': _direction.DirectionClass,
  'formats/indent': _indent.IndentClass,

  'formats/background': _background.BackgroundStyle,
  'formats/color': _color.ColorStyle,
  'formats/font': _font.FontClass,
  'formats/size': _size.SizeClass,

  'formats/blockquote': _blockquote2.default,
  'formats/code-block': _code2.default,
  'formats/header': _header2.default,
  'formats/list': _list2.default,

  'formats/bold': _bold2.default,
  'formats/code': _code.Code,
  'formats/italic': _italic2.default,
  'formats/link': _link2.default,
  'formats/script': _script2.default,
  'formats/strike': _strike2.default,
  'formats/underline': _underline2.default,

  'formats/image': _image2.default,
  'formats/video': _video2.default,

  'formats/list/item': _list.ListItem,

  'modules/formula': _formula2.default,
  'modules/syntax': _syntax2.default,
  'modules/toolbar': _toolbar2.default,

  'themes/bubble': _bubble2.default,
  'themes/snow': _snow2.default,

  'ui/icons': _icons2.default,
  'ui/picker': _picker2.default,
  'ui/icon-picker': _iconPicker2.default,
  'ui/color-picker': _colorPicker2.default,
  'ui/tooltip': _tooltip2.default
}, true);

exports.default = _core2.default;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndentClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IdentAttributor = function (_Parchment$Attributor) {
  _inherits(IdentAttributor, _Parchment$Attributor);

  function IdentAttributor() {
    _classCallCheck(this, IdentAttributor);

    return _possibleConstructorReturn(this, (IdentAttributor.__proto__ || Object.getPrototypeOf(IdentAttributor)).apply(this, arguments));
  }

  _createClass(IdentAttributor, [{
    key: 'add',
    value: function add(node, value) {
      if (value === '+1' || value === '-1') {
        var indent = this.value(node) || 0;
        value = value === '+1' ? indent + 1 : indent - 1;
      }
      if (value === 0) {
        this.remove(node);
        return true;
      } else {
        return _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'add', this).call(this, node, value);
      }
    }
  }, {
    key: 'canAdd',
    value: function canAdd(node, value) {
      return _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'canAdd', this).call(this, node, value) || _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'canAdd', this).call(this, node, parseInt(value));
    }
  }, {
    key: 'value',
    value: function value(node) {
      return parseInt(_get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'value', this).call(this, node)) || undefined; // Don't return NaN
    }
  }]);

  return IdentAttributor;
}(_parchment2.default.Attributor.Class);

var IndentClass = new IdentAttributor('indent', 'ql-indent', {
  scope: _parchment2.default.Scope.BLOCK,
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});

exports.IndentClass = IndentClass;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Blockquote = function (_Block) {
  _inherits(Blockquote, _Block);

  function Blockquote() {
    _classCallCheck(this, Blockquote);

    return _possibleConstructorReturn(this, (Blockquote.__proto__ || Object.getPrototypeOf(Blockquote)).apply(this, arguments));
  }

  return Blockquote;
}(_block2.default);

Blockquote.blotName = 'blockquote';
Blockquote.tagName = 'blockquote';

exports.default = Blockquote;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Block) {
  _inherits(Header, _Block);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, null, [{
    key: 'formats',
    value: function formats(domNode) {
      return this.tagName.indexOf(domNode.tagName) + 1;
    }
  }]);

  return Header;
}(_block2.default);

Header.blotName = 'header';
Header.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

exports.default = Header;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

var _container = __webpack_require__(24);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_Block) {
  _inherits(ListItem, _Block);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: 'format',
    value: function format(name, value) {
      if (name === List.blotName && !value) {
        this.replaceWith(_parchment2.default.create(this.statics.scope));
      } else {
        _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'format', this).call(this, name, value);
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (this.prev == null && this.next == null) {
        this.parent.remove();
      } else {
        _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'remove', this).call(this);
      }
    }
  }, {
    key: 'replaceWith',
    value: function replaceWith(name, value) {
      this.parent.isolate(this.offset(this.parent), this.length());
      if (name === this.parent.statics.blotName) {
        this.parent.replaceWith(name, value);
        return this;
      } else {
        this.parent.unwrap();
        return _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'replaceWith', this).call(this, name, value);
      }
    }
  }], [{
    key: 'formats',
    value: function formats(domNode) {
      return domNode.tagName === this.tagName ? undefined : _get(ListItem.__proto__ || Object.getPrototypeOf(ListItem), 'formats', this).call(this, domNode);
    }
  }]);

  return ListItem;
}(_block2.default);

ListItem.blotName = 'list-item';
ListItem.tagName = 'LI';

var List = function (_Container) {
  _inherits(List, _Container);

  _createClass(List, null, [{
    key: 'create',
    value: function create(value) {
      var tagName = value === 'ordered' ? 'OL' : 'UL';
      var node = _get(List.__proto__ || Object.getPrototypeOf(List), 'create', this).call(this, tagName);
      if (value === 'checked' || value === 'unchecked') {
        node.setAttribute('data-checked', value === 'checked');
      }
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      if (domNode.tagName === 'OL') return 'ordered';
      if (domNode.tagName === 'UL') {
        if (domNode.hasAttribute('data-checked')) {
          return domNode.getAttribute('data-checked') === 'true' ? 'checked' : 'unchecked';
        } else {
          return 'bullet';
        }
      }
      return undefined;
    }
  }]);

  function List(domNode) {
    _classCallCheck(this, List);

    var _this2 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, domNode));

    var listEventHandler = function listEventHandler(e) {
      if (e.target.parentNode !== domNode) return;
      var format = _this2.statics.formats(domNode);
      var blot = _parchment2.default.find(e.target);
      if (format === 'checked') {
        blot.format('list', 'unchecked');
      } else if (format === 'unchecked') {
        blot.format('list', 'checked');
      }
    };

    domNode.addEventListener('touchstart', listEventHandler);
    domNode.addEventListener('mousedown', listEventHandler);
    return _this2;
  }

  _createClass(List, [{
    key: 'format',
    value: function format(name, value) {
      if (this.children.length > 0) {
        this.children.tail.format(name, value);
      }
    }
  }, {
    key: 'formats',
    value: function formats() {
      // We don't inherit from FormatBlot
      return _defineProperty({}, this.statics.blotName, this.statics.formats(this.domNode));
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(blot, ref) {
      if (blot instanceof ListItem) {
        _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'insertBefore', this).call(this, blot, ref);
      } else {
        var index = ref == null ? this.length() : ref.offset(this);
        var after = this.split(index);
        after.parent.insertBefore(blot, after);
      }
    }
  }, {
    key: 'optimize',
    value: function optimize(context) {
      _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'optimize', this).call(this, context);
      var next = this.next;
      if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && next.domNode.getAttribute('data-checked') === this.domNode.getAttribute('data-checked')) {
        next.moveChildren(this);
        next.remove();
      }
    }
  }, {
    key: 'replace',
    value: function replace(target) {
      if (target.statics.blotName !== this.statics.blotName) {
        var item = _parchment2.default.create(this.statics.defaultChild);
        target.moveChildren(item);
        this.appendChild(item);
      }
      _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'replace', this).call(this, target);
    }
  }]);

  return List;
}(_container2.default);

List.blotName = 'list';
List.scope = _parchment2.default.Scope.BLOCK_BLOT;
List.tagName = ['OL', 'UL'];
List.defaultChild = 'list-item';
List.allowedChildren = [ListItem];

exports.ListItem = ListItem;
exports.default = List;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bold = __webpack_require__(56);

var _bold2 = _interopRequireDefault(_bold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Italic = function (_Bold) {
  _inherits(Italic, _Bold);

  function Italic() {
    _classCallCheck(this, Italic);

    return _possibleConstructorReturn(this, (Italic.__proto__ || Object.getPrototypeOf(Italic)).apply(this, arguments));
  }

  return Italic;
}(_bold2.default);

Italic.blotName = 'italic';
Italic.tagName = ['EM', 'I'];

exports.default = Italic;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Script = function (_Inline) {
  _inherits(Script, _Inline);

  function Script() {
    _classCallCheck(this, Script);

    return _possibleConstructorReturn(this, (Script.__proto__ || Object.getPrototypeOf(Script)).apply(this, arguments));
  }

  _createClass(Script, null, [{
    key: 'create',
    value: function create(value) {
      if (value === 'super') {
        return document.createElement('sup');
      } else if (value === 'sub') {
        return document.createElement('sub');
      } else {
        return _get(Script.__proto__ || Object.getPrototypeOf(Script), 'create', this).call(this, value);
      }
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      if (domNode.tagName === 'SUB') return 'sub';
      if (domNode.tagName === 'SUP') return 'super';
      return undefined;
    }
  }]);

  return Script;
}(_inline2.default);

Script.blotName = 'script';
Script.tagName = ['SUB', 'SUP'];

exports.default = Script;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Strike = function (_Inline) {
  _inherits(Strike, _Inline);

  function Strike() {
    _classCallCheck(this, Strike);

    return _possibleConstructorReturn(this, (Strike.__proto__ || Object.getPrototypeOf(Strike)).apply(this, arguments));
  }

  return Strike;
}(_inline2.default);

Strike.blotName = 'strike';
Strike.tagName = 'S';

exports.default = Strike;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Underline = function (_Inline) {
  _inherits(Underline, _Inline);

  function Underline() {
    _classCallCheck(this, Underline);

    return _possibleConstructorReturn(this, (Underline.__proto__ || Object.getPrototypeOf(Underline)).apply(this, arguments));
  }

  return Underline;
}(_inline2.default);

Underline.blotName = 'underline';
Underline.tagName = 'U';

exports.default = Underline;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _link = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ATTRIBUTES = ['alt', 'height', 'width'];

var Image = function (_Parchment$Embed) {
  _inherits(Image, _Parchment$Embed);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'format',
    value: function format(name, value) {
      if (ATTRIBUTES.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        _get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), 'format', this).call(this, name, value);
      }
    }
  }], [{
    key: 'create',
    value: function create(value) {
      var node = _get(Image.__proto__ || Object.getPrototypeOf(Image), 'create', this).call(this, value);
      if (typeof value === 'string') {
        node.setAttribute('src', this.sanitize(value));
      }
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      return ATTRIBUTES.reduce(function (formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      }, {});
    }
  }, {
    key: 'match',
    value: function match(url) {
      return (/\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url)
      );
    }
  }, {
    key: 'sanitize',
    value: function sanitize(url) {
      return (0, _link.sanitize)(url, ['http', 'https', 'data']) ? url : '//:0';
    }
  }, {
    key: 'value',
    value: function value(domNode) {
      return domNode.getAttribute('src');
    }
  }]);

  return Image;
}(_parchment2.default.Embed);

Image.blotName = 'image';
Image.tagName = 'IMG';

exports.default = Image;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _block = __webpack_require__(4);

var _link = __webpack_require__(27);

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ATTRIBUTES = ['height', 'width'];

var Video = function (_BlockEmbed) {
  _inherits(Video, _BlockEmbed);

  function Video() {
    _classCallCheck(this, Video);

    return _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).apply(this, arguments));
  }

  _createClass(Video, [{
    key: 'format',
    value: function format(name, value) {
      if (ATTRIBUTES.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        _get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'format', this).call(this, name, value);
      }
    }
  }], [{
    key: 'create',
    value: function create(value) {
      var node = _get(Video.__proto__ || Object.getPrototypeOf(Video), 'create', this).call(this, value);
      node.setAttribute('frameborder', '0');
      node.setAttribute('allowfullscreen', true);
      node.setAttribute('src', this.sanitize(value));
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      return ATTRIBUTES.reduce(function (formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      }, {});
    }
  }, {
    key: 'sanitize',
    value: function sanitize(url) {
      return _link2.default.sanitize(url);
    }
  }, {
    key: 'value',
    value: function value(domNode) {
      return domNode.getAttribute('src');
    }
  }]);

  return Video;
}(_block.BlockEmbed);

Video.blotName = 'video';
Video.className = 'ql-video';
Video.tagName = 'IFRAME';

exports.default = Video;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormulaBlot = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _embed = __webpack_require__(25);

var _embed2 = _interopRequireDefault(_embed);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormulaBlot = function (_Embed) {
  _inherits(FormulaBlot, _Embed);

  function FormulaBlot() {
    _classCallCheck(this, FormulaBlot);

    return _possibleConstructorReturn(this, (FormulaBlot.__proto__ || Object.getPrototypeOf(FormulaBlot)).apply(this, arguments));
  }

  _createClass(FormulaBlot, null, [{
    key: 'create',
    value: function create(value) {
      var node = _get(FormulaBlot.__proto__ || Object.getPrototypeOf(FormulaBlot), 'create', this).call(this, value);
      if (typeof value === 'string') {
        window.katex.render(value, node, {
          throwOnError: false,
          errorColor: '#f00'
        });
        node.setAttribute('data-value', value);
      }
      return node;
    }
  }, {
    key: 'value',
    value: function value(domNode) {
      return domNode.getAttribute('data-value');
    }
  }]);

  return FormulaBlot;
}(_embed2.default);

FormulaBlot.blotName = 'formula';
FormulaBlot.className = 'ql-formula';
FormulaBlot.tagName = 'SPAN';

var Formula = function (_Module) {
  _inherits(Formula, _Module);

  _createClass(Formula, null, [{
    key: 'register',
    value: function register() {
      _quill2.default.register(FormulaBlot, true);
    }
  }]);

  function Formula() {
    _classCallCheck(this, Formula);

    var _this2 = _possibleConstructorReturn(this, (Formula.__proto__ || Object.getPrototypeOf(Formula)).call(this));

    if (window.katex == null) {
      throw new Error('Formula module requires KaTeX.');
    }
    return _this2;
  }

  return Formula;
}(_module2.default);

exports.FormulaBlot = FormulaBlot;
exports.default = Formula;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CodeToken = exports.CodeBlock = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

var _code = __webpack_require__(13);

var _code2 = _interopRequireDefault(_code);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SyntaxCodeBlock = function (_CodeBlock) {
  _inherits(SyntaxCodeBlock, _CodeBlock);

  function SyntaxCodeBlock() {
    _classCallCheck(this, SyntaxCodeBlock);

    return _possibleConstructorReturn(this, (SyntaxCodeBlock.__proto__ || Object.getPrototypeOf(SyntaxCodeBlock)).apply(this, arguments));
  }

  _createClass(SyntaxCodeBlock, [{
    key: 'replaceWith',
    value: function replaceWith(block) {
      this.domNode.textContent = this.domNode.textContent;
      this.attach();
      _get(SyntaxCodeBlock.prototype.__proto__ || Object.getPrototypeOf(SyntaxCodeBlock.prototype), 'replaceWith', this).call(this, block);
    }
  }, {
    key: 'highlight',
    value: function highlight(_highlight) {
      var text = this.domNode.textContent;
      if (this.cachedText !== text) {
        if (text.trim().length > 0 || this.cachedText == null) {
          this.domNode.innerHTML = _highlight(text);
          this.domNode.normalize();
          this.attach();
        }
        this.cachedText = text;
      }
    }
  }]);

  return SyntaxCodeBlock;
}(_code2.default);

SyntaxCodeBlock.className = 'ql-syntax';

var CodeToken = new _parchment2.default.Attributor.Class('token', 'hljs', {
  scope: _parchment2.default.Scope.INLINE
});

var Syntax = function (_Module) {
  _inherits(Syntax, _Module);

  _createClass(Syntax, null, [{
    key: 'register',
    value: function register() {
      _quill2.default.register(CodeToken, true);
      _quill2.default.register(SyntaxCodeBlock, true);
    }
  }]);

  function Syntax(quill, options) {
    _classCallCheck(this, Syntax);

    var _this2 = _possibleConstructorReturn(this, (Syntax.__proto__ || Object.getPrototypeOf(Syntax)).call(this, quill, options));

    if (typeof _this2.options.highlight !== 'function') {
      throw new Error('Syntax module requires highlight.js. Please include the library on the page before Quill.');
    }
    var timer = null;
    _this2.quill.on(_quill2.default.events.SCROLL_OPTIMIZE, function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        _this2.highlight();
        timer = null;
      }, _this2.options.interval);
    });
    _this2.highlight();
    return _this2;
  }

  _createClass(Syntax, [{
    key: 'highlight',
    value: function highlight() {
      var _this3 = this;

      if (this.quill.selection.composing) return;
      this.quill.update(_quill2.default.sources.USER);
      var range = this.quill.getSelection();
      this.quill.scroll.descendants(SyntaxCodeBlock).forEach(function (code) {
        code.highlight(_this3.options.highlight);
      });
      this.quill.update(_quill2.default.sources.SILENT);
      if (range != null) {
        this.quill.setSelection(range, _quill2.default.sources.SILENT);
      }
    }
  }]);

  return Syntax;
}(_module2.default);

Syntax.DEFAULTS = {
  highlight: function () {
    if (window.hljs == null) return null;
    return function (text) {
      var result = window.hljs.highlightAuto(text);
      return result.value;
    };
  }(),
  interval: 1000
};

exports.CodeBlock = SyntaxCodeBlock;
exports.CodeToken = CodeToken;
exports.default = Syntax;

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>";

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>";

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>";

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>";

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <g class=\"ql-fill ql-color-label\"> <polygon points=\"6 6.868 6 6 5 6 5 7 5.942 7 6 6.868\"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points=\"6.817 5 6 5 6 6 6.38 6 6.817 5\"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points=\"4 11.439 4 11 3 11 3 12 3.755 12 4 11.439\"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points=\"4.63 10 4 10 4 11 4.192 11 4.63 10\"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points=\"13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174\"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points=\"12 6.868 12 6 11.62 6 12 6.868\"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points=\"12.933 9 13 9 13 8 12.495 8 12.933 9\"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points=\"5.5 13 9 5 12.5 13\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>";

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=\"ql-fill ql-stroke\" height=3 width=3 x=4 y=5></rect> <rect class=\"ql-fill ql-stroke\" height=3 width=3 x=11 y=5></rect> <path class=\"ql-even ql-fill ql-stroke\" d=M7,8c0,4.031-3,5-3,5></path> <path class=\"ql-even ql-fill ql-stroke\" d=M14,8c0,4.031-3,5-3,5></path> </svg>";

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>";

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = "<svg class=\"\" viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>";

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=\"ql-color-label ql-stroke ql-transparent\" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points=\"5.5 11 9 3 12.5 11\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>";

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=\"ql-stroke ql-fill\" points=\"3 11 5 9 3 7 3 11\"></polygon> <line class=\"ql-stroke ql-fill\" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>";

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=\"ql-stroke ql-fill\" points=\"15 12 13 10 15 8 15 12\"></polygon> <line class=\"ql-stroke ql-fill\" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>";

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>";

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>";

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>";

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform=\"translate(24 18) rotate(-180)\"/> </svg>";

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>";

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 18 18\"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>";

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 18 18\"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>";

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>";

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class=\"ql-even ql-fill\" points=\"5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12\"></polyline> </svg>";

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=\"ql-fill ql-stroke\" points=\"3 7 3 11 5 9 3 7\"></polyline> </svg>";

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\"5 7 5 11 3 9 5 7\"></polyline> </svg>";

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class=\"ql-even ql-stroke\" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class=\"ql-even ql-stroke\" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>";

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class=\"ql-stroke ql-thin\" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class=\"ql-stroke ql-thin\" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class=\"ql-stroke ql-thin\" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>";

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>";

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = "<svg class=\"\" viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points=\"3 4 4 5 6 3\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points=\"3 14 4 15 6 13\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\"3 9 4 10 6 8\"></polyline> </svg>";

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>";

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>";

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=\"ql-stroke ql-thin\" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>";

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>";

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>";

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=ql-stroke points=\"7 11 9 13 11 11 7 11\"></polygon> <polygon class=ql-stroke points=\"7 7 9 5 11 7 7 7\"></polygon> </svg>";

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BubbleTooltip = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _emitter = __webpack_require__(8);

var _emitter2 = _interopRequireDefault(_emitter);

var _base = __webpack_require__(43);

var _base2 = _interopRequireDefault(_base);

var _selection = __webpack_require__(15);

var _icons = __webpack_require__(41);

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TOOLBAR_CONFIG = [['bold', 'italic', 'link'], [{ header: 1 }, { header: 2 }, 'blockquote']];

var BubbleTheme = function (_BaseTheme) {
  _inherits(BubbleTheme, _BaseTheme);

  function BubbleTheme(quill, options) {
    _classCallCheck(this, BubbleTheme);

    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
      options.modules.toolbar.container = TOOLBAR_CONFIG;
    }

    var _this = _possibleConstructorReturn(this, (BubbleTheme.__proto__ || Object.getPrototypeOf(BubbleTheme)).call(this, quill, options));

    _this.quill.container.classList.add('ql-bubble');
    return _this;
  }

  _createClass(BubbleTheme, [{
    key: 'extendToolbar',
    value: function extendToolbar(toolbar) {
      this.tooltip = new BubbleTooltip(this.quill, this.options.bounds);
      this.tooltip.root.appendChild(toolbar.container);
      this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), _icons2.default);
      this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), _icons2.default);
    }
  }]);

  return BubbleTheme;
}(_base2.default);

BubbleTheme.DEFAULTS = (0, _extend2.default)(true, {}, _base2.default.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link: function link(value) {
          if (!value) {
            this.quill.format('link', false);
          } else {
            this.quill.theme.tooltip.edit();
          }
        }
      }
    }
  }
});

var BubbleTooltip = function (_BaseTooltip) {
  _inherits(BubbleTooltip, _BaseTooltip);

  function BubbleTooltip(quill, bounds) {
    _classCallCheck(this, BubbleTooltip);

    var _this2 = _possibleConstructorReturn(this, (BubbleTooltip.__proto__ || Object.getPrototypeOf(BubbleTooltip)).call(this, quill, bounds));

    _this2.quill.on(_emitter2.default.events.EDITOR_CHANGE, function (type, range, oldRange, source) {
      if (type !== _emitter2.default.events.SELECTION_CHANGE) return;
      if (range != null && range.length > 0 && source === _emitter2.default.sources.USER) {
        _this2.show();
        // Lock our width so we will expand beyond our offsetParent boundaries
        _this2.root.style.left = '0px';
        _this2.root.style.width = '';
        _this2.root.style.width = _this2.root.offsetWidth + 'px';
        var lines = _this2.quill.getLines(range.index, range.length);
        if (lines.length === 1) {
          _this2.position(_this2.quill.getBounds(range));
        } else {
          var lastLine = lines[lines.length - 1];
          var index = _this2.quill.getIndex(lastLine);
          var length = Math.min(lastLine.length() - 1, range.index + range.length - index);
          var _bounds = _this2.quill.getBounds(new _selection.Range(index, length));
          _this2.position(_bounds);
        }
      } else if (document.activeElement !== _this2.textbox && _this2.quill.hasFocus()) {
        _this2.hide();
      }
    });
    return _this2;
  }

  _createClass(BubbleTooltip, [{
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      _get(BubbleTooltip.prototype.__proto__ || Object.getPrototypeOf(BubbleTooltip.prototype), 'listen', this).call(this);
      this.root.querySelector('.ql-close').addEventListener('click', function () {
        _this3.root.classList.remove('ql-editing');
      });
      this.quill.on(_emitter2.default.events.SCROLL_OPTIMIZE, function () {
        // Let selection be restored by toolbar handlers before repositioning
        setTimeout(function () {
          if (_this3.root.classList.contains('ql-hidden')) return;
          var range = _this3.quill.getSelection();
          if (range != null) {
            _this3.position(_this3.quill.getBounds(range));
          }
        }, 1);
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.show();
    }
  }, {
    key: 'position',
    value: function position(reference) {
      var shift = _get(BubbleTooltip.prototype.__proto__ || Object.getPrototypeOf(BubbleTooltip.prototype), 'position', this).call(this, reference);
      var arrow = this.root.querySelector('.ql-tooltip-arrow');
      arrow.style.marginLeft = '';
      if (shift === 0) return shift;
      arrow.style.marginLeft = -1 * shift - arrow.offsetWidth / 2 + 'px';
    }
  }]);

  return BubbleTooltip;
}(_base.BaseTooltip);

BubbleTooltip.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', '</div>'].join('');

exports.BubbleTooltip = BubbleTooltip;
exports.default = BubbleTheme;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(63);


/***/ })
/******/ ])["default"];
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(375).Buffer))

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(376)
var ieee754 = __webpack_require__(377)
var isArray = __webpack_require__(378)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 377 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 378 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(380);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./quill.core.css", function() {
			var newContent = require("!!../../css-loader/index.js!./quill.core.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "/*!\n * Quill Editor v1.3.4\n * https://quilljs.com/\n * Copyright (c) 2014, Jason Chen\n * Copyright (c) 2013, salesforce.com\n */\n.ql-container {\n  box-sizing: border-box;\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: 13px;\n  height: 100%;\n  margin: 0px;\n  position: relative;\n}\n.ql-container.ql-disabled .ql-tooltip {\n  visibility: hidden;\n}\n.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n  pointer-events: none;\n}\n.ql-clipboard {\n  left: -100000px;\n  height: 1px;\n  overflow-y: hidden;\n  position: absolute;\n  top: 50%;\n}\n.ql-clipboard p {\n  margin: 0;\n  padding: 0;\n}\n.ql-editor {\n  box-sizing: border-box;\n  line-height: 1.42;\n  height: 100%;\n  outline: none;\n  overflow-y: auto;\n  padding: 12px 15px;\n  tab-size: 4;\n  -moz-tab-size: 4;\n  text-align: left;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n.ql-editor > * {\n  cursor: text;\n}\n.ql-editor p,\n.ql-editor ol,\n.ql-editor ul,\n.ql-editor pre,\n.ql-editor blockquote,\n.ql-editor h1,\n.ql-editor h2,\n.ql-editor h3,\n.ql-editor h4,\n.ql-editor h5,\n.ql-editor h6 {\n  margin: 0;\n  padding: 0;\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol,\n.ql-editor ul {\n  padding-left: 1.5em;\n}\n.ql-editor ol > li,\n.ql-editor ul > li {\n  list-style-type: none;\n}\n.ql-editor ul > li::before {\n  content: '\\2022';\n}\n.ql-editor ul[data-checked=true],\n.ql-editor ul[data-checked=false] {\n  pointer-events: none;\n}\n.ql-editor ul[data-checked=true] > li *,\n.ql-editor ul[data-checked=false] > li * {\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before,\n.ql-editor ul[data-checked=false] > li::before {\n  color: #777;\n  cursor: pointer;\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before {\n  content: '\\2611';\n}\n.ql-editor ul[data-checked=false] > li::before {\n  content: '\\2610';\n}\n.ql-editor li::before {\n  display: inline-block;\n  white-space: nowrap;\n  width: 1.2em;\n}\n.ql-editor li:not(.ql-direction-rtl)::before {\n  margin-left: -1.5em;\n  margin-right: 0.3em;\n  text-align: right;\n}\n.ql-editor li.ql-direction-rtl::before {\n  margin-left: 0.3em;\n  margin-right: -1.5em;\n}\n.ql-editor ol li:not(.ql-direction-rtl),\n.ql-editor ul li:not(.ql-direction-rtl) {\n  padding-left: 1.5em;\n}\n.ql-editor ol li.ql-direction-rtl,\n.ql-editor ul li.ql-direction-rtl {\n  padding-right: 1.5em;\n}\n.ql-editor ol li {\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  counter-increment: list-0;\n}\n.ql-editor ol li:before {\n  content: counter(list-0, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n  counter-increment: list-1;\n}\n.ql-editor ol li.ql-indent-1:before {\n  content: counter(list-1, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n  counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-2 {\n  counter-increment: list-2;\n}\n.ql-editor ol li.ql-indent-2:before {\n  content: counter(list-2, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-2 {\n  counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-3 {\n  counter-increment: list-3;\n}\n.ql-editor ol li.ql-indent-3:before {\n  content: counter(list-3, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-3 {\n  counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-4 {\n  counter-increment: list-4;\n}\n.ql-editor ol li.ql-indent-4:before {\n  content: counter(list-4, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-4 {\n  counter-reset: list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-5 {\n  counter-increment: list-5;\n}\n.ql-editor ol li.ql-indent-5:before {\n  content: counter(list-5, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-5 {\n  counter-reset: list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-6 {\n  counter-increment: list-6;\n}\n.ql-editor ol li.ql-indent-6:before {\n  content: counter(list-6, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-6 {\n  counter-reset: list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-7 {\n  counter-increment: list-7;\n}\n.ql-editor ol li.ql-indent-7:before {\n  content: counter(list-7, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-7 {\n  counter-reset: list-8 list-9;\n}\n.ql-editor ol li.ql-indent-8 {\n  counter-increment: list-8;\n}\n.ql-editor ol li.ql-indent-8:before {\n  content: counter(list-8, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-8 {\n  counter-reset: list-9;\n}\n.ql-editor ol li.ql-indent-9 {\n  counter-increment: list-9;\n}\n.ql-editor ol li.ql-indent-9:before {\n  content: counter(list-9, decimal) '. ';\n}\n.ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 3em;\n}\n.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 4.5em;\n}\n.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 3em;\n}\n.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 4.5em;\n}\n.ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 6em;\n}\n.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 7.5em;\n}\n.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 6em;\n}\n.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 7.5em;\n}\n.ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 9em;\n}\n.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 10.5em;\n}\n.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 9em;\n}\n.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 10.5em;\n}\n.ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 12em;\n}\n.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 13.5em;\n}\n.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 12em;\n}\n.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 13.5em;\n}\n.ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 15em;\n}\n.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 16.5em;\n}\n.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 15em;\n}\n.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 16.5em;\n}\n.ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 18em;\n}\n.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 19.5em;\n}\n.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 18em;\n}\n.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 19.5em;\n}\n.ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 21em;\n}\n.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 22.5em;\n}\n.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 21em;\n}\n.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 22.5em;\n}\n.ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 24em;\n}\n.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 25.5em;\n}\n.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 24em;\n}\n.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 25.5em;\n}\n.ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 27em;\n}\n.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 28.5em;\n}\n.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 27em;\n}\n.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 28.5em;\n}\n.ql-editor .ql-video {\n  display: block;\n  max-width: 100%;\n}\n.ql-editor .ql-video.ql-align-center {\n  margin: 0 auto;\n}\n.ql-editor .ql-video.ql-align-right {\n  margin: 0 0 0 auto;\n}\n.ql-editor .ql-bg-black {\n  background-color: #000;\n}\n.ql-editor .ql-bg-red {\n  background-color: #e60000;\n}\n.ql-editor .ql-bg-orange {\n  background-color: #f90;\n}\n.ql-editor .ql-bg-yellow {\n  background-color: #ff0;\n}\n.ql-editor .ql-bg-green {\n  background-color: #008a00;\n}\n.ql-editor .ql-bg-blue {\n  background-color: #06c;\n}\n.ql-editor .ql-bg-purple {\n  background-color: #93f;\n}\n.ql-editor .ql-color-white {\n  color: #fff;\n}\n.ql-editor .ql-color-red {\n  color: #e60000;\n}\n.ql-editor .ql-color-orange {\n  color: #f90;\n}\n.ql-editor .ql-color-yellow {\n  color: #ff0;\n}\n.ql-editor .ql-color-green {\n  color: #008a00;\n}\n.ql-editor .ql-color-blue {\n  color: #06c;\n}\n.ql-editor .ql-color-purple {\n  color: #93f;\n}\n.ql-editor .ql-font-serif {\n  font-family: Georgia, Times New Roman, serif;\n}\n.ql-editor .ql-font-monospace {\n  font-family: Monaco, Courier New, monospace;\n}\n.ql-editor .ql-size-small {\n  font-size: 0.75em;\n}\n.ql-editor .ql-size-large {\n  font-size: 1.5em;\n}\n.ql-editor .ql-size-huge {\n  font-size: 2.5em;\n}\n.ql-editor .ql-direction-rtl {\n  direction: rtl;\n  text-align: inherit;\n}\n.ql-editor .ql-align-center {\n  text-align: center;\n}\n.ql-editor .ql-align-justify {\n  text-align: justify;\n}\n.ql-editor .ql-align-right {\n  text-align: right;\n}\n.ql-editor.ql-blank::before {\n  color: rgba(0,0,0,0.6);\n  content: attr(data-placeholder);\n  font-style: italic;\n  left: 15px;\n  pointer-events: none;\n  position: absolute;\n  right: 15px;\n}\n", ""]);

// exports


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(382);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./quill.snow.css", function() {
			var newContent = require("!!../../css-loader/index.js!./quill.snow.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "/*!\n * Quill Editor v1.3.4\n * https://quilljs.com/\n * Copyright (c) 2014, Jason Chen\n * Copyright (c) 2013, salesforce.com\n */\n.ql-container {\n  box-sizing: border-box;\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: 13px;\n  height: 100%;\n  margin: 0px;\n  position: relative;\n}\n.ql-container.ql-disabled .ql-tooltip {\n  visibility: hidden;\n}\n.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n  pointer-events: none;\n}\n.ql-clipboard {\n  left: -100000px;\n  height: 1px;\n  overflow-y: hidden;\n  position: absolute;\n  top: 50%;\n}\n.ql-clipboard p {\n  margin: 0;\n  padding: 0;\n}\n.ql-editor {\n  box-sizing: border-box;\n  line-height: 1.42;\n  height: 100%;\n  outline: none;\n  overflow-y: auto;\n  padding: 12px 15px;\n  tab-size: 4;\n  -moz-tab-size: 4;\n  text-align: left;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n.ql-editor > * {\n  cursor: text;\n}\n.ql-editor p,\n.ql-editor ol,\n.ql-editor ul,\n.ql-editor pre,\n.ql-editor blockquote,\n.ql-editor h1,\n.ql-editor h2,\n.ql-editor h3,\n.ql-editor h4,\n.ql-editor h5,\n.ql-editor h6 {\n  margin: 0;\n  padding: 0;\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol,\n.ql-editor ul {\n  padding-left: 1.5em;\n}\n.ql-editor ol > li,\n.ql-editor ul > li {\n  list-style-type: none;\n}\n.ql-editor ul > li::before {\n  content: '\\2022';\n}\n.ql-editor ul[data-checked=true],\n.ql-editor ul[data-checked=false] {\n  pointer-events: none;\n}\n.ql-editor ul[data-checked=true] > li *,\n.ql-editor ul[data-checked=false] > li * {\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before,\n.ql-editor ul[data-checked=false] > li::before {\n  color: #777;\n  cursor: pointer;\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before {\n  content: '\\2611';\n}\n.ql-editor ul[data-checked=false] > li::before {\n  content: '\\2610';\n}\n.ql-editor li::before {\n  display: inline-block;\n  white-space: nowrap;\n  width: 1.2em;\n}\n.ql-editor li:not(.ql-direction-rtl)::before {\n  margin-left: -1.5em;\n  margin-right: 0.3em;\n  text-align: right;\n}\n.ql-editor li.ql-direction-rtl::before {\n  margin-left: 0.3em;\n  margin-right: -1.5em;\n}\n.ql-editor ol li:not(.ql-direction-rtl),\n.ql-editor ul li:not(.ql-direction-rtl) {\n  padding-left: 1.5em;\n}\n.ql-editor ol li.ql-direction-rtl,\n.ql-editor ul li.ql-direction-rtl {\n  padding-right: 1.5em;\n}\n.ql-editor ol li {\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  counter-increment: list-0;\n}\n.ql-editor ol li:before {\n  content: counter(list-0, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n  counter-increment: list-1;\n}\n.ql-editor ol li.ql-indent-1:before {\n  content: counter(list-1, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n  counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-2 {\n  counter-increment: list-2;\n}\n.ql-editor ol li.ql-indent-2:before {\n  content: counter(list-2, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-2 {\n  counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-3 {\n  counter-increment: list-3;\n}\n.ql-editor ol li.ql-indent-3:before {\n  content: counter(list-3, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-3 {\n  counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-4 {\n  counter-increment: list-4;\n}\n.ql-editor ol li.ql-indent-4:before {\n  content: counter(list-4, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-4 {\n  counter-reset: list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-5 {\n  counter-increment: list-5;\n}\n.ql-editor ol li.ql-indent-5:before {\n  content: counter(list-5, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-5 {\n  counter-reset: list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-6 {\n  counter-increment: list-6;\n}\n.ql-editor ol li.ql-indent-6:before {\n  content: counter(list-6, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-6 {\n  counter-reset: list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-7 {\n  counter-increment: list-7;\n}\n.ql-editor ol li.ql-indent-7:before {\n  content: counter(list-7, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-7 {\n  counter-reset: list-8 list-9;\n}\n.ql-editor ol li.ql-indent-8 {\n  counter-increment: list-8;\n}\n.ql-editor ol li.ql-indent-8:before {\n  content: counter(list-8, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-8 {\n  counter-reset: list-9;\n}\n.ql-editor ol li.ql-indent-9 {\n  counter-increment: list-9;\n}\n.ql-editor ol li.ql-indent-9:before {\n  content: counter(list-9, decimal) '. ';\n}\n.ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 3em;\n}\n.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 4.5em;\n}\n.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 3em;\n}\n.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 4.5em;\n}\n.ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 6em;\n}\n.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 7.5em;\n}\n.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 6em;\n}\n.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 7.5em;\n}\n.ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 9em;\n}\n.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 10.5em;\n}\n.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 9em;\n}\n.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 10.5em;\n}\n.ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 12em;\n}\n.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 13.5em;\n}\n.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 12em;\n}\n.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 13.5em;\n}\n.ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 15em;\n}\n.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 16.5em;\n}\n.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 15em;\n}\n.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 16.5em;\n}\n.ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 18em;\n}\n.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 19.5em;\n}\n.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 18em;\n}\n.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 19.5em;\n}\n.ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 21em;\n}\n.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 22.5em;\n}\n.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 21em;\n}\n.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 22.5em;\n}\n.ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 24em;\n}\n.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 25.5em;\n}\n.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 24em;\n}\n.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 25.5em;\n}\n.ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 27em;\n}\n.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 28.5em;\n}\n.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 27em;\n}\n.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 28.5em;\n}\n.ql-editor .ql-video {\n  display: block;\n  max-width: 100%;\n}\n.ql-editor .ql-video.ql-align-center {\n  margin: 0 auto;\n}\n.ql-editor .ql-video.ql-align-right {\n  margin: 0 0 0 auto;\n}\n.ql-editor .ql-bg-black {\n  background-color: #000;\n}\n.ql-editor .ql-bg-red {\n  background-color: #e60000;\n}\n.ql-editor .ql-bg-orange {\n  background-color: #f90;\n}\n.ql-editor .ql-bg-yellow {\n  background-color: #ff0;\n}\n.ql-editor .ql-bg-green {\n  background-color: #008a00;\n}\n.ql-editor .ql-bg-blue {\n  background-color: #06c;\n}\n.ql-editor .ql-bg-purple {\n  background-color: #93f;\n}\n.ql-editor .ql-color-white {\n  color: #fff;\n}\n.ql-editor .ql-color-red {\n  color: #e60000;\n}\n.ql-editor .ql-color-orange {\n  color: #f90;\n}\n.ql-editor .ql-color-yellow {\n  color: #ff0;\n}\n.ql-editor .ql-color-green {\n  color: #008a00;\n}\n.ql-editor .ql-color-blue {\n  color: #06c;\n}\n.ql-editor .ql-color-purple {\n  color: #93f;\n}\n.ql-editor .ql-font-serif {\n  font-family: Georgia, Times New Roman, serif;\n}\n.ql-editor .ql-font-monospace {\n  font-family: Monaco, Courier New, monospace;\n}\n.ql-editor .ql-size-small {\n  font-size: 0.75em;\n}\n.ql-editor .ql-size-large {\n  font-size: 1.5em;\n}\n.ql-editor .ql-size-huge {\n  font-size: 2.5em;\n}\n.ql-editor .ql-direction-rtl {\n  direction: rtl;\n  text-align: inherit;\n}\n.ql-editor .ql-align-center {\n  text-align: center;\n}\n.ql-editor .ql-align-justify {\n  text-align: justify;\n}\n.ql-editor .ql-align-right {\n  text-align: right;\n}\n.ql-editor.ql-blank::before {\n  color: rgba(0,0,0,0.6);\n  content: attr(data-placeholder);\n  font-style: italic;\n  left: 15px;\n  pointer-events: none;\n  position: absolute;\n  right: 15px;\n}\n.ql-snow.ql-toolbar:after,\n.ql-snow .ql-toolbar:after {\n  clear: both;\n  content: '';\n  display: table;\n}\n.ql-snow.ql-toolbar button,\n.ql-snow .ql-toolbar button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  display: inline-block;\n  float: left;\n  height: 24px;\n  padding: 3px 5px;\n  width: 28px;\n}\n.ql-snow.ql-toolbar button svg,\n.ql-snow .ql-toolbar button svg {\n  float: left;\n  height: 100%;\n}\n.ql-snow.ql-toolbar button:active:hover,\n.ql-snow .ql-toolbar button:active:hover {\n  outline: none;\n}\n.ql-snow.ql-toolbar input.ql-image[type=file],\n.ql-snow .ql-toolbar input.ql-image[type=file] {\n  display: none;\n}\n.ql-snow.ql-toolbar button:hover,\n.ql-snow .ql-toolbar button:hover,\n.ql-snow.ql-toolbar button:focus,\n.ql-snow .ql-toolbar button:focus,\n.ql-snow.ql-toolbar button.ql-active,\n.ql-snow .ql-toolbar button.ql-active,\n.ql-snow.ql-toolbar .ql-picker-label:hover,\n.ql-snow .ql-toolbar .ql-picker-label:hover,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active,\n.ql-snow.ql-toolbar .ql-picker-item:hover,\n.ql-snow .ql-toolbar .ql-picker-item:hover,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected {\n  color: #06c;\n}\n.ql-snow.ql-toolbar button:hover .ql-fill,\n.ql-snow .ql-toolbar button:hover .ql-fill,\n.ql-snow.ql-toolbar button:focus .ql-fill,\n.ql-snow .ql-toolbar button:focus .ql-fill,\n.ql-snow.ql-toolbar button.ql-active .ql-fill,\n.ql-snow .ql-toolbar button.ql-active .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n.ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {\n  fill: #06c;\n}\n.ql-snow.ql-toolbar button:hover .ql-stroke,\n.ql-snow .ql-toolbar button:hover .ql-stroke,\n.ql-snow.ql-toolbar button:focus .ql-stroke,\n.ql-snow .ql-toolbar button:focus .ql-stroke,\n.ql-snow.ql-toolbar button.ql-active .ql-stroke,\n.ql-snow .ql-toolbar button.ql-active .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n.ql-snow.ql-toolbar button:hover .ql-stroke-miter,\n.ql-snow .ql-toolbar button:hover .ql-stroke-miter,\n.ql-snow.ql-toolbar button:focus .ql-stroke-miter,\n.ql-snow .ql-toolbar button:focus .ql-stroke-miter,\n.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,\n.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {\n  stroke: #06c;\n}\n@media (pointer: coarse) {\n  .ql-snow.ql-toolbar button:hover:not(.ql-active),\n  .ql-snow .ql-toolbar button:hover:not(.ql-active) {\n    color: #444;\n  }\n  .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,\n  .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,\n  .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,\n  .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {\n    fill: #444;\n  }\n  .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n  .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n  .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,\n  .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {\n    stroke: #444;\n  }\n}\n.ql-snow {\n  box-sizing: border-box;\n}\n.ql-snow * {\n  box-sizing: border-box;\n}\n.ql-snow .ql-hidden {\n  display: none;\n}\n.ql-snow .ql-out-bottom,\n.ql-snow .ql-out-top {\n  visibility: hidden;\n}\n.ql-snow .ql-tooltip {\n  position: absolute;\n  transform: translateY(10px);\n}\n.ql-snow .ql-tooltip a {\n  cursor: pointer;\n  text-decoration: none;\n}\n.ql-snow .ql-tooltip.ql-flip {\n  transform: translateY(-10px);\n}\n.ql-snow .ql-formats {\n  display: inline-block;\n  vertical-align: middle;\n}\n.ql-snow .ql-formats:after {\n  clear: both;\n  content: '';\n  display: table;\n}\n.ql-snow .ql-stroke {\n  fill: none;\n  stroke: #444;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;\n}\n.ql-snow .ql-stroke-miter {\n  fill: none;\n  stroke: #444;\n  stroke-miterlimit: 10;\n  stroke-width: 2;\n}\n.ql-snow .ql-fill,\n.ql-snow .ql-stroke.ql-fill {\n  fill: #444;\n}\n.ql-snow .ql-empty {\n  fill: none;\n}\n.ql-snow .ql-even {\n  fill-rule: evenodd;\n}\n.ql-snow .ql-thin,\n.ql-snow .ql-stroke.ql-thin {\n  stroke-width: 1;\n}\n.ql-snow .ql-transparent {\n  opacity: 0.4;\n}\n.ql-snow .ql-direction svg:last-child {\n  display: none;\n}\n.ql-snow .ql-direction.ql-active svg:last-child {\n  display: inline;\n}\n.ql-snow .ql-direction.ql-active svg:first-child {\n  display: none;\n}\n.ql-snow .ql-editor h1 {\n  font-size: 2em;\n}\n.ql-snow .ql-editor h2 {\n  font-size: 1.5em;\n}\n.ql-snow .ql-editor h3 {\n  font-size: 1.17em;\n}\n.ql-snow .ql-editor h4 {\n  font-size: 1em;\n}\n.ql-snow .ql-editor h5 {\n  font-size: 0.83em;\n}\n.ql-snow .ql-editor h6 {\n  font-size: 0.67em;\n}\n.ql-snow .ql-editor a {\n  text-decoration: underline;\n}\n.ql-snow .ql-editor blockquote {\n  border-left: 4px solid #ccc;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  padding-left: 16px;\n}\n.ql-snow .ql-editor code,\n.ql-snow .ql-editor pre {\n  background-color: #f0f0f0;\n  border-radius: 3px;\n}\n.ql-snow .ql-editor pre {\n  white-space: pre-wrap;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  padding: 5px 10px;\n}\n.ql-snow .ql-editor code {\n  font-size: 85%;\n  padding: 2px 4px;\n}\n.ql-snow .ql-editor pre.ql-syntax {\n  background-color: #23241f;\n  color: #f8f8f2;\n  overflow: visible;\n}\n.ql-snow .ql-editor img {\n  max-width: 100%;\n}\n.ql-snow .ql-picker {\n  color: #444;\n  display: inline-block;\n  float: left;\n  font-size: 14px;\n  font-weight: 500;\n  height: 24px;\n  position: relative;\n  vertical-align: middle;\n}\n.ql-snow .ql-picker-label {\n  cursor: pointer;\n  display: inline-block;\n  height: 100%;\n  padding-left: 8px;\n  padding-right: 2px;\n  position: relative;\n  width: 100%;\n}\n.ql-snow .ql-picker-label::before {\n  display: inline-block;\n  line-height: 22px;\n}\n.ql-snow .ql-picker-options {\n  background-color: #fff;\n  display: none;\n  min-width: 100%;\n  padding: 4px 8px;\n  position: absolute;\n  white-space: nowrap;\n}\n.ql-snow .ql-picker-options .ql-picker-item {\n  cursor: pointer;\n  display: block;\n  padding-bottom: 5px;\n  padding-top: 5px;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-label {\n  color: #ccc;\n  z-index: 2;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {\n  fill: #ccc;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {\n  stroke: #ccc;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-options {\n  display: block;\n  margin-top: -1px;\n  top: 100%;\n  z-index: 1;\n}\n.ql-snow .ql-color-picker,\n.ql-snow .ql-icon-picker {\n  width: 28px;\n}\n.ql-snow .ql-color-picker .ql-picker-label,\n.ql-snow .ql-icon-picker .ql-picker-label {\n  padding: 2px 4px;\n}\n.ql-snow .ql-color-picker .ql-picker-label svg,\n.ql-snow .ql-icon-picker .ql-picker-label svg {\n  right: 4px;\n}\n.ql-snow .ql-icon-picker .ql-picker-options {\n  padding: 4px 0px;\n}\n.ql-snow .ql-icon-picker .ql-picker-item {\n  height: 24px;\n  width: 24px;\n  padding: 2px 4px;\n}\n.ql-snow .ql-color-picker .ql-picker-options {\n  padding: 3px 5px;\n  width: 152px;\n}\n.ql-snow .ql-color-picker .ql-picker-item {\n  border: 1px solid transparent;\n  float: left;\n  height: 16px;\n  margin: 2px;\n  padding: 0px;\n  width: 16px;\n}\n.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {\n  position: absolute;\n  margin-top: -9px;\n  right: 0;\n  top: 50%;\n  width: 18px;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {\n  content: attr(data-label);\n}\n.ql-snow .ql-picker.ql-header {\n  width: 98px;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item::before {\n  content: 'Normal';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"1\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n  content: 'Heading 1';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"2\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n  content: 'Heading 2';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"3\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n  content: 'Heading 3';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"4\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n  content: 'Heading 4';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"5\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n  content: 'Heading 5';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"6\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n  content: 'Heading 6';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n  font-size: 2em;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n  font-size: 1.5em;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n  font-size: 1.17em;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n  font-size: 1em;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n  font-size: 0.83em;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n  font-size: 0.67em;\n}\n.ql-snow .ql-picker.ql-font {\n  width: 108px;\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item::before {\n  content: 'Sans Serif';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n  content: 'Serif';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n  content: 'Monospace';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n  font-family: Georgia, Times New Roman, serif;\n}\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n  font-family: Monaco, Courier New, monospace;\n}\n.ql-snow .ql-picker.ql-size {\n  width: 98px;\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item::before {\n  content: 'Normal';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n  content: 'Small';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n  content: 'Large';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n  content: 'Huge';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n  font-size: 10px;\n}\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n  font-size: 18px;\n}\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n  font-size: 32px;\n}\n.ql-snow .ql-color-picker.ql-background .ql-picker-item {\n  background-color: #fff;\n}\n.ql-snow .ql-color-picker.ql-color .ql-picker-item {\n  background-color: #000;\n}\n.ql-toolbar.ql-snow {\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;\n  padding: 8px;\n}\n.ql-toolbar.ql-snow .ql-formats {\n  margin-right: 15px;\n}\n.ql-toolbar.ql-snow .ql-picker-label {\n  border: 1px solid transparent;\n}\n.ql-toolbar.ql-snow .ql-picker-options {\n  border: 1px solid transparent;\n  box-shadow: rgba(0,0,0,0.2) 0 2px 8px;\n}\n.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {\n  border-color: #ccc;\n}\n.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {\n  border-color: #ccc;\n}\n.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item.ql-selected,\n.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item:hover {\n  border-color: #000;\n}\n.ql-toolbar.ql-snow + .ql-container.ql-snow {\n  border-top: 0px;\n}\n.ql-snow .ql-tooltip {\n  background-color: #fff;\n  border: 1px solid #ccc;\n  box-shadow: 0px 0px 5px #ddd;\n  color: #444;\n  padding: 5px 12px;\n  white-space: nowrap;\n}\n.ql-snow .ql-tooltip::before {\n  content: \"Visit URL:\";\n  line-height: 26px;\n  margin-right: 8px;\n}\n.ql-snow .ql-tooltip input[type=text] {\n  display: none;\n  border: 1px solid #ccc;\n  font-size: 13px;\n  height: 26px;\n  margin: 0px;\n  padding: 3px 5px;\n  width: 170px;\n}\n.ql-snow .ql-tooltip a.ql-preview {\n  display: inline-block;\n  max-width: 200px;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  vertical-align: top;\n}\n.ql-snow .ql-tooltip a.ql-action::after {\n  border-right: 1px solid #ccc;\n  content: 'Edit';\n  margin-left: 16px;\n  padding-right: 8px;\n}\n.ql-snow .ql-tooltip a.ql-remove::before {\n  content: 'Remove';\n  margin-left: 8px;\n}\n.ql-snow .ql-tooltip a {\n  line-height: 26px;\n}\n.ql-snow .ql-tooltip.ql-editing a.ql-preview,\n.ql-snow .ql-tooltip.ql-editing a.ql-remove {\n  display: none;\n}\n.ql-snow .ql-tooltip.ql-editing input[type=text] {\n  display: inline-block;\n}\n.ql-snow .ql-tooltip.ql-editing a.ql-action::after {\n  border-right: 0px;\n  content: 'Save';\n  padding-right: 0px;\n}\n.ql-snow .ql-tooltip[data-mode=link]::before {\n  content: \"Enter link:\";\n}\n.ql-snow .ql-tooltip[data-mode=formula]::before {\n  content: \"Enter formula:\";\n}\n.ql-snow .ql-tooltip[data-mode=video]::before {\n  content: \"Enter video:\";\n}\n.ql-snow a {\n  color: #06c;\n}\n.ql-container.ql-snow {\n  border: 1px solid #ccc;\n}\n", ""]);

// exports


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(384);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./quill.bubble.css", function() {
			var newContent = require("!!../../css-loader/index.js!./quill.bubble.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "/*!\n * Quill Editor v1.3.4\n * https://quilljs.com/\n * Copyright (c) 2014, Jason Chen\n * Copyright (c) 2013, salesforce.com\n */\n.ql-container {\n  box-sizing: border-box;\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: 13px;\n  height: 100%;\n  margin: 0px;\n  position: relative;\n}\n.ql-container.ql-disabled .ql-tooltip {\n  visibility: hidden;\n}\n.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n  pointer-events: none;\n}\n.ql-clipboard {\n  left: -100000px;\n  height: 1px;\n  overflow-y: hidden;\n  position: absolute;\n  top: 50%;\n}\n.ql-clipboard p {\n  margin: 0;\n  padding: 0;\n}\n.ql-editor {\n  box-sizing: border-box;\n  line-height: 1.42;\n  height: 100%;\n  outline: none;\n  overflow-y: auto;\n  padding: 12px 15px;\n  tab-size: 4;\n  -moz-tab-size: 4;\n  text-align: left;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n.ql-editor > * {\n  cursor: text;\n}\n.ql-editor p,\n.ql-editor ol,\n.ql-editor ul,\n.ql-editor pre,\n.ql-editor blockquote,\n.ql-editor h1,\n.ql-editor h2,\n.ql-editor h3,\n.ql-editor h4,\n.ql-editor h5,\n.ql-editor h6 {\n  margin: 0;\n  padding: 0;\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol,\n.ql-editor ul {\n  padding-left: 1.5em;\n}\n.ql-editor ol > li,\n.ql-editor ul > li {\n  list-style-type: none;\n}\n.ql-editor ul > li::before {\n  content: '\\2022';\n}\n.ql-editor ul[data-checked=true],\n.ql-editor ul[data-checked=false] {\n  pointer-events: none;\n}\n.ql-editor ul[data-checked=true] > li *,\n.ql-editor ul[data-checked=false] > li * {\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before,\n.ql-editor ul[data-checked=false] > li::before {\n  color: #777;\n  cursor: pointer;\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before {\n  content: '\\2611';\n}\n.ql-editor ul[data-checked=false] > li::before {\n  content: '\\2610';\n}\n.ql-editor li::before {\n  display: inline-block;\n  white-space: nowrap;\n  width: 1.2em;\n}\n.ql-editor li:not(.ql-direction-rtl)::before {\n  margin-left: -1.5em;\n  margin-right: 0.3em;\n  text-align: right;\n}\n.ql-editor li.ql-direction-rtl::before {\n  margin-left: 0.3em;\n  margin-right: -1.5em;\n}\n.ql-editor ol li:not(.ql-direction-rtl),\n.ql-editor ul li:not(.ql-direction-rtl) {\n  padding-left: 1.5em;\n}\n.ql-editor ol li.ql-direction-rtl,\n.ql-editor ul li.ql-direction-rtl {\n  padding-right: 1.5em;\n}\n.ql-editor ol li {\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  counter-increment: list-0;\n}\n.ql-editor ol li:before {\n  content: counter(list-0, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n  counter-increment: list-1;\n}\n.ql-editor ol li.ql-indent-1:before {\n  content: counter(list-1, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n  counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-2 {\n  counter-increment: list-2;\n}\n.ql-editor ol li.ql-indent-2:before {\n  content: counter(list-2, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-2 {\n  counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-3 {\n  counter-increment: list-3;\n}\n.ql-editor ol li.ql-indent-3:before {\n  content: counter(list-3, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-3 {\n  counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-4 {\n  counter-increment: list-4;\n}\n.ql-editor ol li.ql-indent-4:before {\n  content: counter(list-4, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-4 {\n  counter-reset: list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-5 {\n  counter-increment: list-5;\n}\n.ql-editor ol li.ql-indent-5:before {\n  content: counter(list-5, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-5 {\n  counter-reset: list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-6 {\n  counter-increment: list-6;\n}\n.ql-editor ol li.ql-indent-6:before {\n  content: counter(list-6, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-6 {\n  counter-reset: list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-7 {\n  counter-increment: list-7;\n}\n.ql-editor ol li.ql-indent-7:before {\n  content: counter(list-7, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-7 {\n  counter-reset: list-8 list-9;\n}\n.ql-editor ol li.ql-indent-8 {\n  counter-increment: list-8;\n}\n.ql-editor ol li.ql-indent-8:before {\n  content: counter(list-8, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-8 {\n  counter-reset: list-9;\n}\n.ql-editor ol li.ql-indent-9 {\n  counter-increment: list-9;\n}\n.ql-editor ol li.ql-indent-9:before {\n  content: counter(list-9, decimal) '. ';\n}\n.ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 3em;\n}\n.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 4.5em;\n}\n.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 3em;\n}\n.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 4.5em;\n}\n.ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 6em;\n}\n.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 7.5em;\n}\n.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 6em;\n}\n.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 7.5em;\n}\n.ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 9em;\n}\n.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 10.5em;\n}\n.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 9em;\n}\n.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 10.5em;\n}\n.ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 12em;\n}\n.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 13.5em;\n}\n.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 12em;\n}\n.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 13.5em;\n}\n.ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 15em;\n}\n.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 16.5em;\n}\n.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 15em;\n}\n.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 16.5em;\n}\n.ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 18em;\n}\n.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 19.5em;\n}\n.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 18em;\n}\n.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 19.5em;\n}\n.ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 21em;\n}\n.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 22.5em;\n}\n.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 21em;\n}\n.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 22.5em;\n}\n.ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 24em;\n}\n.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 25.5em;\n}\n.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 24em;\n}\n.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 25.5em;\n}\n.ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 27em;\n}\n.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 28.5em;\n}\n.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 27em;\n}\n.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 28.5em;\n}\n.ql-editor .ql-video {\n  display: block;\n  max-width: 100%;\n}\n.ql-editor .ql-video.ql-align-center {\n  margin: 0 auto;\n}\n.ql-editor .ql-video.ql-align-right {\n  margin: 0 0 0 auto;\n}\n.ql-editor .ql-bg-black {\n  background-color: #000;\n}\n.ql-editor .ql-bg-red {\n  background-color: #e60000;\n}\n.ql-editor .ql-bg-orange {\n  background-color: #f90;\n}\n.ql-editor .ql-bg-yellow {\n  background-color: #ff0;\n}\n.ql-editor .ql-bg-green {\n  background-color: #008a00;\n}\n.ql-editor .ql-bg-blue {\n  background-color: #06c;\n}\n.ql-editor .ql-bg-purple {\n  background-color: #93f;\n}\n.ql-editor .ql-color-white {\n  color: #fff;\n}\n.ql-editor .ql-color-red {\n  color: #e60000;\n}\n.ql-editor .ql-color-orange {\n  color: #f90;\n}\n.ql-editor .ql-color-yellow {\n  color: #ff0;\n}\n.ql-editor .ql-color-green {\n  color: #008a00;\n}\n.ql-editor .ql-color-blue {\n  color: #06c;\n}\n.ql-editor .ql-color-purple {\n  color: #93f;\n}\n.ql-editor .ql-font-serif {\n  font-family: Georgia, Times New Roman, serif;\n}\n.ql-editor .ql-font-monospace {\n  font-family: Monaco, Courier New, monospace;\n}\n.ql-editor .ql-size-small {\n  font-size: 0.75em;\n}\n.ql-editor .ql-size-large {\n  font-size: 1.5em;\n}\n.ql-editor .ql-size-huge {\n  font-size: 2.5em;\n}\n.ql-editor .ql-direction-rtl {\n  direction: rtl;\n  text-align: inherit;\n}\n.ql-editor .ql-align-center {\n  text-align: center;\n}\n.ql-editor .ql-align-justify {\n  text-align: justify;\n}\n.ql-editor .ql-align-right {\n  text-align: right;\n}\n.ql-editor.ql-blank::before {\n  color: rgba(0,0,0,0.6);\n  content: attr(data-placeholder);\n  font-style: italic;\n  left: 15px;\n  pointer-events: none;\n  position: absolute;\n  right: 15px;\n}\n.ql-bubble.ql-toolbar:after,\n.ql-bubble .ql-toolbar:after {\n  clear: both;\n  content: '';\n  display: table;\n}\n.ql-bubble.ql-toolbar button,\n.ql-bubble .ql-toolbar button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  display: inline-block;\n  float: left;\n  height: 24px;\n  padding: 3px 5px;\n  width: 28px;\n}\n.ql-bubble.ql-toolbar button svg,\n.ql-bubble .ql-toolbar button svg {\n  float: left;\n  height: 100%;\n}\n.ql-bubble.ql-toolbar button:active:hover,\n.ql-bubble .ql-toolbar button:active:hover {\n  outline: none;\n}\n.ql-bubble.ql-toolbar input.ql-image[type=file],\n.ql-bubble .ql-toolbar input.ql-image[type=file] {\n  display: none;\n}\n.ql-bubble.ql-toolbar button:hover,\n.ql-bubble .ql-toolbar button:hover,\n.ql-bubble.ql-toolbar button:focus,\n.ql-bubble .ql-toolbar button:focus,\n.ql-bubble.ql-toolbar button.ql-active,\n.ql-bubble .ql-toolbar button.ql-active,\n.ql-bubble.ql-toolbar .ql-picker-label:hover,\n.ql-bubble .ql-toolbar .ql-picker-label:hover,\n.ql-bubble.ql-toolbar .ql-picker-label.ql-active,\n.ql-bubble .ql-toolbar .ql-picker-label.ql-active,\n.ql-bubble.ql-toolbar .ql-picker-item:hover,\n.ql-bubble .ql-toolbar .ql-picker-item:hover,\n.ql-bubble.ql-toolbar .ql-picker-item.ql-selected,\n.ql-bubble .ql-toolbar .ql-picker-item.ql-selected {\n  color: #fff;\n}\n.ql-bubble.ql-toolbar button:hover .ql-fill,\n.ql-bubble .ql-toolbar button:hover .ql-fill,\n.ql-bubble.ql-toolbar button:focus .ql-fill,\n.ql-bubble .ql-toolbar button:focus .ql-fill,\n.ql-bubble.ql-toolbar button.ql-active .ql-fill,\n.ql-bubble .ql-toolbar button.ql-active .ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-label:hover .ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-label:hover .ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-item:hover .ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-item:hover .ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n.ql-bubble.ql-toolbar button:hover .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar button:hover .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar button:focus .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar button:focus .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar button.ql-active .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar button.ql-active .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {\n  fill: #fff;\n}\n.ql-bubble.ql-toolbar button:hover .ql-stroke,\n.ql-bubble .ql-toolbar button:hover .ql-stroke,\n.ql-bubble.ql-toolbar button:focus .ql-stroke,\n.ql-bubble .ql-toolbar button:focus .ql-stroke,\n.ql-bubble.ql-toolbar button.ql-active .ql-stroke,\n.ql-bubble .ql-toolbar button.ql-active .ql-stroke,\n.ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke,\n.ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke,\n.ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n.ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n.ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke,\n.ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke,\n.ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n.ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n.ql-bubble.ql-toolbar button:hover .ql-stroke-miter,\n.ql-bubble .ql-toolbar button:hover .ql-stroke-miter,\n.ql-bubble.ql-toolbar button:focus .ql-stroke-miter,\n.ql-bubble .ql-toolbar button:focus .ql-stroke-miter,\n.ql-bubble.ql-toolbar button.ql-active .ql-stroke-miter,\n.ql-bubble .ql-toolbar button.ql-active .ql-stroke-miter,\n.ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n.ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n.ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n.ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n.ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n.ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n.ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,\n.ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {\n  stroke: #fff;\n}\n@media (pointer: coarse) {\n  .ql-bubble.ql-toolbar button:hover:not(.ql-active),\n  .ql-bubble .ql-toolbar button:hover:not(.ql-active) {\n    color: #ccc;\n  }\n  .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-fill,\n  .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-fill,\n  .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,\n  .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {\n    fill: #ccc;\n  }\n  .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n  .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n  .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,\n  .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {\n    stroke: #ccc;\n  }\n}\n.ql-bubble {\n  box-sizing: border-box;\n}\n.ql-bubble * {\n  box-sizing: border-box;\n}\n.ql-bubble .ql-hidden {\n  display: none;\n}\n.ql-bubble .ql-out-bottom,\n.ql-bubble .ql-out-top {\n  visibility: hidden;\n}\n.ql-bubble .ql-tooltip {\n  position: absolute;\n  transform: translateY(10px);\n}\n.ql-bubble .ql-tooltip a {\n  cursor: pointer;\n  text-decoration: none;\n}\n.ql-bubble .ql-tooltip.ql-flip {\n  transform: translateY(-10px);\n}\n.ql-bubble .ql-formats {\n  display: inline-block;\n  vertical-align: middle;\n}\n.ql-bubble .ql-formats:after {\n  clear: both;\n  content: '';\n  display: table;\n}\n.ql-bubble .ql-stroke {\n  fill: none;\n  stroke: #ccc;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;\n}\n.ql-bubble .ql-stroke-miter {\n  fill: none;\n  stroke: #ccc;\n  stroke-miterlimit: 10;\n  stroke-width: 2;\n}\n.ql-bubble .ql-fill,\n.ql-bubble .ql-stroke.ql-fill {\n  fill: #ccc;\n}\n.ql-bubble .ql-empty {\n  fill: none;\n}\n.ql-bubble .ql-even {\n  fill-rule: evenodd;\n}\n.ql-bubble .ql-thin,\n.ql-bubble .ql-stroke.ql-thin {\n  stroke-width: 1;\n}\n.ql-bubble .ql-transparent {\n  opacity: 0.4;\n}\n.ql-bubble .ql-direction svg:last-child {\n  display: none;\n}\n.ql-bubble .ql-direction.ql-active svg:last-child {\n  display: inline;\n}\n.ql-bubble .ql-direction.ql-active svg:first-child {\n  display: none;\n}\n.ql-bubble .ql-editor h1 {\n  font-size: 2em;\n}\n.ql-bubble .ql-editor h2 {\n  font-size: 1.5em;\n}\n.ql-bubble .ql-editor h3 {\n  font-size: 1.17em;\n}\n.ql-bubble .ql-editor h4 {\n  font-size: 1em;\n}\n.ql-bubble .ql-editor h5 {\n  font-size: 0.83em;\n}\n.ql-bubble .ql-editor h6 {\n  font-size: 0.67em;\n}\n.ql-bubble .ql-editor a {\n  text-decoration: underline;\n}\n.ql-bubble .ql-editor blockquote {\n  border-left: 4px solid #ccc;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  padding-left: 16px;\n}\n.ql-bubble .ql-editor code,\n.ql-bubble .ql-editor pre {\n  background-color: #f0f0f0;\n  border-radius: 3px;\n}\n.ql-bubble .ql-editor pre {\n  white-space: pre-wrap;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  padding: 5px 10px;\n}\n.ql-bubble .ql-editor code {\n  font-size: 85%;\n  padding: 2px 4px;\n}\n.ql-bubble .ql-editor pre.ql-syntax {\n  background-color: #23241f;\n  color: #f8f8f2;\n  overflow: visible;\n}\n.ql-bubble .ql-editor img {\n  max-width: 100%;\n}\n.ql-bubble .ql-picker {\n  color: #ccc;\n  display: inline-block;\n  float: left;\n  font-size: 14px;\n  font-weight: 500;\n  height: 24px;\n  position: relative;\n  vertical-align: middle;\n}\n.ql-bubble .ql-picker-label {\n  cursor: pointer;\n  display: inline-block;\n  height: 100%;\n  padding-left: 8px;\n  padding-right: 2px;\n  position: relative;\n  width: 100%;\n}\n.ql-bubble .ql-picker-label::before {\n  display: inline-block;\n  line-height: 22px;\n}\n.ql-bubble .ql-picker-options {\n  background-color: #444;\n  display: none;\n  min-width: 100%;\n  padding: 4px 8px;\n  position: absolute;\n  white-space: nowrap;\n}\n.ql-bubble .ql-picker-options .ql-picker-item {\n  cursor: pointer;\n  display: block;\n  padding-bottom: 5px;\n  padding-top: 5px;\n}\n.ql-bubble .ql-picker.ql-expanded .ql-picker-label {\n  color: #777;\n  z-index: 2;\n}\n.ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-fill {\n  fill: #777;\n}\n.ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-stroke {\n  stroke: #777;\n}\n.ql-bubble .ql-picker.ql-expanded .ql-picker-options {\n  display: block;\n  margin-top: -1px;\n  top: 100%;\n  z-index: 1;\n}\n.ql-bubble .ql-color-picker,\n.ql-bubble .ql-icon-picker {\n  width: 28px;\n}\n.ql-bubble .ql-color-picker .ql-picker-label,\n.ql-bubble .ql-icon-picker .ql-picker-label {\n  padding: 2px 4px;\n}\n.ql-bubble .ql-color-picker .ql-picker-label svg,\n.ql-bubble .ql-icon-picker .ql-picker-label svg {\n  right: 4px;\n}\n.ql-bubble .ql-icon-picker .ql-picker-options {\n  padding: 4px 0px;\n}\n.ql-bubble .ql-icon-picker .ql-picker-item {\n  height: 24px;\n  width: 24px;\n  padding: 2px 4px;\n}\n.ql-bubble .ql-color-picker .ql-picker-options {\n  padding: 3px 5px;\n  width: 152px;\n}\n.ql-bubble .ql-color-picker .ql-picker-item {\n  border: 1px solid transparent;\n  float: left;\n  height: 16px;\n  margin: 2px;\n  padding: 0px;\n  width: 16px;\n}\n.ql-bubble .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {\n  position: absolute;\n  margin-top: -9px;\n  right: 0;\n  top: 50%;\n  width: 18px;\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {\n  content: attr(data-label);\n}\n.ql-bubble .ql-picker.ql-header {\n  width: 98px;\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-label::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item::before {\n  content: 'Normal';\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"1\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n  content: 'Heading 1';\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"2\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n  content: 'Heading 2';\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"3\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n  content: 'Heading 3';\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"4\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n  content: 'Heading 4';\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"5\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n  content: 'Heading 5';\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"6\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n  content: 'Heading 6';\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n  font-size: 2em;\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n  font-size: 1.5em;\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n  font-size: 1.17em;\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n  font-size: 1em;\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n  font-size: 0.83em;\n}\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n  font-size: 0.67em;\n}\n.ql-bubble .ql-picker.ql-font {\n  width: 108px;\n}\n.ql-bubble .ql-picker.ql-font .ql-picker-label::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-item::before {\n  content: 'Sans Serif';\n}\n.ql-bubble .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n  content: 'Serif';\n}\n.ql-bubble .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n  content: 'Monospace';\n}\n.ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n  font-family: Georgia, Times New Roman, serif;\n}\n.ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n  font-family: Monaco, Courier New, monospace;\n}\n.ql-bubble .ql-picker.ql-size {\n  width: 98px;\n}\n.ql-bubble .ql-picker.ql-size .ql-picker-label::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-item::before {\n  content: 'Normal';\n}\n.ql-bubble .ql-picker.ql-size .ql-picker-label[data-value=small]::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n  content: 'Small';\n}\n.ql-bubble .ql-picker.ql-size .ql-picker-label[data-value=large]::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n  content: 'Large';\n}\n.ql-bubble .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n  content: 'Huge';\n}\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n  font-size: 10px;\n}\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n  font-size: 18px;\n}\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n  font-size: 32px;\n}\n.ql-bubble .ql-color-picker.ql-background .ql-picker-item {\n  background-color: #fff;\n}\n.ql-bubble .ql-color-picker.ql-color .ql-picker-item {\n  background-color: #000;\n}\n.ql-bubble .ql-toolbar .ql-formats {\n  margin: 8px 12px 8px 0px;\n}\n.ql-bubble .ql-toolbar .ql-formats:first-child {\n  margin-left: 12px;\n}\n.ql-bubble .ql-color-picker svg {\n  margin: 1px;\n}\n.ql-bubble .ql-color-picker .ql-picker-item.ql-selected,\n.ql-bubble .ql-color-picker .ql-picker-item:hover {\n  border-color: #fff;\n}\n.ql-bubble .ql-tooltip {\n  background-color: #444;\n  border-radius: 25px;\n  color: #fff;\n}\n.ql-bubble .ql-tooltip-arrow {\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  content: \" \";\n  display: block;\n  left: 50%;\n  margin-left: -6px;\n  position: absolute;\n}\n.ql-bubble .ql-tooltip:not(.ql-flip) .ql-tooltip-arrow {\n  border-bottom: 6px solid #444;\n  top: -6px;\n}\n.ql-bubble .ql-tooltip.ql-flip .ql-tooltip-arrow {\n  border-top: 6px solid #444;\n  bottom: -6px;\n}\n.ql-bubble .ql-tooltip.ql-editing .ql-tooltip-editor {\n  display: block;\n}\n.ql-bubble .ql-tooltip.ql-editing .ql-formats {\n  visibility: hidden;\n}\n.ql-bubble .ql-tooltip-editor {\n  display: none;\n}\n.ql-bubble .ql-tooltip-editor input[type=text] {\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 13px;\n  height: 100%;\n  outline: none;\n  padding: 10px 20px;\n  position: absolute;\n  width: 100%;\n}\n.ql-bubble .ql-tooltip-editor a {\n  top: 10px;\n  position: absolute;\n  right: 20px;\n}\n.ql-bubble .ql-tooltip-editor a:before {\n  color: #ccc;\n  content: \"\\D7\";\n  font-size: 16px;\n  font-weight: bold;\n}\n.ql-container.ql-bubble:not(.ql-disabled) a {\n  position: relative;\n  white-space: nowrap;\n}\n.ql-container.ql-bubble:not(.ql-disabled) a::before {\n  background-color: #444;\n  border-radius: 15px;\n  top: -5px;\n  font-size: 12px;\n  color: #fff;\n  content: attr(href);\n  font-weight: normal;\n  overflow: hidden;\n  padding: 5px 15px;\n  text-decoration: none;\n  z-index: 1;\n}\n.ql-container.ql-bubble:not(.ql-disabled) a::after {\n  border-top: 6px solid #444;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  top: 0;\n  content: \" \";\n  height: 0;\n  width: 0;\n}\n.ql-container.ql-bubble:not(.ql-disabled) a::before,\n.ql-container.ql-bubble:not(.ql-disabled) a::after {\n  left: 0;\n  margin-left: 50%;\n  position: absolute;\n  transform: translate(-50%, -100%);\n  transition: visibility 0s ease 200ms;\n  visibility: hidden;\n}\n.ql-container.ql-bubble:not(.ql-disabled) a:hover::before,\n.ql-container.ql-bubble:not(.ql-disabled) a:hover::after {\n  visibility: visible;\n}\n", ""]);

// exports


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-container",
    [
      _c(
        "el-main",
        [
          _c(
            "el-row",
            [
              _c(
                "el-col",
                { attrs: { span: 24 } },
                [
                  _c(
                    "el-breadcrumb",
                    { attrs: { "separator-class": "el-icon-arrow-right" } },
                    [
                      _c(
                        "el-breadcrumb-item",
                        { attrs: { to: { path: "/" } } },
                        [_vm._v("首页")]
                      ),
                      _vm._v(" "),
                      _c("el-breadcrumb-item", [_vm._v("素材管理")]),
                      _vm._v(" "),
                      _c("el-breadcrumb-item", [_vm._v("新建图文")])
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-row",
            [
              _c(
                "el-col",
                {
                  staticStyle: { "margin-top": "50px" },
                  attrs: { span: 15, offset: 1 }
                },
                [
                  _c(
                    "el-form",
                    {
                      ref: "form",
                      attrs: { model: _vm.form, "label-width": "150px" }
                    },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { label: "标题" } },
                        [
                          _c(
                            "el-col",
                            { attrs: { span: 15 } },
                            [
                              _c("el-input", {
                                attrs: { size: "small" },
                                model: {
                                  value: _vm.form.title,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "title", $$v)
                                  },
                                  expression: "form.title"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "作者" } },
                        [
                          _c(
                            "el-col",
                            { attrs: { span: 15 } },
                            [
                              _c("el-input", {
                                attrs: { size: "small" },
                                model: {
                                  value: _vm.form.author,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "author", $$v)
                                  },
                                  expression: "form.author"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "正文" } },
                        [
                          _c("quill-editor", {
                            ref: "myQuillEditor",
                            model: {
                              value: _vm.form.content,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "content", $$v)
                              },
                              expression: "form.content"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "原文链接" } },
                        [
                          _c("el-checkbox", {
                            model: {
                              value: _vm.form.checked,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "checked", $$v)
                              },
                              expression: "form.checked"
                            }
                          }),
                          _vm._v(" "),
                          _vm.form.checked
                            ? _c(
                                "div",
                                { staticStyle: { width: "500px" } },
                                [
                                  _c("el-input", {
                                    attrs: { size: "small" },
                                    model: {
                                      value: _vm.form.title,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "title", $$v)
                                      },
                                      expression: "form.title"
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "封面图片" } },
                        [
                          _c(
                            "el-upload",
                            {
                              staticClass: "avatar-uploader",
                              attrs: {
                                action:
                                  "https://jsonplaceholder.typicode.com/posts/",
                                "show-file-list": false
                              }
                            },
                            [
                              _vm.imageUrl
                                ? _c("img", {
                                    staticClass: "avatar",
                                    attrs: { src: _vm.imageUrl }
                                  })
                                : _c("i", {
                                    staticClass:
                                      "el-icon-plus avatar-uploader-icon"
                                  })
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "摘要" } },
                        [
                          _c(
                            "el-col",
                            { attrs: { span: 15 } },
                            [
                              _c("el-input", {
                                attrs: { type: "textarea", rows: 3 }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        [
                          _c("el-button", { attrs: { type: "primary" } }, [
                            _vm._v("设置")
                          ]),
                          _vm._v(" "),
                          _c("el-button", [_vm._v("取消")])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2690a23b", module.exports)
  }
}

/***/ })
]));