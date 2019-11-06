function game2048(container,moveCubes){
	this.container = container;
	this.moveCubes = moveCubes;
	this.arr = new Array(4);
	for (var i = 0; i < this.arr.length; i++) {
		this.arr[i] = new Array(4);
		for(var j = 0; j < this.arr[i].length; j++){
			this.arr[i][j] = 0;
		}
	}
}
game2048.prototype = {
	init:function(){	//初始化
		this.moveCubes.empty();
		this.container.empty();
		for (var i = 0; i < this.arr.length; i++) {
			this.arr[i] = new Array(4);
			for(var j = 0; j < this.arr[i].length; j++){
				this.arr[i][j] = 0;
			}
		}
		
		for (var i = 0; i < 16; i++) {
			$('<div class="cube cube0"></div>').appendTo(this.container);
		}
		this.randomCube();
		this.randomCube();
	},
	
	randomCube:function(){	//随机产生新方块
		var num = Math.random() > 0.5 ? 2 : 4;
		var emptyArr = this.getCubePosition();
		var randomNum = Math.floor(Math.random() * emptyArr.length);
		var oDiv = $('<div class="cube cube'+num+'" col="'+emptyArr[randomNum][1]+'" row="'+emptyArr[randomNum][0]+'">'+num+'</div>');
		var left =2.2 * emptyArr[randomNum][1];
		var top = 2.2 * emptyArr[randomNum][0];
		oDiv.css({left:left+'rem',top:top+'rem'});
		this.arr[emptyArr[randomNum][0]][emptyArr[randomNum][1]] = oDiv;
		this.moveCubes.append(oDiv);
		
	},
	
	getCubePosition:function(){   //获取二维数组中的空位置
		var emptyArr = [];
		for (var i = 0; i < this.arr.length; i++) {
			for(var j = 0; j < this.arr[i].length; j++){
				if(this.arr[i][j] == 0){
					emptyArr.push([i,j]);
				}
			}
		}
		return emptyArr;
	},
	
	moveLeft:function(){
		var isMove = false;
		for (var i = 0; i < this.arr.length; i++) {
			var blankArr = [];
			var preOne = null;
			for(var j = 0 ; j < this.arr[i].length; j++){
				var cur = this.arr[i][j];
				if(cur != 0){	//当前位置不为空
					if(preOne && preOne.html() == cur.html()){	//当前块与前一个块相同
						this.merge(preOne,cur);
						preOne = null;
						isMove = true;
						blankArr.push([i,j]);
					}else if(blankArr.length != 0){  	//块空数组不为空
						preOne = this.arr[i][j];
						this.slide(cur,blankArr[0]);
						blankArr.shift();
						blankArr.push([i,j]);
						isMove = true;
					}else{
						preOne = this.arr[i][j];
					}
				}else{
					blankArr.push([i,j]);
				}
			}
		}
		if(isMove == true){
			setTimeout(function(){
				game.randomCube();
			},100)
		}
		if(this.gameover()){
			$('.cover').show();
		}
	},
	
	moveRight:function(){
		var isMove = false;
		for (var i = 0; i < this.arr.length; i++) {
			var blankArr = [];
			var preOne = null;
			for(var j = this.arr[i].length -1 ; j >=0 ; j--){
				var cur = this.arr[i][j];
				if(cur != 0){	//当前位置不为空
					if(preOne && preOne.html() == cur.html()){	//当前块与前一个块相同
						this.merge(preOne,cur);
						preOne = null;
						isMove = true;
						blankArr.push([i,j]);
					}else if(blankArr.length != 0){  	//块空数组不为空
						preOne = this.arr[i][j];
						this.slide(cur,blankArr[0]);
						blankArr.shift();
						blankArr.push([i,j]);
						isMove = true;
					}else{
						preOne = this.arr[i][j];
					}
				}else{
					blankArr.push([i,j]);
				}
			}
		}
		if(isMove == true){
			setTimeout(function(){
				game.randomCube();
			},100)
		}
		if(this.gameover()){
			$('.cover').show();
		}
	},
	
	moveTop:function(){
		var isMove = false;
		for (var j = 0 ; j < 4 ;j++) {
			var blankArr = [];
			var preOne = null;
			for(var i = 0; i < 4; i++){
				var cur = this.arr[i][j];
				if(cur != 0){	//当前位置不为空
					if(preOne && preOne.html() == cur.html()){	//当前块与前一个块相同
						this.merge(preOne,cur);
						preOne = null;
						isMove = true;
						blankArr.push([i,j]);
					}else if(blankArr.length != 0){  	//块空数组不为空
						preOne = this.arr[i][j];
						this.slide(cur,blankArr[0]);
						blankArr.shift();
						blankArr.push([i,j]);
						isMove = true;
					}else{
						preOne = this.arr[i][j];
					}
				}else{
					blankArr.push([i,j]);
				}
			}
		}
		if(isMove == true){
			setTimeout(function(){
				game.randomCube();
			},100)
		}
		if(this.gameover()){
			$('.cover').show();
		}
	},
	
	moveBottom:function(){
		var isMove = false;
		for (var j = 0 ; j < 4 ;j++) {
			var blankArr = [];
			var preOne = null;
			for(var i = 3; i >= 0 ; i--){
				var cur = this.arr[i][j];
				if(cur != 0){	//当前位置不为空
					if(preOne && preOne.html() == cur.html()){	//当前块与前一个块相同
						this.merge(preOne,cur);
						preOne = null;
						isMove = true;
						blankArr.push([i,j]);
					}else if(blankArr.length != 0){  	//块空数组不为空
						preOne = this.arr[i][j];
						this.slide(cur,blankArr[0]);
						blankArr.shift();
						blankArr.push([i,j]);
						isMove = true;
					}else{
						preOne = this.arr[i][j];
					}
				}else{
					blankArr.push([i,j]);
				}
			}
		}
		if(isMove == true){
			setTimeout(function(){
				game.randomCube();
			},100)
		}
		if(this.gameover()){
			$('.cover').show();
		}
	},
	merge:function(preOne,cur){
		var curVal = cur.html();
		this.slide(cur,[preOne.attr('row'),preOne.attr('col')],function(){
			preOne.remove();
			cur.html(curVal * 2).attr('class','cube cube'+(curVal * 2));
		});
		
	},
	slide:function(cur,position,fn){
		var left =2.2 * position[1];
		var top = 2.2 * position[0];
		
		this.arr[position[0]][position[1]] = cur;
		this.arr[cur.attr('row')][cur.attr('col')] = 0;
		cur.animate({left:left+'rem',top:top+'rem'},100,fn);
		cur.attr('row',position[0]);
		cur.attr('col',position[1]);
	},
	//判断游戏结束
	gameover:function(){
		for(var i = 0;i < 4; i++){
			for(var j = 0; j < 4 ;j++){
				if(!this.arr[i][j]){
					return false;
				}
				var curVal = this.arr[i][j].html();
				if((i-1>0) && this.arr[i-1][j]!=0 && this.arr[i-1][j].html() == curVal){//上
					return false;
				}
				if((j+1<4) && this.arr[i][j+1]!=0 && this.arr[i][j+1].html() == curVal){//右
					return false;
				}
				if((i+1<4) && this.arr[i+1][j]!=0 && this.arr[i+1][j].html() == curVal){//下
					return false;
				}
				if((j-1>0) && this.arr[i][j-1]!=0 && this.arr[i][j-1].html() == curVal){//左
					return false;
				}
			}
		}
		return true;
	}
}

var container = $('.container');
var moveCubes = $('.moveCubes');
var game = game || new game2048(container,moveCubes);
game.init();

$(window).keydown(function(e){
	
	switch(e.which){
		case 37:game.moveLeft();break;
		case 38:game.moveTop();break;
		case 39:game.moveRight();break;
		case 40:game.moveBottom();break;
	}
	
})

// 移动端手势操控

var startx, starty;
    //获得角度
    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };
 
    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;
 
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
 
        var angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }
 
        return result;
    }
    //手指接触屏幕
    document.addEventListener("touchstart", function(e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
    }, false);
    //手指离开屏幕
    document.addEventListener("touchend", function(e) {
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var direction = getDirection(startx, starty, endx, endy);
        switch (direction) {
            case 0:
                console.log("未滑动！");
                break;
            case 1:
                console.log("向上！")
				game.moveTop()
                break;
            case 2:
                console.log("向下！")
				game.moveBottom()
                break;
            case 3:
                console.log("向左！")
				game.moveLeft()
                break;
            case 4:
                console.log("向右！")
				game.moveRight()
                break;
            default:
        }
    }, false);

$('.replay').click(function(){
	$('.cover').hide();
	game.init();
})
