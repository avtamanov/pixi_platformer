// alphaPlato is container for other platos, he is only moving
let alphaPlato = {
    currentPlato: 0, // index of current plato containing knight
    platos: [], // array of platos for store meta data
    maxPlato: 6,
    addPlato: undefined, // complex method of checking, adding new plato on stage
    removePlato: undefined, // complex method of checking, removing old plato from stage
    moveAllPlatos: undefined,
    updateAlphaPlato: undefined
};
alphaPlato.addPlato = addPlatoToAlpha;
alphaPlato.moveAllPlatos = moveAllPlatosOn;
alphaPlato.removePlato = removePlatoFromAlpha;
alphaPlato.updateAlphaPlato = updateAlphaPlatoPlatos;

let platoPatterns = [
    {
        name: 'start',
        index: undefined,
        type: 0,
        width: 7,
        height: 7,
        containsKnight: checkPositionInside,
        tileEnter: {x: 3, y: 3},
        tileExit: {x: 3, y: 0},
        textureMap: [
            [0, 0, 0, randomInt(1,14), 0, 0, 0],
            [0, 0, 0, randomInt(1,14), 0, 0, 0],
            [0, 0, randomInt(1,14), randomInt(1,14), randomInt(1,14), 0, 0],
            [0, 0, randomInt(1,14), randomInt(1,14), randomInt(1,14), 0, 0],    //5
            [0, 0, randomInt(1,14), randomInt(1,14), randomInt(1,14), 0, 0],
            [0, 0, 'edge.png', 'edge.png', 'edge.png', 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        collisionMap: [],
        container: {}
    },
    {
        name: 'zigzagTurnLeft',
        index: undefined,
        type: 1,
        width: 9,
        height: 9,
        containsKnight: checkPositionInside,
        tileEnter: {x: 6, y: 8},
        tileExit: {x: 2, y: 0},
        textureMap: [
            [0, 0, randomInt(1,14), 0             , 0             , 0             , 0             , 0, 0],                              //1
            [0, 0, randomInt(1,14), 0             , 0             , 0             , 0             , 0, 0],
            [0, 0, randomInt(1,14), 0             , randomInt(1,14), randomInt(1,14), randomInt(1,14), 0, 0],
            [0, 0, randomInt(1,14), 0             , randomInt(1,14), 'edge.png'    , randomInt(1,14), 0, 0],
            [0, 0, randomInt(1,14), 0             , randomInt(1,14), 0             , randomInt(1,14), 0, 0],    //5
            [0, 0, randomInt(1,14), 0             , randomInt(1,14), 0             , randomInt(1,14), 0, 0],
            [0, 0, randomInt(1,14), randomInt(1,14), randomInt(1,14), 0             , randomInt(1,14), 0, 0],
            [0, 0, 'edge.png'     , 'edge.png'    , 'edge.png'     , 0             , randomInt(1,14), 0, 0],
            [0, 0, 0             , 0             , 0             , 0             , randomInt(1,14), 0, 0]
        ],
        collisionMap: [],
        container: {}
    },
    {
        name: 'zigzagTurnRight',
        index: undefined,
        type: 2,
        width: 11,
        height: 9,
        containsKnight: checkPositionInside,
        tileEnter: {x: 3, y: 8},
        tileExit: {x: 7, y: 0},
        textureMap: [
            [0,0              , 0             , 0             , 0             , 0             , 0             , randomInt(1,14), 0                , 0, 0],                              //1
            [0,randomInt(1,14), randomInt(1,14), randomInt(1,14), randomInt(1,14), randomInt(1,14), 0          , randomInt(1,14), 0           , 0, 0],
            [0,randomInt(1,14), 'edge.png'    , 'edge.png'    , 'edge.png'    , randomInt(1,14), 0             , randomInt(1,14), 0              , 0, 0],
            [0,randomInt(1,14), randomInt(1,14), randomInt(1,14), 0           , randomInt(1,14), 0             , randomInt(1,14), 0              , 0, 0],
            [0,'edge.png'    , 'edge.png'    , randomInt(1,14), 0             , randomInt(1,14), 0             , randomInt(1,14), 0              , 0, 0],    //5
            [0,0             , 0             , randomInt(1,14), 0             , randomInt(1,14), 0             , randomInt(1,14), randomInt(1,14), randomInt(1,14), 0],
            [0,0             , 0             , randomInt(1,14), 0             , randomInt(1,14), 0             , 'edge.png'     , 'edge.png'      , randomInt(1,14), 0],
            [0,0             , 0             , randomInt(1,14), 0             , randomInt(1,14), randomInt(1,14), randomInt(1,14), randomInt(1,14),randomInt(1,14), 0],
            [0,0             , 0             , randomInt(1,14), 0             , 'edge.png'    , 'edge.png'    , 'edge.png'    , 'edge.png'       , 'edge.png'      , 0]
        ],
        collisionMap: [],
        container: {}
    },
    {
        name: 'spikesRunner',
        index: undefined,
        type: 3,
        width: 5,
        height: 9,
        containsKnight: checkPositionInside,
        tileEnter: {x: 2, y: 8},
        tileExit: {x: 2, y: 0},
        textureMap: [
            [0, 0, randomInt(1,14), 0, 0],
            [0, 14, 14, 14, 0],
            [0, 14, 14, 14, 0],
            [0, 14, 14, 14, 0],
            [0, 14, 14, 14, 0],
            [0, 14, 14, 14, 0],
            [0, 14, 14, 14, 0],
            [0, 14, 14, 14, 0],
            [0, 'edge.png', randomInt(1,14), 'edge.png', 0],
            ],
        collisionMap: [],
        container: {},
        tickerAnimation: undefined,
        tickerCollision: undefined
    },
    {
        name: 'spikesRoundRight',
        index: undefined,
        type: 4,
        width: 9,
        height: 9,
        containsKnight: checkPositionInside,
        tileEnter: {x: 4, y: 8},
        tileExit: {x: 4, y: 0},
        textureMap: [
            [0, 0, 0, 0, randomInt(1,14), 0, 0, 0, 0],
            [0, 14, 14, 14, 14, 14, 14, 14, 0],
            [0, 14, 'edge.png', 'edge.png', 'edge.png', 'edge.png', 'edge.png', 14, 0],
            [0, 14, 0, 0, 0, 0, 0, 14, 0],
            [0, 14, 0, 0, 0, 0, 0, 14, 0],
            [0, 14, 0, 0, 0, 0, 0, 14, 0],
            [0, 14, 0, 0, 0, 0, 0, 14, 0],
            [0, 14, 14, 14, 14, 14, 14, 14, 0],
            [0, 'edge.png', 'edge.png', 'edge.png', randomInt(1,14), 'edge.png', 'edge.png', 'edge.png', 0]
        ],
        collisionMap: [],
        container: {},
        tickerAnimation: undefined,
        tickerCollision: undefined
    },
    {
        name: 'spikesRectLeft',
        index: undefined,
        type: 5,
        width: 9,
        height: 5,
        containsKnight: checkPositionInside,
        tileEnter: {x: 7, y: 4},
        tileExit: {x: 1, y: 0},
        textureMap: [
            [0, randomInt(1,14), 0, 0, 0, 0, 0, 0, 0],
            [0, 14, 14, 14, 14, 14, 14, 14, 0],
            [0, 14, 14, 14, 14, 14, 14, 14, 0],
            [0, 14, 14, 14, 14, 14, 14, 14, 0],
            [0, 'edge.png', 'edge.png', 'edge.png', 'edge.png', 'edge.png', 'edge.png', randomInt(1,14), 0]
        ],
        collisionMap: [],
        container: {},
        tickerAnimation: undefined,
        tickerCollision: undefined
    },
    {
        name: 'monsterOpenPlato',
        index: undefined,
        type: 6,
        width: 13,
        height: 9,
        containsKnight: checkPositionInside,
        tileEnter: {x: 1, y: 8},
        tileExit: {x: 11, y: 0},
        textureMap: [
            ['wall_side_top_left.png','wall_top_left.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_right.png',randomInt(1,14),'wall_side_top_right.png'],
            ['wall_side_mid_left.png','wall_left.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_right.png',randomInt(1,14),'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),'wall_side_mid_right.png'],
            ['wall_side_front_left.png',randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),randomInt(1,14),'wall_side_front_right.png'],
            [0                       ,randomInt(1,14),'edge.png','edge.png','edge.png','edge.png','edge.png','edge.png','edge.png','edge.png','edge.png','edge.png',0],
        ],
        collisionMap: [],
        container: {},
        tickerAnimation: undefined,
        monsterBehaviour: undefined,
        monsterPosition: [{x:8, y:3}],
        monsterContainer: undefined
    },
    {
        name: 'monsterColumns',
        index: undefined,
        type: 7,
        width: 12,
        height: 15,
        containsKnight: checkPositionInside,
        tileEnter: {x: 10, y: 14},
        tileExit: {x: 1, y: 0},
        textureMap: [ // not include columns and doors (they're in tickerAnimation method)
            ['wall_side_top_left.png',0,'wall_top_left.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_side_top_right.png'],
            ['wall_side_mid_left.png',0,'wall_left.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_side_mid_right.png'],
            ['wall_side_mid_left.png',0,'column_top.png',0,'column_top.png',0,'column_top.png',0,'column_top.png',0,0,'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',0,'column_mid.png',0,'column_mid.png',0,'column_mid.png',0,'column_mid.png',0,0,'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',0,'column_top.png',0,'column_top.png',0,'column_top.png',0,'column_top.png',0,0,'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',0,'column_mid.png',0,'column_mid.png',0,'column_mid.png',0,'column_mid.png',0,0,'wall_side_mid_right.png'],
            ['wall_side_mid_left.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','doors_frame_left.png','doors_leaf_closed_u_l.png','doors_leaf_closed_u_r.png','wall_side_mid_right.png'],
            ['wall_side_mid_left.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png',0,0,0,'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',0,'column_top.png',0,'column_top.png',0,'column_top.png',0,'column_top.png',0,0,'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',0,'column_mid.png',0,'column_mid.png',0,'column_mid.png',0,'column_mid.png',0,0,'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',0,'column_top.png',0,'column_top.png',0,'column_top.png',0,'column_top.png',0,0,'wall_side_mid_right.png'],
            ['wall_side_mid_left.png',0,'column_mid.png',0,'column_mid.png',0,'column_mid.png',0,'column_mid.png',0,0,'wall_side_mid_right.png'],
            ['wall_side_mid_left.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_mid.png','wall_top_right.png',0,'wall_side_mid_right.png'],
            ['wall_side_front_left.png','wall_left.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_mid.png','wall_right.png',0,'wall_side_front_right.png'],
            [0,'edge.png','edge.png','edge.png','edge.png','edge.png','edge.png','edge.png','edge.png','edge.png',0,0]
        ],
        collisionMap: undefined, // assignment is in tickerAnimation for not duplicate pointer
        // button pos: {x:1, y:10}
        // door 2x2 pos: {x:9, y:6}
        openDoor: false,
        upLayer: false,
        container: {},
        tickerAnimation: undefined,
        monsterBehaviour: undefined,
        monsterPosition: [{x:1, y:2}, {x:1, y:8}],
        monsterContainer: undefined
    }
];


// ---------------------------------------- spikesRunner -------------------------------------
platoPatterns.find(plato => plato.name === 'spikesRunner').tickerAnimation = function (spriteSheet) {
    this.container = new PIXI.Container();
    const animSpeed = 0.2;
    let textArr = returnSpikesAnim(spriteSheet, 5);
    for(let y = 0; y < this.height; y++){
        for(let x = 0; x < this.width; x++){
            if((y % 2 === 1 && x === 2) || (y > 0 && y < 8 && y % 2 === 0 && x % 2 === 1)){
                let if_texture = new PIXI.AnimatedSprite(textArr);
                if_texture.position.set(TILE_SIZE * x, TILE_SIZE * y);
                if_texture.scale.set(SCALE, SCALE);
                if_texture.animationSpeed = animSpeed;
                if_texture.gotoAndPlay(y);
                this.container.addChild(if_texture);
                continue;
            }
            let temp_texture = fillOneTexture(this.textureMap[y][x], spriteSheet);
            temp_texture.position.set(TILE_SIZE * x, TILE_SIZE * y);
            temp_texture.scale.set(SCALE, SCALE);
            this.container.addChild(temp_texture);
        }
    }
    return this;
};

platoPatterns.find(plato => plato.name === 'spikesRunner').tickerCollision = spikesCheckCollision;


// ---------------------------------------- spikesRoundRight -------------------------------------
platoPatterns.find(plato => plato.name === 'spikesRoundRight').tickerAnimation = function (spriteSheet) {
    this.container = new PIXI.Container();
    const animSpeed = 0.12;
    const textArr = returnSpikesAnim(spriteSheet, 7);
    // exit non-spike tiles
    let exit_texture = fillOneTexture(this.textureMap[this.tileExit.y][this.tileExit.x], spriteSheet);
    exit_texture.position.set(TILE_SIZE * this.tileExit.x, TILE_SIZE * this.tileExit.y);
    exit_texture.scale.set(SCALE, SCALE);
    this.container.addChild(exit_texture);
    //edges
    for(let i = 0 ; i < this.width; i++){
        let temp_texture = fillOneTexture(this.textureMap[this.height - 1][i], spriteSheet);
        temp_texture.position.set(TILE_SIZE * i, TILE_SIZE * (this.height - 1));
        temp_texture.scale.set(SCALE, SCALE);
        this.container.addChild(temp_texture);
    }
    for(let i = 1 ; i < this.width-2 ; i++){
        let temp_texture = fillOneTexture(this.textureMap[this.height - 1][i], spriteSheet);
        temp_texture.position.set(TILE_SIZE * i, TILE_SIZE * (this.height - 1));
        temp_texture.scale.set(SCALE, SCALE);
        this.container.addChild(temp_texture);
    }

    // left side
    let y = 1;
    let x = 1;
    for(y = 1; y < this.height - 2; y++){
        let if_texture = new PIXI.AnimatedSprite(textArr);
        if_texture.position.set(TILE_SIZE /*1*/, TILE_SIZE * y);
        if_texture.scale.set(SCALE, SCALE);
        if_texture.animationSpeed = animSpeed;
        if_texture.gotoAndPlay( this.width + this.width - 4 - y - x);
        this.container.addChild(if_texture);
    }
    // bottom side
    for(x = 1; x < this.width - 2; x++){
        let if_texture = new PIXI.AnimatedSprite(textArr);
        if_texture.position.set(TILE_SIZE * x, TILE_SIZE * (this.height - 2) );
        if_texture.scale.set(SCALE, SCALE);
        if_texture.animationSpeed = animSpeed;
        if_texture.gotoAndPlay(this.width + this.width - 4 - y - x);
        this.container.addChild(if_texture);
    }
    // right side
    for(y = this.height - 2; y > 1; y--){
        let if_texture = new PIXI.AnimatedSprite(textArr);
        if_texture.position.set(TILE_SIZE * (this.width - 2), TILE_SIZE * y);
        if_texture.scale.set(SCALE, SCALE);
        if_texture.animationSpeed = animSpeed;
        if_texture.gotoAndPlay(y + x - 2);
        this.container.addChild(if_texture);
    }
    // top side
    for(x = this.width - 2; x > 1; x--){
        let if_texture = new PIXI.AnimatedSprite(textArr);
        if_texture.position.set(TILE_SIZE * x, TILE_SIZE /* 1 */);
        if_texture.scale.set(SCALE, SCALE);
        if_texture.animationSpeed = animSpeed;
        if_texture.gotoAndPlay(y + x - 2);
        this.container.addChild(if_texture);
    }
    return this;
};

platoPatterns.find(plato => plato.name === 'spikesRoundRight').tickerCollision = spikesCheckCollision;

// ---------------------------------------- spikesRectLeft -------------------------------------
platoPatterns.find(plato => plato.name === 'spikesRectLeft').tickerAnimation = function (spriteSheet) {
    this.container = new PIXI.Container();
    const animSpeed = 0.2;
    const textArr = returnSpikesAnim(spriteSheet, 13);

    // exit non-spike tile
    let tile_exit = fillOneTexture(this.textureMap[this.tileExit.y][this.tileExit.x], spriteSheet);
    tile_exit.position.set(TILE_SIZE * this.tileExit.x, TILE_SIZE * this.tileExit.y);
    tile_exit.scale.set(SCALE, SCALE);
    this.container.addChild(tile_exit);

    //edges
    for(let i = 0 ; i < this.width; i++){
        let temp_texture = fillOneTexture(this.textureMap[this.height - 1][i], spriteSheet);
        temp_texture.position.set(TILE_SIZE * i, TILE_SIZE * (this.height - 1));
        temp_texture.scale.set(SCALE, SCALE);
        this.container.addChild(temp_texture);
    }

    //animated spikes
    for(let y = 1; y < this.height - 1; y++) {
        for (let x = 1; x < this.width - 1; x++) {
            let anim_texture = new PIXI.AnimatedSprite(textArr);
            anim_texture.position.set(TILE_SIZE * x, TILE_SIZE * y);
            anim_texture.scale.set(SCALE, SCALE);
            anim_texture.animationSpeed = animSpeed;
            anim_texture.gotoAndPlay((y + x) % anim_texture.totalFrames);
            this.container.addChild(anim_texture);
        }
    }
    return this;
};

platoPatterns.find(plato => plato.name === 'spikesRectLeft').tickerCollision = spikesCheckCollision;

// -------------------------------------------- monster labyrinth------------------------------------
platoPatterns.find(plato => plato.name === 'monsterOpenPlato').tickerCollision = function(){
    const curPlato = alphaPlato.platos[alphaPlato.currentPlato];
    if(curPlato.monsterContainer === undefined)
        return;

    let knightTile = checkTile(knight.position, curPlato);
    for(let i = 0; i < curPlato.monsterContainer.length; i++){
        let monsterTile = checkTileInsidePlato(curPlato.monsterContainer[i].position, CHORT_EQUALIZER);
        if(monsterTile.x === knightTile.x && monsterTile.y === knightTile.y) {
            deathCharacter('monster');
        }
    }
};


platoPatterns.find(plato => plato.name === 'monsterOpenPlato').monsterBehaviour = monsterLabyrinthBehaviour;


//----------------------------------------------- monsterColumns ---------------------------------------------

platoPatterns.find(plato => plato.name === 'monsterColumns').tickerAnimation = function(spriteSheet){
    this.container = new PIXI.Container();
    this.collisionMap = [
        [1,0,1,1,1,1,1,1,1,1,1,1],
        [2,0,2,2,2,2,2,2,2,2,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,2,0,2,0,2,0,2,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,2,0,2,0,2,0,2,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,2,2,2,2,2,2,2,2,2,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,2,0,2,0,2,0,2,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,2,0,2,0,2,0,2,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,2,2,2,2,2,2,2,2,2,0,2],
        [1,1,1,1,1,1,1,1,1,1,0,1]
    ];

    let downLayer = new PIXI.Container();
    downLayer.name = 'downLayer';
    // floor for downLayer
    for(let y = 1; y < this.height - 1; y++){
        for(let x = 1; x < this.width - 1; x++){
            let tempSprite = new PIXI.Sprite(spriteSheet.textures['floor_1.png']);
            tempSprite.scale.set(SCALE,SCALE);
            tempSprite.position.set(x * TILE_SIZE, y * TILE_SIZE);
            downLayer.addChild(tempSprite);
            // door for downLayer, else floor
            if(y === 7 && (x === 9 || x === 10) )
            {
                let doorSprite = new PIXI.Sprite();
                doorSprite.scale.set(SCALE,SCALE);
                doorSprite.position.set(x * TILE_SIZE, y * TILE_SIZE);

                if(x === 9)
                    doorSprite.texture = spriteSheet.textures['doors_leaf_closed_d_l.png'];
                if(x === 10)
                    doorSprite.texture = spriteSheet.textures['doors_leaf_closed_d_r.png'];
                doorSprite.name = `door_${x - 9 + y - 6 + 1}`;
                downLayer.addChild(doorSprite);
            }
        }
    }
    let spriteExit = new PIXI.Sprite(spriteSheet.textures['floor_1.png']);
    spriteExit.scale.set(SCALE,SCALE);
    spriteExit.position.set(this.tileExit.x * TILE_SIZE, this.tileExit.y * TILE_SIZE);
    downLayer.addChild(spriteExit);
    let spriteEnter = new PIXI.Sprite(spriteSheet.textures['floor_1.png']);
    spriteEnter.scale.set(SCALE,SCALE);
    spriteEnter.position.set(this.tileEnter.x * TILE_SIZE, this.tileEnter.y * TILE_SIZE);
    downLayer.addChild(spriteEnter);
    // button for downLayer
    let buttonSprite = new PIXI.Sprite(spriteSheet.textures['button_blue_release.png']);
    buttonSprite.scale.set(SCALE, SCALE);
    buttonSprite.position.set(TILE_SIZE,10 * TILE_SIZE);
    buttonSprite.name = 'button';
    downLayer.addChild(buttonSprite);
    // column bottom for downLayer
    for(let x = 2; x <= 8; x+=2){
        for(let y = 4; y <= 12; y+=2){
            if(y !== 8){
                let tempSprite = new PIXI.Sprite(spriteSheet.textures['column_base.png']);
                tempSprite.scale.set(SCALE,SCALE);
                tempSprite.position.set(x * TILE_SIZE, y * TILE_SIZE);
                downLayer.addChild(tempSprite);
            }
        }
    }

    // objects' top from textureMap for upperLayer
    let upperLayer = new PIXI.Container();
    upperLayer.name = 'upperLayer';
    for(let y = 0; y < this.height; y++){
        for(let x = 0; x < this.width; x++){
            let tempSprite = fillOneTexture(this.textureMap[y][x], spriteSheet);
            tempSprite.scale.set(SCALE,SCALE);
            tempSprite.position.set(x * TILE_SIZE, y * TILE_SIZE);
            // give door's sprite it's name
            if(y === 6 && (x === 9 || x === 10))
            {
                tempSprite.name = `door_${x - 9 + y - 6}`;
            }
            upperLayer.addChild(tempSprite);
        }
    }
    // door top for upperLayer
    let doorTopSprite = new PIXI.Sprite(spriteSheet.textures['doors_frame_top.png']);
    doorTopSprite.scale.set(SCALE,SCALE);
    doorTopSprite.position.set(9 * TILE_SIZE, 6 * TILE_SIZE - 3);
    upperLayer.addChild(doorTopSprite);

    // add enemies (to the downLayer)
    if(this.monsterPosition !== undefined) {
        this.monsterContainer = [];
        for (let i = 0; i < this.monsterPosition.length; i++){
            let tempEnemy;
            if(i % 2 === 0){
                tempEnemy = createImp();
            } else {
                tempEnemy = createSkeleton();
            }
            tempEnemy.position.set((this.monsterPosition[i].x + 0.5) * TILE_SIZE, (this.monsterPosition[i].y + 0.5) * TILE_SIZE);
            tempEnemy.zIndex = 1;
            downLayer.addChild(tempEnemy);
            this.monsterContainer.push(tempEnemy);
        }
    }

    this.container.addChild(downLayer);
    this.container.addChild(upperLayer);

    return this;
};

platoPatterns.find(plato => plato.name === 'monsterColumns').tickerCollision = function() {
    let curPlato = alphaPlato.platos[alphaPlato.currentPlato];
    /*if(curPlato.name !== 'monsterColumns')
        return;*/

    let upperLayer = curPlato.container.getChildByName('upperLayer');
    let downLayer = curPlato.container.getChildByName('downLayer');

    let knightTile = checkTile(knight.position, curPlato);
    // check monster collisions
    if(curPlato.monsterContainer !== undefined){
        for (let i = 0; i < curPlato.monsterContainer.length; i++) {
            let monsterTile = checkTileInsidePlato(curPlato.monsterContainer[i].position);
            if (monsterTile.x === knightTile.x && monsterTile.y === knightTile.y) {
                deathCharacter('monster');
            }
        }
    }

    // door 2x2 pos: {x:9, y:6}
    // open door (change sprites and collisions)
    if(!curPlato.openDoor){
        if(knightTile.x === 1 && knightTile.y === 10){
            downLayer.getChildByName('button').texture = spriteSheet.textures['button_blue_pressed.png'];

            upperLayer = app.stage.getChildByName('subPlato_'+curPlato.index);
            upperLayer.getChildByName('door_0').texture = spriteSheet.textures['doors_leaf_open_u_l.png'];
            upperLayer.getChildByName('door_1').texture = spriteSheet.textures['doors_leaf_open_u_r.png'];
            downLayer.getChildByName('door_2').texture = spriteSheet.textures['doors_leaf_open_d_l.png'];
            downLayer.getChildByName('door_3').texture = spriteSheet.textures['doors_leaf_open_d_r.png'];
            for(let i = 0; i < 4; i++)
                curPlato.collisionMap[6 + Math.floor(i/2)][9 + i%2] = 0;

            curPlato.openDoor = true;
        }
    }
};

platoPatterns.find(plato => plato.name === 'monsterColumns').monsterBehaviour = monsterLabyrinthBehaviour;

/*** ====================================================SUB METHODS================================================= */

// ---- monsters' and pretty much everyone's behaviour

let MONSTERS_HERE = false;
const MONSTER_ACTIVE_FRAME = 20;
let current_frame = 0;
function monsterLabyrinthBehaviour() {
    current_frame++;

    let curPlato = alphaPlato.platos[alphaPlato.currentPlato];


    if(current_frame % MONSTER_ACTIVE_FRAME === 0)
    {
        // labyrinth platos
        let labyrinthPlatos = alphaPlato.platos.filter(plato => plato.name === 'monsterOpenPlato');

        for(let labPlato in labyrinthPlatos){
            if(labyrinthPlatos[labPlato] === curPlato){
                // action in plato with knight - hunt
                let knightTile = checkTile(knight.position, labyrinthPlatos[labPlato]);
                for(let i = 0; i < labyrinthPlatos[labPlato].monsterContainer.length; i++){
                    let curMonster = labyrinthPlatos[labPlato].monsterContainer[i];
                    let monsterTile = checkTileInsidePlato(curMonster.position, CHORT_EQUALIZER);

                    // in knight position
                    if(knightTile.x === monsterTile.x && knightTile.y === monsterTile.y){
                        // afk
                    }
                    // knight in front
                    else if(knightTile.x <= monsterTile.x) {
                        if(knightTile.y === monsterTile.y){
                            //horizontal movement (meet)
                            curMonster.position.x -= TILE_SIZE;
                            enemyTurn(curMonster, -TILE_SIZE);
                            continue;
                        }

                        let y_direction = knightTile.y - monsterTile.y;
                        y_direction /= Math.abs(y_direction); // normalize
                        /*console.log(monsterTile);
                        console.log(y_direction);
                        console.log(labyrinthPlatos[labPlato].collisionMap);*/
                        if(labyrinthPlatos[labPlato].collisionMap[monsterTile.y + y_direction] === undefined){
                            curMonster.position.y += TILE_SIZE;
                            continue;
                        }
                        if(labyrinthPlatos[labPlato].collisionMap[monsterTile.y + y_direction][monsterTile.x] !== 0){ // if vertical outside map
                            // horizontal move (meet)
                            curMonster.position.x -= TILE_SIZE;
                            enemyTurn(curMonster, -TILE_SIZE);
                            continue;
                        }
                        // vertical movement (block)
                        curMonster.position.y += y_direction * TILE_SIZE;
                    }else{ // knight behind
                        // horizontal movement (chase)
                        curMonster.position.x += TILE_SIZE;
                        enemyTurn(curMonster, TILE_SIZE);
                    }
                }
            }
            else{ // plato without knight
                for(let i = 0; i < labyrinthPlatos[labPlato].monsterContainer.length; i++) {
                    let curMonster = labyrinthPlatos[labPlato].monsterContainer[i];
                    let defaultMonsterPosition = labyrinthPlatos[labPlato].monsterPosition[i];
                    if(curMonster.position.x !== defaultMonsterPosition.x ||
                        curMonster.position.y !== defaultMonsterPosition.y
                    ){
                        let monsterTile = checkTileInsidePlato(curMonster.position, CHORT_EQUALIZER);
                        // knight in front
                        if(defaultMonsterPosition.x <= monsterTile.x) {
                            if(defaultMonsterPosition.y === monsterTile.y){
                                //horizontal movement (meet)
                                curMonster.position.x -= TILE_SIZE;
                                enemyTurn(curMonster, -TILE_SIZE);
                                continue;
                            }
                            let y_direction = defaultMonsterPosition.y - monsterTile.y;
                            y_direction /= Math.abs(y_direction); // normalize
                            if(labyrinthPlatos[labPlato].collisionMap[monsterTile.y + y_direction][monsterTile.x] !== 0){ // if vertical outside map
                                // horizontal move (meet)
                                curMonster.position.x -= TILE_SIZE;
                                enemyTurn(curMonster, -TILE_SIZE);
                                continue;
                            }
                            // vertical movement (block)
                            curMonster.position.y += y_direction * TILE_SIZE;
                        }else{ // knight behind
                            // horizontal movement (chase)
                            curMonster.position.x += TILE_SIZE;
                            enemyTurn(curMonster, TILE_SIZE);
                        }
                    }
                }
            }
        }

        // column behaviour
        let columnPlatos = alphaPlato.platos.filter(plato => plato.name === 'monsterColumns');
        for(let colPlato in columnPlatos){
            let knightTile = checkTile(knight.position, columnPlatos[colPlato]);
            for(let i = 0; i < columnPlatos[colPlato].monsterContainer.length; i++) {
                let curMonster = columnPlatos[colPlato].monsterContainer[i];
                let monsterTile = checkTileInsidePlato(curMonster.position);
                let destinationTile;
                if(columnPlatos[colPlato] === curPlato){ // if knight inside plato
                    destinationTile = {x: knightTile.x, y: knightTile.y};
                } else { // if knight outside plato
                    destinationTile = {x: columnPlatos[colPlato].monsterPosition[i].x, y: columnPlatos[colPlato].monsterPosition[i].y};
                }
                // in start position
                if(monsterTile.x === destinationTile.x && monsterTile.y === destinationTile.y)
                {
                    // afk
                } else {
                    // vector of distance to the destination point - default point
                    let direction = {
                        x: destinationTile.x - monsterTile.x,
                        y: destinationTile.y - monsterTile.y
                    };
                    let direction_normalized = { // same normalized
                        x: direction.x / Math.abs(direction.x),
                        y: direction.y / Math.abs(direction.y)
                    };
                    /*let post_direction = {
                        x: Math.abs(direction.x) > 0 ? Math.abs(direction.x) - 1 : 0,
                        y: Math.abs(direction.y) > 0 ? Math.abs(direction.y) - 1 : 0
                    };*/
                    // preferred direction x or y
                    if( Math.abs(direction.x) >= Math.abs(direction.y) ){
                        // preferred x, all is ok
                        if(columnPlatos[colPlato].collisionMap[monsterTile.y] !== undefined &&
                            columnPlatos[colPlato].collisionMap[monsterTile.y][monsterTile.x + direction_normalized.x] === 0){
                            curMonster.position.x += direction_normalized.x * TILE_SIZE;
                            enemyTurn(curMonster, direction_normalized.x);
                        } else { // preferred x, not ok
                            // try go y
                            if(columnPlatos[colPlato].collisionMap[monsterTile.y + direction_normalized.y] !== undefined &&
                                columnPlatos[colPlato].collisionMap[monsterTile.y + direction_normalized.y][monsterTile.x] === 0){
                                curMonster.position.y += direction_normalized.y * TILE_SIZE;
                            }
                        }
                    } else {
                        // preferred y, all is ok
                        if(columnPlatos[colPlato].collisionMap[monsterTile.y + direction_normalized.y] !== undefined &&
                            columnPlatos[colPlato].collisionMap[monsterTile.y + direction_normalized.y][monsterTile.x] === 0){
                            curMonster.position.y += direction_normalized.y * TILE_SIZE;
                        } else { // preferred y, not ok
                            // try go x
                            if(columnPlatos[colPlato].collisionMap[monsterTile.y] !== undefined &&
                                columnPlatos[colPlato].collisionMap[monsterTile.y][monsterTile.x + direction_normalized.x] === 0){
                                curMonster.position.x += direction_normalized.x * TILE_SIZE;
                                enemyTurn(curMonster, direction_normalized.x);
                            }
                        }
                    }
                }
            }
        }
    }

    // layers behaviour
    if(curPlato.upLayer === false){
        let upperLayer = curPlato.container.getChildByName('upperLayer');
        upperLayer.position.x = curPlato.container.x;
        upperLayer.position.y = curPlato.container.y;
        upperLayer.name = 'subPlato_' + curPlato.index;
        upperLayer.zIndex = 1;
        app.stage.addChild(upperLayer);
        app.stage.removeChild(deathContainer);
        app.stage.addChild(deathContainer);
        curPlato.upLayer = true;
    }

    let subLayers = app.stage.children.filter(child => child.name !== null && child.name.indexOf('subPlato_') > -1);
    if(subLayers.length > 0){
        for(let i in subLayers){
            let upperLayer = app.stage.getChildByName('subPlato_' + subLayers[i].name.substr(-1, 1));
            let realPlato = alphaPlato.platos.find(plato => {
                if(''+plato.index === ''+subLayers[i].name.substr(-1, 1)){
                    return plato;
                }
            });
            if(realPlato === undefined){
                app.stage.removeChild(upperLayer);
            }
            else {
                upperLayer.position.x = realPlato.container.x;
                upperLayer.position.y = realPlato.container.y;
            }
        }
    }

}


// =================== spikesCheckCollision =====================
// maybe transfer to environment.js
function spikesCheckCollision(){
    let animatedTextures = alphaPlato.platos[alphaPlato.currentPlato].container.children
        .filter(tempTexture => {if(tempTexture.currentFrame !== undefined) return tempTexture;});

    let curPlatoContainer = alphaPlato.platos[alphaPlato.currentPlato].container;
    for(let tempT in animatedTextures){
        if(animatedTextures[tempT].currentFrame > animatedTextures[tempT].totalFrames - 6 &&
            knight.position.y > curPlatoContainer.position.y + animatedTextures[tempT].position.y  &&
            knight.position.y < curPlatoContainer.position.y + animatedTextures[tempT].position.y + TILE_SIZE &&
            knight.position.x > curPlatoContainer.position.x + animatedTextures[tempT].position.x &&
            knight.position.x < curPlatoContainer.position.x + animatedTextures[tempT].position.x + TILE_SIZE
        ){
            deathCharacter('spikes');
        }
    }
}

// =================== returnSpikesAnim =====================
// here building proper spikes tile frame array
// 5 / (numberOfZero + 5)
function returnSpikesAnim(spriteSheet, numberOfZero)
{
    let tempArr = [];
    for(let i = 0; i < numberOfZero; i++){
        tempArr.push(spriteSheet.textures["floor_spikes_anim_f0.png"]);
    }
    tempArr.push(spriteSheet.textures["floor_spikes_anim_f1.png"]); // numberOfZero + 1
    tempArr.push(spriteSheet.textures["floor_spikes_anim_f2.png"]); // numberOfZero + 2
    tempArr.push(spriteSheet.textures["floor_spikes_anim_f3.png"]); // numberOfZero + 3
    tempArr.push(spriteSheet.textures["floor_spikes_anim_f2.png"]); // numberOfZero + 4
    tempArr.push(spriteSheet.textures["floor_spikes_anim_f1.png"]); // numberOfZero + 5
    return tempArr;
}

// =================== checkTileInsidePlato ============================
function checkTileInsidePlato(pos, y_equalizer=0, x_equalizer=0){
    let _x = 0;
    while(true){
        if(pos.x + x_equalizer < _x * TILE_SIZE){
            break;
        }
        _x++;
    }
    _x--;

    let _y = 0;
    while(true){
        if(pos.y + y_equalizer < _y * TILE_SIZE){
            break;
        }
        _y++;
    }
    _y--;
    return {x: _x, y: _y}
}