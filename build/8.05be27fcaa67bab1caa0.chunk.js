(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"1ef56d4a8c09276ff20a":function(e,t,n){"use strict";n.r(t);n("1ca67b639199cb765139");var o=n("2688cdc98aed61204a0c"),a=(n("d0412dc14390ed739732"),n("debcade008ca58960500")),r=(n("071298eee1e85f371cb3"),n("8ca0435fe92d5e05db5b")),i=(n("d0b22e7450f404c3c82d"),n("c4ebd3259ab3503eb095")),c=n("8af190b70a6bc55c6f1b"),s=n.n(c),f=n("d7dd51e1bf6bfc2c9c3d"),l=n("a28fc3c963a1d4d1a2e5"),d=n("ab039aecd4a1d4fedc0e"),u=(n("8a2d1b95e05b6a321e74"),n("c34c7d5c307e1dafdb1e")),p=n.n(u),b=n("f607f491151ddcb274e0"),y=n.n(b),h=n("191e6578136ab57477d1"),v=n("537e9378f1e5205c76aa"),g=Object(d.defineMessages)({infoAlertCopy:{id:"InfoInitPage infoAlertCopy",defaultMessage:"复制"},infoAlertMessage:{id:"InfoInitPage infoAlertMessage",defaultMessage:"此页面在线使用"},infoAlertDescription:{id:"InfoInitPage infoAlertDescription",defaultMessage:"将下方信息粘贴至EOSCannon离线签名工具中。"}}),m=n("e8c18121a227016693d8");n.d(t,"CreateAccountPage",function(){return M});var O,w=(O="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,n,o){var a=e&&e.defaultProps,r=arguments.length-3;if(t||0===r||(t={}),t&&a)for(var i in a)void 0===t[i]&&(t[i]=a[i]);else t||(t=a||{});if(1===r)t.children=o;else if(r>1){for(var c=Array(r),s=0;s<r;s++)c[s]=arguments[s+3];t.children=c}return{$$typeof:O,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}),C=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var j=i.a.Item,k=r.a.TextArea,M=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleGetTransaction=function(e){Object(v.c)(e).then(function(e){n.props.form.setFieldsValue({transaction:JSON.stringify(e)}),n.setState({QrCodeValue:JSON.stringify(e)})})},n.handleCopyTransaction=function(){y()(n.state.QrCodeValue),Object(v.d)(n.state.formatMessage)},n.state={formatMessage:n.props.intl.formatMessage,QrCodeValue:"欢迎使用EosCannon在线工具"},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.a.Component),C(t,[{key:"componentWillReceiveProps",value:function(e){e.SelectedNetWork&&e.SelectedNetWork!==this.props.SelectedNetWork&&this.handleGetTransaction(e.SelectedNetWork)}},{key:"componentDidMount",value:function(){this.handleGetTransaction(this.props.SelectedNetWork)}},{key:"render",value:function(){var e=this.state.formatMessage(g.infoAlertMessage),t=this.state.formatMessage(g.infoAlertDescription),n=this.state.formatMessage(g.infoAlertCopy);return w(m.c,{},void 0,w(m.a,{},void 0,w(j,{},void 0,w(a.a,{message:e,description:t,type:"info"})),w(j,{},void 0,w("div",{style:{textAlign:"center"}},void 0,w(p.a,{value:this.state.QrCodeValue,size:256}))),w(j,{},void 0,w(k,{value:this.state.QrCodeValue,rows:"4",disabled:"true"})),w(j,{},void 0,w(o.a,{type:"primary",className:"form-button",onClick:this.handleCopyTransaction},void 0,n))))}}]),t}(),S=Object(l.b)({SelectedNetWork:Object(h.b)()}),A=Object(d.injectIntl)(M),P=i.a.create()(A);t.default=Object(f.connect)(S)(P)}}]);