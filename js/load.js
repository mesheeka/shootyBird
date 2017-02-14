let loadState = {

	preload: function() {

		let loadingLabel = game.add.text(80, 150, 'loading...', {font:'30px Courier', fill:'#ffffff'});

		game.load.image(      'bird', 'assets/bird.png');
		game.load.image(      'pipe', 'assets/pipe.png');
		game.load.image(    'bullet', 'assets/bullet.png');
		game.load.image('background', 'assets/fire.png');
		game.load.audio(      'jump', 'assets/jump.wav');

	},
	create: () => game.state.start('menu')

};