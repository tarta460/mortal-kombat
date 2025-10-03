// script.js
const characters = {
  "Scorpion": { hp: 100, attack: 25 },
  "Sub-Zero": { hp: 100, attack: 20 },
  "Liu Kang": { hp: 100, attack: 30 },
  "Raiden": { hp: 100, attack: 22 }
};

let player = {};
let enemy = {};

function selectCharacter(name) {
  player = { ...characters[name] };
  player.name = name;

  const enemies = Object.keys(characters).filter(char => char !== name);
  const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
  enemy = { ...characters[randomEnemy] };
  enemy.name = randomEnemy;

  document.getElementById("player-name").textContent = player.name;
  document.getElementById("player-hp").textContent = player.hp;
  document.getElementById("enemy-name").textContent = enemy.name;
  document.getElementById("enemy-hp").textContent = enemy.hp;

  document.getElementById("character-selection").classList.add("hidden");
  document.getElementById("battle-screen").classList.remove("hidden");

  log(`Te enfrentás a ${enemy.name}!`);
}

function attack() {
  const damage = Math.floor(Math.random() * player.attack);
  enemy.hp -= damage;
  if (enemy.hp < 0) enemy.hp = 0;
  document.getElementById("enemy-hp").textContent = enemy.hp;
  log(`${player.name} hace ${damage} de daño a ${enemy.name}`);

  if (enemy.hp <= 0) {
    log(`¡${player.name} gana!`);
    return;
  }

  setTimeout(() => {
    const enemyDamage = Math.floor(Math.random() * enemy.attack);
    player.hp -= enemyDamage;
    if (player.hp < 0) player.hp = 0;
    document.getElementById("player-hp").textContent = player.hp;
    log(`${enemy.name} contraataca con ${enemyDamage} de daño`);

    if (player.hp <= 0) {
      log(`¡${enemy.name} gana!`);
    }
  }, 1000);
}

function log(message) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += `<p>${message}</p>`;
  logBox.scrollTop = logBox.scrollHeight;
}
