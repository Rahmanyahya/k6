const fs = require('fs');

function pad(num, size) {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

let users = [];
let fileCount = 1;

for (let i = 1; i <= 500; i++) {
  const padded = pad(i, 3);

  // NIK unik, 16 digit, kombinasi i berbeda
  // Contoh dasar: 234542123432 + 3 digit unik
  const nik = `234542123432${pad(i, 3)}`;

  // noWa 12 digit, unik kombinasi i mod 100 supaya ga terlalu panjang
  const noWa = `628111111${pad(i % 100, 2)}`;

  const user = {
    username: `lesmana${padded}`,
    fullName: "Angga Lesmana",
    nik: nik,
    password: "Angga1234#",
    email: `Angga${padded}@gmail.com`,
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

  if (users.length === 125) {
     fs.writeFileSync(`users${fileCount}.json`, JSON.stringify(users, null, 2))
     users = []
     console.log(`user batch ${fileCount} created`)
     fileCount++
  }
}
