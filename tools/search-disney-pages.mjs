const FANDOM_API = "https://disney.fandom.com/api.php";

const terms = process.argv.slice(2);
if (!terms.length) {
  console.error("Usage: node tools/search-disney-pages.mjs <term> ...");
  process.exit(1);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "CodexLocalTsumCollection/1.0" },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

for (const term of terms) {
  const url = new URL(FANDOM_API);
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("origin", "*");
  url.searchParams.set("list", "search");
  url.searchParams.set("srsearch", term);
  url.searchParams.set("srlimit", "10");
  const data = await fetchJson(url);
  console.log(`\n# ${term}`);
  for (const entry of data.query?.search || []) {
    console.log(`${entry.title}`);
  }
}
