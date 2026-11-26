# Scene 1.6.1 — Autoplay & Flexible Video Sources

Scene opens a room-wide video modal when the Game Master selects **Play for everyone**. Connected players do not need to open the extension popover or press a Play button themselves.

## What's new in 1.6.0

- Automatically opens the video on connected room members' screens.
- Attempts audible autoplay first for direct video files; if the browser blocks sound, retries muted so the video can still start automatically.
- YouTube and Vimeo embeds use muted autoplay to improve the chance that playback starts without a viewer click. A viewer may need one tap to enable sound.
- Supports direct public MP4, WebM, OGG, and OGV URLs.
- Supports YouTube, Vimeo, Google Drive preview links, and generic provider embed/player URLs.
- Adds source modes: Auto detect, Direct video file, and Embedded player link.
- Keeps the minimal English interface, per-Scene saved settings, Preview, Auto-close, Play for everyone, and Stop for everyone.

## Important autoplay behavior

The extension automatically opens the video and attempts to start it. Modern browsers may block autoplay with sound. The extension therefore attempts audible playback and falls back to muted autoplay for direct video files; YouTube/Vimeo embeds start with muted autoplay. If a browser blocks even muted autoplay, that browser may still require a click. An extension cannot bypass the browser's autoplay policy.

## Video links and local files

Use a URL that every player can access:

- **Direct video file:** a public direct link ending in `.mp4`, `.webm`, `.ogg`, or `.ogv`.
- **YouTube / Vimeo:** paste the normal share link; Scene converts it to an embed player.
- **Google Drive:** paste a public `drive.google.com/file/d/.../view` link. The file must be shared so viewers can access it.
- **Other providers:** choose **Embedded player link** and paste the provider's embed/player URL. The provider must allow embedding in an iframe. Ordinary watch pages may not work; use the provider's embed URL.
- **Local file on your computer:** a file picker or local file path cannot be shared to other players by this extension. Upload the video to a public video host or storage service first, then paste its public direct or embed URL.

Owlbear Rodeo's current Assets API provides upload methods for images and scenes, not video files. Broadcast messages are limited to 16 KB, so the extension sends the video URL rather than the video bytes.

## Requirements

- Node.js 20 or later recommended
- Owlbear Rodeo 2.0

## Local development

1. Extract this ZIP.
2. Open the `token-intro-extension` folder in Visual Studio Code.
3. Open Terminal and run:

   ```bash
   npm install
   npm run dev
   ```

4. Keep the terminal running. The local manifest is:

   `http://localhost:5173/manifest.json`

5. In Owlbear Rodeo, remove the previous Scene installation and add the new manifest URL.
6. Enable the extension for the Game Master and each player in the Room.

## Use

1. Open Scene as the Game Master.
2. Paste a public video URL.
3. Choose **Auto detect**, **Direct video file**, or **Embedded player link**.
4. Select **Preview video** to check the source.
5. Optionally set **Auto-close after**. Use `0` to keep the video open until the file ends or the GM stops it.
6. Select **Save** to store the settings in the current Scene, or **Play for everyone** to save and start playback immediately.
7. Select **Stop for everyone** to close the video on all connected clients.

## Public hosting

The localhost URL works only on the computer running the development server. To let other players install the extension from their own computers, build the project and deploy the `dist/` folder to an HTTPS static host. Use the hosted `/manifest.json` URL in Owlbear Rodeo.
