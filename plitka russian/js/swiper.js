var swiper = new Swiper(".mySwiper", {
    spaceBetween: 33,
    autoplay: {
        delay: 2800,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-nexts",
        prevEl: ".swiper-button-prevs",
    },
    breakpoints: {
        0: {  
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        1024: {
            slidesPerView: 2,
        }
    }
});

