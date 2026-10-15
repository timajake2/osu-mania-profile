const DATA_URL = "data/stats.json";
const DASH = "—";
const number = new Intl.NumberFormat("ru-RU");
const decimal = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 });
let snapshot = { best: [], recent: [] };
let activeTab = "best";

function formatNumber(value, digits = 0) {
  return value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value)) ? new Intl.NumberFormat("ru-RU", { maximumFractionDigits: digits }).format(Number(value)) : DASH;
}

function formatDate(value) {
  if (!value) return DASH;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? DASH : new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function setText(id, value) { document.getElementById(id).textContent = value; }

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
  const fields = [
    ["Рейтинг в стране", stats.country_rank == null ? DASH : `#${formatNumber(stats.country_rank)}`],
    ["Точность", stats.accuracy_pct == null ? DASH : `${formatNumber(stats.accuracy_pct, 2)}%`],
    ["Количество игр", formatNumber(stats.play_count)],
    ["Время в игре", stats.play_time == null ? DASH : `${formatNumber(stats.play_time / 3600, 1)} ч`],
    ["Рейтинговые очки", formatNumber(stats.ranked_score)],
    ["Всего очков", formatNumber(stats.total_score)],
    ["Нажатий", formatNumber(stats.total_hits)],
    ["Макс. комбо", formatNumber(stats.maximum_combo)],
    ["Уровень", stats.level?.current == null ? DASH : `${formatNumber(stats.level.current)} · ${formatNumber(stats.level.progress)}%`],
    ["Среднее нажатий за игру", stats.play_count > 0 && stats.total_hits != null ? formatNumber(stats.total_hits / stats.play_count) : DASH],
    ["Просмотры реплеев", formatNumber(stats.replays_watched_by_others)],
    ["Медали", formatNumber(user?.medals_count)]
  ];
  const grid = document.getElementById("stats-grid");
  grid.replaceChildren(...fields.map(([label, value]) => {
    const card = make("div", "stat-card");
    card.append(make("span", "stat-label", label), make("strong", "stat-value", value));
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
    container.replaceChildren(make("span", "empty", "Данных для графика пока нет"));
    return;
  }
  const width = 600, height = 130, pad = 8;
  const low = Math.min(...values), high = Math.max(...values), range = Math.max(high - low, 1);
  const points = values.map((v, i) => [pad + i * (width - pad * 2) / (values.length - 1), pad + (v - low) / range * (height - pad * 2)]);
  const path = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `История мирового рейтинга: от #${number.format(values[0])} до #${number.format(values.at(-1))}`);
  svg.innerHTML = `<defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#eca6dd" stop-opacity=".29"/><stop offset="1" stop-color="#eca6dd" stop-opacity="0"/></linearGradient></defs><path d="${path} L${points.at(-1)[0].toFixed(1)},${height} L${pad},${height} Z" fill="url(#fill)"/><path d="${path}" fill="none" stroke="#edb3e3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  container.replaceChildren(svg);
  setText("chart-caption", `От #${number.format(values[0])} до #${number.format(values.at(-1))}. Чем ниже позиция, тем выше линия.`);
}

function renderScores() {
  const list = document.getElementById("score-list");
  const scores = Array.isArray(snapshot[activeTab]) ? snapshot[activeTab] : [];
  if (!scores.length) {
    list.replaceChildren(make("div", "empty-score", activeTab === "best" ? "Лучшие результаты появятся после первого обновления статистики." : "Недавние результаты пока не получены."));
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
    const details = [score.version || "сложность"];
    if (score.ended_at) details.push(formatDate(score.ended_at));
    if (score.mods?.length) details.push(score.mods.join(", "));
    main.append(make("strong", "", `${score.artist || "Неизвестный исполнитель"} — ${score.title || "Карта"}`), make("span", "", details.join(" · ")));
    const metrics = make("span", "score-metrics");
    metrics.append(make("strong", "", score.pp == null ? "— pp" : `${formatNumber(score.pp)} pp`), make("small", "", score.accuracy == null ? "—" : `${decimal.format(score.accuracy)}% точность`));
    row.append(rank, main, metrics);
    return row;
  }));
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
      renderStats(data.user);
      renderScores();
      const updated = formatDate(data.updated_at);
      setText("sync-status", data.source === "public_profile_snapshot" ? `Снимок профиля · ${updated}` : `Обновлено ${updated}`);
      document.getElementById("sync-status").classList.add("live");
    } else {
      renderStats(null);
      renderScores();
    }
  } catch (error) {
    renderStats(null);
    renderScores();
    setText("sync-status", "Статистика временно недоступна");
    console.warn("Не удалось загрузить снимок статистики:", error);
  }
}

loadData();
