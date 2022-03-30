//Scroll to map
$('.header__contacts-map').on('click', function () {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, {
        duration: 600,   // по умолчанию «400» 
        easing: "linear" // по умолчанию «swing» 
    });

    return false;
});


// Swiper Banners 
var swiperBanners = new Swiper(".swiper-banners", {
    autoplay: {
        delay: 4000,
    },
    navigation: {
        nextEl: ".swiper-banners .swiper-button-next",
        prevEl: ".swiper-banners .swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + /* (index + 1) + */ "</span>";
        },
    },
    on: {
        slideChange: function () {
            const bannersSlides = document.querySelectorAll('.swiper-banners .swiper-slide')
            setTimeout(() => {
                bannersSlides.forEach(item => {
                    const banner = item.querySelector('.banners__banner')
                    banner.classList.remove('_animate')
                    if (item.classList.contains('swiper-slide-active')) banner.classList.add('_animate')
                })
            }, 50)
        },
        init: function() {
            document.querySelector('.swiper-banners .swiper-slide .banners__banner').classList.add('_animate')
        }
    },
});


// Swiper Licenses
var swiperLicenses = new Swiper(".swiper-licenses", {
    width: 234,

    navigation: {
        nextEl: ".licenses .swiper-button-next",
        prevEl: ".licenses .swiper-button-prev",
    },
    scrollbar: {
        el: ".licenses .swiper-scrollbar",
        draggable: true,
        dragSize: 200
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        769: {
            spaceBetween: 30
        }
    }
});


//Tabs

const tabs = document.querySelectorAll('.tabs')

if (tabs.length > 0) {
    tabs.forEach(element => {
        const tabsControls = element.querySelector('.tabs__controls')
        const tabsInputs = tabsControls.querySelectorAll('input')
        const tabsLabels = tabsControls.querySelectorAll('label')
        const tabsContent = element.querySelector('.tabs__content')
        const tabsTab = tabsContent.querySelectorAll('.tabs__tab')

        tabsInputs.forEach((input, ind, arr) => {
            if (input.checked) {
                input.parentNode.classList.add('label--active')
                tabsTab.forEach(tab => {
                    if (tab.dataset.pointer === input.id) tab.classList.add('tabs__tab_active')
                })
            }

            input.addEventListener('click', () => {
                arr.forEach(el => el.parentNode.classList.remove('label--active'))
                tabsTab.forEach(el => {
                    el.classList.remove('tabs__tab_active')
                    if (el.dataset.pointer === input.id) el.classList.add('tabs__tab_active')
                })
                input.parentNode.classList.add('label--active')
                if (window.innerWidth <= 1080) {
                    $('html, body').animate({
                        scrollTop: $('.tabs__controls').offset().top
                    }, {
                        duration: 300,   // по умолчанию «400» 
                        easing: "linear" // по умолчанию «swing» 
                    });
                }
            })
        })

        function changeBlocksMobile() {
            tabsTab.forEach(tab => {
                tabsLabels.forEach(label => {
                    if (label.getAttribute('for') === tab.dataset.pointer) label.after(tab)
                })
            })
        }

        function changeBlocksDesktop() {
            tabsTab.forEach(tab => tabsContent.append(tab))
        }

        if (window.innerWidth <= 1080) changeBlocksMobile()
        window.addEventListener('resize', () => window.innerWidth <= 1080 ? changeBlocksMobile() : changeBlocksDesktop())
    })
}


// Меню в шапке (max-width: 1289px)
const header = document.querySelector('.header')
const burger = header.querySelector('.header__burger')
const submenu = header.querySelector('.header__submenu')
const submenuList = header.querySelector('.header__submenu-list')
const menuList = header.querySelector('.menu__list')
const menuItemsDropdown = header.querySelectorAll('.menu__item-dropdown')
menuItemsDropdown.forEach(item => {
    const menuLink = item.querySelector('.menu__link')
    const menuDropdownLinks = item.querySelectorAll('.menu__dropdown-link')

    menuDropdownLinks.forEach(el => {
        const text = el.textContent;
        if (!el.classList.contains('menu__dropdown-link_none')) {
            el.textContent = ""
            el.insertAdjacentHTML('afterbegin', `<svg><use href="img/icons/icons.svg#ellipse"></use></svg><span>${text}</span>`)
        }
    })

    menuLink.addEventListener('click', () => {
        item.classList.toggle('open')

    })
})

burger.addEventListener('click', () => {
    header.classList.toggle('open-menu')
    if (header.classList.contains('open-search')) header.classList.remove('open-search')

})

function handleHeaderMenu() {
    menuList.append(submenuList)
    menuItemsDropdown.forEach(menuItem => {
        const menuLink = menuItem.querySelector('.menu__link')
        menuLink.addEventListener('click', e => e.preventDefault())
    })
}




// Поиск
const search = header.querySelector('.header__search')
const btn = search.querySelector('.header__search-btn')
const svg = search.querySelector('.header__search-only-icon')
const closeSearch = search.querySelector('.header__search-close')

svg.addEventListener('click',
    () => {
        if (!header.classList.contains('open-search')) header.classList.add('open-search')
        if (header.classList.contains('open-menu')) header.classList.remove('open-menu')
    }
)

closeSearch.addEventListener('click', () => header.classList.remove('open-search'))



if (window.innerWidth <= 1289) {
    handleHeaderMenu()

}

window.addEventListener('resize', () => {
    window.innerWidth <= 1289 ? handleHeaderMenu() : submenu.append(submenuList)
})

// Левое меню 
const leftMenu = document.querySelector('.left-menu')
if (leftMenu) {
    const titleMenu = leftMenu.querySelector('.left-menu__title')
    const leftMenuItems = leftMenu.querySelectorAll('.left-menu__item_dropdown');

    if (titleMenu) titleMenu.addEventListener('click', () => leftMenu.classList.toggle('open'))

    if (leftMenuItems.length > 0) {
        leftMenuItems.forEach((li, ind) => {
            li.querySelector('.left-menu__link').addEventListener('click', e => e.preventDefault())
            li.addEventListener('click', () => {
                const prevEl = li.previousElementSibling;
                li.classList.toggle('open')
                if (ind === 0) return
                li.classList.contains('open') && prevEl ? prevEl.querySelector('.left-menu__link').style.borderBottom = "0" : prevEl.querySelector('.left-menu__link').style.borderBottom = "1px solid rgba(196, 220, 196, 0.6)"
            })
        })
    }
}


/* Spoiler */
const spoilers = document.querySelectorAll('.spoiler')
if (spoilers.length > 0) {
    spoilers.forEach(spoiler => {
        const items = spoiler.querySelectorAll('.spoiler__item')
        items.forEach((item, ind, arr) => {
            item.querySelector('.spoiler__top').addEventListener('click', (e) => {
                item.classList.toggle('open')
            })
        })
    })
}


// Popups
class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._closeButton = this._popupElement.querySelector('.popup__close');
        this._img = this._popupElement.id === "photo" ? this._popupElement.querySelector('.popup__img') : null;
        this._source = this._img ? this._img.previousElementSibling : null;
        this._handleEscClose = this._handleEscClose.bind(this)
        this._openingLinks = document.querySelectorAll(`[data-pointer="${this._popupElement.id}"]`)
        this.setEventListeners()
    }

    open(el) {
        if (this._img) this._img.src = el.src
        if (this._source) this._source.srcset = el.src
        document.body.style.overflow = "hidden";
        this._popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        if (this._img) this._img.src = ""
        this._popupElement.classList.remove('popup_opened');
        document.body.style.overflow = "visible";
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.keyCode === 27) {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
        this._closeButton.addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }
}

const popups = document.querySelectorAll('.popup')

if (popups.length > 0) popups.forEach(item => new Popup(item))

// Mask phone
$(function () {
    $("#phone").mask("+7 999 999-9999");
});


// Фокус инпутов
const inputRows = document.querySelectorAll('.form__input')
if (inputRows.length > 0) {
    function focus(el) {
        el.closest('.form__row').classList.add('focus')
        el.addEventListener('focusout', () => focusout(el))
    }

    function focusout(el) {
        el.closest('.form__row').classList.remove('focus')
        return el.removeEventListener('focusout', focusout)
    }

    inputRows.forEach(item => {
        item.addEventListener('focus', () => focus(item))
    })
}


// Filters
/* Селект */

const selects = document.querySelectorAll('.select')
if (selects.length > 0) {
    selects.forEach(select => {
        const inputs = select.querySelectorAll('input')
        const selectBtn = select.querySelector('.select__btn')
        inputs.forEach((input, ind, arr) => {
            const label = document.querySelector(`[for="${input.id}"]`);
            if (input.checked) selectBtn.textContent = label.textContent;
            input.addEventListener("click", ({ target }) => {
                const label = document.querySelector(`[for="${target.id}"]`);
                arr.forEach((el) => (el.checked = false));
                input.checked = true;
                selectBtn.textContent = label.textContent;
                if (input.checked) select.classList.remove('open')
            });
        })

        selectBtn.addEventListener("click", () => {
            select.classList.toggle('open')
            if (select.classList.contains("open")) {
                document.addEventListener(
                    "click",
                    ({ target }) => {
                        if (!target.closest('.select'))
                            select.classList.remove("open");
                    }
                );
            }
        });
    })
}




/* Яндекс карты */
ymaps.ready(init);

const addresses = [
    {
        id: "1",
        coordinates: [57.158492, 65.552467],
        title: "ДЦ на Свердлова",
        adress: "г. Тюмень, улица Свердлова, 5к1",
        idMap: "79382519486"
    },
    {
        id: "2",
        coordinates: [57.161763, 65.494850],
        title: "ДЦ на Ямской",
        adress: "г. Тюмень, Ямская улица, 86",
        idMap: "34832144675"
    },
    {
        id: "3",
        coordinates: [57.171181, 65.555510],
        title: "ДЦ на Газовиков",
        adress: "г. Тюмень, улица Газовиков, 61",
        idMap: "200308955503"
    },
    {
        id: "4",
        coordinates: [57.146266, 65.552662],
        title: "ДЦ на Республики",
        adress: "г. Тюмень, улица Республики, 86к1",
        //нет в яндекс картах, координаты брались с 2гис
    },
    {
        id: "5",
        coordinates: [57.108818, 65.573952],
        title: "ДЦ на Гольцова",
        adress: "г. Тюмень, улица Василия Гольцова, 10",
        idMap: "68329935208"
    },
    {
        id: "6",
        coordinates: [57.098054, 65.586601],
        title: "ДЦ на Монтажников",
        adress: "г. Тюмень, улица Монтажников, 61",
        idMap: "204885165549"
    },
    {
        id: "7",
        coordinates: [57.114159, 65.553421],
        title: "ДЦ на Менделеева",
        adress: "г. Тюмень, улица Дмитрия Менделеева, 5",
        idMap: "192625494590"
    },

    //Университетская или Ленина?
    {
        id: "8",
        coordinates: [57.159395, 65.523845],
        title: "ДЦ на Ленина",
        adress: "г. Тюмень, ул. Ленина, 12",
        idMap: "34542445968"
    },
];

function init() {
    // Создание карты.
    var myMap = new ymaps.Map(
        "map",
        {
            center: [57.155719, 65.550156],
            zoom: 12,
            controls: ['zoomControl', 'geolocationControl'],
        },
        {
            searchControlProvider: "yandex#search",
            zoomControlPosition: { right: 10, top: 250 },
            zoomControlSize: 'small',
            geolocationControlPosition: { right: 10, top: 330 }
        }
    ),

        BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            `<div class="map__info">
                <p class="map__info-title">{{properties.title}}</p>   
                <div class="map__info-row">
                    <svg>
                        <use href="./img/icons/icons.svg#map-location"></use>
                    </svg>
                    <p>{{properties.adress}}</p>
                </div>
                <a href="tel:+73452355560" class="phone">
                    <svg>
                        <use href="./img/icons/icons.svg#phone"></use>
                    </svg>
                    <p> 8 (3452) <span>35-55-60</span></p>
                </a>
            </div>`
        );

    const absolute = document.querySelector('.maps__absolute')
    const titleAbsolute = document.querySelector('.maps__absolute-title')
    titleAbsolute.addEventListener('click', () => absolute.classList.toggle('open'))


    addresses.forEach(
        ({ adress, title, coordinates, id }, ind) => {
            myPlacemarkWithContent = new ymaps.Placemark(
                coordinates,
                {
                    adress,
                    title
                },
                {
                    iconImageHref: "./img/map-icon.svg",
                    iconImageSize: [55, 60],
                    iconLayout: "default#imageWithContent",
                    iconContentOffset: [12.5, 10],
                    iconImageOffset: [-25, 10],
                    balloonContentLayout: BalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    hideIconOnBalloonOpen: false,
                }
            );

            myMap.geoObjects.add(myPlacemarkWithContent);


            const links = document.querySelectorAll('.maps .list-item a')
            const link = document.querySelector(`[data-map="${id}"]`)
            const spanLink = link.querySelector('.list-text')


            const handleClass = () => {
                links.forEach(item => item.classList.remove('active'))
                link.classList.add('active')
            }

            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) titleAbsolute.textContent = spanLink.textContent;
                myMap.geoObjects.get(ind).balloon.open()
                handleClass()
                absolute.classList.remove('open')
            })

            myPlacemarkWithContent.events.add('click', handleClass)
        }
    );

}



//Отзывы
function openReviews(el) {
    const label = document.querySelector(`[for="${el.id}"]`);
    document.querySelectorAll('.select input').forEach((el) => (el.checked = false));
    el.checked = true;
    const select = document.querySelector('.reviews .select')
    const selectBtn = document.querySelector('.reviews .select__btn')
    selectBtn.textContent = label.textContent;
    if (el.checked) select.classList.remove('open')
    const reviewsBlock = document.querySelector('.reviews__block')
    reviewsBlock.style.display = 'block'
    reviewsBlock.innerHTML = ""
    reviewsBlock.insertAdjacentHTML('afterbegin', `<iframe style="width: 100%; height:100%; border: 0; background: #fff;"
    src="https://yandex.ru/maps-reviews-widget/${el.id}?comments"></iframe>`)
}

const reviews = document.querySelector('.reviews')

if (reviews) {
    const selectLayout = reviews.querySelector('.select__expand-layout')
    addresses.forEach(({ idMap, title }, ind) => {
        const html =
            `<div class="select__option">
            <label for="${idMap ? idMap : (ind + 1)}" class="select__label">${title}</label>
            <input onclick="openReviews(this)" type="checkbox" name="branch" value="${title}" id="${idMap ? idMap : (ind + 1)}">
        </div>`
        selectLayout.insertAdjacentHTML("beforeend", html)
    })
    reviews.querySelector('label').click()
}

//Анимация
const sectionTitle = document.querySelectorAll('.section__title')
const sectionAll = document.querySelectorAll('.section__all')

sectionTitle.forEach(item => item.classList.add('_anim-items', '_anim-no-hide'))
sectionAll.forEach(item => item.classList.add('_anim-items', '_anim-no-hide'))

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    /* const bannersSwiperButtonNext = document.querySelector('.swiper-banners .swiper-button-next')
    const bannersSwiperButtonPrev = document.querySelector('.swiper-banners .swiper-button-prev')
    const bannersSlides = document.querySelectorAll('.swiper-banners .swiper-slide')
    const buttonsSwiperBanners = [bannersSwiperButtonNext, bannersSwiperButtonPrev]
    buttonsSwiperBanners.forEach(button => button.addEventListener('click', () => {
        bannersSlides.forEach(item => {
            const banner = item.querySelector('.banners__banner')
            banner.classList.remove('_animate', '_anim-no-hide')
            if (item.classList.contains('swiper-slide-active')) banner.classList.add('_animate', '_anim-no-hide')
        }
        )
    })) */

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_animate');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_animate');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll();
    }, 150);
}



/* new SimpleBar(document.getElementById('simplebar'), { scrollbarMinSize: 100 }); */