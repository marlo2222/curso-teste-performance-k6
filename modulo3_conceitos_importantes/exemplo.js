import http from "k6/http";
import { sleep, check } from "k6";

export default function() {
  let res = http.get("http://test.k6.io");
  sleep(1);

  check(res, {
      "status is 200": (r) => r.status === 200,
     });
}