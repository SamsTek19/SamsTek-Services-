# SamsTek Services — Hero video generation prompt

Copy this prompt into **Runway Gen-3**, **Pika**, **Sora**, **Kling**, or similar tools.

---

## Master prompt (10–15 seconds, 16:9, loop)

Cinematic hero background video for a technology training brand. Opens on a dark royal blue futuristic digital environment: glowing cyan grid lines, floating holographic code snippets, data streams, circuit patterns, and soft particle light. Slow smooth camera dolly forward through the space.

Mid sequence: diverse students and professionals at modern desks learning on laptops—programming, web development, graphic design on screens, cybersecurity dashboards, AI interfaces. Show glowing monitors with code editors, website mockups, analytics dashboards, and floating tech icons (React, Python, shield, AI brain) with subtle pulse animations.

Lighting: premium royal blue (#2563EB) and cyan (#06B6D4) accents, white highlights, deep slate shadows. Futuristic, inspiring, professional, high-end corporate tech commercial style. Smooth motion graphics, shallow depth of field, lens flare, 24fps cinematic look.

Final 3 seconds: elegant typography fades in centered on screen—

**SamsTek Services**  
*Learn. Build. Grow.*

then crossfade to:

**Practical Tech Skills for the Future**

End frame matches opening frame for seamless loop. No harsh cuts. 1920×1080, 16:9.

---

## Negative prompt

cartoon, low quality, blurry text, watermark, logo distortion, shaky camera, cluttered composition, loud colors, comedy, horror

---

## Post-production checklist

1. Export **MP4 H.264**, no audio (or strip audio).
2. Trim to **10–15 seconds**.
3. Ensure **frame 0 ≈ frame end** for seamless loop (cross-dissolve last 0.5s into first frame in Premiere / DaVinci / CapCut).
4. Compress for web: target **2–8 MB** (HandBrake: RF 22–26, web optimized).
5. Save as `public/videos/hero.mp4` or upload to Cloudinary and set `VITE_HERO_VIDEO_URL`.

---

## Cloudinary upload (optional)

```bash
# After upload, use the secure URL in .env
VITE_HERO_VIDEO_URL=https://res.cloudinary.com/YOUR_CLOUD/video/upload/samstek-hero.mp4
```
