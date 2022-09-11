import { getRefs } from './getRefs.js';
const refs = getRefs();

export function renderGallery(array) {
  const markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <div class="photo-card">
        <a href="${largeImageURL}" class="photo-link">
            <img
                class="photo-image"
                src="${webformatURL}"
                alt="${tags}"
                title="${tags}"
                loading="lazy"
            />
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
                <span class="info-api">${likes}</span>
            </p>
            <p class="info-item">
                <b>Views</b>
                <span class="info-api">${views}</span>
            </p>
            <p class="info-item">
                <b>Comments</b>
                <span class="info-api">${comments}</span>
            </p>
            <p class="info-item">
                <b>Downloads</b>
                <span class="info-api">${downloads}</span>
            </p>
        </div>
    </div>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
