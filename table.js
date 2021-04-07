window.onload = async function () {
	let tablepromise = promise(openfile, 'tablestyle.svg'),
		zhuyinpromise = promise(openfile, 'zhuyinstyle.svg'),
		basepromise = promise(openfile, 'basestyle.svg'),
		phonogrampromise = promise(openfile, 'style.svg');
	let tabletext = await tablepromise,
		zhuyintext = await zhuyinpromise,
		basetext = await basepromise,
		phonogramtext = await phonogrampromise;
	let sw = 204;
	let sh = 102;
	let w = Object.keys(pinyin.all).length * 102 + sw;
	let h = Object.keys(pinyin.all['零']).length * 102 + sh;
	let allsvg = [];
	let tablesvg = text2xml(tabletext).getElementsByTagName('svg')[0];
	tablesvg.setAttribute('width', w);
	tablesvg.setAttribute('height', h);
	tablesvg.setAttribute('viewBox', -sw + ' ' + -sh + ' ' + w + ' ' + h);
	let xcnt = 0;
	for (let c in pinyin.all) {
		let svg = text2xml(zhuyintext).getElementsByTagName('svg')[0];
		svg.getElementsByTagName('text')[0].textContent = c;
		svg.setAttribute('x', xcnt * 102);
		svg.setAttribute('y', -sh);
		tablesvg.appendChild(svg);
		xcnt++;
	}
	let ycnt = 0;
	for (let mr in pinyin.all['零']) {
		if (mr.length == 1) mr = '　' + mr;
		for (let i = 0; i < 2; i++) {
			let svg = text2xml(zhuyintext).getElementsByTagName('svg')[0];
			svg.getElementsByTagName('text')[0].textContent = mr[i];
			svg.setAttribute('x', i * 102 - sw);
			svg.setAttribute('y', ycnt * 102);
			tablesvg.appendChild(svg);
		}
		ycnt++;
	}
	let basesvg = text2xml(basetext).getElementsByTagName('svg')[0];
	basesvg.setAttribute('x', 0);
	basesvg.setAttribute('y', 0);
	xcnt = 0;
	for (let c in zhuyinpath.consonant) {
		for (let i = 0; i < 2; i++) {
			let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('class', 'path');
			path.setAttribute('id', 'c' + c + i);
			path.setAttribute('d', zhuyinpath.consonant[c][i]);
			basesvg.appendChild(path);
		}
		xcnt++;
	}
	for (let t in zhuyinpath.tonal) {
		let tm = (t == '1' || t == '3') ? 0 : 1;
		for (let m in zhuyinpath.middle) {
			let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('class', 'path');
			path.setAttribute('id', 'm' + t + m);
			path.setAttribute('d', zhuyinpath.tonal[t] + zhuyinpath.middle[m][tm]);
			basesvg.appendChild(path);
		}
	}
	for (let r in zhuyinpath.rhyme) {
		for (let i = 0; i < 2; i++) {
			let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('class', 'path');
			path.setAttribute('id', 'r' + r + i);
			path.setAttribute('d', zhuyinpath.rhyme[r][i]);
			basesvg.appendChild(path);
		}
		xcnt++;
	}
	tablesvg.appendChild(basesvg);
	mydiv.appendChild(tablesvg);
	for (let t in zhuyinpath.tonal) {
		let tt = t == '1' ? 0 : 1;
		let tablesvg = text2xml(tabletext).getElementsByTagName('svg')[0];
		tablesvg.setAttribute('width', w);
		tablesvg.setAttribute('height', h);
		tablesvg.setAttribute('viewBox', -sw + ' ' + -sh + ' ' + w + ' ' + h);
		xcnt = 0;
		for (let c in pinyin.all) {
			ycnt = 0;
			for (let mr in pinyin.all[c]) {
				let svg = text2xml(phonogramtext).getElementsByTagName('svg')[0];
				let mrobj = pinyin.findmr(mr);
				if (pinyin.all[c][mr]) {
					svg.getElementsByTagName('use')[1].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#c' + c + tt);
					svg.getElementsByTagName('use')[2].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#m' + t + mrobj.m);
					svg.getElementsByTagName('use')[3].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#r' + mrobj.r + tt);
				}
				svg.setAttribute('x', xcnt * 102);
				svg.setAttribute('y', ycnt * 102);
				tablesvg.appendChild(svg);
				ycnt++;
			}
			xcnt++;
		}
		mydiv.appendChild(tablesvg);
		allsvg.push(tablesvg)
		let btn = document.createElement("input");
		btn.setAttribute("type", "button");
		btn.setAttribute("value", pinyin.tonalname[t]);
		btn.onclick = function () {
			for (let i in allsvg) {
				allsvg[i].style.zIndex = 1;
			}
			tablesvg.style.zIndex = 2;
		};
		mybutton.appendChild(btn);
	}
	mystring.innerHTML = '';
	mybutton.getElementsByTagName('input')[0].click();
	let btn = document.createElement("input");
	btn.setAttribute("type", "button");
	btn.setAttribute("value", "描線關閉");
	let gridsw = true;
	btn.onclick = function () {
		if (gridsw) {
			gridsw = false;
			grid.setAttribute('stroke', 'none');
			mybutton.getElementsByTagName('input')[5].value = "描線顯示";
		} else {
			gridsw = true;
			grid.setAttribute('stroke', '#fdd');
			mybutton.getElementsByTagName('input')[5].value = "描線關閉";
		}
	};
	mybutton.appendChild(btn);
};
