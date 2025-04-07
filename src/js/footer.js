const openModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');

// Modal aç
openModalBtn.addEventListener('click', e => {
  e.preventDefault(); // link davranışını engelle
  modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
});

// Modal kapat
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('is-hidden');
  document.body.style.overflow = 'auto';
});
