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
        searchBtn = document.querySelector('.search-btn'),
        currentCategory = document.getElementById('current-category');
    // end фильтр по акции
    // фильтр по акции

    discountCheckbox.addEventListener('click', filter);
    // фильтр по цене
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);
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

    function filter() {
        const cards = currentCategory.value ?
            document.querySelectorAll(`.goods [data-category="${currentCategory.value}"].card`)
            :
            document.querySelectorAll('.goods .card');
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent),
                discount = card.querySelector('.card-sale');

            if ((min.value > price) || (max.value && (max.value < price))) {
                card.parentElement.style.display = 'none';
            } else if (discountCheckbox.checked && !discount) {
                card.parentElement.style.display = 'none';
            } else {
                card.parentElement.style.display = '';
            }
        });
    }

    // end поиск
}

// end фильтры

// получение информации
function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error ('Данные не были получены, ошибка: ' + response.status);
            }
        })
        .then(data => {
            return data;
            // renderCards(data);
        })
        .catch(e => {
            console.warn(e);
            goodsWrapper.innerHTML = "<div style='color:darkblue; font-size: 25px;'>Упс, что-то пошло не так...</div>";
        });
}

function renderCards(data) {
    const goowsWrapper = document.querySelector('.goods');
    data.goods.forEach(good => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
        <div class="card" data-category="${good.category}">
        ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
            <div class="card-img-wrapper">
                <span class="card-img-top"
                    style="background-image: url('${good.img}')"></span>
            </div>
            <div class="card-body justify-content-between">
                <div class="card-price" ${good.sale ? 'style="color:red;"' : ''}>${good.price} ₽</div>
                <h5 class="card-title">${good.title}</h5>
                <button class="btn btn-primary">В корзину</button>
            </div>
        </div>
        `;
        goowsWrapper.appendChild(card);
    });
}
// end получение информации

function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
        categories = new Set(),
        catalogList = document.querySelector('.catalog-list'),
        catalogBtn = document.querySelector('.catalog-button'),
        catalogWrapper = document.querySelector('.catalog'),
        currentCategory = document.getElementById('current-category');
    cards.forEach(card => {
        categories.add(card.dataset.category);
    });

    categories.forEach(cat => {
        const li = document.createElement('li');
        li.textContent = cat;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }
        
        console.log(event);

        if (event.target.tagName === 'LI') {
            currentCategory.value = event.target.textContent;
            cards.forEach(card => {
                if (card.dataset.category === event.target.textContent) {
                    card.parentElement.style.display = '';
                } else {
                    card.parentElement.style.display = 'none';
                }
            });
        }
    });
}


getData()
    .then(data => {
        renderCards(data);
        toggleCheckbox();
        toggleCart();
        addCart();
        actionPage();
        renderCatalog();
    });



