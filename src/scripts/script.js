const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Criar uma nova nave
const ship = new Ship(new Vector2(canvas.width / 2, canvas.height / 2), new Vector2(0, 0));

// Criar uma lista de inimigos
const enemies = [];
for (let i = 0; i < 10; i++) {
  enemies.push(new Enemy(new Vector2(Math.random() * canvas.width, Math.random() * canvas.height), new Vector2(0, 0)));
}

// Loop do jogo
function gameLoop() {
  // Limpar a tela
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Atualizar a posição da nave
  ship.update();

  // Atualizar a posição dos inimigos
  enemies.forEach((enemy) => {
    enemy.update();
  });

  // Desenhar a nave
  ship.draw(ctx);

  // Desenhar os inimigos
  enemies.forEach((enemy) => {
    enemy.draw(ctx);
  });

  // Verificar se a nave colidiu com algum inimigo
  enemies.forEach((enemy) => {
    if (ship.collidesWith(enemy)) {
      // Se a nave colidiu com o inimigo, reinicie o jogo
      ship.position = new Vector2(canvas.width / 2, canvas.height / 2);
      ship.velocity = new Vector2(0, 0);
      enemies.forEach((enemy) => {
        enemy.position = new Vector2(Math.random() * canvas.width, Math.random() * canvas.height);
        enemy.velocity = new Vector2(0, 0);
      });
    }
  });

  // Solicitar o próximo quadro
  requestAnimationFrame(gameLoop);
}

// Iniciar o loop do jogo
gameLoop();
