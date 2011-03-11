(function( $, window, document, undefined ) {
String.prototype.cap = function(){return this.charAt(0).toUpperCase()+this.slice(1);};
$('#sct').live('keypress',function(e){
 if(e.keyCode==13)search();
});
plugin = {
	master : "http://github.com/mcbryanmd/GetInfo/raw/master/",
	version : "Version: 2.00 (03/10/2011)",
	only_human : [
		"The script was initiated from an offline xul page (e.g. 'About:Blank') removing domain access.",
		"An internet connection is not present.",
		"The search query came back empty-handed, and the script threw a tantrum.",
		"An unknown error occured, but it's your fault."
	],
	hal : "...I'm sorry, Dave, I'm afraid I can't do that.",
	profiles_master : ["stagevu","btjunkie","nyaatorrents","debug"],
	profiles : {
		"default" : {
			sources : [
				"new" : "http://www.moviefone.com/new-movie-releases",
				"soon" : "http://www.moviefone.com/coming-soon",
				"dvd" : "http://www.moviefone.com/dvd"
			]
		},
		"stagevu" : {},
		"btjunkie" : {},
		"nyaatorrents" : {},
		"debug" : {}
	},
	files : function () {
		var dir = plugin.global.dir;
		$.map(
			["/jquery/ui/css/start/jquery-ui-1.8.9.custom.css","/search_plugin.css"],
			function (filename) {
				$("head").first().append($("<link>", {rel : "stylesheet", type : "text/css", href : plugin.global.dir + filename}));
			}
		);
		if (jQuery.ui) {
			if (jQuery.ui.version !== "1.8.4") {
				jQuery.ui = {};
				$.getScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.min.js", function(){uil();});
			}
			else {
				uil();
			}
		}
		else {$.getScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.min.js", function(){uil();});}
		function uil(){
			if (jQuery.ui.position){ml();}
			else {$.getScript(dir + "/jquery/ui/js/jquery.ui.position.min.js", function(){ml();});}
			function ml(){
				if (jQuery.ui.mouse){wl();}
				else {$.getScript(dir + "/jquery/ui/js/jquery.ui.mouse.min.js", function(){wl();});}
				function wl(){
					if (jQuery.ui.widget){pl();}
					else {$.getScript(dir + "/jquery/ui/js/jquery.ui.widget.min.js", function () {pl();});}
					function pl() {
						if (!(jQuery().draggable)){$.getScript(dir + "/jquery/ui/js/jquery.ui.draggable.min.js");}
						if (!(jQuery().button)){$.getScript(dir + "/jquery/ui/js/jquery.ui.button.min.js");}
						if (!(jQuery().autocomplete)){$.getScript(dir + "/jquery/ui/js/jquery.ui.autocomplete.min.js");}
						if (!(jQuery().selectmenu)){$.getScript(dir + "/jquery/ui/js/jquery.ui.selectmenu.js");}
					}
				}
			}
		}
	},
	//function fetch(id,url,parser,select,xpath){
	function fetch(o){
		o = $.extend({},{
			parser : "",
			select : "*",
			xpath : "*"
		},o);
		$("#"+o.id).html($("<img/>", { src : plugin.master + "ajax-loader-d.gif", style : "width:128px;height:15px"}));
		if(o.url.search(/DOMAIN/)!==-1){
			var temp=o.url.split("/");
			o.url=temp[0]+"//"+temp[2]+"/";
		};
		$.ajax({
			select: o.select,
			xpath: o.xpath,
			type: "GET",
			url: o.url,
			error: function(request, status){
				error(id);
			},
			success: function(data){
				parseswitch(id,data,parser);
			}
		});
	},
	//function fetchRss(id,url,parser){
	function fetchRss(o){
		$("#"+o.id).html("Searching...");
		var query="http://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent("select * from feed where url='"+o.url+"'")+"&format=json&callback=?";
		$.getJSON(query, function(data){parseswitch(o.id,data,o.parser);});
	},
	function error(id){
		$("#"+id).html(plugin.hal);
		var msg = "WARNING: XDA Disabled\n\n It can only be attributable to human error:";
		$.map(plugin["only_human"], function(item, index) {
			msg += "\n" + (index + 1) + ") " + item;
		})
		alert(msg);
	},
	function parseswitch(id,data,parser){
		switch(data.responseText){
			case '': error(id); break;
			default:
				if (typeof(parser) !== "undefined") {
					plugin.profiles[parser].parse(id,data.responseText);
				}
				else {
					plugin.profiles["default"].parse(id,data.responseText);
				}
		}
	},
	function search(){
		var tags=document.getElementById('sct').value.replace(/ /g,'+'), type=$('#ss').val();
		if(tags=='')tags='DOMAIN';
		if (type == plugin["profiles_master"][0]) {
		
		}
		else {
		
		}
	},
	function tab(id){
		var i=$("#"+id).attr("cellIndex");
		$("#"+id).attr("class","m");
		$("#"+id+" button").addClass('active');
		$("#"+$('#'+id).parent().attr('id')+" td[class]").each(function(){
			var ti=(this).cellIndex;
			if(ti!==i)$(this).find("button").removeClass('active');
			if(ti<i){
				if(ti==0)$(this).attr("class","fl");
				else $(this).attr("class","l");
			}
			else if(ti>i&&(this).className!=="fr")$(this).attr("class","r");
		})
	},
	function show(id){
	 $("#bd").children("div").css("display","none");
	 $("#"+id).css("display","");
	},
	function mm(x){
	 switch(x){
	  case 0:
	   $("#sf").show(600);
	   $("#bd").animate({'marginTop':'-30px','top':'100%','height':'30px'},600,
		function(){
		 $("#bd").animate({'width':'241px'},600,
		  function(){
		   $("#mm").text("Maximize").each(function(){(this).onclick=function(){mm()}});
		  }
		 );
		 $("#mtb").animate({'width':'245px'},600);
		}
	   );
	   break;
	  default:
	   $("#sf").hide(600);
	   $("#mtb").animate({'width':'804px'},600);
	   $("#bd").animate({'width':'800px'},600,
		function(){
		 $("#bd").animate({'marginTop':'-300px','top':'50%','height':'600px'},600,
		  function(){
		   $("#mm").text("Minimize").each(function(){(this).onclick=function(){mm(0)}});
		  }
		 );
		}
	   );
	 }
	},
	function atd(){
	 $("td[class!=noalign]").attr("align","center");
	},
	function advsearch(id){
	 tab('std');
	 show('s');
	 $("#sct").attr("value",$("#"+id).html());
	},
	function IMDb(id){
	mm(0);
	$("#sf").html("<iframe src='http://www.imdb.com/find?s=all&q="+$("#"+id).html().replace(/ /g,'+')+"' class='sf' frameborder='0'></frame>").show(600);
	},
};
$.getinfo = $.fn.getinfo = function( method ) {
	if ( plugin[method] ) {
		if (typeof(plugin[method]) == "function") {
			return plugin[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else {
			return plugin[method];
		}
	} else if ( typeof method === 'object' || ! method ) {
		return plugin.init.apply( this, arguments );
	} else {
		$.error( 'Method ' + method + ' does not exist on jQuery.getinfo' );
	}
};
})(jQuery, window, window.document);