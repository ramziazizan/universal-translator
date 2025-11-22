const express = require('express');
const { spawn } = require('child_process'); 
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Izinkan CORS agar Front-End bisa mengakses
app.use(cors());

app.get('/api/process', (req, res) => {
    
    // Tentukan lokasi script Python
    const pythonScriptPath = path.join(__dirname, '..', 'python_logic', 'data_sorter.py');
    
    // Jalankan script Python dan tangkap outputnya
    const python = spawn('python3', [pythonScriptPath]);
    
    let dataBuffer = '';
    let errorBuffer = '';

    // Menerima output JSON dari Python (stdout)
    python.stdout.on('data', (data) => {
        dataBuffer += data.toString();
    });

    // Menerima error dari Python (stderr)
    python.stderr.on('data', (data) => {
        errorBuffer += data.toString();
        console.error(`Python Error: ${data.toString()}`);
    });

    // Ketika script Python selesai
    python.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: `Python process exited with code ${code}. Output: ${errorBuffer}` });
        }
        
        try {
            const pythonOutput = JSON.parse(dataBuffer);
            
            // Kirim hasil akhir ke Front-End
            res.json({
                message: "Success! Data processed by Python, served by Node.js.",
                ...pythonOutput 
            });
            
        } catch (e) {
            res.status(500).json({ error: "Gagal memparsing output dari Python menjadi JSON." });
        }
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server Node.js berjalan di http://localhost:${PORT}`);
});
