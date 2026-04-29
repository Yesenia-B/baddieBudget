console.log("🔥 App is running"); // test

/* Mobile Menu */
document.addEventListener("DOMContentLoaded", () => {
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

if (menu && menuLinks) {
  menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
  });
}
});

if(!modal || !openBtn || !closeBtn) {
  console.log("Modal Elements missing!");
  return;
}

const modal = document.getElementById("transaction-modal");
const openBtn = document.getElementById("open-modal-btn");
const closeBtn = document.getElementById(".close-btn");

openBtn.addEventListener("submit", () => {
  modal.style.display = "block";
});

close-openBtn. addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if(e.target === modal) {
    modal.style.display = "none";
  }
});

