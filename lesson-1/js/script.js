const products = [
  { id: 1, title: 'Notebook', price: 1000 },
  { id: 2, title: 'Mouse', price: 100 },
  { id: 3, title: 'Keyboard', price: 250 },
  { id: 4, title: 'Gamepad', price: 150 },
];

const renderList = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
// По умолчанию разделитель в массиве запятая, метод join позволяет изменить его


const renderProduct = (item, img = './img/exploit.jpeg') => {
  return `<div class="product-item">
            <div class='product-item__img-box'>
              <img class='product-item__img' src='${img}'>
            </div>
            <div class='product-item__desc'>
              <h3 class='product-item__title'>${item.title}</h3>
              <p class='product-item__price'>${item.price}</p>
              <button class="product-item__btn btn">Добавить</button>
            </div>
          </div>`;
};

renderList(products);
