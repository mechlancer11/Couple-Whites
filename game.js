// ─── Constants ────────────────────────────────────────────────────────────────

const GAME_WIDTH     = 480;
const GAME_HEIGHT    = 854;
const FLAP_VELOCITY  = -480;
const BASE_SPEED     = 175;
const OBSTACLE_WIDTH = 90;
const GAP_HEIGHT     = 265;
const GAP_MARGIN     = 110;
const SPAWN_INTERVAL = 2100;
const LS_KEY         = 'mcdb_best'; // localStorage key for high score

// ─── Supabase config (global leaderboard) ─────────────────────────────────────
// Fill these in from Project Settings → API in your Supabase dashboard
const SUPABASE_URL = 'https://whawxbgbujntxllkgljr.supabase.co';
const SUPABASE_KEY = 'sb_publishable__Jgr0SulyiV7rNYcArVdYQ_MBA6-IHW';
const LB_TABLE     = 'leaderboard';
const LB_MAX       = 10;

// ─── Asset Paths ──────────────────────────────────────────────────────────────

const LC = 'Legacy Collection/Assets';

const ASSETS = {
  player:         'new image.jpg',
  coin:           'image-3.jpg',
  splatter:       'image-1.jpg',
  bgCustom:       'Background couple whites.jpg',
  bgLevel2:       'level2 background.jpg',
  bgLevel3:       'level3 background.jpg',
  evilBadguy:     'evil badguy.jpg',
  grokPickup:     'grokimage.jpg',
  grokWorld:      'groklands.png',
  capePickup:     'claude cape.jpg',
  cappedCan:      'cape on can.jpg',
  wcBack:         `${LC}/Packs/Warped City/V2/Environmet/background/back.png`,
  miamiBack:      `${LC}/Packs/Miami-synth-files/Layers/back.png`,
  miamiBuildings: `${LC}/Packs/Miami-synth-files/Layers/buildings.png`,
  miamiHighway:   `${LC}/Packs/Miami-synth-files/Layers/highway.png`,
  miamiPalms:     `${LC}/Packs/Miami-synth-files/Layers/palms.png`,
  monitorCap:     `${LC}/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/monitorface/monitor-face-1.png`,
  explosionA:     `${LC}/Packs/Warped City/V2/Sprites/explosion-a.png`,
};

const BANNER_NEON = [1,2,3,4].map(i =>
  `${LC}/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/banner-neon/banner-neon-${i}.png`);
const BANNER_BIG = [1,2,3,4].map(i =>
  `${LC}/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/banner-big/banner-big-${i}.png`);
const DRONE_FRAMES = [1,2,3,4].map(i =>
  `${LC}/Packs/Warped City/V1/warped city files/SPRITES/misc/drone/drone-${i}.png`);
const CONTROL_BOX = [1,2,3].map(i =>
  `${LC}/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/control-box-${i}.png`);
const ELECTRO_FRAMES = Array.from({length:9}, (_,i) =>
  `${LC}/Misc/Grotto-escape-2-FX/sprites/electro-shock/_000${i}_Layer-${i+1}.png`);
const SMACK_FRAMES = Array.from({length:8}, (_,i) =>
  `${LC}/Misc/Grotto-escape-2-FX/sprites/energy-smack/_000${i}_Layer-${i+1}.png`);
const EXPLOSION_FRAMES = Array.from({length:8}, (_,i) =>
  `${LC}/Misc/Explosions pack/explosion-1-a/Sprites/explosion-${i+1}.png`);
const BOLT_FRAMES = [1,2,3,4].map(i =>
  `${LC}/Misc/Warped shooting fx/Bolt/Sprites/bolt${i}.png`);

// ─── Scene ────────────────────────────────────────────────────────────────────

class GameScene extends Phaser.Scene {
  constructor() { super({ key: 'GameScene' }); }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  preload() {
    this.load.image('player-raw',      ASSETS.player);
    BOLT_FRAMES.forEach((p,i) => this.load.image(`bolt-${i+1}`, p));
    this.load.image('splatter',        ASSETS.splatter);
    this.load.image('bg-custom',       ASSETS.bgCustom);
    this.load.image('bg-level2',       ASSETS.bgLevel2);
    this.load.image('bg-level3',       ASSETS.bgLevel3);
    this.load.image('evil-badguy-raw', ASSETS.evilBadguy);
    this.load.image('grok-pickup-raw', ASSETS.grokPickup);
    this.load.image('liq-pickup-raw',  'stokimage.avif');
    this.load.image('grok-world',      ASSETS.grokWorld);
    this.load.image('cape-pickup-raw', ASSETS.capePickup);
    this.load.image('capped-can-raw',  ASSETS.cappedCan);
    this.load.image('wc-back',         ASSETS.wcBack);
    this.load.image('miami-back',      ASSETS.miamiBack);
    this.load.image('miami-buildings', ASSETS.miamiBuildings);
    this.load.image('miami-highway',   ASSETS.miamiHighway);
    this.load.image('miami-palms',     ASSETS.miamiPalms);
    this.load.image('monitor-cap',     ASSETS.monitorCap);
    this.load.image('explosion-a',     ASSETS.explosionA);
    this.load.image('crypto1',         'crypto image1.jpg');
    this.load.image('crypto2',         'cryptoimage2.jpg');
    this.load.image('crypto3',         'cryptoimage3.jpg');
    this.load.image('holy-elon',       'holy elon.jpg');
    this.load.audio('soda-open',       'open-soda-can-sound-effect.mp3');
    this.load.audio('bfc-music',       'bfcmusic-energy-rock-468503.mp3');

    BANNER_NEON.forEach(    (p,i) => this.load.image(`banner-neon-${i+1}`, p));
    BANNER_BIG.forEach(     (p,i) => this.load.image(`banner-big-${i+1}`,  p));
    DRONE_FRAMES.forEach(   (p,i) => this.load.image(`drone-${i+1}`,       p));
    CONTROL_BOX.forEach(    (p,i) => this.load.image(`control-box-${i+1}`, p));
    ELECTRO_FRAMES.forEach( (p,i) => this.load.image(`electro-${i}`,       p));
    SMACK_FRAMES.forEach(   (p,i) => this.load.image(`smack-${i}`,         p));
    EXPLOSION_FRAMES.forEach((p,i) => this.load.image(`explode-${i+1}`,    p));
  }

  create() {
    this._processPlayerTexture();
    this._processCapePickupTexture();
    this._processCappedCanTexture();
    this._processEvilBadguyTexture();
    this._processGrokPickupTexture();
    this._processLiqPickupTexture();

    // ── State ──
    this.gameState       = 'ready';
    this.bgMusic         = null;
    this.score           = 0;
    this.currentSpeed    = BASE_SPEED;
    this.nextSpeedUp     = 10;
    this.spawnTimer      = null;
    this.obstacleFrame   = 1;
    this.droneFrame      = 1;
    this.droneEnabled    = false;
    this.droneSpawnTimer = null;
    this.bgSwapped       = false;
    this.bgSwappedLevel3 = false;
    this.capeActive        = false;
    this.capeTimer         = null;
    this._capePulseTween   = null;
    this._immuneBlinkTween = null;
    this.pairIdCounter     = 0;
    this.lastCapeSpawnPair = -999;
    this.lastGrokSpawnPair = -999;
    this.lastLiqSpawnPair  = -999;
    this.droneInterval     = 3500;
    this.grokHoleActive     = false;
    this.grokPhase          = 'none'; // 'spiral-in' | 'exploring' | 'spiral-out' | 'none'
    this.grokAngle          = 0;
    this.grokRadius         = 0;
    this.grokCountdown      = 0;
    this.grokTimerEvent     = null;
    this._grokCountdownText = null;
    this._grokElements      = [];
    this._grokSecretClaimed = false;
    this.immuneUntil       = 0;
    this._goElements       = []; // game-over / leaderboard panel elements
    this._lbKeyHandler     = null; // keyboard handler for initials entry
    this._lbCursorTimer    = null; // blinking cursor timer for solana entry

    this._buildBackground();
    this._buildPlayer();
    this._buildStartScreen();
    this._buildHUD();
    this._buildInput();
    this._buildAnimations();

    // ── Groups ──
    this.obstacles    = this.add.group();
    this.coins        = this.add.group();
    this.drones       = this.add.group();
    this.decorations  = this.add.group();
    this.capePowerups  = this.add.group();
    this.grokPowerups  = this.add.group();
    this.liquidations  = this.add.group();

    // ── Timers ──
    this.time.addEvent({ delay:250, callback:this._tickObstacleAnim, callbackScope:this, loop:true });
    this.time.addEvent({ delay:125, callback:this._tickDroneAnim,    callbackScope:this, loop:true });

    // ── Overlap ──
    this.physics.add.overlap(this.player, this.obstacles,    (_p, obs) => {
      if (this.grokHoleActive) return;
      if (this.time.now < this.immuneUntil) return;
      if (this.capeActive) this._smashObstaclePair(obs);
      else                 this.triggerGameOver();
    }, null, this);
    this.physics.add.overlap(this.player, this.coins,        this._collectCoin,  null, this);
    this.physics.add.overlap(this.player, this.drones,       this._onDroneHit,   null, this);
    this.physics.add.overlap(this.player, this.capePowerups, this._collectCape,         null, this);
    this.physics.add.overlap(this.player, this.grokPowerups, this._collectGrokPowerup,  null, this);
    this.physics.add.overlap(this.player, this.liquidations, this._onLiquidationHit,    null, this);
  }

  update(_time, _delta) {
    if (this.gameState === 'gameover') return;

    const rate = this.gameState === 'playing' ? this.currentSpeed / BASE_SPEED : 1;

    // Scroll all background layers
    this.bgWarpedBack.tilePositionX += 0.15 * rate;
    this.bgCustom.tilePositionX     += 0.5  * rate;
    this.bgLevel2.tilePositionX     += 0.5  * rate;
    this.bgLevel3.tilePositionX     += 0.5  * rate;
    this.miamiBack.tilePositionX      += 0.3  * rate;
    this.miamiBuildings.tilePositionX += 0.8  * rate;
    this.miamiHighway.tilePositionX   += 1.5  * rate;
    this.miamiPalms.tilePositionX     += 2.5  * rate;

    if (this.gameState !== 'playing') return;

    // Grok Hole mini-game overrides normal update
    if (this.grokHoleActive) { this._updateGrokHole(_delta); return; }

    // Can tilt
    const target = Phaser.Math.Clamp(this.player.body.velocity.y * 0.055, -25, 75);
    this.player.angle = Phaser.Math.Linear(this.player.angle, target, 0.18);

    if (this.player.y < -10 || this.player.y > GAME_HEIGHT + 10) {
      this.triggerGameOver(); return;
    }

    this._updateObstacles();
    this._updateCoins();
    this._updateDrones();
    this._updateDecorations();
    this._updateCapePowerups();
    this._updateGrokPowerups();
    this._updateLiquidations();
  }

  // ── Build helpers ──────────────────────────────────────────────────────────

  _buildBackground() {
    // Extra-far layer (Warped City V2) — behind everything
    this.bgWarpedBack = this.add.tileSprite(0,0,GAME_WIDTH,GAME_HEIGHT,'wc-back')
      .setOrigin(0).setDepth(-1);

    // Custom background (level 1)
    this.bgCustom    = this.add.tileSprite(0,0,GAME_WIDTH,GAME_HEIGHT,'bg-custom')  .setOrigin(0).setDepth(0);
    // Level 2 background — hidden until score 30
    this.bgLevel2    = this.add.tileSprite(0,0,GAME_WIDTH,GAME_HEIGHT,'bg-level2')  .setOrigin(0).setDepth(0).setAlpha(0);
    // Level 3 background — hidden until score 50
    this.bgLevel3    = this.add.tileSprite(0,0,GAME_WIDTH,GAME_HEIGHT,'bg-level3')  .setOrigin(0).setDepth(0).setAlpha(0);
    // Groklands world — shown only during Grok Hole, above everything else
    // Use image (not tileSprite) so it fills cleanly without grid tiling
    this.bgGrokWorld = this.add.image(GAME_WIDTH/2, GAME_HEIGHT/2, 'grok-world')
      .setDisplaySize(GAME_WIDTH, GAME_HEIGHT).setDepth(25).setAlpha(0);

    // Miami Synth layers — hidden until score 30
    this.miamiBack      = this.add.tileSprite(0,0,GAME_WIDTH,GAME_HEIGHT,'miami-back')     .setOrigin(0).setDepth(0).setAlpha(0);
    this.miamiBuildings = this.add.tileSprite(0,0,GAME_WIDTH,GAME_HEIGHT,'miami-buildings').setOrigin(0).setDepth(1).setAlpha(0);
    this.miamiHighway   = this.add.tileSprite(0,0,GAME_WIDTH,GAME_HEIGHT,'miami-highway')  .setOrigin(0).setDepth(1).setAlpha(0);
    this.miamiPalms     = this.add.tileSprite(0,0,GAME_WIDTH,GAME_HEIGHT,'miami-palms')    .setOrigin(0).setDepth(2).setAlpha(0);
  }

  _buildPlayer() {
    const canH = 88, canW = Math.round(canH * this._playerAspect);
    this.player = this.physics.add.image(120, GAME_HEIGHT / 2, 'player');
    this.player.setDisplaySize(canW, canH);
    const pSrc = this.textures.get('player').getSourceImage();
    this.player.body.setSize(Math.round(pSrc.width * 0.7), Math.round(pSrc.height * 0.8), true);
    this.player.body.allowGravity = false;
    this.player.setDepth(5);
  }

  _buildStartScreen() {
    const glow = c => ({ offsetX:0, offsetY:0, color:c, blur:14, fill:true });
    const best = parseInt(localStorage.getItem(LS_KEY) || '0');

    this._startEl = [];  // collect refs so we can destroy them all at once

    this._startEl.push(
      this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.15, 'COUPLE', {
        fontSize:'52px', fill:'#00FFFF', fontFamily:'monospace',
        stroke:'#003333', strokeThickness:3, shadow:glow('#00FFFF'),
      }).setOrigin(0.5).setDepth(10),

      this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.24, 'WHITES', {
        fontSize:'52px', fill:'#CC00FF', fontFamily:'monospace',
        stroke:'#220033', strokeThickness:3, shadow:glow('#CC00FF'),
      }).setOrigin(0.5).setDepth(10),

      this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.34, 'CYBER DASH', {
        fontSize:'18px', fill:'#888888', fontFamily:'monospace',
      }).setOrigin(0.5).setDepth(10)
    );

    if (best > 0) {
      this._startEl.push(
        this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.41, `BEST  ${best}`, {
          fontSize:'26px', fill:'#FFFF00', fontFamily:'monospace',
          shadow:glow('#FFFF00'),
        }).setOrigin(0.5).setDepth(10)
      );
    }

    const tap = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.78, 'TAP TO START', {
      fontSize:'30px', fill:'#FFFFFF', fontFamily:'monospace', shadow:glow('#FFFFFF'),
    }).setOrigin(0.5).setDepth(10);
    this._startEl.push(tap);
    this._tapText = tap;

    this.tweens.add({ targets:tap, alpha:{from:1,to:0}, duration:600, yoyo:true, repeat:-1 });
  }

  _buildHUD() {
    const glow = c => ({ offsetX:0, offsetY:0, color:c, blur:14, fill:true });
    this.scoreText = this.add.text(GAME_WIDTH/2, 30, '0', {
      fontSize:'52px', fill:'#00FFFF', fontFamily:'monospace',
      stroke:'#001111', strokeThickness:4, shadow:glow('#00FFFF'),
    }).setOrigin(0.5, 0).setDepth(10);
  }

  _buildInput() {
    this.input.on('pointerdown',            this.onInput, this);
    this.input.keyboard.on('keydown-SPACE', this.onInput, this);
  }

  _buildAnimations() {
    this.anims.create({
      key:'anim-electro',
      frames: Array.from({length:9}, (_,i) => ({ key:`electro-${i}` })),
      frameRate:18, repeat:0,
    });
    this.anims.create({
      key:'anim-smack',
      frames: Array.from({length:8}, (_,i) => ({ key:`smack-${i}` })),
      frameRate:16, repeat:0,
    });
    this.anims.create({
      key:'anim-explode',
      frames: Array.from({length:8}, (_,i) => ({ key:`explode-${i+1}` })),
      frameRate:16, repeat:0,
    });
    this.anims.create({
      key:'anim-bolt',
      frames: [1,2,3,4].map(i => ({ key:`bolt-${i}` })),
      frameRate:10, repeat:-1,
    });
  }

  // ── Input ──────────────────────────────────────────────────────────────────

  onInput() {
    if      (this.gameState === 'ready')   this._startGame();
    else if (this.gameState === 'playing') this._flap();
  }

  _startGame() {
    this.gameState = 'playing';
    this.sound.play('soda-open');
    this.bgMusic = this.sound.add('bfc-music', { loop: true, volume: 0.7 });
    this.bgMusic.play();
    this.player.body.allowGravity = true;
    this._startEl.forEach(el => el.destroy());
    this._startEl = [];
    this._flap();

    this.time.delayedCall(1200, () => {
      this._spawnObstaclePair();
      this.spawnTimer = this.time.addEvent({
        delay:SPAWN_INTERVAL, callback:this._spawnObstaclePair, callbackScope:this, loop:true,
      });
    });
  }

  _flap() {
    // Block flap during cinematic spiral phases — only allow during free explore
    if (this.grokPhase === 'spiral-in' || this.grokPhase === 'spiral-out') return;
    this.player.setVelocityY(FLAP_VELOCITY);
  }

  // ── Obstacles ──────────────────────────────────────────────────────────────

  _spawnObstaclePair() {
    if (this.gameState !== 'playing') return;

    const gapCenter = Phaser.Math.Between(
      GAP_MARGIN + GAP_HEIGHT/2, GAME_HEIGHT - GAP_MARGIN - GAP_HEIGHT/2
    );
    const gapTop    = gapCenter - GAP_HEIGHT/2;
    const gapBottom = gapCenter + GAP_HEIGHT/2;
    const spawnX    = GAME_WIDTH + OBSTACLE_WIDTH/2 + 10;
    const type      = Math.random() < 0.5 ? 'neon' : 'big';

    const pairId = ++this.pairIdCounter;

    const top = this._makeObstacleBody(spawnX, gapTop/2, OBSTACLE_WIDTH, gapTop, type);
    top.pairId = pairId; top.isScoreMarker = true; top.scored = false;
    const cap1 = this._makeObstacleCap(spawnX, gapTop - 2, false);
    cap1.pairId = pairId;

    const bH = GAME_HEIGHT - gapBottom;
    const bot = this._makeObstacleBody(spawnX, gapBottom + bH/2, OBSTACLE_WIDTH, bH, type);
    bot.pairId = pairId;
    const cap2 = this._makeObstacleCap(spawnX, gapBottom + 2, true);
    cap2.pairId = pairId;

    // Evil badguy faces on the inner edge of each pipe
    this._spawnEvilBadguy(spawnX, gapTop,    false);
    this._spawnEvilBadguy(spawnX, gapBottom, true);

    const roll = Math.random();
    const capeAllowed = !this.capeActive && (this.pairIdCounter - this.lastCapeSpawnPair >= 7);
    const grokAllowed = !this.grokHoleActive && (this.pairIdCounter - this.lastGrokSpawnPair >= 8);
    const liqAllowed  = (this.pairIdCounter - this.lastLiqSpawnPair >= 7);
    if (capeAllowed && roll < 0.22) {
      this.lastCapeSpawnPair = this.pairIdCounter;
      this._spawnCape(spawnX + Phaser.Math.Between(180, 320));
    } else if (grokAllowed && roll < 0.30) {
      this.lastGrokSpawnPair = this.pairIdCounter;
      this._spawnGrokPowerup(spawnX + Phaser.Math.Between(180, 320));
    } else if (roll < 0.72) {
      this._spawnCoin(spawnX, gapTop, gapBottom);
    }
    // Liquidation spawns independently — right at the pipe entrance, in the gap
    if (liqAllowed && Math.random() < 0.15) {
      this.lastLiqSpawnPair = this.pairIdCounter;
      this._spawnLiquidation(spawnX, gapTop, gapBottom);
    }
    if (this.score >= 20 && Math.random() < 0.4) this._spawnDecoration(spawnX, gapTop);
  }

  _makeObstacleBody(x, y, w, h, type) {
    const key = type === 'big' ? `banner-big-${this.obstacleFrame}` : `banner-neon-${this.obstacleFrame}`;
    const img = this.physics.add.image(x, y, key);
    img.setDisplaySize(w, h);
    // Do NOT call body.setSize here — setDisplaySize sets scaleX/Y, and Phaser's
    // preUpdate would then compute body dimensions as setSize_value * scaleX which
    // is wrong (e.g. 300 * 300/32 = 2800px). Omitting setSize lets the body
    // auto-size correctly to the display dimensions via the scale sync.
    img.body.allowGravity = false;
    img.body.immovable    = true;
    img.setVelocityX(-this.currentSpeed);
    img.setDepth(3);
    img.bannerType   = type;
    img.isBannerBody = true;
    this.obstacles.add(img);
    return img;
  }

  _makeObstacleCap(x, y, flipY) {
    const cap = this.physics.add.image(x, y, 'monitor-cap');
    cap.setDisplaySize(OBSTACLE_WIDTH, 44);
    cap.body.setSize(OBSTACLE_WIDTH, 44, false);
    cap.body.allowGravity = false;
    cap.body.immovable    = true;
    cap.setVelocityX(-this.currentSpeed);
    cap.setFlipY(flipY);
    cap.setDepth(4);
    this.decorations.add(cap); // visual only — no collision
    return cap;
  }

  _tickObstacleAnim() {
    this.obstacleFrame = (this.obstacleFrame % 4) + 1;
    this.obstacles.getChildren().forEach(obs => {
      if (!obs.isBannerBody) return;
      obs.setTexture(obs.bannerType === 'big'
        ? `banner-big-${this.obstacleFrame}`
        : `banner-neon-${this.obstacleFrame}`);
    });
  }

  _updateObstacles() {
    const toDestroy = [];
    this.obstacles.getChildren().forEach(obs => {
      if (obs.isScoreMarker && !obs.scored && obs.x < this.player.x) {
        obs.scored = true;
        this.score++;
        this.scoreText.setText(this.score);
        this._scorePopAnim();
        this._checkSpeedUp();
        if (this.score >= 20 && !this.droneEnabled)        this._enableDrones();
        if (this.score >= 30 && !this.bgSwapped)           this._swapToMiami();
        if (this.score >= 150 && !this.bgSwappedLevel3)    this._swapToLevel3();
        if (this.score >= 1000)                            this._triggerWin();
      }
      if (obs.x < -(OBSTACLE_WIDTH + 20)) toDestroy.push(obs);
    });
    toDestroy.forEach(o => o.destroy());
  }

  _checkSpeedUp() {
    if (this.score < this.nextSpeedUp) return;
    this.nextSpeedUp  += 10;
    this.currentSpeed  = Math.min(this.currentSpeed * 1.1, BASE_SPEED * 2.5);
    const newVX = -this.currentSpeed;
    [...this.obstacles.getChildren(),
     ...this.coins.getChildren(),
     ...this.decorations.getChildren(),
     ...this.capePowerups.getChildren(),
     ...this.grokPowerups.getChildren(),
     ...this.liquidations.getChildren(),
    ].forEach(o => { if (o.body) o.setVelocityX(newVX); });
    this.drones.getChildren().forEach(d => { if (d.body) d.setVelocityX(newVX * 1.35); });

    // Drones spawn faster as score increases
    if (this.droneEnabled && this.droneSpawnTimer) {
      this.droneInterval = Math.max(1000, Math.floor(this.droneInterval * 0.88));
      this.droneSpawnTimer.remove(false);
      this.droneSpawnTimer = this.time.addEvent({
        delay: this.droneInterval, callback: this._spawnDrone, callbackScope: this, loop: true,
      });
    }
    this._speedFlash();
  }

  // ── Coins ──────────────────────────────────────────────────────────────────

  _spawnCoin(x, gapTop, gapBottom) {
    const coinY = (gapTop + gapBottom) / 2;
    const coin  = this.physics.add.sprite(x, coinY, 'bolt-1');
    coin.setDisplaySize(42, 42).setTint(0xFFFFFF);
    coin.body.allowGravity = false;
    coin.body.immovable    = true;
    coin.setVelocityX(-this.currentSpeed).setDepth(4);
    coin.play('anim-bolt');
    this.tweens.add({ targets:coin, y:coinY+12, duration:800, yoyo:true, repeat:-1, ease:'Sine.easeInOut' });
    this.coins.add(coin);
  }

  _collectCoin(player, coin) {
    const [cx, cy] = [coin.x, coin.y];
    const lbl = this.add.text(cx, cy - 20, '+5', {
      fontSize:'28px', fill:'#00FFFF', fontFamily:'monospace',
      stroke:'#003333', strokeThickness:3,
    }).setOrigin(0.5).setDepth(15);
    this.tweens.add({ targets:lbl, y:cy-80, alpha:0, duration:700, ease:'Cubic.easeOut',
      onComplete:() => lbl.destroy() });
    this._playFX('anim-smack', cx, cy, 80);
    coin.destroy();
    this.score += 5;
    this.scoreText.setText(this.score);
    this._scorePopAnim();
  }

  _updateCoins() {
    const dead = [];
    this.coins.getChildren().forEach(c => { if (c.x < -(OBSTACLE_WIDTH+20)) dead.push(c); });
    dead.forEach(c => c.destroy());
  }

  // ── Drones ─────────────────────────────────────────────────────────────────

  _enableDrones() {
    if (this.droneEnabled) return;
    this.droneEnabled = true;
    this.droneSpawnTimer = this.time.addEvent({
      delay:3500, callback:this._spawnDrone, callbackScope:this, loop:true,
    });
  }

  _spawnDrone() {
    if (this.gameState !== 'playing') return;
    const y     = Phaser.Math.Between(GAP_MARGIN + 20, GAME_HEIGHT - GAP_MARGIN - 20);
    const drone = this.physics.add.image(GAME_WIDTH + 60, y, `drone-${this.droneFrame}`);
    drone.setDisplaySize(62, 42);
    drone.body.setSize(52, 32, false);
    drone.body.allowGravity = false;
    drone.setVelocityX(-this.currentSpeed * 1.35).setDepth(4.5);
    this.drones.add(drone);
  }

  _tickDroneAnim() {
    this.droneFrame = (this.droneFrame % 4) + 1;
    this.drones.getChildren().forEach(d => d.setTexture(`drone-${this.droneFrame}`));
  }

  _onDroneHit(player, drone) {
    if (this.time.now < this.immuneUntil) { drone.destroy(); return; }
    const splat = this.add.image(drone.x, drone.y, 'explosion-a');
    splat.setDisplaySize(90, 90).setBlendMode(Phaser.BlendModes.ADD).setDepth(16);
    this.tweens.add({
      targets:splat,
      scaleX:{ from:splat.scaleX, to:splat.scaleX * 2.5 },
      scaleY:{ from:splat.scaleY, to:splat.scaleY * 2.5 },
      alpha:{ from:1, to:0 }, duration:400, ease:'Quad.easeOut',
      onComplete:() => splat.destroy(),
    });
    drone.destroy();
    this.triggerGameOver();
  }

  _updateDrones() {
    const dead = [];
    this.drones.getChildren().forEach(d => { if (d.x < -100) dead.push(d); });
    dead.forEach(d => d.destroy());
  }

  // ── Decorations ────────────────────────────────────────────────────────────

  _spawnDecoration(x, gapTop) {
    const y   = Phaser.Math.Between(Math.max(20, Math.floor(gapTop * 0.15)), Math.floor(gapTop * 0.75));
    const key = `control-box-${Phaser.Math.Between(1, 3)}`;
    const d   = this.physics.add.image(x + OBSTACLE_WIDTH/2 + 14, y, key);
    d.setDisplaySize(28, 28);
    d.body.allowGravity = false;
    d.setVelocityX(-this.currentSpeed).setDepth(3.5);
    this.decorations.add(d);
  }

  _updateDecorations() {
    const dead = [];
    this.decorations.getChildren().forEach(d => { if (d.x < -80) dead.push(d); });
    dead.forEach(d => d.destroy());
  }

  // ── Background swap ────────────────────────────────────────────────────────

  _swapToMiami() {
    if (this.bgSwapped) return;
    this.bgSwapped = true;
    const dur = 2500;
    this.tweens.add({ targets: this.bgCustom,  alpha: 0, duration: dur });
    this.tweens.add({ targets: this.bgLevel2,  alpha: 1, duration: dur });
  }

  _swapToLevel3() {
    if (this.bgSwappedLevel3) return;
    this.bgSwappedLevel3 = true;
    const dur = 2500;
    this.tweens.add({ targets: this.bgLevel2,  alpha: 0, duration: dur });
    this.tweens.add({ targets: this.bgLevel3,  alpha: 1, duration: dur });
    // Flash to signal entering hard mode
    const f = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0xFF00FF, 0.22).setDepth(17);
    this.tweens.add({ targets:f, alpha:0, duration:600, onComplete:()=>f.destroy() });
  }

  // ── FX helpers ─────────────────────────────────────────────────────────────

  _playFX(animKey, x, y, size) {
    const initKey = { 'anim-electro':'electro-0', 'anim-smack':'smack-0', 'anim-explode':'explode-1' }[animKey];
    const spr = this.add.sprite(x, y, initKey);
    spr.setDisplaySize(size, size).setBlendMode(Phaser.BlendModes.ADD).setDepth(16);
    spr.play(animKey);
    spr.once('animationcomplete', () => spr.destroy());
  }

  _scorePopAnim() {
    this.tweens.add({ targets:this.scoreText, scaleX:1.25, scaleY:1.25,
      duration:80, yoyo:true, ease:'Quad.easeOut' });
  }

  _speedFlash() {
    const f = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0x00FFFF, 0.18).setDepth(17);
    this.tweens.add({ targets:f, alpha:0, duration:300, onComplete:() => f.destroy() });
  }

  // ── Game Over ──────────────────────────────────────────────────────────────

  triggerGameOver() {
    if (this.gameState === 'gameover') return;
    this.gameState = 'gameover';

    if (this.bgMusic) { this.bgMusic.stop(); this.bgMusic = null; }
    if (this.spawnTimer)       this.spawnTimer.remove(false);
    if (this.droneSpawnTimer)  this.droneSpawnTimer.remove(false);
    if (this.capeTimer)        this.capeTimer.remove(false);
    if (this.grokTimerEvent)   { this.grokTimerEvent.remove(false); this.grokTimerEvent = null; }
    if (this.capeActive) {
      // Revert capped-can texture so game over shows the normal can
      const canH = 88, canW = Math.round(canH * this._playerAspect);
      this.player.setTexture('player').setDisplaySize(canW, canH);
    }
    this.capeActive = false;
    if (this._capePulseTween) { this._capePulseTween.stop(); this._capePulseTween = null; }
    if (this._immuneBlinkTween) { this._immuneBlinkTween.stop(); this._immuneBlinkTween = null; }
    this.player.setAlpha(1);

    this.cameras.main.shake(220, 0.018);

    // Two stacked FX at can position
    this._playFX('anim-electro', this.player.x, this.player.y, 130);
    this._playFX('anim-explode', this.player.x, this.player.y, 160);

    // Splatter scale-up
    const splat = this.add.image(this.player.x, this.player.y, 'splatter');
    splat.setDisplaySize(80, 80).setDepth(14).setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets:splat,
      scaleX:{ from:splat.scaleX, to:splat.scaleX * 3.5 },
      scaleY:{ from:splat.scaleY, to:splat.scaleY * 3.5 },
      alpha:{ from:1, to:0 }, duration:600, ease:'Quad.easeOut',
    });

    // Freeze all physics objects
    this.player.body.setVelocity(0, 0);
    this.player.body.allowGravity = false;
    // Clean up grok hole if it was running
    if (this.grokHoleActive) {
      this.grokHoleActive = false;
      this.grokPhase = 'none';
      if (this.grokTimerEvent) { this.grokTimerEvent.remove(false); this.grokTimerEvent = null; }
      this._grokElements.forEach(e => { if (e && e.active) e.destroy(); });
      this._grokElements = [];
      this.player.angle = 0;
      // Restore correct world background
      this.tweens.add({ targets:this.bgGrokWorld, alpha:0, duration:400 });
      const _bgT = this.bgSwappedLevel3 ? this.bgLevel3 : (this.bgSwapped ? this.bgLevel2 : this.bgCustom);
      this.tweens.add({ targets:[this.bgWarpedBack, _bgT], alpha:1, duration:400 });
    }
    [this.obstacles, this.coins, this.drones, this.decorations, this.capePowerups, this.grokPowerups, this.liquidations].forEach(grp =>
      grp.getChildren().forEach(o => { if (o.body) o.setVelocityX(0); }));

    // Persist high score
    const prev    = parseInt(localStorage.getItem(LS_KEY) || '0');
    const newBest = this.score > prev;
    if (newBest) localStorage.setItem(LS_KEY, String(this.score));

    this.time.delayedCall(220, () => this._showGameOverPanel(newBest));
  }

  _getDeathMessage(score) {
    if (score < 0) {
      const msgs = [
        'WENT NEGATIVE?? LOG OFF',
        'YOU OWE THE GAME POINTS',
        'LIQUIDATED IRL SMH',
        'DOWN ATROCIOUS',
        'NEGATIVE SCORE = NEGATIVE SKILL',
      ];
      return { text: msgs[Math.floor(Math.random() * msgs.length)], color: '#FF2222' };
    }
    if (score < 25) {
      const msgs = [
        'SKILL ISSUE. MASSIVE.',
        'MY GRANDMA GETS MORE POINTS',
        'THAT WAS... ROUGH BRO',
        'NAH BRO. JUST NAH.',
        'RESPECTABLE... FOR A TODDLER',
      ];
      return { text: msgs[Math.floor(Math.random() * msgs.length)], color: '#FF6600' };
    }
    if (score < 100) {
      const msgs = [
        'MID. CERTIFIED MID.',
        'FINE I GUESS',
        'PARTICIPATION TROPHY EARNED',
        'AVERAGE ENJOYER FR',
        'NOT TERRIBLE. NOT IMPRESSIVE.',
      ];
      return { text: msgs[Math.floor(Math.random() * msgs.length)], color: '#AAAAAA' };
    }
    // 100+
    const msgs = [
      'W PLAYER. STRAIGHT W.',
      'OK YOU ACTUALLY ATE',
      'CERTIFIED GOAT FR FR',
      'RESPECT. THAT WAS CLEAN.',
      'YOU COOKED AND LEFT NO CRUMBS',
    ];
    return { text: msgs[Math.floor(Math.random() * msgs.length)], color: '#00FF88' };
  }

  _showGameOverPanel(newBest) {
    const glow  = c => ({ offsetX:0, offsetY:0, color:c, blur:12, fill:true });
    const best  = parseInt(localStorage.getItem(LS_KEY) || '0');
    const { text: deathMsg, color: msgColor } = this._getDeathMessage(this.score);
    const panelW = 380;
    const panelH = newBest ? 430 : 394;
    const panelX = (GAME_WIDTH - panelW) / 2;
    const panelY = GAME_HEIGHT / 2 - panelH / 2;
    const els = this._goElements;

    // Rounded dark panel with neon border
    const g = this.add.graphics().setDepth(18);
    g.fillStyle(0x000000, 0.84);
    g.fillRoundedRect(panelX, panelY, panelW, panelH, 20);
    g.lineStyle(2, 0xFF00FF, 0.9);
    g.strokeRoundedRect(panelX, panelY, panelW, panelH, 20);
    els.push(g);

    const cx = GAME_WIDTH / 2;

    els.push(this.add.text(cx, panelY + 28, 'GAME OVER', {
      fontSize:'46px', fill:'#FF00FF', fontFamily:'monospace',
      stroke:'#330033', strokeThickness:4, shadow:glow('#FF00FF'),
    }).setOrigin(0.5, 0).setDepth(20));

    // Death message
    els.push(this.add.text(cx, panelY + 86, deathMsg, {
      fontSize:'15px', fill: msgColor, fontFamily:'monospace',
      stroke:'#000000', strokeThickness:2, align:'center',
      wordWrap:{ width: panelW - 24 },
      shadow:{offsetX:0,offsetY:0,color:msgColor,blur:8,fill:true},
    }).setOrigin(0.5, 0).setDepth(20));

    els.push(this.add.text(cx, panelY + 138, `SCORE  ${this.score}`, {
      fontSize:'32px', fill:'#00FFFF', fontFamily:'monospace', shadow:glow('#00FFFF'),
    }).setOrigin(0.5, 0).setDepth(20));

    els.push(this.add.text(cx, panelY + 182, `BEST   ${best}`, {
      fontSize:'26px', fill:'#FFFF00', fontFamily:'monospace',
    }).setOrigin(0.5, 0).setDepth(20));

    if (newBest) {
      const nb = this.add.text(cx, panelY + 222, '★  NEW BEST  ★', {
        fontSize:'22px', fill:'#FF8800', fontFamily:'monospace', shadow:glow('#FF8800'),
      }).setOrigin(0.5, 0).setDepth(20);
      this.tweens.add({ targets:nb, alpha:{ from:1, to:0.3 }, duration:500, yoyo:true, repeat:-1 });
      els.push(nb);
    }

    // TAP TO RESTART (interactive)
    const restartTxt = this.add.text(cx, panelY + panelH - 104, 'TAP TO RESTART', {
      fontSize:'24px', fill:'#FFFFFF', fontFamily:'monospace',
    }).setOrigin(0.5, 0).setDepth(20).setInteractive({ useHandCursor: true });
    restartTxt.on('pointerdown', () => { this._clearGoElements(); this.scene.restart(); });
    els.push(restartTxt);

    // LEADERBOARD button
    const lbY = panelY + panelH - 58;
    const lbBg = this.add.graphics().setDepth(19);
    lbBg.fillStyle(0x00FFFF, 0.10);
    lbBg.fillRoundedRect(cx - 115, lbY - 6, 230, 44, 10);
    lbBg.lineStyle(2, 0x00FFFF, 0.85);
    lbBg.strokeRoundedRect(cx - 115, lbY - 6, 230, 44, 10);
    els.push(lbBg);

    const lbBtn = this.add.text(cx, lbY + 16, '▶  LEADERBOARD', {
      fontSize:'22px', fill:'#00FFFF', fontFamily:'monospace', shadow:glow('#00FFFF'),
    }).setOrigin(0.5).setDepth(20).setInteractive({ useHandCursor: true });
    lbBtn.on('pointerdown', () => this._showInitialsEntry(deathMsg, msgColor));
    els.push(lbBtn);

    // Space bar restarts
    this.time.delayedCall(500, () => {
      this.input.keyboard.once('keydown-SPACE', () => { this._clearGoElements(); this.scene.restart(); });
    });
  }

  // ── Leaderboard helpers ────────────────────────────────────────────────────
  // Uses Supabase when credentials are configured, otherwise falls back to
  // localStorage so the leaderboard still works locally.

  _supabaseReady() {
    return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_KEY !== 'YOUR_SUPABASE_ANON_KEY';
  }

  // ── localStorage fallback helpers ──
  _localGet() {
    try { return JSON.parse(localStorage.getItem('cwLB') || '[]'); }
    catch { return []; }
  }
  _localSave(entry) {
    const data = this._localGet();
    const ts   = Date.now();
    entry.id   = ts;
    data.push(entry);
    data.sort((a, b) => b.score - a.score);
    if (data.length > LB_MAX) data.length = LB_MAX;
    localStorage.setItem('cwLB', JSON.stringify(data));
    return ts;
  }

  async _getLBData() {
    if (!this._supabaseReady()) return this._localGet();
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${LB_TABLE}?select=*&order=score.desc&limit=${LB_MAX}`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) throw new Error(`LB fetch failed: ${res.status}`);
    return res.json();
  }

  async _saveLBEntry(initials, score, message, msgColor, solanaAddr = null) {
    // Only include solana_address in payload if it has a value
    // (avoids errors if the DB column hasn't been added yet)
    const payload = { initials, score, message, msg_color: msgColor };
    if (solanaAddr) payload.solana_address = solanaAddr;
    if (!this._supabaseReady()) {
      if (solanaAddr) payload.solana_address = solanaAddr;
      const id = this._localSave(payload);
      return id;
    }
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${LB_TABLE}`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) throw new Error(`LB save failed: ${res.status}`);
    const rows = await res.json();
    return rows[0]?.id ?? null;
  }

  _clearGoElements() {
    this._goElements.forEach(e => { if (e && e.active) e.destroy(); });
    this._goElements = [];
    if (this._lbKeyHandler) {
      this.input.keyboard.off('keydown', this._lbKeyHandler);
      this._lbKeyHandler = null;
    }
    if (this._lbCursorTimer) {
      this._lbCursorTimer.remove(false);
      this._lbCursorTimer = null;
    }
    this.input.keyboard.removeAllListeners('keydown-SPACE');
  }

  // ── Initials entry screen ─────────────────────────────────────────────────

  _showInitialsEntry(deathMsg, msgColor) {
    this._clearGoElements();
    const els = this._goElements;
    const glow = c => ({ offsetX:0, offsetY:0, color:c, blur:12, fill:true });
    const cx = GAME_WIDTH / 2;
    const panelW = 380, panelH = 370;
    const panelX = (GAME_WIDTH - panelW) / 2;
    const panelY = GAME_HEIGHT / 2 - panelH / 2;

    const g = this.add.graphics().setDepth(18);
    g.fillStyle(0x000000, 0.90);
    g.fillRoundedRect(panelX, panelY, panelW, panelH, 20);
    g.lineStyle(2, 0x00FFFF, 0.9);
    g.strokeRoundedRect(panelX, panelY, panelW, panelH, 20);
    els.push(g);

    els.push(this.add.text(cx, panelY + 24, 'ENTER INITIALS', {
      fontSize:'34px', fill:'#00FFFF', fontFamily:'monospace',
      stroke:'#001133', strokeThickness:4, shadow:glow('#00FFFF'),
    }).setOrigin(0.5, 0).setDepth(20));

    els.push(this.add.text(cx, panelY + 74, deathMsg, {
      fontSize:'13px', fill:msgColor, fontFamily:'monospace',
      align:'center', wordWrap:{ width: panelW - 32 },
      shadow:{offsetX:0,offsetY:0,color:msgColor,blur:6,fill:true},
    }).setOrigin(0.5, 0).setDepth(20));

    // Three letter slots
    const letters  = ['_', '_', '_'];
    let cursor = 0;
    const slotY  = panelY + 148;
    const slotXs = [cx - 80, cx, cx + 80];

    // Slot box graphics
    const slotBoxes = slotXs.map(sx => {
      const b = this.add.graphics().setDepth(19);
      els.push(b);
      return b;
    });

    // Slot letter texts
    const slotTexts = slotXs.map(sx => {
      const t = this.add.text(sx, slotY, '_', {
        fontSize:'60px', fill:'#444444', fontFamily:'monospace',
      }).setOrigin(0.5, 0).setDepth(20);
      els.push(t);
      return t;
    });

    // Up / Down arrows for mobile tapping
    slotXs.forEach((sx, i) => {
      const upArrow = this.add.text(sx, slotY - 32, '▲', {
        fontSize:'22px', fill:'#666666', fontFamily:'monospace',
      }).setOrigin(0.5).setDepth(20).setInteractive({ useHandCursor: true });
      upArrow.on('pointerdown', () => {
        cursor = i;
        const cur = letters[cursor];
        letters[cursor] = cur === '_' ? 'A' : (cur === 'Z' ? 'A' : String.fromCharCode(cur.charCodeAt(0) + 1));
        refresh();
      });
      els.push(upArrow);

      const downArrow = this.add.text(sx, slotY + 76, '▼', {
        fontSize:'22px', fill:'#666666', fontFamily:'monospace',
      }).setOrigin(0.5).setDepth(20).setInteractive({ useHandCursor: true });
      downArrow.on('pointerdown', () => {
        cursor = i;
        const cur = letters[cursor];
        letters[cursor] = cur === '_' ? 'Z' : (cur === 'A' ? 'Z' : String.fromCharCode(cur.charCodeAt(0) - 1));
        refresh();
      });
      els.push(downArrow);
    });

    els.push(this.add.text(cx, slotY + 102, 'TYPE   OR   TAP ARROWS', {
      fontSize:'13px', fill:'#555555', fontFamily:'monospace',
    }).setOrigin(0.5, 0).setDepth(20));

    // Submit button (greyed until all 3 filled)
    const submitBg = this.add.graphics().setDepth(19);
    const submitY  = panelY + panelH - 62;
    const submitTxt = this.add.text(cx, submitY + 14, 'SUBMIT', {
      fontSize:'30px', fill:'#333333', fontFamily:'monospace',
    }).setOrigin(0.5).setDepth(20).setInteractive({ useHandCursor: true });
    submitTxt.on('pointerdown', () => doSubmit());
    els.push(submitBg, submitTxt);

    const refresh = () => {
      const allFilled = letters.every(l => l !== '_');
      slotTexts.forEach((t, i) => {
        const active  = i === cursor;
        const filled  = letters[i] !== '_';
        t.setText(letters[i]);
        t.setStyle({ fill: active ? '#00FFFF' : (filled ? '#FFFFFF' : '#444444') });
      });
      slotBoxes.forEach((b, i) => {
        const active = i === cursor;
        b.clear();
        b.lineStyle(2, active ? 0x00FFFF : 0x333333, 1);
        b.strokeRect(slotXs[i] - 32, slotY - 6, 64, 72);
      });
      submitBg.clear();
      if (allFilled) {
        submitBg.fillStyle(0x00FFFF, 0.12);
        submitBg.fillRoundedRect(cx - 100, submitY - 4, 200, 48, 10);
        submitBg.lineStyle(2, 0x00FFFF, 0.9);
        submitBg.strokeRoundedRect(cx - 100, submitY - 4, 200, 48, 10);
        submitTxt.setStyle({ fill: '#00FFFF' });
      } else {
        submitBg.fillStyle(0x222222, 0.5);
        submitBg.fillRoundedRect(cx - 100, submitY - 4, 200, 48, 10);
        submitBg.lineStyle(2, 0x333333, 0.6);
        submitBg.strokeRoundedRect(cx - 100, submitY - 4, 200, 48, 10);
        submitTxt.setStyle({ fill: '#333333' });
      }
    };

    const doSubmit = () => {
      if (!letters.every(l => l !== '_')) return;
      const initials = letters.join('');
      this._clearGoElements();
      this._showSolanaEntry(initials, deathMsg, msgColor);
    };

    this._lbKeyHandler = (evt) => {
      const key = evt.key.toUpperCase();
      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        letters[cursor] = key;
        cursor = Math.min(cursor + 1, 2);
        refresh();
      } else if (evt.key === 'Backspace') {
        if (letters[cursor] !== '_') {
          letters[cursor] = '_';
        } else {
          cursor = Math.max(cursor - 1, 0);
          letters[cursor] = '_';
        }
        refresh();
      } else if (evt.key === 'Enter') {
        doSubmit();
      } else if (evt.key === 'ArrowLeft') {
        cursor = Math.max(cursor - 1, 0);
        refresh();
      } else if (evt.key === 'ArrowRight') {
        cursor = Math.min(cursor + 1, 2);
        refresh();
      }
    };
    this.input.keyboard.on('keydown', this._lbKeyHandler);

    refresh();
  }

  // ── Solana address entry screen ───────────────────────────────────────────

  _showSolanaEntry(initials, deathMsg, msgColor) {
    this._clearGoElements();
    const els  = this._goElements;
    const glow = c => ({ offsetX:0, offsetY:0, color:c, blur:12, fill:true });
    const cx   = GAME_WIDTH / 2;
    const SOL  = 0x9945FF; // Solana purple
    const panelW = 420, panelH = 340;
    const panelX = (GAME_WIDTH - panelW) / 2;
    const panelY = GAME_HEIGHT / 2 - panelH / 2;

    const g = this.add.graphics().setDepth(18);
    g.fillStyle(0x000000, 0.92);
    g.fillRoundedRect(panelX, panelY, panelW, panelH, 20);
    g.lineStyle(2, SOL, 0.9);
    g.strokeRoundedRect(panelX, panelY, panelW, panelH, 20);
    els.push(g);

    els.push(this.add.text(cx, panelY + 22, 'SOLANA ADDRESS', {
      fontSize:'30px', fill:'#9945FF', fontFamily:'monospace',
      stroke:'#110022', strokeThickness:4, shadow:glow('#9945FF'),
    }).setOrigin(0.5, 0).setDepth(20));

    els.push(this.add.text(cx, panelY + 64, 'OPTIONAL  —  SKIP TO JUST POST SCORE', {
      fontSize:'12px', fill:'#666666', fontFamily:'monospace',
    }).setOrigin(0.5, 0).setDepth(20));

    // Address text box
    let address = '';
    let showCursor = true;
    const boxY = panelY + 100;
    const boxH = 80;
    const addrBg = this.add.graphics().setDepth(19);
    const addrTxt = this.add.text(cx, boxY + 12, '', {
      fontSize:'13px', fill:'#FFFFFF', fontFamily:'monospace',
      align:'center', wordWrap:{ width: panelW - 48 },
    }).setOrigin(0.5, 0).setDepth(20);
    const validTxt = this.add.text(cx, boxY + boxH - 18, '', {
      fontSize:'11px', fill:'#00FF88', fontFamily:'monospace',
    }).setOrigin(0.5, 0).setDepth(20);
    els.push(addrBg, addrTxt, validTxt);

    // Submit / Skip buttons
    const submitY = panelY + panelH - 116;
    const skipY   = panelY + panelH - 58;
    const submitBg  = this.add.graphics().setDepth(19);
    const submitTxt = this.add.text(cx, submitY + 14, 'SUBMIT ADDRESS', {
      fontSize:'22px', fill:'#444444', fontFamily:'monospace',
    }).setOrigin(0.5).setDepth(20).setInteractive({ useHandCursor: true });
    const skipTxt = this.add.text(cx, skipY + 12, 'SKIP — JUST POST SCORE', {
      fontSize:'16px', fill:'#888888', fontFamily:'monospace',
    }).setOrigin(0.5).setDepth(20).setInteractive({ useHandCursor: true });
    els.push(submitBg, submitTxt, skipTxt);

    const isValid = () => address.length >= 32 && address.length <= 44;

    const redraw = () => {
      // Box
      addrBg.clear();
      addrBg.fillStyle(0x111111, 0.7);
      addrBg.fillRoundedRect(panelX + 16, boxY, panelW - 32, boxH, 8);
      addrBg.lineStyle(2, isValid() ? SOL : 0x333333, 1);
      addrBg.strokeRoundedRect(panelX + 16, boxY, panelW - 32, boxH, 8);

      // Address text with blinking cursor
      const display = address + (showCursor ? '|' : ' ');
      addrTxt.setText(display.length > 1 ? display : (showCursor ? '|' : ' '));

      // Validity hint
      if (address.length === 0) {
        validTxt.setText('paste or type your wallet address');
        validTxt.setStyle({ fill: '#555555' });
      } else if (address.length < 32) {
        validTxt.setText(`${address.length}/44 — too short`);
        validTxt.setStyle({ fill: '#FF6644' });
      } else {
        validTxt.setText(`${address.length} chars  ✓  valid length`);
        validTxt.setStyle({ fill: '#00FF88' });
      }

      // Submit button style
      submitBg.clear();
      if (isValid()) {
        submitBg.fillStyle(SOL, 0.15);
        submitBg.fillRoundedRect(cx - 120, submitY - 4, 240, 46, 10);
        submitBg.lineStyle(2, SOL, 0.9);
        submitBg.strokeRoundedRect(cx - 120, submitY - 4, 240, 46, 10);
        submitTxt.setStyle({ fill: '#9945FF' });
      } else {
        submitBg.fillStyle(0x222222, 0.5);
        submitBg.fillRoundedRect(cx - 120, submitY - 4, 240, 46, 10);
        submitBg.lineStyle(2, 0x333333, 0.5);
        submitBg.strokeRoundedRect(cx - 120, submitY - 4, 240, 46, 10);
        submitTxt.setStyle({ fill: '#444444' });
      }
    };

    this._lbCursorTimer = this.time.addEvent({
      delay: 500, loop: true,
      callback: () => { showCursor = !showCursor; redraw(); },
    });

    const doSave = (addr) => {
      submitTxt.setText('SAVING...');
      submitTxt.setStyle({ fill: '#AAAAAA' });
      submitBg.clear();
      this._saveLBEntry(initials, this.score, deathMsg, msgColor, addr || null)
        .then(savedId => { this._clearGoElements(); this._showLeaderboard(savedId); })
        .catch(() => { submitTxt.setText('ERROR — RETRY'); submitTxt.setStyle({ fill: '#FF4444' }); });
    };

    submitTxt.on('pointerdown', () => { if (isValid()) doSave(address); });
    skipTxt.on('pointerdown',   () => doSave(null));

    this._lbKeyHandler = (evt) => {
      if (evt.key === 'Backspace') {
        address = address.slice(0, -1);
        redraw();
      } else if (evt.key === 'Enter') {
        if (isValid()) doSave(address);
        else if (address.length === 0) doSave(null); // empty = skip
      } else if (evt.key === 'Escape') {
        doSave(null);
      } else if (evt.key.length === 1 && address.length < 44) {
        address += evt.key;
        redraw();
      }
    };
    this.input.keyboard.on('keydown', this._lbKeyHandler);

    redraw();
  }

  // ── Leaderboard display screen ─────────────────────────────────────────────

  _showLeaderboard(savedId) {
    this._clearGoElements();
    const els  = this._goElements;
    const glow = c => ({ offsetX:0, offsetY:0, color:c, blur:10, fill:true });
    const cx   = GAME_WIDTH / 2;

    // Fixed-size panel (same regardless of row count)
    // ROW_H = 68 to fit death message + optional solana address
    const ROW_H  = 68;
    const panelW = 420;
    const panelH = Math.min(760, 76 + LB_MAX * ROW_H + 62);
    const panelX = (GAME_WIDTH - panelW) / 2;
    const panelY = Math.max(18, GAME_HEIGHT / 2 - panelH / 2);

    const g = this.add.graphics().setDepth(18);
    g.fillStyle(0x000000, 0.93);
    g.fillRoundedRect(panelX, panelY, panelW, panelH, 20);
    g.lineStyle(2, 0x00FFFF, 0.9);
    g.strokeRoundedRect(panelX, panelY, panelW, panelH, 20);
    els.push(g);

    els.push(this.add.text(cx, panelY + 18, 'LEADERBOARD', {
      fontSize:'38px', fill:'#00FFFF', fontFamily:'monospace',
      stroke:'#001133', strokeThickness:4, shadow:glow('#00FFFF'),
    }).setOrigin(0.5, 0).setDepth(20));

    // Loading indicator — replaced once data arrives
    const loadingTxt = this.add.text(cx, panelY + 120, 'LOADING...', {
      fontSize:'22px', fill:'#555555', fontFamily:'monospace',
    }).setOrigin(0.5, 0).setDepth(20);
    els.push(loadingTxt);

    // PLAY AGAIN button always visible at bottom
    const btnY   = panelY + panelH - 48;
    const playBtn = this.add.text(cx, btnY, 'PLAY AGAIN', {
      fontSize:'28px', fill:'#FF00FF', fontFamily:'monospace',
      stroke:'#330033', strokeThickness:3, shadow:glow('#FF00FF'),
    }).setOrigin(0.5).setDepth(20).setInteractive({ useHandCursor: true });
    playBtn.on('pointerdown', () => { this._clearGoElements(); this.scene.restart(); });
    this.tweens.add({ targets:playBtn, alpha:{ from:1, to:0.45 }, duration:600, yoyo:true, repeat:-1 });
    els.push(playBtn);
    this.input.keyboard.once('keydown-SPACE', () => { this._clearGoElements(); this.scene.restart(); });

    // Fetch and render rows
    this._getLBData()
      .then(data => {
        if (!loadingTxt.active) return; // panel was closed
        loadingTxt.destroy();

        if (data.length === 0) {
          const noData = this.add.text(cx, panelY + 120, 'NO SCORES YET', {
            fontSize:'20px', fill:'#555555', fontFamily:'monospace',
          }).setOrigin(0.5, 0).setDepth(20);
          els.push(noData);
          return;
        }

        const highlightIdx = savedId != null ? data.findIndex(e => e.id === savedId) : -1;

        data.forEach((entry, i) => {
          const isHL = i === highlightIdx;
          const rowY = panelY + 76 + i * ROW_H;

          if (isHL) {
            const hl = this.add.graphics().setDepth(19);
            hl.fillStyle(0x00FFFF, 0.08);
            hl.fillRoundedRect(panelX + 8, rowY - 4, panelW - 16, ROW_H - 2, 8);
            els.push(hl);
          }

          const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
          const rankColor  = rankColors[i] || '#888888';
          const rankLabels = ['1ST', '2ND', '3RD'];
          const rankLabel  = rankLabels[i] || `${i + 1}`;

          els.push(this.add.text(panelX + 14, rowY + 8, rankLabel, {
            fontSize:'15px', fill:rankColor, fontFamily:'monospace',
          }).setOrigin(0, 0).setDepth(20));

          els.push(this.add.text(panelX + 58, rowY + 4, entry.initials, {
            fontSize:'32px', fill: isHL ? '#00FFFF' : '#FFFFFF', fontFamily:'monospace',
            shadow: isHL ? glow('#00FFFF') : undefined,
          }).setOrigin(0, 0).setDepth(20));

          els.push(this.add.text(panelX + 162, rowY + 4, String(entry.score).padStart(5), {
            fontSize:'30px', fill: i === 0 ? '#FFD700' : '#00FF88', fontFamily:'monospace',
          }).setOrigin(0, 0).setDepth(20));

          const msgDisplay = (entry.message || '').length > 28
            ? (entry.message || '').slice(0, 26) + '..'
            : (entry.message || '');
          els.push(this.add.text(panelX + panelW - 14, rowY + 36, msgDisplay, {
            fontSize:'11px', fill: entry.msg_color || '#666666', fontFamily:'monospace',
            align:'right',
          }).setOrigin(1, 0).setDepth(20));

          // Solana address (truncated: first6...last6)
          if (entry.solana_address) {
            const addr = entry.solana_address;
            const short = addr.length > 12
              ? addr.slice(0, 5) + '...' + addr.slice(-5)
              : addr;
            els.push(this.add.text(panelX + 14, rowY + 50, '◎ ' + short, {
              fontSize:'11px', fill:'#9945FF', fontFamily:'monospace',
            }).setOrigin(0, 0).setDepth(20));
          }
        });
      })
      .catch(() => {
        if (!loadingTxt.active) return;
        loadingTxt.setText('FAILED TO LOAD\nCHECK CONNECTION');
        loadingTxt.setStyle({ fill: '#FF4444', align: 'center' });
      });
  }

  // ── Claude Cape power-up ───────────────────────────────────────────────────

  _spawnCape(x) {
    // Spawn in the open corridor — near top or bottom of screen (hard to reach)
    const y = Math.random() < 0.5
      ? Phaser.Math.Between(60, 160)
      : Phaser.Math.Between(GAME_HEIGHT - 160, GAME_HEIGHT - 60);
    const cape = this.physics.add.image(x, y, 'cape-pickup');
    cape.setDisplaySize(80, 90);  // big enough to spot and grab
    // No body.setSize — let Phaser auto-size body to display dimensions
    cape.body.allowGravity = false;
    cape.setVelocityX(-this.currentSpeed).setDepth(4);
    this.tweens.add({ targets:cape, y:y+14, duration:700, yoyo:true, repeat:-1, ease:'Sine.easeInOut' });
    this.tweens.add({ targets:cape, alpha:{from:0.7,to:1}, duration:300, yoyo:true, repeat:-1 });

    // Alert banner so the player knows to look for it
    const alert = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.5, '⚡ CAPE INCOMING ⚡', {
      fontSize:'22px', fill:'#FF8800', fontFamily:'monospace',
      stroke:'#330000', strokeThickness:3,
      shadow:{offsetX:0,offsetY:0,color:'#FF8800',blur:14,fill:true},
    }).setOrigin(0.5).setDepth(20).setAlpha(0);
    this.tweens.add({
      targets:alert, alpha:1, duration:300, yoyo:true, hold:800,
      onComplete:() => alert.destroy(),
    });

    this.capePowerups.add(cape);
  }

  _collectCape(player, cape) {
    cape.destroy();
    this.capeActive = true;

    // Reset timer if already active
    if (this.capeTimer) this.capeTimer.remove(false);

    // Swap to caped-can sprite
    const canH = 96, canW = Math.round(canH * this._cappedCanAspect);
    this.player.setTexture('capped-can').setDisplaySize(canW, canH);
    const cSrc = this.textures.get('capped-can').getSourceImage();
    this.player.body.setSize(Math.round(cSrc.width * 0.65), Math.round(cSrc.height * 0.8), true);

    // Orange pulse glow
    if (this._capePulseTween) this._capePulseTween.stop();
    this._capePulseTween = this.tweens.add({
      targets:this.player, alpha:{from:1, to:0.65}, duration:280, yoyo:true, repeat:-1,
    });

    // Flash label
    const lbl = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.38, 'CLAUDE CAPE!', {
      fontSize:'36px', fill:'#FF8800', fontFamily:'monospace',
      stroke:'#330000', strokeThickness:3,
      shadow:{offsetX:0,offsetY:0,color:'#FF8800',blur:18,fill:true},
    }).setOrigin(0.5).setDepth(20);
    this.tweens.add({ targets:lbl, alpha:0, y:lbl.y - 70, duration:1100,
      ease:'Cubic.easeOut', onComplete:() => lbl.destroy() });

    this.capeTimer = this.time.delayedCall(8000, this._expireCape, [], this);
  }

  _smashObstaclePair(hitObs) {
    const pairId  = hitObs.pairId;
    const toSmash = this.obstacles.getChildren().filter(o => o.pairId === pairId);

    toSmash.forEach(obs => {
      this.obstacles.remove(obs, false, false); // stop further collisions
      obs.setVelocityX(600);
      this.tweens.add({
        targets:obs, angle: obs.angle + 540, alpha:0, duration:750, ease:'Quad.easeIn',
        onComplete:() => { if (obs.active) obs.destroy(); },
      });
    });

    // Bonus points
    this.score += 10;
    this.scoreText.setText(this.score);
    this._scorePopAnim();

    const lbl = this.add.text(this.player.x + 50, this.player.y - 20, 'SMASH! +10', {
      fontSize:'26px', fill:'#FF8800', fontFamily:'monospace',
      stroke:'#330000', strokeThickness:2,
    }).setOrigin(0.5).setDepth(20);
    this.tweens.add({ targets:lbl, y:lbl.y - 75, alpha:0, duration:850,
      ease:'Cubic.easeOut', onComplete:() => lbl.destroy() });

    // Orange flash
    const f = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0xFF8800, 0.14).setDepth(17);
    this.tweens.add({ targets:f, alpha:0, duration:250, onComplete:() => f.destroy() });
  }

  _expireCape() {
    this.capeActive = false;
    if (this._capePulseTween) { this._capePulseTween.stop(); this._capePulseTween = null; }
    this.player.setAlpha(1);

    // Revert to normal can
    const canH = 88, canW = Math.round(canH * this._playerAspect);
    this.player.setTexture('player').setDisplaySize(canW, canH);
    const pSrc = this.textures.get('player').getSourceImage();
    this.player.body.setSize(Math.round(pSrc.width * 0.7), Math.round(pSrc.height * 0.8), true);

    const lbl = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.38, 'CAPE GONE', {
      fontSize:'24px', fill:'#888888', fontFamily:'monospace',
    }).setOrigin(0.5).setDepth(20);
    this.tweens.add({ targets:lbl, alpha:0, duration:900, onComplete:() => lbl.destroy() });
  }

  _updateCapePowerups() {
    const dead = [];
    this.capePowerups.getChildren().forEach(c => { if (c.x < -(OBSTACLE_WIDTH + 20)) dead.push(c); });
    dead.forEach(c => c.destroy());
  }

  // ── Evil Badguy decoration ─────────────────────────────────────────────────

  _spawnEvilBadguy(x, edgeY, flipY) {
    const size = Math.min(OBSTACLE_WIDTH - 6, 82);
    const y    = flipY ? edgeY + size / 2 : edgeY - size / 2;
    const eb   = this.physics.add.image(x, y, 'evil-badguy');
    eb.setDisplaySize(size, size).setFlipY(flipY);
    eb.body.allowGravity = false;
    eb.setVelocityX(-this.currentSpeed).setDepth(3.8);
    this.decorations.add(eb);
  }

  // ── Grok Hole power-up ─────────────────────────────────────────────────────

  _spawnGrokPowerup(x) {
    const y = GAME_HEIGHT / 2 + Phaser.Math.Between(-80, 80);
    const g  = this.physics.add.image(x, y, 'grok-pickup');
    g.setDisplaySize(56, 56).setTint(0xAA44FF);
    g.body.allowGravity = false;
    g.setVelocityX(-this.currentSpeed).setDepth(4);
    this.tweens.add({ targets:g, angle:360, duration:1800, repeat:-1 });
    this.tweens.add({ targets:g, alpha:{from:0.7,to:1}, duration:350, yoyo:true, repeat:-1 });
    // Alert
    const alert = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.44, '🕳 GROK HOLE 🕳', {
      fontSize:'22px', fill:'#AA44FF', fontFamily:'monospace',
      stroke:'#110022', strokeThickness:3,
      shadow:{offsetX:0,offsetY:0,color:'#AA44FF',blur:16,fill:true},
    }).setOrigin(0.5).setDepth(20).setAlpha(0);
    this.tweens.add({ targets:alert, alpha:1, duration:300, yoyo:true, hold:800,
      onComplete:()=>alert.destroy() });
    this.grokPowerups.add(g);
  }

  _collectGrokPowerup(player, grok) {
    if (this.grokHoleActive) return;
    grok.destroy();
    this._startGrokSpiralIn();
  }

  // ── Grok Hole — phase 1: teleport to groklands + spiral IN there ──────────

  _startGrokSpiralIn() {
    this.grokHoleActive     = true;
    this.grokPhase          = 'spiral-in';
    this.grokAngle          = -Math.PI / 2; // start at top of circle
    this.grokRadius         = 195;
    this._grokSecretClaimed = false;

    // Freeze all scrolling objects
    [...this.obstacles.getChildren(), ...this.coins.getChildren(),
     ...this.decorations.getChildren(), ...this.capePowerups.getChildren(),
     ...this.grokPowerups.getChildren(), ...this.liquidations.getChildren(),
    ].forEach(o => { if (o.body) o.setVelocityX(0); });
    this.drones.getChildren().forEach(d => { if (d.body) d.setVelocityX(0); });

    // Disable physics for cinematic spiral
    this.player.body.allowGravity = false;
    this.player.body.setVelocity(0, 0);
    this.player.setDepth(30);

    const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;

    // Flash + teleport to groklands immediately (spiral happens inside groklands)
    const flash = this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0xAA44FF, 1).setDepth(40);
    this.tweens.add({ targets:flash, alpha:0, duration:500, onComplete:()=>flash.destroy() });

    this.tweens.add({ targets:[this.bgWarpedBack, this.bgCustom, this.bgLevel2, this.bgLevel3], alpha:0, duration:350 });
    this.tweens.add({ targets:this.bgGrokWorld, alpha:1, duration:350 });

    // Place player at starting orbit position (top of circle)
    this.player.x = cx + Math.cos(this.grokAngle) * this.grokRadius;
    this.player.y = cy + Math.sin(this.grokAngle) * this.grokRadius;

    // Spinning grok logo at center — the "hole" the player spirals into
    const logo = this.add.image(cx, cy, 'grok-pickup');
    logo.setDisplaySize(120, 120).setTint(0xAA44FF).setBlendMode(Phaser.BlendModes.ADD).setDepth(28);
    this.tweens.add({ targets:logo, angle:360, duration:1000, repeat:-1 });
    this.tweens.add({ targets:logo, scaleX:{from:0.8,to:1.2}, scaleY:{from:0.8,to:1.2},
      duration:500, yoyo:true, repeat:-1 });

    // Title
    const title = this.add.text(cx, 55, 'GROKLANDS', {
      fontSize:'46px', fill:'#AA44FF', fontFamily:'monospace',
      stroke:'#110022', strokeThickness:4,
      shadow:{offsetX:0,offsetY:0,color:'#AA44FF',blur:22,fill:true},
    }).setOrigin(0.5).setDepth(32);

    // These persist through explore and spiral-out; destroyed in _finalizeGrokExit
    this._grokElements = [logo, title];
  }

  // ── Grok Hole — phase 2: free explore in groklands ─────────────────────────

  _beginGrokExplore() {
    if (this.grokPhase === 'exploring') return; // double-call guard
    this.grokPhase = 'exploring';

    const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;

    // Small flash to signal transition from spiral to free-fly
    const flash = this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0xAA44FF, 0.5).setDepth(38);
    this.tweens.add({ targets:flash, alpha:0, duration:300, onComplete:()=>flash.destroy() });

    // Player emerges from center — re-enable gravity
    this.player.x = cx;
    this.player.y = cy;
    this.player.body.allowGravity = true;
    this.player.body.setVelocityY(-320);

    // Explore UI (stacked on top of persistent logo+title)
    const hint = this.add.text(cx, 110, 'EXPLORE! TAP TO FLY', {
      fontSize:'18px', fill:'#FFFFFF', fontFamily:'monospace',
    }).setOrigin(0.5).setDepth(32);

    this.grokCountdown = 6;
    const cdText = this.add.text(cx, GAME_HEIGHT - 70, '6', {
      fontSize:'72px', fill:'#AA44FF', fontFamily:'monospace',
      stroke:'#110022', strokeThickness:5,
      shadow:{offsetX:0,offsetY:0,color:'#AA44FF',blur:30,fill:true},
    }).setOrigin(0.5).setDepth(32);
    this._grokCountdownText = cdText;

    // Add explore-only elements alongside persistent ones
    this._grokElements.push(hint, cdText);

    // Countdown → spiral-out (also in groklands)
    if (this.grokTimerEvent) this.grokTimerEvent.remove(false);
    this.grokTimerEvent = this.time.addEvent({
      delay: 1000, repeat: 5,
      callback: () => {
        this.grokCountdown--;
        if (this._grokCountdownText && this._grokCountdownText.active)
          this._grokCountdownText.setText(String(this.grokCountdown));
        if (this.grokCountdown <= 0) {
          this.grokTimerEvent.remove(false);
          this.grokTimerEvent = null;
          this._startGrokSpiralOut();
        }
      },
    });
  }

  // ── Grok Hole — phase 3: spiral OUT still in groklands ─────────────────────

  _startGrokSpiralOut() {
    this.grokPhase  = 'spiral-out';
    this.grokAngle  = -Math.PI / 2;
    this.grokRadius = 0;

    // Destroy explore-only UI (hint + cdText) but keep logo + title
    this._grokCountdownText = null;
    // _grokElements = [logo, title, hint, cdText] — destroy the last two
    const explore = this._grokElements.length > 2 ? this._grokElements.splice(2) : [];
    explore.forEach(e => {
      if (e && e.active)
        this.tweens.add({ targets:e, alpha:0, duration:250, onComplete:()=>e.destroy() });
    });

    // Disable physics — player spirals OUT from center, still in groklands
    this.player.body.allowGravity = false;
    this.player.body.setVelocity(0, 0);

    const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;
    this.player.x = cx;
    this.player.y = cy;
  }

  // ── Grok Hole — finalize: flash + teleport back to normal world ─────────────

  _finalizeGrokExit() {
    if (!this.grokHoleActive) return; // double-call guard
    this.grokHoleActive = false;
    this.grokPhase      = 'none';

    // Destroy remaining grok elements (logo + title)
    this._grokElements.forEach(e => { if (e && e.active) e.destroy(); });
    this._grokElements = [];

    // Flash + swap back to normal world
    const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;
    const flash = this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0xAA44FF, 1).setDepth(40);
    this.tweens.add({ targets:flash, alpha:0, duration:600, onComplete:()=>flash.destroy() });

    this.tweens.add({ targets:this.bgGrokWorld, alpha:0, duration:500 });
    const bgTarget = this.bgSwappedLevel3 ? this.bgLevel3 : (this.bgSwapped ? this.bgLevel2 : this.bgCustom);
    this.tweens.add({ targets:[this.bgWarpedBack, bgTarget], alpha:1, duration:500 });

    // Clear all on-screen objects → spawn into a clean lane
    this.obstacles.clear(true, true);
    this.coins.clear(true, true);
    this.decorations.clear(true, true);
    this.drones.clear(true, true);
    this.capePowerups.clear(true, true);
    this.grokPowerups.clear(true, true);
    this.liquidations.clear(true, true);

    // Restore player
    this.player.setDepth(5);
    this.player.angle = 0;
    this.player.x = 120;
    this.player.y = GAME_HEIGHT / 2;
    this.player.body.allowGravity = true;
    this.player.setVelocityY(-280);

    // Spawn a pipe immediately then resume normal rhythm
    this.time.delayedCall(100, () => {
      if (this.gameState === 'playing') this._spawnObstaclePair();
    });
    if (this.spawnTimer) this.spawnTimer.remove(false);
    this.spawnTimer = this.time.addEvent({
      delay: SPAWN_INTERVAL, callback: this._spawnObstaclePair, callbackScope: this, loop: true,
    });

    // 1 second immunity + blink
    this.immuneUntil = this.time.now + 1000;
    if (this._immuneBlinkTween) this._immuneBlinkTween.stop();
    this._immuneBlinkTween = this.tweens.add({
      targets: this.player, alpha: { from: 1, to: 0.15 },
      duration: 100, yoyo: true, repeat: -1,
    });
    this.time.delayedCall(1000, () => {
      if (this._immuneBlinkTween) { this._immuneBlinkTween.stop(); this._immuneBlinkTween = null; }
      this.player.setAlpha(1);
    });

    // Bonus
    this.score += 20;
    this.scoreText.setText(this.score);
    const lbl = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.38, 'GROK BONUS  +20', {
      fontSize:'28px', fill:'#AA44FF', fontFamily:'monospace',
      shadow:{offsetX:0,offsetY:0,color:'#AA44FF',blur:12,fill:true},
    }).setOrigin(0.5).setDepth(20);
    this.tweens.add({ targets:lbl, alpha:0, y:lbl.y-60, duration:1300, delay:300,
      onComplete:()=>lbl.destroy() });
  }

  // ── Grok Hole — per-frame update (all phases) ──────────────────────────────

  _updateGrokHole(delta) {
    const dt = delta / 1000;
    const cx = GAME_WIDTH / 2, cy = GAME_HEIGHT / 2;

    if (this.grokPhase === 'spiral-in') {
      // Spin faster as radius shrinks (sucked into hole)
      const speed = 3.5 + (1 - this.grokRadius / 195) * 5.0;
      this.grokAngle  += speed * dt;
      this.grokRadius  = Math.max(0, this.grokRadius - 105 * dt); // ~1.85s to reach 0

      this.player.x = cx + Math.cos(this.grokAngle) * this.grokRadius;
      this.player.y = cy + Math.sin(this.grokAngle) * this.grokRadius;
      this.player.angle = (this.grokAngle * 180 / Math.PI) + 90;

      if (this.grokRadius <= 2) this._beginGrokExplore();
      return;
    }

    if (this.grokPhase === 'exploring') {
      // Full free gravity + flap — clamp to screen bounds
      this.player.y = Phaser.Math.Clamp(this.player.y, 15, GAME_HEIGHT - 15);
      this.player.x = Phaser.Math.Clamp(this.player.x, 30, GAME_WIDTH - 30);
      if (this.player.y <= 15 || this.player.y >= GAME_HEIGHT - 15)
        this.player.body.setVelocityY(0);
      const tilt = Phaser.Math.Clamp(this.player.body.velocity.y * 0.055, -25, 75);
      this.player.angle = Phaser.Math.Linear(this.player.angle, tilt, 0.18);

      // SECRET: hit the roof at 1 or 2 seconds left → +990 points
      if (!this._grokSecretClaimed && this.grokCountdown <= 2 && this.grokCountdown >= 1
          && this.player.y <= 16) {
        this._grokSecretClaimed = true;
        this.score += 990;
        this.scoreText.setText(this.score);
        this._scorePopAnim();
        const sx = this.player.x, sy = this.player.y + 30;
        const s1 = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.35, '★ SECRET ★', {
          fontSize:'40px', fill:'#FFD700', fontFamily:'monospace',
          stroke:'#332200', strokeThickness:4,
          shadow:{offsetX:0,offsetY:0,color:'#FFD700',blur:22,fill:true},
        }).setOrigin(0.5).setDepth(35);
        const s2 = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.48, '+990', {
          fontSize:'64px', fill:'#FFD700', fontFamily:'monospace',
          stroke:'#332200', strokeThickness:5,
          shadow:{offsetX:0,offsetY:0,color:'#FFD700',blur:28,fill:true},
        }).setOrigin(0.5).setDepth(35);
        this.tweens.add({ targets:[s1,s2], alpha:0, y:`-=70`, duration:1400, delay:500,
          ease:'Cubic.easeIn', onComplete:()=>{ s1.destroy(); s2.destroy(); } });
        this.cameras.main.shake(250, 0.02);
        // Gold flash
        const gf = this.add.rectangle(GAME_WIDTH/2,GAME_HEIGHT/2,GAME_WIDTH,GAME_HEIGHT,0xFFD700,0.3).setDepth(34);
        this.tweens.add({ targets:gf, alpha:0, duration:400, onComplete:()=>gf.destroy() });
      }
      return;
    }

    if (this.grokPhase === 'spiral-out') {
      // Eject from center, spinning outward
      const speed = 8.5 - (this.grokRadius / 210) * 5.0;
      this.grokAngle  += speed * dt;
      this.grokRadius  = Math.min(210, this.grokRadius + 140 * dt); // ~1.5s to reach 210

      this.player.x = cx + Math.cos(this.grokAngle) * this.grokRadius;
      this.player.y = cy + Math.sin(this.grokAngle) * this.grokRadius;
      this.player.angle = (this.grokAngle * 180 / Math.PI) + 90;

      if (this.grokRadius >= 205) this._finalizeGrokExit();
      return;
    }
  }

  _updateGrokPowerups() {
    const dead = [];
    this.grokPowerups.getChildren().forEach(g => { if (g.x < -(OBSTACLE_WIDTH+20)) dead.push(g); });
    dead.forEach(g => g.destroy());
  }

  // ── Liquidation debuff ─────────────────────────────────────────────────────

  _spawnLiquidation(x, gapTop, gapBottom) {
    // Spawn near the top or bottom quarter of the gap — large clear path on the other side
    const inTop = Math.random() < 0.5;
    const liqY  = inTop
      ? gapTop  + (GAP_HEIGHT * 0.22)
      : gapBottom - (GAP_HEIGHT * 0.22);
    const liq = this.physics.add.image(x, liqY, 'liq-pickup');
    liq.setDisplaySize(52, 52);
    liq.body.allowGravity = false;
    liq.body.immovable    = true;
    liq.setVelocityX(-this.currentSpeed).setDepth(4.2);
    // Ominous slow spin + red pulse
    this.tweens.add({ targets:liq, angle:360, duration:2200, repeat:-1 });
    this.tweens.add({ targets:liq, alpha:{from:0.65,to:1}, duration:220, yoyo:true, repeat:-1 });
    // Danger tint
    liq.setTint(0xFF2222);

    // Warning banner
    const alert = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.56, '⚠ LIQUIDATION ZONE ⚠', {
      fontSize:'20px', fill:'#FF2222', fontFamily:'monospace',
      stroke:'#330000', strokeThickness:3,
      shadow:{offsetX:0,offsetY:0,color:'#FF2222',blur:16,fill:true},
    }).setOrigin(0.5).setDepth(20).setAlpha(0);
    this.tweens.add({ targets:alert, alpha:1, duration:250, yoyo:true, hold:700,
      onComplete:()=>alert.destroy() });

    this.liquidations.add(liq);
  }

  _onLiquidationHit(player, liq) {
    if (liq._hit) return; // guard against double-fire
    liq._hit = true;
    liq.destroy();

    // Deduct 67 — can go negative
    this.score -= 67;
    this.scoreText.setText(this.score);

    // Score flashes red briefly
    this.scoreText.setColor('#FF2222');
    this.time.delayedCall(900, () => this.scoreText.setColor('#00FFFF'));

    // Big REKT text
    const rekt = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.42,
      'REKT\nGOT LIQUIDATED', {
        fontSize:'56px', fill:'#FF2222', fontFamily:'monospace',
        stroke:'#330000', strokeThickness:5, align:'center',
        shadow:{offsetX:0,offsetY:0,color:'#FF2222',blur:26,fill:true},
      }).setOrigin(0.5).setDepth(26);
    this.tweens.add({
      targets:rekt,
      scaleX:{from:1.1, to:1.4}, scaleY:{from:1.1, to:1.4},
      alpha:{from:1, to:0}, duration:1600, delay:300,
      ease:'Cubic.easeIn', onComplete:()=>rekt.destroy(),
    });

    // -67 float up
    const lbl = this.add.text(player.x, player.y - 20, '-67', {
      fontSize:'44px', fill:'#FF2222', fontFamily:'monospace',
      stroke:'#330000', strokeThickness:3,
      shadow:{offsetX:0,offsetY:0,color:'#FF2222',blur:14,fill:true},
    }).setOrigin(0.5).setDepth(26);
    this.tweens.add({ targets:lbl, y:lbl.y - 90, alpha:0, duration:900,
      ease:'Cubic.easeOut', onComplete:()=>lbl.destroy() });

    // Red screen flash
    const f = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0xFF0000, 0.32).setDepth(24);
    this.tweens.add({ targets:f, alpha:0, duration:500, onComplete:()=>f.destroy() });

    // Camera shake
    this.cameras.main.shake(280, 0.022);

    // Crypto images fly in from corners and fade out
    const cryptoKeys = ['crypto1', 'crypto2', 'crypto3'];
    const startPos = [
      { x: -80,           y: -80           }, // top-left
      { x: GAME_WIDTH+80, y: -80           }, // top-right
      { x: GAME_WIDTH/2,  y: GAME_HEIGHT+80}, // bottom-center
    ];
    cryptoKeys.forEach((key, i) => {
      const sp = startPos[i];
      const img = this.add.image(sp.x, sp.y, key);
      img.setDisplaySize(140, 140).setDepth(27).setAlpha(0.95);
      this.tweens.add({
        targets: img,
        x: GAME_WIDTH  * (0.25 + i * 0.25),
        y: GAME_HEIGHT * 0.45,
        duration: 400, ease: 'Back.easeOut',
      });
      this.tweens.add({
        targets: img, alpha: 0, duration: 800, delay: 700,
        onComplete: () => img.destroy(),
      });
    });
  }

  _updateLiquidations() {
    const dead = [];
    this.liquidations.getChildren().forEach(l => { if (l.x < -(OBSTACLE_WIDTH+20)) dead.push(l); });
    dead.forEach(l => l.destroy());
  }

  // ── Win condition ──────────────────────────────────────────────────────────

  _triggerWin() {
    if (this.gameState === 'gameover') return;
    this.gameState = 'gameover';

    // Stop music + timers
    if (this.bgMusic) { this.bgMusic.stop(); this.bgMusic = null; }
    if (this.spawnTimer)      this.spawnTimer.remove(false);
    if (this.droneSpawnTimer) this.droneSpawnTimer.remove(false);
    if (this.capeTimer)       this.capeTimer.remove(false);
    if (this.grokTimerEvent)  { this.grokTimerEvent.remove(false); this.grokTimerEvent = null; }

    // Freeze everything
    this.player.body.setVelocity(0, 0);
    this.player.body.allowGravity = false;
    [this.obstacles, this.coins, this.drones, this.decorations,
     this.capePowerups, this.grokPowerups, this.liquidations].forEach(grp =>
      grp.getChildren().forEach(o => { if (o.body) o.setVelocityX(0); }));

    // Persist high score
    const prev = parseInt(localStorage.getItem(LS_KEY) || '0');
    if (this.score > prev) localStorage.setItem(LS_KEY, String(this.score));

    // Gold flash
    const flash = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0xFFD700, 1).setDepth(45);
    this.tweens.add({ targets:flash, alpha:0, duration:800, onComplete:()=>flash.destroy() });

    // Holy Elon fullscreen
    const elon = this.add.image(GAME_WIDTH/2, GAME_HEIGHT/2, 'holy-elon');
    elon.setDisplaySize(GAME_WIDTH, GAME_HEIGHT).setDepth(46).setAlpha(0);
    this.tweens.add({ targets:elon, alpha:1, duration:700, delay:200 });

    const glow = c => ({ offsetX:0, offsetY:0, color:c, blur:20, fill:true });

    this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.10, 'YOU WON', {
      fontSize:'62px', fill:'#FFD700', fontFamily:'monospace',
      stroke:'#332200', strokeThickness:5, shadow:glow('#FFD700'),
    }).setOrigin(0.5).setDepth(50);

    this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.21, 'ELON APPROVES', {
      fontSize:'34px', fill:'#FFFFFF', fontFamily:'monospace',
      stroke:'#000000', strokeThickness:4, shadow:glow('#FFFFFF'),
    }).setOrigin(0.5).setDepth(50);

    this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.88, `SCORE  ${this.score}`, {
      fontSize:'28px', fill:'#FFD700', fontFamily:'monospace', shadow:glow('#FFD700'),
    }).setOrigin(0.5).setDepth(50);

    this.time.delayedCall(1200, () => {
      const tap = this.add.text(GAME_WIDTH/2, GAME_HEIGHT * 0.94, 'TAP TO PLAY AGAIN', {
        fontSize:'22px', fill:'#FFFFFF', fontFamily:'monospace',
      }).setOrigin(0.5).setDepth(50);
      this.tweens.add({ targets:tap, alpha:{from:1,to:0.2}, duration:500, yoyo:true, repeat:-1 });
      this.input.once('pointerdown',            () => this.scene.restart());
      this.input.keyboard.once('keydown-SPACE', () => this.scene.restart());
    });
  }

  // ── Texture processing ─────────────────────────────────────────────────────

  _processPlayerTexture() {
    if (this.textures.exists('player')) {
      const s = this.textures.get('player').getSourceImage();
      this._playerAspect = s.width / s.height;
      return;
    }
    const { cropCanvas, aspect } = this._stripAndCrop(
      this.textures.get('player-raw').getSourceImage(), 235, false);
    this._playerAspect = aspect;
    this.textures.addCanvas('player', cropCanvas);
  }

  _processCoinTexture() {
    if (this.textures.exists('coin')) return;
    const { cropCanvas } = this._stripAndCrop(
      this.textures.get('coin-raw').getSourceImage(), 235, true);
    this.textures.addCanvas('coin', cropCanvas);
  }

  _processCapePickupTexture() {
    if (this.textures.exists('cape-pickup')) return;
    const { cropCanvas } = this._stripAndCrop(
      this.textures.get('cape-pickup-raw').getSourceImage(), 235, false);
    this.textures.addCanvas('cape-pickup', cropCanvas);
  }

  _processEvilBadguyTexture() {
    if (this.textures.exists('evil-badguy')) return;
    const { cropCanvas } = this._stripAndCrop(
      this.textures.get('evil-badguy-raw').getSourceImage(), 220, false); // keep original black pixels
    this.textures.addCanvas('evil-badguy', cropCanvas);
  }

  _processGrokPickupTexture() {
    if (this.textures.exists('grok-pickup')) return;
    const { cropCanvas } = this._stripAndCrop(
      this.textures.get('grok-pickup-raw').getSourceImage(), 220, true);
    this.textures.addCanvas('grok-pickup', cropCanvas);
  }

  _processLiqPickupTexture() {
    if (this.textures.exists('liq-pickup')) return;
    const { cropCanvas } = this._stripAndCrop(
      this.textures.get('liq-pickup-raw').getSourceImage(), 235, false);
    this.textures.addCanvas('liq-pickup', cropCanvas);
  }

  _processCappedCanTexture() {
    if (this.textures.exists('capped-can')) {
      const s = this.textures.get('capped-can').getSourceImage();
      this._cappedCanAspect = s.width / s.height;
      return;
    }
    const { cropCanvas, aspect } = this._stripAndCrop(
      this.textures.get('capped-can-raw').getSourceImage(), 235, false);
    this._cappedCanAspect = aspect;
    this.textures.addCanvas('capped-can', cropCanvas);
  }

  _stripAndCrop(src, threshold, whiten) {
    const W = src.width, H = src.height;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(src, 0, 0);
    const imgData = ctx.getImageData(0, 0, W, H);
    const d = imgData.data;

    // BFS flood-fill from edges → transparent
    const visited = new Uint8Array(W * H);
    const qX = new Int16Array(W * H), qY = new Int16Array(W * H);
    let head = 0, tail = 0;
    const enqueue = (x, y) => {
      if (x < 0 || x >= W || y < 0 || y >= H) return;
      const pi = y * W + x; if (visited[pi]) return;
      const di = pi * 4;
      if (d[di] > threshold && d[di+1] > threshold && d[di+2] > threshold) {
        visited[pi] = 1; qX[tail] = x; qY[tail] = y; tail++;
      }
    };
    for (let x = 0; x < W; x++) { enqueue(x, 0); enqueue(x, H-1); }
    for (let y = 0; y < H; y++) { enqueue(0, y); enqueue(W-1, y); }
    while (head < tail) {
      const x = qX[head], y = qY[head]; head++;
      d[(y * W + x) * 4 + 3] = 0;
      enqueue(x+1,y); enqueue(x-1,y); enqueue(x,y+1); enqueue(x,y-1);
    }

    // Border-erosion: remove gray/off-white fringe pixels adjacent to transparent areas
    // (JPEG compression leaves slightly-below-threshold anti-aliasing along the edge)
    const fringe = new Uint8Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const pi = y * W + x;
      if (d[pi * 4 + 3] === 0) continue;          // already transparent
      const r = d[pi*4], g = d[pi*4+1], b = d[pi*4+2];
      if (r < 160 && g < 160 && b < 160) continue; // dark — keep it
      // bright pixel: check if any neighbour is transparent
      const nbrs = [[x-1,y],[x+1,y],[x,y-1],[x,y+1]];
      if (nbrs.some(([nx,ny]) =>
          nx>=0 && nx<W && ny>=0 && ny<H && d[(ny*W+nx)*4+3] === 0))
        fringe[pi] = 1;
    }
    for (let pi = 0; pi < W*H; pi++) if (fringe[pi]) d[pi*4+3] = 0;

    if (whiten) {
      for (let i = 0; i < d.length; i += 4)
        if (d[i+3] > 0) { d[i] = 255; d[i+1] = 255; d[i+2] = 255; }
    }

    ctx.putImageData(imgData, 0, 0);

    // Crop to bounding box
    let minX = W, maxX = 0, minY = H, maxY = 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (d[(y*W+x)*4+3] > 0) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
    const pad = 3;
    minX = Math.max(0, minX-pad); minY = Math.max(0, minY-pad);
    maxX = Math.min(W-1, maxX+pad); maxY = Math.min(H-1, maxY+pad);
    const cW = maxX-minX+1, cH = maxY-minY+1;
    const crop = document.createElement('canvas');
    crop.width = cW; crop.height = cH;
    crop.getContext('2d').drawImage(canvas, minX, minY, cW, cH, 0, 0, cW, cH);
    return { cropCanvas:crop, aspect:cW/cH };
  }
}

// ─── Config ───────────────────────────────────────────────────────────────────

const config = {
  type:            Phaser.AUTO,
  width:           GAME_WIDTH,
  height:          GAME_HEIGHT,
  backgroundColor: '#060010',
  pixelArt:        true,
  antialias:       false,
  physics: { default:'arcade', arcade:{ gravity:{ y:1050 }, debug:false } },
  scale:  { mode:Phaser.Scale.FIT, autoCenter:Phaser.Scale.CENTER_BOTH },
  scene:  [GameScene],
};

new Phaser.Game(config);
