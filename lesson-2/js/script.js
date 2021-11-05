'use strict'

class ProductList {
  constructor(productsBox = '.products', sumBox = '.sum-products') {
    this.productsBox = productsBox;
    this.sumBox = sumBox;
    this.goods = [];
    this._fetchProducts();
    this.render();
    this.renderTotalCost();
  }

  _fetchProducts() {
    this.goods = [
      { id: 1, title: 'Notebook', price: 2000 },
      { id: 2, title: 'Mouse', price: 20 },
      { id: 3, title: 'Keyboard', price: 200 },
      { id: 4, title: 'Gamepad', price: 50 },
    ];
  }

  render() {
    const productsBox = document.querySelector(this.productsBox);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      productsBox.insertAdjacentHTML("beforeend", item.render());
    }
  }

  getTotalCost() {
    const totalCost = this.goods.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    return totalCost;
  }

  renderTotalCost() {
    const sumBox = document.querySelector(this.sumBox);
    sumBox.insertAdjacentHTML("beforeend", `The sum of all goods: ${this.getTotalCost()}`);
  }
}

class ProductItem {
  constructor(item, img = './img/exploit.jpeg') {
    this.id = item.id;
    this.img = img;
    this.title = item.title;
    this.price = item.price;
  }
  render() {
    return `<div class='product-item' id='${this.id}'>
              <div class='product-item__img-box'>
                <img class='product-item__img' src='${this.img}'>
              </div>
              <div class='product-item__desc'>
                <h3 class='product-item__title'>${this.title}</h3>
                <p class='product-item__price'>Price: ${this.price}</p>
                <button class="product-item__btn btn">Buy</button>
              </div>
            </div>`;
  }
}

class BasketList {

}

class BasketItem {

}

let list = new ProductList();