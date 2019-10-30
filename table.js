window.onload = function () {
	generator(function* () {
		let tabletext, zhuyintext, basetext, phonogramtext;
		yield {
			nextfunc: openfiletotext,
			argsfront: ["tablestyle.svg"],
			cbfunc: function (str) {
				tabletext = str;
			}
		};
		yield {
			nextfunc: openfiletotext,
			argsfront: ["zhuyinstyle.svg"],
			cbfunc: function (str) {
				zhuyintext = str;
			}
		};
		yield {
			nextfunc: openfiletotext,
			argsfront: ["basestyle.svg"],
			cbfunc: function (str) {
				basetext = str;
			}
		};
		yield {
			nextfunc: openfiletotext,
			argsfront: ["style.svg"],
			cbfunc: function (str) {
				phonogramtext = str;
			}
		};
		let sw = 204;
		let sh = 102;
		let w = Object.keys(pinyin.all).length * 102 + sw;
		let h = Object.keys(pinyin.all['零']).length * 102 + sh;
		let allsvg = [];
		let tablesvg = text2xml(tabletext);
		let mytable = tablesvg.getElementsByTagName('svg')[0];
		mytable.setAttribute('width', w);
		mytable.setAttribute('height', h);
		mytable.setAttribute('viewBox', -sw + ' ' + -sh + ' ' + w + ' ' + h);
		let xcnt = 0;
		for (let c in pinyin.all) {
			let svg = text2xml(zhuyintext);
			svg.getElementsByTagName('text')[0].textContent = c;
			svg.getElementsByTagName('svg')[0].setAttribute('x', xcnt * 102);
			svg.getElementsByTagName('svg')[0].setAttribute('y', -sh);
			mytable.appendChild(svg.getElementsByTagName('svg')[0]);
			xcnt++;
		}
		let ycnt = 0;
		for (let mr in pinyin.all['零']) {
			if (mr.length == 1) mr = '　' + mr;
			for (let i = 0; i < 2; i++) {
				let svg = text2xml(zhuyintext);
				svg.getElementsByTagName('text')[0].textContent = mr[i];
				svg.getElementsByTagName('svg')[0].setAttribute('x', i * 102 - sw);
				svg.getElementsByTagName('svg')[0].setAttribute('y', ycnt * 102);
				mytable.appendChild(svg.getElementsByTagName('svg')[0]);
			}
			ycnt++;
		}
		let basesvg = text2xml(basetext);
		let mybase = basesvg.getElementsByTagName('svg')[0];
		mybase.setAttribute('x', 0);
		mybase.setAttribute('y', 0);
		xcnt = 0;
		for (let c in zhuyinpath.consonant) {
			for (let i = 0; i < 2; i++) {
				let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				path.setAttribute('stroke', '#000');
				path.setAttribute('stroke-width', '4');
				path.setAttribute('stroke-linecap', 'round');
				path.setAttribute('stroke-linejoin', 'round');
				path.setAttribute('fill', 'none');
				path.setAttribute('id', 'c' + c + i);
				path.setAttribute('d', zhuyinpath.consonant[c][i]);
				mybase.appendChild(path);
			}
			xcnt++;
		}
		for (let t in zhuyinpath.tonal) {
			let tm = (t == '1' || t == '3') ? 0 : 1;
			for (let m in zhuyinpath.middle) {
				let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				path.setAttribute('stroke', '#000');
				path.setAttribute('stroke-width', '4');
				path.setAttribute('stroke-linecap', 'round');
				path.setAttribute('stroke-linejoin', 'round');
				path.setAttribute('fill', 'none');
				path.setAttribute('id', 'm' + t + m);
				path.setAttribute('d', zhuyinpath.tonal[t] + zhuyinpath.middle[m][tm]);
				mybase.appendChild(path);
			}
		}
		for (let r in zhuyinpath.rhyme) {
			for (let i = 0; i < 2; i++) {
				let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				path.setAttribute('stroke', '#000');
				path.setAttribute('stroke-width', '4');
				path.setAttribute('stroke-linecap', 'round');
				path.setAttribute('stroke-linejoin', 'round');
				path.setAttribute('fill', 'none');
				path.setAttribute('id', 'r' + r + i);
				path.setAttribute('d', zhuyinpath.rhyme[r][i]);
				mybase.appendChild(path);
			}
			xcnt++;
		}
		mytable.appendChild(mybase);
		mydiv.appendChild(mytable);
		for (let t in zhuyinpath.tonal) {
			let tt = t == '1' ? 0 : 1;
			let tm = (t == '1' || t == '3') ? 0 : 1;
			let tablesvg = text2xml(tabletext);
			let mytable = tablesvg.getElementsByTagName('svg')[0];
			mytable.setAttribute('width', w);
			mytable.setAttribute('height', h);
			mytable.setAttribute('viewBox', -sw + ' ' + -sh + ' ' + w + ' ' + h);
			xcnt = 0;
			for (let c in pinyin.all) {
				ycnt = 0;
				for (let mr in pinyin.all[c]) {
					let svg = text2xml(phonogramtext);
					let mrobj = pinyin.findmr(mr);
					// console.log(mrobj);
					if (pinyin.all[c][mr]) {
						svg.getElementsByTagName('use')[1].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#c' + c + tt);
						svg.getElementsByTagName('use')[2].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#m' + t + mrobj.m);
						svg.getElementsByTagName('use')[3].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#r' + mrobj.r + tt);
					}
					svg.getElementsByTagName('svg')[0].setAttribute('x', xcnt * 102);
					svg.getElementsByTagName('svg')[0].setAttribute('y', ycnt * 102);
					mytable.appendChild(svg.getElementsByTagName('svg')[0]);
					ycnt++;
				}
				xcnt++;
			}
			mydiv.appendChild(mytable);
			allsvg.push(mytable)
			let btn = document.createElement("input");
			btn.setAttribute("type", "button");
			btn.setAttribute("value", pinyin.tonalname[t]);
			btn.onclick = function () {
				// console.log(t);
				for (let i in allsvg) {
					allsvg[i].style.zIndex = 1;
				}
				mytable.style.zIndex = 2;
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
			console.log(gridsw);
			if (gridsw) {
				gridsw = false;
				grid.setAttribute('stroke', '#fff');
				mybutton.getElementsByTagName('input')[5].value = "描線顯示";
			} else {
				gridsw = true;
				grid.setAttribute('stroke', '#fdd');
				mybutton.getElementsByTagName('input')[5].value = "描線關閉";
			}
		};
		mybutton.appendChild(btn);
	});
};
