const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");
hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  overlay.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
});
overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 1224) {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
  }
});

// ===== Modal open / close =====
const calcModal = document.getElementById("calcModal");
const openCalcBtn = document.getElementById("openCalcBtn");
const calcCloseBtn = document.getElementById("calcCloseBtn");
const calcOverlay = document.getElementById("calcOverlay");

function openModal() {
  calcModal.classList.add("calc-modal--open");
}

function closeModal() {
  calcModal.classList.remove("calc-modal--open");
}

openCalcBtn.addEventListener("click", openModal);
calcCloseBtn.addEventListener("click", closeModal);
calcOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== Calculator logic =====
const serviceSelect = document.getElementById("serviceSelect");
const areaInput = document.getElementById("areaInput");
const priceBtn = document.getElementById("priceBtn");
const priceValue = document.getElementById("priceValue");

function updatePrice() {
  const pricePerM2 = Number(serviceSelect.value); // из value <option>
  const area = Number(areaInput.value);

  if (!pricePerM2 || !area || area <= 0) {
    priceBtn.disabled = true;
    priceValue.textContent = "… ₽";
    return;
  }

  const total = pricePerM2 * area;

  priceBtn.disabled = false;
  priceValue.textContent = total.toLocaleString("ru-RU") + " ₽"; // красивый формат 120 000 ₽
}

serviceSelect.addEventListener("change", updatePrice);
areaInput.addEventListener("input", updatePrice);

document.addEventListener("DOMContentLoaded", function () {
  const registerBtns = document.querySelectorAll(".registerBtn"); // oddiy btnlar
  const tariffBtns = document.querySelectorAll(".services__row__col__btn"); // tarif btnlar

  const modal = document.getElementById("registrationModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const overlay = document.querySelector(".homeModalOverlay");
  const form = document.getElementById("registrationForm");
  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");
  const submitBtn = document.getElementById("submitBtn");
  const timerEl = document.getElementById("timer");

  const tariffInput = document.getElementById("tariff");
  const serviceSelect = document.getElementById("service");
  const tariffRow = document.getElementById("tariffRow");
  const serviceRow = document.getElementById("serviceRow");

  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");

  // 🔒 ALWAYS RUSSIA
  const COUNTRY_CODE = "+7";
  const GROUPS = [3, 3, 4]; // 900 123 4567

  function groupsToMaxLen(groups) {
    return (
      groups.reduce((sum, n) => sum + n, 0) + Math.max(groups.length - 1, 0)
    );
  }

  const MAX_LEN = groupsToMaxLen(GROUPS);
  const PHONE_REGEX = new RegExp(
    "^" + GROUPS.map((n) => `\\d{${n}}`).join("\\s") + "$"
  );

  function formatDigitsToPhone(digits) {
    let parts = [];
    let index = 0;

    for (let g of GROUPS) {
      if (index >= digits.length) break;
      parts.push(digits.slice(index, index + g));
      index += g;
    }

    return parts.join(" ");
  }

  // 🔓 MODAL OCHISH: fromTariff = true/false
  function openModal(tariffName = "", fromTariff = false) {
    if (!modal) return;
    modal.style.display = "block";
    document.body.style.overflowY = "hidden";

    phoneInput.placeholder = "900 123 4567";
    phoneInput.maxLength = MAX_LEN;
    phoneInput.value = "";
    phoneError.style.display = "none";

    // Forma maydonlarini reset
    if (nameInput) nameInput.value = "";
    if (addressInput) addressInput.value = "";
    if (serviceSelect) serviceSelect.selectedIndex = 0;

    if (fromTariff) {
      // Tarif tugmasidan ochilgan
      if (tariffRow) tariffRow.style.display = "block";
      if (serviceRow) serviceRow.style.display = "none";

      if (tariffInput) {
        // ruscha, lotincha
        tariffInput.value = tariffName || "";
      }
    } else {
      // Oddiy register btn
      if (tariffRow) tariffRow.style.display = "none";
      if (serviceRow) serviceRow.style.display = "block";

      if (tariffInput) {
        tariffInput.value = "";
      }
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflowY = "scroll";
  }

  // 🟢 ODDIY register btn – USLUGA bo‘ladi, tarif yo‘q
  registerBtns.forEach((btn) =>
    btn.addEventListener("click", () => openModal("", false))
  );

  // 🟡 TARIF kartochkalaridagi btn – TARIF ko‘rinadi, USLUGA yo‘q
  tariffBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let tariffName = btn.dataset.tariff || "";

      // Agar data-tariff bo‘lmasa, kartadan title olib qo‘yish fallback
      if (!tariffName) {
        const col = btn.closest(".services__row__col");
        const titleEl = col && col.querySelector(".services__row__col__title");
        if (titleEl) {
          // masalan "Эконом" → "Ekonom" deb o‘zing translit qilmoqchi bo‘lsang, shu yerda qilasan
          const text = titleEl.textContent.trim();
          if (text === "Эконом") tariffName = "Ekonom";
          else if (text === "Стандарт") tariffName = "Standart";
          else if (text === "Премиум") tariffName = "Premium";
          else tariffName = text;
        }
      }

      openModal(tariffName, true);
    });
  });

  // ❌ CLOSE MODAL
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  // 📱 PHONE INPUT – ONLY RUS FORMAT
  phoneInput.addEventListener("input", (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    const formatted = formatDigitsToPhone(digits);
    phoneInput.value = formatted;
    phoneError.style.display = "none";
  });

  // 📨 FORM SUBMIT
  // 📨 FORM SUBMIT
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const raw = phoneInput.value.trim();

    if (!PHONE_REGEX.test(raw)) {
      phoneError.style.display = "block";
      return;
    }

    phoneError.style.display = "none";
    submitBtn.textContent = "ОТПРАВКА...";
    submitBtn.disabled = true;

    // faqat raqamlarni olib olamiz
    const digits = raw.replace(/\D/g, "");
    const fullPhone = COUNTRY_CODE + digits; // masalan: +79001234567

    // tarif qiymatini aniqlaymiz:
    let tarifValue = "";

    // Agar tarif oynasi ochilgan bo'lsa (tarif bilan)
    if (tariffInput && tariffRow && tariffRow.style.display !== "none") {
      tarifValue = (tariffInput.value || "").trim();
    }
    // Aks holda oddiy register (usluga) dan olamiz
    else if (
      serviceSelect &&
      serviceRow &&
      serviceRow.style.display !== "none"
    ) {
      tarifValue = (serviceSelect.value || "").trim();
    }

    const payload = {
      name: nameInput ? nameInput.value.trim() : "",
      phone: fullPhone,
      address: addressInput ? addressInput.value.trim() : "",
      tarif: tarifValue,
    };

    console.log("Yuborilayotgan payload:", payload);

    // API ga yuborish
    fetch("https://kafel.asosit.uz/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error("Server error: " + res.status + " " + text);
        }
        // agar backend json qaytarsa:
        try {
          return await res.json();
        } catch {
          return null;
        }
      })
      .then((data) => {
        console.log("Lead success:", data);

        // muvaffaqiyatli bo'lsa thank you sahifaga
        // window.location.href = "/thankYou.html";
        closeModal();
      })
      .catch((err) => {
        console.error("Lead send error:", err);
        alert(
          "Xatolik yuz berdi, iltimos, birozdan keyin yana urinib ko'ring."
        );
      })
      .finally(() => {
        submitBtn.textContent = "Отправить";
        submitBtn.disabled = false;
        phoneInput.value = "";
      });
  });

  // ⏱ SIMPLE TIMER (2 MINUTES)
  let remaining = 120;
  if (timerEl) {
    const intervalId = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(intervalId);
        return;
      }
      remaining--;

      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      const text =
        minutes.toString().padStart(1, "0") +
        ":" +
        seconds.toString().padStart(2, "0");

      timerEl.textContent = text;
    }, 1000);
  }

  // initial setup
  phoneInput.placeholder = "900 123 4567";
  phoneInput.maxLength = MAX_LEN;
});
