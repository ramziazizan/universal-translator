# 🌐 The Universal Translator (Polyglot Project)

Proyek ini dirancang untuk mendemonstrasikan kemampuan mengintegrasikan dan menggunakan berbagai bahasa pemrograman (**JavaScript/Node.js** dan **Python**) untuk tugas yang berbeda, menunjukkan *skill* teknis yang luas.

## 🧩 Arsitektur Komunikasi
Proyek ini bekerja dengan alur (flow) komunikasi antar-bahasa sebagai berikut: 

1.  **Front-End (HTML/JS):** Mengirim permintaan HTTP ke server.
2.  **Back-End (Node.js/Express):** Menerima permintaan, lalu menggunakan fungsi `child_process.spawn()` untuk mengeksekusi Python.
3.  **Data Core (Python):** Menjalankan logika (menghasilkan dan mengurutkan data) dan mencetak hasilnya sebagai format JSON.
4.  **Back-End (Node.js/Express):** Menangkap output JSON dan mengirimkannya kembali ke Front-End.

## 🛠️ Cara Menjalankan

Proyek ini harus di-*clone* ke lingkungan yang mendukung *runtime* **Node.js** dan **Python**.

### Persyaratan
* **Node.js** (v18+)
* **Python** (v3.x)

### Langkah-Langkah Eksekusi

1.  Clone repositori ini:
    ```bash
    git clone [https://github.com/USERNAME_ANDA/universal-translator.git](https://github.com/USERNAME_ANDA/universal-translator.git)
    cd universal-translator
    ```
2.  Instal dependensi Node.js (untuk Express dan CORS):
    ```bash
    npm install
    ```
3.  Jalankan server Node.js:
    ```bash
    npm start
    ```
4.  Buka file `/public/index.html` di browser Anda.
