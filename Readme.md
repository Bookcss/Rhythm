文档说明
====================
插件说明：
-
此插件支持`移动端` 、`PC端`，引入 `<Zepto.js> `或`<jQuery.js> `即可。
DOM结构
-
	<div class="game" id="game">
		<div class="track track1" ></div>
		<div class="track track2"></div>
		<div class="track track3">	</div>
		<div class="track track4"></div>
		<div class="collection-btn" id="target-btn">
			<div class="btn btn1 "></div>
			<div class="btn btn2 "></div>
			<div class="btn btn3 "></div>
			<div class="btn btn4 "></div>
		</div>
		<div class="start-time"></div>
		<div class="msg"></div>
	</div>
	<div class="mask"></div>

JS调用
-
	Rhythm({
		// 开始倒计时
		startTime:3,
		// 游戏时长
		duration :50,
		// 音乐地址
		musicUrl:'./coldplay.mp3'
	});
参数配置
-
    startTime :100, 	//开始倒计时
	duration :1000, 	//游戏时长
	musicUrl:"xxx.mp3",	//音乐地址


该插件仅供学习，不断完善中。
