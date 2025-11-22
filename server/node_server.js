const express = require('express');
const { spawn } = require('child_process'); 
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Fungsi Helper untuk menjalankan script eksternal
function runExternalProcess(executable, args) {
    return new Promise((resolve, reject) => {
        const process = spawn(executable, args);
        let dataBuffer = '';
        let errorBuffer = '';

        process.stdout.on('data', (data) => {
            dataBuffer += data.toString();
        });

        process.stderr.on('data', (data) => {
            errorBuffer += data.toString();
        });

        process.on('close', (code) => {
            if (code !== 0) {
                return reject(`Process exited with code ${code}. Error: ${errorBuffer}`);
            }
            resolve(dataBuffer);
        });
    });
}

// Handler utama API
app.get('/api/polyglot-process', async (req, res) => {
    try {
        let finalResults = { languages: {} };

        // 1. PYTHON: Data Generator & Sorting (Initial Data)
        const pythonScriptPath = path.join(__dirname, '..', 'python_logic', 'data_sorter.py');
        const pythonResult = await runExternalProcess('python3', [pythonScriptPath]);
        const pythonData = JSON.parse(pythonResult);
        finalResults.languages.python = pythonData;
        
        // Data yang dihasilkan Python akan digunakan untuk Go dan C++
        const rawDataForHash = JSON.stringify(pythonData.original_data);

        // 2. C++: Low-Level Sorting Demonstration
        // CATATAN: Ini membutuhkan kompilasi C++ menjadi binary (misalnya sorter.exe atau sorter)
        const cppBinaryPath = path.join(__dirname, '..', 'cpp_logic', 'sorter'); // Asumsi sudah dikompilasi
        try {
            const cppResult = await runExternalProcess(cppBinaryPath, []); 
            finalResults.languages.cpp = JSON.parse(cppResult);
        } catch(e) {
            finalResults.languages.cpp = { error: "C++ binary not found/compiled. Run C++ compilation first." };
        }

        // 3. GO: Hashing/Checksum Utility
        // CATATAN: Ini juga membutuhkan kompilasi Go menjadi binary (misalnya hasher.exe atau hasher)
        const goBinaryPath = path.join(__dirname, '..', 'go_utility', 'hasher'); // Asumsi sudah dikompilasi
        try {
            const goHash = await runExternalProcess(goBinaryPath, [rawDataForHash]);
            finalResults.languages.go = { hash_sha256: goHash };
        } catch(e) {
            finalResults.languages.go = { error: "Go binary not found/compiled. Run Go compilation first." };
        }
        
        // 4. Node.js (Koordinator)
        finalResults.languages.nodejs = { message: "Node.js successfully coordinated all external processes." };

        res.json(finalResults);

    } catch (error) {
        console.error('API Execution Error:', error);
        res.status(500).json({ error: `Server failed to process. Detail: ${error}` });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server Node.js (Polyglot Coordinator) berjalan di http://localhost:${PORT}`);
    console.log(`Buka file index.html dan panggil /api/polyglot-process`);
});
