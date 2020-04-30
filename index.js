document.body.appendChild(app.view);

let spriteSheet;


app.loader.add('devil','images/devil-transparent.png')
    .add('images/TexturePacker/dungeonTileset.json')
    .add('void','images/void.png')
    .add('playButton', 'images/playB.png')
    .add('restartButton', 'images/restartB.png')
    .load((resources,loader)=>{
    spriteSheet = app.loader.resources["images/TexturePacker/dungeonTileset.json"].spritesheet;

    if(spriteSheet === null || spriteSheet === undefined){
        alert('Input data error:\n' +
            'Sprites\' sheet marking file was not found or damaged\n' +
            'Further stability of the program is not guaranteed');
    }

    // complete platos with textures and collision maps
    for(let i = 0; i < platoPatterns.length; i++){
        if(platoPatterns[i].collisionMap !== undefined){ // if collision map is not pre initialized...
            platoPatterns[i].collisionMap = fillCollisionMap(platoPatterns[i]);
        }
    }
    alphaPlato.updateAlphaPlato();

    // add knight -------------------------------

    knightCreation(spriteSheet);

    //---------------------------------------- devils ------------------------------------------
    devils[0].texture = app.loader.resources['devil'].texture;
    for (let i = 0; i < DEVILS_COUNT; i++){
        devils[i].texture = app.loader.resources['devil'].texture;
    }

    // welcome menu
    createWelcomeMenu(app.loader.resources['playButton'].texture);


    // ---- add on stage
    // app.stage.addChild(counterText);

    app.stage.addChild(deathContainer);
    deathContainer.zIndex = 2;

    app.stage.addChild(welcomeMenu);
});

