var consonants = {
	'口': ['M-19-43v27h38v-27z', 'M-19-43v24h38v-24z'],
	'零': ['M0-43a19 13 180 0 0 0 26a19 13 180 0 0 0-26', 'M0-43a17 11 180 0 0 0 22a17 11 180 0 0 0-22'],
	'ㄅ': ['M-19-43v27h38', 'M-19-43v24h38'],
	'ㄆ': ['M-19-43v27h38m0-27h-38', 'M-19-43v24h38m0-24h-38'],
	'ㄇ': ['M-19-43v19h38m0 11h-38', 'M-19-43v16h38m0 10h-38'],
	'ㄈ': ['M-19-43v27h38m-16 0v-27', 'M-19-43v24h38m-16 0v-24'],
	'ㄉ': ['M-19-43h38v27', 'M-19-43h38v24'],
	'ㄊ': ['M-19-43h38v27h-38', 'M-19-43h38v24h-38'],
	'ㄋ': ['M-19-32h38v19m0-30h-38', 'M-19-32h38v16m0-27h-38'],
	'ㄌ': ['M-19-43h38v27m-22 0v-27', 'M-19-43h38v24m-22 0v-24'],
	'ㄍ': ['M-19-29h38', 'M-19-30h38'],
	'ㄎ': ['M0-43v27m-19 0h38', 'M0-43v24m-19 0h38'],
	'ㄏ': ['M-19-43h38m-19 0v27', 'M-19-43h38m-19 0v24'],
	'ㄐ': ['M-19-29h38', 'M-19-30h38'],
	'ㄑ': ['M0-43v27m-19 0h38', 'M0-43v24m-19 0h38'],
	'ㄒ': ['M-19-43h38m-19 0v27', 'M-19-43h38m-19 0v24'],
	'ㄓ': ['M-19-43v27h38v-27', 'M-19-43v24h38v-24'],
	'ㄔ': ['M-21-40v24h42v-24m-21 -3v27', 'M-21-40v21h42v-21m-21 -3v24'],
	'ㄕ': ['M-19-43v19h38v-19m0 30h-38', 'M-19-43v16h38v-16m0 26h-38'],
	'ㄖ': ['M-26-40v24h52v-24m-17-3v27m-17 0v-27', 'M-26-40v21h52v-21m-17-3v21m-17 0v-21'],
	'ㄗ': ['M-19-16v-27h38v27', 'M-19-16v-24h38v24'],
	'ㄘ': ['M-21-16v-27h42v27m-21 0v-27', 'M-21-16v-24h42v24m-21 0v-24'],
	'ㄙ': ['M-19-43h38m-38 27v-18h38v18', 'M-19-43h38m-38 24v-16h38v16']
};
var middle = {
	'零': '',
	'ㄧ': 'm0-11v22',
	'ㄨ': 'm-80-11v22',
	'ㄩ': 'm0-11v22m-80 0v-22'
};
var tonal = {
	'1': 'M-40 0h80',
	'2': 'M-40-6h80m-65 0v12h50m15-12',
	'3': 'M-40-6h80m-65 0v12h50v-12m15 0',
	'4': 'M-40-6h80m0 12h-80m40 0v-12m40 6',
	'5': 'M-40-6h80m0 12h-80m30 0l-5-12h30l-5 12m30-6'
};
var rhyme = {
	'口': ['M-19 16v27h38v-27z', 'M-19 19v24h38v-24z'],
	'零': ['M0 17a19 13 180 0 0 0 26a19 13 180 0 0 0-26', 'M0 21a17 11 180 0 0 0 22a17 11 180 0 0 0-22'],
	'ㄚ': ['M-19 29h38', 'M-19 30h40'],
	'ㄛ': ['M-19 24h38m0 11h-38', 'M-19 26h38m0 10h-38'],
	'ㄜ': ['M-19 29h38m-19-13v27', 'M-19 30h38m-19-11v24'],
	'ㄝ': ['M-19 29h38m-19-13v27', 'M-19 30h38m-19-11v24'],
	'ㄞ': ['M-19 29h38m0-13v27', 'M-19 30h38m0-11v24'],
	'ㄟ': ['M-19 29h38m0-13v27m-19 0v-27', 'M-19 30h38m0-11v24m-19 0v-24'],
	'ㄠ': ['M-19 29h38m-38-13v27', 'M-19 30h38m-38-11v24'],
	'ㄡ': ['M-19 24h38m0 11h-38m-38-19v27', 'M-19 26h38m0 10h-38m-38-17v24'],
	'ㄢ': ['M-19 16h38v27', 'M-19 19h38v24'],
	'ㄣ': ['M-19 16h38v27m-22 0v-27', 'M-19 19h38v24m-22 0v-24'],
	'ㄤ': ['M-19 16v27h38', 'M-19 19v24h38'],
	'ㄥ': ['M-19 16v27h38m-16 0v-27', 'M-19 19v24h38m-16 0v-24'],
	'ㄦ': ['M-26 19v24h52v-24m-17-3v27m-17 0v-27', 'M-26 22v21h52v-21m-17-3v21m-17 0v-21'],
	'ㄨㄥ': ['M-19 16v27h38m0-27h-38', 'M-19 19v24h38m0-24h-38']
};
