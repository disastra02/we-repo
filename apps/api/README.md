## Windows Explorer BE

### Deskripsi
Halaman web ini mirip dengan Windows Explorer. Halaman tersebut dibagi secara horizontal menjadi dua panel. Panel kiri berisi struktur folder, sedangkan panel kanan berisi subfolder langsung dari folder yang dipilih di panel kiri.

### Teknologi
- Framework: ElysiaJS 
- Database: MySQL
- Runtime: Bun

## Instalasi
Ikuti langkah-langkah berikut untuk menginstal aplikasi ini.

1. Install dependensi.
```sh
bun install
```
2. Konfigurasi file .env sesuaikan dengan yang dimiliki.
3. Jalankan migrasi database.
```sh
bun prisma migrate dev
```
4. Jalankan seeder database untuk data awal atau sebagai data contoh.
```sh
bun run prisma/seed.ts
```
5. Jalankan server.
```sh
bun run dev
```

Buka http://localhost:5000/ dengan browser Anda untuk melihat hasilnya.