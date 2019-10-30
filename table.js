window.onload = function () {
	let w = Object.keys(pinyin).length * 102;
	let h = Object.keys(pinyin['零']).length * 102;
	openfiletotext("tablestyle.svg", function (tabletext) {
		openfiletotext("zhuyinstyle.svg", function (zhuyintext) {
			openfiletotext("style.svg", function (text) {
				let allsvg = [];
				for (let t in tonal) {
					let tt = t == '1' ? 0 : 1;
					let tablesvg = text2xml(tabletext);
					let mytable = tablesvg.getElementsByTagName('svg')[0];
					mytable.setAttribute('width', w + 102);
					mytable.setAttribute('height', h + 102);
					mytable.setAttribute('viewBox', '-102 -102 ' + (w + 102) + ' ' + (h + 102));
					let xcnt = 0;
					for (let c in pinyin) {
						let svg = text2xml(zhuyintext);
						svg.getElementsByTagName('text')[0].textContent = c;
						svg.getElementsByTagName('svg')[0].setAttribute('x', xcnt * 102);
						svg.getElementsByTagName('svg')[0].setAttribute('y', -102);
						mytable.appendChild(svg.getElementsByTagName('svg')[0]);
						xcnt++;
					}
					let ycnt = 0;
					for (let mr in pinyin['零']) {
						let svg = text2xml(zhuyintext);
						svg.getElementsByTagName('text')[0].textContent = mr;
						svg.getElementsByTagName('text')[0].setAttribute('style', 'font-size:45px;font-family:DFKai-sb;');
						svg.getElementsByTagName('svg')[0].setAttribute('x', -102);
						svg.getElementsByTagName('svg')[0].setAttribute('y', ycnt * 102);
						mytable.appendChild(svg.getElementsByTagName('svg')[0]);
						ycnt++;
					}
					xcnt = 0;
					for (let c in pinyin) {
						let ycnt = 0;
						for (let mr in pinyin[c]) {
							let svg = text2xml(text);
							let mrobj = findmr(mr);
							// console.log(mrobj);
							let cc = c == '零' ? '口' : c;
							if (pinyin[c][mr]) {
								svg.getElementsByTagName('path')[2].setAttribute('d', consonants[cc][tt]);
								svg.getElementsByTagName('path')[3].setAttribute('d', tonal[t] + middle[mrobj.m]);
								svg.getElementsByTagName('path')[4].setAttribute('d', rhyme[mrobj.r][tt]);
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
					btn.setAttribute("value", tonalname[t]);
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
