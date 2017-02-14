let menuState = {

	create: function() {

		let nameLabel = game.add.text(100, 80, 'shootyBird', {font:'25px Arial', fill:'#ffffff'});

		let instructionsLabel = game.add.text(20, 160, 'Fly through the gates tapping the space bar, fire your weapon striking the F key', {font:'25px Arial', fill:'#ffffff', wordWrap:true, wordWrapWidth:350});

		let startLabel = game.add.text(80, game.world.height - 80, 'press the "W" key to start', {font:'25px Arial', fill:'#ffffff'});

		let startKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		startKey.onDown.addOnce(this.start, this);

	},
	start: () => game.state.start('play')

};