const API_KEY = '24206659-085fc8a8bf5db593be5a49f71';
const BASE_URL = 'https://pixabay.com/api';
export function fetchImages(query, page) {
  return fetch(
    `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(r => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error('No images found'));
  });
}
