// Setup canvas and context
const canvas = document.getElementById('volcanoCanvas');
const ctx = canvas.getContext('2d');

// Particle constructor for lava or smoke
function Particle(x, y, vx, vy, radius, color, life) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.radius = radius;
  this.color = color;
  this.life = life;
}

// Update particle properties
Particle.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  this.life -= 1;
  // Apply gravity or upward drift as needed
  this.vy += 0.1;  // Example: gravity for lava
};

// Draw particle on canvas
Particle.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

let particles = [];

// Function to create eruption particles
function createParticles() {
  // Create lava particles with random velocities
  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(
      200, // eruption center x
      300, // eruption center y
      Math.random() * 2 - 1,
      -Math.random() * 2,
      5,
      'orange',
      100
    ));
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.draw(ctx);
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

// Trigger eruption: create particles and start animation
createParticles();
animate();