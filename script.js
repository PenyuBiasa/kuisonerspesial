
const questions = [
    {
        question: "Apa makanan yang paling lu suka?",
        options: ["Mie", "Seblak", "Nasi Goreng", "Telur", "Ice Cream", "Yang Lain"],
        hasCustom: true
    },
    {
        question: "Apa warna favorit lu?",
        options: ["Merah", "Biru", "Hijau", "Kuning", "Hitam", "Putih", "Yang Lain"],
        hasCustom: true
    },
    {
        question: "Apa hobi lu?",
        options: ["Membaca", "Olahraga", "Memasak", "Dengerin Musik", "Nonton Film", "Yang Lain"],
        hasCustom: true
    },
    {
        question: "Hewan apa yang paling lu suka?",
        options: ["Kucing", "Kelinci", "Hamster", "Burung", "Ayam", "Gak Suka Hewan"],
        hasCustom: false
    }
];

// Variabel state
let currentQuestionIndex = 0;
let answers = {};
const targetName = "Rizkya Cahya Arnellita";

// Inisialisasi elemen DOM
const initElements = () => {
    document.getElementById('target-name').textContent = targetName;
    document.getElementById('start-btn').addEventListener('click', startQuiz);
    document.getElementById('yes-btn').addEventListener('click', celebrate);
    document.getElementById('no-btn').addEventListener('click', () => {
        const sfx = document.getElementById('negative-sfx');
    sfx.currentTime = 0;
    sfx.play().catch(e => console.log("Autoplay prevented:", e));
    sfx.volume = 0.7;
        alert("Engga bisa nolak wleeeew😝");
    });
    
    document.getElementById('save-next-btn').addEventListener('click', handleSaveAndNext);
    document.getElementById('custom-input').addEventListener('input', handleCustomInput);
    document.getElementById('next-to-final').addEventListener('click', () => {
  document.getElementById('summary-screen').classList.remove('active');
  document.getElementById('final-screen').classList.add('active');
});
};

const handleCustomInput = (e) => {
    document.getElementById('save-next-btn').disabled = e.target.value.trim() === '';
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
        optionElement.addEventListener('click', (e) => selectOption(option, e));
        optionsContainer.appendChild(optionElement);
    });

    updateProgressBar();
    document.getElementById('custom-input-container').classList.add('hidden');
    document.getElementById('custom-input').value = '';
    document.getElementById('save-next-btn').disabled = true;
};

// Pilih opsi
const selectOption = (option, event) => {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    event.target.classList.add('selected');
    document.getElementById('save-next-btn').disabled = false;
    
    if (option === "Yang Lain" && questions[currentQuestionIndex].hasCustom) {
        document.getElementById('custom-input-container').classList.remove('hidden');
        document.getElementById('save-next-btn').disabled = true;
        document.getElementById('custom-input').focus();
    } else {
        document.getElementById('custom-input-container').classList.add('hidden');
        answers[`q${currentQuestionIndex + 1}`] = option;
    }
};

// Handle simpan dan lanjut
const handleSaveAndNext = () => {
    const customInputContainer = document.getElementById('custom-input-container');
    
    if (!customInputContainer.classList.contains('hidden')) {
        const customAnswer = document.getElementById('custom-input').value.trim();
        answers[`q${currentQuestionIndex + 1}`] = customAnswer;
        document.getElementById('custom-input').value = '';
        customInputContainer.classList.add('hidden');
    }
    
    nextQuestion();
};

// Pertanyaan berikutnya
const nextQuestion = () => {
    const sfx = document.getElementById('click-sfx');
    sfx.currentTime = 0; 
    sfx.play().catch(e => console.log("Autoplay prevented:", e));
    sfx.volume = 0.4;
    currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showSummaryScreen(); 
  }
};

const showSummaryScreen = () => {
  // Isi jawaban
  document.getElementById('answers-summary').innerHTML = `
    <p><strong>Makanan favorit:</strong> ${answers.q1 || '-'}</p>
        <p><strong>Warna favorit:</strong> ${answers.q2 || '-'}</p>
        <p><strong>Hobi:</strong> ${answers.q3 || '-'}</p>
        <p><strong>Hewan kesukaan:</strong> ${answers.q4 || '-'}</p>
    `;
    
    document.getElementById('progress-bar').style.width = '100%';
  
  // Navigasi screen
  document.getElementById('question-screen').classList.remove('active');
  document.getElementById('summary-screen').classList.add('active');
};


// Tampilkan layar akhir
const showFinalScreen = () => {
    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('final-screen').classList.add('active');
};

// Rayakan jika jawab "IYA"
const celebrate = () => {
    
    const sfx = document.getElementById('celebration-sfx');
    sfx.currentTime = 0;
    sfx.play().catch(e => console.log("Autoplay prevented:", e));
    sfx.volume = 0.2;
    
    // Sembunyikan tombol
    document.getElementById('yes-btn').classList.add('hidden');
    document.getElementById('no-btn').classList.add('hidden');
    
    // Tampilkan celebration
    document.getElementById('celebration').classList.remove('hidden');
    
    // Animasi teks romantis
    setTimeout(() => {
        document.querySelector('.romantic-text').classList.add('show');
    }, 500);
    
    // Animasi hati
    const heartsContainer = document.querySelector('.hearts-animation');
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.fontSize = `${16 + Math.random() * 24}px`;
        heart.style.color = ['#ff4d6d', '#ff85a1', '#ff0066', '#ff4081'][Math.floor(Math.random() * 4)];
        heart.style.animation = `floatUp ${2 + Math.random() * 3}s linear ${Math.random()}s forwards`;
        heart.style.textShadow = '0 0 8px rgba(255,0,100,0.7)';
        heartsContainer.appendChild(heart);
    }
};

// Update progress bar
const updateProgressBar = () => {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
};

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', initElements);