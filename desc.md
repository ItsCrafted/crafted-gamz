# Crafted Gamz v4

This is v4 of Crafted Gamz, another older version of the web based game loader. This version keeps the main launcher simple, keeps the extra theme options from v3, and changes how some hidden/extra games are opened.

## What's new in v4

- Updated the project status system to use `crafted-gamz-v4`.
- Added `attbswitch.js` so pressing `j` on the main loader opens Atticus Badlands.
- Added `attbswitchgames.js` so pressing `j` from game subpages can also open Atticus Badlands.
- Kept the expanded theme list:
  - Light
  - Dark
  - Sunset
  - Sky
  - Nuclear
  - Ocean
  - Poison
- Kept Cookie Clicker with the warning page before launching.
- Kept the Chrome Dino Game.
- Added a Friday Night Funkin button to the main game loader.
- Cleaned up the main navbar so it only shows JavaScript Racer and Settings.
- Removed some of the v3 launcher buttons from the main page.

## Games included

- 2048
- Tetris
- Snake
- Original Pong
- Hextris
- Minesweeper
- Tic Tac Toe
- Stack
- Menja
- Cookie Clicker
- Dino Game
- JavaScript Racer
- Coloron
- Color Shooter
- Bullseye
- Flip
- Planet Defense
- Atticus Badlands

## Notes

This is still an older version, so some things may be unfinished or broken. Tic Tac Toe is still marked as very buggy.

The main loader has a Friday Night Funkin button, but the `games/FNF` folder does not appear to be included in this branch, so that link may not work unless the files are added back.

Some older links inside subpages still point to old folders like Minecraft Versions or Scratch games, even though those folders are not included here.

Most games are plain HTML, CSS, and JavaScript, so the site can still run directly in a browser without a build step.
