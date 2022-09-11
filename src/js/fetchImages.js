const URL = 'https://pixabay.com/api/';

export async function fetchImages(searchValue, pageNumber) {
  const SEARCH_PARAMS = new URLSearchParams({
    key: '29748197-52bbc011c9b877a520d9a42a8',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: pageNumber,
  });
  return await fetch(`${URL}?${SEARCH_PARAMS}`)
    .then(async response => {
      if (!response.ok || response.status === 404) {
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
