let gameOn = false;

function createWelcomeMenu(playButtonTexture){
    const transparency = 0.3;

    // rectangle
    const rect = new PIXI.Graphics();
    rect.zIndex = 1;
    rect.beginFill(0x000000, transparency); // gray - 0x808080
    rect.drawRect(0,0,app.renderer.width, app.renderer.height * 0.6);
    rect.endFill();
    rect.position.set(0,0)
    welcomeMenu.addChild(rect);

    // gradient
    const quality = 256;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = quality;
    tempCanvas.height = 1;

    const ctx = tempCanvas.getContext('2d');
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    grd.addColorStop(0.0, `rgba(0, 0, 0, ${transparency})`);
    grd.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    const gradTexture =  PIXI.Texture.from(tempCanvas);

    const grad = new PIXI.Sprite(gradTexture);
    grad.zIndex = 1;
    grad.position.set(app.renderer.width ,app.renderer.height * 0.6);
    grad.rotation = 0.5 * Math.PI ;
    grad.width = app.renderer.height * 0.4;
    grad.height = app.renderer.width;
    welcomeMenu.addChild(grad);


    // button
    const buttonContainer = new PIXI.Container();
    buttonContainer.zIndex = 2;
    const buttonTexture = new PIXI.Sprite(playButtonTexture);
    buttonTexture.scale.set(SCALE/2, SCALE/2);
    buttonContainer.addChild(buttonTexture);
    buttonContainer.position.x = app.renderer.width/2 - buttonTexture.width/2;
    buttonContainer.position.y = app.renderer.height * 0.7 - buttonTexture.height/2;
    buttonContainer.interactive = true;
    buttonContainer.buttonMode = true;
    buttonContainer.on('pointertap', () => {
        gameOn = !gameOn;
        if (gameOn) {
            startGame();
        }
    });
    welcomeMenu.addChild(buttonContainer);

    // text
    const textStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#cd853f', '#a0522d'], // gradient
        stroke: '#C0C0C0',
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });
    const welcomeText_1 = new PIXI.Text('Welcome', textStyle);
    const welcomeText_2 = new PIXI.Text('to the', textStyle);
    const welcomeText_3 = new PIXI.Text('DUNGEON COLLECTION', textStyle);
    welcomeText_1.x = app.renderer.width / 2 - welcomeText_1.width/2;
    welcomeText_1.y = app.renderer.height * 0.15;
    welcomeMenu.addChild(welcomeText_1);
    welcomeText_2.x = app.renderer.width / 2 - welcomeText_2.width/2;
    welcomeText_2.y = app.renderer.height * 0.25;
    welcomeMenu.addChild(welcomeText_2);
    welcomeText_3.x = app.renderer.width / 2 - welcomeText_3.width/2;
    welcomeText_3.y = app.renderer.height * 0.35;
    welcomeMenu.addChild(welcomeText_3);
}

function welcomeMenuRemove(){
    welcomeMenu.position.y -= welcomeMenu.vy;
    welcomeMenu.vy += 1;
    if(welcomeMenu.position.y < - app.renderer.height - 100)
    {
        app.stage.removeChild(welcomeMenu);
        app.ticker.remove(welcomeMenuRemove);
    }
}
function startGame(){
    welcomeMenu.vy = 40;
    app.ticker.add(welcomeMenuRemove);
    death_fog_speed = DEATH_FOG_START_SPEED;
    controlsGameMode();
    app.stage.addChild(counterText);
}


let welcomeMenu = new PIXI.Container();
welcomeMenu.zIndex = 5;
createWelcomeMenu();


function createRestartMenu(reason, restartButtonTexture) {
    const transparency = 0.3;

    // rectangle
    const rect = new PIXI.Graphics();
    rect.zIndex = 1;
    rect.beginFill(0x000000, transparency); // gray - 0x808080
    rect.drawRect(0,0,app.renderer.width, app.renderer.height * 0.6);
    rect.endFill();
    rect.position.set(0,0)
    restartMenu.addChild(rect);

    // gradient
    const quality = 256;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = quality;
    tempCanvas.height = 1;

    const ctx = tempCanvas.getContext('2d');
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    grd.addColorStop(0.0, `rgba(0, 0, 0, ${transparency})`);
    grd.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    const gradTexture =  PIXI.Texture.from(tempCanvas);

    const grad = new PIXI.Sprite(gradTexture);
    grad.zIndex = 1;
    grad.position.set(app.renderer.width ,app.renderer.height * 0.6);
    grad.rotation = 0.5 * Math.PI ;
    grad.width = app.renderer.height * 0.4;
    grad.height = app.renderer.width;
    restartMenu.addChild(grad);


    // button
    const buttonContainer = new PIXI.Container();
    buttonContainer.zIndex = 2;
    const buttonTexture = new PIXI.Sprite(restartButtonTexture);
    buttonTexture.scale.set(SCALE/2, SCALE/2);
    buttonContainer.addChild(buttonTexture);
    buttonContainer.position.x = app.renderer.width/2 - buttonTexture.width/2;
    buttonContainer.position.y = app.renderer.height * 0.7 - buttonTexture.height/2;
    buttonContainer.interactive = true;
    buttonContainer.buttonMode = true;
    buttonContainer.on('pointertap', () => {
        location = location;
    });
    restartMenu.addChild(buttonContainer);

    // text
    const textStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#cd853f', '#a0522d'], // gradient
        stroke: '#C0C0C0',
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });
    const restartText_1 = new PIXI.Text('You died by', textStyle);
    const restartText_2 = new PIXI.Text(reason, textStyle);
    const restartText_3 = new PIXI.Text(tileCounter+' m', textStyle);
    restartText_1.x = app.renderer.width / 2 - restartText_1.width/2;
    restartText_1.y = app.renderer.height * 0.15;
    restartMenu.addChild(restartText_1);
    restartText_2.x = app.renderer.width / 2 - restartText_2.width/2;
    restartText_2.y = app.renderer.height * 0.25;
    restartMenu.addChild(restartText_2);
    restartText_3.x = app.renderer.width / 2 - restartText_3.width/2;
    restartText_3.y = app.renderer.height * 0.35;
    restartMenu.addChild(restartText_3);

    restartMenu.position.y = -app.renderer.height - 100;
    restartMenu.vy = 10;
    restartMenu.zIndex = 1
    app.stage.addChild(restartMenu);
}
function restartMenuAppearance(){
    restartMenu.position.y += restartMenu.vy;
    if(restartMenu.position.y > 0)
    {
        restartMenu.vy -= 0.5;
        restartMenu.zIndex = 2;
    }
    if(restartMenu.zIndex === 2){
        app.ticker.remove(restartMenuAppearance);
    }
}
const restartMenu = new PIXI.Container();



