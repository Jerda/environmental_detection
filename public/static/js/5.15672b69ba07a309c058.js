webpackJsonp([5],{"Gz2+":function(n,e,t){var o=t("Nl45");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);t("rjj0")("6991df2a",o,!0)},Nl45:function(n,e,t){e=n.exports=t("FZ+f")(!0),e.push([n.i,'/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* popup-header\n*/\n/**\n* form-preview\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* week-calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n/**\n* loadmore\n*/\n.weui-cells {\n  margin-top: 1.17647059em;\n  background-color: #FFFFFF;\n  line-height: 1.41176471;\n  font-size: 17px;\n  overflow: hidden;\n  position: relative;\n}\n.weui-cells:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells__title {\n  margin-top: 0.77em;\n  margin-bottom: 0.3em;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: #999999;\n  font-size: 14px;\n}\n.weui-cells__title + .weui-cells {\n  margin-top: 0;\n}\n.weui-cells__tips {\n  margin-top: .3em;\n  color: #999999;\n  padding-left: 15px;\n  padding-right: 15px;\n  font-size: 14px;\n}\n.weui-cell {\n  padding: 10px 15px;\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.weui-cell:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-cell:first-child:before {\n  display: none;\n}\n.weui-cell_primary {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n.weui-cell__bd {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.weui-cell__ft {\n  text-align: right;\n  color: #999999;\n}\n.vux-cell-justify {\n  height: 1.41176471em;\n}\n.vux-cell-justify.vux-cell-justify:after {\n  content: ".";\n  display: inline-block;\n  width: 100%;\n  overflow: hidden;\n  height: 0;\n}\n.weui-cell_access {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  color: inherit;\n}\n.weui-cell_access:active {\n  background-color: #ECECEC;\n}\n.weui-cell_access .weui-cell__ft {\n  padding-right: 13px;\n  position: relative;\n}\n.weui-cell_access .weui-cell__ft:after {\n  content: " ";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  margin-top: -4px;\n  right: 2px;\n}\n.weui-cell_link {\n  color: #586C94;\n  font-size: 14px;\n}\n.weui-cell_link:first-child:before {\n  display: block;\n}\n.weui-cell_access.vux-cell-box {\n  padding-right: 13px;\n  position: relative;\n}\n.weui-cell_access.vux-cell-box:after {\n  content: " ";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  margin-top: -4px;\n  right: 17px;\n}\n.weui-panel {\n  background-color: #FFFFFF;\n  margin-top: 10px;\n  position: relative;\n  overflow: hidden;\n}\n.weui-panel:first-child {\n  margin-top: 0;\n}\n.weui-panel:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-panel:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  -webkit-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-panel__hd {\n  padding: 14px 15px 10px;\n  color: #999999;\n  font-size: 13px;\n  position: relative;\n}\n.weui-panel__hd:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  -webkit-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n  left: 15px;\n}\n',"",{version:3,sources:["/Users/tangsanquan/work/valetroot/environmental_detection/wechatFrontend/node_modules/vux/src/components/card/index.vue"],names:[],mappings:"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",file:"index.vue",sourcesContent:['/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* popup-header\n*/\n/**\n* form-preview\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* week-calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n/**\n* loadmore\n*/\n.weui-cells {\n  margin-top: 1.17647059em;\n  background-color: #FFFFFF;\n  line-height: 1.41176471;\n  font-size: 17px;\n  overflow: hidden;\n  position: relative;\n}\n.weui-cells:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells__title {\n  margin-top: 0.77em;\n  margin-bottom: 0.3em;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: #999999;\n  font-size: 14px;\n}\n.weui-cells__title + .weui-cells {\n  margin-top: 0;\n}\n.weui-cells__tips {\n  margin-top: .3em;\n  color: #999999;\n  padding-left: 15px;\n  padding-right: 15px;\n  font-size: 14px;\n}\n.weui-cell {\n  padding: 10px 15px;\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.weui-cell:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-cell:first-child:before {\n  display: none;\n}\n.weui-cell_primary {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n.weui-cell__bd {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.weui-cell__ft {\n  text-align: right;\n  color: #999999;\n}\n.vux-cell-justify {\n  height: 1.41176471em;\n}\n.vux-cell-justify.vux-cell-justify:after {\n  content: ".";\n  display: inline-block;\n  width: 100%;\n  overflow: hidden;\n  height: 0;\n}\n.weui-cell_access {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  color: inherit;\n}\n.weui-cell_access:active {\n  background-color: #ECECEC;\n}\n.weui-cell_access .weui-cell__ft {\n  padding-right: 13px;\n  position: relative;\n}\n.weui-cell_access .weui-cell__ft:after {\n  content: " ";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  margin-top: -4px;\n  right: 2px;\n}\n.weui-cell_link {\n  color: #586C94;\n  font-size: 14px;\n}\n.weui-cell_link:first-child:before {\n  display: block;\n}\n.weui-cell_access.vux-cell-box {\n  padding-right: 13px;\n  position: relative;\n}\n.weui-cell_access.vux-cell-box:after {\n  content: " ";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  margin-top: -4px;\n  right: 17px;\n}\n.weui-panel {\n  background-color: #FFFFFF;\n  margin-top: 10px;\n  position: relative;\n  overflow: hidden;\n}\n.weui-panel:first-child {\n  margin-top: 0;\n}\n.weui-panel:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-panel:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  -webkit-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-panel__hd {\n  padding: 14px 15px 10px;\n  color: #999999;\n  font-size: 13px;\n  position: relative;\n}\n.weui-panel__hd:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  -webkit-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n  left: 15px;\n}\n'],sourceRoot:""}])},UkBH:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t("dQSc"),i={components:{Card:o.a},props:[],data:function(){return{header:"",content:"",footer:""}}},A=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("card",{attrs:{header:{title:n.header}}},[t("div",{staticClass:"card-padding",attrs:{slot:"content"},slot:"content"},[t("span",[n._v("状态")]),n._v(" "),t("span",[n._v("地址")])]),n._v(" "),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("span",[n._v("查看区域")]),n._v(" "),t("span",[n._v("添加区域")])])])],1)},r=[],l={render:A,staticRenderFns:r},a=l,s=t("VU/8"),c=s(i,a,!1,null,null,null),p=c.exports,C=t("2sLL"),E=t("rHil"),m=t("pDNl"),f=t("wwIJ"),d=t("HD9R"),B={components:{XButton:C.a,Group:E.a,XInput:m.a,Selector:f.a,Popup:d.a},props:["isShow"],data:function(){return{title:"申请圈舍",show:this.isShow,form:{name:"",factory_status:"",type:"",farm_mode:"",sealing:"",sewage:"",fan_mode:"",length:"",width:"",fan_num:"",cooling_pad_num:"",area:"",animal_num:"",province:"",city:"",district:"",address:"",remark:""},option:{type:[{key:1,value:"无自动"},{key:2,value:"半自动"},{key:3,value:"全自动"}],farm_mode:[{key:1,value:"散养"},{key:2,value:"限位栏"}],sealing:[{key:0,value:"无"},{key:1,value:"有"}],sewage:[{key:0,value:"无"},{key:1,value:"有"}],fan_mode:[{key:0,value:"无"},{key:1,value:"有"}]}}},methods:{add:function(){this.$emit("close")}},watch:{isShow:function(n){this.show=this.isShow}}},u=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("popup",{attrs:{height:"100%"},model:{value:n.show,callback:function(e){n.show=e},expression:"show"}},[t("div",{staticClass:"popup"},[t("group",{attrs:{title:"申请圈舍"}},[t("x-input",{attrs:{title:"名称"},model:{value:n.form.name,callback:function(e){n.$set(n.form,"name",e)},expression:"form.name"}}),n._v(" "),t("selector",{attrs:{title:"类型",options:n.option.type,placeholder:"请选择类型"},model:{value:n.form.type,callback:function(e){n.$set(n.form,"type",e)},expression:"form.type"}}),n._v(" "),t("selector",{attrs:{title:"饲养模式",options:n.option.farm_mode,placeholder:"请选择饲养模式"},model:{value:n.form.farm_mode,callback:function(e){n.$set(n.form,"farm_mode",e)},expression:"form.farm_mode"}}),n._v(" "),t("selector",{attrs:{title:"密封性",options:n.option.sealing,placeholder:"请选择密封性"},model:{value:n.form.sealing,callback:function(e){n.$set(n.form,"sealing",e)},expression:"form.sealing"}}),n._v(" "),t("selector",{attrs:{title:"排污",options:n.option.sewage,placeholder:"请选择排污"},model:{value:n.form.sewage,callback:function(e){n.$set(n.form,"sewage",e)},expression:"form.sewage"}}),n._v(" "),t("selector",{attrs:{title:"通风方式",options:n.option.fan_mode,placeholder:"请选择通风方式"},model:{value:n.form.fan_mode,callback:function(e){n.$set(n.form,"fan_mode",e)},expression:"form.fan_mode"}}),n._v(" "),t("x-input",{attrs:{title:"圈舍长"},model:{value:n.form.length,callback:function(e){n.$set(n.form,"length",e)},expression:"form.length"}}),n._v(" "),t("x-input",{attrs:{title:"圈舍宽"},model:{value:n.form.width,callback:function(e){n.$set(n.form,"width",e)},expression:"form.width"}}),n._v(" "),t("x-input",{attrs:{title:"面积"},model:{value:n.form.area,callback:function(e){n.$set(n.form,"area",e)},expression:"form.area"}}),n._v(" "),t("x-input",{attrs:{title:"风机数量"},model:{value:n.form.fan_num,callback:function(e){n.$set(n.form,"fan_num",e)},expression:"form.fan_num"}}),n._v(" "),t("x-input",{attrs:{title:"湿帘数量"},model:{value:n.form.cooling_pad_num,callback:function(e){n.$set(n.form,"cooling_pad_num",e)},expression:"form.cooling_pad_num"}}),n._v(" "),t("x-input",{attrs:{title:"畜生数"},model:{value:n.form.animal_num,callback:function(e){n.$set(n.form,"animal_num",e)},expression:"form.animal_num"}}),n._v(" "),t("x-input",{attrs:{title:"详情地址"},model:{value:n.form.address,callback:function(e){n.$set(n.form,"address",e)},expression:"form.address"}}),n._v(" "),t("x-input",{attrs:{title:"备注"},model:{value:n.form.remark,callback:function(e){n.$set(n.form,"remark",e)},expression:"form.remark"}})],1),n._v(" "),t("x-button",{attrs:{type:"primary"},nativeOn:{click:function(e){n.add(e)}}},[n._v("申请圈舍")])],1)])],1)},h=[],b={render:u,staticRenderFns:h},x=b,g=t("VU/8"),w=g(B,x,!1,null,null,null),_=w.exports,v=t("3Q37"),k={components:{FactoryCard:p,FactoryAdd:_,XButton:C.a,Popup:d.a,tab:v.a},data:function(){return{title:"我的圈舍",addShow:!1}},methods:{show:function(){this.addShow=!0}}},D=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("top",{attrs:{title:n.title,isBack:!0}}),n._v(" "),t("tab",{attrs:{user:!0}}),n._v(" "),t("factory-card"),n._v(" "),t("x-button",{attrs:{type:"primary"},nativeOn:{click:function(e){n.show(e)}}},[n._v("申请圈舍")]),n._v(" "),t("factory-add",{attrs:{isShow:n.addShow},on:{close:function(e){n.addShow=!1}}})],1)},y=[],F={render:D,staticRenderFns:y},Y=F,U=t("VU/8"),j=U(k,Y,!1,null,null,null);e.default=j.exports},dQSc:function(n,e,t){"use strict";function o(n){t("Gz2+")}var i=t("0FxO"),A={name:"card",props:{header:Object,footer:Object},methods:{onClickFooter:function(){this.footer.link&&Object(i.a)(this.footer.link,this.$router),this.$emit("on-click-footer")}}},r=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"weui-panel weui-panel_access"},[n.header&&n.header.title?t("div",{staticClass:"weui-panel__hd",domProps:{innerHTML:n._s(n.header.title)},on:{click:function(e){n.$emit("on-click-header")}}}):n._e(),n._v(" "),n._t("header"),n._v(" "),t("div",{staticClass:"weui-panel__bd"},[t("div",{staticClass:"vux-card-content"},[n._t("content")],2)]),n._v(" "),t("div",{staticClass:"weui-panel__ft"},[n.footer&&n.footer.title?t("a",{staticClass:"weui-cell weui-cell_access weui-cell_link",attrs:{href:"javascript:"},on:{click:n.onClickFooter}},[t("div",{staticClass:"weui-cell__bd",domProps:{innerHTML:n._s(n.footer.title)}})]):n._e()]),n._v(" "),n._t("footer")],2)},l=[],a={render:r,staticRenderFns:l},s=a,c=t("VU/8"),p=o,C=c(A,s,!1,p,null,null);e.a=C.exports}});
//# sourceMappingURL=5.15672b69ba07a309c058.js.map