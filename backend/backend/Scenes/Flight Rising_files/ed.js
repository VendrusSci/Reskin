/*****************************************/
// Name: Javascript Textarea BBCode Markup Editor
// Version: 1.3
// Author: Balakrishnan
// Last Modified Date: 25/jan/2009
// License: Free
// URL: http://www.corpocrat.com
/******************************************/

var textarea;
var content;

function edToolbar(obj) {
    document.write("<div>");
	document.write("<img src=\"images/forum_icons/bbcode/forum_bold.png\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnBold\" title=\"Bold\" onClick=\"doAddTags('[b]','[/b]','" + obj + "')\">");
    document.write("<img src=\"images/forum_icons/bbcode/forum_italic.png\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnItalic\" title=\"Italic\" onClick=\"doAddTags('[i]','[/i]','" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_underline.png\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnUnderline\" title=\"Underline\" onClick=\"doAddTags('[u]','[/u]','" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_indent.png\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnIndent\" title=\"Indent\" onClick=\"doAddTags('[indent]','[/indent]','" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_left.png\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnLeft\" title=\"Align Left\" onClick=\"doAddTags('[left]','[/left]','" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_center.png\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnCenter\" title=\"Align Center\" onClick=\"doAddTags('[center]','[/center]','" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_right.png\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnRight\" title=\"Align Right\" onClick=\"doAddTags('[right]','[/right]','" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_link.gif\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnLink\" title=\"Insert URL Link\" onClick=\"doURL('" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_image.gif\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnPicture\" title=\"Insert Image\" onClick=\"doImage('" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_icon.gif\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnEmoji\" title=\"Insert Emoji\" onClick=\"doEmoji('" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_olist.gif\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnList\" title=\"Ordered List\" onClick=\"doList('[LIST=1]','[/LIST]','" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_ulist.gif\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnList\" title=\"Unordered List\" onClick=\"doList('[LIST]','[/LIST]','" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_quote.gif\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnQuote\" title=\"Quote\" onClick=\"doAddTags('[quote]','[/quote]','" + obj + "')\">"); 
  	document.write("<img src=\"images/forum_icons/bbcode/forum_code.png\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnCode\" title=\"Code\" onClick=\"doAddTags('[code]','[/code]','" + obj + "')\">");
	document.write("<img src=\"images/forum_icons/bbcode/forum_strike.png\" style=\"margin:1px; border:solid 1px #CCC;\" name=\"btnStrike\" title=\"Strikethrough\" onClick=\"doAddTags('[s]','[/s]','" + obj + "')\">");
    document.write("</div>");
	//document.write("<textarea id=\""+ obj +"\" name = \"" + obj + "\" cols=\"" + width + "\" rows=\"" + height + "\"></textarea>");
				}

function doImage(obj)
{
textarea = document.getElementById(obj);
var url = prompt('Enter the Image URL:','http://');
var scrollTop = textarea.scrollTop;
var scrollLeft = textarea.scrollLeft;

if (url != '' && url != null) {

	if (document.selection) 
			{
				textarea.focus();
				var sel = document.selection.createRange();
				sel.text = '[img]' + url + '[/img]';
			}
   else 
    {
		var len = textarea.value.length;
	    var start = textarea.selectionStart;
		var end = textarea.selectionEnd;
		
        var sel = textarea.value.substring(start, end);
	    //alert(sel);
		var rep = '[img]' + url + '[/img]';
        textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
		
			
		textarea.scrollTop = scrollTop;
		textarea.scrollLeft = scrollLeft;
	}
}

}

function doEmojiFilter() {
  var filterValueName = $('#editor-emoji-dialog').find('.editor-emoji-dialog-filter input').val().trim().toLowerCase();
  var filterValueCategory = $('#editor-emoji-dialog').find('.editor-emoji-dialog-filter select[name="category"]').val().trim().toLowerCase();
  var filterValueSize = $('#editor-emoji-dialog').find('.editor-emoji-dialog-filter select[name="size"]').val();
  $('#editor-emoji-dialog').find('.editor-emoji-dialog-emoji-item').attr('data-size', '1').show();
  if (filterValueName.length > 0 || filterValueCategory.length > 0 || filterValueSize === 'large') {
    $('#editor-emoji-dialog').find('.editor-emoji-dialog-emoji-item').each(function(){
      var emojiName = $(this).attr('title').toLowerCase();
      var emojiShortcut = $(this).attr('data-shortcut').toLowerCase();
      var emojiRecent = $(this).attr('data-recent');
      var bigmoji = $(this).attr('data-bigmoji');
      if (filterValueName.length > 0) {
        if (!emojiName.includes(filterValueName) && !emojiShortcut.includes(filterValueName)) {
          $(this).hide();
        }
      }
      if (filterValueCategory.length > 0) {
        if (filterValueCategory == 'recent') {
          if (emojiRecent == 0) {
            $(this).hide();
          }
        } else {
          if (!emojiShortcut.includes(filterValueCategory)) {
            $(this).hide();
          }
        }
      }
      if (filterValueSize === 'large') {
        $(this).attr('data-size', '2');
        if (bigmoji == 'false') {
          $(this).hide();
        }
      }
    });
  }
}

function doEmoji(obj) {
  $('#editor-emoji-dialog').dialog({
    width: 510,
    title: 'Choose an emoji',
    modal: true,
    resizable: false,
    draggable: false,
    open: function(event, ui) {
      $('.ui-widget-overlay').bind('click', function() {
        $('#editor-emoji-dialog').dialog('close'); 
      });
    }
  });

  var recentsArray = [];
  var siteUrl = $('#editor-emoji-dialog').attr('data-url');
  var cookies = decodeURIComponent(document.cookie);
  var cookieArray = cookies.split(';');
  for(var i = 0; i <cookieArray.length; i++) {
    if (cookieArray[i].includes('recentemoji')) {
      var recents = cookieArray[i].split('=')[1];
      var recentsArray = [];
      if (recents.length) {
        recentsArray = recents.split(',');
      }
    }
  }

  $('#editor-emoji-dialog .editor-emoji-dialog-emoji-item').each(function(){
    $(this).attr('data-recent', 0);
    if (recentsArray.indexOf($(this).attr('data-id')) > -1) {
      $(this).attr('data-recent', 1);
    }
  });

  $('#editor-emoji-dialog').find('.editor-emoji-dialog-filter input').off();
  $('#editor-emoji-dialog').find('.editor-emoji-dialog-filter input').on('keyup', function(){
    doEmojiFilter();
  });

  $('#editor-emoji-dialog').find('.editor-emoji-dialog-filter select').off();
  $('#editor-emoji-dialog').find('.editor-emoji-dialog-filter select').on('change', function(){
    doEmojiFilter();
  });

  $('#editor-emoji-dialog .editor-emoji-dialog-emoji-item').off();
  $('#editor-emoji-dialog .editor-emoji-dialog-emoji-item').click(function(){
    $('#editor-emoji-dialog').dialog('close');
    var textarea = document.getElementById(obj);
    var scrollTop = textarea.scrollTop;
    var scrollLeft = textarea.scrollLeft;
    var emojiId = $(this).attr('data-id');
    if (recentsArray.indexOf(emojiId) == -1) {
      recentsArray.unshift($(this).attr('data-id'));
      recentsArray = recentsArray.slice(0, 12);
    }
    var emojiName = $(this).attr('title').toLowerCase();
    var emojiSize = $(this).attr('data-size');
    document.cookie = 'recentemoji=' + recentsArray.join(',') + ';path=/;domain=' + siteUrl;
    textarea.focus();
    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var emojiString = '[emoji=' + emojiName + ' size=' + emojiSize + ']';
    textarea.value =  textarea.value.substring(0,start) + emojiString + textarea.value.substring(end,len);
    textarea.scrollTop = scrollTop;
    textarea.scrollLeft = scrollLeft;
  });

}

function doURL(obj)
{
textarea = document.getElementById(obj);
var url = prompt('Enter the URL:','http://');
var scrollTop = textarea.scrollTop;
var scrollLeft = textarea.scrollLeft;

if (url != '' && url != null) {

	if (document.selection) 
			{
				textarea.focus();
				var sel = document.selection.createRange();
				
			if(sel.text==""){
					sel.text = '[url]'  + url + '[/url]';
					} else {
					sel.text = '[url=' + url + ']' + sel.text + '[/url]';
					}			

				//alert(sel.text);
				
			}
   else 
    {
		var len = textarea.value.length;
	    var start = textarea.selectionStart;
		var end = textarea.selectionEnd;
		
        var sel = textarea.value.substring(start, end);
		
		if(sel==""){
				var rep = '[url]' + url + '[/url]';
				} else
				{
				var rep = '[url=' + url + ']' + sel + '[/url]';
				}
	    //alert(sel);
		
        textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
		
			
		textarea.scrollTop = scrollTop;
		textarea.scrollLeft = scrollLeft;
	}
 }
}

function doAddTags(tag1,tag2,obj)
{
textarea = document.getElementById(obj);
	// Code for IE
		if (document.selection) 
			{
				textarea.focus();
				var sel = document.selection.createRange();
				//alert(sel.text);
				sel.text = tag1 + sel.text + tag2;
			}
   else 
    {  // Code for Mozilla Firefox
		var len = textarea.value.length;
	    var start = textarea.selectionStart;
		var end = textarea.selectionEnd;
		
		
		var scrollTop = textarea.scrollTop;
		var scrollLeft = textarea.scrollLeft;

		
        var sel = textarea.value.substring(start, end);
	    //alert(sel);
		var rep = tag1 + sel + tag2;
        textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
		
		textarea.scrollTop = scrollTop;
		textarea.scrollLeft = scrollLeft;
		
		
	}
}

function doList(tag1,tag2,obj){
textarea = document.getElementById(obj);
// Code for IE
		if (document.selection) 
			{
				textarea.focus();
				var sel = document.selection.createRange();
				var list = sel.text.split('\n');
		
				for(i=0;i<list.length;i++) 
				{
				list[i] = '[*]' + list[i];
				}
				//alert(list.join("\n"));
				sel.text = tag1 + '\n' + list.join("\n") + '\n' + tag2;
			} else
			// Code for Firefox
			{

		var len = textarea.value.length;
	    var start = textarea.selectionStart;
		var end = textarea.selectionEnd;
		var i;
		
		var scrollTop = textarea.scrollTop;
		var scrollLeft = textarea.scrollLeft;

		
        var sel = textarea.value.substring(start, end);
	    //alert(sel);
		
		var list = sel.split('\n');
		
		for(i=0;i<list.length;i++) 
		{
		list[i] = '[*]' + list[i];
		}
		//alert(list.join("<br>"));
        
		
		var rep = tag1 + '\n' + list.join("\n") + '\n' +tag2;
		textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
		
		textarea.scrollTop = scrollTop;
		textarea.scrollLeft = scrollLeft;
 }
}