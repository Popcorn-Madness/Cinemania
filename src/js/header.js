document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector("[data-menu-open]");
  const menuContainer = document.getElementById("mobile-menu__container");
  const backdrop = document.querySelector("[data-backdrop]");
  const themeSwitcher = document.getElementById("theme-switcher");
  const body = document.body;

  // Menü Aç/Kapat
  function toggleMenu() {
    const isOpen = menuContainer.classList.contains("open");
    menuContainer.classList.toggle("open", !isOpen);
    backdrop.classList.toggle("show", !isOpen);
  }

  menuButton.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", () => {
    menuContainer.classList.remove("open");
    backdrop.classList.remove("show");
  });

  // === Tema Geçişi ===
  function applyTheme() {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  }

  themeSwitcher.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-theme");
    if (isDark) {
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
  });

  // Başlangıçta koyu tema uygula
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark"); // ilk girişte dark başlat
  }
  applyTheme();
});
