// import sendMessage from "./contact/contact.js";

document.addEventListener("DOMContentLoaded", function () {
  const headerSearchOpen = document.querySelector("#search-open");
  const headerSearchForm = document.querySelector("#header-search-form");

  headerSearchOpen.addEventListener("click", () => {
    headerSearchForm.classList.toggle("search-form-open");
  });

  // Mobile Menu

  const menuToggle = document.querySelector("#menu-toggle");
  const mobileMenu = document.querySelector("#header-menu");

  const bodyEl = document.body;
  if (menuToggle) {
    // Open mobile menu

    menuToggle.addEventListener("click", () => {
      if (menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        bodyEl.classList.remove("lock");
      } else {
        menuToggle.classList.add("active");
        mobileMenu.classList.add("active");
        bodyEl.classList.add("lock");
      }
    });

    // Close mobile menu when click on menu item
    mobileMenu.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      bodyEl.classList.remove("lock");
    });
  }

  // Slider top

  const headerSwiper = new Swiper(".header-slider", {
    loop: true,
    speed: 1000,
    effect: "fade",
    lazy: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Slider cta

  const ctaSwiper = new Swiper(".cta-slider", {
    loop: true,
    speed: 1000,
    effect: "fade",
    lazy: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // ------------TOGGLE THEME COLOR----------------

  const toggleTheme = document.querySelector(".toggle-theme");
  if (toggleTheme) {
    toggleTheme.addEventListener("click", () => {
      const toggleThemeInput = document.querySelector(".toggle-theme__input");
      if (toggleThemeInput.checked) {
        bodyEl.classList.add("green-theme");
      } else {
        bodyEl.classList.remove("green-theme");
      }
    });
  }

  // ------------BUTTON BACK TOP----------------

  const backTop = document.querySelector(".back-top");
  if (backTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backTop.classList.add("back-top--visible");
      } else {
        backTop.classList.remove("back-top--visible");
      }
    });

    // backTop.addEventListener("click", () => {
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "smooth",
    //   });
    // });
  }
});

// Contact form

const FORM_DATA = document.querySelector(".contact__form");
const ERROR_MESSAGE = "Failed to send data";
const SUCCESS_MESSAGE = "Successfully sent data";

FORM_DATA.addEventListener("submit", formSend);

async function formSend(e) {
  e.preventDefault();

  // const TOKEN = process.env.TOKEN;
  // const CHAT_ID = process.env.CHAT_ID;
  // const URI_API =
  //   "https://api.telegram.org/bot" + process.env.TOKEN + "/sendMessage";
  const URI_API = `https://api.telegram.org/bot8059678452:AAFJ6llZnwEg6dlPCD5GQa96zS7xZ6dNrhw/sendMessage`;

  let message = `<b>Contact info from fitness app:</b>
      <b>User: ${this.name.value}</b>
      <b>Email: ${this.email.value}</b>
      <b>Text: ${this.message.value}</b>`;

  const res = await fetch(URI_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // chat_id: CHAT_ID,
      chat_id: "-1002484455170",
      text: message,
      parse_mode: "html",
    }),
  });

  const result = await res.json();

  if (result.ok) {
    showMessage(true);
    FORM_DATA.reset();
    console.log(SUCCESS_MESSAGE);
  } else {
    showMessage(false);
    console.log(ERROR_MESSAGE);
  }
}

function showMessage(isSuccess) {
  const alert = document.querySelector(".alert");
  const text = document.querySelector(".alert p");
  const closeBtn = document.querySelector(".alert span");
  alert.classList.remove("hidden");
  if (isSuccess) {
    alert.classList.add("alert-success");
    text.textContent = "Successfully sent data";
  } else {
    alert.classList.add("alert-danger");
    text.textContent = "Failed to send data";
  }
  closeBtn.addEventListener("click", () => {
    alert.classList.add("hidden");
  });
}
