const fs = require('fs');

function pad(num, size) {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

let users = [];

for (let i = 1; i <= 750; i++) {
  const padded = pad(i, 3);

  const nik = `253542123432${pad(i, 4)}`;

 
  const noWa = `628221111${pad(i % 100, 3)}`;

  const user = {
    username: `putri${padded}`,
    fullName: "putri cantika",
    nik: nik,
    password: "Putri1234#",
    email: `Putri${padded}@gmail.com`,
    gender: i % 2 === 0 ? "L" : "P",
    schoolName: "SD sdfghjkl",
    noWa: noWa,
    birthDate: `2009-08-${(i % 28 + 1).toString().padStart(2, '0')}`,
    address: "Sawojajar",
    npsn: "1234567",
    role: "participant",
    province: "K",
    city: "K",
    subdistrict: "K",
    village: "K",
    avatar: "avatar.jpg",
  };
  users.push(user);
}

fs.writeFileSync(`users.json`, JSON.stringify(users, null, 2))
