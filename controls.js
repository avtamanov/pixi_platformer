// Button function, returns object
function keyboardBindMovement(eventKey) {
    // Button object
    let button = {};
    button.key = eventKey;
    button.isUp = true;
    button.press = undefined;
    //The `downHandler`
    button.downHandler = function(event) {
        if (event.key === button.key) {
            if (button.isUp && button.press) button.press();
            button.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    button.upHandler = function(event) {
        if (event.key === button.key) {
            button.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", button.downHandler.bind(button), false
    );
    window.addEventListener(
        "keyup", button.upHandler.bind(button), false
    );

    return button;
}

// Bind the keyboard arrows
let left, up, right, down;
up = keyboardBindMovement('ArrowUp');
right = keyboardBindMovement('ArrowRight');
down = keyboardBindMovement('ArrowDown');
left = keyboardBindMovement('ArrowLeft');

function controlsGameMode () {

    let prePos, collisionCheckResult;

    left.press = function () {
        prePos = {
            x: knight.position.x - TILE_SIZE,
            y: knight.position.y
        };
        //knight.removeChild(knight_anim_idle);
        if (knight.scale.x > 0) {
            knight.scale.x *= -1;
        }
        collisionCheckResult = checkCollision(prePos, alphaPlato.platos[alphaPlato.currentPlato]);
        if (collisionCheckResult === -1) {
            collisionCheckResult = checkCollision(prePos, alphaPlato.platos[alphaPlato.currentPlato]);
        }
        if (collisionCheckResult === 1) {
            deathCharacter('falling');
        }
        if (collisionCheckResult === 2) {
            return;
        }
        alphaPlato.moveAllPlatos(TILE_SIZE, 0);
    };

    up.press = function () {
        prePos = {
            x: knight.position.x,
            y: knight.position.y - TILE_SIZE
        };
        collisionCheckResult = checkCollision(prePos, alphaPlato.platos[alphaPlato.currentPlato]);
        if (collisionCheckResult === -1) {
            collisionCheckResult = checkCollision(prePos, alphaPlato.platos[alphaPlato.currentPlato]);
        }
        if (collisionCheckResult === 1) {
            deathCharacter('falling');
        }
        if (collisionCheckResult === 2) {
            return;
        }
        alphaPlato.moveAllPlatos(0, TILE_SIZE);
        if(deathContainer.position.y + TILE_SIZE < app.renderer.height)
            deathContainer.position.y += TILE_SIZE;
        else
            deathContainer.position.y = app.renderer.height;
        tileCounterUpdate(1);
    };

    right.press = function () {
        prePos = {
            x: knight.position.x + TILE_SIZE,
            y: knight.position.y
        };
        if (knight.scale.x < 0) {
            knight.scale.x *= -1;
        }
        //knight.addChild(knight_anim_idle);
        collisionCheckResult = checkCollision(prePos, alphaPlato.platos[alphaPlato.currentPlato]);
        if (collisionCheckResult === -1) {
            collisionCheckResult = checkCollision(prePos, alphaPlato.platos[alphaPlato.currentPlato]);
        }
        if (collisionCheckResult === 1) {
            deathCharacter('falling');
        }
        if (collisionCheckResult === 2) {
            return;
        }
        alphaPlato.moveAllPlatos(-TILE_SIZE, 0);
    };

    down.press = function () {
        prePos = {
            x: knight.position.x,
            y: knight.position.y + TILE_SIZE
        };
        collisionCheckResult = checkCollision(prePos, alphaPlato.platos[alphaPlato.currentPlato]);
        if (collisionCheckResult === -1) {
            collisionCheckResult = checkCollision(prePos, alphaPlato.platos[alphaPlato.currentPlato]);
        }
        if (collisionCheckResult === 1) {
            deathCharacter('falling');
        }
        if (collisionCheckResult === 2) {
            return;
        }
        alphaPlato.moveAllPlatos(0, -TILE_SIZE);
        deathContainer.position.y -= TILE_SIZE;

        tileCounterUpdate(-1);
    };
}


function controlsMenuMode(){
    left.press = function() {};
    right.press = function() {};
    up.press = function() {};
    down.press = function() {};
}
