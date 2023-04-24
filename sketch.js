// caracteristicas da bola, posição X, Y, Diamentro e Raio
let posxBola= 300, posyBola= 200, diaBola= 20, raiBola= diaBola/2;
let velxBola= 10, velyBola= 10;

// caracteristicas da raquete, posição X, Y, Comprimento e Altura
let posxRaquete= 5, posyRaquete= 150, compRaquete= 10, altRaquete= 90;

// caracteristicas da raquete oponente, posição X, Y
let posxORaquete= 580, posyORaquete= 150, velyORaquete;

// placar do jogo
let placarp1= 0, placarp2= 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

// carregar os sons no jogo
function preload() {
  trilha = loadSound(src="/sons/soundtrack.mp3");
  ponto = loadSound(src="/sons/score.mp3");
  raquetada = loadSound(src="/sons/hit.mp3");
}

// criar o cenário
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

// criar a bola
function criarBola(){
  circle(posxBola, posyBola, diaBola)
}

// dar movimento a bola
function moverBola(){
  posxBola += velxBola; //mover o circulo no eixo X
  posyBola += velyBola; //mover o circulo no eixo Y
}

// verificar se bateus nas bordas e fazer voltar
function baterNaBordaVoltar(){
  //fazer a bola voltar ao bater nas bordas laterias
  if(posxBola + raiBola > width || posxBola - raiBola < 0){
  velxBola *= -1;
  }
  //fazer a bola voltar ao bater nas bordas superior/inferior
  if(posyBola + raiBola > height || posyBola - raiBola < 0){
     velyBola *= -1;
     }
}

// criar a raquete
function criarRaquete(x, y){
  rect(x, y, compRaquete, altRaquete)
}

// dar movimento a raquete
function moverRaquete(){
 if(keyIsDown(UP_ARROW)){
  posyRaquete -= 10;
 }
  if(keyIsDown(DOWN_ARROW)){
    posyRaquete += 10;
  }
  
}

// criar interação com a raquete
function baterNaRaquete(x, y){
  colidiu = collideRectCircle(x, y, compRaquete, altRaquete, posxBola, posyBola, raiBola);
  if(colidiu){
    velxBola *= -1;
    raquetada.play();
  }
}

// criar movimento na raquete oponente
function moverRaqueteOponente(){
  velyORaquete = posyBola - posyORaquete - compRaquete / 2 - 90;
  posyORaquete += velyORaquete;
}

// criar o painel do placar
function mostrarPlacar(x, y){
  textSize(25);
  stroke(255);
  textAlign(CENTER);
  fill(color(255,69,0));
  rect((y-25), 5, 50, 30);
  fill(255);
  text(x, y, 27);
}

// somar os pontos quando a bola toca a borda
function pontuar(){
  if(posxBola > 590){
    placarp1 += 1;
    ponto.play();
    posxBola = 300;
    posyBola = 200;
     }
  if(posxBola < 10){
    placarp2 += 1;
    ponto.play();
    posxBola = 300;
    posyBola = 200;
  }
}

// função principal
function draw() {
  background(0); // mudar cor de fundo
  mostrarPlacar(placarp1, 150);
  mostrarPlacar(placarp2, 400);
  pontuar();
  criarBola(); // chama a função que cria a bola
  criarRaquete(posxRaquete, posyRaquete); // chama a função que cria a primeira raquete
  criarRaquete(posxORaquete, posyORaquete); // chama a função que cria a raquete do oponente
  moverBola(); // chama a função que dar movimento a bola
  moverRaquete(); // chama a função que dar movimento a raquete
  moverRaqueteOponente(); // chama a função que dar movimento a raquete oponente
  baterNaBordaVoltar(); // chama a função que faz a bolinha voltar ao tocar as bordas
  baterNaRaquete(posxRaquete, posyRaquete); // chama a função que cria a interação com a raquete
  baterNaRaquete(posxORaquete, posyORaquete); // chama a função que cria a interação com a raquete Oponente
}