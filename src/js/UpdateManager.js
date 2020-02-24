class UpdateManager {
	constructor(context) {
		this.functions = [];
	}

	add(fn) {
		this.functions.push(fn)
	}

	update() {
		this.functions.forEach(fn => fn())
	}

}

export const updateManager = new UpdateManager();
export const update = () => updateManager.update();