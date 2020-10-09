
class Card {
    constructor(template, btn) {
        this.template = template;
        this.btn = btn;
    }
}

class Carousel {
    cards = [];
    buttons = [];

    constructor() {
        this.cardsTemplates = document.querySelectorAll('.reviews__card');
        this.buttons = document.querySelectorAll('.carousel__toggler-btn');
        this.activeCardIndex = 1;

        this.loop = setInterval(() => {
            if (this.activeCardIndex === 3) {
                this.activeCardIndex = 0;
            }

            this.buttons[this.activeCardIndex].click();
            this.activeCardIndex += 1;
        }, 5000)
        this.cardsTemplates.forEach((card, index) => {
            if (!this.buttons || !this.buttons[index]) {
                
                return;
            }

            this.cards.push(new Card(card, this.buttons[index]));
        })
    }

    initListeners() {
        this.cards.forEach((card) => {
            card.btn.addEventListener('click', () => {
                // Ничего не делать, если кнопка уже активна
                if (card.btn.classList.contains('carousel__toggler-btn--active')) {
                    
                    return;
                }

                this.clearClassList();
                card.template.classList.add('reviews__card--active');
                card.btn.classList.add('carousel__toggler-btn--active')
            })
        })
    }

    clearClassList() {
        this.cards.forEach((card) => {
            if (card.template.classList.contains('reviews__card--active')) {
                card.template.classList.add('reviews__card--old');
                setTimeout(() => {
                    card.template.classList.remove('reviews__card--old');
                }, 100);
            }
            card.template.classList.remove('reviews__card--active');
            card.btn.classList.remove('carousel__toggler-btn--active')
        })
    }
}

const carousel = new Carousel();
carousel.initListeners();

class Page {
    constructor(btn, pageSelector) {
        this.btn = btn;
        this.template = document.querySelector(pageSelector);
    }
}

class Navigation {
    constructor() {
        const btns = document.querySelectorAll('.main-navigation li');
        this.pages = {
            home: new Page(btns[0], '.home'),
            features: new Page(btns[1], '.features'),
            pricing: new Page(btns[2], '.prising-plan'),
            pages: new Page(btns[3], '.latest-news')
        };
    }

    initListeners() {
        Object.keys(this.pages).forEach((pageKey) => {
            const page = this.pages[pageKey];
            page.btn.addEventListener('click', (event) => {
                event.preventDefault();
                this.clearClassList();
                page.btn.classList.add('active')
                page.template.scrollIntoView({block: "start", behavior: "smooth"});
            })
        })
    }

    clearClassList() {
        Object.keys(this.pages).forEach((pageKey) => {
            const page = this.pages[pageKey];
            page.btn.classList.remove('active');  
        })
    }
}

const navigation = new Navigation();
navigation.initListeners();
const btnToTop = document.querySelector('.btn__up');
btnToTop.addEventListener('click', () => {
    if (!btnToTop.classList.contains('active')) {
        return;
    }
    navigation.pages.home.template.scrollIntoView({block: "start", behavior: "smooth"});
})
window.addEventListener('scroll', () => {
    if (scrollY > 250) {
        btnToTop.classList.add('active');
    } else {
        btnToTop.classList.remove('active');
    }
})
const arrowDown = document.querySelector('.home__arrow');
arrowDown.addEventListener('click', () => {
    navigation.pages.features.template.scrollIntoView({block: "start", behavior: "smooth"})
})