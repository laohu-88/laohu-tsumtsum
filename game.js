const TOTAL_SPRITES = 422;

const FIRST_SPRITE_ID = 1;
const LAST_SPRITE_ID = FIRST_SPRITE_ID + TOTAL_SPRITES - 1;
const PARTICIPANT_COUNT = 8;
const REFILL_INTERVAL_MS = 118;
const BALL_RADIUS = 46;
const BODY_RADIUS = 34;
const DESIGN_WIDTH = 430;
const DESIGN_HEIGHT = 932;
const SPAWN_X_CENTER = DESIGN_WIDTH / 2;
const SPAWN_X_RANGE = 178;
const SPAWN_Y = 246;
const SPAWN_MIN_CLEARANCE = BODY_RADIUS * 1.08;
const MAX_BALLS = 176;
const MAX_ACTIVE_BALLS = 84;
const WALL_THICKNESS = 34;
const CONNECT_DISTANCE = BALL_RADIUS * 3.05;
const MIN_OBSTACLE_DAMAGE_CHAIN = 5;
const CONNECT_SOUND_PATH = "connect.wav?v=11";
const SHORT_CLEAR_SOUND_PATH = "pop_bomb.wav?v=32";
const LONG_CLEAR_SOUND_PATH = "pop_big.wav?v=1";
const COLLECTION_CATALOG_PATH = "collection-catalog.json?v=3";
const COLLECTION_CHARACTER_ASSET_PATH = "collection-character-assets.json?v=2";
const HUD_TOP = 54;
const BOTTOM_SAFE_Y = DESIGN_HEIGHT - BALL_RADIUS - 118;
const PROGRESS_STORAGE_KEY = "laohu-tsumtsum-level-progress-v1";
const SPRINT_BEST_STORAGE_KEY = "laohu-tsumtsum-sprint-best-v1";
const HERO_STORAGE_KEY = "laohu-tsumtsum-hero-v1";
const COINS_STORAGE_KEY = "laohu-tsumtsum-coins-v1";
const COLLECTION_STORAGE_KEY = "laohu-tsumtsum-collection-v1";
const GACHA_COST = 100;
const DUPLICATE_REFUND = 12;
const GACHA_BALL_FRAME_PATHS = [
  "sszdy_assets/Sprite_Sprite_69871.png",
  "sszdy_assets/Texture2D_Texture2D_69802.png",
  "sszdy_assets/Sprite_Sprite_70061.png",
  "sszdy_assets/Texture2D_Texture2D_70000.png",
  "sszdy_assets/Texture2D_Texture2D_69904.png",
  "sszdy_assets/Texture2D_Texture2D_69838.png",
  "sszdy_assets/Texture2D_Texture2D_69887.png",
  "sszdy_assets/Sprite_Sprite_69882.png",
  "sszdy_assets/Sprite_Sprite_69965.png",
  "sszdy_assets/Texture2D_Texture2D_69844.png",
  "sszdy_assets/Texture2D_Texture2D_69810.png",
  "sszdy_assets/Sprite_Sprite_69967.png",
  "sszdy_assets/Texture2D_Texture2D_69921.png",
];
const HERO_MAX_ENERGY = 100;
const LEVELS_PER_PAGE = 10;
const HERO_PANEL_Y = DESIGN_HEIGHT - 130;
const INITIAL_BOARD_FILL_TARGET = 74;

const VILLAIN_SPRITE_IDS = [
  19, 22, 34, 37, 39, 42, 55, 63, 67, 72, 73, 74, 75, 80, 82, 90, 105, 121, 139, 141, 147, 183, 199, 203,
  206, 209, 213, 214, 226, 235, 255, 263, 265, 292, 293, 300, 302, 305, 314, 337, 342, 349, 365, 371, 373, 379, 381, 383,
  390, 392, 416, 418, 419,
];
const VILLAIN_SPRITE_ID_SET = new Set(VILLAIN_SPRITE_IDS);
const FRIENDLY_SPRITE_IDS = allSpriteIds().filter((id) => !VILLAIN_SPRITE_ID_SET.has(id));

const VILLAIN_ROSTER = [
  { name: "查尔斯·蒙兹", assetId: 19 },
  { name: "戴维·琼斯", assetId: 22 },
  { name: "巴博萨", assetId: 34 },
  { name: "蟒蛇卡阿", assetId: 39 },
  { name: "谢利·可汗", assetId: 55 },
  { name: "副市长羊咩咩", assetId: 63 },
  { name: "皮特", assetId: 67 },
  { name: "葛朵", assetId: 72 },
  { name: "特曼妮夫人", assetId: 73 },
  { name: "玛琳菲森", assetId: 74 },
  { name: "红心皇后", assetId: 75 },
  { name: "蓝道", assetId: 80 },
  { name: "辛德罗姆", assetId: 82 },
  { name: "蒙斯特罗", assetId: 90 },
  { name: "祖格", assetId: 121 },
  { name: "刀疤", assetId: 141 },
  { name: "强霸", assetId: 183 },
  { name: "艾德", assetId: 139 },
  { name: "桑琪", assetId: 206 },
  { name: "伊阿古", assetId: 213 },
  { name: "贾方", assetId: 214 },
  { name: "黑胡子", assetId: 226 },
  { name: "霍博士", assetId: 235 },
  { name: "魔熊", assetId: 263 },
  { name: "乌基布基", assetId: 265 },
  { name: "女巫", assetId: 300 },
  { name: "盖斯顿", assetId: 305 },
  { name: "单于", assetId: 314 },
  { name: "虎克船长", assetId: 337 },
  { name: "乌苏拉", assetId: 342 },
  { name: "达拉", assetId: 365 },
  { name: "妖怪", assetId: 371 },
  { name: "德拉库斯", assetId: 379 },
  { name: "熊抱哥", assetId: 381 },
  { name: "塔玛托", assetId: 390 },
  { name: "班仔", assetId: 392 },
  { name: "杰克森·风暴", assetId: 418 },
];

const HEROES = [
  { id: "mickey", name: "米奇", assetId: 287, skillName: "星光竖线", skill: "vertical", description: "滑动选择一列，清除直线上的松松" },
  { id: "dumbo", name: "小飞象", assetId: 142, skillName: "横扫飞行", skill: "horizontal", description: "滑动选择一行，清除横线上的松松" },
  { id: "elsa", name: "艾莎", assetId: 246, skillName: "冰晶震波", skill: "shock", description: "全屏震动并清除少量松松" },
  { id: "stitch", name: "史迪奇", assetId: 179, skillName: "蓝色同伴", skill: "convert", description: "把部分松松变成当前英雄" },
  { id: "minnie", name: "米妮", assetId: 154, skillName: "甜心横线", skill: "horizontal", description: "滑动选择一行，释放横向清除" },
  { id: "donald", name: "唐老鸭", assetId: 286, skillName: "暴跳震波", skill: "shock", description: "滑动指定中心，震开并清除松松" },
  { id: "daisy", name: "黛丝", assetId: 174, skillName: "花束转化", skill: "convert", description: "滑动指定区域，把松松变为同伴" },
  { id: "goofy", name: "高飞", assetId: 120, skillName: "高飞竖线", skill: "vertical", description: "滑动选择一列，释放纵向清除" },
];

const BOSS_POOL = VILLAIN_ROSTER;

const LEVELS = [
  {
    id: 1,
    name: "第一关",
    subtitle: "目标松松训练",
    duration: 60,
    goals: { score: 500, targetClears: 10 },
    targetLabel: "目标",
    targetWeight: 0.3,
    background: { top: 0x1e9d8f, bottom: 0x143247, accent: 0xffd66e, glow: 0x8ff4ff },
    obstacles: [],
  },
  {
    id: 2,
    name: "第二关",
    subtitle: "弹针救援",
    duration: 45,
    goals: { score: 900, clears: 18 },
    targetWeight: 0.18,
    background: { top: 0x334a8f, bottom: 0x171c35, accent: 0xff8fb3, glow: 0x72f0ff },
    obstacles: [
      { type: "pin", x: 118, y: 430, radius: 14 },
      { type: "pin", x: 312, y: 516, radius: 14 },
      { type: "bar", x: 215, y: 638, width: 96, height: 10, angle: -0.18 },
    ],
  },
  {
    id: 3,
    name: "第三关",
    subtitle: "目标收集线",
    duration: 70,
    goals: { score: 1300, targetClears: 14 },
    targetLabel: "目标",
    targetWeight: 0.34,
    background: { top: 0x5e3f9d, bottom: 0x1f1631, accent: 0xf8bd5b, glow: 0x9af59a },
    obstacles: [
      { type: "pin", x: 100, y: 398, radius: 12 },
      { type: "pin", x: 330, y: 398, radius: 12 },
      { type: "pin", x: 215, y: 546, radius: 16 },
      { type: "bar", x: 138, y: 702, width: 84, height: 10, angle: 0.23 },
      { type: "bar", x: 292, y: 702, width: 84, height: 10, angle: -0.23 },
    ],
  },
  {
    id: 4,
    name: "第四关",
    subtitle: "窄路清仓",
    duration: 55,
    goals: { score: 1700, clears: 30 },
    targetWeight: 0.16,
    background: { top: 0x164f77, bottom: 0x111d24, accent: 0xfff176, glow: 0xff9f7a },
    obstacles: [
      { type: "bar", x: 136, y: 378, width: 92, height: 10, angle: 0.32 },
      { type: "bar", x: 294, y: 378, width: 92, height: 10, angle: -0.32 },
      { type: "pin", x: 100, y: 574, radius: 13 },
      { type: "pin", x: 330, y: 574, radius: 13 },
      { type: "pin", x: 215, y: 730, radius: 15 },
    ],
  },
  {
    id: 5,
    name: "第五关",
    subtitle: "震波派对",
    duration: 75,
    goals: { score: 2800, shockClears: 3, targetClears: 16 },
    targetLabel: "目标",
    targetWeight: 0.38,
    background: { top: 0x7a3047, bottom: 0x20121a, accent: 0x73f7cf, glow: 0xffd66e },
    obstacles: [
      { type: "pin", x: 98, y: 392, radius: 13 },
      { type: "pin", x: 332, y: 392, radius: 13 },
      { type: "pin", x: 215, y: 492, radius: 14 },
      { type: "bar", x: 144, y: 616, width: 90, height: 10, angle: -0.28 },
      { type: "bar", x: 286, y: 616, width: 90, height: 10, angle: 0.28 },
      { type: "pin", x: 215, y: 758, radius: 16 },
    ],
  },
  {
    id: 6,
    name: "冲刺 1分钟",
    subtitle: "最高分挑战",
    duration: 60,
    infinite: true,
    sprintMinutes: 1,
    goals: {},
    targetWeight: 0.18,
    background: { top: 0x217a64, bottom: 0x101a22, accent: 0xffd66e, glow: 0x7fffd4 },
    obstacles: [
      { type: "pin", x: 104, y: 430, radius: 12 },
      { type: "pin", x: 326, y: 430, radius: 12 },
      { type: "bar", x: 215, y: 590, width: 82, height: 9, angle: 0.16 },
      { type: "pin", x: 150, y: 724, radius: 12 },
      { type: "pin", x: 280, y: 724, radius: 12 },
    ],
  },
  {
    id: 7,
    name: "冲刺 3分钟",
    subtitle: "最高分挑战",
    duration: 180,
    infinite: true,
    sprintMinutes: 3,
    goals: {},
    targetWeight: 0.18,
    background: { top: 0x2b6f9f, bottom: 0x11172a, accent: 0xffd166, glow: 0x9bf6ff },
    obstacles: [
      { type: "bar", x: 122, y: 412, width: 78, height: 9, angle: 0.3 },
      { type: "bar", x: 308, y: 412, width: 78, height: 9, angle: -0.3 },
      { type: "pin", x: 215, y: 560, radius: 12 },
      { type: "pin", x: 130, y: 722, radius: 12 },
      { type: "pin", x: 300, y: 722, radius: 12 },
    ],
  },
  {
    id: 8,
    name: "冲刺 5分钟",
    subtitle: "最高分挑战",
    duration: 300,
    infinite: true,
    sprintMinutes: 5,
    goals: {},
    targetWeight: 0.18,
    background: { top: 0x6c4a9b, bottom: 0x171126, accent: 0x84f2c2, glow: 0xff9fcb },
    obstacles: [
      { type: "pin", x: 104, y: 390, radius: 12 },
      { type: "pin", x: 326, y: 390, radius: 12 },
      { type: "bar", x: 154, y: 566, width: 78, height: 9, angle: -0.34 },
      { type: "bar", x: 276, y: 566, width: 78, height: 9, angle: 0.34 },
      { type: "pin", x: 215, y: 734, radius: 14 },
    ],
  },
];

const EXTRA_LEVEL_THEMES = [
  { subtitle: "双塔回旋", goals: { score: 2600, clears: 32 }, colors: [0x217a64, 0x101a22, 0xffd66e, 0x7fffd4] },
  { subtitle: "花瓣漏斗", goals: { score: 3200, targetClears: 18 }, targetWeight: 0.34, colors: [0x2b6f9f, 0x11172a, 0xffd166, 0x9bf6ff] },
  { subtitle: "彩虹分流", goals: { score: 3600, clears: 34 }, colors: [0x6c4a9b, 0x171126, 0x84f2c2, 0xff9fcb] },
  { subtitle: "左右护航", goals: { score: 3800, clears: 40 }, colors: [0x22667a, 0x10151f, 0xffb86b, 0x96f7ff] },
  { subtitle: "目标三角阵", goals: { score: 4200, targetClears: 22 }, targetWeight: 0.36, colors: [0x8f4764, 0x22131b, 0x73f7cf, 0xffd66e] },
  { subtitle: "短链挑战", goals: { score: 4300, clears: 38 }, colors: [0x315f7f, 0x111820, 0xfbe36d, 0x68e0ff] },
  { subtitle: "冰桥斜坡", goals: { score: 4600, clears: 44 }, colors: [0x4c7c96, 0x10202d, 0xa7f2ff, 0xffffff] },
  { subtitle: "反向冰桥", goals: { score: 4800, targetClears: 24 }, targetWeight: 0.36, colors: [0x5c4e9a, 0x15142a, 0xffc76f, 0x9af59a] },
  { subtitle: "中央旋钮", goals: { score: 5200, shockClears: 4 }, colors: [0x7c5a2a, 0x191511, 0x9bf6ff, 0xffe082] },
  { subtitle: "星门收集", goals: { score: 5600, targetClears: 28 }, targetWeight: 0.4, colors: [0x264f82, 0x0f1524, 0xfff176, 0x73f7cf] },
  { subtitle: "窄瓶加速", goals: { score: 5000, clears: 46 }, colors: [0x1f805f, 0x101a19, 0xff9fcb, 0x7fffd4] },
  { subtitle: "双目标冲刺", goals: { score: 6200, targetClears: 30, clears: 50 }, targetWeight: 0.42, colors: [0x81456f, 0x211427, 0x8ff4ff, 0xffd66e] },
  { subtitle: "回廊连消", goals: { score: 6800, clears: 54 }, colors: [0x355f93, 0x121726, 0xffc76f, 0xa7f2ff] },
  { subtitle: "高分终盘", goals: { score: 7600, clears: 58 }, colors: [0x9a4f3b, 0x21140f, 0x73f7cf, 0xfff176] },
  { subtitle: "松松总动员", goals: { score: 8500, targetClears: 34, shockClears: 5 }, targetWeight: 0.44, colors: [0x2d7a86, 0x101820, 0xffd66e, 0xff9fcb] },
];

function createExtraLevelObstacles(index) {
  const patterns = [
    [{ type: "bar", x: 108, y: 460, width: 90, height: 9, angle: 1.18 }, { type: "bar", x: 322, y: 460, width: 90, height: 9, angle: -1.18 }, { type: "pin", x: 215, y: 610, radius: 13 }, { type: "pin", x: 150, y: 760, radius: 12 }, { type: "pin", x: 280, y: 760, radius: 12 }],
    [{ type: "bar", x: 122, y: 412, width: 78, height: 9, angle: 0.3 }, { type: "bar", x: 308, y: 412, width: 78, height: 9, angle: -0.3 }, { type: "bar", x: 142, y: 612, width: 76, height: 9, angle: -0.34 }, { type: "bar", x: 288, y: 612, width: 76, height: 9, angle: 0.34 }, { type: "pin", x: 215, y: 724, radius: 14 }],
    [{ type: "pin", x: 104, y: 390, radius: 12 }, { type: "pin", x: 326, y: 390, radius: 12 }, { type: "bar", x: 154, y: 566, width: 78, height: 9, angle: -0.34 }, { type: "bar", x: 276, y: 566, width: 78, height: 9, angle: 0.34 }, { type: "pin", x: 215, y: 734, radius: 14 }],
    [{ type: "bar", x: 86, y: 516, width: 118, height: 10, angle: 1.33 }, { type: "bar", x: 344, y: 516, width: 118, height: 10, angle: -1.33 }, { type: "pin", x: 215, y: 455, radius: 12 }, { type: "pin", x: 215, y: 690, radius: 14 }],
    [{ type: "pin", x: 154, y: 440, radius: 14 }, { type: "pin", x: 276, y: 440, radius: 14 }, { type: "pin", x: 215, y: 560, radius: 16 }, { type: "bar", x: 215, y: 716, width: 112, height: 10, angle: 0 }],
  ];
  return patterns[index % patterns.length];
}

const EXTRA_LEVELS = EXTRA_LEVEL_THEMES.map((theme, index) => {
  const id = index + 6;
  const colors = theme.colors;
  return {
    id,
    name: "第" + id + "关",
    subtitle: theme.subtitle,
    duration: Math.min(120, 70 + index * 5),
    goals: theme.goals,
    targetLabel: theme.goals.targetClears ? "目标" : undefined,
    targetWeight: theme.targetWeight || 0.2,
    background: { top: colors[0], bottom: colors[1], accent: colors[2], glow: colors[3] },
    obstacles: createExtraLevelObstacles(index),
  };
});

LEVELS.splice(5, 0, ...EXTRA_LEVELS);
LEVELS.slice(20).forEach((level, index) => {
  level.id = 21 + index;
});

function makeGeneratedLevel(id) {
  const theme = EXTRA_LEVEL_THEMES[(id - 1) % EXTRA_LEVEL_THEMES.length];
  const colors = theme.colors;
  const bossLevel = id % 10 === 0;
  const baseScore = 7200 + id * 360;
  return {
    id,
    name: `第${id}关${bossLevel ? " · BOSS" : ""}`,
    subtitle: bossLevel ? "反派松松来袭" : theme.subtitle,
    duration: bossLevel ? 140 : Math.min(150, 82 + (id % 12) * 6),
    goals: bossLevel
      ? { score: Math.floor(baseScore * 0.72), boss: true }
      : {
        ...theme.goals,
        score: Math.max(theme.goals.score || 0, baseScore),
        clears: theme.goals.clears ? theme.goals.clears + Math.floor(id * 1.35) : undefined,
        targetClears: theme.goals.targetClears ? theme.goals.targetClears + Math.floor(id * 0.65) : undefined,
        shockClears: theme.goals.shockClears ? theme.goals.shockClears + Math.floor(id / 20) : undefined,
      },
    targetLabel: !bossLevel && theme.goals.targetClears ? "目标" : undefined,
    targetWeight: theme.targetWeight || 0.22,
    boss: bossLevel ? {
      ...BOSS_POOL[Math.floor(id / 10 - 1) % BOSS_POOL.length],
      hp: 560 + id * 54,
    } : null,
    background: { top: colors[0], bottom: colors[1], accent: bossLevel ? 0xff4f5f : colors[2], glow: colors[3] },
    obstacles: createExtraLevelObstacles(id + (bossLevel ? 2 : 0)),
  };
}

for (let id = LEVELS.length + 1; id <= 80; id += 1) {
  LEVELS.push(makeGeneratedLevel(id));
}

for (const level of LEVELS) {
  if (!level.infinite && level.id % 10 === 0 && !level.boss) {
    const boss = BOSS_POOL[Math.floor(level.id / 10 - 1) % BOSS_POOL.length];
    level.name = `第${level.id}关 · BOSS`;
    level.subtitle = "反派松松来袭";
    level.duration = Math.max(level.duration || 0, 132);
    level.goals = { score: Math.max(level.goals.score || 0, 3600 + level.id * 380), boss: true };
    level.boss = { ...boss, hp: 560 + level.id * 54 };
    level.background = { ...level.background, accent: 0xff4f5f };
  }
}


const BOTTLE = {
  leftNeckTop: { x: 116, y: 94 },
  rightNeckTop: { x: 314, y: 94 },
  leftMouth: { x: 54, y: 204 },
  rightMouth: { x: 376, y: 204 },
  leftShoulder: { x: 12, y: 312 },
  rightShoulder: { x: 418, y: 312 },
  leftLowerSide: { x: 6, y: 806 },
  rightLowerSide: { x: 424, y: 806 },
  leftHeel: { x: 32, y: 856 },
  rightHeel: { x: 398, y: 856 },
  leftFloor: { x: 66, y: BOTTOM_SAFE_Y },
  rightFloor: { x: 364, y: BOTTOM_SAFE_Y },
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
let countdownText;
let countdownLastSecond = 0;
let goalText;
let levelText;
let popSound;
let popBigSound;
let linkSound;
let selectedBalls = [];
let selectedBodyIds = new Set();
let particles = [];
let refillTimer = 0;
let pendingRefillCount = 0;
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
let popBigBuffer = null;
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
let levelSelectPage = 0;
let resultOverlay;
let levelObstacleBodies = [];
let levelObstacleViews = [];
let obstacleTextures = new Map();
let unlockedLevel = 1;
let currentLevel = null;
let currentLevelTargetSpriteId = null;
let levelTimeLeftMs = 0;
let levelEndReason = "";
let sprintBestScores = {};
let selectedHeroId = HEROES[0].id;
let selectedHero = HEROES[0];
let selectedHeroTexture = null;
let heroTextures = new Map();
let coins = 0;
let unlockedSprites = new Set();
let coinsText = null;
let collectionOverlay = null;
let collectionGrid = null;
let collectionMessageText = null;
let collectionCountText = null;
let collectionCoinText = null;
let collectionFilter = "all";
let collectionRenderToken = 0;
let collectionDetailLayer = null;
let collectionCatalogMap = null;
let collectionCatalogPromise = null;
let collectionCharacterAssetMap = null;
let collectionCharacterAssetPromise = null;
let collectionDetailRenderToken = 0;
let imageAvailabilityCache = new Map();
let gachaResultLayer = null;
let gachaAnimating = false;
let gachaFrameImagesPromise = null;
let obstacleLayoutSeed = 0;
let levelStartInProgress = false;
let lastCoinsEarned = 0;
let heroContainer = null;
let heroSprite = null;
let heroEnergyBar = null;
let heroEnergyText = null;
let heroSkillButton = null;
let heroSkillLabel = null;
let heroSkillDesc = null;
let skillPreviewLine = null;
let pendingHeroSkill = null;
let pendingSkillPoint = null;
let heroEnergy = 0;
let bossContainer = null;
let bossSprite = null;
let bossHpBar = null;
let bossHpText = null;
let bossState = null;
let pauseOverlay = null;
let pausedByMenu = false;
let levelStats = {
  targetClears: 0,
  clears: 0,
  maxCombo: 0,
  shockClears: 0,
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

function clamp(value, min, max) {
  if (max < min) {
    return (min + max) / 2;
  }
  return Math.max(min, Math.min(max, value));
}

function seededRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function pickRoundSprites() {
  if (FRIENDLY_SPRITE_IDS.length < PARTICIPANT_COUNT) {
    throw new Error(`FRIENDLY_SPRITE_IDS must be at least ${PARTICIPANT_COUNT}.`);
  }

  return shuffle(FRIENDLY_SPRITE_IDS).slice(0, PARTICIPANT_COUNT);
}

function normalizeSpriteId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id >= FIRST_SPRITE_ID && id <= LAST_SPRITE_ID ? id : null;
}

function allSpriteIds() {
  return Array.from({ length: TOTAL_SPRITES }, (_, index) => index + FIRST_SPRITE_ID);
}

function loadProgress() {
  const params = new URLSearchParams(window.location.search);
  const saved = Number(window.localStorage.getItem(PROGRESS_STORAGE_KEY));
  if (Number.isFinite(saved) && saved >= 1) {
    unlockedLevel = Math.min(LEVELS.length, saved);
  }
  if (params.has("unlockAll")) {
    unlockedLevel = LEVELS.length;
  }

  try {
    sprintBestScores = JSON.parse(window.localStorage.getItem(SPRINT_BEST_STORAGE_KEY) || "{}") || {};
  } catch (_) {
    sprintBestScores = {};
  }

  const savedHeroId = window.localStorage.getItem(HERO_STORAGE_KEY);
  selectedHero = HEROES.find((hero) => hero.id === savedHeroId) || HEROES[0];
  selectedHeroId = selectedHero.id;

  const savedCoins = Number(window.localStorage.getItem(COINS_STORAGE_KEY));
  coins = Number.isFinite(savedCoins) && savedCoins > 0 ? Math.floor(savedCoins) : 0;
  const testCoins = Number(params.get("testCoins"));
  if (Number.isFinite(testCoins) && testCoins > 0) {
    coins = Math.floor(testCoins);
  }

  try {
    const savedCollection = JSON.parse(window.localStorage.getItem(COLLECTION_STORAGE_KEY) || "[]");
    unlockedSprites = new Set((Array.isArray(savedCollection) ? savedCollection : []).map(normalizeSpriteId).filter(Boolean));
  } catch (_) {
    unlockedSprites = new Set();
  }
  if (params.has("unlockCollection")) {
    unlockedSprites = new Set(allSpriteIds());
  }
}

function saveProgress(levelId) {
  unlockedLevel = Math.min(LEVELS.length, Math.max(unlockedLevel, levelId + 1));
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, String(unlockedLevel));
}

function saveCoins() {
  window.localStorage.setItem(COINS_STORAGE_KEY, String(coins));
  updateCoinsUi();
}

function saveCollection() {
  window.localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify([...unlockedSprites].sort((a, b) => a - b)));
}

function addCoins(amount) {
  coins = Math.max(0, coins + Math.floor(amount));
  saveCoins();
}

function awardCoinsForScore(finalScore) {
  const earned = Math.floor(Math.max(0, finalScore) * 0.04);
  if (earned > 0) {
    addCoins(earned);
  } else {
    updateCoinsUi();
  }
  return earned;
}

function updateCoinsUi() {
  if (coinsText) {
    coinsText.text = `金币 ${coins}`;
  }
  if (collectionCoinText) {
    collectionCoinText.textContent = `金币 ${coins}`;
  }
  if (collectionCountText) {
    collectionCountText.textContent = `已解锁 ${unlockedSprites.size}/${TOTAL_SPRITES}`;
  }
}

function saveSprintBest(level, finalScore) {
  if (!level?.infinite || !level.sprintMinutes) {
    return false;
  }

  const key = String(level.sprintMinutes);
  const previous = Number(sprintBestScores[key] || 0);
  if (finalScore <= previous) {
    return false;
  }

  sprintBestScores[key] = finalScore;
  window.localStorage.setItem(SPRINT_BEST_STORAGE_KEY, JSON.stringify(sprintBestScores));
  return true;
}

function formatTime(ms) {
  if (!Number.isFinite(ms)) {
    return "∞";
  }
  return `${Math.max(0, Math.ceil(ms / 1000))}s`;
}

function describeGoals(level) {
  if (level.infinite) {
    const best = sprintBestScores[String(level.sprintMinutes)] || 0;
    return `${level.sprintMinutes}分钟冲刺 / 最高分 ${best}`;
  }

  const goals = [];
  if (level.goals.score) {
    goals.push(`${level.goals.score}分`);
  }
  if (level.goals.boss) {
    goals.push("击败BOSS");
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
  if (level.goals.shockClears) {
    goals.push(`触发震波x${level.goals.shockClears}`);
  }
  return goals.join(" / ");
}

function isLevelComplete() {
  if (!currentLevel) {
    return false;
  }

  if (currentLevel.infinite) {
    return false;
  }

  const goals = currentLevel.goals;
  return (!goals.score || score >= goals.score)
    && (!goals.boss || (bossState && bossState.hp <= 0))
    && (!goals.targetClears || levelStats.targetClears >= goals.targetClears)
    && (!goals.combo || levelStats.maxCombo >= goals.combo)
    && (!goals.clears || levelStats.clears >= goals.clears)
    && (!goals.shockClears || levelStats.shockClears >= goals.shockClears);
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
      restitution: 0.34,
      friction: 0.015,
      frictionStatic: 0,
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

async function loadHeroTexture() {
  const path = `assets/${selectedHero.assetId}.png`;
  if (heroTextures.has(selectedHero.id)) {
    selectedHeroTexture = heroTextures.get(selectedHero.id);
    return;
  }

  if (PIXI.Assets && PIXI.Assets.load) {
    selectedHeroTexture = await PIXI.Assets.load(path);
    heroTextures.set(selectedHero.id, selectedHeroTexture);
    return;
  }

  selectedHeroTexture = await new Promise((resolve, reject) => {
    const loader = new PIXI.Loader();
    loader.add(path, path);
    loader.load((_, resources) => {
      const texture = resources[path]?.texture;
      if (!texture) {
        reject(new Error("Hero asset failed to load."));
        return;
      }
      resolve(texture);
    });
    loader.onError.add((error) => reject(error));
  });
  heroTextures.set(selectedHero.id, selectedHeroTexture);
}

async function loadLevelObstacleTextures(level) {
  const assetIds = new Set((level?.obstacles || []).map((_, index) => getVillainObstacleConfig(index).assetId));
  if (assetIds.size === 0) {
    return;
  }

  if (PIXI.Assets && PIXI.Assets.load) {
    await Promise.all([...assetIds].map(async (id) => {
      const texture = await PIXI.Assets.load(`assets/${id}.png`).catch(() => null);
      if (texture) {
        obstacleTextures.set(id, texture);
      }
    }));
    return;
  }

  await new Promise((resolve) => {
    const loader = new PIXI.Loader();
    [...assetIds].forEach((id) => loader.add(String(id), `assets/${id}.png`));
    loader.load((_, resources) => {
      for (const id of assetIds) {
        const texture = resources[String(id)]?.texture;
        if (texture) {
          obstacleTextures.set(id, texture);
        }
      }
      resolve();
    });
    loader.onError.add(() => resolve());
  });
}

async function loadHeroTextures() {
  await Promise.all(HEROES.map(async (hero) => {
    const path = `assets/${hero.assetId}.png`;
    let texture;
    if (PIXI.Assets && PIXI.Assets.load) {
      texture = await PIXI.Assets.load(path);
    } else {
      texture = await new Promise((resolve, reject) => {
        const loader = new PIXI.Loader();
        loader.add(path, path);
        loader.load((_, resources) => {
          const loaded = resources[path]?.texture;
          if (!loaded) {
            reject(new Error("Hero asset failed to load."));
            return;
          }
          resolve(loaded);
        });
        loader.onError.add((error) => reject(error));
      });
    }
    heroTextures.set(hero.id, texture);
  }));
  selectedHeroTexture = heroTextures.get(selectedHero.id) || selectedHeroTexture;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (image.decode) {
        image.decode().then(() => resolve(image)).catch(() => resolve(image));
        return;
      }
      resolve(image);
    };
    image.onerror = reject;
    image.src = src;
  });
}

function checkImageAvailable(src) {
  if (!src) {
    return Promise.resolve(false);
  }
  if (!imageAvailabilityCache.has(src)) {
    imageAvailabilityCache.set(src, loadImage(src).then(() => true).catch(() => false));
  }
  return imageAvailabilityCache.get(src);
}

async function resolveFirstAvailableImage(sources) {
  const uniqueSources = [...new Set(sources.filter(Boolean))];
  for (const src of uniqueSources) {
    if (await checkImageAvailable(src)) {
      return src;
    }
  }
  return null;
}

function ensureCollectionStyles() {
  if (document.getElementById("collection-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "collection-styles";
  style.textContent = `
    .collection-overlay {
      position: fixed;
      inset: 0;
      z-index: 30;
      display: grid;
      place-items: center;
      padding: max(14px, env(safe-area-inset-top)) 12px max(14px, env(safe-area-inset-bottom));
      box-sizing: border-box;
      background: rgba(4, 10, 17, 0.74);
      touch-action: none;
    }
    .collection-panel {
      width: min(860px, 100%);
      max-height: min(888px, 100%);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 2px solid rgba(255, 218, 110, 0.72);
      border-radius: 8px;
      color: #fff;
      background:
        linear-gradient(180deg, rgba(31, 104, 132, 0.96), rgba(15, 25, 42, 0.98) 42%, rgba(34, 22, 42, 0.98));
      box-shadow: 0 22px 90px rgba(0, 0, 0, 0.54);
      font-family: Arial, "Microsoft YaHei", sans-serif;
      touch-action: auto;
    }
    .collection-head {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      padding: 16px 16px 10px;
      background: linear-gradient(90deg, rgba(255, 214, 110, 0.24), rgba(124, 241, 211, 0.12));
    }
    .collection-title {
      font-size: 24px;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: 0;
    }
    .collection-stats {
      margin-top: 6px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      color: #dffbff;
      font-size: 13px;
      font-weight: 800;
    }
    .collection-close {
      width: 36px;
      height: 36px;
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 8px;
      color: #fff;
      background: rgba(7, 16, 24, 0.58);
      font-size: 22px;
      font-weight: 900;
    }
    .collection-actions {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
      padding: 10px 16px 12px;
      background: rgba(5, 14, 22, 0.24);
    }
    .gacha-button {
      min-height: 50px;
      border: 2px solid rgba(255, 241, 118, 0.78);
      border-radius: 8px;
      color: #201507;
      background: linear-gradient(180deg, #fff176, #ffb347);
      font-size: 17px;
      font-weight: 900;
      box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.45), 0 8px 22px rgba(0, 0, 0, 0.24);
    }
    .collection-message {
      min-height: 18px;
      color: #ffeaa0;
      font-size: 13px;
      font-weight: 800;
      text-align: center;
    }
    .collection-filters {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 6px;
    }
    .collection-filter {
      min-height: 34px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      border-radius: 8px;
      color: #dffbff;
      background: rgba(6, 17, 26, 0.5);
      font-size: 13px;
      font-weight: 900;
    }
    .collection-filter.active {
      color: #201507;
      border-color: rgba(255, 241, 118, 0.84);
      background: linear-gradient(180deg, #fff176, #ffbc55);
    }
    .collection-grid {
      overflow: auto;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      grid-auto-rows: 70px;
      gap: 10px;
      padding: 14px 14px 18px;
      -webkit-overflow-scrolling: touch;
    }
    .collection-content {
      min-height: 0;
      flex: 1;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(220px, 300px);
      overflow: hidden;
    }
    .collection-card {
      min-width: 0;
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      background: radial-gradient(circle at 38% 28%, rgba(255, 255, 255, 0.18), rgba(3, 9, 15, 0.62));
      position: relative;
      overflow: hidden;
      cursor: pointer;
      padding: 0;
    }
    .collection-card:disabled {
      cursor: default;
    }
    .collection-card img {
      width: 82%;
      height: 82%;
      object-fit: contain;
      display: block;
    }
    .collection-card.locked img {
      filter: grayscale(100%) brightness(0);
      opacity: 0.78;
    }
    .collection-card span {
      position: absolute;
      left: 5px;
      right: 5px;
      bottom: 4px;
      padding: 1px 5px;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.42);
      color: rgba(255, 255, 255, 0.82);
      font-size: 9px;
      font-weight: 800;
      line-height: 1.15;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .collection-empty {
      grid-column: 1 / -1;
      padding: 28px 12px;
      color: #dffbff;
      text-align: center;
      font-size: 14px;
      font-weight: 800;
    }
    .collection-detail {
      min-height: 0;
      display: flex;
      padding: 14px 14px 18px 0;
      box-sizing: border-box;
      background: rgba(5, 14, 22, 0.22);
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .collection-detail-card {
      width: 100%;
      align-self: flex-start;
      display: grid;
      gap: 12px;
      border: 2px solid rgba(255, 241, 118, 0.76);
      border-radius: 8px;
      padding: 14px;
      box-sizing: border-box;
      color: #fff;
      background: radial-gradient(circle at 50% 18%, rgba(255, 241, 118, 0.24), rgba(18, 25, 35, 0.97) 48%, rgba(28, 17, 38, 0.98));
      box-shadow: 0 18px 70px rgba(0, 0, 0, 0.52);
    }
    .collection-detail-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 20px;
      font-weight: 900;
    }
    .collection-detail-close {
      width: 34px;
      height: 34px;
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 8px;
      color: #fff;
      background: rgba(7, 16, 24, 0.58);
      font-size: 20px;
      font-weight: 900;
    }
    .collection-detail-body {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      align-items: stretch;
    }
    .collection-original,
    .collection-closeups {
      position: relative;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }
    .collection-original {
      min-height: 246px;
    }
    .collection-original img {
      width: 94%;
      height: 94%;
      object-fit: contain;
    }
    .collection-original .collection-classic-image {
      width: 100%;
      height: 100%;
      min-height: 220px;
      object-fit: contain;
      background: radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.9), rgba(215, 242, 255, 0.24) 58%, rgba(0, 0, 0, 0));
    }
    .collection-detail-name {
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .collection-asset-missing {
      width: 100%;
      min-height: 92px;
      display: grid;
      place-items: center;
      padding: 14px;
      box-sizing: border-box;
      color: rgba(255, 255, 255, 0.76);
      text-align: center;
      font-size: 13px;
      font-weight: 800;
      line-height: 1.35;
    }
    .collection-closeups {
      min-height: 112px;
      padding: 10px;
      box-sizing: border-box;
    }
    .collection-closeups img {
      width: 102px;
      height: 102px;
      object-fit: contain;
      background: rgba(0, 0, 0, 0.18);
      border-radius: 8px;
      filter: drop-shadow(0 16px 18px rgba(0, 0, 0, 0.38));
    }
    @media (max-width: 360px) {
      .collection-grid {
        grid-auto-rows: 62px;
      }
    }
    @media (max-width: 720px) {
      .collection-panel {
        width: min(420px, 100%);
      }
      .collection-content {
        grid-template-columns: 1fr;
      }
      .collection-detail {
        padding: 0 14px 18px;
      }
      .collection-grid {
        max-height: 330px;
      }
    }
    .gacha-stage {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      background: rgba(3, 8, 13, 0.82);
    }
    .gacha-stage-inner {
      width: min(330px, 86vw);
      min-height: 390px;
      display: grid;
      place-items: center;
      border: 2px solid rgba(255, 241, 118, 0.76);
      border-radius: 8px;
      background: radial-gradient(circle at 50% 18%, rgba(255, 241, 118, 0.34), rgba(18, 25, 35, 0.96) 46%, rgba(28, 17, 38, 0.98));
    }
    .gacha-ball-reel {
      position: relative;
      width: 230px;
      height: 230px;
      filter: drop-shadow(0 24px 28px rgba(0, 0, 0, 0.48));
      animation: gachaPulse 0.28s ease-in-out infinite alternate;
    }
    .gacha-ball-frame {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      transform-origin: 50% 58%;
      opacity: 0;
      transition: opacity 0.045s linear;
      will-change: opacity;
    }
    .gacha-ball-frame.is-active {
      opacity: 1;
    }
    .gacha-ball-flare {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #fff9a8;
      opacity: 0.18;
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 0 34px 16px rgba(255, 248, 140, 0.82), 0 0 110px 50px rgba(255, 194, 74, 0.42);
      pointer-events: none;
      transition: transform 0.32s ease, opacity 0.32s ease;
    }
    .gacha-ball-reel.is-opening {
      animation: gachaBallOpen 0.78s cubic-bezier(.2,.82,.2,1) both;
    }
    .gacha-ball-reel.is-opening .gacha-ball-flare {
      opacity: 1;
      transform: translate(-50%, -50%) scale(4.2);
    }
    .gacha-result {
      width: 230px;
      height: 230px;
      object-fit: contain;
      animation: gachaSpin 1.15s cubic-bezier(.2,.8,.3,1) both;
    }
    .gacha-result-text {
      min-height: 54px;
      padding: 0 20px;
      color: #fff7bf;
      text-align: center;
      font-size: 18px;
      font-weight: 900;
      line-height: 1.35;
    }
    @keyframes gachaPulse {
      from { transform: scale(0.94) rotate(-7deg); }
      to { transform: scale(1.08) rotate(7deg); }
    }
    @keyframes gachaBallOpen {
      0% { transform: scale(1) rotate(0deg); }
      30% { transform: scale(1.18) rotate(-16deg); }
      58% { transform: scale(1.22) rotate(18deg); }
      100% { transform: scale(0.12) rotate(40deg); opacity: 0; }
    }
    @keyframes gachaSpin {
      from { transform: perspective(500px) rotateY(0deg) scale(0.35); opacity: 0; }
      60% { transform: perspective(500px) rotateY(360deg) scale(1.14); opacity: 1; }
      to { transform: perspective(500px) rotateY(720deg) scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
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
    ring.lineStyle(10, 0xff2f48, 0.98);
    ring.drawCircle(0, 0, BALL_RADIUS - 5);
    ring.lineStyle(3, 0xfff0f2, 0.78);
    ring.drawCircle(0, 0, BALL_RADIUS - 12);
    container.addChild(ring);
  }

  return container;
}

function pickTextureEntry() {
  let textureEntry = textures[Math.floor(Math.random() * textures.length)];
  if (currentLevelTargetSpriteId && Math.random() < (currentLevel?.targetWeight || 0.2)) {
    textureEntry = textures.find((entry) => entry.id === currentLevelTargetSpriteId) || textureEntry;
  }
  return textureEntry;
}

function createBallAt(point, options = {}) {
  const textureEntry = pickTextureEntry();
  const body = Bodies.circle(point.x, point.y, BODY_RADIUS, {
    restitution: options.restitution ?? 0.24,
    friction: 0.012,
    frictionStatic: 0,
    frictionAir: 0.004,
    slop: 0.08,
    density: 0.00145,
  });

  Body.setVelocity(body, options.velocity || {
    x: (Math.random() - 0.5) * 0.7,
    y: 2.35 + Math.random() * 0.45,
  });
  Body.setAngularVelocity(body, options.angularVelocity ?? ((Math.random() - 0.5) * 0.18));
  Composite.add(engine.world, body);

  const view = makeCircularSprite(textureEntry.texture, textureEntry.id === currentLevelTargetSpriteId);
  view.zIndex = 3;
  app.stage.addChild(view);
  balls.push({ body, view, spriteId: textureEntry.id });
  return balls[balls.length - 1];
}

function spawnBall() {
  if (!gameStarted || textures.length === 0) {
    return false;
  }

  if (balls.length >= MAX_ACTIVE_BALLS || balls.length >= MAX_BALLS) {
    return false;
  }

  const spawnPoint = findOpenSpawnPoint();
  if (!spawnPoint) {
    return false;
  }

  createBallAt(spawnPoint);
  updateGoalText();
  return true;
}

function getBottleXLimitsAtY(y) {
  if (y < 246) {
    return {
      left: BOTTLE.leftNeckTop.x + BODY_RADIUS,
      right: BOTTLE.rightNeckTop.x - BODY_RADIUS,
    };
  }

  if (y < 360) {
    const t = (y - BOTTLE.leftMouth.y) / (BOTTLE.leftShoulder.y - BOTTLE.leftMouth.y);
    return {
      left: BOTTLE.leftMouth.x + (BOTTLE.leftShoulder.x - BOTTLE.leftMouth.x) * t + BODY_RADIUS,
      right: BOTTLE.rightMouth.x + (BOTTLE.rightShoulder.x - BOTTLE.rightMouth.x) * t - BODY_RADIUS,
    };
  }

  if (y < 806) {
    const t = (y - BOTTLE.leftShoulder.y) / (BOTTLE.leftLowerSide.y - BOTTLE.leftShoulder.y);
    return {
      left: BOTTLE.leftShoulder.x + (BOTTLE.leftLowerSide.x - BOTTLE.leftShoulder.x) * t + BODY_RADIUS,
      right: BOTTLE.rightShoulder.x + (BOTTLE.rightLowerSide.x - BOTTLE.rightShoulder.x) * t - BODY_RADIUS,
    };
  }

  return {
    left: BOTTLE.leftFloor.x + BODY_RADIUS,
    right: BOTTLE.rightFloor.x - BODY_RADIUS,
  };
}

function createInitialBoardBalls() {
  const rowSpacing = BODY_RADIUS * 1.54;
  const colSpacing = BODY_RADIUS * 1.6;
  let created = 0;

  for (let row = 0; created < INITIAL_BOARD_FILL_TARGET; row += 1) {
    const y = BOTTOM_SAFE_Y - 20 - row * rowSpacing;
    if (y < 318) {
      break;
    }
    const limits = getBottleXLimitsAtY(y);
    const columns = Math.max(1, Math.floor((limits.right - limits.left) / colSpacing) + 1);
    const usableWidth = (columns - 1) * colSpacing;
    const startX = (limits.left + limits.right - usableWidth) / 2;
    for (let col = 0; col < columns && created < INITIAL_BOARD_FILL_TARGET; col += 1) {
      const x = startX + col * colSpacing + ((row % 2) * colSpacing * 0.28);
      if (x < limits.left || x > limits.right) {
        continue;
      }
      createBallAt({ x, y }, {
        velocity: { x: (Math.random() - 0.5) * 0.18, y: (Math.random() - 0.5) * 0.12 },
        angularVelocity: (Math.random() - 0.5) * 0.04,
        restitution: 0.18,
      });
      created += 1;
    }
  }

  updateGoalText();
}

function queueRefill(count) {
  const refillSlots = Math.max(0, INITIAL_BOARD_FILL_TARGET - balls.length - pendingRefillCount);
  const added = Math.min(Math.max(0, count), refillSlots);
  pendingRefillCount += added;
}

function processRefill(delta) {
  if (pendingRefillCount <= 0) {
    return;
  }

  const openSlots = Math.max(0, INITIAL_BOARD_FILL_TARGET - balls.length);
  if (openSlots <= 0) {
    pendingRefillCount = 0;
    refillTimer = 0;
    return;
  }

  pendingRefillCount = Math.min(pendingRefillCount, openSlots);
  refillTimer += delta;
  while (pendingRefillCount > 0 && refillTimer >= REFILL_INTERVAL_MS) {
    if (!spawnBall()) {
      refillTimer = REFILL_INTERVAL_MS;
      return;
    }
    pendingRefillCount -= 1;
    refillTimer -= REFILL_INTERVAL_MS;
  }
}

function findOpenSpawnPoint() {
  const attempts = [
    { x: SPAWN_X_CENTER, y: SPAWN_Y },
    { x: SPAWN_X_CENTER - 34, y: SPAWN_Y + 8 },
    { x: SPAWN_X_CENTER + 34, y: SPAWN_Y + 8 },
    { x: SPAWN_X_CENTER - 66, y: SPAWN_Y + 20 },
    { x: SPAWN_X_CENTER + 66, y: SPAWN_Y + 20 },
  ];

  const addRowAttempts = (y, count) => {
    const limits = getBottleXLimitsAtY(y);
    for (let i = 0; i < count; i += 1) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      attempts.push({
        x: limits.left + (limits.right - limits.left) * t + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 12,
      });
    }
  };

  addRowAttempts(SPAWN_Y + 42, 5);
  addRowAttempts(SPAWN_Y + 82, 6);
  addRowAttempts(SPAWN_Y + 122, 6);

  for (let i = 0; i < 12; i += 1) {
    const y = SPAWN_Y + Math.random() * 128;
    const limits = getBottleXLimitsAtY(y);
    attempts.push({
      x: limits.left + Math.random() * (limits.right - limits.left),
      y,
    });
  }

  return attempts.find((point) => {
    const limits = getBottleXLimitsAtY(point.y);
    if (point.x < limits.left || point.x > limits.right) {
      return false;
    }

    return balls.every((ball) => {
      const dx = ball.body.position.x - point.x;
      const dy = ball.body.position.y - point.y;
      return Math.hypot(dx, dy) >= SPAWN_MIN_CLEARANCE;
    });
  }) || null;
}

function isPointClearOfBalls(point, clearance, ignoredBody = null) {
  return balls.every((ball) => {
    if (ball.body === ignoredBody) {
      return true;
    }
    const dx = ball.body.position.x - point.x;
    const dy = ball.body.position.y - point.y;
    return Math.hypot(dx, dy) >= clearance;
  });
}

function findInteriorReturnPoint(ignoredBody = null) {
  const rowSpacing = BODY_RADIUS * 1.28;
  const colSpacing = BODY_RADIUS * 1.5;
  for (let row = 0; row < 8; row += 1) {
    const y = 330 + row * rowSpacing;
    if (y > 620) {
      break;
    }
    const limits = getBottleXLimitsAtY(y);
    const columns = Math.max(1, Math.floor((limits.right - limits.left) / colSpacing) + 1);
    const rowOffset = ((row % 2) - 0.5) * colSpacing * 0.28;
    for (let col = 0; col < columns; col += 1) {
      const centeredCol = (col + row) % columns;
      const x = limits.left + (centeredCol + 0.5) * ((limits.right - limits.left) / columns) + rowOffset;
      const point = {
        x: Math.max(limits.left, Math.min(limits.right, x)),
        y,
      };
      if (isPointClearOfBalls(point, BODY_RADIUS * 0.98, ignoredBody)) {
        return point;
      }
    }
  }

  const fallbackY = 376;
  const fallbackLimits = getBottleXLimitsAtY(fallbackY);
  return {
    x: fallbackLimits.left + Math.random() * (fallbackLimits.right - fallbackLimits.left),
    y: fallbackY,
  };
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
  Body.setPosition(body, findInteriorReturnPoint(body));
  Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.12, y: 0.22 });
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
  const context = ensureAudioContextSync();
  if (!context) {
    return null;
  }

  const response = await fetch(path, { cache: "force-cache" });
  const arrayBuffer = await response.arrayBuffer();
  return context.decodeAudioData(arrayBuffer);
}

async function loadSoundBuffers() {
  await Promise.all([
    linkBuffer ? Promise.resolve() : loadAudioBuffer(CONNECT_SOUND_PATH).then((buffer) => {
      linkBuffer = buffer;
    }),
    popBuffer ? Promise.resolve() : loadAudioBuffer(SHORT_CLEAR_SOUND_PATH).then((buffer) => {
      popBuffer = buffer;
    }),
    popBigBuffer ? Promise.resolve() : loadAudioBuffer(LONG_CLEAR_SOUND_PATH).then((buffer) => {
      popBigBuffer = buffer;
    }),
  ]);
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
  unlockHtmlAudio(popBigSound);
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
    unlockHtmlAudio(popBigSound);
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

function removeLastSelectedBall() {
  const removed = selectedBalls.pop();
  if (!removed) {
    return;
  }

  removed.view.scale.set(1);
  selectedBodyIds.delete(removed.body.id);
  triggerHaptic(18);
  redrawConnectionLine();
}

function addOrBacktrackSelectedBall(ball) {
  if (!ball) {
    return;
  }

  const last = selectedBalls[selectedBalls.length - 1];
  const previous = selectedBalls[selectedBalls.length - 2];
  if (last?.body.id === ball.body.id) {
    return;
  }

  if (previous?.body.id === ball.body.id) {
    removeLastSelectedBall();
    return;
  }

  addSelectedBall(ball);
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

function triggerPhysicsQuake(origin, chainLength) {
  const strength = Math.min(0.15, 0.075 + chainLength * 0.01);
  const lift = Math.min(8.5, 4.8 + chainLength * 0.45);

  for (const ball of balls) {
    const body = ball.body;
    const dx = body.position.x - origin.x;
    const dy = body.position.y - origin.y;
    const distance = Math.max(52, Math.hypot(dx, dy));
    const radial = Math.min(1.25, 260 / distance);
    const sidePulse = (Math.random() - 0.5) * strength * 0.65;
    Body.applyForce(body, body.position, {
      x: ((dx / distance) * strength * radial + sidePulse) * body.mass,
      y: ((dy / distance) * strength * radial - strength * 1.15) * body.mass,
    });
    Body.setVelocity(body, {
      x: body.velocity.x + (dx / distance) * lift * radial + (Math.random() - 0.5) * lift,
      y: body.velocity.y - lift * (0.8 + Math.random() * 0.55),
    });
    Body.setAngularVelocity(body, body.angularVelocity + (Math.random() - 0.5) * 0.9);
  }

  triggerVisualShake(24 + chainLength * 2, 14 + chainLength * 1.8);
}

function getChainCenter(chain) {
  if (chain.length === 0) {
    return { x: DESIGN_WIDTH / 2, y: DESIGN_HEIGHT / 2 };
  }

  return chain.reduce((center, ball) => ({
    x: center.x + ball.body.position.x / chain.length,
    y: center.y + ball.body.position.y / chain.length,
  }), { x: 0, y: 0 });
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

function cancelPendingHeroSkill() {
  pendingHeroSkill = null;
  pendingSkillPoint = null;
  if (skillPreviewLine) {
    skillPreviewLine.clear();
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

function drawSkillPreview(point) {
  if (!skillPreviewLine || !pendingHeroSkill || !point) {
    return;
  }

  skillPreviewLine.clear();
  const color = currentLevel?.background?.accent || 0xfff176;
  if (pendingHeroSkill.skill === "shock" || pendingHeroSkill.skill === "convert") {
    skillPreviewLine.beginFill(color, 0.16);
    skillPreviewLine.drawCircle(point.x, point.y, pendingHeroSkill.skill === "shock" ? 120 : 92);
    skillPreviewLine.endFill();
    skillPreviewLine.lineStyle({ width: 6, color: 0xffffff, alpha: 0.82 });
    skillPreviewLine.drawCircle(point.x, point.y, pendingHeroSkill.skill === "shock" ? 120 : 92);
    return;
  }

  skillPreviewLine.lineStyle({ width: 22, color, alpha: 0.32, cap: "round" });
  if (pendingHeroSkill.skill === "vertical") {
    skillPreviewLine.moveTo(point.x, 236);
    skillPreviewLine.lineTo(point.x, BOTTOM_SAFE_Y + 12);
  } else {
    skillPreviewLine.moveTo(42, point.y);
    skillPreviewLine.lineTo(DESIGN_WIDTH - 42, point.y);
  }

  skillPreviewLine.lineStyle({ width: 6, color: 0xffffff, alpha: 0.92, cap: "round" });
  if (pendingHeroSkill.skill === "vertical") {
    skillPreviewLine.moveTo(point.x, 236);
    skillPreviewLine.lineTo(point.x, BOTTOM_SAFE_Y + 12);
  } else {
    skillPreviewLine.moveTo(42, point.y);
    skillPreviewLine.lineTo(DESIGN_WIDTH - 42, point.y);
  }
}

function handlePointerDown(event) {
  if (!gameStarted || pausedByMenu) {
    return;
  }

  activateMobileSession();
  const point = getPointerPosition(event);
  if (pendingHeroSkill) {
    pendingSkillPoint = point;
    drawSkillPreview(point);
    return;
  }

  isDragging = true;
  clearSelection();
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
    addOrBacktrackSelectedBall(ball);
  }
  redrawConnectionLine();
}

function handlePointerMove(event) {
  if (!gameStarted || pausedByMenu) {
    clearSelection();
    cancelPendingHeroSkill();
    isDragging = false;
    lastPointerPosition = null;
    dragPointerPosition = null;
    return;
  }

  if (pendingHeroSkill) {
    const point = getPointerPosition(event);
    pendingSkillPoint = point;
    drawSkillPreview(point);
    return;
  }

  if (!isDragging || !lastPointerPosition) {
    return;
  }

  const point = getPointerPosition(event);
  dragPointerPosition = point;
  for (const ball of findTouchedBalls(lastPointerPosition, point)) {
    addOrBacktrackSelectedBall(ball);
  }
  lastPointerPosition = point;
  redrawConnectionLine();
}

function handlePointerUp() {
  if (!gameStarted || pausedByMenu) {
    clearSelection();
    cancelPendingHeroSkill();
    isDragging = false;
    lastPointerPosition = null;
    dragPointerPosition = null;
    return;
  }

  if (pendingHeroSkill) {
    executeTargetedHeroSkill(pendingSkillPoint);
    return;
  }

  if (!isDragging) {
    return;
  }

  isDragging = false;
  lastPointerPosition = null;

  if (selectedBalls.length >= 2) {
    playPopSound(selectedBalls.length);
    explodeSelectedBalls();
  } else {
    dragPointerPosition = null;
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

function playPopSound(chainLength) {
  const longClear = chainLength >= 5;
  playSyntheticPop(longClear ? 0.42 : 0.34, longClear ? 390 : 330, longClear ? 0.13 : 0.11);
  setTimeout(() => playSyntheticPop(longClear ? 0.26 : 0.2, longClear ? 210 : 180, 0.09), 38);
  if (longClear) {
    playSoundBuffer(popBigBuffer, 0.9) || playHtmlSound(popBigSound) || playSoundBuffer(popBuffer, 0.95) || playHtmlSound(popSound);
    return;
  }
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

function addHeroEnergy(amount) {
  heroEnergy = Math.min(HERO_MAX_ENERGY, heroEnergy + amount);
  updateHeroUi();
}

function removeBall(ball, withParticles = true) {
  if (withParticles) {
    burstParticles(ball.body.position.x, ball.body.position.y);
  }
  Composite.remove(engine.world, ball.body);
  ball.view.destroy({ children: true });
}

function getObstacleMaxHp(obstacle) {
  const abilityHp = obstacle.ability === "spinner"
    ? 5
    : obstacle.ability === "bumper"
      ? 4
      : 3;
  const levelBonus = Math.min(2, Math.floor((currentLevel?.id || 1) / 12));
  const shapeBonus = obstacle.type === "bar" ? 1 : 0;
  return abilityHp + levelBonus + shapeBonus;
}

function damageNearbyObstacles(removingBalls, scoreMultiplier = 100) {
  if (removingBalls.length < MIN_OBSTACLE_DAMAGE_CHAIN || !levelObstacleViews.length) {
    return;
  }

  const center = removingBalls.reduce((point, ball) => ({
    x: point.x + ball.body.position.x / removingBalls.length,
    y: point.y + ball.body.position.y / removingBalls.length,
  }), { x: 0, y: 0 });
  const skillClear = scoreMultiplier >= 120;
  const hitRadius = (skillClear ? 92 : 66) + Math.min(skillClear ? 74 : 46, removingBalls.length * (skillClear ? 5 : 4));
  const damage = skillClear
    ? Math.max(2, Math.floor(removingBalls.length / 7))
    : Math.max(1, Math.floor((removingBalls.length - MIN_OBSTACLE_DAMAGE_CHAIN) / 4) + 1);
  const hitIndexes = [];

  levelObstacleViews.forEach((view, index) => {
    const distance = Math.hypot(view.position.x - center.x, view.position.y - center.y);
    if (distance <= hitRadius) {
      hitIndexes.push(index);
    }
  });

  for (let i = hitIndexes.length - 1; i >= 0; i -= 1) {
    const index = hitIndexes[i];
    const view = levelObstacleViews[index];
    const body = levelObstacleBodies[index];
    burstParticles(view.position.x, view.position.y);
    view._hp = Math.max(0, (view._hp ?? 1) - damage);
    view._damageFlash = 14;
    if (view._hp <= 0) {
      Composite.remove(engine.world, body);
      view.destroy({ children: true });
      levelObstacleViews.splice(index, 1);
      levelObstacleBodies.splice(index, 1);
      score += 180;
    } else {
      score += 24 * damage;
    }
  }

  if (hitIndexes.length) {
    triggerVisualShake(10, 7);
  }
}

function removeBalls(removingBalls, scoreMultiplier = 100) {
  const removing = new Set(removingBalls.map((ball) => ball.body.id));
  const targetClears = removingBalls.filter((ball) => ball.spriteId === currentLevelTargetSpriteId).length;
  for (const ball of removingBalls) {
    removeBall(ball);
  }
  balls = balls.filter((ball) => !removing.has(ball.body.id));
  score += removing.size * scoreMultiplier;
  if (scoreMultiplier > 0) {
    damageNearbyObstacles(removingBalls, scoreMultiplier);
  }
  levelStats.clears += removing.size;
  levelStats.targetClears += targetClears;
  if (gameStarted && scoreMultiplier > 0) {
    queueRefill(removing.size);
  }
  updateScoreText();
  updateGoalText();
  return removing.size;
}

function explodeSelectedBalls() {
  const chain = [...selectedBalls];
  const chainLength = selectedBalls.length;
  const quakeCenter = getChainCenter(chain);
  const bossHitPoint = dragPointerPosition || chain[chain.length - 1]?.body.position;
  const hitBoss = isPointNearBoss(bossHitPoint);
  triggerHaptic([90, 50, 130]);

  for (const ball of chain) {
    triggerBallShake(ball, 14);
  }

  removeBalls(chain);
  levelStats.maxCombo = Math.max(levelStats.maxCombo, chainLength);
  addHeroEnergy(10 + chainLength * 9);
  if (hitBoss) {
    applyBossDamage(36 + chainLength * 42, bossState.position);
  }
  if (chainLength >= 5) {
    levelStats.shockClears += 1;
    triggerPhysicsQuake(quakeCenter, chainLength);
  }
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

function startTargetedHeroSkill() {
  pendingHeroSkill = selectedHero;
  pendingSkillPoint = null;
  clearSelection();
  if (heroEnergyText) {
    heroEnergyText.text = "滑动选择区域，松手释放";
  }
  drawSkillPreview({ x: DESIGN_WIDTH / 2, y: DESIGN_HEIGHT * 0.58 });
}

function animateSkillSweep(axis, value, color = 0xfff176) {
  const sweep = new PIXI.Graphics();
  sweep.lineStyle({ width: 16, color, alpha: 0.35, cap: "round" });
  if (axis === "vertical") {
    sweep.moveTo(value, 226);
    sweep.lineTo(value, BOTTOM_SAFE_Y + 20);
    for (let y = 260; y < BOTTOM_SAFE_Y; y += 54) {
      makeStarParticle(value + (Math.random() - 0.5) * 18, y);
    }
  } else {
    sweep.moveTo(40, value);
    sweep.lineTo(DESIGN_WIDTH - 40, value);
    for (let x = 58; x < DESIGN_WIDTH - 40; x += 54) {
      makeStarParticle(x, value + (Math.random() - 0.5) * 18);
    }
  }

  sweep.lineStyle({ width: 6, color: 0xffffff, alpha: 0.9, cap: "round" });
  if (axis === "vertical") {
    sweep.moveTo(value, 226);
    sweep.lineTo(value, BOTTOM_SAFE_Y + 20);
  } else {
    sweep.moveTo(40, value);
    sweep.lineTo(DESIGN_WIDTH - 40, value);
  }
  sweep.zIndex = 34;
  particleLayer.addChild(sweep);
  particles.push({ view: sweep, vx: 0, vy: 0, spin: 0, life: 24, maxLife: 24 });
}

function animateSkillRing(x, y, color = 0x73f7cf) {
  const ring = new PIXI.Graphics();
  ring.lineStyle(10, color, 0.9);
  ring.drawCircle(0, 0, 42);
  ring.position.set(x, y);
  ring.zIndex = 34;
  particleLayer.addChild(ring);
  particles.push({ view: ring, vx: 0, vy: 0, spin: 0, life: 32, maxLife: 32 });
}

function spendHeroSkillEnergy() {
  heroEnergy = 0;
  triggerHaptic([60, 35, 100]);
  playPopSound(5);
}

function executeTargetedHeroSkill(point) {
  if (!pendingHeroSkill || heroEnergy < HERO_MAX_ENERGY) {
    cancelPendingHeroSkill();
    return;
  }

  const skill = pendingHeroSkill.skill;
  const target = point || { x: DESIGN_WIDTH / 2, y: DESIGN_HEIGHT * 0.58 };
  spendHeroSkillEnergy();
  if (skill === "vertical") {
    const x = Math.max(58, Math.min(DESIGN_WIDTH - 58, target.x));
    animateSkillSweep("vertical", x, 0xfff176);
    const targets = balls.filter((ball) => Math.abs(ball.body.position.x - x) < 76);
    removeBalls(targets.slice(0, 20), 120);
    if (bossState && Math.abs(bossState.position.x - x) < bossState.radius + 76) {
      applyBossDamage(210, bossState.position);
    }
  } else if (skill === "horizontal") {
    const y = Math.max(250, Math.min(BOTTOM_SAFE_Y, target.y));
    animateSkillSweep("horizontal", y, 0x9bf6ff);
    const targets = balls.filter((ball) => Math.abs(ball.body.position.y - y) < 76);
    removeBalls(targets.slice(0, 20), 120);
    if (bossState && Math.abs(bossState.position.y - y) < bossState.radius + 76) {
      applyBossDamage(210, bossState.position);
    }
  } else if (skill === "shock") {
    animateSkillRing(target.x, target.y, 0xa7f2ff);
    triggerPhysicsQuake(target, 9);
    const targets = balls.filter((ball) => Math.hypot(ball.body.position.x - target.x, ball.body.position.y - target.y) < 148);
    removeBalls(shuffle(targets).slice(0, 12), 130);
    if (isPointNearBoss(target) || (bossState && Math.hypot(bossState.position.x - target.x, bossState.position.y - target.y) < 210)) {
      applyBossDamage(260, bossState.position);
    }
  } else if (skill === "convert") {
    animateSkillRing(target.x, target.y, 0x73f7cf);
    const targets = shuffle(balls.filter((ball) => Math.hypot(ball.body.position.x - target.x, ball.body.position.y - target.y) < 132))
      .slice(0, Math.min(14, balls.length));
    for (const ball of targets) {
      ball.spriteId = selectedHero.assetId;
      ball.view.destroy({ children: true });
      ball.view = makeCircularSprite(selectedHeroTexture, selectedHero.assetId === currentLevelTargetSpriteId);
      ball.view.zIndex = 3;
      app.stage.addChild(ball.view);
      ball.view.position.set(ball.body.position.x, ball.body.position.y);
      burstParticles(ball.body.position.x, ball.body.position.y);
    }
    triggerPhysicsQuake(target, 5);
    if (isPointNearBoss(target)) {
      applyBossDamage(150, bossState.position);
    }
  }

  cancelPendingHeroSkill();
  updateHeroUi();
  if (isLevelComplete()) {
    finishLevel(true);
  }
}

function useHeroSkill() {
  if (!gameStarted || heroEnergy < HERO_MAX_ENERGY) {
    return;
  }

  startTargetedHeroSkill();
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
  skillPreviewLine = new PIXI.Graphics();
  particleLayer = new PIXI.Container();

  lineGlow.zIndex = 30;
  lineCore.zIndex = 31;
  lineNodes.zIndex = 32;
  skillPreviewLine.zIndex = 33;
  particleLayer.zIndex = 11;

  app.stage.addChild(lineGlow);
  app.stage.addChild(lineCore);
  app.stage.addChild(lineNodes);
  app.stage.addChild(skillPreviewLine);
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

  popSound = new Audio(SHORT_CLEAR_SOUND_PATH);
  popSound.preload = "auto";
  popSound.volume = 0.9;
  popSound.load();

  popBigSound = new Audio(LONG_CLEAR_SOUND_PATH);
  popBigSound.preload = "auto";
  popBigSound.volume = 0.9;
  popBigSound.load();

  loadSoundBuffers().catch(() => {});
}

function syncSprites() {
  const now = performance.now();
  const escapedBalls = [];
  for (const ball of balls) {
    if (isOutsideBottleSafetyZone(ball.body)) {
      escapedBalls.push(ball);
      continue;
    }
    ball.view.position.set(ball.body.position.x, ball.body.position.y);
    ball.view.rotation = ball.body.angle;
  }
  if (escapedBalls.length) {
    for (const ball of escapedBalls) {
      returnEscapedBall(ball.body);
      ball.view.position.set(ball.body.position.x, ball.body.position.y);
      ball.view.rotation = ball.body.angle;
    }
  }

  if (isDragging) {
    redrawConnectionLine();
  }
  if (bossContainer && bossState) {
    bossContainer.y = bossState.position.y + Math.sin(now / 460) * 5;
    const pulse = 1 + Math.sin(now / 260) * 0.025;
    bossContainer.scale.set(pulse);
  }
  for (const view of levelObstacleViews) {
    const pulse = 1 + Math.sin(now / 240) * 0.045;
    const hpRatio = view._maxHp ? Math.max(0.32, view._hp / view._maxHp) : 1;
    if (view._damageFlash > 0) {
      view._damageFlash -= 1;
      view.alpha = 0.74 + Math.abs(Math.sin(now / 38)) * 0.26;
    } else {
      view.alpha = 1;
    }
    if (view._aura) {
      view._aura.scale.set(pulse);
      view._aura.alpha = (0.5 + hpRatio * 0.28) + Math.sin(now / 180) * 0.14;
    }
    if (view._ability === "bumper") {
      view.scale.set(1 + Math.sin(now / 220) * 0.035);
    } else {
      view.scale.set(1);
    }
    if (view._ability === "spinner") {
      view.rotation = view._baseRotation + Math.sin(now / 520) * 0.08;
      if (view._mark) {
        view._mark.rotation += 0.08;
      }
    } else if (view._mark) {
      view._mark.rotation = Math.sin(now / 360) * 0.1;
    }
    if (view._mark) {
      view._mark.alpha = 0.3 + hpRatio * 0.42;
    }
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
  cancelPendingHeroSkill();
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

function getVillainObstacleConfig(index) {
  const levelId = currentLevel?.id || 1;
  const roster = VILLAIN_ROSTER.length ? VILLAIN_ROSTER : [{ name: "邪恶松松", assetId: VILLAIN_SPRITE_IDS[0] }];
  const villain = roster[(levelId * 5 + index * 3) % roster.length];
  const abilities = levelId >= 8
    ? ["blocker", "bumper", "spinner"]
    : levelId >= 4
      ? ["blocker", "bumper"]
      : ["blocker"];
  return {
    ...villain,
    ability: abilities[index % abilities.length],
  };
}

function getObstacleRandom(index, salt) {
  return seededRandom(obstacleLayoutSeed + (currentLevel?.id || 1) * 97 + index * 31 + salt * 17);
}

function varyObstacleForLevel(obstacle, index) {
  const baseRadius = obstacle.type === "bar"
    ? Math.max(26, Math.min(34, (obstacle.height || 10) * 2.8))
    : Math.max(25, Math.min(35, (obstacle.radius || 14) * 1.9));
  const y = clamp(
    obstacle.y + (getObstacleRandom(index, 1) - 0.5) * (obstacle.type === "bar" ? 76 : 94),
    356,
    BOTTOM_SAFE_Y - baseRadius,
  );
  const limits = getBottleXLimitsAtY(y);
  const span = obstacle.type === "bar" ? Math.min(116, (obstacle.width || 92) * 0.56) : baseRadius;
  const x = clamp(
    obstacle.x + (getObstacleRandom(index, 2) - 0.5) * 82,
    limits.left + span,
    limits.right - span,
  );
  const angle = (obstacle.angle || 0) + (getObstacleRandom(index, 3) - 0.5) * (obstacle.type === "bar" ? 0.42 : 0.18);

  return {
    ...obstacle,
    x,
    y,
    angle,
  };
}

function makeObstacleUnits(obstacle) {
  if (obstacle.type !== "bar") {
    const radius = Math.max(25, Math.min(35, (obstacle.radius || 14) * 1.9));
    return [{ ...obstacle, radius, visualSize: radius * 2 }];
  }

  const width = obstacle.width || 92;
  const count = width >= 108 ? 3 : 2;
  const radius = Math.max(24, Math.min(32, width / (count * 2.05)));
  const spacing = Math.min(48, width / Math.max(1, count - 0.25));
  const cos = Math.cos(obstacle.angle || 0);
  const sin = Math.sin(obstacle.angle || 0);
  return Array.from({ length: count }, (_, unitIndex) => {
    const offset = (unitIndex - (count - 1) / 2) * spacing;
    return {
      ...obstacle,
      unitIndex,
      radius,
      visualSize: radius * 2,
      x: obstacle.x + cos * offset,
      y: obstacle.y + sin * offset,
      angle: obstacle.angle || 0,
    };
  });
}

function createObstacleIcon(assetId, size, ability = "blocker") {
  const container = new PIXI.Container();
  const abilityColor = ability === "bumper"
    ? 0xffd66e
    : ability === "spinner"
      ? 0x73f7cf
      : 0xff4f5f;
  const aura = new PIXI.Graphics();
  aura.beginFill(abilityColor, 0.16);
  aura.drawCircle(0, 0, size * 0.68);
  aura.endFill();
  aura.lineStyle(5, abilityColor, 0.54);
  aura.drawCircle(0, 0, size * 0.57);

  const shadow = new PIXI.Graphics();
  shadow.beginFill(0x030507, 0.42);
  shadow.drawCircle(3, 5, size * 0.49);
  shadow.endFill();

  const badge = new PIXI.Graphics();
  badge.beginFill(0x17070c, 0.86);
  badge.drawCircle(0, 0, size * 0.48);
  badge.endFill();
  badge.lineStyle(3, 0xffffff, 0.3);
  badge.drawCircle(0, 0, size * 0.48);

  const sprite = new PIXI.Sprite(obstacleTextures.get(assetId) || PIXI.Texture.from(`assets/${assetId}.png`));
  sprite.anchor.set(0.5);
  sprite.width = size * 0.9;
  sprite.height = size * 0.9;
  sprite.tint = ability === "blocker" ? 0xffd8de : 0xffffff;

  const mark = new PIXI.Graphics();
  mark.lineStyle(5, abilityColor, 0.95);
  if (ability === "bumper") {
    mark.drawCircle(0, 0, size * 0.31);
  } else if (ability === "spinner") {
    mark.moveTo(-size * 0.28, 0);
    mark.lineTo(size * 0.28, 0);
    mark.moveTo(0, -size * 0.28);
    mark.lineTo(0, size * 0.28);
  } else {
    mark.moveTo(-size * 0.25, -size * 0.25);
    mark.lineTo(size * 0.25, size * 0.25);
    mark.moveTo(size * 0.25, -size * 0.25);
    mark.lineTo(-size * 0.25, size * 0.25);
  }
  mark.alpha = 0.62;

  container.addChild(aura, shadow, badge, sprite, mark);
  container._aura = aura;
  container._mark = mark;
  container._spinIcon = sprite;
  return container;
}

function createObstacleView(obstacle) {
  const view = new PIXI.Container();
  const icon = createObstacleIcon(obstacle.assetId, obstacle.visualSize || obstacle.radius * 2, obstacle.ability);
  view.addChild(icon);

  view.position.set(obstacle.x, obstacle.y);
  view.zIndex = 5;
  view._ability = obstacle.ability;
  view._maxHp = getObstacleMaxHp(obstacle);
  view._hp = view._maxHp;
  view._damageFlash = 0;
  view._baseScale = 1;
  view._baseRotation = 0;
  view._spinIcon = icon._spinIcon;
  view._aura = icon._aura;
  view._mark = icon._mark;
  return view;
}

function createLevelObstacles() {
  clearLevelObstacles();
  if (!obstacleLayer) {
    obstacleLayer = new PIXI.Container();
    obstacleLayer.zIndex = 5;
    app.stage.addChild(obstacleLayer);
  }

  for (const [index, obstacleBase] of (currentLevel?.obstacles || []).entries()) {
    const obstacle = varyObstacleForLevel({
      ...obstacleBase,
      ...getVillainObstacleConfig(index),
    }, index);
    const restitution = obstacle.ability === "bumper" ? 0.62 : 0.34;
    const friction = obstacle.ability === "blocker" ? 0.02 : 0;
    for (const unit of makeObstacleUnits(obstacle)) {
      const collisionRadius = unit.radius * 0.96;
      const body = Bodies.circle(unit.x, unit.y, collisionRadius, {
        isStatic: true,
        restitution,
        friction,
        frictionStatic: 0,
        slop: 0.12,
      });
      const view = createObstacleView(unit);
      Composite.add(engine.world, body);
      obstacleLayer.addChild(view);
      levelObstacleBodies.push(body);
      levelObstacleViews.push(view);
    }
  }
}

function clearBoss() {
  if (bossContainer) {
    bossContainer.destroy({ children: true });
    bossContainer = null;
  }
  bossSprite = null;
  bossHpBar = null;
  bossHpText = null;
  bossState = null;
}

async function setupBossForLevel() {
  clearBoss();
  if (!currentLevel?.boss) {
    return;
  }

  const boss = currentLevel.boss;
  bossState = {
    name: boss.name,
    hp: boss.hp,
    maxHp: boss.hp,
    position: { x: DESIGN_WIDTH / 2, y: 318 },
    radius: 78,
  };

  bossContainer = new PIXI.Container();
  bossContainer.zIndex = 12;
  const aura = new PIXI.Graphics();
  aura.beginFill(0xff253f, 0.2);
  aura.drawCircle(0, 0, 106);
  aura.endFill();
  aura.lineStyle(8, 0xff4f5f, 0.34);
  aura.drawCircle(0, 0, 96);
  bossContainer.addChild(aura);

  let texture = PIXI.Texture.WHITE;
  if (PIXI.Assets && PIXI.Assets.load) {
    texture = await PIXI.Assets.load(`assets/${boss.assetId}.png`).catch(() => PIXI.Texture.WHITE);
  }
  bossSprite = new PIXI.Sprite(texture);
  bossSprite.anchor.set(0.5);
  bossSprite.width = 156;
  bossSprite.height = 156;
  bossSprite.tint = 0xff5a5f;
  bossContainer.addChild(bossSprite);

  bossHpBar = new PIXI.Graphics();
  bossContainer.addChild(bossHpBar);
  bossHpText = new PIXI.Text("", {
    fill: 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 13,
    fontWeight: "800",
    align: "center",
  });
  bossHpText.anchor.set(0.5, 0.5);
  bossHpText.position.set(0, -96);
  bossContainer.addChild(bossHpText);

  bossContainer.position.set(bossState.position.x, bossState.position.y);
  app.stage.addChild(bossContainer);
  updateBossUi();
}

function updateBossUi() {
  if (!bossState || !bossHpBar || !bossHpText) {
    return;
  }

  const ratio = Math.max(0, Math.min(1, bossState.hp / bossState.maxHp));
  bossHpBar.clear();
  bossHpBar.beginFill(0x13070a, 0.9);
  bossHpBar.drawRoundedRect(-86, -116, 172, 16, 8);
  bossHpBar.endFill();
  bossHpBar.beginFill(ratio > 0.35 ? 0xff4f5f : 0xffd66e, 0.98);
  bossHpBar.drawRoundedRect(-84, -114, 168 * ratio, 12, 6);
  bossHpBar.endFill();
  bossHpText.text = `${bossState.name}  ${Math.max(0, Math.ceil(bossState.hp))}/${bossState.maxHp}`;
}

function isPointNearBoss(point) {
  if (!bossState || !point) {
    return false;
  }
  return Math.hypot(point.x - bossState.position.x, point.y - bossState.position.y) <= bossState.radius + BALL_RADIUS * 0.9;
}

function applyBossDamage(amount, origin = bossState?.position) {
  if (!bossState || amount <= 0 || bossState.hp <= 0) {
    return 0;
  }

  const damage = Math.min(bossState.hp, Math.floor(amount));
  bossState.hp -= damage;
  score += damage * 10;
  updateBossUi();
  updateScoreText();
  updateGoalText();
  if (origin) {
    burstParticles(origin.x, origin.y);
  }
  if (bossSprite) {
    bossSprite.tint = bossState.hp <= 0 ? 0xffffff : 0xff3038;
  }
  triggerVisualShake(16, 9);
  if (bossState.hp <= 0 && bossContainer) {
    bossContainer.alpha = 0.45;
  }
  return damage;
}

async function startLevel(level) {
  if (!level || levelStartInProgress) {
    return;
  }

  levelStartInProgress = true;
  gameStarted = false;
  try {
    hideLevelSelect();
    hideResultOverlay();
    hidePauseMenu();
    currentLevel = level;
    currentLevelTargetSpriteId = null;
    levelTimeLeftMs = Number.isFinite(level.duration) ? level.duration * 1000 : Infinity;
    levelEndReason = "";
    countdownLastSecond = 0;
    if (countdownText) {
      countdownText.text = "";
      countdownText.alpha = 0;
    }
    pausedByMenu = false;
    levelStats = { targetClears: 0, clears: 0, maxCombo: 0, shockClears: 0 };
    heroEnergy = 0;
    refillTimer = 0;
    pendingRefillCount = 0;
    obstacleLayoutSeed = Math.floor(Math.random() * 1000000) + level.id * 1009;
    clearBalls();
    clearParticles();
    clearLevelObstacles();
    clearBoss();
    score = 0;
    updateScoreText();
    updateGoalText();
    drawBackground();
    await Promise.all([loadRoundTextures(), loadHeroTexture(), loadLevelObstacleTextures(level)]);
    createLevelObstacles();
    currentLevelTargetSpriteId = level.goals.targetClears ? selectedSpriteIds[0] : null;
    await setupBossForLevel();
    createInitialBoardBalls();
    updateHudForLevel();
    updateHeroUi();
    gameStarted = true;
  } finally {
    levelStartInProgress = false;
  }
}

async function restartGame() {
  if (!currentLevel) {
    return;
  }
  await startLevel(currentLevel);
}

function hidePauseMenu() {
  if (pauseOverlay) {
    pauseOverlay.destroy({ children: true });
    pauseOverlay = null;
  }
  pausedByMenu = false;
}

function showPauseMenu() {
  if (!currentLevel || pauseOverlay) {
    return;
  }
  pausedByMenu = true;
  clearSelection();
  cancelPendingHeroSkill();

  pauseOverlay = new PIXI.Container();
  pauseOverlay.zIndex = 88;
  const shade = new PIXI.Graphics();
  shade.beginFill(0x061018, 0.72);
  shade.drawRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  shade.endFill();
  shade.eventMode = "static";
  pauseOverlay.addChild(shade);

  const panel = new PIXI.Graphics();
  panel.beginFill(0x111923, 0.97);
  panel.lineStyle(2, 0xffd66e, 0.55);
  panel.drawRoundedRect(44, 294, DESIGN_WIDTH - 88, 300, 8);
  panel.endFill();
  pauseOverlay.addChild(panel);

  const title = new PIXI.Text("暂停", {
    fill: 0xfff176,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 32,
    fontWeight: "800",
  });
  title.anchor.set(0.5, 0);
  title.position.set(DESIGN_WIDTH / 2, 326);
  pauseOverlay.addChild(title);

  const resume = createButton("继续", 78, 392, 120, 48, hidePauseMenu, { fill: 0x2d5f58, line: 0x73f7cf });
  const retry = createButton("重试", 232, 392, 120, 48, () => restartGame().catch(showFatalError), { fill: 0x27313d, line: 0x9fd6ff });
  const levels = createButton("选择关卡", 78, 470, 120, 48, showLevelSelect, { fill: 0x27313d, line: 0x9fd6ff, fontSize: 14 });
  const home = createButton("返回首页", 232, 470, 120, 48, showLevelSelect, { fill: 0x7a3047, line: 0xffd66e, fontSize: 14 });
  pauseOverlay.addChild(resume, retry, levels, home);
  app.stage.addChild(pauseOverlay);
}

function createHud() {
  const topBar = new PIXI.Graphics();
  topBar.beginFill(0x0b1118, 0.34);
  topBar.drawRoundedRect(18, HUD_TOP, DESIGN_WIDTH - 36, 58, 16);
  topBar.endFill();
  topBar.zIndex = 20;
  app.stage.addChild(topBar);

  const title = new PIXI.Text("松松掉落", {
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

  countdownText = new PIXI.Text("", {
    fill: 0xffffff,
    fontSize: 128,
    fontWeight: "900",
    align: "center",
    stroke: 0xffd66e,
    strokeThickness: 8,
    dropShadow: true,
    dropShadowColor: 0x000000,
    dropShadowAlpha: 0.38,
    dropShadowBlur: 14,
  });
  countdownText.anchor.set(0.5);
  countdownText.position.set(DESIGN_WIDTH / 2, DESIGN_HEIGHT * 0.44);
  countdownText.alpha = 0;
  countdownText.zIndex = 90;
  countdownText.eventMode = "none";
  app.stage.addChild(countdownText);

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

  const restart = new PIXI.Text("重开", {
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

  const levels = new PIXI.Text("关卡", {
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

  const pause = new PIXI.Text("Ⅱ", {
    fill: 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 18,
    fontWeight: "900",
  });
  pause.anchor.set(1, 0);
  pause.position.set(DESIGN_WIDTH - 94, HUD_TOP + 18);
  pause.eventMode = "static";
  pause.cursor = "pointer";
  pause.zIndex = 21;
  pause.on("pointertap", showPauseMenu);
  app.stage.addChild(pause);

  coinsText = new PIXI.Text("", {
    fill: 0xfff176,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 14,
    fontWeight: "800",
  });
  coinsText.anchor.set(1, 0);
  coinsText.position.set(DESIGN_WIDTH - 130, HUD_TOP + 3);
  coinsText.zIndex = 86;
  app.stage.addChild(coinsText);

  const collection = createButton("图鉴", DESIGN_WIDTH - 104, HUD_TOP + 64, 70, 34, showCollectionBook, {
    fill: 0x7a3047,
    line: 0xffd66e,
    lineAlpha: 0.7,
    textFill: 0xfff7c8,
    fontSize: 14,
  });
  collection.zIndex = 86;
  app.stage.addChild(collection);

  createHeroUi();
  updateCoinsUi();
}

function createHeroUi() {
  heroContainer = new PIXI.Container();
  heroContainer.zIndex = 22;

  const pad = new PIXI.Graphics();
  pad.beginFill(0x071018, 0.58);
  pad.lineStyle(2, 0xffffff, 0.16);
  pad.drawRoundedRect(24, HERO_PANEL_Y, DESIGN_WIDTH - 48, 82, 8);
  pad.endFill();
  heroContainer.addChild(pad);

  heroSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
  heroSprite.anchor.set(0.5);
  heroSprite.width = 64;
  heroSprite.height = 64;
  heroSprite.position.set(76, HERO_PANEL_Y + 41);
  heroSprite.eventMode = "static";
  heroSprite.cursor = "pointer";
  heroSprite.on("pointertap", useHeroSkill);
  heroContainer.addChild(heroSprite);

  heroSkillLabel = new PIXI.Text("", {
    fill: 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 16,
    fontWeight: "800",
  });
  heroSkillLabel.position.set(120, HERO_PANEL_Y + 18);
  heroContainer.addChild(heroSkillLabel);

  heroSkillDesc = new PIXI.Text("", {
    fill: 0xcdf7ff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 12,
    fontWeight: "700",
    wordWrap: true,
    wordWrapWidth: 220,
  });
  heroSkillDesc.position.set(120, HERO_PANEL_Y + 42);
  heroContainer.addChild(heroSkillDesc);

  const energyTrack = new PIXI.Graphics();
  energyTrack.beginFill(0x111820, 0.88);
  energyTrack.drawRoundedRect(120, HERO_PANEL_Y + 66, 250, 12, 6);
  energyTrack.endFill();
  heroContainer.addChild(energyTrack);

  heroEnergyBar = new PIXI.Graphics();
  heroContainer.addChild(heroEnergyBar);

  heroEnergyText = new PIXI.Text("", {
    fill: 0xfff176,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 12,
    fontWeight: "800",
  });
  heroEnergyText.position.set(306, HERO_PANEL_Y + 42);
  heroContainer.addChild(heroEnergyText);

  heroSkillButton = null;
  app.stage.addChild(heroContainer);
  updateHeroUi();
}

function updateHeroUi() {
  if (!heroContainer) {
    return;
  }

  if (heroSprite && selectedHeroTexture) {
    heroSprite.texture = selectedHeroTexture;
    heroSprite.width = 64;
    heroSprite.height = 64;
  }

  if (heroSkillLabel) {
    heroSkillLabel.text = `${selectedHero.name} · ${selectedHero.skillName}`;
  }
  if (heroSkillDesc) {
    heroSkillDesc.text = selectedHero.description;
  }

  const ratio = Math.max(0, Math.min(1, heroEnergy / HERO_MAX_ENERGY));
  if (heroEnergyBar) {
    heroEnergyBar.clear();
    heroEnergyBar.beginFill(ratio >= 1 ? 0xfff176 : 0x73f7cf, 0.95);
    heroEnergyBar.drawRoundedRect(120, HERO_PANEL_Y + 66, 250 * ratio, 12, 6);
    heroEnergyBar.endFill();
  }
  if (heroEnergyText) {
    heroEnergyText.text = ratio >= 1 ? "READY" : `${Math.floor(heroEnergy)}/${HERO_MAX_ENERGY}`;
  }
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
  if (goals.boss && bossState) {
    parts.push(`BOSS ${Math.max(0, bossState.hp)}/${bossState.maxHp}`);
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
  if (goals.shockClears) {
    parts.push(`震波 ${levelStats.shockClears}/${goals.shockClears}`);
  }
  if (currentLevel.infinite) {
    const best = sprintBestScores[String(currentLevel.sprintMinutes)] || 0;
    parts.push(`分数 ${score}`);
    parts.push(`最高 ${best}`);
  }
  goalText.text = parts.join("   ");
}

function updateFinalCountdown(now) {
  if (!countdownText) {
    return;
  }

  if (!gameStarted || pausedByMenu || !Number.isFinite(levelTimeLeftMs) || levelTimeLeftMs > 3000 || levelTimeLeftMs <= 0) {
    countdownText.text = "";
    countdownText.alpha = 0;
    countdownLastSecond = 0;
    return;
  }

  const secondsLeft = Math.max(1, Math.ceil(levelTimeLeftMs / 1000));
  if (secondsLeft !== countdownLastSecond) {
    countdownText.text = String(secondsLeft);
    countdownText.scale.set(1.18);
    countdownLastSecond = secondsLeft;
    triggerHaptic(18);
  }

  countdownText.alpha = 0.46 + Math.abs(Math.sin(now / 110)) * 0.42;
  const scale = Math.max(0.92, countdownText.scale.x - 0.03);
  countdownText.scale.set(scale);
}

function createButton(label, x, y, width, height, onTap, options = {}) {
  const container = new PIXI.Container();
  const bg = new PIXI.Graphics();
  bg.beginFill(options.fill || 0x111820, options.alpha ?? 0.86);
  bg.lineStyle(2, options.line || 0xffffff, options.lineAlpha ?? 0.18);
  bg.drawRoundedRect(0, 0, width, height, 8);
  bg.endFill();
  container.addChild(bg);
  container._buttonBg = bg;
  container._buttonWidth = width;
  container._buttonHeight = height;
  container._buttonOptions = { ...options };

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
  container._buttonText = text;

  container.position.set(x, y);
  container.eventMode = "static";
  container.cursor = "pointer";
  container.on("pointerdown", (event) => event.stopPropagation());
  container.on("pointerup", (event) => event.stopPropagation());
  container.on("pointertap", (event) => {
    event.stopPropagation();
    onTap(event);
  });
  return container;
}

function setButtonStyle(container, options = {}) {
  if (!container?._buttonBg) {
    return;
  }

  container._buttonOptions = { ...container._buttonOptions, ...options };
  const opts = container._buttonOptions;
  const bg = container._buttonBg;
  bg.clear();
  bg.beginFill(opts.fill || 0x111820, opts.alpha ?? 0.86);
  bg.lineStyle(2, opts.line || 0xffffff, opts.lineAlpha ?? 0.18);
  bg.drawRoundedRect(0, 0, container._buttonWidth, container._buttonHeight, 8);
  bg.endFill();
  if (container._buttonText && opts.textFill) {
    container._buttonText.style.fill = opts.textFill;
  }
}

function setCollectionMessage(message) {
  if (collectionMessageText) {
    collectionMessageText.textContent = message || "";
  }
}

function refreshCollectionGrid() {
  if (!collectionGrid) {
    return;
  }

  const cards = collectionGrid.querySelectorAll("[data-sprite-id]");
  cards.forEach((card) => {
    const id = normalizeSpriteId(card.getAttribute("data-sprite-id"));
    card.classList.toggle("locked", !unlockedSprites.has(id));
  });
  if (collectionFilter !== "all") {
    renderCollectionGrid();
  }
  updateCoinsUi();
}

function getCollectionIdsForFilter() {
  const ids = allSpriteIds();
  if (collectionFilter === "unlocked") {
    return ids.filter((id) => unlockedSprites.has(id));
  }
  if (collectionFilter === "locked") {
    return ids.filter((id) => !unlockedSprites.has(id));
  }
  return ids;
}

function setCollectionFilter(filter) {
  collectionFilter = filter;
  const buttons = collectionOverlay ? collectionOverlay.querySelectorAll("[data-collection-filter]") : [];
  buttons.forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-collection-filter") === collectionFilter);
  });
  renderCollectionGrid();
}

function loadCollectionCatalog() {
  if (collectionCatalogMap) {
    return Promise.resolve(collectionCatalogMap);
  }

  if (!collectionCatalogPromise) {
    collectionCatalogPromise = fetch(COLLECTION_CATALOG_PATH, { cache: "force-cache" })
      .then((response) => response.json())
      .then((data) => {
        collectionCatalogMap = new Map(data.items.map((item) => [item.id, item]));
        return collectionCatalogMap;
      })
      .catch(() => {
        collectionCatalogMap = new Map();
        return collectionCatalogMap;
      });
  }

  return collectionCatalogPromise;
}

function loadCollectionCharacterAssets() {
  if (collectionCharacterAssetMap) {
    return Promise.resolve(collectionCharacterAssetMap);
  }

  if (!collectionCharacterAssetPromise) {
    collectionCharacterAssetPromise = fetch(COLLECTION_CHARACTER_ASSET_PATH, { cache: "force-cache" })
      .then((response) => response.json())
      .then((data) => {
        collectionCharacterAssetMap = new Map(data.items.map((item) => [item.id, item]));
        return collectionCharacterAssetMap;
      })
      .catch(() => {
        collectionCharacterAssetMap = new Map();
        return collectionCharacterAssetMap;
      });
  }

  return collectionCharacterAssetPromise;
}

function getCollectionCatalogEntry(id) {
  return collectionCatalogMap?.get(id) || null;
}

function getCollectionCharacterAssetEntry(id) {
  return collectionCharacterAssetMap?.get(id) || null;
}

function getCollectionName(id) {
  return getCollectionCatalogEntry(id)?.name || `No.${id}`;
}

function createDetailImage(src, alt, fallbackSrc = "") {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";
  image.referrerPolicy = "no-referrer";
  if (fallbackSrc && fallbackSrc !== src) {
    image.addEventListener("error", () => {
      image.src = fallbackSrc;
    }, { once: true });
  }
  return image;
}

function createMissingAssetNote(text) {
  const note = document.createElement("div");
  note.className = "collection-asset-missing";
  note.textContent = text;
  return note;
}

function getConfirmedCollectionDetail(detail) {
  return detail?.confirmed === true ? detail : null;
}

function renderCollectionGrid() {
  if (!collectionGrid) {
    return;
  }

  collectionRenderToken += 1;
  const token = collectionRenderToken;
  const ids = getCollectionIdsForFilter();
  let index = 0;
  const batchSize = 42;
  collectionGrid.textContent = "";

  if (!ids.length) {
    const empty = document.createElement("div");
    empty.className = "collection-empty";
    empty.textContent = collectionFilter === "unlocked" ? "还没有已解锁的松松" : "这一页暂时没有内容";
    collectionGrid.appendChild(empty);
    return;
  }

  const appendBatch = () => {
    if (token !== collectionRenderToken || !collectionGrid) {
      return;
    }

    const fragment = document.createDocumentFragment();
    const end = Math.min(index + batchSize, ids.length);
    for (; index < end; index += 1) {
      fragment.appendChild(createCollectionCard(ids[index]));
    }
    collectionGrid.appendChild(fragment);

    if (index < ids.length) {
      window.requestAnimationFrame(appendBatch);
    }
  };

  appendBatch();
}

function createCollectionCard(id) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = `collection-card${unlockedSprites.has(id) ? "" : " locked"}`;
  card.setAttribute("data-sprite-id", String(id));
  const name = getCollectionName(id);
  card.setAttribute("aria-label", `${name} 松松`);

  const image = document.createElement("img");
  image.src = `assets/${id}.png`;
  image.alt = name;
  image.loading = "lazy";
  image.decoding = "async";
  card.appendChild(image);

  const label = document.createElement("span");
  label.textContent = name;
  label.title = name;
  card.appendChild(label);
  card.addEventListener("click", () => {
    if (unlockedSprites.has(id)) {
      showCollectionDetail(id);
      return;
    }
    setCollectionMessage(`${name} 未解锁`);
  });
  return card;
}

async function showCollectionDetail(id) {
  if (!collectionOverlay || !unlockedSprites.has(id)) {
    return;
  }

  if (!collectionDetailLayer) {
    return;
  }

  collectionDetailRenderToken += 1;
  const token = collectionDetailRenderToken;
  collectionDetailLayer.textContent = "";
  const loading = document.createElement("div");
  loading.className = "collection-empty";
  loading.textContent = "加载图鉴原图...";
  collectionDetailLayer.appendChild(loading);

  await Promise.all([
    loadCollectionCatalog(),
    loadCollectionCharacterAssets(),
  ]);
  if (token !== collectionDetailRenderToken || !collectionDetailLayer || !collectionOverlay) {
    return;
  }

  collectionDetailLayer.textContent = "";
  const name = getCollectionName(id);
  const characterAsset = getCollectionCharacterAssetEntry(id);
  const card = document.createElement("section");
  card.className = "collection-detail-card";
  card.setAttribute("aria-label", `${name} 详情`);

  const head = document.createElement("div");
  head.className = "collection-detail-head";
  const title = document.createElement("div");
  title.className = "collection-detail-name";
  title.textContent = name;
  const close = document.createElement("button");
  close.type = "button";
  close.className = "collection-detail-close";
  close.textContent = "×";
  close.addEventListener("click", hideCollectionDetail);
  head.append(title, close);

  const body = document.createElement("div");
  body.className = "collection-detail-body";
  const original = document.createElement("div");
  original.className = "collection-original";
  original.textContent = "加载图鉴原图...";

  const closeups = document.createElement("div");
  closeups.className = "collection-closeups";

  body.append(closeups, original);

  card.append(head, body);
  collectionDetailLayer.appendChild(card);

  const avatarSrc = `assets/${id}.png`;
  const characterSrc = characterAsset?.file || "";
  const originalSrc = await resolveFirstAvailableImage([characterSrc, avatarSrc]);
  if (token !== collectionDetailRenderToken || !collectionDetailLayer || !collectionOverlay) {
    return;
  }

  closeups.textContent = "";
  closeups.appendChild(createDetailImage(avatarSrc, `${name} 松松头像`, characterSrc));

  original.textContent = "";
  if (originalSrc) {
    const image = createDetailImage(originalSrc, `${name} 角色图`, avatarSrc);
    image.className = "collection-classic-image";
    original.appendChild(image);
  } else {
    original.appendChild(createMissingAssetNote(`${name} 暂无可用图鉴资源`));
  }
}

function hideCollectionDetail() {
  collectionDetailRenderToken += 1;
  if (collectionDetailLayer) {
    collectionDetailLayer.textContent = "";
    const empty = document.createElement("div");
    empty.className = "collection-empty";
    empty.textContent = "选择已解锁松松查看图鉴原图";
    collectionDetailLayer.appendChild(empty);
  }
}

function showCollectionBook() {
  ensureCollectionStyles();
  if (collectionOverlay) {
    collectionOverlay.remove();
  }

  collectionOverlay = document.createElement("div");
  collectionOverlay.className = "collection-overlay";
  collectionOverlay.addEventListener("pointerdown", (event) => event.stopPropagation());
  collectionOverlay.addEventListener("touchstart", (event) => event.stopPropagation(), { passive: true });

  const panel = document.createElement("section");
  panel.className = "collection-panel";
  panel.setAttribute("aria-label", "松松图鉴");

  const head = document.createElement("div");
  head.className = "collection-head";

  const titleBlock = document.createElement("div");
  const title = document.createElement("div");
  title.className = "collection-title";
  title.textContent = "松松图鉴";
  titleBlock.appendChild(title);

  const stats = document.createElement("div");
  stats.className = "collection-stats";
  collectionCoinText = document.createElement("span");
  collectionCountText = document.createElement("span");
  stats.append(collectionCoinText, collectionCountText);
  titleBlock.appendChild(stats);

  const close = document.createElement("button");
  close.type = "button";
  close.className = "collection-close";
  close.textContent = "×";
  close.addEventListener("click", hideCollectionBook);

  head.append(titleBlock, close);

  const actions = document.createElement("div");
  actions.className = "collection-actions";
  const gacha = document.createElement("button");
  gacha.type = "button";
  gacha.className = "gacha-button";
  gacha.textContent = `单抽  ${GACHA_COST} 金币`;
  gacha.addEventListener("click", runSingleGacha);
  collectionMessageText = document.createElement("div");
  collectionMessageText.className = "collection-message";
  const filters = document.createElement("div");
  filters.className = "collection-filters";
  [
    ["all", "全部"],
    ["unlocked", "已解锁"],
    ["locked", "未解锁"],
  ].forEach(([value, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `collection-filter${collectionFilter === value ? " active" : ""}`;
    button.setAttribute("data-collection-filter", value);
    button.textContent = label;
    button.addEventListener("click", () => setCollectionFilter(value));
    filters.appendChild(button);
  });
  actions.append(gacha, filters, collectionMessageText);

  collectionGrid = document.createElement("div");
  collectionGrid.className = "collection-grid";

  collectionDetailLayer = document.createElement("div");
  collectionDetailLayer.className = "collection-detail";
  hideCollectionDetail();

  const content = document.createElement("div");
  content.className = "collection-content";
  content.append(collectionGrid, collectionDetailLayer);

  panel.append(head, actions, content);
  collectionOverlay.appendChild(panel);
  document.body.appendChild(collectionOverlay);
  updateCoinsUi();
  renderCollectionGrid();
  loadCollectionCatalog().then(() => renderCollectionGrid());
  setCollectionMessage(`抽中后会点亮对应松松，重复返还 ${DUPLICATE_REFUND} 金币`);
}

function hideCollectionBook() {
  if (collectionOverlay) {
    collectionOverlay.remove();
    collectionOverlay = null;
  }
  collectionGrid = null;
  collectionMessageText = null;
  collectionCountText = null;
  collectionCoinText = null;
  collectionRenderToken += 1;
  collectionDetailLayer = null;
  gachaResultLayer = null;
  gachaAnimating = false;
}

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function preloadGachaFrames() {
  if (!gachaFrameImagesPromise) {
    gachaFrameImagesPromise = Promise.all(GACHA_BALL_FRAME_PATHS.map((path) => (
      loadImage(path)
        .then((image) => ({ src: image.currentSrc || image.src || path }))
        .catch(() => null)
    ))).then((results) => {
      const loadedFrames = results.filter(Boolean);
      return loadedFrames.length
        ? loadedFrames
        : GACHA_BALL_FRAME_PATHS.map((path) => ({ src: path }));
    });
  }
  return gachaFrameImagesPromise;
}

function createGachaBallShell(frameImages) {
  const shell = document.createElement("div");
  shell.className = "gacha-ball-reel";
  const glow = document.createElement("div");
  glow.className = "gacha-ball-flare";
  shell.appendChild(glow);
  const frameNodes = frameImages.map((loadedImage, index) => {
    const frame = document.createElement("img");
    frame.className = `gacha-ball-frame${index === 0 ? " is-active" : ""}`;
    frame.src = loadedImage.src || loadedImage.currentSrc || GACHA_BALL_FRAME_PATHS[index];
    frame.alt = "彩球";
    frame.draggable = false;
    frame.addEventListener("error", () => {
      frame.remove();
      shell._frameNodes = (shell._frameNodes || []).filter((node) => node !== frame);
      if (!shell._frameNodes.some((node) => node.classList.contains("is-active"))) {
        shell._frameNodes[0]?.classList.add("is-active");
        shell._activeFrameIndex = 0;
      }
    }, { once: true });
    shell.appendChild(frame);
    return frame;
  });
  shell._frameNodes = frameNodes;
  shell._activeFrameIndex = 0;
  return shell;
}

async function runSingleGacha() {
  if (gachaAnimating) {
    return;
  }
  if (coins < GACHA_COST) {
    setCollectionMessage(`金币不足，还需要 ${GACHA_COST - coins} 金币`);
    return;
  }

  gachaAnimating = true;
  setCollectionMessage("准备彩球...");

  const resultId = FIRST_SPRITE_ID + Math.floor(Math.random() * TOTAL_SPRITES);
  const isNew = !unlockedSprites.has(resultId);
  let spentCoins = false;

  try {
    await preloadGachaFrames();
    coins -= GACHA_COST;
    spentCoins = true;
    saveCoins();
    await playGachaAnimation(resultId, isNew);
  } catch (error) {
    if (spentCoins) {
      addCoins(GACHA_COST);
    }
    setCollectionMessage("彩球素材加载失败，金币已退回");
    console.error(error);
    if (gachaResultLayer) {
      gachaResultLayer.remove();
      gachaResultLayer = null;
    }
    gachaAnimating = false;
  }
}

async function playGachaAnimation(resultId, isNew) {
  if (!collectionOverlay) {
    gachaAnimating = false;
    return;
  }

  gachaResultLayer = document.createElement("div");
  gachaResultLayer.className = "gacha-stage";
  const inner = document.createElement("div");
  inner.className = "gacha-stage-inner";
  const frameImages = await preloadGachaFrames();
  if (!collectionOverlay) {
    gachaAnimating = false;
    return;
  }
  const ballReel = createGachaBallShell(frameImages);
  ballReel.setAttribute("aria-label", "抽卡彩球");
  const message = document.createElement("div");
  message.className = "gacha-result-text";
  message.textContent = "";
  inner.append(ballReel, message);
  gachaResultLayer.appendChild(inner);
  collectionOverlay.appendChild(gachaResultLayer);

  let frameIndex = 0;
  let frameDirection = 1;
  let lastFrameTime = 0;
  let frameRequest = 0;
  const stepFrames = (timestamp) => {
    const frameNodes = ballReel._frameNodes || [];
    if (!frameNodes.length || !gachaResultLayer) {
      return;
    }
    if (frameIndex >= frameNodes.length) {
      frameIndex = 0;
      frameDirection = 1;
    }
    if (!lastFrameTime || timestamp - lastFrameTime >= 58) {
      frameNodes[frameIndex]?.classList.remove("is-active");
      frameIndex += frameDirection;
      if (frameIndex >= frameNodes.length - 1 || frameIndex <= 0) {
        frameDirection *= -1;
      }
      frameNodes[frameIndex]?.classList.add("is-active");
      ballReel._activeFrameIndex = frameIndex;
      lastFrameTime = timestamp;
    }
    frameRequest = window.requestAnimationFrame(stepFrames);
  };
  frameRequest = window.requestAnimationFrame(stepFrames);

  try {
    await delay(1180);
    if (!gachaResultLayer) {
      return;
    }
    ballReel.classList.add("is-opening");
    message.textContent = "";
    await delay(780);

    await loadImage(`assets/${resultId}.png`).catch(() => {});
    inner.textContent = "";
    const resultImage = document.createElement("img");
    resultImage.className = "gacha-result";
    resultImage.src = `assets/${resultId}.png`;
    resultImage.alt = `松松 ${resultId}`;
    const resultText = document.createElement("div");
    resultText.className = "gacha-result-text";
    inner.append(resultImage, resultText);
    revealGachaResult(resultId, isNew, resultText);
    await delay(1700);
    if (gachaResultLayer) {
      gachaResultLayer.remove();
      gachaResultLayer = null;
    }
  } finally {
    window.cancelAnimationFrame(frameRequest);
  }
  gachaAnimating = false;
}

function revealGachaResult(resultId, isNew, resultText) {
  if (isNew) {
    unlockedSprites.add(resultId);
    saveCollection();
    const resultName = getCollectionName(resultId);
    setCollectionMessage(`恭喜解锁新伙伴！${resultName}`);
    if (resultText) {
      resultText.textContent = `恭喜解锁新伙伴！\n${resultName}`;
    }
  } else {
    addCoins(DUPLICATE_REFUND);
    const resultName = getCollectionName(resultId);
    setCollectionMessage(`${resultName} 已重复，返还 ${DUPLICATE_REFUND} 金币`);
    if (resultText) {
      resultText.textContent = `已重复\n返还 ${DUPLICATE_REFUND} 金币`;
    }
  }
  refreshCollectionGrid();
}

function hideLevelSelect() {
  if (levelSelectContainer) {
    levelSelectContainer.visible = false;
  }
}

function showLevelSelect() {
  if (levelStartInProgress) {
    return;
  }

  gameStarted = false;
  clearSelection();
  cancelPendingHeroSkill();
  hideResultOverlay();
  hidePauseMenu();

  if (levelSelectContainer) {
    levelSelectContainer.destroy({ children: true });
  }

  levelSelectContainer = new PIXI.Container();
  levelSelectContainer.zIndex = 80;

  const shade = new PIXI.Graphics();
  shade.beginFill(0x071018, 0.96);
  shade.drawRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  shade.endFill();
  shade.eventMode = "static";
  levelSelectContainer.addChild(shade);

  const title = new PIXI.Text("关卡选择", {
    fill: 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 34,
    fontWeight: "800",
  });
  title.position.set(34, 78);
  levelSelectContainer.addChild(title);

  const pageCount = Math.ceil(LEVELS.length / LEVELS_PER_PAGE);
  levelSelectPage = Math.max(0, Math.min(levelSelectPage, pageCount - 1));
  const startIndex = levelSelectPage * LEVELS_PER_PAGE;
  const visibleLevels = LEVELS.slice(startIndex, startIndex + LEVELS_PER_PAGE);

  const hint = new PIXI.Text(`第 ${levelSelectPage + 1}/${pageCount} 页 · 通关解锁下一关，冲刺关可直接挑战`, {
    fill: 0xbfeaf2,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 13,
    fontWeight: "700",
  });
  hint.position.set(36, 124);
  levelSelectContainer.addChild(hint);

  visibleLevels.forEach((level, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 28 + col * 194;
    const y = 154 + row * 82;
    const locked = !level.infinite && level.id > unlockedLevel;
    const card = new PIXI.Graphics();
    card.beginFill(locked ? 0x17202a : level.background.top, locked ? 0.72 : 0.9);
    card.lineStyle(2, locked ? 0xffffff : level.background.accent, locked ? 0.12 : 0.42);
    card.drawRoundedRect(x, y, 180, 72, 8);
    card.endFill();
    levelSelectContainer.addChild(card);

    const name = new PIXI.Text(`${level.name}${locked ? " · 未解锁" : ""}`, {
      fill: locked ? 0x8d9aa8 : 0xffffff,
      fontFamily: "Arial, Microsoft YaHei, sans-serif",
      fontSize: 13,
      fontWeight: "800",
      wordWrap: true,
      wordWrapWidth: 112,
    });
    name.position.set(x + 12, y + 8);
    levelSelectContainer.addChild(name);

    const timeLabel = Number.isFinite(level.duration) ? `${level.duration}秒` : "不限时";
    const desc = new PIXI.Text(`${level.subtitle}\n${timeLabel} | ${describeGoals(level)}`, {
      fill: locked ? 0x77838f : 0xe8fbff,
      fontFamily: "Arial, Microsoft YaHei, sans-serif",
      fontSize: 10,
      fontWeight: "700",
      wordWrap: true,
      wordWrapWidth: 112,
    });
    desc.position.set(x + 12, y + 32);
    levelSelectContainer.addChild(desc);

    const action = createButton(locked ? "锁定" : "开始", x + 118, y + 18, 56, 36, () => {
      if (!locked) {
        startLevel(level).catch(showFatalError);
      }
    }, {
      fill: locked ? 0x27313d : 0x0c1218,
      line: locked ? 0x596673 : level.background.accent,
      textFill: locked ? 0x7d8792 : 0xffffff,
      fontSize: 11,
    });
    levelSelectContainer.addChild(action);
  });

  const prev = createButton("上一页", 68, 580, 104, 38, () => {
    levelSelectPage = Math.max(0, levelSelectPage - 1);
    showLevelSelect();
  }, {
    fill: levelSelectPage > 0 ? 0x27313d : 0x161d25,
    line: 0x9fd6ff,
    textFill: levelSelectPage > 0 ? 0xffffff : 0x6f7b86,
    fontSize: 13,
  });
  const next = createButton("下一页", 258, 580, 104, 38, () => {
    levelSelectPage = Math.min(pageCount - 1, levelSelectPage + 1);
    showLevelSelect();
  }, {
    fill: levelSelectPage < pageCount - 1 ? 0x27313d : 0x161d25,
    line: 0x9fd6ff,
    textFill: levelSelectPage < pageCount - 1 ? 0xffffff : 0x6f7b86,
    fontSize: 13,
  });
  levelSelectContainer.addChild(prev);
  levelSelectContainer.addChild(next);

  const heroPanel = new PIXI.Graphics();
  heroPanel.beginFill(0x071018, 0.92);
  heroPanel.lineStyle(2, 0xfff176, 0.18);
  heroPanel.drawRoundedRect(24, 630, DESIGN_WIDTH - 48, 232, 8);
  heroPanel.endFill();
  levelSelectContainer.addChild(heroPanel);

  const heroTitle = new PIXI.Text("选择松松英雄", {
    fill: 0xfff176,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 14,
    fontWeight: "800",
  });
  heroTitle.position.set(34, 644);
  levelSelectContainer.addChild(heroTitle);

  HEROES.forEach((hero, index) => {
    const selected = hero.id === selectedHeroId;
    const col = index % 4;
    const row = Math.floor(index / 4);
    const x = 34 + col * 94;
    const y = 672 + row * 76;
    const button = new PIXI.Container();
    const bg = new PIXI.Graphics();
    bg.beginFill(selected ? 0x2d5f58 : 0x17202a, 0.9);
    bg.lineStyle(2, selected ? 0x73f7cf : 0xffffff, selected ? 0.85 : 0.18);
    bg.drawRoundedRect(0, 0, 82, 70, 8);
    bg.endFill();
    button.addChild(bg);

    const avatar = new PIXI.Sprite(heroTextures.get(hero.id) || PIXI.Texture.WHITE);
    avatar.anchor.set(0.5);
    avatar.width = 44;
    avatar.height = 44;
    avatar.position.set(41, 26);
    button.addChild(avatar);

    const label = new PIXI.Text(hero.name, {
      fill: 0xffffff,
      fontFamily: "Arial, Microsoft YaHei, sans-serif",
      fontSize: 12,
      fontWeight: "800",
      align: "center",
    });
    label.anchor.set(0.5, 0);
    label.position.set(41, 50);
    button.addChild(label);

    button.position.set(x, y);
    button.eventMode = "static";
    button.cursor = "pointer";
    button.on("pointerdown", (event) => event.stopPropagation());
    button.on("pointertap", (event) => {
      event.stopPropagation();
      selectedHero = hero;
      selectedHeroId = hero.id;
      window.localStorage.setItem(HERO_STORAGE_KEY, hero.id);
      loadHeroTexture().then(() => {
        updateHeroUi();
        showLevelSelect();
      }).catch(showFatalError);
    });
    levelSelectContainer.addChild(button);
  });

  const heroDesc = new PIXI.Text(`${selectedHero.skillName}：${selectedHero.description}`, {
    fill: 0xcdf7ff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 12,
    fontWeight: "700",
    wordWrap: true,
    wordWrapWidth: DESIGN_WIDTH - 68,
  });
  heroDesc.position.set(34, 824);
  levelSelectContainer.addChild(heroDesc);

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
  const isSprint = currentLevel?.infinite;
  const titleText = isSprint ? "冲刺结束" : (passed ? "通关成功" : "挑战失败");

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

  const title = new PIXI.Text(titleText, {
    fill: passed ? 0xfff176 : 0xffffff,
    fontFamily: "Arial, Microsoft YaHei, sans-serif",
    fontSize: 32,
    fontWeight: "800",
  });
  title.anchor.set(0.5, 0);
  title.position.set(DESIGN_WIDTH / 2, 278);
  resultOverlay.addChild(title);

  const sprintBest = currentLevel?.sprintMinutes ? (sprintBestScores[String(currentLevel.sprintMinutes)] || 0) : 0;
  let detailText = isSprint
    ? `得分 ${score}   ${currentLevel.sprintMinutes}分钟最高 ${sprintBest}\n${levelEndReason === "newBest" ? "新纪录" : "继续冲刺可刷新纪录"}`
    : `得分 ${score}   ${currentLevel ? describeGoals(currentLevel) : ""}\n${goalText?.text || ""}`;
  detailText += `\n本局获得 ${lastCoinsEarned} 金币   当前 ${coins} 金币`;
  const detail = new PIXI.Text(detailText, {
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

  const nextLevel = passed && !isSprint && currentLevel
    ? LEVELS.find((level) => level.id === currentLevel.id + 1)
    : null;
  const nextLabel = nextLevel ? "下一关" : "关卡";
  const next = createButton(nextLabel, 232, 444, 132, 52, () => {
    if (nextLevel) {
      startLevel(nextLevel).catch(showFatalError);
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
  cancelPendingHeroSkill();
  isDragging = false;
  lastPointerPosition = null;
  dragPointerPosition = null;
  lastCoinsEarned = awardCoinsForScore(score);
  if (passed && currentLevel && !currentLevel.infinite) {
    saveProgress(currentLevel.id);
  }
  if (currentLevel?.infinite) {
    levelEndReason = saveSprintBest(currentLevel, score) ? "newBest" : "sprint";
    passed = true;
    updateGoalText();
  }
  showResultOverlay(passed);
}

function startPhysics() {
  engine = Engine.create({
    gravity: { x: 0, y: 1.12, scale: 0.001 },
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

    if (gameStarted && !pausedByMenu) {
      if (Number.isFinite(levelTimeLeftMs)) {
        levelTimeLeftMs -= delta;
      }
      if (timeText) {
        timeText.text = formatTime(levelTimeLeftMs);
      }
      updateFinalCountdown(now);

      if (Number.isFinite(levelTimeLeftMs) && levelTimeLeftMs <= 0) {
        finishLevel(isLevelComplete());
      }

      processRefill(delta);
    } else {
      updateFinalCountdown(now);
    }

    updateParticles();
    if (heroSprite && heroEnergy >= HERO_MAX_ENERGY && gameStarted && !pausedByMenu) {
      const pulse = 1 + Math.sin(now / 160) * 0.055;
      heroSprite.width = 64 * pulse;
      heroSprite.height = 64 * pulse;
      heroSprite.tint = Math.sin(now / 120) > 0 ? 0xfff176 : 0xffffff;
    } else if (heroSprite) {
      heroSprite.width = 64;
      heroSprite.height = 64;
      heroSprite.tint = 0xffffff;
    }
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

window.__tsumDebug = {
  levels: () => LEVELS.map((level) => ({ id: level.id, name: level.name, boss: Boolean(level.boss), infinite: Boolean(level.infinite) })),
  heroes: () => HEROES.map((hero) => ({ id: hero.id, name: hero.name, assetId: hero.assetId, skill: hero.skill })),
  alignments: () => ({
    friendlyCount: FRIENDLY_SPRITE_IDS.length,
    villainCount: VILLAIN_SPRITE_IDS.length,
    friendlyIds: [...FRIENDLY_SPRITE_IDS],
    villainIds: [...VILLAIN_SPRITE_IDS],
  }),
  startLevelById: (id) => {
    const level = LEVELS.find((item) => item.id === id);
    if (level) {
      startLevel(level).catch(showFatalError);
    }
  },
  removeBallsForTest: (count = 3) => {
    const removing = balls.slice(0, Math.max(0, Math.min(count, balls.length)));
    return removeBalls(removing);
  },
  state: () => ({
    currentLevelId: currentLevel?.id || null,
    currentLevelName: currentLevel?.name || null,
    boss: bossState ? { hp: bossState.hp, maxHp: bossState.maxHp, name: bossState.name } : null,
    heroEnergy,
    score,
    balls: balls.length,
    selectedSpriteIds: [...selectedSpriteIds],
    obstacleCount: levelObstacleViews.length,
    obstacleHp: levelObstacleViews.map((view) => view._hp ?? null),
    pendingRefillCount,
  }),
};

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
  await loadHeroTextures();
  showLevelSelect();

  if (loadingEl) {
    loadingEl.style.display = "none";
  }
}

main().catch(showFatalError);
