# Crafted Gamz v6

This is v6 of Crafted Gamz, an older version of the web based game loader that builds on v5 with an overlay page, a different Minesweeper version, and a few more game experiments.

## What's new in v6

- Updated the project status system to use `crafted-gamz-v6`.
- Added `ovl.html`, an overlay-style page with an iframe, search bar, Games button, 3kho button, and Disable Overlay button.
- Added a newer `games/minesweeper` folder and switched the main loader to use it.
- Added a Cube Realm test/shortcut.
- Kept the Windows section powered by js-dos.
- Kept DOSBox and Windows 95 links.
- Kept the web app manifest.
- Kept the local Font Awesome script.
- Kept Pico-8 Super Hot.
- Kept Wordle files in the games folder.
- Kept the `*` key shortcut that sends the browser to Google Drive.
- Kept the hidden `j` key shortcut for Atticus Badlands.
- Kept the expanded theme options:
  - Light
  - Dark
  - Sunset
  - Sky
  - Nuclear
  - Ocean
  - Poison

## Games and sections included

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
- DOSBox
- Windows 95
- Pico-8 Super Hot
- Wordle
- Cube Realm shortcut
- Coloron
- Color Shooter
- Bullseye
- Flip
- Planet Defense
- Atticus Badlands

## Notes

This is still an older version, so some links and pages may be unfinished. The main navbar still includes Minecraft Versions and Scratch games, but those folders do not appear to be included in this branch.

The main loader also has links for Osu and Retro Emulation, but the matching folders do not appear to be included here. Wordle is included in the files but is commented out on the main loader.

Some buttons still point to older names like `gameloader.html`, so they may need path fixes depending on how this version is hosted.

Most games are still plain HTML, CSS, and JavaScript, so the site can run directly in a browser without a build step.
