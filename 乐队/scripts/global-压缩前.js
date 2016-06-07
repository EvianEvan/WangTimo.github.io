function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	}else{
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass(element,value){
	if (!element.className){
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName+= ' ';
		newClassName+= value;
		element.className = newClassName;
	}
}

function highlightPage(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if(navs.length == 0) return false;

	var links = navs[0].getElementsByTagName('a');
	var linkurl;
	for (var i=0;i<links.length; i++){
		linkurl = links[i].getAttribute('href');
		if (window.location.href.indexOf(linkurl) != -1){               //为当前页对应链接添加类，以实现高亮效果    
			links[i].className = 'here';
			var linktext = links[i].lastChild.nodeValue.toLowerCase();  //为每个不同链接生成ID，以实现不同效果
			document.body.setAttribute('id',linktext);
		}
	}
}
addLoadEvent(highlightPage);


// 12.5.2第十章的moveElement函数
function moveElement(elementID,final_x,final_y,interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);

	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if(!elem.style.left) {
		elem.style.left = '0px';
	}
	if(!elem.style.top) {
		elem.style.top = '0px';
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	}if (xpos < final_x) {
		dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}if (xpos > final_x){
		dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}if (ypos < final_y){
		dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}if (ypos > final_y){
		dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);                                                
}

function prepareSlideshow() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('intro')) return false;
	var intro = document.getElementById('intro');
	var slideshow = document.createElement('div');
	slideshow.setAttribute('id','slideshow');
	var frame = document.createElement('img');
	frame.setAttribute('src','images/frame.gif');
	frame.setAttribute('alt','');
	frame.setAttribute('id','frame');
	slideshow.appendChild(frame);
	var preview = document.createElement('img');
	preview.setAttribute('src','images/slideshow.gif');
	preview.setAttribute('alt','a imge waits you');
	preview.setAttribute('id','preview');
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links = document.getElementsByTagName('a');
	var destination;
	for (var i=0; i<links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute('href');
			if (destination.indexOf('index.html') != -1) {
				moveElement('preview',0,0,5);
			}
			if (destination.indexOf('about.html') != -1) {
				moveElement('preview',-150,0,5);
			}
			if (destination.indexOf('photos.html') != -1) {
				moveElement('preview',-300,0,5);
			}
			if (destination.indexOf('live.html') != -1) {
				moveElement('preview',-450,0,5);
			}
			if (destination.indexOf('contact.html') != -1) {
				moveElement('preview',-600,0,5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);


// 用于about.html
// 只显示一部分信息 
function showSection(id) {
	var sections = document.getElementsByTagName('section');
	for (var i=0; i<sections.length; i++) {
		if (sections[i].getAttribute('id') !==id ) {
			sections[i].style.display = 'none';
		} else {
			sections[i].style.display = 'block';
		}
	}
}
//点击nav中的连接后,调用showSection 
function prepareInternalnav() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles = document.getElementsByTagName('article');
	if (articles.length === 0) return false;
	var navs = articles[0].getElementsByTagName('nav');
	if (navs.length ===  0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName('a');
	for (var i=0; i<links.length; i++) {
		var sectionId = links[i].getAttribute('href').split('#')[1];
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = 'none';
		links[i].destination = sectionId;
		links[i].onclick = function() {
		showSection(this.destination);
		return false;
		}
	}
}
addLoadEvent(prepareInternalnav);


//用于photos.html（第七章）
//点击后在本页替换图片并将文本替换为链接的title值（p90）
function showPic(whichpic) {
	if(!document.getElementById('placeholder')) return true;
	var source = whichpic.getAttribute('href');
	var placeholder = document.getElementById('placeholder');
	placeholder.setAttribute('src',source);
	if (!document.getElementById('description')) return false;
	if (whichpic.getAttribute('title')) {
		var text = whichpic.getAttribute('title');
	} else {
		var text = '';
	}
	var description = document.getElementById('description');
	if (description .firstChild.nodeType === 3) {
		description.firstChild.nodeValue = text;
	}
	return false;
}
//生成placeholder图片和description首页文本
function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById('imagegallery')) return false;
	var placeholder = document.createElement('img');
	placeholder.setAttribute('id','placeholder');
	placeholder.setAttribute('src','../images/placeholder.gif');
	placeholder.setAttribute('alt','my image gallery');
	var description = document.createElement('p');
	description.setAttribute('id','description');
	var desctext = document.createTextNode('请选择一个图片');
	description.appendChild(desctext);
	var gallery = document.getElementById('imagegallery');
	insertAfter(description,gallery);                            //insertAfter通用函数
	insertAfter(placeholder,description);                        //insertAfter通用函数
}
addLoadEvent (preparePlaceholder);                               
//遍历列表里的每个链接，当用户点击链接时会调用showPic函数（p90）
function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById('imagegallery')) return false;
	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementsByTagName('a');
	for (var i=0; i < links.length; i++){
		links[i].onclick=function(){
			return showPic(this);
		}
	}
}
addLoadEvent (prepareGallery);                                  


// live.html
//奇偶行样式
function stripeTables(){
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName('table');
	var odd,rows;
	for (var i=0; i<tables.length; i++){
		odd = false;
		rows = tables[i].getElementsByTagName('tr');
		for (var j=0; j<rows.length; j++){
			if (odd == true){
				addClass (rows[j],"odd");      
				odd = false;
			}else{
				odd = true;
			}
		}
	}
}
// 悬停行加粗(有改动)
function highLightRows(){
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName('tr');
	for (var i=0; i<rows.length; i++){
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function(){
			addClass(this,'highlight');
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		}
	}
}
//显示缩略语列表
function displayAbbreviations(){
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) 
		return false;
	var abbreviations = document.getElementsByTagName('abbr');
	if (abbreviations.length <1) return false;
	var defs = new Array();
	for (var i=0; i<abbreviations.length; i++){
		var current_abbr = abbreviations[i];
		var definition = current_abbr.getAttribute('title');
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
	var dlist = document.createElement('dl');
	for (key in defs){
		var definition = defs[key];
		var dtitle = document.createElement('dt');
		var dtilte_text = document.createTextNode(key);
		dtitle.appendChild(dtilte_text);
		var ddesc = document.createElement('dd');
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length < 1) return false;
		var header = document.createElement('h3');
		var header_text = document.createTextNode('缩略词列表');
		header.appendChild(header_text);
		var articles = document.getElementsByTagName('article');
		if (articles.length == 0) return false;
		var container = articles[0];
		container.appendChild(header);
		container.appendChild(dlist);
}
addLoadEvent(stripeTables);
addLoadEvent(highLightRows);
addLoadEvent(displayAbbreviations);

// contact.html
// 点击label标签后将焦点移至表单(IE默认支持)
function focusLabels() {
	if (!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName('label');
	for (var i=0; i<labels.length; i++) {
		if (!labels[i].getAttribute('for')) continue;
		labels[i].onclick = function() {
			var id = this.getAttribute('for');
			if (!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLabels);
// 显示占位符（placeholder属性），IE默认不支持
function resetFields(whichform) {
	for (var i=0; i<whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.type == 'submit') continue;
		var check = element.placeholder ||element.getAttribute('placeholder');
		if (!check) continue;
	element.onfocus = function() {
	    var text = this.placeholder || this.getAttribute('placeholder');
	    if (this.value == text) {
		this.classname = '';
		this.value = '';
		}
	}
	element.onblur = function() {
		if (this.value == ''){
			this.className = 'placeholder';
			this.value = this.placeholder || this.getAttribute('placeholder');
		}
	}
	element.onblur();
  }
}

// 检查表单输入
function isFilled(field) {
	if (field.value.replace(' ','').length === 0) return false;
	var placeholder = field.placeholder || field.getAttribute('placeholder');
	return (field.value != placeholder);
}
function isEmail(field) {
	return (field.value.indexOf('@') !=-1 && field.value.indexOf('.') != -1);
}
function validateForm(whichform) {
	for (var i=0; i<whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.getAttribute('required') === 'required') {  
			// 为什么把element.getAttribute('required')
			// 写成element.required就不能正常运行呢
			if (!isFilled(element)) {
				alert ('请填写'+element.name+'项');
				return false;
			}
		}
		if(element.type === 'email') {
			if (!isEmail(element)) {
				alert('此'+element.name+'项必须正确填写');
				return false;
			}
		}
	}
	return true;
}
// 遍历form对象，并将其传给resetFields函数和validateForm函数和submitFormWithAjax函数。
function prepareForms() {
	for (var i=0; i<document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function() {
			if (!validateForm(this)) return false;
			var article = document.getElementsByTagName('article')[0];
			if (submitFormWithAjax(this,article)) return false;
			return ture;
		}
	}
}
addLoadEvent(prepareForms);

// Ajax
// 第7章的getHTTPObject函数
function getHTTPObject(){
	if(typeof XMLHttpRequest == 'undefined')
		XMLHttpRequest = function(){
			try {
				return new ActiveXObject('Msxml2.XMLHTTP.6.0');}
				catch (e) {}
			try {
				return new ActiveXObject('Msxml2.XMLHTTP.3.0');}
				catch (e) {}
			try {
				return new ActiveXObject('Msxml2.XMLHTTP');}
				catch (e) {}
				return false;				
			}
	return new XMLHttpRequest();
}
function displayAjaxLoading(element) {
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	var content = document.createElement('img');
	content.setAttribute('src','../images/loading.gif');
	content.setAttribute('alt','loading...');
	element.appendChild(content);
}
function submitFormWithAjax(whichform,thetarget) {
	var request = getHTTPObject();
	if (!request) { return false; }
	displayAjaxLoading(thetarget);
	var dataParts = [];
	var element;
	for (var i=0; i<whichform.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name +'='+encodeURIComponent(element.value);
	}
	var data = dataParts.join('&');
	request.open('POST',whichform.getAttribute('action'),true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.onreadystatechange = function () {
		if (request.readystate == 4) {
			if (request.status == 200 ||request.status ==0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length >0) {
					thetarget.innerHTML = matches[1];
				} else {
					thetarget.innerHTML = '<p>糟糕，这里出现了一个错误</p>';
				}
			} else {
				thetarget.innerHTML = '<p>' + request.statusText + '<p>';
			}
		}
	};
	request.send(data);
	return true;
};