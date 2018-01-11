webpackJsonp([20],{

/***/ 111:
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

/***/ 419:
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
                      _c("el-breadcrumb-item", [_vm._v("员工管理")]),
                      _vm._v(" "),
                      _c("el-breadcrumb-item", [_vm._v("编辑员工")])
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
            { attrs: { type: "flex", justify: "center" } },
            [
              _c(
                "el-row",
                {
                  staticStyle: {
                    width: "80%",
                    border: "1px solid #cccccc",
                    "background-color": "white"
                  },
                  attrs: { type: "flex", justify: "center" }
                },
                [
                  _c(
                    "el-col",
                    {
                      staticStyle: { "margin-top": "40px" },
                      attrs: { span: 14 }
                    },
                    [
                      _c(
                        "el-form",
                        { attrs: { "label-width": "80px" } },
                        [
                          _c(
                            "el-form-item",
                            { attrs: { label: "姓名" } },
                            [_c("el-input", { attrs: { size: "small" } })],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "状态" } },
                            [
                              _c(
                                "el-select",
                                { attrs: { size: "small", value: "" } },
                                [_c("el-option", { attrs: { value: "" } })],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "性别" } },
                            [
                              _c(
                                "el-select",
                                { attrs: { size: "small", value: "" } },
                                [
                                  _c("el-option", {
                                    attrs: { label: "女", value: "0" }
                                  }),
                                  _vm._v(" "),
                                  _c("el-option", {
                                    attrs: { label: "男", value: "1" }
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
                            { attrs: { label: "手机号" } },
                            [_c("el-input", { attrs: { size: "small" } })],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "QQ号" } },
                            [_c("el-input", { attrs: { size: "small" } })],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "备注" } },
                            [
                              _c("el-input", {
                                attrs: {
                                  size: "small",
                                  type: "textarea",
                                  rows: 2
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            [
                              _c("el-button", { attrs: { size: "small" } }, [
                                _vm._v("修改")
                              ]),
                              _vm._v(" "),
                              _c("el-button", { attrs: { size: "small" } }, [
                                _vm._v("取消")
                              ])
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
    require("vue-hot-reload-api")      .rerender("data-v-0054f20a", module.exports)
  }
}

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(111)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(419)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
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
Component.options.__file = "resources/assets/js/components/admin/worker/detail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0054f20a", Component.options)
  } else {
    hotAPI.reload("data-v-0054f20a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});