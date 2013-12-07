window.ps = window.ps || {};

ps.Particle = function(pos, angle, speed, life) {
	this.pos = {
		x: pos.x,
		y: pos.y
	};

	this.vel = {
		x: speed * Math.cos(ps.toRad(angle)),
		y: -speed * Math.sin(ps.toRad(angle))
	};

	this.color = 'blue';
	this.life = this.startingLife = life;
};

ps.Particle.prototype.update = function(dt) {
	this.life -= dt;

	if(this.life > 0) {
		this.pos.x += this.vel.x * dt;
		this.pos.y += this.vel.y * dt;
	}
};

