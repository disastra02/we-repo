## Windows Explorer BE

### Teknologi
- Framework: VueJS + ElysiaJS 
- Database: MySQL
- Runtime: Bun

## Instalasi

Ikuti langkah-langkah berikut untuk menginstal aplikasi ini.

1. Clone Repository
```sh
git clone https://github.com/disastra02/we-repo.git
```
2. Install dependensi.
```sh
bun install
```
3. Salin file .env.example menjadi .env pada folder apps/api.
```sh
cp apps/api/.env.example apps/api/.env
```
4. Konfigurasi file .env sesuaikan dengan yang dimiliki.
5. Jalankan migrasi database.
```sh
cd apps/api
bun prisma migrate dev
```
6. Jalankan seeder database untuk data awal atau sebagai data contoh.
```sh
bun run prisma/seed.ts
```
7. Jalankan server di base folder.
```sh
cd ../..
bun run dev
```

Buka http://localhost:3000/ dengan browser Anda untuk melihat hasilnya.
