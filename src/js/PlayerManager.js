const colors = [0xA3512F, 0xD55454, 0xA3512F, 0x706059, 0x58A32F];

class PlayerManager {
	constructor(context) {
		this.players = [];
		this.current = null;
	}

	setBoard(board) {
		this.board = board;
	}

	add({name = '', bot = false, color = ''}) {
		const number = this.players.length + 1;
		const player = {
			name: name ? name : `Joueur n°${number}`,
			bot,
			id: this.getUniqId(),
			color: color || colors[number] || 0x000000
		};

		this.players.push(player);
		console.log('PlayerManager -> add | this.players', this.players);
		
		return {...player};
	}
	remove(id){
		this.players = this.players.reduce((players, player) => {
			if(player.id !== id){
				players.push(player);
			}
			return players;
		}, [])
	}

	next() {
		if (!this.current) {
			this.current = this.getRandom();
		} else {
			this.currentIdx++;
			if (this.currentIdx >= this.players.length) {
				this.currentIdx = 0;
			}
			this.current = this.players[this.currentIdx];
		}
		if (this.current.bot) {
			window.setTimeout(() => this.play(), 512);
		}
		return this.current;
	}

	play() {
		const rows = this.board.length;
		const cols = this.board[0].length;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				
				if (this.board[i][j].value === '') {
					this.board[i][j].value = this.current.id;
					return;
				}
			}
		}
	}

	getRandom() {
		this.currentIdx = Math.floor(Math.random() * this.players.length);
		return this.players[this.currentIdx];
	}

	getCurrent() {
		return this.players[this.currentIdx || 0];
	}

	getById(searchedId) {
		return this.players.find(({id}) => id === searchedId)
	}

	getUniqId() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}


}

const playerManager = new PlayerManager();
export default playerManager;