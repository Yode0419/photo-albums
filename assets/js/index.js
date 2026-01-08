// Album Index Page Logic

document.addEventListener('DOMContentLoaded', async () => {
  const albumListContainer = document.getElementById('album-list');

  if (!albumListContainer) {
    console.error('Album list container not found');
    return;
  }

  try {
    // Fetch the album list
    const data = await fetchJSON('./albums/index.json');

    // Check if there are any albums
    if (!data.albums || data.albums.length === 0) {
      showError('No albums found.', albumListContainer);
      return;
    }

    // Render each album card
    data.albums.forEach(album => {
      const card = createAlbumCard(album);
      albumListContainer.appendChild(card);
    });

  } catch (error) {
    showError('Failed to load albums. Please try again later.', albumListContainer);
  }
});

/**
 * Create an album card element
 * @param {Object} album - The album data object
 * @returns {HTMLElement} The album card element
 */
function createAlbumCard(album) {
  const link = document.createElement('a');
  link.href = `./album/?a=${album.slug}`;
  link.className = 'album-card';

  const cover = document.createElement('img');
  cover.src = album.cover;
  cover.alt = album.title;
  cover.className = 'album-card-cover';
  cover.loading = 'lazy';

  const content = document.createElement('div');
  content.className = 'album-card-content';

  const title = document.createElement('h2');
  title.textContent = album.title;

  content.appendChild(title);

  if (album.description) {
    const description = document.createElement('p');
    description.textContent = album.description;
    content.appendChild(description);
  }

  link.appendChild(cover);
  link.appendChild(content);

  return link;
}
