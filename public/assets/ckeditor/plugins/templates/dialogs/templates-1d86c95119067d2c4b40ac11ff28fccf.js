/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
!function(){CKEDITOR.dialog.add("templates",function(e){function t(e,t){var i=CKEDITOR.dom.element.createFromHtml('<a href="javascript:void(0)" tabIndex="-1" role="option" ><div class="cke_tpl_item"></div></a>'),a='<table style="width:350px;" class="cke_tpl_preview" role="presentation"><tr>';return e.image&&t&&(a+='<td class="cke_tpl_preview_img"><img src="'+CKEDITOR.getUrl(t+e.image)+'"'+(CKEDITOR.env.ie6Compat?' onload="this.width=this.width"':"")+' alt="" title=""></td>'),a+='<td style="white-space:normal;"><span class="cke_tpl_title">'+e.title+"</span><br/>",e.description&&(a+="<span>"+e.description+"</span>"),i.getFirst().setHtml(a+"</td></tr></table>"),i.on("click",function(){n(e.html)}),i}function n(t){var n=CKEDITOR.dialog.getCurrent();n.getValueOf("selectTpl","chkInsertOpt")?(e.fire("saveSnapshot"),e.setData(t,function(){n.hide();var t=e.createRange();t.moveToElementEditStart(e.editable()),t.select(),setTimeout(function(){e.fire("saveSnapshot")},0)})):(e.insertHtml(t),n.hide())}function i(e){var t=e.data.getTarget(),n=o.equals(t);if(n||o.contains(t)){var i,a=e.data.getKeystroke(),r=o.getElementsByTag("a");if(r){if(n)i=r.getItem(0);else switch(a){case 40:i=t.getNext();break;case 38:i=t.getPrevious();break;case 13:case 32:t.fire("click")}i&&(i.focus(),e.data.preventDefault())}}}var a=CKEDITOR.plugins.get("templates");CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(a.path+"dialogs/templates.css"));var o,a="cke_tpl_list_label_"+CKEDITOR.tools.getNextNumber(),r=e.lang.templates,s=e.config;return{title:e.lang.templates.title,minWidth:CKEDITOR.env.ie?440:400,minHeight:340,contents:[{id:"selectTpl",label:r.title,elements:[{type:"vbox",padding:5,children:[{id:"selectTplText",type:"html",html:"<span>"+r.selectPromptMsg+"</span>"},{id:"templatesList",type:"html",focus:!0,html:'<div class="cke_tpl_list" tabIndex="-1" role="listbox" aria-labelledby="'+a+'"><div class="cke_tpl_loading"><span></span></div></div><span class="cke_voice_label" id="'+a+'">'+r.options+"</span>"},{id:"chkInsertOpt",type:"checkbox",label:r.insertOption,"default":s.templates_replaceContent}]}]}],buttons:[CKEDITOR.dialog.cancelButton],onShow:function(){var e=this.getContentElement("selectTpl","templatesList");o=e.getElement(),CKEDITOR.loadTemplates(s.templates_files,function(){var n=(s.templates||"default").split(",");if(n.length){var i=o;i.setHtml("");for(var a=0,l=n.length;l>a;a++)for(var c=CKEDITOR.getTemplates(n[a]),u=c.imagesPath,c=c.templates,d=c.length,p=0;d>p;p++){var h=t(c[p],u);h.setAttribute("aria-posinset",p+1),h.setAttribute("aria-setsize",d),i.append(h)}e.focus()}else o.setHtml('<div class="cke_tpl_empty"><span>'+r.emptyListMsg+"</span></div>")}),this._.element.on("keydown",i)},onHide:function(){this._.element.removeListener("keydown",i)}}})}();