import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = new URL("../", import.meta.url);
const CATALOG_PATH = new URL("../collection-catalog.json", import.meta.url);
const OUT_DIR = new URL("../collection_characters/", import.meta.url);
const OUT_JSON = new URL("../collection-character-assets.json", import.meta.url);
const FANDOM_API = "https://disney.fandom.com/api.php";
const PAGE_BASE = "https://disney.fandom.com/wiki/";

const MANUAL_ALIASES = new Map([
  ["AUTO", ["AUTO"]],
  ["Alien", ["Little Green Men"]],
  ["Alberto Monster", ["Alberto Scorfano"]],
  ["Belle Alpha", ["Belle"]],
  ["Belle Gray", ["Belle"]],
  ["Bernie", ["Bernie Lumen"]],
  ["Boss", ["Terry"]],
  ["Boun", ["Boun"]],
  ["Bunny", ["Ducky and Bunny"]],
  ["Bunny Pancake", ["Fun Bun and Puddles", "Bunny"]],
  ["BURN-E", ["BURN-E"]],
  ["Burnside", ["Commander Burnside"]],
  ["Captain BMc Crea", ["Captain B. McCrea"]],
  ["Captain Boun", ["Boun"]],
  ["Cat Milkshake", ["Fun Bun and Puddles"]],
  ["Cat", ["Mittens"]],
  ["Charles F. Muntz", ["Charles Muntz"]],
  ["Charles FMuntz", ["Charles Muntz"]],
  ["Chip Potts", ["Chip Potts", "Chip"]],
  ["Chip", ["Chip and Dale"]],
  ["Crikee", ["Cri-Kee"]],
  ["Daisy", ["Daisy Duck"]],
  ["Dale 1", ["Dale"]],
  ["Dale", ["Chip and Dale"]],
  ["day Angel", ["Angel"]],
  ["day Bunny Pancake", ["Bunny Pancake", "Bunny"]],
  ["day Cat Milkshake", ["Fun Bun and Puddles"]],
  ["day Peter Pan", ["Peter Pan"]],
  ["day Stitch", ["Stitch"]],
  ["day Wendy", ["Wendy Darling", "Wendy"]],
  ["Dela Cruz", ["Ernesto de la Cruz"]],
  ["Doctor Facilier", ["Dr. Facilier"]],
  ["Ducky", ["Ducky and Bunny"]],
  ["Ed", ["Shenzi, Banzai, and Ed"]],
  ["Fairy God Mother", ["Fairy Godmother"]],
  ["Finnick elephant", ["Finnick"]],
  ["Fire Spirit", ["Bruni"]],
  ["Fru Fru", ["Fru Fru"]],
  ["Frufru", ["Fru Fru"]],
  ["Heart Queen", ["Queen of Hearts"]],
  ["Hector", ["Hector Rivera", "Hector"]],
  ["Hei Hei", ["Heihei"]],
  ["Hound", ["Copper"]],
  ["Judy", ["Judy Hopps"]],
  ["Johnny", ["Johnny Worthington III"]],
  ["King Rapunzel", ["Rapunzel"]],
  ["Lazz", ["Paul (Soul)"]],
  ["Holidy Donald", ["Donald Duck"]],
  ["Lishang", ["Li Shang"]],
  ["Little Noi", ["Noi"]],
  ["Littlenoi", ["Noi"]],
  ["Lots-o-Huggin Bear", ["Lots-o'-Huggin' Bear"]],
  ["Lotso", ["Lots-o'-Huggin' Bear"]],
  ["Luca Monster", ["Luca Paguro"]],
  ["Marshmellow", ["Marshmallow"]],
  ["Mordu", ["Mor'du"]],
  ["Mr Big", ["Mr. Big (Zootopia)", "Mr. Big"]],
  ["Mr. Big", ["Mr. Big (Zootopia)", "Mr. Big"]],
  ["Mr Knows More", ["Mr. KnowsMore", "KnowsMore"]],
  ["Mrs Potts", ["Mrs. Potts"]],
  ["Nokk", ["The Nokk", "Nokk"]],
  ["Nigel", ["Nigel (Finding Nemo)"]],
  ["Oswald back", ["Oswald the Lucky Rabbit"]],
  ["Pumba", ["Pumbaa"]],
  ["Carl", ["Carl Fredricksen"]],
  ["Felix", ["Fix-It Felix Jr."]],
  ["Queen", ["Queen of Hearts"]],
  ["Queen Rapunzel", ["Rapunzel"]],
  ["Ralph Zilla", ["Wreck-It Ralph", "Ralph"]],
  ["Rat", ["Remy"]],
  ["Sea Turtle", ["Crush"]],
  ["Shanyu", ["Shan Yu"]],
  ["Sisudatu", ["Sisu", "Sisudatu"]],
  ["Sox", ["Sox"]],
  ["SPAutumn Dumbo", ["Dumbo"]],
  ["SPAutumn Hiro", ["Hiro Hamada"]],
  ["SPAutumn Ralph", ["Wreck-It Ralph", "Ralph"]],
  ["SPChristmas Anna", ["Anna"]],
  ["SPChristmas Elsa", ["Elsa"]],
  ["SPChristmas Olaf", ["Olaf"]],
  ["SPHolidy Donald", ["Donald Duck"]],
  ["Skill Maui", ["Maui"]],
  ["Skill Snow White", ["Snow White"]],
  ["Sulley", ["James P. Sullivan"]],
  ["Tremaine Cat", ["Lucifer"]],
  ["Tumper", ["Thumper"]],
  ["Tow Mater", ["Mater"]],
  ["The Witch", ["Witch (Brave)"]],
  ["The Blue Fairy", ["Blue Fairy", "The Blue Fairy"]],
  ["Ugly Duckling", ["The Ugly Duckling"]],
  ["Wendy", ["Wendy Darling"]],
  ["Yelena", ["Yelana"]],
]);

const LEADING_MODIFIERS = [
  "3rd Anniversary",
  "Adventure",
  "Anniversary",
  "Autumn",
  "Castle",
  "Christmas",
  "Easter",
  "Frozen II",
  "Halloween",
  "Holiday",
  "Holidy",
  "Music",
  "Princess",
  "Special",
  "Spring Day",
  "Spring day",
  "Spring",
  "Summer Day",
  "Summer day",
  "Summer",
  "Tea Party",
  "Winter",
];

const TRAILING_MODIFIERS = [
  "Skill",
  "hula",
];

function normalizeText(value) {
  return String(value || "")
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function titleCaseFromResourceKey(resourceKey) {
  return String(resourceKey || "")
    .replace(/^T_/, "")
    .replace(/^SP/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\d+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripModifiers(value) {
  let result = String(value || "").replace(/\s+/g, " ").trim();
  let changed = true;
  while (changed) {
    changed = false;
    for (const modifier of LEADING_MODIFIERS) {
      const re = new RegExp(`^${modifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+`, "i");
      if (re.test(result)) {
        result = result.replace(re, "").trim();
        changed = true;
      }
    }
  }
  for (const modifier of TRAILING_MODIFIERS) {
    const re = new RegExp(`\\s+${modifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
    result = result.replace(re, "").trim();
  }
  result = result
    .replace(/^SP(Autumn|Christmas|Holiday|Holidy|Summer|Spring)\s+/i, "")
    .replace(/^day\s+/i, "")
    .replace(/\s+\d+$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  return result;
}

function unique(values) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    const clean = String(value || "").replace(/\s+/g, " ").trim();
    if (!clean || seen.has(normalizeText(clean))) {
      continue;
    }
    seen.add(normalizeText(clean));
    result.push(clean);
  }
  return result;
}

function candidateNames(item) {
  const values = [];
  const addValue = (value) => {
    const clean = String(value || "").replace(/\s+/g, " ").trim();
    if (!clean) {
      return;
    }
    if (MANUAL_ALIASES.has(clean)) {
      values.push(...MANUAL_ALIASES.get(clean));
    }
    values.push(clean);
  };

  for (const key of [item.lookupName, item.name, stripModifiers(item.lookupName), stripModifiers(item.name)]) {
    addValue(key);
    addValue(stripModifiers(key));
  }
  const fromResource = titleCaseFromResourceKey(item.resourceKey);
  addValue(fromResource);
  addValue(stripModifiers(fromResource));
  return unique(values).filter((name) => !/^auto$/i.test(name) || item.name === "AUTO");
}

function buildUrl(params) {
  const url = new URL(FANDOM_API);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "CodexLocalTsumCollection/1.0",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

function scorePage(candidate, page) {
  const title = normalizeText(page.title);
  const wanted = normalizeText(candidate);
  let score = 0;
  if (title === wanted) {
    score += 100;
  }
  if (title.includes(wanted)) {
    score += 35;
  }
  if (wanted.includes(title)) {
    score += 20;
  }
  if (page.thumbnail?.source || page.original?.source) {
    score += 25;
  }
  if (/\b(gallery|category|song|soundtrack|episode|disney\+|tsum tsum|emoji blitz)\b/i.test(page.title)) {
    score -= 45;
  }
  return score;
}

async function pagesForTitles(titles) {
  const data = await fetchJson(buildUrl({
    action: "query",
    format: "json",
    origin: "*",
    redirects: "1",
    prop: "pageimages",
    piprop: "thumbnail|original",
    pithumbsize: "900",
    titles: titles.join("|"),
  }));
  return Object.values(data.query?.pages || {}).filter((page) => page.pageid && page.pageid !== -1);
}

async function searchPages(term) {
  const data = await fetchJson(buildUrl({
    action: "query",
    format: "json",
    origin: "*",
    list: "search",
    srsearch: `"${term}"`,
    srlimit: "8",
  }));
  const titles = (data.query?.search || []).map((entry) => entry.title);
  if (!titles.length) {
    return [];
  }
  return pagesForTitles(titles);
}

async function resolveCharacterImage(item) {
  const candidates = candidateNames(item);
  for (const candidate of candidates) {
    const titleCandidates = unique([
      candidate,
      candidate.replace(/\bMr\b/g, "Mr.").replace(/\bMrs\b/g, "Mrs."),
      `${candidate} (character)`,
      `${candidate} (Disney)`,
    ]);
    const pages = await pagesForTitles(titleCandidates).catch(() => []);
    const ranked = pages
      .filter((page) => page.thumbnail?.source || page.original?.source)
      .map((page) => ({ candidate, page, score: scorePage(candidate, page) }))
      .sort((a, b) => b.score - a.score);
    if (ranked[0]?.score >= 60) {
      return ranked[0];
    }
  }

  for (const candidate of candidates) {
    const pages = await searchPages(candidate).catch(() => []);
    const ranked = pages
      .filter((page) => page.thumbnail?.source || page.original?.source)
      .map((page) => ({ candidate, page, score: scorePage(candidate, page) - 10 }))
      .sort((a, b) => b.score - a.score);
    if (ranked[0]?.score >= 45) {
      return ranked[0];
    }
  }

  return null;
}

function extensionForBytes(bytes, contentType = "") {
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && bytes[8] === 0x57) {
    return ".webp";
  }
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return ".jpg";
  }
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return ".png";
  }
  if (/webp/i.test(contentType)) {
    return ".webp";
  }
  if (/png/i.test(contentType)) {
    return ".png";
  }
  return ".jpg";
}

async function downloadImage(url, outputStem) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "CodexLocalTsumCollection/1.0",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const ext = extensionForBytes(bytes, response.headers.get("content-type") || "");
  const outputPath = `${outputStem}${ext}`;
  await writeFile(outputPath, bytes);
  return {
    bytes: bytes.length,
    ext,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const catalog = JSON.parse(await readFile(CATALOG_PATH, "utf8"));
  const items = [];
  const missing = [];

  for (const item of catalog.items) {
    const resolved = await resolveCharacterImage(item);
    if (!resolved) {
      missing.push({
        id: item.id,
        name: item.name,
        lookupName: item.lookupName,
        candidates: candidateNames(item),
      });
      console.log(`MISS ${item.id} ${item.name}`);
      continue;
    }

    const imageUrl = resolved.page.original?.source || resolved.page.thumbnail?.source;
    const outputStem = join(fileURLToPath(OUT_DIR), String(item.id).padStart(3, "0"));
    const downloaded = await downloadImage(imageUrl, outputStem);
    const file = `${String(item.id).padStart(3, "0")}${downloaded.ext}`;
    const sourcePage = `${PAGE_BASE}${encodeURIComponent(resolved.page.title.replace(/ /g, "_"))}`;
    const record = {
      id: item.id,
      name: item.name,
      lookupName: item.lookupName,
      characterName: resolved.candidate,
      pageTitle: resolved.page.title,
      sourcePage,
      imageUrl,
      file: `collection_characters/${file}`,
      score: resolved.score,
      bytes: downloaded.bytes,
      sha256: downloaded.sha256,
    };
    items.push(record);
    console.log(`OK ${item.id} ${item.name} -> ${resolved.page.title}`);
  }

  await writeFile(OUT_JSON, JSON.stringify({
    source: "Downloaded from Disney Fandom pageimages API using collection lookup names and normalized base-character aliases",
    generatedAt: new Date().toISOString(),
    items,
    missing,
  }, null, 2));

  console.log(`DONE items=${items.length} missing=${missing.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
