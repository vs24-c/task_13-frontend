const menuItems = [
  {href: 'index.html', text: 'Main', meta: {requireAuth: false}},
  {
    href: 'products/list.html',
    text: 'Products',
    meta: {requireAuth: false},
  },
  // {
  //   href: 'products/list-scroll.html',
  //   text: 'Products-scroll',
  //   meta: {requireAuth: false},
  // },
  {
    href: 'sellers/addSeller.html',
    text: 'Add Seller',
    meta: {requireAuth: true},
  },
  {
    href: 'products/add.html',
    text: 'Add Products',
    meta: {requireAuth: true},
  },
  {
    href: 'auth/login.html',
    text: 'Enter',
    id: 'auth-link',
    meta: {requireAuth: false},
  },
];
