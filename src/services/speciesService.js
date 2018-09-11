import axios from 'axios';
import url from '../config';

function list(query={}) {
    const apiUrl = `${url.baseApi}species`
    return axios.get(apiUrl, {
        params: query
    });
}

const speciesService = {
    list
};

export default speciesService;
