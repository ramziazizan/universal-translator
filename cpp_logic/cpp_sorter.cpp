#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <cmath> // Contoh penggunaan C++

using namespace std;

// Struktur sederhana untuk data
struct DataEntry {
    int id;
    int score;
    string name;
};

// Fungsi perbandingan untuk sorting (Descending)
bool compareEntries(const DataEntry& a, const DataEntry& b) {
    return a.score > b.score;
}

// Fungsi utama
int main() {
    // Simulasikan data yang seharusnya diterima dari Node.js atau file
    // Dalam implementasi nyata, kita akan membaca JSON dari stdin
    vector<DataEntry> data = {
        {101, 85, "CppA"},
        {102, 92, "CppB"},
        {103, 78, "CppC"},
        {104, 98, "CppD"}
    };
    
    // Melakukan sorting menggunakan algoritma C++
    sort(data.begin(), data.end(), compareEntries);
    
    // Mencetak output JSON yang disederhanakan ke stdout
    cout << "{\"message\": \"Data successfully sorted by C++ module.\", \"sorted_count\": " << data.size() << ", \"top_score\": " << data[0].score << ", \"language\": \"C++\"}";

    return 0;
}
