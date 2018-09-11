import axios from 'axios';
import url from '../config'

function list(query={}) {
    const apiUrl = `${url.baseApi}planets`
    return axios.get(apiUrl, {
        params: query
    });
}

const planetsService = {
    list
};

export default planetsService;
