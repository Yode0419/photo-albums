# Photo Albums - Static Slideshow System

A pure HTML/CSS/JavaScript photo album system designed for GitHub Pages deployment. No frameworks, no build steps, just simple static files.

## Features

- **Pure Static**: No React, Vue, or any framework - just vanilla JavaScript
- **GitHub Pages Ready**: Deploy directly without any build process
- **JSON-Driven**: Manage albums and photos through simple JSON files
- **Shared Template**: Single slideshow page serves all albums
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Touch-Friendly**: Swipe gestures for mobile navigation
- **Keyboard Navigation**: Arrow keys for quick browsing
- **Lazy Loading**: Optimized image loading for better performance

## Live Demo

Try the demo album: `/album/?a=demo-album`

## Project Structure

```
photo-albums/
├── index.html                    # Album index page
├── albums/
│   ├── index.json                # List of all albums
│   └── <album-slug>/             # Each album folder
│       ├── album.json            # Album configuration
│       ├── cover.jpg             # Cover image for index page
│       ├── photo1.jpg            # Photos
│       ├── photo1_thumb.jpg      # Thumbnails (optional)
│       └── ...
├── album/
│   └── index.html                # Shared slideshow template
├── assets/
│   ├── css/
│   │   ├── base.css              # Global styles
│   │   └── album.css             # Slideshow styles
│   ├── js/
│   │   ├── utils.js              # Shared utilities
│   │   ├── index.js              # Index page logic
│   │   └── album.js              # Slideshow logic
│   └── icons/
│       └── favicon.svg
└── README.md
```

## How to Add a New Album

### Step 1: Create Album Folder

Create a new folder under `albums/` with your album slug:

```
albums/
└── my-trip-2025/
    ├── album.json
    ├── cover.jpg
    ├── photo1.jpg
    ├── photo1_thumb.jpg
    └── photo2.jpg
```

### Step 2: Add Your Photos

Place all photos directly in the album folder. You can organize them however you like:
- `cover.jpg` - Cover image for the index page
- `photo1.jpg`, `photo2.jpg`, etc. - Your photos
- `photo1_thumb.jpg`, `photo2_thumb.jpg` - Thumbnails (optional)

### Step 3: Create album.json

Create `albums/my-trip-2025/album.json`:

```json
{
  "title": "My Amazing Trip 2025",
  "photos": [
    {
      "id": "001",
      "src": "photo1.jpg",
      "thumb": "photo1_thumb.jpg",
      "caption": "Beautiful sunset at the beach."
    },
    {
      "id": "002",
      "src": "photo2.jpg",
      "caption": "Mountain hiking adventure."
    }
  ]
}
```

**Field Reference:**
- `id`: Unique identifier for the photo (required)
- `src`: Photo filename in the same folder (required)
- `thumb`: Thumbnail filename (optional, uses `src` if missing)
- `caption`: Photo description (optional, can be empty string)

**Note:** All paths are relative to the album folder itself.

### Step 4: Add to Album Index

Edit `albums/index.json` to add your album to the main list:

```json
{
  "albums": [
    {
      "slug": "my-trip-2025",
      "title": "My Amazing Trip 2025",
      "cover": "./albums/my-trip-2025/cover.jpg",
      "description": "A memorable journey through mountains and beaches."
    }
  ]
}
```

**Field Reference:**
- `slug`: Album identifier used in URL (must match folder name)
- `title`: Album display name
- `cover`: Path to cover image (relative to index.html)
- `description`: Short album description (optional)

That's it! Your album will now appear on the index page.

## URL Structure

### Album Index
```
/
```

### Individual Album
```
/album/?a=<album-slug>
```

### Start at Specific Photo (Optional)
```
/album/?a=<album-slug>&p=3
```
This will open the album starting at photo #3.

## Navigation

### Desktop
- **Arrow Keys**: ← → to navigate between photos
- **Click**: Click chevron buttons or thumbnails
- **Esc**: Return to album index

### Mobile/Touch
- **Swipe**: Swipe left/right to change photos
- **Tap**: Tap thumbnails to jump to specific photo

## Single Photo Albums

If an album contains only one photo, the system automatically:
- Hides navigation arrows
- Hides thumbnail strip
- Disables keyboard/swipe navigation

## Deployment to GitHub Pages

### Option 1: Main Branch

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source: "Deploy from a branch"
4. Choose branch: `main` and folder: `/ (root)`
5. Click Save

Your site will be available at:
```
https://<username>.github.io/<repository-name>/
```

### Option 2: Custom Domain

Follow GitHub's documentation for [custom domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Tips

1. **Optimize Images**: Compress photos before uploading
2. **Use Thumbnails**: Create smaller thumbnail versions for the thumbnail strip
3. **Lazy Loading**: The system uses native lazy loading for thumbnails
4. **External CDN**: Consider using a CDN for photos (like Cloudinary or imgix)

## Customization

### Change Colors

Edit CSS variables in [assets/css/base.css](assets/css/base.css):

```css
:root {
  --color-accent: #2563eb;  /* Change primary color */
  --color-bg: #ffffff;      /* Background color */
  --color-text: #1a1a1a;    /* Text color */
}
```

### Modify Layout

- **Index page**: Edit [assets/css/base.css](assets/css/base.css)
- **Slideshow page**: Edit [assets/css/album.css](assets/css/album.css)

### Add Features

The codebase is intentionally simple and easy to extend:
- **Autoplay**: Add timer in [assets/js/album.js](assets/js/album.js)
- **Fullscreen**: Add fullscreen API calls
- **Download**: Add download buttons
- **Share**: Add Web Share API integration

## Technical Details

### No Build Required

This project deliberately avoids build tools:
- ✅ No npm/webpack/vite
- ✅ No transpilation
- ✅ No bundling
- ✅ Direct file editing

### Zero Dependencies

- ✅ No jQuery
- ✅ No external libraries
- ✅ Pure vanilla JavaScript
- ✅ Native CSS features only

### SEO Considerations

For better SEO, consider:
1. Adding meta descriptions to album pages
2. Using semantic HTML (already implemented)
3. Adding Open Graph tags for social sharing
4. Creating a sitemap.xml

## Troubleshooting

### Photos not loading?
- Check file paths in JSON files
- Ensure CORS headers if using external URLs
- Verify image URLs are accessible

### Album not showing on index page?
- Verify `albums/index.json` syntax
- Check that album slug matches folder name
- Clear browser cache

### Slideshow not working?
- Check browser console for JavaScript errors
- Ensure `?a=<slug>` parameter is in URL
- Verify album JSON file exists and is valid

## Contributing

This is a minimal starter template. Feel free to fork and customize for your needs.

## License

MIT License - Feel free to use for personal or commercial projects.

## Credits

- Demo photos from [Picsum Photos](https://picsum.photos)
- Icons: Inline SVG (no external dependencies)

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**
