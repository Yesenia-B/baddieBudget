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

  const modal = document.getElementById("transaction-modal");
  const openBtn = document.getElementById("open-modal-btn");
  const closeBtn = document.querySelector(".close-btn");

  console.log(modal, openBtn, closeBtn);

  if (modal && openBtn && closeBtn) {
      
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if(e.target === modal) {
        modal.style.display = "none";
      }
   });
  } else {
    console.log("Modal Incomplete");
  }
})
