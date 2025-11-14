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


var swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 33,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },

    navigation: {
        nextEl: ".swiper-button-nexts",
        prevEl: ".swiper-button-prevs",
    },

    breakpoints: {
        0: {  
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        }
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const phoneInput = document.getElementById("tel");
    const countryDropdown = document.getElementById("countryDropdown");
    const selectedCountryCode = document.getElementById("selectedCountryCode");
    const selectedCountry = document.getElementById("selectedCountry");
    const phoneError = document.getElementById("phoneError");

    const countries = [
        { name: "Uzbekistan", code: "+998", placeholder: "88 888 88 88", validate: /^\d{2} \d{3} \d{2} \d{2}$/ },
        { name: "Tajikistan", code: "+992", placeholder: "55 555 5555", validate: /^\d{2} \d{3} \d{4}$/ },
        { name: "USA", code: "+1", placeholder: "555 123 4567", validate: /^\d{3} \d{3} \d{4}$/ },
        { name: "South Korea", code: "+82", placeholder: "10 1234 5678", validate: /^\d{2} \d{4} \d{4}$/ }
    ];

    let currentCode = "+998";

    selectedCountry.addEventListener("click", () => {
        countryDropdown.style.display = countryDropdown.style.display === "block" ? "none" : "block";
        countryDropdown.innerHTML = "";
        countries.forEach(c => {
            const div = document.createElement("div");
            div.textContent = `${c.name} (${c.code})`;
            div.addEventListener("click", () => {
                currentCode = c.code;
                selectedCountryCode.textContent = c.code;
                phoneInput.placeholder = c.placeholder;
                phoneInput.value = "";
                phoneError.style.display = "none";
                countryDropdown.style.display = "none";
            });
            countryDropdown.appendChild(div);
        });
    });

    document.addEventListener("click", e => {
        if (!selectedCountry.contains(e.target) && !countryDropdown.contains(e.target)) {
            countryDropdown.style.display = "none";
        }
    });

    phoneInput.addEventListener("input", e => {
        let digits = e.target.value.replace(/\D/g, "");
        let formatted = "";

        const c = countries.find(c => c.code === currentCode);
        if (c.code === "+998") {
            if(digits.length>0) formatted += digits.slice(0,2);
            if(digits.length>2) formatted += " "+digits.slice(2,5);
            if(digits.length>5) formatted += " "+digits.slice(5,7);
            if(digits.length>7) formatted += " "+digits.slice(7,9);
        }

        phoneInput.value = formatted;
        phoneError.style.display = "none";
    });
});
