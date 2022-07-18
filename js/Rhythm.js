/**
 * @authors huangwengen
 * @date    2021.11.25
 * @version 1.0
 */
!(function(win){

	const Rhythm = function (options) {
		const config = {
			//游戏倒计时默认（秒）
			startTime: 3,
			//下落间隔时间
			intervalTime: 200,
			//下落间隔速度
			intervalSpeed: 100,
			// 下落的速度
			sy: 15,
			//积分
			integral: 0,
			// 音乐地址
			musicUrl: null,
			// 游戏时长
			duration: 5
		}
		this.options = Object.assign({}, config, options)
		// 倒计时默认值
		// this.timeNum = 5
		// 倒计时控制
		this.time = null
		// 倒计时元素
		this.startTimeEle = document.querySelector('.start-time')
		//按钮外盒
		this.targetBtn = document.querySelector('#target-btn')
		//背景大小
		this.sizey = 4;
		this.id = 0;
		// 最外层盒子
		this.gameEle = document.querySelector('#game')
		// 积分盒子
		this.scoreEle = null;
		// 游戏时长
		this.durationEle = null;
		// 弹框
		this.msgEle = document.querySelector('.msg')
		this.initialize()
	};

	// 初始化
	Rhythm.prototype.initialize = function(){
		if (this.options.musicUrl){
			this.createMusic()
		}
		this.countDown()
		this.createDuration()
		this.createIntegral()
		this.bindEvent()
	}

	// 游戏倒计时
	Rhythm.prototype.countDown = function (){
		this.startTimeEle.classList.add(`start${this.options.startTime}`)

		// 判断是否是最后一秒
		if (this.options.startTime === 0){
			clearTimeout(this.time)
			this.time = null
			this.startTimeEle.classList.add('hide')
			this.start()
		}else{
			this.options.startTime--;
			this.time = setTimeout( ()=> {
				this.countDown()
			}, 1000)
		}
	}

	// 创建时长dom
	Rhythm.prototype.createDuration = function (){
		let div = document.createElement('div')
		div.className = 'duration';
		div.innerHTML = `倒计时：<span>${this.options.duration}</span>`
		this.gameEle.appendChild(div)
		this.durationEle  = div
	}


	// 创建积分dom
	Rhythm.prototype.createIntegral = function (){
		let div = document.createElement('div')
		div.id = 'score'
		div.className = 'score';
		div.innerHTML = `积分：<span>${this.options.integral}</span>`
		this.gameEle.appendChild(div)
		this.scoreEle  = div

	}

	// 创建音乐
	Rhythm.prototype.createMusic = function (){
		let audio = document.createElement('audio')
		audio.src = this.options.musicUrl
		audio.play()
	}

	// 创建击中音效
	Rhythm.prototype.createHitSound = function (){
		let audio = document.createElement('audio')
		audio.src = './hit.mp3'
		audio.play()
	}

	// 创建弹框
	Rhythm.prototype.createMsg = function (){
		this.msgEle.innerHTML = `<a href="javascript:;" class="close">x</a><p>哇塞</p><P>恭喜您</P><P >获得${this.options.integral}分</P>`;
		this.msgEle.style.display = 'block'
	}

	// 轨道设计（预留）
	Rhythm.prototype.createTrack = function (){

	}

	// 创建下落东西
	Rhythm.prototype.createItem = function (){
		const number = getRandomNumber()
		const track = document.querySelector(`.track${number}`);
		this.id ++;
		let div = document.createElement('div')
		div.id = `target-${this.id}`;
		div.className = 'target';
		track.appendChild(div)
		return {
			id : this.id,
			number
		}
	}

	// 轨道下落
	Rhythm.prototype.trackMove = function (){
		const {id, number} = this.createItem()
		let y = 0;
		let size = 0;
		const thisH = document.querySelector(`.btn${number}`).offsetTop;
		const btnH = this.targetBtn.querySelector('.btn').offsetHeight / 2;

		let time = setInterval(()=> {
			const targetNumber = document.querySelector(`#target-${id}`)
			// 判断这个元素是否存在
			if(targetNumber) {
				y += this.options.sy;
				size += this.sizey;
				targetNumber.style.top = y + 'px'
				targetNumber.style.backgroundSize = `${size}%`
				if (y > thisH + btnH) {
					setTimeout( ()=>{
						const track = document.querySelector(`.track${number}`);
						if (targetNumber)track.removeChild(targetNumber)
					}, 200)
					clearInterval(time);
					time = null;
				}
			}
		}, this.options.intervalSpeed)
	}

	// 音符触碰
	Rhythm.prototype.touchNote = function (event){
		const parent = event.target;
		const index = this.index(parent) + 1;
		const track = document.querySelector(`.track${index}`);
		const target = track.querySelectorAll('.target')
		for (let i = 0; i < target.length; i++) {
			if (target[i].offsetTop > parent.offsetTop - parent.offsetHeight / 2 - 30){
				this.createHitSound()
				parent.classList.add('high')
				track.removeChild(target[i])
				track.classList.add('track-high')
				setTimeout(function() {
					parent.classList.remove('high');
					track.classList.remove('track-high')
				}, 100)
				this.options.integral++;
				this.scoreEle.querySelector('span').innerText = this.options.integral;
			}
		}
	}

	// 获取索引
	Rhythm.prototype.index = function (target){
		const btn = this.targetBtn.querySelectorAll('.btn')
		for (let i = 0; i < btn.length; i++) {
			if (btn[i] === target){
				return i
			}
		}
	}

	// 事件绑定
	Rhythm.prototype.bindEvent = function (){
		this.targetBtn.addEventListener("click",this.touchNote.bind(this));
		this.targetBtn.addEventListener("touchstart",this.touchNote.bind(this));
	}

	// 开始游戏
	Rhythm.prototype.start = function (){
		let time = setInterval( ()=> {
			if (this.options.duration > 0){
				this.trackMove()
				this.options.duration--;
				this.durationEle.querySelector('span').innerText = this.options.duration;
				if (this.options.duration === 0){
					// 倒计时5秒后才展示出来
					setTimeout( ()=> {
						this.createMsg()
					}, 5000)
				}
			}else{
				clearInterval(time)
				time =null
			}
		}, this.options.intervalTime)
	}

	// 暂停游戏
	Rhythm.prototype.stop = function (){

	}

	// 结束游戏
	Rhythm.prototype.over = function (){

	}

	// 获取随机数字
	function getRandomNumber(){
		return  (Math.random() * 3 + 1).toFixed(0)
	}

	win.Rhythm  = function (options){
		return new Rhythm(options)
	}

}(window))