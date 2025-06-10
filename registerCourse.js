import http from 'k6/http';
import { check } from 'k6';

const users = JSON.parse(open('token1.json'));

export const options = {
  scenarios: {
    constant_load: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '30m',
    },
  },
};

export default function () {
  const user = users[__VU - 1];

  const payload = JSON.stringify({
    periode: 2025,
    courseId: "390aa11c-4ef1-44cf-b750-90a38139e217" 
  });

  const res = http.post(
    'http://103.163.138.114:7000/digital-educator/api/v1/course-register',
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user}`, 
      },
    }
  );

  const passed = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  console.log(`🧾 User: ${user.username} | Status: ${res.status} | Passed: ${passed}`);
  console.log(`📩 Response body: ${res.body}`);
}
