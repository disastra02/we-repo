## Windows Explorer BE

### Deskripsi
Halaman web ini mirip dengan Windows Explorer. Halaman tersebut dibagi secara horizontal menjadi dua panel. Panel kiri berisi struktur folder, sedangkan panel kanan berisi subfolder langsung dari folder yang dipilih di panel kiri.

### Teknologi
- Framework: VueJS + ElysiaJS 
- Database: MySQL
- Runtime: Bun

## Instalasi Backend ( Windows Explorer BE )

Ikuti langkah-langkah berikut untuk menginstal aplikasi ini.

1. Masuk direktori windows-explorer-be.
```sh
cd windows-explorer-be
```
2. Install dependensi.
```sh
bun install
```
3. Konfigurasi file .env sesuaikan dengan yang dimiliki.
4. Jalankan migrasi database.
```sh
bun prisma migrate dev
```
5. Jalankan seeder database untuk data awal atau sebagai data contoh.
```sh
bun run prisma/seed.ts
```
6. Jalankan server.
```sh
bun run dev
```

Buka http://localhost:5000/ dengan browser Anda untuk melihat hasilnya.

## Instalasi Frontend ( Windows Explorer FE )
Ikuti langkah-langkah berikut untuk menginstal aplikasi ini.

1. Masuk direktori windows-explorer-fe.
```sh
cd windows-explorer-fe
```
2. Install dependensi.
```sh
bun install
```
3. Jalankan server.
```sh
bun dev
```

Buka http://localhost:3000/ dengan browser Anda untuk melihat hasilnya.
