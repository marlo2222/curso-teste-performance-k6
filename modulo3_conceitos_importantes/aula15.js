//default
import http from 'k6/http';
//remoto
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.4.0/s3.js';
//local
import runTest from './exemplo.js'

export default function() {
  let res = http.get("http://test.k6.io");
  sleep(1);

  check(res, {
      "status is 200": (r) => r.status === 200,
     });
}