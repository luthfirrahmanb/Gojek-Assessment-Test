import axios from 'axios';
import url from '../config';

function list(query={}) {
    const apiUrl = `${url.baseApi}people`
    return axios.get(apiUrl, {
        params: query
    });
}

const peopleService = {
    list
};

export default peopleService;
