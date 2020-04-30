// unique identifier of every plato
let N_plato = 0;

// fill methods for decomposing
function fillCollisionMap(plato){
    // check for right textureMap format
    if( !Boolean(plato.textureMap) || !Boolean(plato.textureMap[0]) ||
        plato.textureMap.length < 1 || plato.textureMap[0].length < 1)
    {
        alert(`Execution error:\nfillCollisionMap: textureMap of ${plato.name} with total index ${plato.index} is empty of broken,\nstability of the program's continued operation is under threat`);
        return null;
    }

    let collisionMap = [];
    for (let j = 0; j < plato.textureMap.length; j++){
        collisionMap[j] = [];
        for (let i = 0; i < plato.textureMap[j].length; i++){
            collisionMap[j][i] = returnCollisionType(plato.textureMap[j][i]);
        }
    }
    return collisionMap;
}

function fillOneTexture(name, spritesheet){
    let temp_texture;
    if(isNaN(name)){ // if not number
        temp_texture = new PIXI.Sprite(spritesheet.textures[ name ]);
    }
    else{ // if number
        switch (name) {
            case 0:
                temp_texture = new PIXI.Sprite(app.loader.resources['void'].texture);
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                temp_texture = new PIXI.Sprite(spritesheet.textures["floor_1.png"]);
                break;
            case 8:
                temp_texture = new PIXI.Sprite(spritesheet.textures["floor_2.png"]);
                break;
            case 9:
                temp_texture = new PIXI.Sprite(spritesheet.textures["floor_3.png"]);
                break;
            case 10:
                temp_texture = new PIXI.Sprite(spritesheet.textures["floor_4.png"]);
                break;
            case 11:
                temp_texture = new PIXI.Sprite(spritesheet.textures["floor_6.png"]);
                break;
            case 12:
                temp_texture = new PIXI.Sprite(spritesheet.textures["floor_7.png"]);
                break;
            case 13:
                temp_texture = new PIXI.Sprite(spritesheet.textures["floor_8.png"]);
                break;
            case 14:
                temp_texture = new PIXI.Sprite(spritesheet.textures["floor_spikes_anim_f0.png"]);
                break;
        }
    }
    return temp_texture;
}


const CHORT_EQUALIZER = 8 * SCALE;
function platoInitialization(plato, spritesheet){
    // textures initialization
    plato.container = new PIXI.Container();
    for(let y = 0; y < plato.height; y++){
        for(let x = 0; x < plato.width; x++){
            let temp_texture = fillOneTexture(plato.textureMap[y][x], spritesheet);
            temp_texture.position.set(TILE_SIZE * x, TILE_SIZE * y);
            temp_texture.scale.set(SCALE, SCALE);
            plato.container.addChild(temp_texture);
        }
    }

    // enemies initialization
    if(plato.monsterPosition !== undefined) {
        plato.monsterContainer = [];
        for (let i = 0; i < plato.monsterPosition.length; i++){
            const tempEnemy = createChort();
            tempEnemy.position.set((plato.monsterPosition[i].x + 0.5) * TILE_SIZE, (plato.monsterPosition[i].y + 0.5) * TILE_SIZE  - CHORT_EQUALIZER);
            plato.container.addChild(tempEnemy);
            plato.monsterContainer.push(tempEnemy);
        }
    }
    return plato;
}

function returnCollisionType(textureName){
    //return textureType > 0 ? 0 : 1;
    if(!isNaN(textureName)){ // if number
        return textureName > 0 ? 0 : 1
    }
    else { // if not number
        if(textureName === 'edge.png'){
            return 1;
        }
        else if(textureName.indexOf('wall') > -1 && textureName.indexOf('top') > -1){
            return 1;
        }
        else if(textureName.indexOf('wall') > -1){
            return 2;
        }
    }
}

// rebuilt for check plato now contains knight
// method of instance of plato, return bool
function checkPositionInside(pos) {
//     console.log(`plato: x1 = ${this.container.position.x}, y1 = ${this.container.position.y};
// knight: x = ${pos.x}, y = ${pos.y}
// plato: x2 = ${this.container.position.x + this.width * TILE_SIZE}, y2 = ${this.container.position.y + this.height * TILE_SIZE}`);
    //rebuilt conditions
    if(pos.x > this.container.position.x + this.width * TILE_SIZE || //right border
        pos.x < this.container.position.x || //left border
        pos.y > this.container.position.y + this.height * TILE_SIZE || //bottom border
        pos.y < this.container.position.y){ //upper border
        //console.log(`knight outside plato '${this.name}'`);
        return false;
    }
    return true;
}

// return bool, was plato changed
function isPlatoChanged(characterPosition) {
    //всё происходит в методе нахождения клетки рыцаря в данном плато (что-то типа checkTile)
    if (alphaPlato.platos[alphaPlato.currentPlato].containsKnight(characterPosition) )
    {
        return false;
    }
    if(alphaPlato.platos[alphaPlato.currentPlato - 1] !== undefined &&
        alphaPlato.platos[alphaPlato.currentPlato - 1].containsKnight(characterPosition))
    {
        //console.log('plato changed -1');
        if(alphaPlato.platos[alphaPlato.currentPlato].tickerCollision !== undefined)
            app.ticker.remove(alphaPlato.platos[alphaPlato.currentPlato].tickerCollision);
        if(alphaPlato.platos[alphaPlato.currentPlato - 1].tickerCollision !== undefined)
            app.ticker.add(alphaPlato.platos[alphaPlato.currentPlato - 1].tickerCollision);
        alphaPlato.currentPlato--;//changing here
        return true;
    }

    if(alphaPlato.platos[alphaPlato.currentPlato + 1] !== undefined &&
        alphaPlato.platos[alphaPlato.currentPlato + 1].containsKnight(characterPosition))
    {
        //console.log('plato changed +1');
        if(alphaPlato.platos[alphaPlato.currentPlato].tickerCollision !== undefined)
            app.ticker.remove(alphaPlato.platos[alphaPlato.currentPlato].tickerCollision);
        if(alphaPlato.platos[alphaPlato.currentPlato + 1].tickerCollision !== undefined)
            app.ticker.add(alphaPlato.platos[alphaPlato.currentPlato + 1].tickerCollision); //changing here
        alphaPlato.currentPlato++;
        return true;
    }
}

//find and return current tile
function checkTile(pos, plato) {
    let i = 0;
    for(i; i < plato.width; i++){
        if(pos.x < plato.container.position.x + i * TILE_SIZE){
            break;
        }
    }
    i--;

    let j = 0;
    for(j; j < plato.height; j++){
        if(pos.y < plato.container.position.y  + j * TILE_SIZE){
            break;
        }
    }
    j--;

    return {x: i, y: j};
}

/*collision types:
0 - no collision
1 - death collision (fall)
2 - wall collision (can't walk in)*/
function checkCollision(characterPosition, plato) {
    if(isPlatoChanged(characterPosition)){
        return -1; // maybe we ran out of plato's border, but get into another
    }
    let curTile = checkTile(characterPosition, plato);
    if(plato.collisionMap[curTile.y] === undefined)
        return 1;
    else if(plato.collisionMap[curTile.y][curTile.x] === undefined){
        return 1;
    }
    else{
        return plato.collisionMap[curTile.y][curTile.x];
    }
}


// method for adding plato to the alphaPlato,
// set its position on the scene and
// addChild (it) on the stage
// WARNING: no more require to push plato in alphaPlato.platos
// WARNING: so start index for operation is 1
function addPlatoToAlpha(newPlato) {
    // positioning/graphical plato splicing
    if(this.platos.length === 1)
    {
        newPlato.container.position.x = app.renderer.width/2 - TILE_SIZE * (newPlato.tileEnter.x + 0.5);
        newPlato.container.position.y = app.renderer.height/2 - TILE_SIZE * (newPlato.tileEnter.y + 0.5);

    }
    else {
        newPlato.container.position.x = this.platos[this.platos.length - 2].container.position.x +
            this.platos[this.platos.length - 2].tileExit.x * TILE_SIZE -
            newPlato.tileEnter.x * TILE_SIZE;

        newPlato.container.position.y = this.platos[this.platos.length - 2].container.position.y +
            this.platos[this.platos.length - 2].tileExit.y * TILE_SIZE -
            (newPlato.tileEnter.y + 1) * TILE_SIZE;
    }
    // initialize identifier
    newPlato.index = N_plato++;

    // update all front layer textures
    app.stage.addChild(newPlato.container);
    // app.stage.removeChild(counterText);
    // app.stage.addChild(counterText);
    app.stage.removeChild(deathContainer);
    app.stage.addChild(deathContainer);
}


function removePlatoFromAlpha(oldPlato) {
    this.platos.shift();
    app.stage.removeChild(oldPlato);
}

function moveAllPlatosOn(x, y) {
    for(let i = 0; i < this.platos.length; i++)
    {
        this.platos[i].container.x += x;
        this.platos[i].container.y += y;
    }
    alphaPlato.updateAlphaPlato();
}

function updateAlphaPlatoPlatos() {
    if(this.platos.length < this.maxPlato)
    {
        for(let i = this.platos.length; i < this.maxPlato; i++)
        {
            if(i === 0) {
                this.platos[0] = {...platoPatterns[0]};
                this.platos[0] = platoInitialization(this.platos[0], spriteSheet);
                this.addPlato(this.platos[0]);
            }
            else {
                this.platos[i] = {...randomPlato()};
                if(this.platos[i].tickerAnimation !== undefined){
                    this.platos[i] = this.platos[i].tickerAnimation(spriteSheet);
                }
                else{
                    this.platos[i] = platoInitialization(this.platos[i], spriteSheet);
                }
                if(this.platos[i].monsterBehaviour !== undefined && !MONSTERS_HERE) {
                    app.ticker.add(this.platos[i].monsterBehaviour, this.platos[i]);
                    MONSTERS_HERE = true;
                }
                this.addPlato(this.platos[i]);
            }

        }
    }

    if(this.currentPlato > 2) {
        // remove useless
        if(
            this.platos[0].monsterBehaviour !== undefined &&
            MONSTERS_HERE && // turned on monsterBehaviour
            alphaPlato.platos.filter(plato => plato.monsterBehaviour !== undefined).length === 1 // only plato[0] with monsters
        ){
            app.ticker.remove(this.platos[0].monsterBehaviour);
            MONSTERS_HERE = false;
        }

        this.currentPlato--;
        this.removePlato(this.platos[0]);

        this.platos[this.maxPlato - 1] = {...randomPlato()};
        if(this.platos[this.maxPlato - 1].tickerAnimation !== undefined){
            this.platos[this.maxPlato - 1] = this.platos[this.maxPlato - 1].tickerAnimation(spriteSheet);
        }
        else{
            this.platos[this.maxPlato - 1] = platoInitialization(this.platos[this.maxPlato - 1], spriteSheet);
        }
        if(this.platos[this.maxPlato - 1].monsterBehaviour !== undefined && !MONSTERS_HERE) {
            app.ticker.add(this.platos[this.maxPlato - 1].monsterBehaviour, this.platos[this.maxPlato - 1]);
        }
        this.addPlato(this.platos[this.maxPlato - 1]);

        app.stage.removeChild(knight);
        app.stage.addChild(knight);
        app.stage.removeChild(counterText);
        app.stage.addChild(counterText);
        app.stage.removeChild(deathContainer);
        app.stage.addChild(deathContainer);
    }

}

// random int in interval [min,max)
function randomInt(min, max){
    return Math.floor(min + Math.random() * (max - min));
}

function randomPlato(){
    let tempPlato;
    if(speed_gear <= 3){
        tempPlato = {...platoPatterns[randomInt(1, platoPatterns.length)] };
    }
    else{
        tempPlato = {...platoPatterns[randomInt(3, platoPatterns.length)] };
    }

    // for plato test
    //let tempPlato = {...platoPatterns[platoPatterns.length - 1] };
    //let tempPlato = {...platoPatterns[randomInt(platoPatterns.length - 2, platoPatterns.length)] };
    return tempPlato;
}