CKEDITOR.dialog.add("doksoft_maps",function(e){return{title:"DOKSoft Maps",resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minHeight:550,contents:[{id:"preview",label:"1111",elements:[{type:"html",id:"previewHtml",html:'<iframe src="'+e.path+'dialogs/doksoft_maps.html" style="width: 100%; height: 540px" hidefocus="true" frameborder="0" id="cke_docProps_preview_iframe"></iframe>'}]}],onShow:function(){var e=this.getSelectedElement();if(e&&e.is("img")&&"doksoft_maps_img"==e.$.className){this.parts.title.$.innerHTML="Edit map";try{CKEDITOR.config.doksoft_maps_current=JSON.parse(decodeURIComponent(e.$.getAttribute("data_script")))}catch(t){CKEDITOR.config.doksoft_maps_current=null}CKEDITOR.config.doksoft_maps_current&&loadMapFromJSON(CKEDITOR.config.doksoft_maps_current)}else{this.parts.title.$.innerHTML="Insert new map";try{loadMapFromJSON({lat:CKEDITOR.config.doksoft_maps_default_x,lng:CKEDITOR.config.doksoft_maps_default_y,zoom:CKEDITOR.config.doksoft_maps_default_zoom,type:"roadmap",width:CKEDITOR.config.doksoft_maps_width,height:CKEDITOR.config.doksoft_maps_height,settings:{disableDefaultUI:0,disableDoubleClickZoom:0,draggable:1,mapTypeControl:1,zoomControl:1,rotateControl:0,scaleControl:0,streetViewControl:0,panControl:0,overviewMapControl:0}})}catch(t){}}},onLoad:function(){this.on("resize",function(e){document.getElementById("cke_docProps_preview_iframe").style.height=e.data.height+"px",triggerResize&&triggerResize.call&&triggerResize(e.data.height-60)})},onOk:function(){var t='<img class="doksoft_maps_img" contenteditable="false" data_script="'+encodeURIComponent(JSON.stringify(generateCodeMap()))+'" src="'+generateStatMap(generateCodeMap())+'"/>',n=CKEDITOR.dom.element.createFromHtml(t);e.insertElement(n)}}});