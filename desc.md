# Crafted Gamz v5

This is v5 of Crafted Gamz, an older version of the web based game loader with more sections added back into the main navbar. This version brings in Windows/DOSBox support, a web app manifest, local Font Awesome, and a few more hidden controls.

## What's new in v5

- Updated the project status system to use `crafted-gamz-v5`.
- Added a web app manifest so the site can be opened like a standalone app.
- Added a local Font Awesome script instead of loading it from the CDN.
- Added a Windows section powered by js-dos.
- Added links for DOSBox and Windows 95.
- Added the Pico-8 Super Hot cart.
- Added Wordle files into the games folder.
- Added a `*` key shortcut that sends the browser to Google Drive.
- Kept the hidden `j` key shortcut for Atticus Badlands.
- Added Settings buttons for going back to the loader and enabling the overlay version.
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
- Coloron
- Color Shooter
- Bullseye
- Flip
- Planet Defense
- Atticus Badlands

## Notes

This is still an older version, so some links and pages may be unfinished. The main navbar includes Minecraft Versions and Scratch games, but those folders do not appear to be included in this branch.

The main loader also has links for Osu and Retro Emulation, but the matching folders do not appear to be included here. Wordle is included in the files but is commented out on the main loader.

Some back buttons still point to older names like `gameloader.html` or `game loader.html`, so they may need path fixes depending on how this version is hosted.

Most games are still plain HTML, CSS, and JavaScript, so the site can run directly in a browser without a build step.
