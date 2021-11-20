import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    listItem: document.querySelector('.country-info')
};
// console.log(refs.input, refs.countryList, refs.listItem);
  
const onCountrySearch = e => {
    const countryName = e.target.value.toLowerCase()

    fetchCountries(countryName) //Promise {<pending>}
        .then(renderCountries)
        .catch(handleError);
}

const renderCountries = data => {
    const markup = createMarkupList(data);
    console.log(markup);

    refs.countryList.innerHTML = markup;
};

const handleError = err => {
    console.log('ERROR');
}
   

refs.input.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

const createMarkupList = data => {
    return data.map(({ name, flags }) =>
        `<div>
            <img
            class='flag-img'
            src='${flags.svg}'
            alt='country flag'
            width='40'
            height='auto'
            />
            <p>${name.common}</p>
        </div>`,
    )
    .join('');   
}
