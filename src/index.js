'use strict';

// checkbox

function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach((elem, index) => {
        elem.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.className += ' checked';
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}


// end checkbox

// cart
function toggleCart() {
    const btnCart = document.getElementById('cart'),
        modalCart = document.querySelector('.cart'),
        closeBtn = document.querySelector('.cart-close');

    btnCart.addEventListener('click', function () {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function () {
        modalCart.style.display = '';
        document.body.style.overflow = '';
    });
}

//end cart

//добавление удаление товара
function addCart() {
    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('.btn');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', function () {
                cardClone.remove();
                showData();
            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cartTotal = document.querySelector('.cart-total span');
        let sum = 0;
        countGoods.textContent = cardsCart.length;

        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });

        cartTotal.textContent = sum;

        if (cardsCart.length) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}

//end добавление удаление товара

// фильтры
function actionPage() {
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');
    // фильтр по акции
    discountCheckbox.addEventListener('click', () => {
        cards.forEach((card) => {

            if (discountCheckbox.checked) {
                console.log(card.querySelector('.card-sale'));
                if (!(card.querySelector('.card-sale'))) {
                    card.parentElement.style.display = 'none';
                }
            } else {
                card.parentElement.style.display = '';
            }
        });
    });
    // end фильтр по акции
    // фильтр по цене
    function filterPrice() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent);

            if ((min.value > price) || (max.value && (max.value < price))) {
                card.parentElement.className += ' displayNone';
            } else {
                card.parentElement.classList.remove('displayNone');
            }
        });
    }

    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);
    // end фильтр по цене
    // поиск
    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');

        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!(searchText.test(title.textContent))) {
                card.parentElement.style.display = 'none';
            } else {
                card.parentElement.style.display = '';
            }
        });
        console.log(searchText);
    });
    // end поиск
}
// end фильтры

toggleCheckbox();
toggleCart();
addCart();
actionPage();


