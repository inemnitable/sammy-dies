$(function() {
	window.game = new Game([100, 50]);

	function run_loop() {
		drawBoard();
		if (board.step()){
			return;
		} else {
			clearInterval(intervalID);
			$('body').append('<div class="info">You Lose. Score: ' +
				game.board.score +
				'</div>');
		}
	}

	var intervalID = setInterval(run_loop, 200)

}