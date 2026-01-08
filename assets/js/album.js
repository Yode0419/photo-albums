// Slideshow Page Logic using Swiper

let albumData = null;
let photos = [];
let mainSwiper = null;
let thumbSwiper = null;

document.addEventListener("DOMContentLoaded", async () => {
  // Get album slug from URL
  const slug = getQueryParam("a");

  if (!slug) {
    showError("Album not found. No album specified in URL.", document.body);
    return;
  }

  try {
    // Fetch album data
    const albumPath = `../albums/${slug}`;
    albumData = await fetchJSON(`${albumPath}/album.json`);

    if (!albumData || !albumData.photos || albumData.photos.length === 0) {
      showError("No photos found in this album.", document.body);
      return;
    }

    // Convert relative photo paths to absolute paths from the album folder
    photos = albumData.photos.map((photo) => ({
      ...photo,
      src: `${albumPath}/${photo.src}`,
      thumb: photo.thumb
        ? `${albumPath}/${photo.thumb}`
        : `${albumPath}/${photo.src}`,
    }));

    // Initialize the slideshow
    initSlideshow();
  } catch (error) {
    showError(
      `Failed to load album "${slug}". Please check if it exists.`,
      document.body
    );
  }
});

/**
 * Initialize the slideshow with Swiper
 */
function initSlideshow() {
  // Set album title
  document.getElementById("album-title").textContent =
    albumData.title || "Photo Album";

  // Render main photos
  renderMainPhotos();

  // Render thumbnails
  renderThumbnails();

  // Initialize Swiper after DOM is ready
  setTimeout(() => {
    initSwipers();
  }, 100);
}

/**
 * Render main photos into swiper
 */
function renderMainPhotos() {
  const wrapper = document.getElementById("main-swiper-wrapper");
  wrapper.innerHTML = "";

  photos.forEach((photo) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    // Create zoom container for pinch-to-zoom support
    const zoomContainer = document.createElement("div");
    zoomContainer.className = "swiper-zoom-container";

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption || "Photo";
    img.loading = "lazy";

    zoomContainer.appendChild(img);
    slide.appendChild(zoomContainer);
    wrapper.appendChild(slide);
  });
}

/**
 * Render thumbnails into swiper
 */
function renderThumbnails() {
  const wrapper = document.getElementById("thumb-swiper-wrapper");
  wrapper.innerHTML = "";

  photos.forEach((photo) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const img = document.createElement("img");
    img.src = photo.thumb;
    img.alt = photo.caption || "Thumbnail";
    img.loading = "lazy";

    slide.appendChild(img);
    wrapper.appendChild(slide);
  });
}

/**
 * Initialize both Swiper instances
 */
function initSwipers() {
  // Check for single photo mode
  const isSinglePhoto = photos.length === 1;

  if (isSinglePhoto) {
    // Hide thumbnail container for single photo (keep space for consistent caption position)
    const thumbContainer = document.getElementById("thumbnail-container");
    thumbContainer.style.visibility = "hidden";
    thumbContainer.style.borderTop = "none";
  }

  // Initialize thumbnail swiper first
  thumbSwiper = new Swiper(".thumb-swiper", {
    spaceBetween: 8,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    mousewheel: true,
  });

  // Initialize main swiper
  mainSwiper = new Swiper(".main-swiper", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: { enabled: true, onlyInViewport: true },
    thumbs: { swiper: thumbSwiper },
    zoom: {
      maxRatio: 3,
      minRatio: 1,
      toggle: true,
    },

    on: {
      init(sw) {
        syncThumbTo(sw.realIndex ?? sw.activeIndex);
        updateCaption(sw.realIndex ?? sw.activeIndex);
      },
      slideChange(sw) {
        const idx = sw.realIndex ?? sw.activeIndex;
        updateCaption(idx);
        syncThumbTo(idx);
      },
    },
  });

  // Show initial caption
  updateCaption(0);
}

/**
 * Update caption based on current slide
 * @param {number} index - Current slide index
 */
function updateCaption(index) {
  const captionElement = document.getElementById("caption");
  const photo = photos[index];
  captionElement.textContent = photo.caption || "";
}

function syncThumbTo(index) {
  if (!thumbSwiper) return;

  // 讓縮圖列把目前那張帶到視野內（置中偏好）
  // index - 1 是讓 active 不要永遠貼最右側，可自行調整
  const target = Math.max(0, index - 1);
  thumbSwiper.slideTo(target);
}
