const SLIDES_COUNT = 11;
const FIRST_TITLE = 'з днем святого валентина ❤️';
const DEFAULT_TITLE = 'це ти, коли'
const LAST_TITLE = 'Я тебе кохаю 💕';
const SLIDES_DATA = {
  0: 'приходиться вдягати свою кофту, бо мою вже вдягнув я',
  1: 'вдягнувши кепку в сонячний літній день, ми йдемо по морозиво',
  2: 'щось в спині хрусьнуло - треба шось робити.. і потягаєшся',
  3: 'акрил поганий і нічо не получається',
  4: 'я кажу тобі, що ти гарна (ти буквально тільки проснулась)',
  5: 'заїбався',
  6: 'зварила повну каструлю пюрешки і кажеш: "ходи їсти!"',
  7: 'робиш новий светр поки дивишся серіал',
  8: 'залізла під ковдру після ванни',
  9: 'хочеш щось солодкого після того як поїла щось солоного',
  10: 'це наші котики і вазон',
};

let currentSlideIndex = -1;
let currentSlide = null;
let firstSlide = true;

const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.navigation-btn--prev');
const nextBtn = document.querySelector('.navigation-btn--next');

const title = slider.appendChild(document.createElement('h2'));
title.classList.add('title');

for (let i = 0; i < SLIDES_COUNT; i++) {
  const slide = document.createElement('div');

  slide.classList.add('slide', `slide--${i}`);

  slider.appendChild(slide);
}

const slides = document.querySelectorAll('.slide');

const reRenderSlide = (newIndex) => {
  if (currentSlide) {
    currentSlide.classList.remove('slide--active');
  }

  currentSlide = slides[newIndex];
  currentSlide.classList.add('slide--active');

  const img = currentSlide.querySelector('img');
  const subtitle = currentSlide.querySelector('.subtitle');

  if (img) img.remove();
  if (subtitle) subtitle.remove();

  const newImg = document.createElement('img');
  const newSubtitle = document.createElement('p');
  const fileName = `cat-${newIndex + 1}.svg`;

  newSubtitle.classList.add('subtitle');

  if (!firstSlide) {
    title.textContent = DEFAULT_TITLE;
  }

  if (currentSlideIndex === SLIDES_COUNT - 1) {
    title.textContent = LAST_TITLE;
  }

  newSubtitle.textContent = SLIDES_DATA[newIndex];

  newImg.src = `static/img/${fileName}`;
  newImg.alt = `Cat ${newIndex + 1}`;

  currentSlide.appendChild(newImg);
  currentSlide.appendChild(newSubtitle);

  if (newIndex <= 0) {
    prevBtn.disabled = true;
    prevBtn.classList.add('navigation-btn--disabled');
  } else {
    prevBtn.disabled = false;
    prevBtn.classList.remove('navigation-btn--disabled');
  }

  if (newIndex >= SLIDES_COUNT - 1) {
    nextBtn.disabled = true;
    nextBtn.classList.add('navigation-btn--disabled');
  } else {
    nextBtn.disabled = false;
    nextBtn.classList.remove('navigation-btn--disabled');
  }
};

if (firstSlide) {
  prevBtn.disabled = true;
  prevBtn.classList.add('navigation-btn--disabled');

  title.textContent = FIRST_TITLE;
}

prevBtn.addEventListener('click', () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    reRenderSlide(currentSlideIndex);
  }
});

nextBtn.addEventListener('click', () => {
  if (firstSlide) {
    const audio = document.getElementById('song');
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  }

  if (currentSlideIndex < SLIDES_COUNT - 1) {
    currentSlideIndex++;
    firstSlide = false;
    reRenderSlide(currentSlideIndex);
  }
});

