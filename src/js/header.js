document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector("[data-menu-open]");
  const menuContainer = document.getElementById("mobile-menu__container");
  const backdrop = document.querySelector("[data-backdrop]");

//   Menü Aç/Kapat İşlevi
  function toggleMenu() {
    const isOpen = menuContainer.classList.contains("open");
    if (isOpen) {
      menuContainer.classList.remove("open");
      backdrop.classList.remove("show");
    } else {
      menuContainer.classList.add("open");
      backdrop.classList.add("show");
    }
  }

//   Menü butonuna tıklanınca aç/kapat
  menuButton.addEventListener("click", toggleMenu);

//   Backdrop'a tıklanınca menüyü kapat
  backdrop.addEventListener("click", function () {
    menuContainer.classList.remove("open");
    backdrop.classList.remove("show");
  });
});

// Tema geçişi işlevini tanımlayalım
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

// Kullanıcının tercihini kontrol et ve uygula
function applyTheme() {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    body.classList.add(currentTheme); // Kullanıcının tercihi varsa uygula
  }
}

// Tema değişikliği fonksiyonu
themeSwitcher.addEventListener('click', () => {
//   Koyu tema (dark) sınıfını ekle veya kaldır
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light-theme'); // Tercihi kaydet
  } else {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme'); // Tercihi kaydet
  }
});

// Sayfa yüklendiğinde tema tercihini uygula
document.addEventListener('DOMContentLoaded', applyTheme);


