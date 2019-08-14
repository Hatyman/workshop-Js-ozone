'use strict';
// checkbox
const checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach((elem, index) => {
    elem.addEventListener('change', function() {
        if (this.checked) {
            this.nextElementSibling.className += ' checked';
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });
    console.log(index);
});
// end checkbox

// cart
const btnCart = document.getElementById('cart'),
    modalCart = document.querySelector('.cart'),
    closeBtn = document.querySelector('.cart-close'),
    countGoods = document.querySelector('.counter');

btnCart.addEventListener('click', function () {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', function () {
    modalCart.style.display = '';
    document.body.style.overflow = '';
});
//end cart

//добавление удаление товара
const cards = document.querySelectorAll('.goods .card'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartEmpty = document.getElementById('cart-empty');

cards.forEach((card) => {
    const btn = card.querySelector('.btn');
    btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData();
    });
});
//end добавление удаление товара

function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;
}