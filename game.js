const TOTAL_SPRITES = 126;

const FIRST_SPRITE_ID = 76;
const LAST_SPRITE_ID = FIRST_SPRITE_ID + TOTAL_SPRITES - 1;
const PARTICIPANT_COUNT = 5;
const SPAWN_INTERVAL_MS = 520;
const BALL_RADIUS = 31;
const DESIGN_WIDTH = 430;
const DESIGN_HEIGHT = 932;
const SPAWN_X_CENTER = DESIGN_WIDTH / 2;
const SPAWN_X_RANGE = 132;
const MAX_BALLS = 120;
const WALL_THICKNESS = 42;
const CONNECT_DISTANCE = BALL_RADIUS * 3.25;
const HUD_TOP = 54;
const BOTTOM_SAFE_Y = DESIGN_HEIGHT - BALL_RADIUS - 10;

const BOTTLE = {
  leftNeckTop: { x: 132, y: 96 },
  rightNeckTop: { x: 298, y: 96 },
  leftMouth: { x: 82, y: 210 },
  rightMouth: { x: 348, y: 210 },
  leftShoulder: { x: 34, y: 318 },
  rightShoulder: { x: 396, y: 318 },
  leftLowerSide: { x: 18, y: 806 },
  rightLowerSide: { x: 412, y: 806 },
  leftHeel: { x: 44, y: 868 },
  rightHeel: { x: 386, y: 868 },
  leftFloor: { x: 98, y: BOTTOM_SAFE_Y },
  rightFloor: { x: 332, y: BOTTOM_SAFE_Y },
};

const {
  Engine,
  Runner,
  Bodies,
  Body,
  Composite,
  Events,
  Query,
} = Matter;

let app;
let engine;
let runner;
let bottleParts = [];
let balls = [];
let textures = [];
let selectedSpriteIds = [];
let lineGlow;
let lineCore;
let particleLayer;
let scoreText;
let popSound;
let selectedBalls = [];
let selectedBodyIds = new Set();
let particles = [];
let spawnTimer = 0;
let lastTimestamp = 0;
let gameStarted = false;
let isDragging = false;
let lastPointerPosition = null;
let dragPointerPosition = null;
let score = 0;
let audioUnlocked = false;
let wakeLock = null;
let audioContext = null;
let popBuffer = null;
let keepAwakeVideo = null;

const loadingEl = document.getElementById("loading");
const gameRoot = document.getElementById("game-root");

function shuffle(values) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickRoundSprites() {
  const ids = [];
  for (let id = FIRST_SPRITE_ID; id <= LAST_SPRITE_ID; id += 1) {
    ids.push(id);
  }

  if (ids.length < PARTICIPANT_COUNT) {
    throw new Error(`TOTAL_SPRITES must be at least ${PARTICIPANT_COUNT}.`);
  }

  return shuffle(ids).slice(0, PARTICIPANT_COUNT);
}

async function createPixiApp() {
  if (PIXI.Application.prototype.init) {
    app = new PIXI.Application();
    await app.init({
      width: DESIGN_WIDTH,
      height: DESIGN_HEIGHT,
      antialias: true,
      backgroundAlpha: 0,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
    });
  } else {
    app = new PIXI.Application({
      width: DESIGN_WIDTH,
      height: DESIGN_HEIGHT,
      antialias: true,
      backgroundAlpha: 0,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
    });
  }

  gameRoot.appendChild(app.canvas || app.view);
  app.stage.sortableChildren = true;
  resizeGame();
  window.addEventListener("resize", resizeGame);
}

function resizeGame() {
  const view = app.canvas || app.view;
  const viewportRatio = window.innerWidth / window.innerHeight;
  const gameRatio = DESIGN_WIDTH / DESIGN_HEIGHT;

  if (viewportRatio > gameRatio) {
    view.style.height = "100vh";
    view.style.width = `${100 * gameRatio}vh`;
  } else {
    view.style.width = "100vw";
    view.style.height = `${100 / gameRatio}vw`;
  }
}

function drawBackground() {
  const bg = new PIXI.Graphics();
  bg.beginFill(0x162030);
  bg.drawRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  bg.endFill();

  bg.beginFill(0x24324a, 0.82);
  bg.drawRoundedRect(18, 18, DESIGN_WIDTH - 36, DESIGN_HEIGHT - 36, 26);
  bg.endFill();

  bg.beginFill(0xffd677, 0.18);
  bg.drawCircle(86, 118, 116);
  bg.endFill();

  bg.beginFill(0x65d7ff, 0.12);
  bg.drawCircle(348, 202, 92);
  bg.endFill();

  bg.zIndex = 0;
  app.stage.addChild(bg);
}

function drawBottle() {
  const bottle = new PIXI.Graphics();

  bottle.lineStyle(5, 0xeaf8ff, 0.55);
  bottle.beginFill(0xc7efff, 0.12);
  bottle.moveTo(BOTTLE.leftNeckTop.x, BOTTLE.leftNeckTop.y);
  bottle.lineTo(BOTTLE.leftMouth.x, BOTTLE.leftMouth.y);
  bottle.quadraticCurveTo(100, 270, BOTTLE.leftShoulder.x, BOTTLE.leftShoulder.y);
  bottle.lineTo(BOTTLE.leftLowerSide.x, BOTTLE.leftLowerSide.y);
  bottle.quadraticCurveTo(BOTTLE.leftHeel.x, BOTTLE.leftHeel.y, BOTTLE.leftFloor.x, BOTTLE.leftFloor.y);
  bottle.lineTo(BOTTLE.rightFloor.x, BOTTLE.rightFloor.y);
  bottle.quadraticCurveTo(BOTTLE.rightHeel.x, BOTTLE.rightHeel.y, BOTTLE.rightLowerSide.x, BOTTLE.rightLowerSide.y);
  bottle.lineTo(BOTTLE.rightShoulder.x, BOTTLE.rightShoulder.y);
  bottle.quadraticCurveTo(330, 270, BOTTLE.rightMouth.x, BOTTLE.rightMouth.y);
  bottle.lineTo(BOTTLE.rightNeckTop.x, BOTTLE.rightNeckTop.y);
  bottle.moveTo(BOTTLE.leftNeckTop.x, BOTTLE.leftNeckTop.y);
  bottle.lineTo(BOTTLE.rightNeckTop.x, BOTTLE.rightNeckTop.y);
  bottle.endFill();

  bottle.lineStyle(2, 0xffffff, 0.28);
  bottle.moveTo(BOTTLE.leftNeckTop.x + 10, BOTTLE.leftNeckTop.y + 12);
  bottle.lineTo(BOTTLE.leftMouth.x + 10, BOTTLE.leftMouth.y - 14);
  bottle.moveTo(BOTTLE.rightNeckTop.x - 10, BOTTLE.rightNeckTop.y + 12);
  bottle.lineTo(BOTTLE.rightMouth.x - 10, BOTTLE.rightMouth.y - 14);
  bottle.moveTo(114, 292);
  bottle.quadraticCurveTo(62, 486, 84, 808);
  bottle.moveTo(316, 344);
  bottle.quadraticCurveTo(380, 548, 346, 824);

  bottle.zIndex = 2;
  app.stage.addChild(bottle);
}

function wallFromSegment(start, end, thickness = WALL_THICKNESS) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);
  return Bodies.rectangle(
    start.x + dx / 2,
    start.y + dy / 2,
    length + thickness,
    thickness,
    {
      isStatic: true,
      angle,
      restitution: 0.2,
      friction: 0.92,
      render: { visible: false },
    },
  );
}

function createBottlePhysics() {
  bottleParts = [
    wallFromSegment(BOTTLE.leftNeckTop, BOTTLE.rightNeckTop),
    wallFromSegment(BOTTLE.leftNeckTop, BOTTLE.leftMouth),
    wallFromSegment(BOTTLE.leftMouth, BOTTLE.leftShoulder),
    wallFromSegment(BOTTLE.leftShoulder, BOTTLE.leftLowerSide),
    wallFromSegment(BOTTLE.leftLowerSide, BOTTLE.leftHeel),
    wallFromSegment(BOTTLE.leftHeel, BOTTLE.leftFloor),
    wallFromSegment(BOTTLE.leftFloor, BOTTLE.rightFloor),
    wallFromSegment(BOTTLE.rightFloor, BOTTLE.rightHeel),
    wallFromSegment(BOTTLE.rightHeel, BOTTLE.rightLowerSide),
    wallFromSegment(BOTTLE.rightLowerSide, BOTTLE.rightShoulder),
    wallFromSegment(BOTTLE.rightShoulder, BOTTLE.rightMouth),
    wallFromSegment(BOTTLE.rightMouth, BOTTLE.rightNeckTop),
  ];
  Composite.add(engine.world, bottleParts);
}

async function loadRoundTextures() {
  selectedSpriteIds = pickRoundSprites();
  const paths = selectedSpriteIds.map((id) => `assets/${id}.png`);

  if (PIXI.Assets && PIXI.Assets.load) {
    const loadedTextures = await Promise.all(paths.map((path) => PIXI.Assets.load(path)));
    textures = selectedSpriteIds.map((id, index) => ({
      id,
      texture: loadedTextures[index],
    }));
    return;
  }

  textures = await new Promise((resolve, reject) => {
    const loader = new PIXI.Loader();
    paths.forEach((path) => loader.add(path, path));
    loader.load((_, resources) => {
      const loadedTextures = paths.map((path) => resources[path]?.texture).filter(Boolean);
      if (loadedTextures.length !== paths.length) {
        reject(new Error("Some assets failed to load."));
        return;
      }
      resolve(selectedSpriteIds.map((id, index) => ({
        id,
        texture: loadedTextures[index],
      })));
    });
    loader.onError.add((error) => reject(error));
  });
}

function makeCircularSprite(texture) {
  const sprite = new PIXI.Sprite(texture);
  sprite.anchor.set(0.5);
  sprite.width = BALL_RADIUS * 2;
  sprite.height = BALL_RADIUS * 2;

  const mask = new PIXI.Graphics();
  mask.beginFill(0xffffff);
  mask.drawCircle(0, 0, BALL_RADIUS);
  mask.endFill();

  const container = new PIXI.Container();
  container.addChild(sprite);
  container.addChild(mask);
  sprite.mask = mask;
  return container;
}

function spawnBall() {
  if (!gameStarted || textures.length === 0 || balls.length >= MAX_BALLS) {
    return;
  }

  const x = SPAWN_X_CENTER + (Math.random() - 0.5) * SPAWN_X_RANGE;
  const y = 134 + Math.random() * 8;
  const textureEntry = textures[Math.floor(Math.random() * textures.length)];
  const body = Bodies.circle(x, y, BALL_RADIUS, {
    restitution: 0.2,
    friction: 0.74,
    frictionAir: 0.012,
    density: 0.0012,
  });

  Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);
  Composite.add(engine.world, body);

  const view = makeCircularSprite(textureEntry.texture);
  view.zIndex = 3;
  app.stage.addChild(view);
  balls.push({ body, view, spriteId: textureEntry.id });
}

function isOutsideBottleSafetyZone(body) {
  const { x, y } = body.position;
  if (y < BOTTLE.leftNeckTop.y + BALL_RADIUS) {
    return true;
  }

  if (x < 4 || x > DESIGN_WIDTH - 4 || y > DESIGN_HEIGHT + BALL_RADIUS) {
    return true;
  }

  if (y < 246) {
    return x < BOTTLE.leftNeckTop.x + BALL_RADIUS || x > BOTTLE.rightNeckTop.x - BALL_RADIUS;
  }

  return false;
}

function returnEscapedBall(body) {
  Body.setPosition(body, {
    x: SPAWN_X_CENTER + (Math.random() - 0.5) * 12,
    y: 142,
  });
  Body.setVelocity(body, { x: 0, y: 0 });
  Body.setAngularVelocity(body, 0);
}

function vibrate(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

function triggerHaptic(pattern = 18) {
  vibrate(pattern);

  const haptics = window.Capacitor?.Plugins?.Haptics;
  if (haptics?.impact) {
    haptics.impact({ style: "medium" }).catch(() => {});
  }
}

async function requestWakeLock() {
  if (!("wakeLock" in navigator) || wakeLock) {
    return;
  }

  try {
    wakeLock = await navigator.wakeLock.request("screen");
    wakeLock.addEventListener("release", () => {
      wakeLock = null;
    });
  } catch (_) {
    wakeLock = null;
  }
}

function setupWakeLock() {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      requestWakeLock();
      playKeepAwakeVideo();
    }
  });
}

async function ensureAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  return audioContext;
}

async function loadPopBuffer() {
  const context = await ensureAudioContext();
  if (!context || popBuffer) {
    return;
  }

  const response = await fetch("pop_bomb.wav", { cache: "force-cache" });
  const arrayBuffer = await response.arrayBuffer();
  popBuffer = await context.decodeAudioData(arrayBuffer);
}

function playKeepAwakeVideo() {
  if (!keepAwakeVideo) {
    return;
  }

  keepAwakeVideo.play().catch(() => {});
}

function setupKeepAwakeVideo() {
  if (!HTMLCanvasElement.prototype.captureStream) {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 2;
  const context = canvas.getContext("2d");
  context.fillStyle = "#000";
  context.fillRect(0, 0, 2, 2);

  keepAwakeVideo = document.createElement("video");
  keepAwakeVideo.muted = true;
  keepAwakeVideo.loop = true;
  keepAwakeVideo.playsInline = true;
  keepAwakeVideo.setAttribute("playsinline", "");
  keepAwakeVideo.style.position = "fixed";
  keepAwakeVideo.style.width = "1px";
  keepAwakeVideo.style.height = "1px";
  keepAwakeVideo.style.opacity = "0";
  keepAwakeVideo.style.pointerEvents = "none";
  keepAwakeVideo.srcObject = canvas.captureStream(1);
  document.body.appendChild(keepAwakeVideo);
}

async function unlockAudio() {
  if (audioUnlocked) {
    return;
  }

  try {
    await loadPopBuffer();
    audioUnlocked = true;
    return;
  } catch (_) {
    audioUnlocked = false;
  }

  if (popSound) {
    const previousVolume = popSound.volume;
    popSound.volume = 0;
    popSound.currentTime = 0;
    popSound
      .play()
      .then(() => {
        popSound.pause();
        popSound.currentTime = 0;
        popSound.volume = previousVolume;
        audioUnlocked = true;
      })
      .catch(() => {
        popSound.volume = previousVolume;
      });
  }
}

function activateMobileSession() {
  unlockAudio();
  requestWakeLock();
  playKeepAwakeVideo();
}

function getPointerPosition(event) {
  return {
    x: event.global.x,
    y: event.global.y,
  };
}

function distanceToSegmentSquared(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSq = dx * dx + dy * dy;

  if (lengthSq === 0) {
    const px = point.x - start.x;
    const py = point.y - start.y;
    return px * px + py * py;
  }

  const t = Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSq));
  const closestX = start.x + t * dx;
  const closestY = start.y + t * dy;
  const px = point.x - closestX;
  const py = point.y - closestY;
  return px * px + py * py;
}

function getBallByBody(body) {
  return balls.find((ball) => ball.body === body);
}

function findNearestTouchedBall(point) {
  let nearest = null;
  let nearestDistanceSq = (BALL_RADIUS * 1.65) ** 2;

  for (const ball of balls) {
    const dx = ball.body.position.x - point.x;
    const dy = ball.body.position.y - point.y;
    const distanceSq = dx * dx + dy * dy;
    if (distanceSq < nearestDistanceSq) {
      nearest = ball;
      nearestDistanceSq = distanceSq;
    }
  }

  return nearest;
}

function findTouchedBalls(start, end) {
  const bodies = balls.map((ball) => ball.body);
  const bodyIds = new Set();
  const touched = [];

  const collisions = Query.ray(bodies, start, end, BALL_RADIUS * 1.8);
  for (const collision of collisions) {
    const body = balls.some((ball) => ball.body === collision.bodyA) ? collision.bodyA : collision.bodyB;
    const ball = getBallByBody(body);
    if (ball && !bodyIds.has(ball.body.id)) {
      bodyIds.add(ball.body.id);
      touched.push(ball);
    }
  }

  const radiusSq = (BALL_RADIUS * 1.75) ** 2;
  for (const ball of balls) {
    if (bodyIds.has(ball.body.id)) {
      continue;
    }

    const point = ball.body.position;
    if (distanceToSegmentSquared(point, start, end) <= radiusSq) {
      bodyIds.add(ball.body.id);
      touched.push(ball);
    }
  }

  touched.sort((a, b) => {
    const aDist = distanceToSegmentSquared(a.body.position, start, start);
    const bDist = distanceToSegmentSquared(b.body.position, start, start);
    return aDist - bDist;
  });
  return touched;
}

function canConnect(ball) {
  if (!ball || selectedBodyIds.has(ball.body.id)) {
    return false;
  }

  if (selectedBalls.length === 0) {
    return true;
  }

  const firstBall = selectedBalls[0];
  const lastBall = selectedBalls[selectedBalls.length - 1];
  const dx = lastBall.body.position.x - ball.body.position.x;
  const dy = lastBall.body.position.y - ball.body.position.y;
  const distance = Math.hypot(dx, dy);
  return firstBall.spriteId === ball.spriteId && distance <= CONNECT_DISTANCE;
}

function addSelectedBall(ball) {
  if (!canConnect(ball)) {
    return;
  }

  selectedBalls.push(ball);
  selectedBodyIds.add(ball.body.id);
  ball.view.scale.set(1.14);
  triggerHaptic(18);
  redrawConnectionLine();
}

function redrawConnectionLine() {
  lineGlow.clear();
  lineCore.clear();

  if (selectedBalls.length === 0) {
    return;
  }

  lineGlow.lineStyle({
    width: 22,
    color: 0xff5bd8,
    alpha: 0.34,
    cap: "round",
    join: "round",
  });
  lineCore.lineStyle({
    width: 9,
    color: 0xff4fd8,
    alpha: 0.96,
    cap: "round",
    join: "round",
  });

  const first = selectedBalls[0].body.position;
  lineGlow.moveTo(first.x, first.y);
  lineCore.moveTo(first.x, first.y);

  for (let i = 1; i < selectedBalls.length; i += 1) {
    const point = selectedBalls[i].body.position;
    lineGlow.lineTo(point.x, point.y);
    lineCore.lineTo(point.x, point.y);
  }

  if (isDragging && dragPointerPosition) {
    const last = selectedBalls[selectedBalls.length - 1].body.position;
    const dx = dragPointerPosition.x - last.x;
    const dy = dragPointerPosition.y - last.y;
    if (Math.hypot(dx, dy) > BALL_RADIUS * 0.55) {
      lineGlow.lineTo(dragPointerPosition.x, dragPointerPosition.y);
      lineCore.lineTo(dragPointerPosition.x, dragPointerPosition.y);
    }
  }
}

function clearSelection() {
  for (const ball of selectedBalls) {
    ball.view.scale.set(1);
  }

  selectedBalls = [];
  selectedBodyIds.clear();
  dragPointerPosition = null;
  lineGlow.clear();
  lineCore.clear();
}

function handlePointerDown(event) {
  if (!gameStarted) {
    return;
  }

  activateMobileSession();
  isDragging = true;
  clearSelection();
  const point = getPointerPosition(event);
  lastPointerPosition = point;
  dragPointerPosition = point;
  const touchedBalls = findTouchedBalls(point, point);
  if (touchedBalls.length === 0) {
    const nearest = findNearestTouchedBall(point);
    if (nearest) {
      touchedBalls.push(nearest);
    }
  }

  for (const ball of touchedBalls) {
    addSelectedBall(ball);
  }
  redrawConnectionLine();
}

function handlePointerMove(event) {
  if (!isDragging || !lastPointerPosition) {
    return;
  }

  const point = getPointerPosition(event);
  dragPointerPosition = point;
  for (const ball of findTouchedBalls(lastPointerPosition, point)) {
    addSelectedBall(ball);
  }
  lastPointerPosition = point;
  redrawConnectionLine();
}

function handlePointerUp() {
  if (!isDragging) {
    return;
  }

  isDragging = false;
  lastPointerPosition = null;
  dragPointerPosition = null;

  if (selectedBalls.length >= 2) {
    explodeSelectedBalls();
  } else {
    clearSelection();
  }
}

function playPopSound() {
  if (audioContext && popBuffer) {
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    source.buffer = popBuffer;
    gain.gain.value = 0.85;
    source.connect(gain);
    gain.connect(audioContext.destination);
    source.start(0);
    return;
  }

  if (!popSound) {
    return;
  }

  popSound.currentTime = 0;
  popSound.play().catch(() => {});
}

function makeStarParticle(x, y) {
  const star = new PIXI.Graphics();
  const points = [];
  const spikes = 5;
  const outer = 7 + Math.random() * 5;
  const inner = outer * 0.46;

  for (let i = 0; i < spikes * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (i * Math.PI) / spikes;
    points.push(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }

  star.beginFill(0xfff176, 0.98);
  star.drawPolygon(points);
  star.endFill();
  star.lineStyle(2, 0xffffff, 0.65);
  star.drawPolygon(points);
  star.position.set(x, y);
  particleLayer.addChild(star);

  const angle = Math.random() * Math.PI * 2;
  const speed = 2.2 + Math.random() * 3.8;
  particles.push({
    view: star,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    spin: (Math.random() - 0.5) * 0.26,
    life: 34 + Math.random() * 18,
    maxLife: 52,
  });
}

function burstParticles(x, y) {
  for (let i = 0; i < 15; i += 1) {
    makeStarParticle(x, y);
  }
}

function explodeSelectedBalls() {
  const removing = new Set(selectedBalls.map((ball) => ball.body.id));
  triggerHaptic([28, 24, 52]);
  playPopSound();

  for (const ball of selectedBalls) {
    burstParticles(ball.body.position.x, ball.body.position.y);
    Composite.remove(engine.world, ball.body);
    ball.view.destroy({ children: true });
  }

  balls = balls.filter((ball) => !removing.has(ball.body.id));
  score += removing.size * 100;
  updateScoreText();
  selectedBalls = [];
  selectedBodyIds.clear();
  dragPointerPosition = null;
  lineGlow.clear();
  lineCore.clear();
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const particle = particles[i];
    particle.life -= 1;
    particle.vy += 0.08;
    particle.view.x += particle.vx;
    particle.view.y += particle.vy;
    particle.view.rotation += particle.spin;
    particle.view.alpha = Math.max(0, particle.life / particle.maxLife);
    particle.view.scale.set(0.55 + particle.view.alpha * 0.7);

    if (particle.life <= 0) {
      particle.view.destroy();
      particles.splice(i, 1);
    }
  }
}

function clearParticles() {
  for (const particle of particles) {
    particle.view.destroy();
  }
  particles = [];
}

function createInteractionLayers() {
  lineGlow = new PIXI.Graphics();
  lineCore = new PIXI.Graphics();
  particleLayer = new PIXI.Container();

  lineGlow.zIndex = 8;
  lineCore.zIndex = 9;
  particleLayer.zIndex = 10;

  app.stage.addChild(lineGlow);
  app.stage.addChild(lineCore);
  app.stage.addChild(particleLayer);
}

function setupInput() {
  app.stage.eventMode = "static";
  app.stage.hitArea = new PIXI.Rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  app.stage.on("pointerdown", handlePointerDown);
  app.stage.on("pointermove", handlePointerMove);
  app.stage.on("pointerup", handlePointerUp);
  app.stage.on("pointerupoutside", handlePointerUp);
  app.stage.on("pointercancel", handlePointerUp);
}

function setupAudio() {
  popSound = new Audio("pop_bomb.wav");
  popSound.preload = "auto";
  popSound.volume = 0.72;
  popSound.load();
}

function syncSprites() {
  for (const ball of balls) {
    if (isOutsideBottleSafetyZone(ball.body)) {
      returnEscapedBall(ball.body);
    }
    ball.view.position.set(ball.body.position.x, ball.body.position.y);
    ball.view.rotation = ball.body.angle;
  }

  if (isDragging) {
    redrawConnectionLine();
  }
}

function clearBalls() {
  clearSelection();
  for (const ball of balls) {
    Composite.remove(engine.world, ball.body);
    ball.view.destroy({ children: true });
  }
  balls = [];
}

async function restartGame() {
  gameStarted = false;
  spawnTimer = 0;
  clearBalls();
  clearParticles();
  score = 0;
  updateScoreText();
  await loadRoundTextures();
  gameStarted = true;
}

function createHud() {
  const topBar = new PIXI.Graphics();
  topBar.beginFill(0x0b1118, 0.34);
  topBar.drawRoundedRect(18, HUD_TOP, DESIGN_WIDTH - 36, 58, 16);
  topBar.endFill();
  topBar.zIndex = 20;
  app.stage.addChild(topBar);

  const title = new PIXI.Text("TSUM DROP", {
    fill: 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 20,
    fontWeight: "700",
  });
  title.position.set(34, HUD_TOP + 15);
  title.zIndex = 21;
  app.stage.addChild(title);

  scoreText = new PIXI.Text("0", {
    fill: 0xfff176,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 20,
    fontWeight: "700",
  });
  scoreText.anchor.set(0.5, 0);
  scoreText.position.set(DESIGN_WIDTH / 2, HUD_TOP + 15);
  scoreText.zIndex = 21;
  app.stage.addChild(scoreText);

  const restart = new PIXI.Text("RESTART", {
    fill: 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 14,
    fontWeight: "700",
  });
  restart.anchor.set(1, 0);
  restart.position.set(DESIGN_WIDTH - 34, HUD_TOP + 20);
  restart.eventMode = "static";
  restart.cursor = "pointer";
  restart.zIndex = 21;
  restart.on("pointertap", () => {
    restartGame().catch(showFatalError);
  });
  app.stage.addChild(restart);
}

function updateScoreText() {
  if (scoreText) {
    scoreText.text = String(score);
  }
}

function startPhysics() {
  engine = Engine.create({
    gravity: { x: 0, y: 0.82, scale: 0.001 },
    positionIterations: 10,
    velocityIterations: 8,
    constraintIterations: 4,
  });
  runner = Runner.create();
  Runner.run(runner, engine);
  createBottlePhysics();

  Events.on(engine, "afterUpdate", syncSprites);
}

function startTicker() {
  app.ticker.add(() => {
    const now = performance.now();
    const delta = lastTimestamp === 0 ? 0 : now - lastTimestamp;
    lastTimestamp = now;
    spawnTimer += delta;

    while (spawnTimer >= SPAWN_INTERVAL_MS) {
      spawnBall();
      spawnTimer -= SPAWN_INTERVAL_MS;
    }

    updateParticles();
  });
}

function showFatalError(error) {
  console.error(error);
  if (loadingEl) {
    loadingEl.style.display = "block";
    loadingEl.textContent = error instanceof Error ? error.message : String(error);
  }
}

async function main() {
  await createPixiApp();
  setupAudio();
  setupWakeLock();
  setupKeepAwakeVideo();
  drawBackground();
  drawBottle();
  createInteractionLayers();
  createHud();
  setupInput();
  startPhysics();
  startTicker();
  await restartGame();

  if (loadingEl) {
    loadingEl.style.display = "none";
  }
}

main().catch(showFatalError);
