package main

import (
    "crypto/sha256"
    "fmt"
    "os"
)

func main() {
    // Pastikan argumen diberikan (data mentah yang akan di-hash)
    if len(os.Args) < 2 {
        os.Exit(1)
    }
    
    // Membaca data dari argumen baris perintah
    data := os.Args[1] 
    
    // Menghitung hash SHA-256
    h := sha256.New()
    h.Write([]byte(data))
    
    // Mencetak hash ke stdout (untuk ditangkap oleh Node.js)
    fmt.Printf("%x", h.Sum(nil))
}
