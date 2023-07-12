
// ==== ADICIONADO AO PROJETO ORIGINAL ===
async function fetchDataFromAPI() {

  try{
  
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');    
      return response.data;  
      // Faça algo com os dados recebidos, como atualizar o jogo
      // ...
    }
    catch(error) {
      // Trate erros aqui
      throw error;
    }
}
//=======================================

function preload() {
  this.load.image("player", "assets/repl.png");
}
// async Adicionado AO MÉTODO create
async function create() {

// ==== ADICIONADO AO PROJETO ORIGINAL ===
  this.textObjects = [];
// ======================================  
  this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  this.player = this.physics.add
    .image(config.width / 2, config.height / 2, "player")
    .setScale(0.25, 0.25);
  this.player.setCollideWorldBounds(true);

  //===============================
 
// ==== ADICIONADO AO PROJETO ORIGINAL ===
    // Crie objetos do jogo e defina a lógica inicial
    this.text = this.add.text(10, 10, 'Carregando...', { fontSize: '24px', fill: '#000000' });

  
     try{
      let dados = await fetchDataFromAPI();

    
      this.text.setText(dados.count);

      dados.results.forEach((item, index) => {
      const text = this.add.text(10, 30 + index * 20, item.name,{ fontSize: '16px', fill: '	#000000' });
      this.textObjects.push(text);
        
    });
       
     }catch(error){
       this.text.setText(error);
     }
  //===============================
  //===============================
}

function update() {

  let cursors = this.input.keyboard.createCursorKeys();
  if (
    cursors.left.isDown ||
    this.a.isDown ||
    cursors.right.isDown ||
    this.d.isDown
  )
    this.player.setVelocityX(cursors.left.isDown || this.a.isDown ? -160 : 160);
  else this.player.setVelocityX(0);
  if (
    cursors.up.isDown ||
    this.w.isDown ||
    cursors.down.isDown ||
    this.s.isDown
  )
    this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -160 : 160);
  else this.player.setVelocityY(0);
}

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 400,
  backgroundColor: "#f9f9f9",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
      },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
