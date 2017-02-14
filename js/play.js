let playState = {

	create: function() {

		this.background = game.add.sprite(0, 0, 'background');

		this.bird = game.add.sprite(100, 245, 'bird');
		game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = 1000;

		let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		let fireKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
		fireKey.onDown.add(this.fire, this);

		this.pipes = game.add.group();

		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

		this.score = 0;
		this.labelScore = game.add.text(20, 20, '0', {font: '30px Arial', fill: '#ffffff'});

		this.bird.anchor.setTo(-0.2, 0.5);

		this.jumpSound = game.add.audio('jump');

		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

		this.bullets.createMultiple(30, 'bullet');
		this.bullets.setAll('checkWorldBounds', true);
		this.bullets.setAll('outOfBoundsKill', true);

	},

	update: function() {

		if(this.bird.y < 0 || this.bird.y > 490) {
			this.restartGame();
		}

		game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

		if(this.bird.angle < 20) {
			this.bird.angle += 1;
		}


	},
	jump: function() {

		if(this.bird.alive == false) {
			return;
		}

		this.bird.body.velocity.y = -350;

		game.add.tween(this.bird).to({angle: -20}, 100).start();

		this.jumpSound.play();

	},

	fire: function() {
		let fireRate = 100;
		let nextFire = 0;

		if(game.time.now > nextFire && this.bullets.countDead() > 0) {
			nextFire = game.time.now + fireRate;

			this.bullet = this.bullets.getFirstDead();
			this.bullet.reset(this.bird.x, this.bird.y);
			game.physics.arcade.moveToXY(this.bullet, this.bird.x, this.bird.y, 300);
		}
	},


	addOnePipe: function(x, y) {

		let pipe = game.add.sprite(x, y, 'pipe');
		this.pipes.add(pipe);
		game.physics.arcade.enable(pipe);
		pipe.body.velocity.x = -200;

		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;

	},

	addRowOfPipes: function() {

		let hole = Math.floor(Math.random() * 5) + 1;

		for(var i = 0; i < 8; i++) {
			if(i != hole && i != hole + 1) {
				this.addOnePipe(400, i * 60 + 10);
				this.score += 1;
				this.labelScore.text = this.score;
			}
		}

	},

	hitPipe: function() {

		if(this.bird.alive == false) {
			return;
		}

		this.bird.alive = false;
		game.time.events.remove(this.timer);

		this.pipes.forEach(function(p) {
			p.body.velocity.x = 0;
		}, this);

	},

	restartGame: () => game.state.start('play')
}