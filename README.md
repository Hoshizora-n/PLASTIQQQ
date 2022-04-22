# PLASTIQQQ

Plastiqqq adalah software kasir untuk warung plastik yang dibuat dengan teknologi React.JS, Express.JS, dan MySQL dengan tujuan utama saya untuk mengikuti Uji Kompetensi Keahlian di sekolah.
First Commit 6 Feb 2022.

## Features

Web Admin
1. Mengelola Barang (Menambah, Melihat, Mengupdate, Menghapus barang)
2. Melihat daftar faktur dan detail faktur
3. Menambahkan admin atau kasir baru
4. Mengelola akun (Mengganti username atau Password)

Web Client (Kasir)
1. Melihat daftar barang
2. Checkout barang / membuat faktur baru
3. Mengelola akun (Mengganti username atau Password)

## Instalasi

Tools :
XAMPP v3.3.0
Node.JS v16.13.2
VS Code

1. Clone atau download zip repo ini
2. Ekstrak file zip repo ini
3. Buka XAMPP, jalankan Apache dan MySQL, Minimize
4. Buka Browser, ketik localhost/phpmyadmin di address bar, klik Enter
5. Klik New, isi Database Name dengan "warung", klik Create
6. Klik Import > Choose File, cari file warung.sql di folder hasil ekstrak file zip repo ini
7. Scroll kebawah klik Go 
8. Buka VS Code, klik File > Open Folder, pilih folder hasil ekstrak tadi
9. Klik Terminal > New Terminal
10. Install semua dependecies, di folder admin, client, dan server
11. di terminal, cd admin > npm i
12. cd .. > cd client > npm i (cd .. fungsinya untuk kembali ke root folder)
13. cd .. > cd server > npm i
14. Masih di folder server, ketik npm start, klik Enter, browser akan langsung terbuka setelah aplikasi berjalan dengan baik tanpa error
