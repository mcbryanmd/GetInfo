(function( $, window, document, undefined ) {
	$.getinfo("profiler",{
		stagevu : {
			query : {
				url : "http://stagevu.com/search?for=|&in=Videos",
				selector : "*",
				xpath : '//div[@id="resultsbox1"]'
			},
			parse : function (id,data){
				var src=[],alt=[],desc=[],com=[],loc=[],lng=[],tablerow,tablecd='';
				$(data).find('div[class]').each(function(index){
					if($(this).find('div').attr('class')=='searcherror'){
						tablecd="...I'm sorry, Dave, I'm afraid I can't do that.";
						error(id);
					}
					else if($(this).attr('class')=='result1'||$(this).attr('class')=='result2'){
						$(this).find('img').each(function(){
							if($(this).attr('class')=='mvthumb'){
								src[index]=$(this).attr('src');
							}
							else{
								com[index]=$(this).attr('alt');
								return false;
							}
						});
						$(this).find('h2 a').each(function(){
							alt[index]=$(this).text();
							loc[index]=$(this).attr('href').split('/')[4];
						});
						$(this).find('p').each(function(){
							desc[index]=$(this).text();
							return false;
						});
						$(this).find('div[class="floatright"]').each(function(){
							lng[index]=$(this).html();
							lng[index]=lng[index]+'';
							lng[index]=lng[index].split('>')[7].split('\;')[0];
						});
						com[index]='<table><tr><td class="comoverlap">'+com[index]+'/5 Stars | Length: '+lng[index]+'</td></tr></table>';
						tablerow=
							'<div id="result'+index+'" class="resultimgsm" style="background:url('+src[index]+')">'+
							com[index]+
							'</div>'+
							'<div class="tooltipbig">'+
								'<table>'+
									'<tr>'+
										'<td><b id="searchresult'+index+'">'+alt[index]+'</b><br>'+
											desc[index]+
										'</td>'+
									'</tr>'+
									'<tr>'+
										'<td style="height:30px">'+
											'<button onclick="IMDb(\'searchresult'+index+'\')" class="buttonbig">IMDb</button>'+
											'<button onclick="downloadstagevu(\''+loc[index]+'\');" class="buttonbig">View/Download</button>'+
										'</td>'+
									'</tr>'+
								'</table>'+
							'</div>';
						tablecd=tablecd+tablerow;
					}
				})	;
				$('#'+id).html(tablecd);
				atd();
				$('#'+id+' div[id]').last().css('margin-bottom','10px');
				$('#'+id+' div[id]').tooltip({effect:'slide',offset:[27,10],relative:'true'});
				var src=[],alt=[],desc=[],com=[],loc=[],lng=[],tablerow,tablecd='';
			}
			download : 	function (loc){
				mm(0);
				$("#sf").html($("<iframe>", { style : "overflow:hidden;border:0;width:100%;height:100%", src : "http://stagevu.com/embed?width=780&amp;height=600&amp;background=transparent&amp;uid="+loc, scrolling : "no"})).show(600);
			}
		}
	});
})(jQuery, window, window.document);