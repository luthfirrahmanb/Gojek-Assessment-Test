import axios from 'axios';
import url from '../config';

function list(query={}) {
    const apiUrl = `${url.baseApi}starships`
    return axios.get(apiUrl, {
        params: query
    });
}

const starshipsService = {
    list
};

export default starshipsService;
