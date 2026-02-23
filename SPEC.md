# Monster Ultra Cyber Dash — Game Specification

**Genre:** Endless side-scroller / pipe-jump (Flappy Bird style)
**Engine:** Phaser.js (v3)
**Platform:** Browser (index.html, no server required)
**Resolution:** 480 × 854 (portrait, mobile-first)
**Color Palette:** Black, white, neon cyan (#00FFFF), neon purple (#CC00FF)

---

## Concept

You play as a White Monster Ultra energy drink can flying through a neon cyberpunk city. Tap or click to boost upward against gravity. Dodge stacks of neon city billboards and monitors. Collect glowing swirl tokens for bonus points. The city speeds up the longer you survive.

---

## Core Mechanics

| Mechanic | Detail |
|---|---|
| Input | Single tap / spacebar / click — applies upward velocity impulse |
| Gravity | Constant downward pull, can falls if no input |
| Obstacles | Pairs of neon building stacks (top + bottom) with a gap in the middle, spawn from right, scroll left |
| Gap | Fixed width gap, slightly randomized vertical position each pair |
| Score | +1 per obstacle pair cleared, +5 per coin collected |
| Difficulty | Scroll speed increases every 10 points |
| Death | Touching any obstacle or screen edge (top/bottom) triggers game over |

---

## Asset Map

All paths are relative to `/Users/masongray1111/Desktop/game/`

### Player
| Asset | Path |
|---|---|
| White Monster can (main character) | `image.jpg` |

### Background (parallax, 3 layers)
| Layer | Path | Scroll Speed |
|---|---|---|
| Far back sky | `Legacy Collection/Assets/Environments/Synth City/Version 2/Layers/back.png` | 0.2x |
| Mid buildings | `Legacy Collection/Assets/Environments/Synth City/Version 2/Layers/middle.png` | 0.5x |
| Foreground | `Legacy Collection/Assets/Environments/Synth City/Version 2/Layers/foreground-empty.png` | 1.0x |

### Obstacles (neon city stacks — used as pipes)
| Asset | Path | Usage |
|---|---|---|
| Neon banner anim frame 1 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/banner-neon/banner-neon-1.png` | Top/bottom obstacle body |
| Neon banner anim frame 2 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/banner-neon/banner-neon-2.png` | |
| Neon banner anim frame 3 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/banner-neon/banner-neon-3.png` | |
| Neon banner anim frame 4 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/banner-neon/banner-neon-4.png` | |
| Monitor face 1 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/monitorface/monitor-face-1.png` | Cap at top/bottom of obstacle stack |
| Monitor face 2 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/monitorface/monitor-face-2.png` | |
| Monitor face 3 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/monitorface/monitor-face-3.png` | |
| Monitor face 4 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/monitorface/monitor-face-4.png` | |
| Control box 1 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/control-box-1.png` | Decoration on obstacles |
| Control box 2 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/control-box-2.png` | |
| Control box 3 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/ENVIRONMENT/props/control-box-3.png` | |

### Collectible Coin
| Asset | Path |
|---|---|
| Swirl token (transparent bg) | `image-3.jpg` |

### Death / Collision Effects
| Asset | Path | Frames |
|---|---|---|
| Orange splatter burst | `image-1.jpg` | Single frame, scale up on death |
| Electro-shock frame 1 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/electro-shock/_0000_Layer-1.png` | 9-frame anim on collision |
| Electro-shock frame 2 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/electro-shock/_0001_Layer-2.png` | |
| Electro-shock frame 3 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/electro-shock/_0002_Layer-3.png` | |
| Electro-shock frame 4 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/electro-shock/_0003_Layer-4.png` | |
| Electro-shock frame 5 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/electro-shock/_0004_Layer-5.png` | |
| Electro-shock frame 6 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/electro-shock/_0005_Layer-6.png` | |
| Electro-shock frame 7 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/electro-shock/_0006_Layer-7.png` | |
| Electro-shock frame 8 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/electro-shock/_0007_Layer-8.png` | |
| Electro-shock frame 9 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/electro-shock/_0008_Layer-9.png` | |
| Explosion-a spritesheet | `Legacy Collection/Assets/Misc/Explosions pack/explosion-1-a/spritesheet.png` | 8 frames, death screen |

### Coin Collect Effects
| Asset | Path | Frames |
|---|---|---|
| Energy smack frame 1 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/energy-smack/_0000_Layer-1.png` | 8-frame burst on coin pickup |
| Energy smack frame 2 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/energy-smack/_0001_Layer-2.png` | |
| Energy smack frame 3 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/energy-smack/_0002_Layer-3.png` | |
| Energy smack frame 4 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/energy-smack/_0003_Layer-4.png` | |
| Energy smack frame 5 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/energy-smack/_0004_Layer-5.png` | |
| Energy smack frame 6 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/energy-smack/_0005_Layer-6.png` | |
| Energy smack frame 7 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/energy-smack/_0006_Layer-7.png` | |
| Energy smack frame 8 | `Legacy Collection/Assets/Misc/Grotto-escape-2-FX/sprites/energy-smack/_0007_Layer-8.png` | |

### Milestone 3 — Background Upgrade (Miami Synth)
| Layer | Path |
|---|---|
| Sky / sun | `Legacy Collection/Assets/Packs/Miami-synth-files/Layers/back.png` |
| Buildings | `Legacy Collection/Assets/Packs/Miami-synth-files/Layers/buildings.png` |
| Highway | `Legacy Collection/Assets/Packs/Miami-synth-files/Layers/highway.png` |
| Palm trees | `Legacy Collection/Assets/Packs/Miami-synth-files/Layers/palms.png` |

### Milestone 3 — Drone Enemy
| Asset | Path | Frames |
|---|---|---|
| Drone frame 1 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/SPRITES/misc/drone/drone-1.png` | 4-frame loop, flies across screen |
| Drone frame 2 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/SPRITES/misc/drone/drone-2.png` | |
| Drone frame 3 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/SPRITES/misc/drone/drone-3.png` | |
| Drone frame 4 | `Legacy Collection/Assets/Packs/Warped City/V1/warped city files/SPRITES/misc/drone/drone-4.png` | |
| Enemy explosion | `Legacy Collection/Assets/Packs/Warped City/V2/Sprites/explosion-a.png` | On drone hit |

---

## Milestones

---

### Milestone 1 — Core Loop (Playable)

**Goal:** A working, playable game with the essential loop. Should feel like Flappy Bird in the cyberpunk skin.

**Deliverables:**

- [ ] `index.html` — loads Phaser 3 from CDN
- [ ] `game.js` — single file, all logic
- [ ] Phaser game boots at 480×854, black background
- [ ] **Player:** Monster can rendered from `image.jpg`, physics-based gravity, tap/space/click applies upward impulse
- [ ] **Background:** 3-layer parallax scroll using Synth City Version 2 layers (back, middle, foreground-empty) at different speeds
- [ ] **Obstacles:** Pairs of neon banner stacks (banner-neon frames tiled vertically), randomized gap Y position, spawn every ~1.8 seconds, scroll left at base speed
- [ ] Monitor face caps at the inner edges of each obstacle pair (visual pipe cap)
- [ ] **Scoring:** Score counter top-center, +1 per pair cleared
- [ ] **Death:** Collision with obstacle or screen bounds → game freezes → "GAME OVER" text + current score → tap to restart
- [ ] **Difficulty:** Every 10 points, obstacle scroll speed increases by 10%

**Assets used this milestone:**
- `image.jpg` (player)
- Synth City V2: `back.png`, `middle.png`, `foreground-empty.png`
- Warped City V1: `banner-neon-1/2/3/4.png`, `monitor-face-1.png`

**Playable checkpoint:** Open `index.html` in browser, can plays indefinitely, dies on collision, restarts on tap.

---

### Milestone 2 — Juice & Collectibles (Playable)

**Goal:** Add visual flair, coins, and collision effects so it feels satisfying to play and die.

**Deliverables:**

- [ ] **Coin collectibles:** `image-3.jpg` swirl token spawns randomly in the gap between each obstacle pair (50% chance), gentle bob animation (Phaser tween), collecting plays energy-smack effect and awards +5 points
- [ ] **Coin collect FX:** energy-smack 8-frame animation plays at coin position on pickup
- [ ] **Collision FX:** electro-shock 9-frame animation plays at can position on death
- [ ] **Death splatter:** `image-1.jpg` scales up and fades out over 0.5s on death
- [ ] **Screen shake:** 200ms camera shake on death
- [ ] **Can tilt:** Can sprite rotates slightly upward on tap, falls back down as gravity pulls — makes it feel alive
- [ ] **Obstacle animation:** cycle through banner-neon-1/2/3/4 frames at ~4fps on the obstacle stacks
- [ ] **Score pop:** Score number briefly scales up (+20%) each time it increments
- [ ] **Speed flash:** Brief cyan screen flash when difficulty speed increases
- [ ] All obstacle pairs randomly choose between banner-neon and banner-big as the body style for variety

**Assets added this milestone:**
- `image-3.jpg` (coin)
- `image-1.jpg` (death splatter)
- Grotto FX: all 9 electro-shock frames, all 8 energy-smack frames
- Warped City V1: `banner-big-1/2/3/4.png`, `control-box-1/2/3.png`

**Playable checkpoint:** Full game loop with coins, screen shake on death, animated obstacles.

---

### Milestone 3 — Full Release (Polished & Playable)

**Goal:** Start screen, high score, background variety, drone hazard, and mobile polish.

**Deliverables:**

- [ ] **Start screen:** Black screen with `image.jpg` can centered, "MONSTER ULTRA CYBER DASH" title in neon cyan pixel font, "TAP TO START" blinking text
- [ ] **High score:** Stored in `localStorage`, shown on game over screen alongside current score
- [ ] **Background swap:** At score 30, background seamlessly transitions from Synth City to Miami Synth (all 4 Miami layers with parallax) — signals entering "hard mode"
- [ ] **Drone enemy:** Starting at score 20, drone (4-frame animation) spawns from right edge and flies across screen at a random Y in the playable zone, not tied to obstacle gaps — touching it kills the player, explosion-a plays on contact
- [ ] **Warped City background layer:** Add Warped City V2 `back.png` as an additional far layer behind Synth City for extra depth
- [ ] **Mobile touch:** Full touch event support, no double-tap zoom, viewport meta tag locked
- [ ] **Game over explosion:** explosion-1-a 8-frame spritesheet plays at can position on death (in addition to electro-shock)
- [ ] **Neon UI polish:** Score text uses a neon glow CSS/canvas shadow, game over panel has a dark semi-transparent rounded rect behind it
- [ ] **Obstacle variety:** At score 20+, some obstacle pairs include a `control-box` prop decorating the side of the stack

**Assets added this milestone:**
- Miami Synth: `back.png`, `buildings.png`, `highway.png`, `palms.png`
- Warped City V2: `Environmet/background/back.png`
- Warped City V1 drones: `drone-1/2/3/4.png`
- Warped City V2: `Sprites/explosion-a.png`
- Explosions pack: `explosion-1-a/spritesheet.png`

**Playable checkpoint:** Complete game — start screen, high score, dual background zones, drones, mobile ready.

---

## File Structure (End State)

```
/game/
├── index.html
├── game.js
├── image.jpg               ← Monster can player
├── image-1.jpg             ← Death splatter
├── image-2.jpg             ← (unused, reference)
├── image-3.jpg             ← Swirl coin
├── SPEC.md
└── Legacy Collection/
    └── Assets/
        ├── Environments/Synth City/Version 2/Layers/
        ├── Packs/Miami-synth-files/Layers/
        ├── Packs/Warped City/V1/warped city files/ENVIRONMENT/props/
        ├── Packs/Warped City/V1/warped city files/SPRITES/misc/drone/
        ├── Packs/Warped City/V2/Environmet/background/
        ├── Packs/Warped City/V2/Sprites/
        └── Misc/
            ├── Grotto-escape-2-FX/sprites/electro-shock/
            ├── Grotto-escape-2-FX/sprites/energy-smack/
            └── Explosions pack/explosion-1-a/
```

---

## Out of Scope

- No audio (WAV/OGG files exist in collection but not included — can be added post-M3)
- No leaderboard / backend
- No levels beyond speed scaling
- No power-ups beyond the coin score bonus
