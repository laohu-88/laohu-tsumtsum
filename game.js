const TOTAL_SPRITES = 422;

const FIRST_SPRITE_ID = 1;
const LAST_SPRITE_ID = FIRST_SPRITE_ID + TOTAL_SPRITES - 1;
const PARTICIPANT_COUNT = 8;
const SPAWN_INTERVAL_MS = 880;
const BALL_RADIUS = 52;
const BODY_RADIUS = 43;
const DESIGN_WIDTH = 430;
const DESIGN_HEIGHT = 932;
const SPAWN_X_CENTER = DESIGN_WIDTH / 2;
const SPAWN_X_RANGE = 132;
const MAX_BALLS = 120;
const WALL_THICKNESS = 42;
const CONNECT_DISTANCE = BALL_RADIUS * 3.25;
const CONNECT_SOUND_PATH = "connect.wav?v=11";
const HUD_TOP = 54;
const BOTTOM_SAFE_Y = DESIGN_HEIGHT - BALL_RADIUS - 54;
const PROGRESS_STORAGE_KEY = "laohu-tsumtsum-level-progress-v1";

const LEVELS = [
  {
    id: 1,
    name: "第一关",
    subtitle: "红色松松训练",
    duration: 60,
    goals: { score: 500, targetClears: 10 },
    targetLabel: "红色",
    targetWeight: 0.3,
    background: { top: 0x1e9d8f, bottom: 0x143247, accent: 0xffd66e, glow: 0x8ff4ff },
    obstacles: [],
  },
  {
    id: 2,
    name: "第二关",
    subtitle: "45秒五连消",
    duration: 45,
    goals: { combo: 5 },
    targetWeight: 0.18,
    background: { top: 0x334a8f, bottom: 0x171c35, accent: 0xff8fb3, glow: 0x72f0ff },
    obstacles: [
      { type: "bumper", x: 130, y: 420, radius: 28 },
      { type: "bumper", x: 300, y: 508, radius: 30 },
      { type: "bar", x: 215, y: 628, width: 152, height: 18, angle: -0.18 },
    ],
  },
  {
    id: 3,
    name: "第三关",
    subtitle: "连击和红色双目标",
    duration: 70,
    goals: { score: 1200, combo: 6, targetClears: 12 },
    targetLabel: "红色",
    targetWeight: 0.34,
    background: { top: 0x5e3f9d, bottom: 0x1f1631, accent: 0xf8bd5b, glow: 0x9af59a },
    obstacles: [
      { type: "pin", x: 112, y: 390, radius: 18 },
      { type: "pin", x: 318, y: 390, radius: 18 },
      { type: "bumper", x: 215, y: 544, radius: 34 },
      { type: "bar", x: 140, y: 694, width: 126, height: 16, angle: 0.23 },
      { type: "bar", x: 290, y: 694, width: 126, height: 16, angle: -0.23 },
    ],
  },
  {
    id: 4,
    name: "第四关",
    subtitle: "窄路高分挑战",
    duration: 55,
    goals: { score: 1600, clears: 24 },
    targetWeight: 0.16,
    background: { top: 0x164f77, bottom: 0x111d24, accent: 0xfff176, glow: 0xff9f7a },
    obstacles: [
      { type: "bar", x: 152, y: 372, width: 132, height: 18, angle: 0.32 },
      { type: "bar", x: 278, y: 372, width: 132, height: 18, angle: -0.32 },
      { type: "bumper", x: 116, y: 568, radius: 26 },
      { type: "bumper", x: 314, y: 568, radius: 26 },
      { type: "pin", x: 215, y: 724, radius: 22 },
    ],
  },
  {
    id: 5,
    name: "第五关",
    subtitle: "最终瓶中派对",
    duration: 75,
    goals: { score: 2500, combo: 7, targetClears: 18 },
    targetLabel: "红色",
    targetWeight: 0.38,
    background: { top: 0x7a3047, bottom: 0x20121a, accent: 0x73f7cf, glow: 0xffd66e },
    obstacles: [
      { type: "bumper", x: 110, y: 386, radius: 27 },
      { type: "bumper", x: 320, y: 386, radius: 27 },
      { type: "pin", x: 215, y: 482, radius: 20 },
      { type: "bar", x: 150, y: 604, width: 132, height: 17, angle: -0.28 },
      { type: "bar", x: 280, y: 604, width: 132, height: 17, angle: 0.28 },
      { type: "bumper", x: 215, y: 752, radius: 30 },
    ],
  },
];

const BOTTLE = {
  leftNeckTop: { x: 132, y: 96 },
  rightNeckTop: { x: 298, y: 96 },
  leftMouth: { x: 82, y: 210 },
  rightMouth: { x: 348, y: 210 },
  leftShoulder: { x: 34, y: 318 },
  rightShoulder: { x: 396, y: 318 },
  leftLowerSide: { x: 18, y: 782 },
  rightLowerSide: { x: 412, y: 782 },
  leftHeel: { x: 44, y: 836 },
  rightHeel: { x: 386, y: 836 },
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
let lineNodes;
let particleLayer;
let scoreText;
let timeText;
let goalText;
let levelText;
let popSound;
let linkSound;
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
let linkBuffer = null;
let keepAwakeVideo = null;
let keepAwakeCanvas = null;
let keepAwakeTimer = null;
let feedbackShakeFrames = 0;
let feedbackShakeStrength = 0;
let audioPrimed = false;
let backgroundLayer;
let obstacleLayer;
let levelSelectContainer;
let resultOverlay;
let levelObstacleBodies = [];
let levelObstacleViews = [];
let unlockedLevel = 1;
let currentLevel = null;
let currentLevelTargetSpriteId = null;
let levelTimeLeftMs = 0;
let levelStats = {
  targetClears: 0,
  clears: 0,
  maxCombo: 0,
};

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

function loadProgress() {
  const saved = Number(window.localStorage.getItem(PROGRESS_STORAGE_KEY));
  if (Number.isFinite(saved) && saved >= 1) {
    unlockedLevel = Math.min(LEVELS.length, saved);
  }
}

function saveProgress(levelId) {
  unlockedLevel = Math.min(LEVELS.length, Math.max(unlockedLevel, levelId + 1));
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, String(unlockedLevel));
}

function formatTime(ms) {
  return `${Math.max(0, Math.ceil(ms / 1000))}s`;
}

function describeGoals(level) {
  const goals = [];
  if (level.goals.score) {
    goals.push(`${level.goals.score}分`);
  }
  if (level.goals.targetClears) {
    goals.push(`${level.targetLabel || "目标"}松松x${level.goals.targetClears}`);
  }
  if (level.goals.combo) {
    goals.push(`${level.goals.combo}连消`);
  }
  if (level.goals.clears) {
    goals.push(`消除${level.goals.clears}个`);
  }
  return goals.join(" / ");
}

function isLevelComplete() {
  if (!currentLevel) {
    return false;
  }

  const goals = currentLevel.goals;
  return (!goals.score || score >= goals.score)
    && (!goals.targetClears || levelStats.targetClears >= goals.targetClears)
    && (!goals.combo || levelStats.maxCombo >= goals.combo)
    && (!goals.clears || levelStats.clears >= goals.clears);
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
  if (backgroundLayer) {
    backgroundLayer.destroy({ children: true });
  }

  const theme = currentLevel?.background || LEVELS[0].background;
  backgroundLayer = new PIXI.Container();
  backgroundLayer.zIndex = 0;

  const bg = new PIXI.Graphics();
  bg.beginFill(theme.bottom);
  bg.drawRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  bg.endFill();

  bg.beginFill(theme.top, 0.82);
  bg.drawRoundedRect(18, 18, DESIGN_WIDTH - 36, DESIGN_HEIGHT - 36, 26);
  bg.endFill();

  bg.beginFill(theme.accent, 0.22);
  bg.drawCircle(86, 118, 116);
  bg.endFill();

  bg.beginFill(theme.glow, 0.16);
  bg.drawCircle(348, 202, 92);
  bg.endFill();

  bg.beginFill(0xffffff, 0.06);
  bg.drawCircle(220, 780, 196);
  bg.endFill();

  backgroundLayer.addChild(bg);
  app.stage.addChild(backgroundLayer);
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

function makeCircularSprite(texture, isTarget = false) {
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

  if (isTarget) {
    const ring = new PIXI.Graphics();
    ring.lineStyle(7, 0xff4b5f, 0.96);
    ring.drawCircle(0, 0, BALL_RADIUS - 4);
    ring.lineStyle(3, 0xffffff, 0.72);
    ring.drawCircle(0, 0, BALL_RADIUS - 12);
    container.addChild(ring);
  }

  return container;
}

function spawnBall() {
  if (!gameStarted || textures.length === 0 || balls.length >= MAX_BALLS) {
    return;
  }

  const x = SPAWN_X_CENTER + (Math.random() - 0.5) * SPAWN_X_RANGE;
  const y = 134 + Math.random() * 8;
  let textureEntry = textures[Math.floor(Math.random() * textures.length)];
  if (currentLevelTargetSpriteId && Math.random() < (currentLevel?.targetWeight || 0.2)) {
    textureEntry = textures.find((entry) => entry.id === currentLevelTargetSpriteId) || textureEntry;
  }
  const body = Bodies.circle(x, y, BODY_RADIUS, {
    restitution: 0.12,
    friction: 0.86,
    frictionAir: 0.034,
    density: 0.00145,
  });

  Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);
  Composite.add(engine.world, body);

  const view = makeCircularSprite(textureEntry.texture, textureEntry.id === currentLevelTargetSpriteId);
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
  triggerNativeHapticBridge(pattern);

  const haptics = window.Capacitor?.Plugins?.Haptics;
  if (haptics?.vibrate) {
    const duration = Array.isArray(pattern) ? Math.max(...pattern) : pattern;
    haptics.vibrate({ duration }).catch(() => {});
  }

  if (haptics?.impact) {
    haptics.impact({ style: "medium" }).catch(() => {});
  }

  const duration = Array.isArray(pattern) ? Math.max(...pattern) : pattern;
  triggerVisualShake(duration >= 40 ? 16 : 10, duration >= 40 ? 12 : 7);
}

function triggerNativeHapticBridge(pattern) {
  const duration = Array.isArray(pattern) ? Math.max(...pattern) : pattern;
  const payload = { pattern, duration };
  const messageHandlers = window.webkit?.messageHandlers;

  for (const name of ["haptics", "haptic", "hapticFeedback"]) {
    const handler = messageHandlers?.[name];
    if (handler?.postMessage) {
      try {
        handler.postMessage(payload);
      } catch (_) {}
    }
  }

  if (window.nativeHaptics?.impact) {
    try {
      window.nativeHaptics.impact(payload);
    } catch (_) {}
  }
}

function triggerVisualShake(frames, strength) {
  feedbackShakeFrames = Math.max(feedbackShakeFrames, frames);
  feedbackShakeStrength = Math.max(feedbackShakeStrength, strength);
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

  ensureAudioContextSync();

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  return audioContext;
}

function ensureAudioContextSync() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  return audioContext;
}

async function loadAudioBuffer(path) {
  const context = await ensureAudioContext();
  if (!context) {
    return null;
  }

  const response = await fetch(path, { cache: "force-cache" });
  const arrayBuffer = await response.arrayBuffer();
  return context.decodeAudioData(arrayBuffer);
}

async function loadSoundBuffers() {
  if (!linkBuffer) {
    linkBuffer = await loadAudioBuffer(CONNECT_SOUND_PATH);
  }

  if (!popBuffer) {
    popBuffer = await loadAudioBuffer("pop_bomb.wav");
  }
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

  keepAwakeCanvas = document.createElement("canvas");
  keepAwakeCanvas.width = 2;
  keepAwakeCanvas.height = 2;
  updateKeepAwakeFrame();

  keepAwakeVideo = document.createElement("video");
  keepAwakeVideo.muted = true;
  keepAwakeVideo.loop = true;
  keepAwakeVideo.playsInline = true;
  keepAwakeVideo.setAttribute("playsinline", "");
  keepAwakeVideo.style.position = "fixed";
  keepAwakeVideo.style.left = "-2px";
  keepAwakeVideo.style.top = "-2px";
  keepAwakeVideo.style.width = "1px";
  keepAwakeVideo.style.height = "1px";
  keepAwakeVideo.style.opacity = "0.001";
  keepAwakeVideo.style.pointerEvents = "none";
  keepAwakeVideo.srcObject = keepAwakeCanvas.captureStream(1);
  document.body.appendChild(keepAwakeVideo);

  keepAwakeTimer = window.setInterval(() => {
    updateKeepAwakeFrame();
    if (document.visibilityState === "visible") {
      requestWakeLock();
      playKeepAwakeVideo();
    }
  }, 12000);
}

function updateKeepAwakeFrame() {
  const context = keepAwakeCanvas?.getContext("2d");
  if (!context) {
    return;
  }

  const pulse = Math.floor(Date.now() / 1000) % 2;
  context.fillStyle = pulse ? "#10151c" : "#111820";
  context.fillRect(0, 0, 2, 2);
  context.fillStyle = pulse ? "#ffffff" : "#ffe680";
  context.fillRect(pulse, 0, 1, 1);
}

async function unlockAudio() {
  if (audioUnlocked) {
    return;
  }

  try {
    await ensureAudioContext();
    primeSyntheticAudio();
    loadSoundBuffers().catch(() => {});
    audioUnlocked = true;
    return;
  } catch (_) {
    audioUnlocked = false;
  }

  unlockHtmlAudio(linkSound);
  unlockHtmlAudio(popSound);
}

function primeSyntheticAudio() {
  if (audioPrimed || !audioContext) {
    return;
  }

  audioPrimed = playSyntheticPop(0.012, 240, 0.025);
}

function unlockHtmlAudio(sound) {
  if (!sound) {
    return;
  }

  const previousVolume = sound.volume;
  sound.volume = 0;
  sound.currentTime = 0;
  sound
    .play()
    .then(() => {
      sound.pause();
      sound.currentTime = 0;
      sound.volume = previousVolume;
      audioUnlocked = true;
    })
    .catch(() => {
      sound.volume = previousVolume;
    });
}

function activateMobileSession() {
  primeAudioFromGesture();
  requestWakeLock();
  playKeepAwakeVideo();
}

function primeAudioFromGesture() {
  const context = ensureAudioContextSync();
  if (!context) {
    unlockHtmlAudio(linkSound);
    unlockHtmlAudio(popSound);
    return;
  }

  const afterResume = () => {
    primeSyntheticAudio();
    loadSoundBuffers().catch(() => {});
    audioUnlocked = true;
  };

  if (context.state === "suspended") {
    context.resume().then(afterResume).catch(() => {
      audioUnlocked = false;
    });
    return;
  }

  afterResume();
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
  ball.view.scale.set(1.18);
  triggerBallShake(ball, selectedBalls.length === 1 ? 5 : 9);
  triggerHaptic(selectedBalls.length === 1 ? 34 : 54);
  playSelectSound();
  redrawConnectionLine();
}

function triggerBallShake(ball, strength) {
  if (!ball?.body) {
    return;
  }

  Body.setVelocity(ball.body, {
    x: ball.body.velocity.x + (Math.random() - 0.5) * strength * 0.35,
    y: ball.body.velocity.y - strength * 0.12,
  });
  Body.setAngularVelocity(ball.body, ball.body.angularVelocity + (Math.random() - 0.5) * 0.18);
}

function redrawConnectionLine() {
  lineGlow.clear();
  lineCore.clear();
  lineNodes.clear();

  if (selectedBalls.length === 0) {
    return;
  }

  lineGlow.lineStyle({
    width: 58,
    color: 0xffffff,
    alpha: 0.86,
    cap: "round",
    join: "round",
  });
  lineCore.lineStyle({
    width: 25,
    color: 0x08f7ff,
    alpha: 1,
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
    lineGlow.lineTo(dragPointerPosition.x, dragPointerPosition.y);
    lineCore.lineTo(dragPointerPosition.x, dragPointerPosition.y);
  }

  for (const ball of selectedBalls) {
    const point = ball.body.position;
    lineNodes.lineStyle(12, 0xffffff, 0.9);
    lineNodes.beginFill(0x08f7ff, 0.5);
    lineNodes.drawCircle(point.x, point.y, BALL_RADIUS * 0.9);
    lineNodes.endFill();
    lineNodes.lineStyle(5, 0xffff44, 1);
    lineNodes.drawCircle(point.x, point.y, BALL_RADIUS * 0.68);
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
  lineNodes.clear();
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
    playPopSound();
    explodeSelectedBalls();
  } else {
    clearSelection();
  }
}

function playSoundBuffer(buffer, volume = 0.85) {
  if (audioContext && buffer) {
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    source.buffer = buffer;
    gain.gain.value = volume;
    source.connect(gain);
    gain.connect(audioContext.destination);
    source.start(audioContext.currentTime);
    return true;
  }

  return false;
}

function playHtmlSound(sound) {
  if (!sound) {
    return false;
  }

  sound.currentTime = 0;
  sound.play().catch(() => {});
  return true;
}

function playSyntheticPop(volume = 0.18, frequency = 420, duration = 0.055) {
  const context = ensureAudioContextSync();
  if (!context) {
    return false;
  }

  if (context.state === "suspended") {
    context.resume().then(() => {
      playSyntheticPop(volume, frequency, duration);
    }).catch(() => {});
    return true;
  }

  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(80, frequency * 0.35), now + duration);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
  return true;
}

function playSelectSound() {
  playSoundBuffer(linkBuffer, 0.32) || playHtmlSound(linkSound);
}

function playPopSound() {
  playSyntheticPop(0.34, 330, 0.11);
  setTimeout(() => playSyntheticPop(0.2, 180, 0.09), 38);
  playSoundBuffer(popBuffer, 0.95) || playHtmlSound(popSound);
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
  const chainLength = selectedBalls.length;
  const targetClears = selectedBalls.filter((ball) => ball.spriteId === currentLevelTargetSpriteId).length;
  triggerHaptic([90, 50, 130]);

  for (const ball of selectedBalls) {
    triggerBallShake(ball, 14);
    burstParticles(ball.body.position.x, ball.body.position.y);
    Composite.remove(engine.world, ball.body);
    ball.view.destroy({ children: true });
  }

  balls = balls.filter((ball) => !removing.has(ball.body.id));
  score += removing.size * 100;
  levelStats.clears += chainLength;
  levelStats.targetClears += targetClears;
  levelStats.maxCombo = Math.max(levelStats.maxCombo, chainLength);
  updateScoreText();
  updateGoalText();
  selectedBalls = [];
  selectedBodyIds.clear();
  dragPointerPosition = null;
  lineGlow.clear();
  lineCore.clear();
  lineNodes.clear();

  if (isLevelComplete()) {
    finishLevel(true);
  }
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
  lineNodes = new PIXI.Graphics();
  particleLayer = new PIXI.Container();

  lineGlow.zIndex = 30;
  lineCore.zIndex = 31;
  lineNodes.zIndex = 32;
  particleLayer.zIndex = 11;

  app.stage.addChild(lineGlow);
  app.stage.addChild(lineCore);
  app.stage.addChild(lineNodes);
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
  setupAudioUnlockEvents();
}

function setupAudioUnlockEvents() {
  const unlock = () => {
    primeAudioFromGesture();
  };
  const options = { capture: true, passive: true };

  window.addEventListener("touchstart", unlock, options);
  window.addEventListener("pointerdown", unlock, options);
  window.addEventListener("mousedown", unlock, options);
}

function setupAudio() {
  linkSound = new Audio(CONNECT_SOUND_PATH);
  linkSound.preload = "auto";
  linkSound.volume = 0.32;
  linkSound.load();

  popSound = new Audio("pop_bomb.wav");
  popSound.preload = "auto";
  popSound.volume = 0.9;
  popSound.load();
  loadSoundBuffers().catch(() => {});
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

function updateFeedbackShake() {
  if (!app?.stage) {
    return;
  }

  if (feedbackShakeFrames <= 0) {
    app.stage.position.set(0, 0);
    feedbackShakeStrength = 0;
    return;
  }

  const strength = feedbackShakeStrength * (feedbackShakeFrames / 16);
  app.stage.position.set(
    (Math.random() - 0.5) * strength,
    (Math.random() - 0.5) * strength,
  );
  feedbackShakeFrames -= 1;
}

function clearBalls() {
  clearSelection();
  for (const ball of balls) {
    Composite.remove(engine.world, ball.body);
    ball.view.destroy({ children: true });
  }
  balls = [];
}

function clearLevelObstacles() {
  for (const body of levelObstacleBodies) {
    Composite.remove(engine.world, body);
  }
  for (const view of levelObstacleViews) {
    view.destroy({ children: true });
  }
  levelObstacleBodies = [];
  levelObstacleViews = [];
}

function createObstacleView(obstacle) {
  const view = new PIXI.Graphics();
  view.lineStyle(4, 0xffffff, 0.55);
  view.beginFill(0x0c121a, 0.68);

  if (obstacle.type === "bar") {
    view.drawRoundedRect(-obstacle.width / 2, -obstacle.height / 2, obstacle.width, obstacle.height, 8);
  } else {
    view.drawCircle(0, 0, obstacle.radius);
  }

  view.endFill();
  view.beginFill(currentLevel?.background?.accent || 0xffd66e, 0.28);
  if (obstacle.type === "bar") {
    view.drawRoundedRect(-obstacle.width / 2 + 8, -obstacle.height / 2 + 4, obstacle.width - 16, 4, 2);
  } else {
    view.drawCircle(-obstacle.radius * 0.28, -obstacle.radius * 0.28, obstacle.radius * 0.34);
  }
  view.endFill();
  view.position.set(obstacle.x, obstacle.y);
  view.rotation = obstacle.angle || 0;
  view.zIndex = 2;
  return view;
}

function createLevelObstacles() {
  clearLevelObstacles();
  if (!obstacleLayer) {
    obstacleLayer = new PIXI.Container();
    obstacleLayer.zIndex = 2;
    app.stage.addChild(obstacleLayer);
  }

  for (const obstacle of currentLevel?.obstacles || []) {
    const body = obstacle.type === "bar"
      ? Bodies.rectangle(obstacle.x, obstacle.y, obstacle.width, obstacle.height, {
        isStatic: true,
        angle: obstacle.angle || 0,
        restitution: 0.45,
        friction: 0.72,
      })
      : Bodies.circle(obstacle.x, obstacle.y, obstacle.radius, {
        isStatic: true,
        restitution: obstacle.type === "bumper" ? 0.88 : 0.38,
        friction: 0.55,
      });
    const view = createObstacleView(obstacle);
    Composite.add(engine.world, body);
    obstacleLayer.addChild(view);
    levelObstacleBodies.push(body);
    levelObstacleViews.push(view);
  }
}

async function startLevel(level) {
  gameStarted = false;
  currentLevel = level;
  currentLevelTargetSpriteId = null;
  levelTimeLeftMs = level.duration * 1000;
  levelStats = { targetClears: 0, clears: 0, maxCombo: 0 };
  spawnTimer = 0;
  clearBalls();
  clearParticles();
  clearLevelObstacles();
  score = 0;
  updateScoreText();
  updateGoalText();
  drawBackground();
  createLevelObstacles();
  await loadRoundTextures();
  currentLevelTargetSpriteId = level.goals.targetClears ? selectedSpriteIds[0] : null;
  hideLevelSelect();
  hideResultOverlay();
  updateHudForLevel();
  gameStarted = true;
}

async function restartGame() {
  if (!currentLevel) {
    return;
  }
  await startLevel(currentLevel);
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

  levelText = new PIXI.Text("关卡选择", {
    fill: 0xcdf7ff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 13,
    fontWeight: "700",
  });
  levelText.position.set(34, HUD_TOP + 38);
  levelText.zIndex = 21;
  app.stage.addChild(levelText);

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

  timeText = new PIXI.Text("0s", {
    fill: 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 16,
    fontWeight: "700",
  });
  timeText.anchor.set(0.5, 0);
  timeText.position.set(DESIGN_WIDTH / 2, HUD_TOP + 39);
  timeText.zIndex = 21;
  app.stage.addChild(timeText);

  goalText = new PIXI.Text("", {
    fill: 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 12,
    fontWeight: "700",
    align: "center",
  });
  goalText.anchor.set(0.5, 0);
  goalText.position.set(DESIGN_WIDTH / 2, HUD_TOP + 102);
  goalText.zIndex = 21;
  app.stage.addChild(goalText);

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

  const levels = new PIXI.Text("LEVELS", {
    fill: 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 14,
    fontWeight: "700",
  });
  levels.anchor.set(1, 0);
  levels.position.set(DESIGN_WIDTH - 34, HUD_TOP + 39);
  levels.eventMode = "static";
  levels.cursor = "pointer";
  levels.zIndex = 21;
  levels.on("pointertap", showLevelSelect);
  app.stage.addChild(levels);
}

function updateScoreText() {
  if (scoreText) {
    scoreText.text = String(score);
  }
}

function updateHudForLevel() {
  if (levelText) {
    levelText.text = currentLevel ? currentLevel.name : "关卡选择";
  }
  if (timeText) {
    timeText.text = currentLevel ? formatTime(levelTimeLeftMs) : "";
  }
  updateGoalText();
}

function updateGoalText() {
  if (!goalText) {
    return;
  }

  if (!currentLevel) {
    goalText.text = "";
    return;
  }

  const goals = currentLevel.goals;
  const parts = [];
  if (goals.score) {
    parts.push(`分数 ${score}/${goals.score}`);
  }
  if (goals.targetClears) {
    parts.push(`${currentLevel.targetLabel || "目标"} ${levelStats.targetClears}/${goals.targetClears}`);
  }
  if (goals.combo) {
    parts.push(`最高连消 ${levelStats.maxCombo}/${goals.combo}`);
  }
  if (goals.clears) {
    parts.push(`消除 ${levelStats.clears}/${goals.clears}`);
  }
  goalText.text = parts.join("   ");
}

function createButton(label, x, y, width, height, onTap, options = {}) {
  const container = new PIXI.Container();
  const bg = new PIXI.Graphics();
  bg.beginFill(options.fill || 0x111820, options.alpha ?? 0.86);
  bg.lineStyle(2, options.line || 0xffffff, options.lineAlpha ?? 0.18);
  bg.drawRoundedRect(0, 0, width, height, 8);
  bg.endFill();
  container.addChild(bg);

  const text = new PIXI.Text(label, {
    fill: options.textFill || 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: options.fontSize || 16,
    fontWeight: "700",
    align: "center",
    wordWrap: true,
    wordWrapWidth: width - 18,
  });
  text.anchor.set(0.5);
  text.position.set(width / 2, height / 2);
  container.addChild(text);

  container.position.set(x, y);
  container.eventMode = "static";
  container.cursor = "pointer";
  container.on("pointertap", onTap);
  return container;
}

function hideLevelSelect() {
  if (levelSelectContainer) {
    levelSelectContainer.visible = false;
  }
}

function showLevelSelect() {
  gameStarted = false;
  clearSelection();
  hideResultOverlay();

  if (levelSelectContainer) {
    levelSelectContainer.destroy({ children: true });
  }

  levelSelectContainer = new PIXI.Container();
  levelSelectContainer.zIndex = 80;

  const shade = new PIXI.Graphics();
  shade.beginFill(0x071018, 0.88);
  shade.drawRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  shade.endFill();
  levelSelectContainer.addChild(shade);

  const title = new PIXI.Text("关卡选择", {
    fill: 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 34,
    fontWeight: "800",
  });
  title.position.set(34, 92);
  levelSelectContainer.addChild(title);

  const hint = new PIXI.Text("通关后自动解锁下一关，进度会保存在本机。", {
    fill: 0xbfeaf2,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 14,
    fontWeight: "700",
  });
  hint.position.set(36, 138);
  levelSelectContainer.addChild(hint);

  LEVELS.forEach((level, index) => {
    const y = 184 + index * 122;
    const locked = level.id > unlockedLevel;
    const card = new PIXI.Graphics();
    card.beginFill(locked ? 0x17202a : level.background.top, locked ? 0.72 : 0.9);
    card.lineStyle(2, locked ? 0xffffff : level.background.accent, locked ? 0.12 : 0.42);
    card.drawRoundedRect(28, y, DESIGN_WIDTH - 56, 104, 8);
    card.endFill();
    levelSelectContainer.addChild(card);

    const name = new PIXI.Text(`${level.name}  ${locked ? "未解锁" : level.subtitle}`, {
      fill: locked ? 0x8d9aa8 : 0xffffff,
      fontFamily: "Arial, Microsoft YaHei, sans-serif",
      fontSize: 18,
      fontWeight: "800",
    });
    name.position.set(46, y + 17);
    levelSelectContainer.addChild(name);

    const desc = new PIXI.Text(`${level.duration}秒 | ${describeGoals(level)} | 障碍物 ${level.obstacles.length}个`, {
      fill: locked ? 0x77838f : 0xe8fbff,
      fontFamily: "Arial, Microsoft YaHei, sans-serif",
      fontSize: 13,
      fontWeight: "700",
      wordWrap: true,
      wordWrapWidth: 236,
    });
    desc.position.set(46, y + 48);
    levelSelectContainer.addChild(desc);

    const action = createButton(locked ? "LOCK" : "START", 314, y + 31, 70, 42, () => {
      if (!locked) {
        startLevel(level).catch(showFatalError);
      }
    }, {
      fill: locked ? 0x27313d : 0x0c1218,
      line: locked ? 0x596673 : level.background.accent,
      textFill: locked ? 0x7d8792 : 0xffffff,
      fontSize: 13,
    });
    levelSelectContainer.addChild(action);
  });

  app.stage.addChild(levelSelectContainer);
  updateHudForLevel();
}

function hideResultOverlay() {
  if (resultOverlay) {
    resultOverlay.destroy({ children: true });
    resultOverlay = null;
  }
}

function showResultOverlay(passed) {
  hideResultOverlay();
  resultOverlay = new PIXI.Container();
  resultOverlay.zIndex = 90;

  const shade = new PIXI.Graphics();
  shade.beginFill(0x061018, 0.82);
  shade.drawRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  shade.endFill();
  resultOverlay.addChild(shade);

  const panel = new PIXI.Graphics();
  panel.beginFill(0x111923, 0.96);
  panel.lineStyle(2, passed ? 0xffd66e : 0x7fb8ff, 0.55);
  panel.drawRoundedRect(34, 244, DESIGN_WIDTH - 68, 318, 8);
  panel.endFill();
  resultOverlay.addChild(panel);

  const title = new PIXI.Text(passed ? "通关成功" : "挑战失败", {
    fill: passed ? 0xfff176 : 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 32,
    fontWeight: "800",
  });
  title.anchor.set(0.5, 0);
  title.position.set(DESIGN_WIDTH / 2, 278);
  resultOverlay.addChild(title);

  const detail = new PIXI.Text(`得分 ${score}   ${currentLevel ? describeGoals(currentLevel) : ""}\n${goalText?.text || ""}`, {
    fill: 0xdff7ff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 15,
    fontWeight: "700",
    align: "center",
    wordWrap: true,
    wordWrapWidth: 300,
  });
  detail.anchor.set(0.5, 0);
  detail.position.set(DESIGN_WIDTH / 2, 334);
  resultOverlay.addChild(detail);

  const retry = createButton("再来一次", 66, 444, 132, 52, () => {
    restartGame().catch(showFatalError);
  }, { fill: 0x27313d, line: 0x9fd6ff });
  resultOverlay.addChild(retry);

  const nextLabel = passed && currentLevel?.id < LEVELS.length ? "下一关" : "关卡";
  const next = createButton(nextLabel, 232, 444, 132, 52, () => {
    if (passed && currentLevel?.id < LEVELS.length) {
      startLevel(LEVELS[currentLevel.id]).catch(showFatalError);
      return;
    }
    showLevelSelect();
  }, { fill: passed ? 0x2d5f58 : 0x27313d, line: passed ? 0x73f7cf : 0x9fd6ff });
  resultOverlay.addChild(next);

  app.stage.addChild(resultOverlay);
}

function finishLevel(passed) {
  if (!gameStarted) {
    return;
  }

  gameStarted = false;
  clearSelection();
  if (passed && currentLevel) {
    saveProgress(currentLevel.id);
  }
  showResultOverlay(passed);
}

function startPhysics() {
  engine = Engine.create({
    gravity: { x: 0, y: 0.46, scale: 0.001 },
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

    if (gameStarted) {
      levelTimeLeftMs -= delta;
      if (timeText) {
        timeText.text = formatTime(levelTimeLeftMs);
      }

      if (levelTimeLeftMs <= 0) {
        finishLevel(isLevelComplete());
      }

      spawnTimer += delta;
      while (spawnTimer >= SPAWN_INTERVAL_MS) {
        spawnBall();
        spawnTimer -= SPAWN_INTERVAL_MS;
      }
    }

    updateParticles();
    updateFeedbackShake();
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
  loadProgress();
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
  showLevelSelect();

  if (loadingEl) {
    loadingEl.style.display = "none";
  }
}

main().catch(showFatalError);
