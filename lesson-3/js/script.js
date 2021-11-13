const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor(url, container, list = list2, sumBox = '.sum-products') {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.sumBox = sumBox;
        this._init();
    }
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data) {
        this.goods = [...data];
        this.render();
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    renderTotalCost() {
        const sumBox = document.querySelector(this.sumBox);
        sumBox.innerHTML = `Общая сумма товаров магазина: ${this.calcSum()}`;
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new this.list[this.constructor.name](product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        this.renderTotalCost();
    }
    _init() {
        return false
    }
}

class Item {
    constructor(el, img = './img/exploit.jpeg') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() {
        return `<div class='product' data-id='${this.id_product}'>
                <img class='product-img' src='${this.img}' alt='product img'>
                <div class='product-desc'>
                    <h3>${this.product_name}</h3>
                    <p class='product-price'>${this.price} ₽</p>
                    <button class='buy-btn btn'
                    data-id='${this.id_product}'
                    data-name='${this.product_name}'
                    data-price='${this.price}'>Купить</button>
                </div>
            </div>`
    }
}

class ProductsList extends List {
    constructor(cart, container = '.products', url = '/catalogData.json') {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.cart.addProduct(e.target);
            }
        });

    }
}


class ProductItem extends Item { }

class Cart extends List {
    constructor(container = '.cart', url = '/getBasket.json') {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id='${productId}']`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id='${product.id_product}']`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `Общая стоимость: ${product.quantity * product.price} ₽`;
    }
    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    }

}

class CartItem extends Item {
    constructor(el, img = './img/exploit.jpeg') {
        super(el, img);
        this.quantity = el.quantity;
    }
    render() {
        return `<div class='cart-item' data-id='${this.id_product}'>
                    <div class='product'>
                        <img src='${this.img}' alt='Some image'>
                        <div class='product-desc'>
                            <h3 class='product-title'>${this.product_name}</h3>
                            <p class='product-quantity'>Количество: ${this.quantity}</p>
                            <p class='product-single-price'>Стоимость одного товара: ${this.price} ₽</p>
                            <p class='product-price'>Общая стоимость: ${this.quantity * this.price} ₽</p>
                            <button class='del-btn btn' data-id='${this.id_product}'>Удалить из корзины</button>
                        </div>
                    </div>
                </div>`
    }
}
const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem
};


let cart = new Cart();
let products = new ProductsList(cart);


