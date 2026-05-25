# Crafted Gamz Version 12

This is v12 of Crafted Gamz, also shown in the site files as `12.0.0` and described as Crafted Gamz Version XII. This version is a much bigger jump from the older loader builds, turning Crafted Gamz into a more complete site with a custom intro, a redesigned main page, a generic game launcher system, Netlify-backed features, offline support, and many more built-in sections beyond just games.

## What's new in v12

- Reworked the startup flow into a disguised Wikipedia-style entry page with a custom Version 12 particle intro and redirect into the main site.
- Rebuilt the main page into a more complete dashboard with live visitor stats, online count, popular games, current version info, CGPUP status, a monthly featured pick, and social/contact links.
- Added a generic game launcher system using `game.html` and `gameConfigs.js` so games can be loaded from one shared launcher instead of separate hand-made pages.
- Expanded the game library to around `401` configured game entries in `gameConfigs.js`.
- Added `all-games.html`, a generated full game index with search, favorites, saved hearts, and click tracking.
- Added a redesigned floating navigation system with quick links, weather, period timer support, clock support, system status, rank display, and panic button integration.
- Added a full Control Panel page for cloaking, disguises, particle settings, music stream settings, panic settings, import/export of config, quick access toggles, timer toggles, and more.
- Added service worker support and a `no-wifi` offline fallback page so the site can still show a custom offline experience.
- Added Netlify function support for passwords, search URLs, app URLs, movie URLs, AI chat, Firebase config, version info, and other dynamic site features.
- Added dedicated Apps, Movies, Search Browser, Transfer, Versions, About Us, DIY, AI, AI Calculator, and ELA Assistant pages.
- Added transfer tools with separate upload, download, and removal pages.
- Added maintenance and disable systems backed by Firebase and Netlify so the site can be taken down or redirected centrally.
- Added a version update script and dynamic current-version display.

## Games and sections included

- A large game library with around `401` configured entries, including games like 2048, Basket Random, Bloons TD 4 and 5, Chrome Dino, Cookie Clicker, Core Ball, Crossy Road, Drift Boss, Duck Life 1 through 4, Flappy Bird, Flappy Plane, Hextris, Minecraft 1.5 and 1.8, Minesweeper, Monkey Mart, Motox3m, Ovo, Retro Bowl, Rooftop Snipers, Run 2, Run 3, Shell Shockers, Slope, Slope 2, Smash Karts, Snow Rider 3D, Tanuki Sunset, Temple Run 2, Tiny Fishing, Tunnel Rush, Wordle, and Worlds Hardest Game.
- Main Page
- Games
- All Games
- Search Browser
- Apps
- Movies
- AI
- AI Calculator
- ELA Assistant
- Transfer
- Control Panel
- Versions
- About Us
- DIY
- Client and disguise entry pages
- Offline fallback mode

## Notes

- This branch has several real path issues that may need cleanup. Many pages load `periodSchedule.js`, but that file does not appear to be included here. The repo does include `period-timer.js`, so some pages may still be pointing at the old filename.
- `index.html` still references `Files/favicon2.png`, but that path does not appear to be included in this branch.
- `manifest.json` references `/icon-192.png` and `/icon-512.png`, but those files do not appear to be included here.
- `game.html` loads `gameconfigs.js` while the repo file is named `gameConfigs.js`. That usually works on Windows, but it can break on case-sensitive hosting depending on how the site is deployed.
- `all-games.html` already warns that it was generated and that some links will not work, so this branch still has a few unfinished or mismatched game entries.
- A lot of v12 depends on outside services or server-side config, including Netlify functions, Firebase, Koyeb-hosted tools, and remote URLs for apps, movies, search, and AI. Because of that, the repo is not fully self-contained by itself.
- The About Us page credits GitHub and Netlify hosting, CGPUP on Koyeb, and the broader Elusion family of related sites.
- Most of the site is still plain HTML, CSS, and JavaScript, but v12 is much more app-like than the older branches because of the shared loader system, dynamic data, service worker, and remote function support.
