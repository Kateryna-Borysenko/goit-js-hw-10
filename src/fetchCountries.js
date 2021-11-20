const BASE_URL = `https://restcountries.com/v3.1/name`;

export default function fetchCountries(name) {
    // Чтобы сократить объем передаваемых данных добавь строку параметров запрос ?fields=name,capital,population,flags,languages
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.status === 404) { //{status: 404, message: 'Not Found'}
        
                return Promise.reject(new Error(data.message));
            }
            return data;
        });
}
