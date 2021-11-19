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
    
    fetchCountries(e.target.value)
        .then(response => response.json())
        .then(countries => console.log(countries))

}

refs.input.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));