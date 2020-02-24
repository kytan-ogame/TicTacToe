import Cell from '@js/Cell';
import conf from "@js/conf";
import playerManager from "@js/PlayerManager";

let context = null;

export default class Board {
	constructor(ctx, {
		cols = 3,
		rows = 3,
		width = 600,
		height = 600,
		onStart = () => {
		},
		onEnd = () => {
		},
		onChangeUser = () => {
		}
	}) {
		context = ctx;
		this.cols = cols;
		this.rows = rows;
		this.cellWidth = width / this.cols;
		this.cellHeight = height / this.rows;
		this.onStart = onStart;
		this.onEnd = onEnd;
		this.onChangeUser = onChangeUser;
	}

	start() {
		this.cells = [];
		for (let i = 0; i < this.rows; i++) {
			this.cells[i] = [];
			for (let j = 0; j < this.cols; j++) {
				this.cells[i][j] = {
					test: 'ttt',
					value: ''
				};
				new Cell(context, {
					data: this.cells[i][j],
					x: this.cellWidth * j,
					y: this.cellHeight * i,
					width: this.cellWidth,
					height: this.cellHeight,
					afterClick: () => {
						const result = this.checkState(j, i, this.cells);
						switch (result) {
							case 'WIN':
								this.onEnd(true, playerManager.getCurrent())
								break;
							case 'TIE':
								this.onEnd(false)
								break;
							default:
								this.onChangeUser(playerManager.next());
						}
					}
				})
			}
		}
		this.onStart();
		playerManager.setBoard(this.cells);
		this.onChangeUser(playerManager.next());
	}
	restart() {
		// removing all object from scene
		context.children.list.forEach((child) => {
			child.destroy(true);
		});

		this.start();
	}

	checkState(x, y, board) {

		let length = 1;
		const player = board[y][x].value;

		// COLS
		length = 1;
		for (let i = 1; i <= conf.winRules.nb; i++) {
			if (board[y + i] && board[y + i][x] && board[y + i][x].value === player) {
				length++
			} else {
				break
			}
		}
		for (let i = 1; i <= conf.winRules.nb; i++) {
			if (board[y - i] && board[y - i][x] && board[y - i][x].value === player) {
				length++
			} else {
				break
			}
		}
		if (length >= conf.winRules.nb) {
			return 'WIN'
		}

		// ROWS
		length = 1;
		for (let i = 1; i <= conf.winRules.nb; i++) {
			if (board[y][x + i] && board[y][x + i].value === player) {
				length++
			} else {
				break
			}
		}
		for (let i = 1; i <= conf.winRules.nb; i++) {
			if (board[y][x - i] && board[y][x - i].value === player) {
				length++
			} else {
				break
			}
		}
		if (length >= conf.winRules.nb) {
			return 'WIN'
		}

		// DIAGONALS 1 --> \ <-- this way
		length = 1;
		for (let i = 1; i <= conf.winRules.nb; i++) {
			if (board[y + i] && board[y + i][x + i] && board[y + i][x + i].value === player) {
				length++
			} else {
				break
			}
		}
		for (let i = 1; i <= conf.winRules.nb; i++) {
			if (board[y - i] && board[y - i][x - i] && board[y - i][x - i].value === player) {
				length++
			} else {
				break
			}
		}
		if (length >= conf.winRules.nb) {
			return 'WIN'
		}

		// DIAGONALS 2 --> / <-- this way
		length = 1;
		for (let i = 1; i <= conf.winRules.nb; i++) {
			if (board[y - i] && board[y - i][x + i] && board[y - i][x + i].value === player) {
				length++
			} else {
				break
			}
		}
		for (let i = 1; i <= conf.winRules.nb; i++) {
			if (board[y + i] && board[y + i][x - i] && board[y + i][x - i].value === player) {
				length++
			} else {
				break
			}
		}
		if (length >= conf.winRules.nb) {
			return 'WIN'
		}

		// check egalité
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (!board[i][j].value) {
					return 'IN_PROGRESS'
				}
			}
		}


		return 'TIE';
	}
}