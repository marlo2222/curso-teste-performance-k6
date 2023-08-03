import http from 'k6/http';
import {sleep, check} from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
    stages: [
        { duration: '10s', target: 10 }, 
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 } 
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200']
    }
}

const data = new SharedArray('ler dados', function () {
    return JSON.parse(open('./dados.json')).users;
});

export default function(){

    const userId = data[Math.floor(Math.random() * data.length)].id;
    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${userId}`;
    const res = http.get(BASE_URL)
    
    check(res,{
        'status 200': (r) => r.status === 200
    });
    sleep(1);
}