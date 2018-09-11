import axios from 'axios';
import url from '../config';

function list(query={}) {
    const apiUrl = `${url.baseApi}vehicles`
    return axios.get(apiUrl, {
        params: query
    });
}

const vehiclesService = {
    list
};

export default vehiclesService;
