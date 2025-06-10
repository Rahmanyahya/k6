import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
  return JSON.parse(open('./data/course/users.json'));
});

export const options = {
  scenarios: {
    register_users: {
      executor: 'per-vu-iterations',
      vus: 50,
      iterations: 1,
      maxDuration: '30m',
    },
  },
};

export default function () {
  const user = users[__VU - 1];

  const payload = {
    username: user.username,
    password: user.password,
  };

  let attempt = 1;

  while (true) {
    try {
      const res = http.post(
        'http://103.163.138.114:7000/digital-educator/api/v1/login',
        payload
      );

      const isCreated = check(res, {
        'status is 200': (r) => r.status === 200,
      });

      console.log(`VU ${__VU} - Attempt ${attempt} - Status: ${res.status}`);

      if (isCreated) break;
    } catch (e) {
      console.log(`VU ${__VU} - Attempt ${attempt} - ERROR: ${e.message}`);
    }

    attempt++;
    sleep(1); 
  }
}
