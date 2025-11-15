var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 33,
    loop: true,
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
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 33
        }
    }
});
