// character creation
const knight = new PIXI.Container();

//knight_move
function knightCreation(spriteSheet) {
    let knight_move_arr = [];
    knight_move_arr.push(spriteSheet.textures["knight_new_0.png"],
        spriteSheet.textures["knight_new_1.png"],
        spriteSheet.textures["knight_new_2.png"],
        spriteSheet.textures["knight_new_3.png"]);
    let knight_anim_move = new PIXI.AnimatedSprite(knight_move_arr);
    knight_anim_move.anchor.x = 0.5;
    knight_anim_move.anchor.y = 0.5;
    //knight_anim_move.scale.set(SCALE,SCALE / 1.5);
    //knight_anim_move.anchor.y = knight_anim_move.texture.height / knight_anim_move.texture.width - 1;
    knight_anim_move.scale.set(SCALE,SCALE);
    knight_anim_move.animationSpeed = 0.171;
    knight_anim_move.name = 'anim_sprite';
    knight_anim_move.play();


    knight.addChild(knight_anim_move);

    knight.x = app.renderer.width / 2;
    knight.y = app.renderer.height / 2;
    app.stage.addChild(knight);
}

// output death scene (now only text)
// TODO: end of level form
function deathCharacter(reason) {
    gameOn = false;
    devilDanceOn = false;

    controlsMenuMode();
    knight.vy = -10;
    switch(reason) {
        case 'falling':
            app.ticker.remove(deathFogMovement);
            app.ticker.remove(alphaPlato.platos[alphaPlato.currentPlato].tickerCollision);
            app.ticker.add(knightFallUnder);
            app.ticker.add(deathFogRetreat);
            break;
        case 'creatures in the dark':
            app.ticker.remove(alphaPlato.platos[alphaPlato.currentPlato].tickerCollision);
            app.ticker.add(knightFallHalf);
            app.ticker.remove(deathFogMovement);
            app.ticker.add(deathFogRetreat);
            break;
        case 'spikes':
            app.ticker.remove(alphaPlato.platos[alphaPlato.currentPlato].tickerCollision);
            app.ticker.add(knightFallHalf);
            app.ticker.remove(deathFogMovement);
            app.ticker.add(deathFogRetreat);
            break;
        case 'monster':
            app.ticker.remove(alphaPlato.platos[alphaPlato.currentPlato].tickerCollision);
            app.ticker.add(knightFallHalf);
            app.ticker.remove(deathFogMovement);
            app.ticker.add(deathFogRetreat);
            break;
        default:
            break;
    }

    const richText = new PIXI.Text('you died by\n'+ reason +'.\nbest: '+maxCounter+' m', style);
    richText.x = 20;
    richText.y = 20;

    app.stage.removeChild(counterText);
    // app.stage.addChild(richText);
    createRestartMenu(reason, app.loader.resources['restartButton'].texture);
    app.ticker.add(restartMenuAppearance);
}

// ----------------  death by falling -----------------
let death_plato_reDraw = true;
function knightFallUnder(){
    knight.position.y += knight.vy;
    knight.vy += 1;
    knight.rotation += 0.2;
    if(knight.position.y > app.renderer.height/2)
    {
        app.stage.removeChild(knight);
        app.ticker.remove(knightFallUnder);
    }
}
function deathFogRetreat(){
    deathContainer.position.y += 3;
    if(deathContainer.position.y > app.renderer.height)
    {
        app.ticker.remove(deathFogRetreat);
        app.ticker.remove(devilsDance);
    }
}

// ---------------------------- death by creatures in the dark -----------------------------
function knightFallHalf(){
    knight.getChildByName('anim_sprite').stop();
    knight.position.y += knight.vy;
    knight.vy += 1;
    knight.rotation += 0.2;
    if(death_plato_reDraw && knight.position.y > app.renderer.height/2){
        app.ticker.remove(knightFallHalf);
    }
}



//================================= Enemy demon ========================================

function createChort(){
    // todo maybe refactor
    const labyrinth_demon = new PIXI.Container();

    let txtArr1 = [];
    txtArr1.push(spriteSheet.textures['chort_idle_anim_f0.png']);
    txtArr1.push(spriteSheet.textures['chort_idle_anim_f1.png']);
    txtArr1.push(spriteSheet.textures['chort_idle_anim_f2.png']);
    txtArr1.push(spriteSheet.textures['chort_idle_anim_f3.png']);
    const chort_idle = new PIXI.AnimatedSprite(txtArr1);
    chort_idle.animationSpeed = 0.171;
    chort_idle.scale.set(SCALE,SCALE);
    chort_idle.anchor.set(0.5, 0.5);
    chort_idle.play();

    labyrinth_demon.addChild(chort_idle);
    return labyrinth_demon;
}

function createImp(){
    const imp_container = new PIXI.Container();

    let txtArr2 = [];
    txtArr2.push(spriteSheet.textures['imp_idle_anim_f0.png']);
    txtArr2.push(spriteSheet.textures['imp_idle_anim_f1.png']);
    txtArr2.push(spriteSheet.textures['imp_idle_anim_f2.png']);
    txtArr2.push(spriteSheet.textures['imp_idle_anim_f3.png']);
    const imp_idle = new PIXI.AnimatedSprite(txtArr2);
    imp_idle.animationSpeed = 0.171;
    imp_idle.scale.set(SCALE,SCALE);
    imp_idle.anchor.set(0.5, 0.5);
    imp_idle.play();

    imp_container.addChild(imp_idle);
    return imp_container;
}

function createSkeleton(){
    const skeleton_container = new PIXI.Container();

    let txtArr3 = [];
    txtArr3.push(spriteSheet.textures['skelet_idle_anim_f0.png']);
    txtArr3.push(spriteSheet.textures['skelet_idle_anim_f1.png']);
    txtArr3.push(spriteSheet.textures['skelet_idle_anim_f2.png']);
    txtArr3.push(spriteSheet.textures['skelet_idle_anim_f3.png']);
    const skeleton_idle = new PIXI.AnimatedSprite(txtArr3);
    skeleton_idle.animationSpeed = 0.171;
    skeleton_idle.scale.set(SCALE,SCALE);
    skeleton_idle.anchor.set(0.5, 0.5);
    skeleton_idle.play();

    skeleton_container.addChild(skeleton_idle);
    return skeleton_container;
}


// ============================================= generic methods ============================================

// checks and rescale enemy texture if it moves in opposite side then looks
/*** enemyContainer - PIXI.Container, x_direction - number*/
function enemyTurn(enemyContainer, x_direction){
    // look right, move left
    if(enemyContainer.scale.x > 0 && x_direction < 0 || enemyContainer.scale.x < 0 && x_direction > 0){
        enemyContainer.scale.x = -enemyContainer.scale.x
    }
}