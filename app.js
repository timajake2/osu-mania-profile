const DATA_URL = "data/stats.json";
const DASH = "—";
const STRINGS = {
  ru: {
    metaDescription: "Личная страница timajake2: статистика osu!mania, лучшие результаты и прохождения Dan On Rates.",
    skip: "К содержимому", brandTop: "timajake2, наверх", siteSections: "Разделы сайта",
    navStats: "Статистика", navScores: "Результаты", navDans: "Даны",
    languageLabel: "Язык сайта", osuProfile: "Профиль osu!",
    bannerAlt: "Лавандово-розовый баннер timajake2 с аниме-персонажем",
    avatarAlt: "Аватар timajake2", eyebrow: "ЛИЧНАЯ СТРАНИЦА ИГРОКА",
    heart: "сердце", tagline: "Ритм, клавиши и маленькие победы в",
    summary: "Краткая сводка", ppCaption: "Каждый результат — ещё один шаг вперёд.",
    globalRank: "МИРОВОЙ РЕЙТИНГ", rankCaption: "Текущая позиция в osu!mania.",
    dansCompleted: "ПРОЙДЕННЫЕ ДАНЫ", dansCaption: "Alpha, Beta и Gamma Dan On Rates.",
    statsHeadingOne: "Статистика", statsHeadingTwo: "в ритме",
    statsNote: "Показатели из osu! API v2", trend: "ДИНАМИКА",
    rankHistory: "История рейтинга", ninetyDays: "90 дней",
    rankChart: "График позиции в мировом рейтинге",
    chartAwait: "Появится после первого обновления статистики.",
    chartEmpty: "Данных для графика пока нет",
    chartAria: "История мирового рейтинга: от #{start} до #{end}",
    chartCaption: "От #{start} до #{end}. Чем ниже позиция, тем выше линия.",
    collection: "КОЛЛЕКЦИЯ", gradesHeading: "Ранги за карты",
    gradesCaption: "Количество результатов по рангам в профиле osu!mania.",
    scoresHeadingOne: "Игровые", scoresHeadingTwo: "результаты",
    allScores: "Все результаты на osu! ↗", scoreType: "Вид результатов",
    best: "Лучшие", recent: "Недавние",
    emptyBest: "Лучшие результаты появятся после первого обновления статистики.",
    emptyRecent: "Недавние результаты пока не получены.",
    difficulty: "сложность", unknownArtist: "Неизвестный исполнитель",
    map: "Карта", accuracy: "точность",
    dansHeadingOne: "Путь через", dansHeadingTwo: "даны",
    dansNote: "Dan On Rates · подтверждённые прохождения",
    alphaDate: "27 мая 2026 · Lazer", betaDate: "7 июля 2026 · Stable",
    gammaDate: "12 августа 2026 · Stable",
    passAccuracy: "точность прохождения",
    proofAlpha: "Открыть подтверждение Alpha Dan",
    proofBeta: "Открыть подтверждение Beta Dan",
    proofGamma: "Открыть подтверждение Gamma Dan",
    footer: "Статистика обновляется автоматически после настройки GitHub Actions. osu! — торговая марка ppy Pty Ltd.",
    backTop: "Наверх ↑", awaiting: "Ожидаем первое обновление",
    snapshot: "Снимок профиля · {date}", updated: "Обновлено {date}",
    unavailable: "Статистика временно недоступна",
    statLabels: [
      "Рейтинг в стране", "Точность", "Количество игр", "Время в игре",
      "Рейтинговые очки", "Всего очков", "Нажатий", "Макс. комбо",
      "Уровень", "Среднее нажатий за игру", "Просмотры реплеев", "Медали"
    ],
    hours: "ч"
  },
  en: {
    metaDescription: "timajake2's osu!mania profile: stats, top plays, and Dan On Rates clears.",
    skip: "Skip to content", brandTop: "timajake2, back to top", siteSections: "Site sections",
    navStats: "Stats", navScores: "Scores", navDans: "Dans",
    languageLabel: "Site language", osuProfile: "osu! profile",
    bannerAlt: "Lavender and pink timajake2 banner featuring an anime character",
    avatarAlt: "timajake2's avatar", eyebrow: "PLAYER PROFILE",
    heart: "heart", tagline: "Rhythm, keys, and little victories in",
    summary: "Profile summary", ppCaption: "Every play is another step forward.",
    globalRank: "GLOBAL RANK", rankCaption: "Current osu!mania position.",
    dansCompleted: "DANS CLEARED", dansCaption: "Alpha, Beta, and Gamma Dan On Rates.",
    statsHeadingOne: "Stats", statsHeadingTwo: "in rhythm",
    statsNote: "Stats from osu! API v2", trend: "PROGRESS",
    rankHistory: "Rank history", ninetyDays: "90 days",
    rankChart: "Global rank history chart",
    chartAwait: "Available after the first stats update.",
    chartEmpty: "No chart data yet",
    chartAria: "Global rank history: from #{start} to #{end}",
    chartCaption: "From #{start} to #{end}. A lower rank number appears higher on the chart.",
    collection: "COLLECTION", gradesHeading: "Map grades",
    gradesCaption: "Number of scores by grade on the osu!mania profile.",
    scoresHeadingOne: "Play", scoresHeadingTwo: "results",
    allScores: "All scores on osu! ↗", scoreType: "Score view",
    best: "Best", recent: "Recent",
    emptyBest: "Best scores will appear after the first stats update.",
    emptyRecent: "Recent scores are not available yet.",
    difficulty: "difficulty", unknownArtist: "Unknown artist",
    map: "Beatmap", accuracy: "accuracy",
    dansHeadingOne: "The path through", dansHeadingTwo: "dans",
    dansNote: "Dan On Rates · verified clears",
    alphaDate: "May 27, 2026 · Lazer", betaDate: "July 7, 2026 · Stable",
    gammaDate: "August 12, 2026 · Stable",
    passAccuracy: "clear accuracy",
    proofAlpha: "Open Alpha Dan proof",
    proofBeta: "Open Beta Dan proof",
    proofGamma: "Open Gamma Dan proof",
    footer: "Stats update automatically after GitHub Actions is configured. osu! is a trademark of ppy Pty Ltd.",
    backTop: "Back to top ↑", awaiting: "Waiting for the first update",
    snapshot: "Profile snapshot · {date}", updated: "Updated {date}",
    unavailable: "Stats are temporarily unavailable",
    statLabels: [
      "Country rank", "Accuracy", "Play count", "Play time",
      "Ranked score", "Total score", "Total hits", "Max combo",
      "Level", "Average hits per play", "Replay views", "Medals"
    ],
    hours: "h"
  }
};

function initialLanguage() {
  const requested = new URLSearchParams(location.search).get("lang");
  if (requested === "en" || requested === "ru") return requested;
  try {
    const saved = localStorage.getItem("osu-mania-language");
    if (saved === "en" || saved === "ru") return saved;
  } catch { /* Storage may be unavailable in private browsing. */ }
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "ru";
}

let language = initialLanguage();
let snapshot = { best: [], recent: [] };
let activeTab = "best";
let dataState = "loading";
const t = key => STRINGS[language][key];
const interpolate = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
const setText = (id, value) => { document.getElementById(id).textContent = value; };

function formatNumber(value, digits = 0) {
  return value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value))
    ? new Intl.NumberFormat(language === "en" ? "en-US" : "ru-RU", { maximumFractionDigits: digits }).format(Number(value))
    : DASH;
}

function formatDate(value) {
  if (!value) return DASH;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? DASH
    : new Intl.DateTimeFormat(language === "en" ? "en-US" : "ru-RU", {
      day: "numeric", month: "short", year: "numeric"
    }).format(date);
}

function make(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function renderStats(user) {
  const stats = user?.statistics || {};
  setText("hero-pp", stats.pp != null ? `${formatNumber(stats.pp)} pp` : "— pp");
  setText("hero-rank", stats.global_rank != null ? `#${formatNumber(stats.global_rank)}` : DASH);
  const labels = t("statLabels");
  const values = [
    stats.country_rank == null ? DASH : `#${formatNumber(stats.country_rank)}`,
    stats.accuracy_pct == null ? DASH : `${formatNumber(stats.accuracy_pct, 2)}%`,
    formatNumber(stats.play_count),
    stats.play_time == null ? DASH : `${formatNumber(stats.play_time / 3600, 1)} ${t("hours")}`,
    formatNumber(stats.ranked_score), formatNumber(stats.total_score),
    formatNumber(stats.total_hits), formatNumber(stats.maximum_combo),
    stats.level?.current == null ? DASH : `${formatNumber(stats.level.current)} · ${formatNumber(stats.level.progress)}%`,
    stats.play_count > 0 && stats.total_hits != null ? formatNumber(stats.total_hits / stats.play_count) : DASH,
    formatNumber(stats.replays_watched_by_others), formatNumber(user?.medals_count)
  ];
  const grid = document.getElementById("stats-grid");
  grid.replaceChildren(...labels.map((label, index) => {
    const card = make("div", "stat-card");
    card.append(make("span", "stat-label", label), make("strong", "stat-value", values[index]));
    return card;
  }));

  const grades = stats.grade_counts || {};
  const gradeList = [["SS+", grades.ssh], ["SS", grades.ss], ["S+", grades.sh], ["S", grades.s], ["A", grades.a]];
  document.getElementById("grades").replaceChildren(...gradeList.map(([label, count]) => {
    const box = make("div", "grade");
    box.append(make("b", "", label), make("span", "", formatNumber(count)));
    return box;
  }));
  renderChart(user?.rank_history);
}

function renderChart(history) {
  const container = document.getElementById("rank-chart");
  const values = Array.isArray(history) ? history.map(Number).filter(v => Number.isFinite(v) && v > 0) : [];
  if (values.length < 2) {
    container.replaceChildren(make("span", "empty", t("chartEmpty")));
    setText("chart-caption", t("chartAwait"));
    return;
  }
  const width = 600, height = 130, pad = 8;
  const low = Math.min(...values), high = Math.max(...values), range = Math.max(high - low, 1);
  const points = values.map((v, i) => [pad + i * (width - pad * 2) / (values.length - 1), pad + (v - low) / range * (height - pad * 2)]);
  const path = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  const ranks = { start: formatNumber(values[0]), end: formatNumber(values.at(-1)) };
  svg.setAttribute("aria-label", interpolate(t("chartAria"), ranks));
  svg.innerHTML = `<defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#eca6dd" stop-opacity=".29"/><stop offset="1" stop-color="#eca6dd" stop-opacity="0"/></linearGradient></defs><path d="${path} L${points.at(-1)[0].toFixed(1)},${height} L${pad},${height} Z" fill="url(#fill)"/><path d="${path}" fill="none" stroke="#edb3e3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  container.replaceChildren(svg);
  setText("chart-caption", interpolate(t("chartCaption"), ranks));
}

function renderScores() {
  const list = document.getElementById("score-list");
  const scores = Array.isArray(snapshot[activeTab]) ? snapshot[activeTab] : [];
  if (!scores.length) {
    list.replaceChildren(make("div", "empty-score", t(activeTab === "best" ? "emptyBest" : "emptyRecent")));
    return;
  }
  list.replaceChildren(...scores.map(score => {
    const row = make("a", "score-row");
    const id = Number(score.beatmap_id);
    row.href = id > 0 ? `https://osu.ppy.sh/beatmaps/${id}` : "https://osu.ppy.sh/users/32048979/mania";
    row.target = "_blank";
    row.rel = "noopener noreferrer";
    const rank = make("span", "score-rank", score.rank || "♫");
    const main = make("span", "score-main");
    const details = [score.version || t("difficulty")];
    if (score.ended_at) details.push(formatDate(score.ended_at));
    if (score.mods?.length) details.push(score.mods.join(", "));
    main.append(
      make("strong", "", `${score.artist || t("unknownArtist")} — ${score.title || t("map")}`),
      make("span", "", details.join(" · "))
    );
    const metrics = make("span", "score-metrics");
    metrics.append(
      make("strong", "", score.pp == null ? "— pp" : `${formatNumber(score.pp)} pp`),
      make("small", "", score.accuracy == null ? DASH : `${formatNumber(score.accuracy, 2)}% ${t("accuracy")}`)
    );
    row.append(rank, main, metrics);
    return row;
  }));
}

function updateSync() {
  const status = document.getElementById("sync-status");
  status.classList.toggle("live", dataState === "ok");
  if (dataState === "ok") {
    const key = snapshot.source === "public_profile_snapshot" ? "snapshot" : "updated";
    status.textContent = interpolate(t(key), { date: formatDate(snapshot.updated_at) });
  } else {
    status.textContent = t(dataState === "error" ? "unavailable" : "awaiting");
  }
}

function applyLanguage(next, persist = false) {
  language = next;
  document.documentElement.lang = next;
  document.querySelector('meta[name="description"]').content = t("metaDescription");
  for (const el of document.querySelectorAll("[data-i18n]")) el.textContent = t(el.dataset.i18n);
  for (const el of document.querySelectorAll("[data-i18n-aria]")) el.setAttribute("aria-label", t(el.dataset.i18nAria));
  for (const el of document.querySelectorAll("[data-i18n-alt]")) el.setAttribute("alt", t(el.dataset.i18nAlt));
  for (const button of document.querySelectorAll(".language-button")) {
    const selected = button.dataset.lang === next;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  }
  if (persist) {
    try { localStorage.setItem("osu-mania-language", next); } catch { /* Storage may be unavailable. */ }
    const url = new URL(location.href);
    if (next === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    history.replaceState(null, "", url);
  }
  renderStats(snapshot.user);
  renderScores();
  updateSync();
}

for (const button of document.querySelectorAll(".language-button")) {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang, true));
}
for (const tab of document.querySelectorAll(".tab")) {
  tab.addEventListener("click", () => {
    activeTab = tab.dataset.tab;
    for (const other of document.querySelectorAll(".tab")) {
      const active = other === tab;
      other.classList.toggle("active", active);
      other.setAttribute("aria-selected", String(active));
    }
    document.getElementById("score-list").setAttribute("aria-labelledby", tab.id);
    renderScores();
  });
}

async function loadData() {
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.status === "ok" && data.user) {
      snapshot = data;
      dataState = "ok";
    } else {
      dataState = "error";
    }
  } catch (error) {
    dataState = "error";
    console.warn("Could not load osu!mania stats:", error);
  }
  renderStats(snapshot.user);
  renderScores();
  updateSync();
}

applyLanguage(language);
loadData();
