$(function () {

    "use strict";

    /***************************

    swup

    ***************************/
    const options = {
        containers: ['#swupMain', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: 'a:not([data-no-swup])',
        animationSelector: '[class="Flux-main-transition"]'
    };
    const swup = new Swup(options);

    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    /***************************

    color variables

    ***************************/

    var accent = 'rgba(255, 152, 0, 1)';
    var dark = '#000';
    var light = '#fff';

    /***************************

    preloader
    
    ***************************/

    var timeline = gsap.timeline();

    timeline.to(".Flux-preloader-animation", {
        opacity: 1,
    });

    timeline.fromTo(
        ".Flux-animation-1 .Flux-h3", {
            y: "30px",
            opacity: 0
        }, {
            y: "0px",
            opacity: 1,
            stagger: 0.4
        },
    );

    timeline.to(".Flux-animation-1 .Flux-h3", {
        opacity: 0,
        y: '-30',
    }, "+=.3");

    timeline.fromTo(".Flux-reveal-box", 0.1, {
        opacity: 0,
    }, {
        opacity: 1,
        x: '-30',
    });

    timeline.to(".Flux-reveal-box", 0.45, {
        width: "100%",
        x: 0,
    }, "+=.1");
    timeline.to(".Flux-reveal-box", {
        right: "0"
    });
    timeline.to(".Flux-reveal-box", 0.3, {
        width: "0%"
    });
    timeline.fromTo(".Flux-animation-2 .Flux-h3", {
        opacity: 0,
    }, {
        opacity: 1,
    }, "-=.5");
    timeline.to(".Flux-animation-2 .Flux-h3", 0.6, {
        opacity: 0,
        y: '-30'
    }, "+=.5");
    timeline.to(".Flux-preloader", 0.8, {
        opacity: 0,
        ease: 'sine',
    }, "+=.2");
    timeline.fromTo(".Flux-up", 0.8, {
        opacity: 0,
        y: 40,
        scale: .98,
        ease: 'sine',

    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        onComplete: function () {
            $('.Flux-preloader').addClass("Flux-hidden");
        },
    }, "-=1");
    /***************************

    anchor scroll

    ***************************/
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var target = $($.attr(this, 'href'));
        var offset = 0;

        if ($(window).width() < 1200) {
            offset = 90;
        }

        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 400);
    });
    /***************************

    append

    ***************************/
    $(document).ready(function () {
        $(".Flux-arrow").clone().appendTo(".Flux-arrow-place");
        $(".Flux-dodecahedron").clone().appendTo(".Flux-animation");
        $(".Flux-lines").clone().appendTo(".Flux-lines-place");
        $(".Flux-main-menu ul li.Flux-active > a").clone().appendTo(".Flux-current-page");
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".Flux-accordion-group");
    let menus = gsap.utils.toArray(".Flux-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".Flux-accordion-menu");
        let box = element.querySelector(".Flux-accordion-content");
        let symbol = element.querySelector(".Flux-symbol");
        let minusElement = element.querySelector(".Flux-minus");
        let plusElement = element.querySelector(".Flux-plus");

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.4,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(symbol, {
                background: accent,
                ease: "none",
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }
    /***************************

    back to top

    ***************************/
    const btt = document.querySelector(".Flux-back-to-top .Flux-link");

    gsap.set(btt, {
        x: -30,
        opacity: 0,
    });

    gsap.to(btt, {
        x: 0,
        opacity: 1,
        ease: 'sine',
        scrollTrigger: {
            trigger: "body",
            start: "top -40%",
            end: "top -40%",
            toggleActions: "play none reverse none"
        }
    });
    /***************************

    cursor

    ***************************/
    const cursor = document.querySelector('.Flux-ball');

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });

    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0.6,
            ease: 'sine',
            x: e.clientX,
            y: e.clientY,
        });
    }

    $('.Flux-drag, .Flux-more, .Flux-choose').mouseover(function () {
        gsap.to($(cursor), .2, {
            width: 90,
            height: 90,
            opacity: 1,
            ease: 'sine',
        });
    });

    $('.Flux-drag, .Flux-more, .Flux-choose').mouseleave(function () {
        gsap.to($(cursor), .2, {
            width: 20,
            height: 20,
            opacity: .1,
            ease: 'sine',
        });
    });

    $('.Flux-accent-cursor').mouseover(function () {
        gsap.to($(cursor), .2, {
            background: accent,
            ease: 'sine',
        });
        $(cursor).addClass('Flux-accent');
    });

    $('.Flux-accent-cursor').mouseleave(function () {
        gsap.to($(cursor), .2, {
            background: dark,
            ease: 'sine',
        });
        $(cursor).removeClass('Flux-accent');
    });

    $('.Flux-drag').mouseover(function () {
        gsap.to($('.Flux-ball .Flux-icon-1'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.Flux-drag').mouseleave(function () {
        gsap.to($('.Flux-ball .Flux-icon-1'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.Flux-more').mouseover(function () {
        gsap.to($('.Flux-ball .Flux-more-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.Flux-more').mouseleave(function () {
        gsap.to($('.Flux-ball .Flux-more-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.Flux-choose').mouseover(function () {
        gsap.to($('.Flux-ball .Flux-choose-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.Flux-choose').mouseleave(function () {
        gsap.to($('.Flux-ball .Flux-choose-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('a:not(".Flux-choose , .Flux-more , .Flux-drag , .Flux-accent-cursor"), input , textarea, .Flux-accordion-menu').mouseover(function () {
        gsap.to($(cursor), .2, {
            scale: 0,
            ease: 'sine',
        });
        gsap.to($('.Flux-ball svg'), .2, {
            scale: 0,
        });
    });

    $('a:not(".Flux-choose , .Flux-more , .Flux-drag , .Flux-accent-cursor"), input, textarea, .Flux-accordion-menu').mouseleave(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });

        gsap.to($('.Flux-ball svg'), .2, {
            scale: 1,
        });
    });

    $('body').mousedown(function () {
        gsap.to($(cursor), .2, {
            scale: .1,
            ease: 'sine',
        });
    });
    $('body').mouseup(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });
    });
    /***************************

     menu

    ***************************/
    $('.Flux-menu-btn').on("click", function () {
        $('.Flux-menu-btn').toggleClass('Flux-active');
        $('.Flux-menu').toggleClass('Flux-active');
        $('.Flux-menu-frame').toggleClass('Flux-active');
    });
    /***************************

    main menu

    ***************************/
    $('.Flux-has-children a').on('click', function () {
        $('.Flux-has-children ul').removeClass('Flux-active');
        $('.Flux-has-children a').removeClass('Flux-active');
        $(this).toggleClass('Flux-active');
        $(this).next().toggleClass('Flux-active');
    });
    /***************************

    progressbar

    ***************************/
    gsap.to('.Flux-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".Flux-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 40,
            scale: .98,
            ease: 'sine',

        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .4,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const scaleImage = document.querySelectorAll(".Flux-scale");

    scaleImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const parallaxImage = document.querySelectorAll(".Flux-parallax");


    if ($(window).width() > 960) {
        parallaxImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                y: value1,

            }, {
                y: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    const rotate = document.querySelectorAll(".Flux-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /***************************

    fancybox

    ***************************/
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
        loop: false,
        protect: true
    });
    $.fancybox.defaults.hash = false;
    /***************************

    reviews slider

    ***************************/

    var menu = ['<div class="Flux-custom-dot Flux-slide-1"></div>', '<div class="Flux-custom-dot Flux-slide-2"></div>', '<div class="Flux-custom-dot Flux-slide-3"></div>', '<div class="Flux-custom-dot Flux-slide-4"></div>', '<div class="Flux-custom-dot Flux-slide-5"></div>', '<div class="Flux-custom-dot Flux-slide-6"></div>', '<div class="Flux-custom-dot Flux-slide-7"></div>']
    var mySwiper = new Swiper('.Flux-reviews-slider', {
        // If we need pagination
        pagination: {
            el: '.Flux-revi-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
        speed: 800,
        effect: 'fade',
        parallax: true,
        navigation: {
            nextEl: '.Flux-revi-next',
            prevEl: '.Flux-revi-prev',
        },
    })

    /***************************

    infinite slider

    ***************************/
    var swiper = new Swiper('.Flux-infinite-show', {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 5000,
        autoplay: true,
        autoplay: {
            delay: 0,
        },
        loop: true,
        freeMode: true,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
        },
    });

    /***************************

    portfolio slider

    ***************************/
    var swiper = new Swiper('.Flux-portfolio-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        parallax: true,
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.Flux-portfolio-next',
            prevEl: '.Flux-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    1 item slider

    ***************************/
    var swiper = new Swiper('.Flux-1-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.Flux-portfolio-next',
            prevEl: '.Flux-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    2 item slider

    ***************************/
    var swiper = new Swiper('.Flux-2-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.Flux-portfolio-next',
            prevEl: '.Flux-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        $('html, body').animate({
            scrollTop: 0,
        }, 0);

        gsap.to('.Flux-progress', {
            height: 0,
            ease: 'sine',
            onComplete: () => {
                ScrollTrigger.refresh()
            },
        });
        /***************************

         menu

        ***************************/
        $('.Flux-menu-btn').removeClass('Flux-active');
        $('.Flux-menu').removeClass('Flux-active');
        $('.Flux-menu-frame').removeClass('Flux-active');
        /***************************

        append

        ***************************/
        $(document).ready(function () {
            $(".Flux-arrow-place .Flux-arrow, .Flux-animation .Flux-dodecahedron, .Flux-current-page a").remove();
            $(".Flux-arrow").clone().appendTo(".Flux-arrow-place");
            $(".Flux-dodecahedron").clone().appendTo(".Flux-animation");
            $(".Flux-lines").clone().appendTo(".Flux-lines-place");
            $(".Flux-main-menu ul li.Flux-active > a").clone().appendTo(".Flux-current-page");
        });
        /***************************

        accordion

        ***************************/

        let groups = gsap.utils.toArray(".Flux-accordion-group");
        let menus = gsap.utils.toArray(".Flux-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".Flux-accordion-menu");
            let box = element.querySelector(".Flux-accordion-content");
            let symbol = element.querySelector(".Flux-symbol");
            let minusElement = element.querySelector(".Flux-minus");
            let plusElement = element.querySelector(".Flux-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.4,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(symbol, {
                    background: accent,
                    ease: "none",
                }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

        /***************************

        cursor

        ***************************/

        $('.Flux-drag, .Flux-more, .Flux-choose').mouseover(function () {
            gsap.to($(cursor), .2, {
                width: 90,
                height: 90,
                opacity: 1,
                ease: 'sine',
            });
        });

        $('.Flux-drag, .Flux-more, .Flux-choose').mouseleave(function () {
            gsap.to($(cursor), .2, {
                width: 20,
                height: 20,
                opacity: .1,
                ease: 'sine',
            });
        });

        $('.Flux-accent-cursor').mouseover(function () {
            gsap.to($(cursor), .2, {
                background: accent,
                ease: 'sine',
            });
            $(cursor).addClass('Flux-accent');
        });

        $('.Flux-accent-cursor').mouseleave(function () {
            gsap.to($(cursor), .2, {
                background: dark,
                ease: 'sine',
            });
            $(cursor).removeClass('Flux-accent');
        });

        $('.Flux-drag').mouseover(function () {
            gsap.to($('.Flux-ball .Flux-icon-1'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.Flux-drag').mouseleave(function () {
            gsap.to($('.Flux-ball .Flux-icon-1'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.Flux-more').mouseover(function () {
            gsap.to($('.Flux-ball .Flux-more-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.Flux-more').mouseleave(function () {
            gsap.to($('.Flux-ball .Flux-more-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.Flux-choose').mouseover(function () {
            gsap.to($('.Flux-ball .Flux-choose-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.Flux-choose').mouseleave(function () {
            gsap.to($('.Flux-ball .Flux-choose-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('a:not(".Flux-choose , .Flux-more , .Flux-drag , .Flux-accent-cursor"), input , textarea, .Flux-accordion-menu').mouseover(function () {
            gsap.to($(cursor), .2, {
                scale: 0,
                ease: 'sine',
            });
            gsap.to($('.Flux-ball svg'), .2, {
                scale: 0,
            });
        });

        $('a:not(".Flux-choose , .Flux-more , .Flux-drag , .Flux-accent-cursor"), input, textarea, .Flux-accordion-menu').mouseleave(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });

            gsap.to($('.Flux-ball svg'), .2, {
                scale: 1,
            });
        });

        $('body').mousedown(function () {
            gsap.to($(cursor), .2, {
                scale: .1,
                ease: 'sine',
            });
        });
        $('body').mouseup(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });
        });
        /***************************

        main menu

        ***************************/
        $('.Flux-has-children a').on('click', function () {
            $('.Flux-has-children ul').removeClass('Flux-active');
            $('.Flux-has-children a').removeClass('Flux-active');
            $(this).toggleClass('Flux-active');
            $(this).next().toggleClass('Flux-active');
        });
        /***************************

        scroll animations

        ***************************/

        const appearance = document.querySelectorAll(".Flux-up");

        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 40,
                scale: .98,
                ease: 'sine',

            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: .4,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const scaleImage = document.querySelectorAll(".Flux-scale");

        scaleImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                scale: value1,

            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const parallaxImage = document.querySelectorAll(".Flux-parallax");


        if ($(window).width() > 960) {
            parallaxImage.forEach((section) => {
                var value1 = $(section).data("value-1");
                var value2 = $(section).data("value-2");
                gsap.fromTo(section, {
                    ease: 'sine',
                    y: value1,

                }, {
                    y: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        const rotate = document.querySelectorAll(".Flux-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
        /***************************

        fancybox

        ***************************/
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
            loop: false,
            protect: true
        });
        $.fancybox.defaults.hash = false;
        /***************************

        reviews slider

        ***************************/

        var menu = ['<div class="Flux-custom-dot Flux-slide-1"></div>', '<div class="Flux-custom-dot Flux-slide-2"></div>', '<div class="Flux-custom-dot Flux-slide-3"></div>', '<div class="Flux-custom-dot Flux-slide-4"></div>', '<div class="Flux-custom-dot Flux-slide-5"></div>', '<div class="Flux-custom-dot Flux-slide-6"></div>', '<div class="Flux-custom-dot Flux-slide-7"></div>']
        var mySwiper = new Swiper('.Flux-reviews-slider', {
            // If we need pagination
            pagination: {
                el: '.Flux-revi-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (menu[index]) + '</span>';
                },
            },
            speed: 800,
            effect: 'fade',
            parallax: true,
            navigation: {
                nextEl: '.Flux-revi-next',
                prevEl: '.Flux-revi-prev',
            },
        })

        /***************************

        infinite slider

        ***************************/
        var swiper = new Swiper('.Flux-infinite-show', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: true,
            autoplay: {
                delay: 0,
            },
            loop: true,
            freeMode: true,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
            },
        });

        /***************************

        portfolio slider

        ***************************/
        var swiper = new Swiper('.Flux-portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            parallax: true,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.Flux-portfolio-next',
                prevEl: '.Flux-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        1 item slider

        ***************************/
        var swiper = new Swiper('.Flux-1-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.Flux-portfolio-next',
                prevEl: '.Flux-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        2 item slider

        ***************************/
        var swiper = new Swiper('.Flux-2-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.Flux-portfolio-next',
                prevEl: '.Flux-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
        });

    });

});
