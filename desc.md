# Crafted Gamz Version 13

This is v13 of Crafted Gamz, also shown in the repo metadata as version `13` and described as Crafted Gamz Version XIII. This version keeps the bigger site-style setup from v12, but reshapes it into a cleaner and more curated build with a new intro sequence, a new white liquid-glass visual style, a dedicated What's New system, request and admin tooling, VM support, and a more focused main games catalog.

## What's new in v13

- Updated the project package metadata to version `13`.
- Reworked the disguised startup page into a new Crafted Gamz Version 13 text intro sequence instead of the older particle-based Version 12 animation.
- Rebuilt much of the site styling around a white liquid-glass look across the main page, games page, versions page, about page, control panel, and launcher UI.
- Kept the Netlify and Firebase-backed site systems from the newer builds, including dynamic version loading, visitor stats, online counts, notifications, maintenance checks, and disable checks.
- Changed the main page dashboard cards so the center features now highlight Request A Game and Latest Update Info instead of some of the older v12 boxes.
- Added a dedicated `whatsnew.html` page and `whatsnew.js` redirect logic for showing the latest update information to users.
- Added a Request A Game page with Firebase-backed submission support.
- Added an Admin Panel page for reviewing and managing game requests.
- Added a VM section with its own page and Hyperbeam-backed function support through `vmkey.js`.
- Added game blacklist support with a Netlify function that can block game access based on IP or device-management rules.
- Reworked the main games setup into a smaller curated list driven by `gameConfigs.js` instead of the much larger generated `all-games` setup from v12.
- Kept the shared `game.html` launcher flow with the animated launch transition and shared game controls bar.
- Added short redirect helper pages like `a.html`, `g.html`, `m.html`, and `p.html` for faster access to major sections.

## Games and sections included

- A curated games catalog with around `72` configured game entries, including games like 10 Minutes Till Dawn, 2048, Cookie Clicker, Core Ball, Chrome Dino, Death Run 3D, Drift Boss, Flappy Bird, Flappy Plane, HexGL, Hextris, Minecraft 1.8, Minesweeper, Monkey Mart, Retro Bowl, Rocket League, Run 2, Shell Shockers, Slope, Slope 2, Snow Rider 3D, Tanuki Sunset, and other hand-picked entries from the newer site build.
- Main Page
- Games
- AI
- AI Calculator
- ELA Assistant
- VM's
- Projects
- Request A Game
- Admin Panel
- Control Panel
- Versions
- About Us
- Transfer
- Client and disguise entry pages
- Offline fallback mode

## Notes

- This branch still has several missing-file references. Many pages load `periodSchedule.js`, but that file does not appear to be included here. The repo does include `period-timer.js`, so some pages still look like they are pointing at the older filename.
- `index.html` still references `Files/favicon2.png`, but that path does not appear to be included in this branch.
- `manifest.json` still points to `icon-192.png` and `icon-512.png`, but those files do not appear to be included here.
- The new intro and homepage reference `intro_p1.mp3`, `intro_p2.mp3`, and `random-messages.js`, but those files do not appear to be included in this branch.
- The site now uses both `gameConfigs.js` and `gameconfigs.js`, which helps avoid the old case-mismatch problem in the shared launcher.
- A lot of the important v13 features still depend on outside services or server-side config, including Netlify functions, Firebase, Hyperbeam, and remote URLs for AI and other tools, so this branch is not fully self-contained by itself.
- The game blacklist and VM systems rely on environment variables and hosted function behavior, so they may not fully work in a plain local static copy.
- Most of the site is still plain HTML, CSS, and JavaScript, but v13 is clearly more app-like than the older release branches because of the shared launcher, request/admin flow, dynamic update page, VM support, and remote function integrations.
