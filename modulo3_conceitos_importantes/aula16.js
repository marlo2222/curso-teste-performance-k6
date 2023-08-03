import { check, group } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 4,
    duration: '5s',
    thresholds: {
        'http_req_duration{group:::requisição por id}': ['p(95) < 500']
    }
}

export default function(){
    group('requisição todos os crocodilos', function(){
        const response1 = http.get('https://test-api.k6.io/public/crocodiles/');
        check(response1, {
            'status code 200 get all': (r) => r.status === 200
        });
    });
    
   
    group('requisição por id', function(){
        const response2 = http.get('https://test-api.k6.io/public/crocodiles/1/');
        check(response2, {
            'status code 200 get id': (r) => r.status === 200
        }); 
    });
    
}
