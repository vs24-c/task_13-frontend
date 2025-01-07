class HeaderManager {
  constructor(currentPath, menuItems) {
    this.currentPath = currentPath
    this.menuItems = menuItems
    this.init()
  }

  // Метод для декодування даних з токена
  decodeToken(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload)
  }

  // Метод для визначення базового шляху
  getBasePath() {
    const depth = (this.currentPath.match(/\//g) || []).length
    return depth ? '../'.repeat(depth) : ''
  }

  createMenuItem(item, basePath) {
    const li = document.createElement('li')
    if (item.id) {
      li.id = item.id
    }

    const a = document.createElement('a')
    a.href = basePath + item.href
    a.textContent = item.text

    if (item.href === this.currentPath) {
      a.className = 'active'
    }

    li.appendChild(a)
    return li
  }
  // Метод для формування заголовка
  async createHeader() {
    const basePath = this.getBasePath()
    const header = document.createElement('header')
    header.className = 'header';
    const logo = document.createElement('a')
    logo.href = basePath + 'index.html'
    logo.className = 'header__logo'
    logo.textContent = 'Node.js HW'

    const nav = document.createElement('nav')
    nav.className = 'header__menu'
    const ul = document.createElement('ul')

    this.menuItems.forEach((item) => {
      //Додаємо пукнт навігації, якщо він не потребує автентифікації
      //або користувач є автентифікованим
      if (!item.meta.requireAuth || RequestManager.isAuthenticated()) {
        const li = this.createMenuItem(item, basePath)
        ul.appendChild(li)
      }
    })
    //-------add cart-----    
    const cart = document.createElement('a')
    cart.href = basePath + 'cart/cart.html'
    cart.className = 'header__cart cart'

    let productsCount = 0
    if (RequestManager.isAuthenticated()) {    
      const resCart = await CartApiManager.getCart()      
      if (resCart) {
        const { cart: { resCart: { products } } } = resCart;
        productsCount = products.length > 0 ? products.length : '0';
      }
      
      const counterCart = document.createElement('span')
      counterCart.textContent = productsCount !== 0 ? `${productsCount}` : '0';
      counterCart.className = 'cart__counter'
      const imgCart = document.createElement('img')
      imgCart.src = basePath + 'image/cart.svg'
      cart.append(imgCart, counterCart)
    }
    nav.appendChild(ul)
    nav.appendChild(cart)
    header.appendChild(logo)
    header.appendChild(nav)
    document.body.insertBefore(header, document.body.firstChild)

    // Додаємо додаткову логіку для перевірки аутентифікації
    const token = localStorage.getItem('jwt_token')
    // const userLink = document.getElementById('users-link')
    const authLink = document.getElementById('auth-link')

    if (token) {
      const user = this.decodeToken(token)

      if (user) {
        // userLink.style.display = 'block'
        authLink.innerHTML = `<a href="#" id="logout-link">Logout (${user.email})</a>`
      }
    }

    document
      .getElementById('auth-link')
      .addEventListener('click', async (event) => {
        if (event.target.id === 'logout-link') {
          event.preventDefault()
          await RequestManager.onLogout()
          localStorage.removeItem('jwt_token')
          const basePath = this.getBasePath();
          window.location.replace(basePath + 'index.html')
        }
      })
  }

  // Ініціалізація формування заголовка
  init() {
    this.createHeader()
  }
}
