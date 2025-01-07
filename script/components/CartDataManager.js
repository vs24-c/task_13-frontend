
class CartDataManager {
  constructor(cart) {
    this.cart = cart.cart.resCart;
    this.cartId = cart.cart.resCart.cartId;
  }

  async createCart() {
    const containerCart = document.getElementById('cart-container');

    const totalPrice = this.cart.total
    const customerName = this.cart.customer.email;
    const userName = document.createElement('h4');
    userName.className = 'cart__title';
    userName.textContent = 'User Name:';

    const linkUser = document.createElement('a');
    linkUser.setAttribute('href', '#');
    linkUser.textContent = ` ${customerName}`;
    userName.appendChild(linkUser);
    containerCart.appendChild(userName);

    this.cart.products.forEach((product) => {      
      const brand = product.details?.brand || "Unknown";
      const model = product.details?.model || "No Name";
      const imageSrc = product.details?.imageSrc || "No image"
      const seller = product.seller?.name || "No image"
      const price = product.details?.price || 0;
      const prodId = product.details?.id || 0;
      const totalProductsPrice = product.totalProductsPrice ?? 0;
      const amount = product.details?.amound ?? 0;
      let amountUser = product.amount ?? 0;

      const cart = document.createElement('div');
      cart.className = 'cart';

      const containerImg = document.createElement('div');
      containerImg.className = 'cart__container-img';

      const item = document.createElement('ul');
      item.className = 'cart__list';

      const liBrand = document.createElement('li');
      liBrand.textContent = `Brand: ${brand}`;

      const liModel = document.createElement('li');
      liModel.textContent = `Model: ${model}`;

      const liSeller = document.createElement('li');
      liSeller.textContent = `Seller: ${seller}`;

      const liPrice = document.createElement('li');
      liPrice.textContent = `Price: ${price}$`;

      const liAmount = document.createElement('li');
      liAmount.className = 'cart__amount';
      liAmount.textContent = `Amount: ${amountUser}`;

      const btnPlus = document.createElement('button');
      btnPlus.textContent = '+';
      btnPlus.onclick = () => {
        if (amount === 0) {
          alert('Unfortunately, the product is out of stock');
          return;
        }
        liAmount.textContent = `Amount: ${++amountUser}`;
        CartApiManager.updateCurrentAmound(this.cartId, { productId: prodId, amount: amountUser })
        // window.location.reload()
      };

      const btnMinus = document.createElement('button');
      btnMinus.textContent = '-';
      btnMinus.disabled = amount === 0;
      btnMinus.onclick = () => {
        if (amountUser > 0) {
          liAmount.textContent = `Amount: ${--amountUser}`;
          CartApiManager.updateCurrentAmound(this.cartId, { productId: prodId, amount: amountUser })
          // window.location.reload()
        } else {
          alert('Cannot reduce amount below zero');
        }
      };

      const btnBox = document.createElement('div');
      btnBox.className = 'btn__box';
      btnBox.append(btnPlus, btnMinus);

      const liTotalProductsPrice = document.createElement('li');
      liTotalProductsPrice.setAttribute('id', 'totalProductsPrice');
      liTotalProductsPrice.textContent = `Total Price: ${totalProductsPrice}$`;

      const imageElement = document.createElement('img');
      imageElement.src = imageSrc ? `data:image;base64,${imageSrc}` : 'placeholder.jpg';
      imageElement.alt = 'Product image';
      imageElement.className = 'cart__image';
      containerImg.appendChild(imageElement);

      const btnDelete = document.createElement('button');
      btnDelete.textContent = 'Delete Product';
      btnDelete.type = 'button';
      btnDelete.className = 'cart__btn-delete';
      btnDelete.onclick = async () => {
      try {        
        const response = await CartApiManager.deleteProduct(this.cartId, prodId);
        if (response.success) {          
          cart.remove();
          alert('Product successfully deleted');
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('An error occurred while deleting the product');
      }
    };

      const boxDescription = document.createElement('div');
      boxDescription.className = 'cart__box-description';
      item.append(liBrand, liModel, liSeller, liPrice, liAmount, btnBox, liTotalProductsPrice);
      boxDescription.appendChild(containerImg);
      boxDescription.append(item);
      cart.append(boxDescription,btnDelete);
      containerCart.append(cart);
    });
    
    const totalPriceElement = document.createElement('div')
    totalPriceElement.className = 'cart__total-price'
    const p = document.createElement('p')
    p.textContent = 'Total Price:'
    const span = document.createElement('span')
    span.textContent = ` ${totalPrice}$`
    p.appendChild(span)
    totalPriceElement.appendChild(p)
    containerCart.appendChild(totalPriceElement)
  }
}
