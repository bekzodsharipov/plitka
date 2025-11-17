var swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 2,
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
            slidesPerGroup: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        }
    }
});


var swiper = new Swiper(".mySwiper2", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 33,
    autoplay: {
        delay: 2800,    
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next2",
        prevEl: ".swiper-button-prev2",
    },
    breakpoints: {
        0: {  
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        }
    }
});


