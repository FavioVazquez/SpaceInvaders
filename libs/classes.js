Array.prototype.isEmpty = function () {
	return this.length == 0;
};

var aliensCollision = function (alien, otherAlien) {
	return alien.x < otherAlien.x + otherAlien.w && otherAlien.x < alien.x + alien.w &&
		alien.y < otherAlien.y + otherAlien.h && otherAlien.y < alien.y + 100;
};

var alienBulletCollision = function (alien, bullet) {
	return alien.x < bullet.x + bullet.w && bullet.x < alien.x + alien.w &&
		alien.y < bullet.y + bullet.h && bullet.y < alien.y + alien.h;
};


// Alien class.
var Alien = function (sprite, x, y, w, h, s) {
	this.sprite = sprite;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.score = s;

	this.hitted = function () {
		var sound = alienhit.cloneNode(true);
		sound.volume = alienhit.volume;
		sound.play();
	};
};

//tank class
var Tank = function (sprite, x, y, speed) {
	this.sprite = sprite;
	this.x = x;
	this.y = y;
	this.w = this.sprite.w;
	this.h = this.sprite.h;
	this.speed = speed;
	this.life = 7;

	this.hitted = function (damageBullet) {
		var sound = tankhit.cloneNode(true);
		sound.volume = tankhit.volume;
		sound.play();
		this.life -= damageBullet;

		if (this.life === 0) showGameOver();
	};
};

// Screen Class.
var Screen = function (w, h) {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.w = w;
	this.canvas.height = this.h = h;
	this.ctx = this.canvas.getContext("2d");

	document.body.appendChild(this.canvas);

	this.drawSprite = function (sprite, x, y) {
		this.ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
	};

	this.drawBullet = function (bullet) {
		this.ctx.fillStyle = bullet.color;
		this.ctx.fillRect(bullet.x, bullet.y, bullet.w, bullet.h);
	};

	this.clear = function () {
		this.ctx.clearRect(0, 0, this.w, this.h);
	};
};

// Sprite Class.
var Sprite = function (pic, x, y, w, h) {
	this.img = pic;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
};

//Input handler.
var InputHandler = function () {
	this.down = {};
	this.pressed = {};

	var _this = this;
	document.addEventListener("keydown", function (event) {
		_this.down[event.keyCode] = true;
	});

	document.addEventListener("keyup", function (event) {
		delete _this.down[event.keyCode];
		delete _this.pressed[event.keyCode];
	});

	this.isDown = function (key) {
		return this.down[key];
	};

	this.isPressed = function (key) {
		//return (this.down[key]) ? this.pressed[key] = true : false;
		if (this.pressed[key]) return false;
		else if (this.down[key]) return this.pressed[key] = true;
		return false;
	};
};

// Bullet class
var Bullet = function (x, y, xSpeed, ySpeed, w, h, color, type) {
	this.x = x;
	this.y = y;
	this.ySpeed = ySpeed;
	this.xSpeed = xSpeed;
	this.w = w;
	this.h = h;
	this.color = color;
	this.type = type;


	var shoot = function (type) {
		// 0 is an alien 1 is a tank
		var sound = (type === 0) ?
			alienshot.cloneNode(true) : tankshot.cloneNode(true);
		sound.volume = alienshot.volume;
		sound.play();
	};

	this.update = function () {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	};

	shoot(this.type);
};

//Player class.
var Player = function (n, s, m) {
	this.name = n;
	this.score = 0 || s;
	this.modality = m;

	this.updateScore = function (number) {
		this.score += (0 || number);
	};
};