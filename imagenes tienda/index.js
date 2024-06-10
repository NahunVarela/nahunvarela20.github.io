const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total.toFixed(2)}`;
	countProducts.innerText = totalOfProducts;
};

function updateCart() {
        cartItemsElement.innerHTML = '';
        totalPrice = 0;
    
        cart.forEach(item => {
            const cartItemContainer = document.createElement('div');
            cartItemContainer.classList.add('cart-item-container');
    
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
    
            const productImage = document.createElement('img');
            productImage.src = item.image;
            productImage.classList.add('product-image');
            productImage.alt = item.name;
    
            const itemDetails = document.createElement('div');
    
            const itemName = document.createElement('h4');
            itemName.textContent = ${item.name} x${item.quantity};
    
            const itemPrice = document.createElement('p');
            itemPrice.textContent = Precio: L${(item.price * item.quantity).toFixed(2)};
    
            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.classList.add('increase-button');
            increaseButton.addEventListener('click', () => {
                item.quantity++;
                updateCart();
            });

            const decreaseButton = document.createElement('button');
            decreaseButton.textContent = '-';
            decreaseButton.classList.add('decrease-button');
            decreaseButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    // Si la cantidad es 0, eliminar el elemento del carrito
                    const index = cart.indexOf(item);
                    cart.splice(index, 1);
                }
                updateCart();
            });
    
            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemPrice);
            itemDetails.appendChild(increaseButton);
            itemDetails.appendChild(decreaseButton);
    
            cartItem.appendChild(productImage);
            cartItem.appendChild(itemDetails);
            cartItemContainer.appendChild(cartItem);
    
            cartItemsElement.appendChild(cartItemContainer);
    
            totalPrice += item.price * item.quantity;
        });
    
        totalPriceElement.textContent = Total: L${totalPrice.toFixed(2)};
    }
