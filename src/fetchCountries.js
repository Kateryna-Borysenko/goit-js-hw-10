//вынести
const BASE_URL = `https://restcountries.com/v3.1/name`;

export default function fetchCountries(name) {
    // Чтобы сократить объем передаваемых данных добавь строку параметров запрос
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`);
}
