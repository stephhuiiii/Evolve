/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
!function(){function e(e){return e.type==CKEDITOR.NODE_TEXT&&0<e.getLength()&&(!n||!e.isReadOnly())}function t(e){return!(e.type==CKEDITOR.NODE_ELEMENT&&e.isBlockBoundary(CKEDITOR.tools.extend({},CKEDITOR.dtd.$empty,CKEDITOR.dtd.$nonEditable)))}var n,i=function(){return{textNode:this.textNode,offset:this.offset,character:this.textNode?this.textNode.getText().charAt(this.offset):null,hitMatchBoundary:this._.matchBoundary}},a=["find","replace"],o=[["txtFindFind","txtFindReplace"],["txtFindCaseChk","txtReplaceCaseChk"],["txtFindWordChk","txtReplaceWordChk"],["txtFindCyclic","txtReplaceCyclic"]],r=function(r,s){function l(e,t){var n=r.createRange();return n.setStart(e.textNode,t?e.offset:e.offset+1),n.setEndAt(r.editable(),CKEDITOR.POSITION_BEFORE_END),n}function c(e){var t=r.getSelection(),n=r.editable();return t&&!e?(e=t.getRanges()[0].clone(),e.collapse(!0)):(e=r.createRange(),e.setStartAt(n,CKEDITOR.POSITION_AFTER_START)),e.setEndAt(n,CKEDITOR.POSITION_BEFORE_END),e}var u=new CKEDITOR.style(CKEDITOR.tools.extend({attributes:{"data-cke-highlight":1},fullMatch:1,ignoreReadonly:1,childRule:function(){return 0}},r.config.find_highlight,!0)),d=function(n,i){var a=this,o=new CKEDITOR.dom.walker(n);o.guard=i?t:function(e){!t(e)&&(a._.matchBoundary=!0)},o.evaluator=e,o.breakOnFalse=1,n.startContainer.type==CKEDITOR.NODE_TEXT&&(this.textNode=n.startContainer,this.offset=n.startOffset-1),this._={matchWord:i,walker:o,matchBoundary:!1}};d.prototype={next:function(){return this.move()},back:function(){return this.move(!0)},move:function(e){var t=this.textNode;if(null===t)return i.call(this);if(this._.matchBoundary=!1,t&&e&&0<this.offset)this.offset--;else if(t&&this.offset<t.getLength()-1)this.offset++;else{for(t=null;!(t||(t=this._.walker[e?"previous":"next"].call(this._.walker),this._.matchWord&&!t||this._.walker._.end)););this.offset=(this.textNode=t)?e?t.getLength()-1:0:0}return i.call(this)}};var p=function(e,t){this._={walker:e,cursors:[],rangeLength:t,highlightRange:null,isMatched:0}};p.prototype={toDomRange:function(){var e=r.createRange(),t=this._.cursors;if(1>t.length){var n=this._.walker.textNode;if(!n)return null;e.setStartAfter(n)}else n=t[0],t=t[t.length-1],e.setStart(n.textNode,n.offset),e.setEnd(t.textNode,t.offset+1);return e},updateFromDomRange:function(e){var t=new d(e);this._.cursors=[];do e=t.next(),e.character&&this._.cursors.push(e);while(e.character);this._.rangeLength=this._.cursors.length},setMatched:function(){this._.isMatched=!0},clearMatched:function(){this._.isMatched=!1},isMatched:function(){return this._.isMatched},highlight:function(){if(!(1>this._.cursors.length)){this._.highlightRange&&this.removeHighlight();var e=this.toDomRange(),t=e.createBookmark();u.applyToRange(e),e.moveToBookmark(t),this._.highlightRange=e,t=e.startContainer,t.type!=CKEDITOR.NODE_ELEMENT&&(t=t.getParent()),t.scrollIntoView(),this.updateFromDomRange(e)}},removeHighlight:function(){if(this._.highlightRange){var e=this._.highlightRange.createBookmark();u.removeFromRange(this._.highlightRange),this._.highlightRange.moveToBookmark(e),this.updateFromDomRange(this._.highlightRange),this._.highlightRange=null}},isReadOnly:function(){return this._.highlightRange?this._.highlightRange.startContainer.isReadOnly():0},moveBack:function(){var e=this._.walker.back(),t=this._.cursors;return e.hitMatchBoundary&&(this._.cursors=t=[]),t.unshift(e),t.length>this._.rangeLength&&t.pop(),e},moveNext:function(){var e=this._.walker.next(),t=this._.cursors;return e.hitMatchBoundary&&(this._.cursors=t=[]),t.push(e),t.length>this._.rangeLength&&t.shift(),e},getEndCharacter:function(){var e=this._.cursors;return 1>e.length?null:e[e.length-1].character},getNextCharacterRange:function(e){var t,n;return n=this._.cursors,n=(t=n[n.length-1])&&t.textNode?new d(l(t)):this._.walker,new p(n,e)},getCursors:function(){return this._.cursors}};var h=function(e,t){var n=[-1];t&&(e=e.toLowerCase());for(var i=0;i<e.length;i++)for(n.push(n[i]+1);0<n[i+1]&&e.charAt(i)!=e.charAt(n[i+1]-1);)n[i+1]=n[n[i+1]-1]+1;this._={overlap:n,state:0,ignoreCase:!!t,pattern:e}};h.prototype={feedCharacter:function(e){for(this._.ignoreCase&&(e=e.toLowerCase());;){if(e==this._.pattern.charAt(this._.state))return this._.state++,this._.state==this._.pattern.length?(this._.state=0,2):1;if(!this._.state)return 0;this._.state=this._.overlap[this._.state]}return null},reset:function(){this._.state=0}};var m=/[.,"'?!;: \u0085\u00a0\u1680\u280e\u2028\u2029\u202f\u205f\u3000]/,g=function(e){if(!e)return!0;var t=e.charCodeAt(0);return t>=9&&13>=t||t>=8192&&8202>=t||m.test(e)},f={searchRange:null,matchRange:null,find:function(e,t,n,i,a,o){this.matchRange?(this.matchRange.removeHighlight(),this.matchRange=this.matchRange.getNextCharacterRange(e.length)):this.matchRange=new p(new d(this.searchRange),e.length);for(var s=new h(e,!t),u=0,m="%";null!==m;){for(this.matchRange.moveNext();(m=this.matchRange.getEndCharacter())&&(u=s.feedCharacter(m),2!=u);)this.matchRange.moveNext().hitMatchBoundary&&s.reset();if(2==u){if(n){var f=this.matchRange.getCursors(),v=f[f.length-1],f=f[0],b=r.createRange();if(b.setStartAt(r.editable(),CKEDITOR.POSITION_AFTER_START),b.setEnd(f.textNode,f.offset),f=b,v=l(v),f.trim(),v.trim(),f=new d(f,!0),v=new d(v,!0),!g(f.back().character)||!g(v.next().character))continue}return this.matchRange.setMatched(),!1!==a&&this.matchRange.highlight(),!0}}return this.matchRange.clearMatched(),this.matchRange.removeHighlight(),i&&!o?(this.searchRange=c(1),this.matchRange=null,arguments.callee.apply(this,Array.prototype.slice.call(arguments).concat([!0]))):!1},replaceCounter:0,replace:function(e,t,i,a,o,s,l){if(n=1,e=0,this.matchRange&&this.matchRange.isMatched()&&!this.matchRange._.isReplaced&&!this.matchRange.isReadOnly()){if(this.matchRange.removeHighlight(),t=this.matchRange.toDomRange(),i=r.document.createText(i),!l){var c=r.getSelection();c.selectRanges([t]),r.fire("saveSnapshot")}t.deleteContents(),t.insertNode(i),l||(c.selectRanges([t]),r.fire("saveSnapshot")),this.matchRange.updateFromDomRange(t),l||this.matchRange.highlight(),this.matchRange._.isReplaced=!0,this.replaceCounter++,e=1}else e=this.find(t,a,o,s,!l);return n=0,e}},v=r.lang.find;return{title:v.title,resizable:CKEDITOR.DIALOG_RESIZE_NONE,minWidth:350,minHeight:170,buttons:[CKEDITOR.dialog.cancelButton(r,{label:r.lang.common.close})],contents:[{id:"find",label:v.find,title:v.find,accessKey:"",elements:[{type:"hbox",widths:["230px","90px"],children:[{type:"text",id:"txtFindFind",label:v.findWhat,isChanged:!1,labelLayout:"horizontal",accessKey:"F"},{type:"button",id:"btnFind",align:"left",style:"width:100%",label:v.find,onClick:function(){var e=this.getDialog();f.find(e.getValueOf("find","txtFindFind"),e.getValueOf("find","txtFindCaseChk"),e.getValueOf("find","txtFindWordChk"),e.getValueOf("find","txtFindCyclic"))||alert(v.notFoundMsg)}}]},{type:"fieldset",label:CKEDITOR.tools.htmlEncode(v.findOptions),style:"margin-top:29px",children:[{type:"vbox",padding:0,children:[{type:"checkbox",id:"txtFindCaseChk",isChanged:!1,label:v.matchCase},{type:"checkbox",id:"txtFindWordChk",isChanged:!1,label:v.matchWord},{type:"checkbox",id:"txtFindCyclic",isChanged:!1,"default":!0,label:v.matchCyclic}]}]}]},{id:"replace",label:v.replace,accessKey:"M",elements:[{type:"hbox",widths:["230px","90px"],children:[{type:"text",id:"txtFindReplace",label:v.findWhat,isChanged:!1,labelLayout:"horizontal",accessKey:"F"},{type:"button",id:"btnFindReplace",align:"left",style:"width:100%",label:v.replace,onClick:function(){var e=this.getDialog();f.replace(e,e.getValueOf("replace","txtFindReplace"),e.getValueOf("replace","txtReplace"),e.getValueOf("replace","txtReplaceCaseChk"),e.getValueOf("replace","txtReplaceWordChk"),e.getValueOf("replace","txtReplaceCyclic"))||alert(v.notFoundMsg)}}]},{type:"hbox",widths:["230px","90px"],children:[{type:"text",id:"txtReplace",label:v.replaceWith,isChanged:!1,labelLayout:"horizontal",accessKey:"R"},{type:"button",id:"btnReplaceAll",align:"left",style:"width:100%",label:v.replaceAll,isChanged:!1,onClick:function(){var e=this.getDialog();for(f.replaceCounter=0,f.searchRange=c(1),f.matchRange&&(f.matchRange.removeHighlight(),f.matchRange=null),r.fire("saveSnapshot");f.replace(e,e.getValueOf("replace","txtFindReplace"),e.getValueOf("replace","txtReplace"),e.getValueOf("replace","txtReplaceCaseChk"),e.getValueOf("replace","txtReplaceWordChk"),!1,!0););f.replaceCounter?(alert(v.replaceSuccessMsg.replace(/%1/,f.replaceCounter)),r.fire("saveSnapshot")):alert(v.notFoundMsg)}}]},{type:"fieldset",label:CKEDITOR.tools.htmlEncode(v.findOptions),children:[{type:"vbox",padding:0,children:[{type:"checkbox",id:"txtReplaceCaseChk",isChanged:!1,label:v.matchCase},{type:"checkbox",id:"txtReplaceWordChk",isChanged:!1,label:v.matchWord},{type:"checkbox",id:"txtReplaceCyclic",isChanged:!1,"default":!0,label:v.matchCyclic}]}]}]}],onLoad:function(){var e,t=this,n=0;this.on("hide",function(){n=0}),this.on("show",function(){n=1}),this.selectPage=CKEDITOR.tools.override(this.selectPage,function(i){return function(r){i.call(t,r);var s,l=t._.tabs[r];if(s="find"===r?"txtFindWordChk":"txtReplaceWordChk",e=t.getContentElement(r,"find"===r?"txtFindFind":"txtFindReplace"),t.getContentElement(r,s),l.initialized||(CKEDITOR.document.getById(e._.inputId),l.initialized=!0),n){var c,u,r="find"===r?1:0,l=1-r,d=o.length;for(u=0;d>u;u++)s=this.getContentElement(a[r],o[u][r]),c=this.getContentElement(a[l],o[u][l]),c.setValue(s.getValue())}}})},onShow:function(){f.searchRange=c();var e=this.getParentEditor().getSelection().getSelectedText(),t=this.getContentElement(s,"find"==s?"txtFindFind":"txtFindReplace");t.setValue(e),t.select(),this.selectPage(s),this[("find"==s&&this._.editor.readOnly?"hide":"show")+"Page"]("replace")},onHide:function(){var e;f.matchRange&&f.matchRange.isMatched()&&(f.matchRange.removeHighlight(),r.focus(),(e=f.matchRange.toDomRange())&&r.getSelection().selectRanges([e])),delete f.matchRange},onFocus:function(){return"replace"==s?this.getContentElement("replace","txtFindReplace"):this.getContentElement("find","txtFindFind")}}};CKEDITOR.dialog.add("find",function(e){return r(e,"find")}),CKEDITOR.dialog.add("replace",function(e){return r(e,"replace")})}();