import axios from 'axios';
import url from '../config';

function list(query={}) {
    const apiUrl = `${url.baseApi}films`
    return axios.get(apiUrl, {
        params: query
    });
}

const filmsService = {
    list
};

export default filmsService;
