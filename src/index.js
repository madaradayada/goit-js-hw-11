import fetchImg from './js/fetchImg';
import markupGallery from './js/markupGallery';
import scroll from './js/scroll';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const { searchForm, gallery, loadMoreBtn, endOfResults } = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  endOfResults: document.querySelector('.gallery-end'),
};

let page = 1;
let currentHits = 0;
let searchQuery = '';

searchForm.addEventListener('submit', onSearch);

async function onSearch(evt) {
  evt.preventDefault();
  searchQuery = evt.currentTarget.searchQuery.value.trim();
  page = 1;

  if (searchQuery === '') {
    gallery.innerHTML = '';
    return;
  }

  const response = await fetchImg(searchQuery, page);
  currentHits = response.hits.length;

  if (response.totalHits > 40) {
    loadMoreBtn.classList.remove('is-hidden');
    endOfResults.classList.add('is-hidden');
  } else {
    loadMoreBtn.classList.add('is-hidden');
    endOfResults.classList.remove('is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHTML = '';
      markupGallery(response.hits, gallery);
      scroll(-100);
    }

    if (response.totalHits === 0) {
      gallery.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('is-hidden');
      endOfResults.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

loadMoreBtn.addEventListener('click', onLoadMore);

async function onLoadMore() {
  page += 1;
  const response = await fetchImg(searchQuery, page);
  markupGallery(response.hits, gallery);
  currentHits += response.hits.length;

  scroll(2);

  if (currentHits === response.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    endOfResults.classList.remove('is-hidden');
  }
}
