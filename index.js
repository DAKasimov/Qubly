import './scss/main.scss';
new WOW().init();

const cardsContainer = document.querySelector('.partners__cards');
const cards = [...cardsContainer.children];
const titles = document.querySelectorAll('.partners__title');

const left_side = document.querySelector('.left-side');
const left_side_close = document.querySelector('.close');
const burger = document.querySelector('.burger');
const left_side_menu_items = document.querySelectorAll('.left-side__menu-item');

setActiveCard(cards[0]);

function setActiveCard(card) {
  cards.forEach((c) => {
    c.querySelectorAll(
      '.partners__card-icon, .partners__card-icon-inner',
    ).forEach((el) => el.classList.remove('add_accent'));
  });

  card
    .querySelectorAll('.partners__card-icon, .partners__card-icon-inner')
    .forEach((el) => el.classList.add('add_accent'));

  const id = card.getAttribute('data-card');
  titles.forEach((title) => {
    title.classList.toggle(
      'partners__title_active',
      title.getAttribute('data-title') === id,
    );
  });
}

cardsContainer.addEventListener('click', (event) => {
  const card = event.target.closest('.partners__card');
  if (!card) return;
  setActiveCard(card);
});

left_side_close.addEventListener('click', () => {
  left_side.classList.toggle('left-side_active');
});

burger.addEventListener('click', () => {
  left_side.classList.toggle('left-side_active');
});

left_side_menu_items.forEach((item) => {
  item.addEventListener('click', () => {
    left_side.classList.toggle('left-side_active');
  });
});
