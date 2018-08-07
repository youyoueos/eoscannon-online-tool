(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"39f71de706e5b9337c05":function(e,a,t){"use strict";t.r(a);t("1b31afae7a42ff36d602");var n=t("8417e7e7c48584b19c37"),r=(t("071298eee1e85f371cb3"),t("8ca0435fe92d5e05db5b")),s=(t("26c2044b4286ee97e970"),t("14ba9fe1962fa8709415")),o=(t("d0b22e7450f404c3c82d"),t("c4ebd3259ab3503eb095")),i=t("8af190b70a6bc55c6f1b"),c=t.n(i),l=t("ab039aecd4a1d4fedc0e"),f=(t("8a2d1b95e05b6a321e74"),t("d7dd51e1bf6bfc2c9c3d")),u=t("a28fc3c963a1d4d1a2e5"),m=t("f607f491151ddcb274e0"),p=t.n(m),d=[{version:"eosio::abi/1.0",types:[{new_type_name:"account_name",type:"name"}],structs:[{name:"transfer",base:"",fields:[{name:"from",type:"account_name"},{name:"to",type:"account_name"},{name:"quantity",type:"asset"},{name:"memo",type:"string"}]},{name:"create",base:"",fields:[{name:"issuer",type:"account_name"},{name:"maximum_supply",type:"asset"}]},{name:"issue",base:"",fields:[{name:"to",type:"account_name"},{name:"quantity",type:"asset"},{name:"memo",type:"string"}]},{name:"account",base:"",fields:[{name:"balance",type:"asset"}]},{name:"currency_stats",base:"",fields:[{name:"supply",type:"asset"},{name:"max_supply",type:"asset"},{name:"issuer",type:"account_name"}]}],actions:[{name:"transfer",type:"transfer",ricardian_contract:""},{name:"issue",type:"issue",ricardian_contract:""},{name:"create",type:"create",ricardian_contract:""}],tables:[{name:"accounts",type:"account",index_type:"i64",key_names:["currency"],key_types:["uint64"]},{name:"stat",type:"currency_stats",index_type:"i64",key_names:["currency"],key_types:["uint64"]}],ricardian_clauses:[],abi_extensions:[]}],y=[{version:"eosio::abi/1.0",types:[{new_type_name:"account_name",type:"name"}],structs:[{name:"transfer",base:"",fields:[{name:"from",type:"account_name"},{name:"to",type:"account_name"},{name:"quantity",type:"asset"},{name:"memo",type:"string"}]},{name:"create",base:"",fields:[{name:"issuer",type:"account_name"},{name:"maximum_supply",type:"asset"}]},{name:"issue",base:"",fields:[{name:"to",type:"account_name"},{name:"quantity",type:"asset"},{name:"memo",type:"string"}]},{name:"brainmeiq",base:"",fields:[{name:"staker",type:"account_name"},{name:"amount",type:"int64"}]},{name:"account",base:"",fields:[{name:"balance",type:"asset"}]},{name:"currency_stats",base:"",fields:[{name:"supply",type:"asset"},{name:"max_supply",type:"asset"},{name:"issuer",type:"account_name"}]}],actions:[{name:"transfer",type:"transfer",ricardian_contract:""},{name:"issue",type:"issue",ricardian_contract:""},{name:"brainmeiq",type:"brainmeiq",ricardian_contract:""},{name:"create",type:"create",ricardian_contract:""}],tables:[{name:"accounts",index_type:"i64",key_names:["currency"],key_types:["uint64"],type:"account"},{name:"stat",index_type:"i64",key_names:["currency"],key_types:["uint64"],type:"currency_stats"}],error_messages:[],abi_extensions:[]}],b=[{version:"eosio::abi/1.0",types:[{new_type_name:"account_name",type:"name"}],structs:[{name:"transfer",base:"",fields:[{name:"from",type:"account_name"},{name:"to",type:"account_name"},{name:"quantity",type:"asset"},{name:"memo",type:"string"}]},{name:"create",base:"",fields:[{name:"issuer",type:"account_name"},{name:"maximum_supply",type:"asset"}]},{name:"issue",base:"",fields:[{name:"to",type:"account_name"},{name:"quantity",type:"asset"},{name:"memo",type:"string"}]},{name:"account",base:"",fields:[{name:"balance",type:"asset"}]},{name:"currency_stats",base:"",fields:[{name:"supply",type:"asset"},{name:"max_supply",type:"asset"},{name:"issuer",type:"account_name"}]}],actions:[{name:"transfer",type:"transfer",ricardian_contract:""},{name:"issue",type:"issue",ricardian_contract:""},{name:"create",type:"create",ricardian_contract:""}],tables:[{name:"accounts",index_type:"i64",key_names:["currency"],key_types:["uint64"],type:"account"},{name:"stat",index_type:"i64",key_names:["currency"],key_types:["uint64"],type:"currency_stats"}],error_messages:[],abi_extensions:[]}],g=t("537e9378f1e5205c76aa"),h=t("e8c18121a227016693d8"),T=t("11f2d0f6be39e37bc55d"),_=t("47eedf4f6744b24aaf33"),v=Object(l.defineMessages)({TransferFromAccountNamePlaceholder:{id:"TransferPage TransferFromAccountNamePlaceholder",defaultMessage:"请输入私钥对应的账户名"},TransferToAccountNamePlaceholder:{id:"TransferPage TransferToAccountNamePlaceholder",defaultMessage:"请输入将要转入的账户名"},TransferContractPlaceholder:{id:"TransferPage TransferContractPlaceholder",defaultMessage:"请输入Contract"},TransferQuantityPlaceholder:{id:"TransferPage TransferQuantityPlaceholder",defaultMessage:"请输入转账的数量"},TransferDigitPlaceholder:{id:"TransferPage TransferDigitPlaceholder",defaultMessage:"请输入代币精度"},TransferSymbolPlaceholder:{id:"TransferPage TransferSymbolPlaceholder",defaultMessage:"请输入Symbol"},TransferMemoPlaceholder:{id:"TransferPage TransferMemoPlaceholder",defaultMessage:"请输入Memo，交易所转账必填"},TransferMemoHelp:{id:"TransferPage TransferMemoHelp",defaultMessage:"注：交易所转账必填"},FromLabel:{id:"TransferPage FromLabel",defaultMessage:"转账账户"},ToLabel:{id:"TransferPage ToLabel",defaultMessage:"接收账户"},ContractLabel:{id:"TransferPage ContractLabel",defaultMessage:"合约"},QuantityLabel:{id:"TransferPage QuantityLabel",defaultMessage:"转账数量"},DigitLabel:{id:"TransferPage DigitLabel",defaultMessage:"精度"},SymbolLabel:{id:"TransferPage SymbolLabel",defaultMessage:"单位"}}),M=t("9cada3e1a82441d5dc97"),S=t("191e6578136ab57477d1");t.d(a,"TransferPage",function(){return x});var P,C=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},O=(P="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,a,t,n){var r=e&&e.defaultProps,s=arguments.length-3;if(a||0===s||(a={}),a&&r)for(var o in r)void 0===a[o]&&(a[o]=r[o]);else a||(a=r||{});if(1===s)a.children=n;else if(s>1){for(var i=Array(s),c=0;c<s;c++)i[c]=arguments[c+3];a.children=i}return{$$typeof:P,type:e,key:void 0===t?null:""+t,ref:null,props:a,_owner:null}}),k=function(){function e(e,a){for(var t=0;t<a.length;t++){var n=a[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(a,t,n){return t&&e(a.prototype,t),n&&e(a,n),a}}();var w=o.a.Item,B=s.a.Option,x=function(e){function a(e){!function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,a){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!a||"object"!=typeof a&&"function"!=typeof a?e:a}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.onValuesChange=function(e){var a=e.form.getFieldsValue(),n=a.FromAccountName,r=a.ToAccountName,s=a.transferContract,o=a.transferQuantity,i=a.transferDigit,c=a.transferSymbol;a.transaction;t.setState({GetTransactionButtonState:n&&r&&s&&o&&i&&c}),t.setState({CopyTransactionButtonState:n&&r&&s&&o&&i&&c})},t.handleGetTransaction=function(){if(t.state.GetTransactionButtonState){t.setState({GetTransactionButtonLoading:!0});var e=t.props.form.getFieldsValue(),a=Object(g.b)(t.props.SelectedNetWork),n=e.FromAccountName,r=e.ToAccountName,s=e.transferContract,o=e.transferQuantity,i=e.transferDigit,c=e.transferMemo,l=e.transferSymbol;"eosio"!==s&&"eosio.token"!==s&&("EVERIPEDIAIQ"===s.toUpperCase()?a.fc.abiCache.abi(s,y):"CHALLENGEDAC"===s.toUpperCase()?a.fc.abiCache.abi(s,b):a.fc.abiCache.abi(s,d)),a.transaction({actions:[{account:s,name:"transfer",authorization:[{actor:n,permission:"active"}],data:{from:n,to:r,quantity:Number(o).toFixed(Number(i))+" "+l.toUpperCase(),memo:c||""}}]},{sign:!1,broadcast:!1}).then(function(e){t.props.form.setFieldsValue({transaction:JSON.stringify(e.transaction)}),t.setState({transaction:JSON.stringify(e.transaction),GetTransactionButtonLoading:!1,QrCodeValue:JSON.stringify(e.transaction)}),Object(g.h)(t.state.formatMessage)}).catch(function(e){t.setState({GetTransactionButtonLoading:!1}),Object(g.g)(t.state.formatMessage,e.name)})}},t.handleCopyTransaction=function(){if(t.state.CopyTransactionButtonState){var e=t.props.form.getFieldsValue().transaction;console.log("transaction====",e),p()(e),Object(g.f)(t.state.formatMessage)}},t.state={formatMessage:t.props.intl.formatMessage,GetTransactionButtonLoading:!1,GetTransactionButtonState:!1,CopyTransactionButtonState:!1,SendSignTransactionButtonState:!1,QrCodeValue:t.props.intl.formatMessage(M.a.QrCodeInitValue)},t}return function(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function, not "+typeof a);e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),a&&(Object.setPrototypeOf?Object.setPrototypeOf(e,a):e.__proto__=a)}(a,c.a.Component),k(a,[{key:"componentWillReceiveProps",value:function(e){this.onValuesChange(e)}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,a=this.state.formatMessage(v.TransferFromAccountNamePlaceholder),t=this.state.formatMessage(v.TransferToAccountNamePlaceholder),o=this.state.formatMessage(v.TransferContractPlaceholder),i=this.state.formatMessage(v.TransferQuantityPlaceholder),l=this.state.formatMessage(v.TransferDigitPlaceholder),f=this.state.formatMessage(v.TransferSymbolPlaceholder),u=this.state.formatMessage(v.TransferMemoPlaceholder),m=this.state.formatMessage(v.TransferMemoHelp),p=this.state.formatMessage(v.FromLabel),d=this.state.formatMessage(v.ToLabel),y=this.state.formatMessage(v.ContractLabel),b=this.state.formatMessage(v.QuantityLabel),M=this.state.formatMessage(v.DigitLabel),S=this.state.formatMessage(v.SymbolLabel);return O(h.b,{},void 0,O(h.c,{},void 0,O(h.a,{},void 0,c.a.createElement(w,C({},g.a,{label:p,colon:!0}),e("FromAccountName",{rules:[{required:!0,message:a}]})(O(r.a,{prefix:O(n.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:a}))),c.a.createElement(w,C({},g.a,{label:d,colon:!0}),e("ToAccountName",{rules:[{required:!0,message:t}]})(O(r.a,{prefix:O(n.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:t}))),c.a.createElement(w,C({},g.a,{label:y,colon:!0}),e("transferContract",{initialValue:"eosio.token",rules:[{required:!0,message:o}]})(O(r.a,{prefix:O(n.a,{type:"pay-circle-o",style:{color:"rgba(0,0,0,.25)"}}),placeholder:o}))),c.a.createElement(w,C({},g.a,{label:b,colon:!0}),e("transferQuantity",{rules:[{required:!0,message:i}]})(O(r.a,{prefix:O(n.a,{type:"pay-circle-o",style:{color:"rgba(0,0,0,.25)"}}),placeholder:i}))),c.a.createElement(w,C({},g.a,{label:M,colon:!0}),e("transferDigit",{rules:[{required:!0,message:l}],initialValue:"4"})(O(s.a,{style:{width:"100%"},placeholder:l},void 0,O(B,{value:"4"},"4","4"),O(B,{value:"3"},"3","3")))),c.a.createElement(w,C({},g.a,{label:S,colon:!0}),e("transferSymbol",{initialValue:"EOS",rules:[{required:!0,message:f}]})(O(r.a,{prefix:O(n.a,{type:"pay-circle-o",style:{color:"rgba(0,0,0,.25)"}}),placeholder:f}))),c.a.createElement(w,C({help:m},g.a,{label:"Memo",colon:!0}),e("transferMemo",{rules:[{required:!1,message:u}]})(O(r.a,{prefix:O(n.a,{type:"pay-circle-o",style:{color:"rgba(0,0,0,.25)"}}),placeholder:u}))),O(_.a,{form:this.props.form,formatMessage:this.state.formatMessage,GetTransactionButtonClick:this.handleGetTransaction,GetTransactionButtonLoading:this.state.GetTransactionButtonLoading,GetTransactionButtonState:this.state.GetTransactionButtonState,QrCodeValue:this.state.QrCodeValue,CopyTransactionButtonState:this.state.CopyTransactionButtonState,handleCopyTransaction:this.handleCopyTransaction}),O(T.a,{form:this.props.form,formatMessage:this.state.formatMessage,GetTransactionButtonState:this.state.GetTransactionButtonState,UnSignedTransaction:this.state.transaction,SelectedNetWork:this.props.SelectedNetWork}))))}}]),a}(),L=Object(l.injectIntl)(x),N=o.a.create()(L),j=Object(u.b)({SelectedNetWork:Object(S.b)()});a.default=Object(f.connect)(j)(N)},"47eedf4f6744b24aaf33":function(e,a,t){"use strict";t("d0412dc14390ed739732");var n,r=t("debcade008ca58960500"),s=(t("1ca67b639199cb765139"),t("2688cdc98aed61204a0c")),o=(t("071298eee1e85f371cb3"),t("8ca0435fe92d5e05db5b")),i=(t("d0b22e7450f404c3c82d"),t("c4ebd3259ab3503eb095")),c=t("8af190b70a6bc55c6f1b"),l=(t("8a2d1b95e05b6a321e74"),t("c34c7d5c307e1dafdb1e")),f=t.n(l),u=t("f607f491151ddcb274e0"),m=t.n(u),p=t("9cada3e1a82441d5dc97"),d=t("537e9378f1e5205c76aa"),y=(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,a,t,r){var s=e&&e.defaultProps,o=arguments.length-3;if(a||0===o||(a={}),a&&s)for(var i in s)void 0===a[i]&&(a[i]=s[i]);else a||(a=s||{});if(1===o)a.children=r;else if(o>1){for(var c=Array(o),l=0;l<o;l++)c[l]=arguments[l+3];a.children=c}return{$$typeof:n,type:e,key:void 0===t?null:""+t,ref:null,props:a,_owner:null}}),b=function(){function e(e,a){for(var t=0;t<a.length;t++){var n=a[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(a,t,n){return t&&e(a.prototype,t),n&&e(a,n),a}}();var g=i.a.Item,h=o.a.TextArea,T=function(e){function a(e){!function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,a){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!a||"object"!=typeof a&&"function"!=typeof a?e:a}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.handleCopyTransaction=function(){if(t.props.GetTransactionButtonState){var e=t.props.form.getFieldsValue().transaction;m()(e),Object(d.f)(t.props.formatMessage)}},t.state={CopyTransactionButtonState:!1},t}return function(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function, not "+typeof a);e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),a&&(Object.setPrototypeOf?Object.setPrototypeOf(e,a):e.__proto__=a)}(a,c["Component"]),b(a,[{key:"componentWillReceiveProps",value:function(e){e.transaction&&this.setState({CopyTransactionButtonState:e.GetTransactionButtonState&&!!e.transaction})}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,a=this.props.formatMessage(p.a.GetTransactionFormItemButtonName),t=this.props.formatMessage(p.a.CopyAlertMessage),n=this.props.formatMessage(p.a.CopyAlertDescription),o=this.props.formatMessage(p.a.TransactionTextAreaPlaceholder),i=this.props.formatMessage(p.a.CopyTransactionButtonName);return y("div",{},void 0,y(g,{},void 0,y(s.a,{type:"primary",className:"form-button",onClick:this.props.GetTransactionButtonClick,disabled:!this.props.GetTransactionButtonState},void 0,a)),y(g,{},void 0,y(r.a,{message:t,description:n,type:"info",closable:!0})),y(g,{},void 0,e("transaction",{rules:[{required:!0,message:o}]})(y(h,{disabled:"true",placeholder:o}))),y(g,{},void 0,y("div",{style:{textAlign:"center"}},void 0,y(f.a,{value:this.props.QrCodeValue,size:256}))),y(g,{},void 0,y(s.a,{type:"primary",className:"form-button",disabled:!this.props.GetTransactionButtonState,onClick:this.handleCopyTransaction},void 0,i)))}}]),a}();a.a=T}}]);