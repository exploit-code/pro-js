/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/CartComponent.js":
/*!************************************!*\
  !*** ./public/js/CartComponent.js ***!
  \************************************/
/***/ (() => {

eval("Vue.component('cart', {\n  data() {\n    return {\n      showCart: false,\n      cartItems: []\n    };\n  },\n\n  methods: {\n    addProduct(product) {\n      let find = this.cartItems.find(el => el.id_product === product.id_product);\n\n      if (find) {\n        this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, {\n          quantity: 1\n        }).then(data => {\n          if (data.result) {\n            find.quantity++;\n          }\n        });\n      } else {\n        let prod = Object.assign({\n          quantity: 1\n        }, product);\n        this.$parent.postJson(`api/cart/${product.id_product}/${product.product_name}`, prod).then(data => {\n          if (data.result) {\n            this.cartItems.push(prod);\n          }\n        });\n      }\n    },\n\n    remove(product) {\n      if (product.quantity > 1) {\n        this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, {\n          quantity: -1\n        }).then(data => {\n          if (data.result) {\n            product.quantity--;\n          }\n        });\n      } else {\n        this.$parent.delJson(`/api/cart/${product.id_product}/${product.product_name}`, product).then(data => {\n          if (data.result) {\n            this.cartItems.splice(this.cartItems.indexOf(product), 1);\n          } else {\n            console.log('error');\n          }\n        });\n      }\n    }\n\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/cart`).then(data => {\n      for (let el of data.contents) {\n        this.cartItems.push(el);\n      }\n    });\n  },\n\n  template: `<div>\n<button class=\"btn-cart\" type=\"button\" @click='showCart = !showCart'>Корзина</button>\n<div class=\"cart-block\" v-show=\"showCart\">\n                <p v-if=\"!cartItems.length\">В корзине нет товаров</p>\n                <cart-item \n                v-for=\"item of cartItems\" \n                :key=\"item.id_product\"\n                :cart-item=\"item\"\n                :img=\"item.imgCart\"\n                @remove=\"remove\"></cart-item>\n            </div>\n</div>`\n});\nVue.component('cart-item', {\n  props: ['cartItem', 'img'],\n  template: `<div class=\"cart-item\">\n                <div class=\"product-bio\">\n                    <img :src=\"img\" alt=\"Some image\">\n                    <div class=\"product-desc\">\n                        <p class=\"product-title\">{{cartItem.product_name}}</p>\n                        <p class=\"product-quantity\">Количество: {{cartItem.quantity}}</p>\n                        <p class=\"product-single-price\">{{cartItem.price}} руб. за шт.</p>\n                    </div>\n                </div>\n                <div class=\"right-block\">\n                    <p class=\"product-price\">Всего: {{cartItem.quantity*cartItem.price}} руб.</p>\n                    <button class=\"del-btn\" @click=\"$emit('remove', cartItem)\">Удалить</button>\n                </div>\n            </div>`\n});\n\n//# sourceURL=webpack://lesson-8/./public/js/CartComponent.js?");

/***/ }),

/***/ "./public/js/ErrorComponent.js":
/*!*************************************!*\
  !*** ./public/js/ErrorComponent.js ***!
  \*************************************/
/***/ (() => {

eval("Vue.component('error', {\n  data() {\n    return {\n      text: ''\n    };\n  },\n\n  methods: {\n    setText(value) {\n      this.text = value;\n    }\n\n  },\n  template: `<div class=\"error-block\" v-if=\"text\">\n                    <p class=\"error-msg\">\n                    <button class=\"close-btn\" @click=\"setText('')\">&times;</button>\n                    {{text}}\n                    </p>\n                </div>`\n});\n\n//# sourceURL=webpack://lesson-8/./public/js/ErrorComponent.js?");

/***/ }),

/***/ "./public/js/ProductComponent.js":
/*!***************************************!*\
  !*** ./public/js/ProductComponent.js ***!
  \***************************************/
/***/ (() => {

eval("Vue.component('products', {\n  data() {\n    return {\n      catalogUrl: `/catalogData.json`,\n      products: [],\n      filtered: []\n    };\n  },\n\n  methods: {\n    filter(value) {\n      let regexp = new RegExp(value, 'i');\n      this.filtered = this.products.filter(el => regexp.test(el.product_name));\n    }\n\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/products`).then(data => {\n      for (let el of data) {\n        this.products.push(el);\n        this.filtered.push(el);\n      }\n    });\n  },\n\n  template: `<div class=\"products\">\n            <product \n            v-for=\"product of filtered\" \n            :key=\"product.id_product\"\n            :product=\"product\"\n            :img=\"product.imgProduct\"></product>\n        </div>`\n});\nVue.component('product', {\n  props: ['product', 'img'],\n  template: `<div class=\"product-item standart p-3\" >\n                <img :src=\"img\" :alt=\"product.product_name\">\n                <div class=\"desc\">\n                    <h3 class=\"price-name text-white pt-3\">{{ product.product_name }}</h3>\n                    <div class=\"price d-flex justify-content-center align-items-end\"><p>{{ product.price }} руб.</p></div>\n                    <button class=\"buy-btn ml-3\" @click=\"$root.$refs.cart.addProduct(product)\">Buy</button>\n                </div>\n            </div>`\n});\n\n//# sourceURL=webpack://lesson-8/./public/js/ProductComponent.js?");

/***/ }),

/***/ "./public/js/SearchComponent.js":
/*!**************************************!*\
  !*** ./public/js/SearchComponent.js ***!
  \**************************************/
/***/ (() => {

eval("Vue.component('search-form', {\n  data() {\n    return {\n      userSearch: ''\n    };\n  },\n\n  template: `<form action=\"#\" method=\"post\" class=\"search-form\" @submit.prevent=\"$parent.$refs.products.filter(userSearch)\">\n                <input type=\"text\" class=\"search-field\" v-model=\"userSearch\">\n                <button class=\"btn-search\" type=\"submit\">\n                    <i class=\"fas fa-search\"></i>\n                </button>\n            </form>`\n});\n\n//# sourceURL=webpack://lesson-8/./public/js/SearchComponent.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("const app = new Vue({\n  el: '#app',\n  methods: {\n    getJson(url) {\n      return fetch(url).then(result => result.json()).catch(error => this.$refs.error.setText(error));\n    },\n\n    postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => this.$refs.error.setText(error));\n    },\n\n    putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => this.$refs.error.setText(error));\n    },\n\n    delJson(url, data) {\n      return fetch(url, {\n        method: 'DELETE',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => this.$refs.error.setText(error));\n    }\n\n  }\n});\n\n//# sourceURL=webpack://lesson-8/./public/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	__webpack_modules__["./public/js/CartComponent.js"]();
/******/ 	__webpack_modules__["./public/js/ErrorComponent.js"]();
/******/ 	__webpack_modules__["./public/js/SearchComponent.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/ProductComponent.js"]();
/******/ 	
/******/ })()
;