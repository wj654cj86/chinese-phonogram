window.onload = async () => {
	function createzhuyin(ch, x, y) {
		let svg = text2svg(`<svg x="${x}" y="${y}" width="100" height="100" viewBox="-50 -50 100 100"><use xlink:href="#zhuyinbase"/></svg>`);
		svg.append(text2svg(`<text x="-50" y="30" class="text" fill="#000">${ch}</text>`));
		return svg;
	}
	let basetext = await loadfile('text', 'basestyle.svg');
	let size = 102;
	let sw = size * 2;
	let sh = size;
	let w = Object.keys(pinyin.all).length * size + sw;
	let h = Object.keys(pinyin.all['零']).length * size + sh;
	let allsvg = [];
	let tablesvg = text2svg(`<svg width="${w}" height="${h}" viewBox="${[-sw, -sh, w, h].join(' ')}"></svg>`);
	let xcnt = 0;
	for (let c in pinyin.all) {
		tablesvg.append(createzhuyin(c, xcnt * size, -sh));
		xcnt++;
	}
	let ycnt = 0;
	for (let mr in pinyin.all['零']) {
		if (mr.length == 1) mr = '　' + mr;
		for (let i = 0; i < 2; i++) {
			tablesvg.append(createzhuyin(mr[i], i * size - sw, ycnt * size));
		}
		ycnt++;
	}
	let basesvg = text2svg(basetext);
	basesvg.setAttribute('x', 0);
	basesvg.setAttribute('y', 0);
	basesvg.removeAttribute('xmlns');
	basesvg.removeAttribute('xmlns:xlink');
	xcnt = 0;
	for (let c in zhuyinpath.consonant) {
		for (let i = 0; i < 2; i++) {
			let path = text2svg(`<path class="path" id="c${c + i}" d="${zhuyinpath.consonant[c][i]}"/>`);
			basesvg.append(path);
		}
		xcnt++;
	}
	for (let t in zhuyinpath.tonal) {
		let tm = (t == '1' || t == '3') ? 0 : 1;
		for (let m in zhuyinpath.middle) {
			let path = text2svg(`<path class="path" id="m${t + m}" d="${zhuyinpath.tonal[t] + zhuyinpath.middle[m][tm]}"/>`);
			basesvg.append(path);
		}
	}
	for (let r in zhuyinpath.rhyme) {
		for (let i = 0; i < 2; i++) {
			let path = text2svg(`<path class="path" id="r${r + i}" d="${zhuyinpath.rhyme[r][i]}"/>`);
			basesvg.append(path);
		}
		xcnt++;
	}
	tablesvg.append(basesvg);
	mydiv.append(tablesvg);
	for (let t in zhuyinpath.tonal) {
		let tt = t == '1' ? 0 : 1;
		let tablesvg = text2svg(`<svg width="${w}" height="${h}" viewBox="${[-sw, -sh, w, h].join(' ')}"></svg>`);
		xcnt = 0;
		for (let c in pinyin.all) {
			ycnt = 0;
			for (let mr in pinyin.all[c]) {
				let svg = text2svg(`<svg x="${xcnt * size}" y="${ycnt * size}" width="100" height="100" viewBox="-50 -50 100 100"><use xlink:href="#base"/></svg>`);
				let mrobj = pinyin.findmr(mr);
				if (pinyin.all[c][mr]) {
					svg.append(text2svg(`<use xlink:href="#c${c + tt}"/>`));
					svg.append(text2svg(`<use xlink:href="#m${t + mrobj.m}"/>`));
					svg.append(text2svg(`<use xlink:href="#r${mrobj.r + tt}"/>`));
				}
				tablesvg.append(svg);
				ycnt++;
			}
			xcnt++;
		}
		mydiv.append(tablesvg);
		allsvg.push(tablesvg)
		let btn = text2html(`<button>${pinyin.tonalname[t]}</button>`);
		btn.onclick = function () {
			for (let i in allsvg) {
				allsvg[i].style.zIndex = 1;
			}
			tablesvg.style.zIndex = 2;
		};
		mybutton.append(btn);
	}
	mystring.innerHTML = '';
	mybutton.querySelector('button').click();
	let btn = text2html(`<button>描線關閉</button>`);
	let gridsw = true;
	btn.onclick = function () {
		if (gridsw) {
			gridsw = false;
			grid.setAttribute('stroke', 'none');
			btn.innerHTML = "描線顯示";
		} else {
			gridsw = true;
			grid.setAttribute('stroke', '#fdd');
			btn.innerHTML = "描線關閉";
		}
	};
	mybutton.append(btn);
};
