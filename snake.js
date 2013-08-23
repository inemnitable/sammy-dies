function add_vector(pos, dir){
	return [pos[0] + dir[0], pos[1] + dir[1]];
}

function Game(size) {
	this.board = new Board(size);
}

Game.prototype.step = function() {
	if (this.board.dead()) {
		return false;
	} else {
		this.board.moveSnake();
		return true;
	}
}

function Board(size) {
	this.w = size[0];
	this.h = size[1];
	this.initSnake();
	this.score = 0;
	this.dir = [0,-1]
	this.generateApple();
	this.extend = 0;

}

Board.prototype.generateApple = function() {
	do{
		this.apple = [Math.floor(Math.random()*this.w),
			 						Math.floor(Math.random()*this.h)]
	}while(_.contains(this.snake, this.apple))
}

Board.prototype.initSnake = function() {
	var x = Math.floor(Math.random() * this.w/2 + this.w/4);
	var y = Math.floor(Math.random() * this.h/2 + this.h/4);
	this.snake = [[x, y]];
	// for (var i = 0; i < 4; i++){
	// 	this.snake[i] = [x, y - i];
	// }
}

Board.prototype.turn = function(dir) {
	var directions = {
		left: [-1, 0],
		right: [1, 0],
		up: [0, -1],
		down: [0, 1]
	};
	if (add_vector(directions[dir], this.dir) !== 0) {
		this.dir = directions[dir];
	}
}

Board.prototype.inBoard = function(pos) {
	return pos[0] >= 0 && pos[0] < this.w && pos[1] >= 0 && pos[1] < this.h;
}

Board.prototype.next_pos = function(){
	return add_vector(_.last(this.snake), this.dir);
}

Board.prototype.dead = function() {
	var next_pos = this.next_pos();
	return !this.inBoard(next_pos) ||
		_.some(this.snake, function(el) {
			return _.isEqual(el, next_pos);
		});
}


Board.prototype.moveSnake = function() {
	var next_pos = this.next_pos();
	if (_.isEqual(next_pos, this.apple)) {
		this.snake.push(next_pos);
		this.generateApple();
		this.score += 10;
		this.extend = 3;
	} else if (this.extend > 0) {
		this.snake.push(next_pos);
		this.extend -= 1;
	}	else {
		this.snake.push(next_pos);
		this.snake.shift();
	}
}

