// Data pertanyaan
const questions = [
    {
        question: "Apa makanan favoritmu?",
        options: ["Sushi", "Pasta", "Nasi Goreng", "Steak", "Es Krim"],
        hasCustom: true
    },
    {
        question: "Apa warna favoritmu?",
        options: ["Merah", "Biru", "Hijau", "Pink", "Hitam", "Putih"],
        hasCustom: true
    },
    {
        question: "Apa hobimu?",
        options: ["Membaca", "Olahraga", "Memasak", "Traveling", "Nonton Film"],
        hasCustom: true
    },
    {
        question: "Apa hewan peliharaan favoritmu?",
        options: ["Kucing", "Anjing", "Kelinci", "Burung", "Hamster", "Gak Suka Hewan"],
        hasCustom: false
    }
];

// Variabel state
let currentQuestionIndex = 0;
let answers = {};
const targetName = "Teman";

// Inisialisasi elemen DOM
const initElements = () => {
    document.getElementById('target-name').textContent = targetName;
    document.getElementById('start-btn').addEventListener('click', startQuiz);
    document.getElementById('yes-btn').addEventListener('click', celebrate);
    document.getElementById('no-btn').addEventListener('click', () => {
        alert("Aku akan terus berusaha sampai kamu bilang MAU!");
    });
    
    const saveNextBtn = document.getElementById('save-next-btn');
    saveNextBtn.addEventListener('click', handleSaveAndNext);
    
    document.getElementById('custom-input').addEventListener('input', () => {
        const customInput = document.getElementById('custom-input').value.trim();
        saveNextBtn.disabled = customInput === '';
    });
};

const handleSaveAndNext = () => {
    const customInputContainer = document.getElementById('custom-input-container');
    const isCustom = !customInputContainer.classList.contains('hidden');

    if (isCustom) {
        const customAnswer = document.getElementById('custom-input').value.trim();
        if (customAnswer) {
            answers[`q${currentQuestionIndex + 1}`] = customAnswer;
            customInputContainer.classList.add('hidden');
            document.getElementById('custom-input').value = '';
            nextQuestion();
        }
    } else {
        const selectedOption = document.querySelector('.option.selected');
        if (selectedOption) {
            const answerText = selectedOption.textContent;
            answers[`q${currentQuestionIndex + 1}`] = answerText;
            nextQuestion();
        }
    }
};

// Mulai kuis
const startQuiz = () => {
    document.getElementById('intro-screen').classList.remove('active');
    document.getElementById('question-screen').classList.add('active');
    showQuestion();
};

// Tampilkan pertanyaan
const showQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('current-question').textContent = currentQuestion.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.className = 'option';
        optionElement.textContent = option;

        if (option === "Lainnya" && currentQuestion.hasCustom) {
            optionElement.addEventListener('click', () => showCustomInput());
        } else {
            optionElement.addEventListener('click', () => selectOption(option));
        }

        optionsContainer.appendChild(optionElement);
    });

    updateProgressBar();

    // Reset input dan tombol
    document.getElementById('custom-input-container').classList.add('hidden');
    document.getElementById('custom-input').value = '';

    // ⛔ Pastikan tombol lanjut disable saat awal pertanyaan
    document.getElementById('save-next-btn').disabled = true;
};

// Pilih opsi
const selectOption = (option) => {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    event.target.classList.add('selected');
    answers[`q${currentQuestionIndex + 1}`] = option;
    document.getElementById('save-next-btn').disabled = false;
    
    // Jika memilih "Lainnya", tampilkan input dan disable tombol sampai diisi
    if (option === "Lainnya" && questions[currentQuestionIndex].hasCustom) {
        document.getElementById('custom-input-container').classList.remove('hidden');
        document.getElementById('custom-input').value = '';
        document.getElementById('custom-input').focus();
        document.getElementById('save-next-btn').disabled = true;
    } else {
        document.getElementById('custom-input-container').classList.add('hidden');
    }
};
    

// Pertanyaan berikutnya
const nextQuestion = () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalScreen();
    }
};

// Tampilkan layar akhir
const showFinalScreen = () => {
    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('final-screen').classList.add('active');
    
    // Tampilkan ringkasan jawaban
    const summary = document.getElementById('answers-summary');
    summary.innerHTML = `
        <p><strong>Makanan favoritmu:</strong> ${answers.q1}</p>
        <p><strong>Warna favoritmu:</strong> ${answers.q2}</p>
        <p><strong>Hobimu:</strong> ${answers.q3}</p>
        <p><strong>Hewan peliharaan favorit:</strong> ${answers.q4}</p>
    `;
    
    document.getElementById('progress-bar').style.width = '100%';
};

// Rayakan jika jawab "IYA"
const celebrate = () => {
    document.getElementById('yes-btn').classList.add('hidden');
    document.getElementById('no-btn').classList.add('hidden');
    document.getElementById('celebration').classList.remove('hidden');
    

    
    // Buat animasi hati
    const heartsContainer = document.querySelector('.hearts-animation');
    for (let i = 0; i < 40; i++) { // sebelumnya 15
        const heart = document.createElement('span');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
    
        // Ukuran acak
        const size = 16 + Math.random() * 24;
        heart.style.fontSize = `${size}px`;
    
        // Warna gradasi pink-merah
        heart.style.color = ['#ff4d6d', '#ff85a1', '#ff0066', '#ff4081'][Math.floor(Math.random() * 4)];
    
        // Animasi acak
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 2;
        heart.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        heartsContainer.appendChild(heart);
        heart.style.top = '100%'; // start from bottom
        heart.style.animation = `floatUp ${2 + Math.random() * 3}s linear ${Math.random()}s forwards`;
        heart.style.textShadow = '0 0 8px rgba(255,0,100,0.7)';

    }
    

       // Tampilkan teks romantis
       const romanticText = document.querySelector(".romantic-text");
       romanticText.style.display = "block";
    
    // Kirim data ke Google Sheets (opsional)
    sendDataToGoogleSheets();
};

// Update progress bar
const updateProgressBar = () => {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
};

// Kirim data ke Google Sheets
const sendDataToGoogleSheets = () => {
    const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    const timestamp = new Date().toLocaleString();
    
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            timestamp: timestamp,
            targetName: targetName,
            answers: JSON.stringify(answers),
            result: "YES"
        })
    }).catch(error => console.error('Error:', error));
};

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', initElements);