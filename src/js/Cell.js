import {updateManager} from './UpdateManager';
import playerManager from "@js/PlayerManager";

let context = null;
export default class Cell {
	constructor(ctx, {
		data = {},
		x = 0,
		y = 0,
		width = 10,
		height = 10,
		afterClick = () => {
		}
	}) {
		context = ctx;

		this.checked = false;
		this.data = data;
		this.afterClick = afterClick;


		this.zone = context.add.rectangle(x, y, width, height);
		this.zone.setOrigin(0, 0);
		this.zone.setInteractive();

		this.borderer = context.add.graphics();
		this.borderer.lineStyle(2, 0xaaaaaa, 1);
		this.borderer.strokeRectShape(this.zone);


		this.zone.on('pointerup', (pointer) => {
			if (!this.data.value) {
				const player = playerManager.getCurrent();
				if(!player.bot){
					this.data.value = player.id;
				}
			}
		});
		updateManager.add(() => this.update())
	}

	update() {

		if (!this.checked && this.data.value) {

			this.checked = true;
			this.afterClick();
			const player = playerManager.getById(this.data.value);
			const filler = context.add.rectangle(this.zone.x + this.zone.width / 2, this.zone.y + this.zone.height / 2, this.zone.width, this.zone.height, player.color);
			filler.setScale(1.5);
			filler.setAlpha(0);
			const duration = 128;
			const scale = 0.9;
			context.tweens.add({
				targets: filler,
				alpha: {value: 1, duration, ease: Phaser.Math.Easing.Bounce},
				scale: {value: scale, duration, ease: Phaser.Math.Easing.Bounce},
			});
		}
	}
}