// death fog controls
const TILES_UP_SHIFT = 40;
const DEATH_FOG_START_SPEED = 0.5;
let death_fog_speed = 0;
let death_fog_speed_plus = 0.15;

// --------------------------------- tiles' counter -----------------------------
let tileCounter = 0;
let maxCounter = 0;

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});
let counterText = new PIXI.Text(tileCounter+' m', style);
counterText.position.set(400,50);

// app.stage.addChild(counterText);

function tileCounterUpdate(movement_delta) {
    tileCounter += movement_delta;
    if(tileCounter > maxCounter)
        maxCounter = tileCounter;
    counterText.text = tileCounter+' m';
}

//
// ----------------------------------- death fog -----------------------------
let deathContainer = createDeathContainer();

function createGradTexture() {
    // adjust it if somehow you need better quality for very very big images
    const quality = 256;
    const canvas = document.createElement('canvas');
    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    grd.addColorStop(0, 'rgba(0, 0, 0, 0.0)');
    grd.addColorStop(0.6, 'rgba(0, 0, 0, 1.0)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    return PIXI.Texture.from(canvas);
}
function createDeathContainer(){
    let deathContainer = new PIXI.Container();
    const gradTextureDeath = createGradTexture();

    const GRAD_WIDTH = 100;
    const gradDeath = new PIXI.Sprite(gradTextureDeath);
    gradDeath.position.set(app.renderer.width, 0);
    gradDeath.rotation = Math.PI/2;
    gradDeath.width = GRAD_WIDTH;
    gradDeath.height = app.renderer.width;
    const rectDeath = new PIXI.Graphics();
    rectDeath.beginFill(0x000000);
    rectDeath.drawRect(0,0,app.renderer.width, app.renderer.height * 0.75);
    rectDeath.endFill();
    rectDeath.position.y = gradDeath.width;

// in index.js
    deathContainer.addChild(rectDeath);
    deathContainer.addChild(gradDeath);
    return deathContainer;
}


// vars in the begining of this file
let speed_gear = 0;
function deathFogMovement() {
    if(Math.floor(maxCounter/TILES_UP_SHIFT) - speed_gear > 0) {
        death_fog_speed += death_fog_speed_plus;
        speed_gear++;
    }
    deathContainer.position.y -= death_fog_speed;
    if (deathContainer.position.y + TILE_SIZE * 3 < knight.position.y) {
        deathCharacter('creatures in the dark');
    }
}

app.ticker.add(deathFogMovement);

// --------------------------------- death devils ---------------------------------
const DEVILS_COUNT = 5;
let devils = [];
for (let i = 0; i < DEVILS_COUNT; i++){
    devils.push(new PIXI.Sprite());
}

for(let i = 0 ; i < DEVILS_COUNT; i++){
    devils[i].anchor.set(0.5, 0.5);
    let pos = 4*TILE_SIZE + 1.5*i*TILE_SIZE; // pos on horizontal line
    devils[i].position.set(pos, TILE_SIZE * 2.5);
    deathContainer.addChild(devils[i]);
}
let devilDanceOn = true;
function devilsDance(){
    for(let i = 0; i < DEVILS_COUNT; i++){
        const dude = devils[i];
        let rand = randomInt(-1,2);
        if(devilDanceOn)
        {
            dude.position.x += rand * 2;
            dude.position.y += rand * 0.1;
        }
        let side = dude.position.x - app.renderer.width/2;
        // distance to view point (center - knight)
        const hypotenuse = Math.sqrt(
            Math.pow(dude.position.y + deathContainer.position.y - app.renderer.height/2, 2) +
            Math.pow(side, 2)
        );
        dude.rotation = Math.acos(side/hypotenuse) - Math.PI/2;
    }
}
app.ticker.add(devilsDance);


// add following death on stage in index.js
deathContainer.position.set(0, app.renderer.height);
// app.stage.addChild(deathContainer);