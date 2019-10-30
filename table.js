window.onload = function () {
	let sw = 204;
	let sh = 102;
	let w = Object.keys(pinyin.all).length * 102 + sw;
	let h = Object.keys(pinyin.all['零']).length * 102 + sh;
	openfiletotext("tablestyle.svg", function (tabletext) {
		openfiletotext("zhuyinstyle.svg", function (zhuyintext) {
			openfiletotext("style.svg", function (text) {
				let allsvg = [];
				for (let t in zhuyinpath.tonal) {
					let tt = t == '1' ? 0 : 1;
					let tm = (t == '1' || t == '3') ? 0 : 1;
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
					xcnt = 0;
					for (let c in pinyin.all) {
						let ycnt = 0;
						for (let mr in pinyin.all[c]) {
							let svg = text2xml(text);
							let mrobj = pinyin.findmr(mr);
							// console.log(mrobj);
							if (pinyin.all[c][mr]) {
								svg.getElementsByTagName('path')[3].setAttribute('d', zhuyinpath.consonant[c][tt]);
								svg.getElementsByTagName('path')[4].setAttribute('d', zhuyinpath.tonal[t] + zhuyinpath.middle[mrobj.m][tm]);
								svg.getElementsByTagName('path')[5].setAttribute('d', zhuyinpath.rhyme[mrobj.r][tt]);
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
						console.log(t);
						for (let i in allsvg) {
							allsvg[i].style.zIndex = 0;
						}
						mytable.style.zIndex = 1;
					};
					mybutton.appendChild(btn);
				}
				mystring.innerHTML = '';
				mybutton.getElementsByTagName('input')[0].click();
			});
		});
	});
};
