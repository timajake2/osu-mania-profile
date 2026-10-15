"""Create a public, credential-free osu!mania snapshot for GitHub Pages."""

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

USER_ID = 32048979
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "stats.json"
API = "https://osu.ppy.sh/api/v2"


def request_json(url, *, token=None, body=None):
    headers = {"Accept": "application/json", "User-Agent": "timajake2-github-pages/1.0"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if body is not None:
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    request = urllib.request.Request(url, data=body, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"osu! API вернул HTTP {error.code}: {url.split('?')[0]}") from error


def score_summary(score):
    beatmap = score.get("beatmap") or {}
    beatmapset = score.get("beatmapset") or beatmap.get("beatmapset") or {}
    mods = score.get("mods") or []
    return {
        "beatmap_id": beatmap.get("id") or score.get("beatmap_id"),
        "artist": beatmapset.get("artist"),
        "title": beatmapset.get("title"),
        "version": beatmap.get("version"),
        "rank": score.get("rank"),
        "pp": score.get("pp"),
        "accuracy": round(score["accuracy"] * 100, 2) if isinstance(score.get("accuracy"), (int, float)) else None,
        "ended_at": score.get("ended_at") or score.get("created_at"),
        "mods": [mod if isinstance(mod, str) else mod.get("acronym", "") for mod in mods],
    }


def main():
    client_id = os.getenv("OSU_CLIENT_ID", "").strip()
    client_secret = os.getenv("OSU_CLIENT_SECRET", "").strip()
    if not client_id or not client_secret:
        raise RuntimeError("Добавьте оба секрета OSU_CLIENT_ID и OSU_CLIENT_SECRET в настройках GitHub Actions.")

    body = urllib.parse.urlencode({
        "client_id": client_id,
        "client_secret": client_secret,
        "grant_type": "client_credentials",
        "scope": "public",
    }).encode("utf-8")
    token = request_json("https://osu.ppy.sh/oauth/token", body=body)["access_token"]
    user = request_json(f"{API}/users/{USER_ID}/mania", token=token)
    if user.get("id") != USER_ID:
        raise RuntimeError("osu! API вернул другой профиль; снимок не сохранён.")
    query = urllib.parse.urlencode({"mode": "mania", "limit": 8})
    best = request_json(f"{API}/users/{USER_ID}/scores/best?{query}", token=token)
    recent = request_json(f"{API}/users/{USER_ID}/scores/recent?{query}", token=token)
    statistics = user.get("statistics") or {}
    allowed_stats = [
        "global_rank", "country_rank", "pp", "play_count", "play_time", "level",
        "ranked_score", "total_score", "total_hits", "maximum_combo", "grade_counts",
        "replays_watched_by_others",
    ]
    clean_stats = {key: statistics.get(key) for key in allowed_stats}
    clean_stats["accuracy_pct"] = round(statistics["accuracy"] * 100, 2) if isinstance(statistics.get("accuracy"), (int, float)) else statistics.get("hit_accuracy")
    snapshot = {
        "status": "ok",
        "source": "osu_api_v2",
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "user": {
            "id": user["id"],
            "username": user.get("username"),
            "country_code": user.get("country_code"),
            "statistics": clean_stats,
            "rank_history": (user.get("rank_history") or {}).get("data") or [],
            "medals_count": len(user.get("user_achievements") or []),
        },
        "best": [score_summary(score) for score in best],
        "recent": [score_summary(score) for score in recent],
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temporary = OUTPUT.with_suffix(".tmp")
    temporary.write_text(json.dumps(snapshot, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    temporary.replace(OUTPUT)
    print(f"Статистика osu!mania обновлена: {len(best)} лучших и {len(recent)} недавних результатов.")


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, urllib.error.URLError, ValueError, KeyError, TimeoutError) as error:
        print(f"Ошибка обновления: {error}", file=sys.stderr)
        sys.exit(1)
