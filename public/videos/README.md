# Hero background video

Place your cinematic hero video here as **`hero.mp4`**.

## Specs

| Property    | Value                                      |
|-------------|--------------------------------------------|
| Duration    | 10–15 seconds                              |
| Resolution  | 1920×1080 (or 4K)                          |
| Aspect ratio| 16:9                                       |
| Format      | MP4 (H.264)                                |
| Audio       | None (muted background)                    |
| Loop        | Seamless loop (last frame ≈ first frame)   |

## Alternative: Cloudinary / CDN URL

Set in `.env`:

```env
VITE_HERO_VIDEO_URL=https://res.cloudinary.com/your-account/video/upload/hero.mp4
```

## AI video prompt

See `docs/hero-video-prompt.md` for a ready-to-use prompt (Runway, Pika, Sora, etc.).

Until a video is added, the site uses a **CSS motion-graphics fallback** that matches the same brand (royal blue, cyan, code streams, title sequence).
