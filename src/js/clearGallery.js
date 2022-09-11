import { getRefs } from './getRefs.js';
const refs = getRefs();

export function clearGallery() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}
