// Shared utility functions

/**
 * Parse query string parameters from URL
 * @param {string} param - The parameter name to retrieve
 * @returns {string|null} The parameter value or null if not found
 */
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/**
 * Fetch JSON data with error handling
 * @param {string} url - The URL to fetch from
 * @returns {Promise<Object>} The parsed JSON data
 */
async function fetchJSON(url) {
  try {
    console.log('Fetching:', url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching JSON from', url, ':', error);
    throw error;
  }
}

/**
 * Show an error message to the user
 * @param {string} message - The error message to display
 * @param {HTMLElement} container - The container element to display the error in
 */
function showError(message, container) {
  container.innerHTML = `
    <div style="text-align: center; padding: 48px 16px; color: #a0a0a0;">
      <p style="font-size: 18px; margin-bottom: 8px;">⚠️</p>
      <p>${message}</p>
    </div>
  `;
}
