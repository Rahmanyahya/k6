import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
  return JSON.parse(open('./data/course/users.json'));
});
const avatarFile = open('./avatar.png', 'b');

export const options = {
  scenarios: {
    register_users: {
      executor: 'per-vu-iterations',
      vus: 750,
      iterations: 1,
      maxDuration: '30m',
    },
  },
};

export default function () {
  const user = users[__VU - 1];

  const payload = {
    username: user.username,
    fullName: user.fullName,
    nik: user.nik,
    password: user.password,
    email: user.email,
    gender: user.gender,
    schoolName: user.schoolName,
    noWa: user.noWa,
    birthDate: user.birthDate,
    address: user.address,
    npsn: user.npsn,
    role: user.role,
    province: user.province,
    city: user.city,
    subdistrict: user.subdistrict,
    village: user.village,
    avatar: http.file(avatarFile, 'avatar.png', 'image/png'),
  };

  let attempt = 1;

  while (true) {
    try {
      const res = http.post(
        'http://103.163.138.114:7000/digital-educator/api/v1/register',
        payload
      );

      const isCreated = check(res, {
        'status is 201': (r) => r.status === 201,
      });

      console.log(`VU ${__VU} - Attempt ${attempt} - Status: ${res.status}`);

      if (isCreated) break;
    } catch (e) {
      console.log(`VU ${__VU} - Attempt ${attempt} - ERROR: ${e.message}`);
    }

    attempt++;
    sleep(1); // beri waktu agar server tidak overload
  }
}
