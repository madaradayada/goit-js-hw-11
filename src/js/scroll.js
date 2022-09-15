export default function scroll(step) {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * step - 100,
    behavior: 'smooth',
  });
}
