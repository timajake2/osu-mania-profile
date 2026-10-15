# timajake2 · osu!mania

## English

This is a bilingual osu!mania profile website for GitHub Pages. Use the **RU / EN** switch in the header; the selected language is saved in your browser. Share the [English version](https://timajake2.github.io/osu-mania-profile/?lang=en) directly. Visitors whose browser language is English see English automatically unless they have already chosen a language.

The site shows osu!mania stats, global rank history, best and recent plays, and verified Alpha, Beta, and Gamma Dan On Rates clears. The clear counter is **03 / 05**, leaving room for Delta and Epsilon.

To publish a copy, upload the project files to the root of a GitHub repository, including the hidden `.github` folder. Use a `main` branch and set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The workflow publishes the initial public snapshot even before API credentials are added.

For automatic updates, register an OAuth application in [osu! account settings](https://osu.ppy.sh/home/account/edit). Add its client ID and client secret under **Settings → Secrets and variables → Actions** as `OSU_CLIENT_ID` and `OSU_CLIENT_SECRET`. Then run the Pages workflow from the **Actions** tab. It refreshes public profile data about every six hours. Credentials stay in GitHub Actions and are never shipped to the browser. Dan clears are maintained manually because osu! API v2 does not expose them as a separate profile field.

## Русский

Готовый статический сайт для GitHub Pages. Лавандово-розовый дизайн повторяет настроение приложенного скриншота профиля; аватар и баннер взяты из приложенных изображений. На странице есть статистика osu!mania, история мирового рейтинга, лучшие и недавние результаты, а также прохождения Alpha / Beta / Gamma Dan On Rates со ссылками на подтверждения.

Для переключения языка используйте кнопки **RU / EN** в шапке. Выбор сохраняется в браузере. Английскую версию можно открыть напрямую по адресу `?lang=en`; у новых посетителей с английским языком браузера она включается автоматически.

## Публикация на GitHub Pages

1. Создайте новый репозиторий GitHub. Распакуйте ZIP и загрузите **содержимое папки `osu-mania-site` в корень репозитория**, включая скрытую папку `.github`. Основная ветка должна называться `main`.
2. В репозитории откройте **Settings → Pages → Build and deployment → Source** и выберите **GitHub Actions**.
3. Первый push запускает `.github/workflows/pages.yml`. Без ключей сайт уже публикуется с начальным снимком публичного профиля от **15 октября 2026 года**. Он может устареть; свежие данные появятся после подключения API.
4. После добавления секретов из следующего раздела откройте **Actions → Обновить osu!mania и опубликовать сайт → Run workflow**, чтобы не ждать следующего расписания.

Адрес сайта появится в **Settings → Pages** и в результате workflow. Для обычного репозитория он имеет вид `https://<логин>.github.io/<репозиторий>/`.

## Подключение osu! API v2

1. В [настройках аккаунта osu!](https://osu.ppy.sh/home/account/edit) зарегистрируйте OAuth-приложение. Для используемого здесь Client Credentials Grant callback URL можно оставить пустым.
2. Скопируйте `Client ID` и `Client Secret`. В репозитории GitHub откройте **Settings → Secrets and variables → Actions → New repository secret** и создайте ровно два секрета: `OSU_CLIENT_ID` и `OSU_CLIENT_SECRET`.
3. Запустите workflow вручную. После успешного завершения публичный сайт начнёт показывать текущие данные. Затем GitHub Actions будет обновлять снимок примерно каждые 6 часов (по расписанию GitHub; фактический запуск может задерживаться).

Секреты используются только на сервере GitHub Actions для получения временного OAuth-токена. Ни ключи, ни токен **не попадают** в HTML, JavaScript или опубликованный JSON. В браузер поступает только публичная статистика. Рабочий процесс не записывает снимок обратно в репозиторий: он собирает его непосредственно в публикуемый артефакт Pages.

Если API временно недоступен, workflow завершится ошибкой, а предыдущая опубликованная версия сайта останется доступной. Если ключи отсутствуют, публикуется начальный снимок профиля с указанной датой. Не полученные при просмотре страницы значения остаются пустыми, вместо выдуманных показателей.

## Какие данные обновляются

- pp, мировой рейтинг, рейтинг страны, точность, количество и время игр;
- рейтинговые и общие очки, нажатия, среднее число нажатий за игру, максимальное комбо, уровень, просмотры реплеев и число медалей;
- количество результатов рангов SS+, SS, S+, S и A;
- история мирового рейтинга, 8 лучших и 8 недавних результатов.

Источник: [официальная документация osu! API v2](https://osu.ppy.sh/docs/index.html). Используются `/users/32048979/mania` и `/users/32048979/scores/{best,recent}?mode=mania`. Набор публичных полей API может меняться; отсутствующие значения на сайте отображаются знаком `—`. Даны заданы вручную по предоставленным пользователем данным, поскольку они не являются отдельным полем профиля в этом API.

## Состав проекта

| Путь | Назначение |
| --- | --- |
| `index.html`, `styles.css`, `app.js` | Страница, адаптивный дизайн и отображение статистики |
| `assets/avatar.png`, `assets/banner.jpg` | Изображения сайта |
| `assets/reference.png`, `assets/dans-reference.png` | Предоставленные скриншоты для сравнения; в опубликованный сайт не копируются |
| `data/stats.json` | Начальный снимок публичного профиля; workflow заменяет его перед публикацией |
| `scripts/fetch_osu.py` | Запрос osu! API и сохранение безопасного публичного снимка |
| `.github/workflows/pages.yml` | Автоматическое обновление и публикация GitHub Pages |

Для локального просмотра запустите из корня проекта `python -m http.server 8000` и откройте `http://localhost:8000`. Для локального обновления задайте переменные окружения `OSU_CLIENT_ID` и `OSU_CLIENT_SECRET`, затем запустите `python scripts/fetch_osu.py`. Не сохраняйте секреты в файлах проекта.

## Источники и права

Аватар, баннер и скриншоты предоставлены пользователем. osu! и osu!mania принадлежат их правообладателям; это неофициальная страница игрока. Подтверждения данов открываются по исходным ссылкам на `i.ppy.sh`.

- [osu! API v2: авторизация и методы](https://osu.ppy.sh/docs/index.html)
- [GitHub: собственный workflow для Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub: секреты Actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
