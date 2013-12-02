/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
!function(){function e(e){for(var e=e.toUpperCase(),t=l.length,n=0,i=0;t>i;++i)for(var a=l[i],o=a[1].length;e.substr(0,o)==a[1];e=e.substr(o))n+=a[0];return n}function t(e){for(var e=e.toUpperCase(),t=d.length,n=1,i=1;0<e.length;i*=t)n+=d.indexOf(e.charAt(e.length-1))*i,e=e.substr(0,e.length-1);return n}var n=CKEDITOR.htmlParser.fragment.prototype,i=CKEDITOR.htmlParser.element.prototype;n.onlyChild=i.onlyChild=function(){var e=this.children;return 1==e.length&&e[0]||null},i.removeAnyChildWithName=function(e){for(var t,n=this.children,i=[],a=0;a<n.length;a++)t=n[a],t.name&&(t.name==e&&(i.push(t),n.splice(a--,1)),i=i.concat(t.removeAnyChildWithName(e)));return i},i.getAncestor=function(e){for(var t=this.parent;t&&(!t.name||!t.name.match(e));)t=t.parent;return t},n.firstChild=i.firstChild=function(e){for(var t,n=0;n<this.children.length;n++)if(t=this.children[n],e(t)||t.name&&(t=t.firstChild(e)))return t;return null},i.addStyle=function(e,t,n){var i="";if("string"==typeof t)i+=e+":"+t+";";else{if("object"==typeof e)for(var a in e)e.hasOwnProperty(a)&&(i+=a+":"+e[a]+";");else i+=e;n=t}this.attributes||(this.attributes={}),e=this.attributes.style||"",e=(n?[i,e]:[e,i]).join(";"),this.attributes.style=e.replace(/^;|;(?=;)/,"")},i.getStyle=function(e){var t=this.attributes.style;return t?(t=CKEDITOR.tools.parseCssText(t,1),t[e]):void 0},CKEDITOR.dtd.parentOf=function(e){var t,n={};for(t in this)-1==t.indexOf("$")&&this[t][e]&&(n[t]=1);return n};var a,o=/^([.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i,r=/^(?:\b0[^\s]*\s*){1,4}$/,s={ol:{decimal:/\d+/,"lower-roman":/^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,"upper-roman":/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,"lower-alpha":/^[a-z]+$/,"upper-alpha":/^[A-Z]+$/},ul:{disc:/[l\u00B7\u2002]/,circle:/[\u006F\u00D8]/,square:/[\u006E\u25C6]/}},l=[[1e3,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],d="ABCDEFGHIJKLMNOPQRSTUVWXYZ",c=0,u=null,p=CKEDITOR.plugins.pastefromword={utils:{createListBulletMarker:function(e,t){var n=new CKEDITOR.htmlParser.element("cke:listbullet");return n.attributes={"cke:listsymbol":e[0]},n.add(new CKEDITOR.htmlParser.text(t)),n},isListBulletIndicator:function(e){return/mso-list\s*:\s*Ignore/i.test(e.attributes&&e.attributes.style)?!0:void 0},isContainingOnlySpaces:function(e){var t;return(t=e.onlyChild())&&/^(:?\s|&nbsp;)+$/.test(t.value)},resolveList:function(e){var t,n=e.attributes;return(t=e.removeAnyChildWithName("cke:listbullet"))&&t.length&&(t=t[0])?(e.name="cke:li",n.style&&(n.style=p.filters.stylesFilter([["text-indent"],["line-height"],[/^margin(:?-left)?$/,null,function(e){e=e.split(" "),e=CKEDITOR.tools.convertToPx(e[3]||e[1]||e[0]),!c&&null!==u&&e>u&&(c=e-u),u=e,n["cke:indent"]=c&&Math.ceil(e/c)+1||1}],[/^mso-list$/,null,function(e){var e=e.split(" "),t=Number(e[0].match(/\d+/)),e=Number(e[1].match(/\d+/));1==e&&(t!==a&&(n["cke:reset"]=1),a=t),n["cke:indent"]=e}]])(n.style,e)||""),n["cke:indent"]||(u=0,n["cke:indent"]=1),CKEDITOR.tools.extend(n,t.attributes),!0):(a=u=c=null,!1)},getStyleComponents:function(){var e=CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;"></div>',CKEDITOR.document);return CKEDITOR.document.getBody().append(e),function(t,n,i){e.setStyle(t,n);for(var t={},n=i.length,a=0;n>a;a++)t[i[a]]=e.getStyle(i[a]);return t}}(),listDtdParents:CKEDITOR.dtd.parentOf("ol")},filters:{flattenList:function(e,t){var n,t="number"==typeof t?t:1,i=e.attributes;switch(i.type){case"a":n="lower-alpha";break;case"1":n="decimal"}for(var r,s=e.children,l=0;l<s.length;l++)if(r=s[l],r.name in CKEDITOR.dtd.$listItem){var d=r.attributes,c=r.children,h=c[c.length-1];h.name in CKEDITOR.dtd.$list&&(e.add(h,l+1),--c.length||s.splice(l--,1)),r.name="cke:li",i.start&&!l&&(d.value=i.start),p.filters.stylesFilter([["tab-stops",null,function(e){(e=e.split(" ")[1].match(o))&&(u=CKEDITOR.tools.convertToPx(e[0]))}],1==t?["mso-list",null,function(e){e=e.split(" "),e=Number(e[0].match(/\d+/)),e!==a&&(d["cke:reset"]=1),a=e}]:null])(d.style),d["cke:indent"]=t,d["cke:listtype"]=e.name,d["cke:list-style-type"]=n}else if(r.name in CKEDITOR.dtd.$list){for(arguments.callee.apply(this,[r,t+1]),s=s.slice(0,l).concat(r.children).concat(s.slice(l+1)),e.children=[],r=0,c=s.length;c>r;r++)e.add(s[r]);s=e.children}delete e.name,i["cke:list"]=1},assembleList:function(n){for(var i,o,r,l,d,p,h,m,g,f,b,v,T=n.children,n=[],C=0;C<T.length;C++)if(i=T[C],"cke:li"==i.name)if(i.name="li",o=i.attributes,g=(g=o["cke:listsymbol"])&&g.match(/^(?:[(]?)([^\s]+?)([.)]?)$/),f=b=v=null,o["cke:ignored"])T.splice(C--,1);else{if(o["cke:reset"]&&(p=l=d=null),r=Number(o["cke:indent"]),r!=l&&(m=h=null),g){if(m&&s[m][h].test(g[1]))f=m,b=h;else for(var E in s)for(var y in s[E])if(s[E][y].test(g[1])){if("ol"!=E||!/alpha|roman/.test(y)){f=E,b=y;break}h=/roman/.test(y)?e(g[1]):t(g[1]),(!v||v>h)&&(v=h,f=E,b=y)}!f&&(f=g[2]?"ol":"ul")}else f=o["cke:listtype"]||"ol",b=o["cke:list-style-type"];if(m=f,h=b||("ol"==f?"decimal":"disc"),b&&b!=("ol"==f?"decimal":"disc")&&i.addStyle("list-style-type",b),"ol"==f&&g){switch(b){case"decimal":v=Number(g[1]);break;case"lower-roman":case"upper-roman":v=e(g[1]);break;case"lower-alpha":case"upper-alpha":v=t(g[1])}i.attributes.value=v}if(p){if(r>l)n.push(p=new CKEDITOR.htmlParser.element(f)),p.add(i),d.add(p);else{if(l>r){l-=r;for(var k;l--&&(k=p.parent);)p=k.parent}p.add(i)}T.splice(C--,1)}else n.push(p=new CKEDITOR.htmlParser.element(f)),p.add(i),T[C]=p;d=i,l=r}else p&&(p=l=d=null);for(C=0;C<n.length;C++)if(p=n[C],E=p.children,h=h=void 0,y=p.children.length,k=h=void 0,T=/list-style-type:(.*?)(?:;|$)/,l=CKEDITOR.plugins.pastefromword.filters.stylesFilter,h=p.attributes,!T.exec(h.style)){for(d=0;y>d;d++)if(h=E[d],h.attributes.value&&Number(h.attributes.value)==d+1&&delete h.attributes.value,h=T.exec(h.attributes.style)){if(h[1]!=k&&k){k=null;break}k=h[1]}if(k){for(d=0;y>d;d++)h=E[d].attributes,h.style&&(h.style=l([["list-style-type"]])(h.style)||"");p.addStyle("list-style-type",k)}}a=u=c=null},falsyFilter:function(){return!1},stylesFilter:function(e,t){return function(n,i){var a=[];(n||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(n,o,r){o=o.toLowerCase(),"font-family"==o&&(r=r.replace(/["']/g,""));for(var s,l,d,c=0;c<e.length;c++)if(e[c]&&(n=e[c][0],s=e[c][1],l=e[c][2],d=e[c][3],o.match(n)&&(!s||r.match(s))))return o=d||o,t&&(l=l||r),"function"==typeof l&&(l=l(r,i,o)),l&&l.push&&(o=l[0],l=l[1]),"string"==typeof l&&a.push([o,l]),void 0;!t&&a.push([o,r])});for(var o=0;o<a.length;o++)a[o]=a[o].join(":");return a.length?a.join(";")+";":!1}},elementMigrateFilter:function(e,t){return e?function(n){var i=t?new CKEDITOR.style(e,t)._.definition:e;n.name=i.element,CKEDITOR.tools.extend(n.attributes,CKEDITOR.tools.clone(i.attributes)),n.addStyle(CKEDITOR.style.getStyleText(i))}:function(){}},styleMigrateFilter:function(e,t){var n=this.elementMigrateFilter;return e?function(i,a){var o=new CKEDITOR.htmlParser.element(null),r={};r[t]=i,n(e,r)(o),o.children=a.children,a.children=[o],o.filter=function(){},o.parent=a}:function(){}},bogusAttrFilter:function(e,t){return-1==t.name.indexOf("cke:")?!1:void 0},applyStyleFilter:null},getRules:function(e,t){var n=CKEDITOR.dtd,i=CKEDITOR.tools.extend({},n.$block,n.$listItem,n.$tableContent),a=e.config,o=this.filters,s=o.falsyFilter,l=o.stylesFilter,d=o.elementMigrateFilter,c=CKEDITOR.tools.bind(this.filters.styleMigrateFilter,this.filters),u=this.utils.createListBulletMarker,p=o.flattenList,h=o.assembleList,m=this.utils.isListBulletIndicator,g=this.utils.isContainingOnlySpaces,f=this.utils.resolveList,b=function(e){return e=CKEDITOR.tools.convertToPx(e),isNaN(e)?e:e+"px"},v=this.utils.getStyleComponents,T=this.utils.listDtdParents,C=!1!==a.pasteFromWordRemoveFontStyles,E=!1!==a.pasteFromWordRemoveStyles;return{elementNames:[[/meta|link|script/,""]],root:function(e){e.filterChildren(t),h(e)},elements:{"^":function(e){var t;CKEDITOR.env.gecko&&(t=o.applyStyleFilter)&&t(e)},$:function(e){var o=e.name||"",r=e.attributes;if(o in i&&r.style&&(r.style=l([[/^(:?width|height)$/,null,b]])(r.style)||""),o.match(/h\d/)){if(e.filterChildren(t),f(e))return;d(a["format_"+o])(e)}else if(o in n.$inline)e.filterChildren(t),g(e)&&delete e.name;else if(-1!=o.indexOf(":")&&-1==o.indexOf("cke")){if(e.filterChildren(t),"v:imagedata"==o)return(o=e.attributes["o:href"])&&(e.attributes.src=o),e.name="img",void 0;delete e.name}o in T&&(e.filterChildren(t),h(e))},style:function(e){if(CKEDITOR.env.gecko){var e=(e=e.onlyChild().value.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/))&&e[1],t={};e&&(e.replace(/[\n\r]/g,"").replace(/(.+?)\{(.+?)\}/g,function(e,n,i){for(var n=n.split(","),e=n.length,a=0;e>a;a++)CKEDITOR.tools.trim(n[a]).replace(/^(\w+)(\.[\w-]+)?$/g,function(e,n,a){n=n||"*",a=a.substring(1,a.length),a.match(/MsoNormal/)||(t[n]||(t[n]={}),a?t[n][a]=i:t[n]=i)})}),o.applyStyleFilter=function(e){var n=t["*"]?"*":e.name,i=e.attributes&&e.attributes["class"];n in t&&(n=t[n],"object"==typeof n&&(n=n[i]),n&&e.addStyle(n,!0))})}return!1},p:function(e){if(/MsoListParagraph/i.exec(e.attributes["class"])||e.getStyle("mso-list")){var n=e.firstChild(function(e){return e.type==CKEDITOR.NODE_TEXT&&!g(e.parent)});(n=n&&n.parent)&&n.addStyle("mso-list","Ignore")}e.filterChildren(t),f(e)||(a.enterMode==CKEDITOR.ENTER_BR?(delete e.name,e.add(new CKEDITOR.htmlParser.element("br"))):d(a["format_"+(a.enterMode==CKEDITOR.ENTER_P?"p":"div")])(e))},div:function(e){var t=e.onlyChild();if(t&&"table"==t.name){var n=e.attributes;t.attributes=CKEDITOR.tools.extend(t.attributes,n),n.style&&t.addStyle(n.style),t=new CKEDITOR.htmlParser.element("div"),t.addStyle("clear","both"),e.add(t),delete e.name}},td:function(e){e.getAncestor("thead")&&(e.name="th")},ol:p,ul:p,dl:p,font:function(e){if(m(e.parent))delete e.name;else{e.filterChildren(t);var n=e.attributes,i=n.style,a=e.parent;"font"==a.name?(CKEDITOR.tools.extend(a.attributes,e.attributes),i&&a.addStyle(i),delete e.name):(i=i||"",n.color&&("#000000"!=n.color&&(i+="color:"+n.color+";"),delete n.color),n.face&&(i+="font-family:"+n.face+";",delete n.face),n.size&&(i+="font-size:"+(3<n.size?"large":3>n.size?"small":"medium")+";",delete n.size),e.name="span",e.addStyle(i))}},span:function(e){if(m(e.parent))return!1;if(e.filterChildren(t),g(e))return delete e.name,null;if(m(e)){var n=e.firstChild(function(e){return e.value||"img"==e.name}),i=(n=n&&(n.value||"l."))&&n.match(/^(?:[(]?)([^\s]+?)([.)]?)$/);if(i)return n=u(i,n),(e=e.getAncestor("span"))&&/ mso-hide:\s*all|display:\s*none /.test(e.attributes.style)&&(n.attributes["cke:ignored"]=1),n}return(i=(n=e.attributes)&&n.style)&&(n.style=l([["line-height"],[/^font-family$/,null,C?null:c(a.font_style,"family")],[/^font-size$/,null,C?null:c(a.fontSize_style,"size")],[/^color$/,null,C?null:c(a.colorButton_foreStyle,"color")],[/^background-color$/,null,C?null:c(a.colorButton_backStyle,"color")]])(i,e)||""),n.style||delete n.style,CKEDITOR.tools.isEmpty(n)&&delete e.name,null},b:d(a.coreStyles_bold),i:d(a.coreStyles_italic),u:d(a.coreStyles_underline),s:d(a.coreStyles_strike),sup:d(a.coreStyles_superscript),sub:d(a.coreStyles_subscript),a:function(e){e=e.attributes,e.href&&e.href.match(/^file:\/\/\/[\S]+#/i)&&(e.href=e.href.replace(/^file:\/\/\/[^#]+/i,""))},"cke:listbullet":function(e){e.getAncestor(/h\d/)&&!a.pasteFromWordNumberedHeadingToList&&delete e.name}},attributeNames:[[/^onmouse(:?out|over)/,""],[/^onload$/,""],[/(?:v|o):\w+/,""],[/^lang/,""]],attributes:{style:l(E?[[/^list-style-type$/,null],[/^margin$|^margin-(?!bottom|top)/,null,function(e,t,n){if(t.name in{p:1,div:1}){if(t="ltr"==a.contentsLangDirection?"margin-left":"margin-right","margin"==n)e=v(n,e,[t])[t];else if(n!=t)return null;if(e&&!r.test(e))return[t,e]}return null}],[/^clear$/],[/^border.*|margin.*|vertical-align|float$/,null,function(e,t){return"img"==t.name?e:void 0}],[/^width|height$/,null,function(e,t){return t.name in{table:1,td:1,th:1,img:1}?e:void 0}]]:[[/^mso-/],[/-color$/,null,function(e){return"transparent"==e?!1:CKEDITOR.env.gecko?e.replace(/-moz-use-text-color/g,"transparent"):void 0}],[/^margin$/,r],["text-indent","0cm"],["pages-break-before"],["tab-stops"],["display","none"],C?[/font-?/]:null],E),width:function(e,t){return t.name in n.$tableContent?!1:void 0},border:function(e,t){return t.name in n.$tableContent?!1:void 0},"class":s,bgcolor:s,valign:E?s:function(e,t){return t.addStyle("vertical-align",e),!1}},comment:CKEDITOR.env.ie?s:function(e,t){var n=e.match(/<img.*?>/),i=e.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);return i?(i=(n=i[1]||n&&"l.")&&n.match(/>(?:[(]?)([^\s]+?)([.)]?)</),u(i,n)):CKEDITOR.env.gecko&&n?(n=CKEDITOR.htmlParser.fragment.fromHtml(n[0]).children[0],(i=(i=(i=t.previous)&&i.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/))&&i[1])&&(n.attributes.src=i),n):!1}}}},h=function(){this.dataFilter=new CKEDITOR.htmlParser.filter};h.prototype={toHtml:function(e){var e=CKEDITOR.htmlParser.fragment.fromHtml(e),t=new CKEDITOR.htmlParser.basicWriter;return e.writeHtml(t,this.dataFilter),t.getHtml(!0)}},CKEDITOR.cleanWord=function(e,t){CKEDITOR.env.gecko&&(e=e.replace(/(<\!--\[if[^<]*?\])--\>([\S\s]*?)<\!--(\[endif\]--\>)/gi,"$1$2$3")),CKEDITOR.env.webkit&&(e=e.replace(/(class="MsoListParagraph[^>]+><\!--\[if !supportLists\]--\>)([^<]+<span[^<]+<\/span>)(<\!--\[endif\]--\>)/gi,"$1<span>$2</span>$3"));var n=new h,i=n.dataFilter;i.addRules(CKEDITOR.plugins.pastefromword.getRules(t,i)),t.fire("beforeCleanWord",{filter:i});try{e=n.toHtml(e)}catch(a){alert(t.lang.pastefromword.error)}return e=e.replace(/cke:.*?".*?"/g,""),e=e.replace(/style=""/g,""),e=e.replace(/<span>/g,"")}}();