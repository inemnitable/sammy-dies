var width = 100;
var height = 50;


function buildBoard() {
	var $body = $('body');
	$body.empty();
	for (var j=0; j<height; j++) {
		var $row = $('<div class="row"></div>');
		$body.append($row);
		for (var i=0; i<width; i++) {
			cellHTML = '<span class="cell" id="cell_' + i + '_' + j + '"></span>'
			var $cell = $(cellHTML);
			$row.append($cell);
		}
	}

}

function addSnakeAndApple() {
	var snake = game.board.snake;
	var apple = game.board.apple;
	_.each(snake, function(pos){
		var id = '#cell_' + pos[0] + '_' + pos[1];
		$(id).addClass("snake");
	})
	var apple_id = '#cell_' + apple[0] + '_' + apple[1];
	$(apple_id).addClass("apple");
}

function drawBoard() {
	$cells = $('.cell');
	$cells.removeClass("snake apple");
	addSnakeAndApple();
}

var KEYMAPPING = {
	"32" : "space",
	"37" : "left",
	"38" : "up",
	"39" : "right",
	"40" : "down"
}





$(function() {
	function keyhandler(event) {
		var key = KEYMAPPING[event.which];
		if (_.contains(["left", "right", "up", "down"], key)){
			game.board.turn(key);
		} else if (key === "space") {
			pause();
		}
	}

	function pause() {
		if (intervalID) {
			clearInterval(intervalID);
			$('body').append('<div class="info">Paused</div>');
			intervalID = null;
		} else {
			$('.info').remove();
			intervalID = setInterval(run_loop, 100);
		}
	}

	function run_loop() {
		drawBoard();
		if (game.step()){
			return;
		} else {
			clearInterval(intervalID);
			$('body').append('<div class="info">Sammy Dies! Score: ' +
				game.board.score +
				'</div>');
		}
	}

	window.game = new Game([width, height]);
	buildBoard();
	$('html').keydown(keyhandler);




	var intervalID = setInterval(run_loop, 100);

});