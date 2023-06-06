import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { PixabayAPI } from './pixabayApi.js';
import { createGalleryMarkup } from './createGalleryCardMarkup.js'

const searchFormEl = document.querySelector('#search-form');
const createMarkup = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');

const pixabayAPI = new PixabayAPI();

const handleSearchFormSubmit = event => {
  event.preventDefault();
  
  const searchQuery = event.target.elements.searchQuery.value.trim();
  
  if (searchQuery === '') {
    return;
  }
  
  pixabayAPI.page = 1;
  pixabayAPI.query = searchQuery;
  
  pixabayAPI.fetchPhoto()
    .then(({ data }) => {
      searchFormEl.reset();
     
      if (data.total === 0) {
        createMarkup.innerHTML = '';
        setTimeout(() => {
          Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }, 400);
        return;
      }
      
      setTimeout(() => {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
      }, 400);

      if (data.total <= 40) {
        loadMoreBtn.classList.add('is-hidden');
        createMarkup.innerHTML = createGalleryMarkup(data.hits);
        setTimeout(() => {
          Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }, 4000);
        return;
      }
      
      createMarkup.innerHTML = createGalleryMarkup(data.hits);
      loadMoreBtn.classList.remove('is-hidden');
      lightbox.refresh();
    })
    .catch(() => {
      setTimeout(() => {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }, 400);
    });
};

const handleLoadMoreButtonClick = event => {
  pixabayAPI.page += 1;

  pixabayAPI.fetchPhoto()
    .then(({ data }) => {
      createMarkup.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));

      if (data.total === data.totalHits) {
        loadMoreBtn.classList.add('is-hidden');
        setTimeout(() => {
          Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }, 1500);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreButtonClick);