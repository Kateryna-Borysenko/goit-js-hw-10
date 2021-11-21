const BASE_URL = `https://restcountries.com/v3.1/name`;

export default function fetchCountries(name) {
    // Чтобы сократить объем передаваемых данных добавь строку параметров запрос ?fields=name,capital,population,flags,languages
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
        
            if (response.status === 404) { 
        
                return Promise.reject(new Error(response.message));
            }
            return response;
        })
        .then(data =>  data.json())
}
