function Retriever(window, document, undefined){
	String.prototype.cap = function(){return this.charAt(0).toUpperCase()+this.slice(1);};
	var base = {
		title : "\u22D8GET: INFO\u22D9",
		version : "Version: 2.00 (03/10/2011)",
		master : "http://github.com/mcbryanmd/GetInfo/raw/master/",
		profiles : {
			files : ["stagevu.js","btjunkie.js","nyaatorrents.js","debug.js"],
			tags : [],
			pcase : [],
			fcase : [],
			options : []
		},
		js : {
			files : ["jquery.tools.min.js","jquery.xdomainajax.js","tasks.js","default.js"],
			tags : []
		},
		css : {
			files : {
				"shortcut icon" : "favicon.jpg",
				"stylesheet" : "stylesb.css"
			},
			tags : []
		}
	};
	for(var t=0;t<base.profiles.files.length;t++){
		var client = base.profiles.files[t],
			clientfn = '("sb",CsU[' + t + '].replace("|",tags)+"&rrr="+Math.random(),"' + client + '",base.profiles.tags[' + t + '],CsX[' + t + '])';
		base.profiles.tags[t] = "<script src=\""+base.master+client+"\"></script>";
		base.profiles.pcase[t] = "case \""+client+"\": parse"+client+"(id,data.responseText); break;";
		base.profiles.fcase[t] = ((t == 0) ? "default" : "case \"" + client + "\"") + ": fetch" + clientfn + "; break;";
		base.profiles.options[t] = "<option value=\"" + client + "\">" + client.cap() + ":</option>";
	}
	for(var t=0;t<base.js.files.length;t++){
		base.js.tags[t]= "<script src=\"" + base.master + base.js.files[t] + "\"></script>";
	}
	var t = -1;
	for (key in base.css.files) {
		if(base.css.files.hasOwnProperty(key)) {
			base.css.tags[t++] = "<link rel=\"" + key + "\" href=\"" + base.master + base.css.files[key] + "\"/>";
		}
	}
	var page="
		<!doctype html> 
		<html lang='en'> 
			<head>
				<meta http-equiv='Content-Type' content='text/html;charset=utf-8'/>
				<title>" + base.title + " -- " + base.version + "</title>
				"	+ base.js.tags.join(' ')
					+ base.css.tags.join(' ')
					+ base.profiles.tags.join(' ') +
				"
				<script>
					function parseswitch(id,data,parser){
						switch(data.responseText){
							case '': error(id); break;
							default:
								switch(parser){
									" + base.profiles.pcase.join(' ') + "
									default: parse(id,data.responseText);
								}
						}
					}
					function search(){
						var tags=document.getElementById('sct').value.replace(/ /g,'+'),type=$('#ss').attr('value');
						if(tags=='')tags='DOMAIN';
						switch(type){
							" + base.profiles.fcase.join(' ') + "
						}
					}
				</script>
			</head>
			<body onload=\"atd();fetch('hb',sources[0])\">
				<div id='bd'>
					<table id='mtb'>
						<tr id='mt'>
							<td id='htd' class='m'><button id='ht' class='btm active' onclick='tab(this.parentNode.id);show(\"h\")'>Home</button></td>
							<td id='std' class='r'><button id='st' class='btm' onclick='tab(this.parentNode.id);show(\"s\")'>Search</button></td>
							<td id='ftd'>&nbsp;</td>
							<td id='mtd' class='fr'><button id='mm' class='btm' onclick='mm(0)'>Minimize</button></td>
						</tr>
					</table>
					<div id='h'>
						<table id='htb'>
							<tr id='ht'>
								<td id='ttd' class='m'><button id='tt' class='btb active' onclick=\"tab(this.parentNode.id);fetch('hb',sources[0])\">In Theaters</button></td>
								<td id='sntd' class='r'><button id='snt' class='btb' onclick=\"tab(this.parentNode.id);fetch('hb',sources[1])\">Coming Soon</button></td>
								<td id='dtd' class='r'><button id='dt' class='btb' onclick=\"tab(this.parentNode.id);fetch('hb',sources[2])\">On DVD/Bluray</button></td>
								<td id='fftd'>&nbsp;</td>
							</tr>
						</table>
						<div id='hb'>
						</div>
					</div>
					<div id='s' style='display:none'>
						<table id='stb'>
							<tr>
								<td class='fl' id='ctd'>
									<select id='ss'>
										<option value=''>Choose Type</option>
										" + base.profiles.options.join(' ') + "
									</select>
								</td>
								<td id='sctd'><input id='sct' type='text' size='25' value='Search Tags'></td>
								<td class='fr' id='sbd'><button id='sbt' class='btm' onclick='search()'>Search</button></td>
							</tr>
						</table>
						<div id='sb'>
						</div>
					</div>
				</div>
				<div id='sf' style='display:none'></div>
			</body>
		</html>
	";
	var base = {};
	return page;
}