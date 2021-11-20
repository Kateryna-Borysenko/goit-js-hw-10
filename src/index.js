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
    const countryName = e.target.value;
    if (countryName === '') {
        return;
    }
    if (countryName.length === 1) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }
    fetchCountries(countryName) //Promise pending
        .then(renderCountries)
        .catch(handleError);
}

// Promise fulfilled
const renderCountries = data => {

    if (data.length > 2 && data.length < 11) {
        
        refs.countryList.innerHTML = createMarkupList(data);
        refs.listItem.innerHTML = '';

    } else {
        if (data.length === 1) {
            
            refs.listItem.innerHTML = createMarkupItem(data);;
            refs.countryList.innerHTML = '';
        }
    }   
};

// Promise rejected
const handleError = error => {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    refs.input.value = '';
    refs.countryList.innerHTML = '';
    refs.listItem.innerHTML = '';
};
   

refs.input.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

const createMarkupList = data => {
    return data.map(({ name, flags }) =>
        
        `<li>
            <img
            class='flag-img'
            src='${flags.svg}'
            alt='country flag'
            width='40'
            height='auto'
            />
            <p class = 'country-name'>${name.common}</p>
        </li>`,
    )
    .join('');   
}

const createMarkupItem = data => {
    return data.map(({ name, flags, population, languages, capital}) =>

        `<div>
            <img
            class='flag-img'
            src='${flags.svg}'
            alt='country flag'
            width='40'
            height='auto'
            />
            <h2 class = 'country-name'>${name.common}</h2>
            <p class = 'country-capital'><strong>Capital:</strong> ${capital}</p>
            <p class = 'country-population'><strong>Population:</strong> ${population}</p>
            <p class = 'country-languages'><strong>Languages:</strong> ${languages.ukr}</p>
        </div>`,
    )
    .join('');
};

// TODO: добавить lenguages

/* <svg class='icon-svg' width='40' height='auto'>
    <use href='${flags.svg}'></use>
</svg> */