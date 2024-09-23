document.addEventListener("DOMContentLoaded", function() {
    const btn = document.querySelector("#showParticipants");
    const participantList = document.querySelector("#participantList");

    // إخفاء قائمة المشاركين افتراضياً
    participantList.style.display = "none"; 

    // إضافة وظيفة للزر لإظهار وإخفاء القائمة عند الضغط
    btn.addEventListener("click", function() {
        if (participantList.style.display === "none" || participantList.style.display === "") {
            participantList.style.display = "flex"; // إظهار القائمة
        } else {
            participantList.style.display = "none"; // إخفاء القائمة
        }
    });
});

// زر مشاركة الموقع
document.getElementById('shareSite').addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: 'موقعي المميز',
            text: 'تفضل بزيارة هذا الموقع الرائع!',
            url: window.location.href
        }).then(() => {
            console.log('تمت المشاركة بنجاح!');
        }).catch((error) => {
            console.error('خطأ في المشاركة:', error);
        });
    } else {
        alert('المشاركة غير مدعومة في هذا المتصفح.');
    }
});

window.onload = function() {
    const popup = document.getElementById("popup");
    popup.style.display = "flex"; // عرض النافذة المنبثقة

    setTimeout(function() {
        popup.style.display = "none"; // إخفاء النافذة بعد 20 ثانية
    }, 20000); // 20 ثانية

    const closeButton = document.getElementById("close");
    closeButton.onclick = function() {
        popup.style.display = "none"; // إخفاء النافذة عند النقر على زر الخروج
    };

    window.onclick = function(event) {
        if (event.target === popup) {
            popup.style.display = "none"; // إخفاء النافذة عند النقر خارجها
        }
    };
};

// فتح وإغلاق الصفحات المنبثقة
const modals = document.querySelectorAll(".modal");
const btns = document.querySelectorAll(".btn");
const spans = document.querySelectorAll(".close");

// فتح الصفحة المنبثقة المناسبة عند النقر على زر "المزيد"
btns.forEach(btn => {
    btn.onclick = function() {
        const modalId = this.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
    }
});

// إغلاق الصفحة المنبثقة عند النقر على زر الإغلاق
spans.forEach(span => {
    span.onclick = function() {
        const modal = this.closest(".modal");
        modal.style.animation = "fadeOut 0.5s forwards"; // تأثير الخروج
        setTimeout(function() {
            modal.style.display = "none"; // إخفاء المودال بعد التأثير
        }, 500);
    }
});

// إغلاق الصفحة المنبثقة عند النقر في أي مكان فارغ
window.onclick = function(event) {
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.animation = "fadeOut 0.5s forwards"; // تأثير الخروج
            setTimeout(function() {
                modal.style.display = "none";
            }, 500);
        }
    });
}

// يمكنك استخدام هذا الكود لإظهار المودال
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}





const startBtn = document.getElementById('start-btn');
const quiz = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const resultSection = document.getElementById('result');
const scoreElement = document.getElementById('score');
const retryBtn = document.getElementById('retry-btn');
const reviewBtn = document.getElementById('review-btn');
const reviewSection = document.getElementById('review');
const reviewList = document.getElementById('review-list');
const backBtn = document.getElementById('back-btn');
const introText = document.getElementById('intro-text');

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questions = [
    { question: 'متى تأسست المملكة العربية السعودية؟', answers: ['1932', '1945', '1950', '1960'], correct: 0 },
    { question: 'ما هو شعار اليوم الوطني السعودي الـ91؟', answers: ['هي لنا دار', 'نحن لها', 'سيفان ونخلة', 'دام عزك يا وطن'], correct: 0 },
    { question: 'كم عدد مناطق المملكة العربية السعودية؟', answers: ['10', '13', '16', '20'], correct: 1 },
    { question: 'ما هو اليوم الذي يُحتفل فيه باليوم الوطني السعودي؟', answers: ['21 سبتمبر', '22 سبتمبر', '23 سبتمبر', '24 سبتمبر'], correct: 2 },
    { question: 'أي من المدن السعودية ليست عاصمة إدارية؟', answers: ['مكة المكرمة', 'الرياض', 'جدة', 'الدمام'], correct: 2 },
    { question: 'ما هي الألوان الرئيسية في العلم السعودي؟', answers: ['الأخضر والأبيض', 'الأخضر والأسود', 'الأحمر والأبيض', 'الأسود والأبيض'], correct: 0 },
    { question: 'ما هي اللغة الرسمية في المملكة العربية السعودية؟', answers: ['الإنجليزية', 'العربية', 'الفرنسية', 'الإسبانية'], correct: 1 }
];

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => showNextQuestion());
prevBtn.addEventListener('click', () => showPreviousQuestion());
retryBtn.addEventListener('click', retryQuiz);
reviewBtn.addEventListener('click', showReview);
backBtn.addEventListener('click', backToResult);

function startQuiz() {
    startBtn.classList.add('hidden');
    introText.classList.add('hidden');
    quiz.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    resetState();
    const question = questions[index];
    const questionBox = document.createElement('div');
    questionBox.classList.add('question-box');
    
    const questionText = document.createElement('p');
    questionText.classList.add('question-text');
    questionText.innerText = question.question;
    questionBox.appendChild(questionText);
    
    question.answers.forEach((answer, i) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(i, question.correct));
        questionBox.appendChild(button);
    });

    questionContainer.appendChild(questionBox);

    if (index === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (index === questions.length - 1) {
        nextBtn.innerText = 'إنهاء';
    } else {
        nextBtn.innerText = 'التالي';
    }
}

function resetState() {
    while (questionContainer.firstChild) {
        questionContainer.removeChild(questionContainer.firstChild);
    }
    nextBtn.classList.add('hidden');
}

function selectAnswer(selected, correct) {
    userAnswers[currentQuestionIndex] = selected;
    if (selected === correct) {
        score++;
    }
    nextBtn.classList.remove('hidden');
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function showResult() {
    quiz.classList.add('hidden');
    resultSection.classList.remove('hidden');
    scoreElement.innerText = `لقد أجبت بشكل صحيح على ${score} من ${questions.length} أسئلة.`;
    reviewBtn.classList.remove('hidden');
}

function retryQuiz() {
    resultSection.classList.add('hidden');
    reviewSection.classList.add('hidden');
    startBtn.classList.remove('hidden');
    introText.classList.remove('hidden');
}

function showReview() {
    resultSection.classList.add('hidden');
    reviewSection.classList.remove('hidden');
    reviewList.innerHTML = ''; // مسح المحتوى القديم

    userAnswers.forEach((answer, index) => {
        const questionReview = document.createElement('div');
        questionReview.classList.add('question-box');

        const questionText = document.createElement('p');
        questionText.innerText = `السؤال: ${questions[index].question}`;
        questionReview.appendChild(questionText);

        const userAnswerText = document.createElement('p');
        userAnswerText.innerText = `إجابتك: ${questions[index].answers[answer]}`;
        userAnswerText.classList.add(answer === questions[index].correct ? 'correct' : 'wrong');
        questionReview.appendChild(userAnswerText);

        if (answer !== questions[index].correct) {
            const correctAnswerText = document.createElement('p');
            correctAnswerText.innerText = `الإجابة الصحيحة: ${questions[index].answers[questions[index].correct]}`;
            questionReview.appendChild(correctAnswerText);
        }

        reviewList.appendChild(questionReview);
    });
}

function backToResult() {
    reviewSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
}



