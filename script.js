document.getElementById('questionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const question = document.getElementById('question').value;
    
    // Kirim data ke Google Sheets
    sendDataToGoogleSheets(name, email, question);
});

function sendDataToGoogleSheets(name, email, question) {
    // Ganti dengan URL Apps Script Anda
    const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            question: question,
            timestamp: new Date().toLocaleString()
        })
    })
    .then(() => {
        // Tampilkan pesan sukses
        document.getElementById('questionForm').reset();
        document.getElementById('successMessage').classList.remove('hidden');
        
        // Sembunyikan pesan setelah 3 detik
        setTimeout(() => {
            document.getElementById('successMessage').classList.add('hidden');
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengirim data');
    });
}