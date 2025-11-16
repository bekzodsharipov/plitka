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



document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("tel");
    const countryDropdown = document.getElementById("countryDropdown");
    const selectedCountryCode = document.getElementById("selectedCountryCode");
    const selectedCountry = document.getElementById("selectedCountry");
    const phoneError = document.getElementById("phoneError");

    const countries = [
        { name: "Russia", code: "+7", placeholder: "999 123 45 67", validate: /^\d{3} \d{3} \d{2} \d{2}$/ },
        { name: "Uzbekistan", code: "+998", placeholder: "88 123 45 67", validate: /^\d{2} \d{3} \d{2} \d{2}$/ },
        { name: "Kazakhstan", code: "+7", placeholder: "777 123 45 67", validate: /^\d{3} \d{3} \d{2} \d{2}$/ },
        { name: "Kyrgyzstan", code: "+996", placeholder: "555 123 456", validate: /^\d{3} \d{3} \d{3}$/ },
        { name: "Tajikistan", code: "+992", placeholder: "55 555 5555", validate: /^\d{2} \d{3} \d{4}$/ },
        { name: "Turkmenistan", code: "+993", placeholder: "61 123456", validate: /^\d{2} \d{6}$/ },

        { name: "USA", code: "+1", placeholder: "555 123 4567", validate: /^\d{3} \d{3} \d{4}$/ },
        { name: "Canada", code: "+1", placeholder: "555 123 4567", validate: /^\d{3} \d{3} \d{4}$/ },
        { name: "Mexico", code: "+52", placeholder: "55 1234 5678", validate: /^\d{2} \d{4} \d{4}$/ },
    ];


    let currentCode = "+7";

    selectedCountryCode.textContent = currentCode;

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
            if (digits.length > 0) formatted += digits.slice(0, 2);
            if (digits.length > 2) formatted += " " + digits.slice(2, 5);
            if (digits.length > 5) formatted += " " + digits.slice(5, 7);
            if (digits.length > 7) formatted += " " + digits.slice(7, 9);
        }

        if (c.code === "+7") {
            if (digits.length > 0) formatted += digits.slice(0, 3);
            if (digits.length > 3) formatted += " " + digits.slice(3, 6);
            if (digits.length > 6) formatted += " " + digits.slice(6, 8);
            if (digits.length > 8) formatted += " " + digits.slice(8, 10);
        }

        phoneInput.value = formatted;
        phoneError.style.display = "none";
    });
});
