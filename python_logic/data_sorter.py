import json
import random
import sys

# Daftar nama contoh
NAMES = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy"]

def generate_and_sort_data(num_entries=100):
    """Menghasilkan data acak dan mengurutkannya."""
    
    original_data = []
    for i in range(num_entries):
        original_data.append({
            "id": i + 1,
            "name": random.choice(NAMES),
            "score": random.randint(50, 100),
            "language": "Python"
        })
        
    # Mengurutkan data berdasarkan 'score' secara descending
    sorted_data = sorted(original_data, key=lambda x: x['score'], reverse=True)
    
    result = {
        "message": "Data successfully generated and sorted by Python.",
        "original_count": num_entries,
        "original_data": original_data,
        "sorted_data": sorted_data
    }
    
    # Mencetak output dalam format JSON ke stdout (agar dibaca oleh Node.js)
    json.dump(result, sys.stdout)

if __name__ == "__main__":
    generate_and_sort_data()
