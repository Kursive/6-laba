// === КНОПКА "НАВЕРХ" ===
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// === АККОРДЕОН ===
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const title = item.querySelector('.accordion-title');

    title.addEventListener('click', () => {
        accordionItems.forEach(i => {
            if (i !== item) i.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});


// === ФИЛЬТРАЦИЯ ГАЛЕРЕИ ===
const filterButtons = document.querySelectorAll('.filters button');
const galleryImages = document.querySelectorAll('.gallery img');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        galleryImages.forEach(img => {
            img.style.display =
                category === 'all' || img.dataset.category === category
                    ? 'block'
                    : 'none';
        });
    });
});


// === МОДАЛЬНОЕ ОКНО ===
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
});


// === ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ===
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});


// ===================================================
//                КАРУСЕЛЬ ОТЗЫВОВ
// ===================================================
const reviewsWrapper = document.getElementById("reviewsWrapper");
const prevBtn = document.getElementById("prevReview");
const nextBtn = document.getElementById("nextReview");
const scrollBtnReview = document.getElementById("scrollReviewBtn");

let reviews = [];
let currentReview = 0;


// === ЗАГРУЗКА ОТЗЫВА ИЗ API ===
async function loadReview() {
    // ПЕРЕД загрузкой сразу показываем "Загрузка..."
    reviewsWrapper.innerHTML = `
        <div class="review">
            <p class="review-text">Загрузка...</p>
            <div class="review-author"></div>
        </div>
    `;

    try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        if (!res.ok) throw new Error();

        const data = await res.json();

        return {
            text: data.quote,
            author: data.author
        };

    } catch {
        return {
            text: "Не удалось загрузить отзыв. Попробуйте позже.",
            author: "Система"
        };
    }
}

"https://dummyjson.com/quotes/random"
// === ОБНОВЛЕНИЕ КАРУСЕЛИ ===
function showReview(index) {
    const r = reviews[index];

    reviewsWrapper.innerHTML = `
        <div class="review">
            <p class="review-text">«${r.text}»</p>
            <div class="review-author">— ${r.author}</div>
        </div>
    `;

    reviewsWrapper.style.opacity = 0;
    setTimeout(() => (reviewsWrapper.style.opacity = 1), 100);
}


// === ИНИЦИАЛИЗАЦИЯ ===
async function initReviews() {
    for (let i = 0; i < 4; i++) {
        reviews.push(await loadReview());
    }

    showReview(0);
}

initReviews();


// === КНОПКИ ЛИСТАНИЯ ===
nextBtn.addEventListener("click", async () => {
    currentReview++;

    if (currentReview >= reviews.length) {
        reviews.push(await loadReview());
    }

    showReview(currentReview);
});

prevBtn.addEventListener("click", () => {
    currentReview--;

    if (currentReview < 0) {
        currentReview = 0;
        return;
    }

    showReview(currentReview);
});


// === КНОПКA "ПРОКРУТИТЬ ОТЗЫВ" ===
scrollBtnReview.addEventListener("click", async () => {
    currentReview++;

    if (currentReview >= reviews.length) {
        reviews.push(await loadReview());
    }

    showReview(currentReview);
});



async  function loadRandomImages(count = 5) {
    const container = document.getElementById("images");
    container.innerHTML = "Загрузка...";

    const images = [];

    for (let i = 0; i < count; i++) {
        const url = `https://picsum.photos/300/200?random=${Math.random()}`;
        images.push(url);
    }

    container.innerHTML = images
        .map(src => `<img src="${src}" style="margin:10px;">`)
        .join("");
}

loadRandomImages(5);