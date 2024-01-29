import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '42057283-adafa6fc2ce046555d94b0faa';
const loading = document.getElementById('loading');

const refs = {
    form: document.querySelector('.form'),  
    input: document.querySelector('.form-input'), 
    gallery: document.querySelector('.gallery'),
    resultContainer: document.querySelector('.resultContainer'),
    searchBtn: document.querySelector('.search-button'), 
};

function showErrorMessage(message) {
    iziToast.show({
      position: 'topLeft',
      message,
      backgroundColor: '#EF4040',
      messageColor: '#FAFAFB',
      messageSize: '16px',
      close: false,
      closeOnClick: true,
      closeOnEscape: true,
    });
  }

  const lightbox = new SimpleLightbox('.gallery-item a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

refs.form.addEventListener('submit', submitFunction);
refs.form.addEventListener('submit', showLoader)

function hideLoader() {
    setTimeout(() => {
        refs.resultContainer.classList.add('is-hidden');
        }, 500);
  };

  function showLoader() {
        refs.resultContainer.classList.remove('is-hidden');
  }; 

function submitFunction(event) {
    event.preventDefault();
    refs.resultContainer.innerHTML = '';
    const form = event.currentTarget
    
    const name = form.elements.input.value.trim();
    
    if (!name) {
        showErrorMessage('Please enter a search term');
        return;
    }

 imageByName(name)
        .then(data => {
            const hits = data.hits;
            const markup = hits.map(largeImageURL => createMarkUp(largeImageURL)).join(' ');
            refs.resultContainer.innerHTML = markup;
            console.log(createMarkUp.hits)
        })
        .finally(() => form.reset());
}

function imageByName(name){
    return fetch(`${BASE_URL}/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(res => {
        if(!res.ok){
            createMessage(
                `The search field can't be empty! Please, enter your request!`
              );
              return;
        }
        return res.json()
    })
}

function createMarkUp({webformatURL,largeImageURL,tags,likes,views,comments,downloads,}){
    return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
      <img
        class="gallery-image"
        src="${webformatURL}"
        alt="${tags}"
      />
        <p class="gallery-descr">
        <span class="cont-in-p">
        <svg
        width="20"
        height="20"
        class="icon-in-block">
        <use href="../icons.svg#icon-heart"></use>
        </svg>
        <span class="descr-span">${likes}</span> 
        </span>
        <span class="cont-in-p">
        <svg
        width="20"
        height="20"
        class="icon-in-block">
        <use href="../icons.svg#icon-eye"></use>
        </svg>
        <span class="descr-span">${views}</span> 
        </span>
        <span class="cont-in-p">
        <svg
        width="20"
        height="20"
        class="icon-in-block">
        <use href="../icons.svg#icon-bubble2"></use>
        </svg>
        <span class="descr-span">${comments}</span> 
        </span>
        <span class="cont-in-p">
        <svg
        width="20"
        height="20"
        class="icon-in-block">
        <use href="../icons.svg#icon-arrow-down"></use>
        </svg>
        <span class="descr-span">${downloads}</span>
        </span>
        </p>
      </a>
    </li>`
}