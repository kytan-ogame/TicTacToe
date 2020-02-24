import * as Phaser from 'phaser';
import conf from './conf';
import Board from './Board'
import {update} from './UpdateManager'
import playerManager from './PlayerManager'

import '@design/style.scss';

let game = null;

var config = {
	type: Phaser.WEBGL,
	width: conf.canvas.size,
	height: conf.canvas.size * (conf.board.rows / conf.board.cols),
	disableContextMenu: true,
	transparent: true,
	title: 'Tic Tac Toe',
	canvas: document.querySelector('.c-game-canvas'),
	scene: {
		create,
		update
	}
};

new Phaser.Game(config);

function create() {
	game = new Board(this, {
		...conf.board,
		width: config.width,
		height: config.height,
		onStart: () => {
			document.querySelector('.c-game-current-player').classList.remove('hide');
			document.querySelector('#selectUserPart').classList.add('hide');
			document.querySelector('.c-game-end').classList.add('hide');
		},
		onEnd: (won, player) => {
			document.querySelector('.c-game-current-player').classList.add('hide');
			if(won){
				document.querySelector('.c-game-end__text').innerHTML = 'Bravo '+player.name+' !!!';
			} else {
				document.querySelector('.c-game-end__text').innerHTML = 'Égalite :('
			}
			document.querySelector('.c-game-end').classList.remove('hide')
		},
		onChangeUser: (player) => {
			document.querySelector('.c-game-current-player .c-popup__title').innerHTML = 'Tour de ' + player.name;
		},
	});
}

const playerName = document.querySelectorAll('[name="playerName"]');
const playerColor = document.querySelectorAll('[name="playerColor"]');
const playerBot = document.querySelectorAll('[name="playerBot"]');
document.querySelector('.c-start').onclick = () => {
	playerName.forEach((item, i) => {
		const name = playerName[i].value || '';
		const color = parseInt(playerColor[i].value.replace('#', '0x'));
		const bot = playerBot[i].checked;
		playerManager.add({name, color, bot});
	});
	game.start();
};

document.querySelector('.c-game-end__retry').onclick = () => {
	game.restart();
	document.querySelector('.c-game-end').classList.add('hide')
};


