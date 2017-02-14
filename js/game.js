let game = new Phaser.Game(400, 490, Phaser.AUTO, 'letsPlayAGame');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);


game.state.start('boot');