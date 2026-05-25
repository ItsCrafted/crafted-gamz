# Crafted Gamz Version 10

## Crafted Gamz v10

This is v10 of Crafted Gamz, also shown on the Miscellaneous page as version 10.0 and release 10. This version builds on the v9 loader by expanding the boot and disguise system, adding music and more settings, adding more utility pages, and bringing in a few more games and experiments.

## What's new in v10

- Updated the project status system to use `crafted-gamz-v10`.
- Kept the larger main loader layout and expanded it with new game entries such as Block Blast, Flappy Plane: September Edition, and Dune.
- Added more boot and disguise pages in the `Boot` folder, including selector, alpha, beta, gamma, delta, battery launch checks, and alternate login and video launch flows.
- Kept the splash-video style startup and the loader time tracking system.
- Added background music support with 5 selectable tracks, saved volume, and repeat settings in `localStorage`.
- Expanded the Settings page with panic button settings, disguise screen selection, clock settings, and more theme choices.
- Added more theme backgrounds including The Enforcer, The 1000 Yard Stare, Wilder, and several extra theme slots.
- Kept time tracking in `localStorage` for time spent in the loader.
- Kept Movies And TV, Link Archive, Minecraft Version Selector, Javascript Racer Level Selector, Miscellaneous, and Crafted AI.
- Added more Miscellaneous pages such as Total Time With Crafted Gamz, Calculator, Forums, Help Center, Tips and Tricks, Crafted Cloud Services, and GoGuardian Zapper.
- Kept the panic hotkey system and browser redirect and disguise features.

## Games and sections included

- A Small World Cup
- Block Blast
- Basket Bros
- Chrome Dino Runner
- Cookie Clicker
- Death Run 3D
- Flappy Bird
- FNAF 1
- Gun Spin
- Minecraft
- Slope
- Slope 2
- Snow Rider 3D
- Spacebar Clicker
- Goofy A$$ Temple Run
- The Binding of Isaac
- The World's Hardest Game
- Tomb Of The Mask
- Core Ball
- 2048
- Snake
- Tetris
- Pong
- Hextris
- Minesweeper
- Tic Tac Toe
- Stacking Game
- Menja
- Tanuki Sunset
- Flappy Plane: September Edition
- Crafted AI
- *Special* 2048
- Dune
- Minecraft Version Selector
- Javascript Racer Level Selector
- Link Archive
- Movies And TV
- Miscellaneous

## Notes

- This branch still has a few unfinished or missing paths. Several pages still point to `gameloader.html`, but that file does not appear to be included in this branch, so some back buttons and boot flows may need path fixes depending on how v10 is hosted.
- The main index links Chrome Dino Runner through `games/GF4/HTMLN4.html`, but the `GF4` folder currently contains `game.html` instead, so that launcher link may need fixing.
- `index.html` still references `mainfest.json`, but that manifest file does not appear to be included here.
- Some settings and boot entries look unfinished. The Settings page still has placeholder theme options like `option3` through `option9`, and `battery3.html` is currently marked `under work`.
- The Miscellaneous page lists this release as version `10.0` with `62` games, `6` bug fixes or antiblocks, and release number `10`.
- Some icons and special characters still show encoding issues in a few files.
- Movies And TV, Crafted AI, and some other tools rely on outside pages or services, so not everything in this branch is fully self-contained.
- Most games are still plain HTML, CSS, and JavaScript, so the site can run directly in a browser without a build step.
