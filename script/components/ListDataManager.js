class ListDataManager {
  //------------------Creation of card product
  static createProductCard(item, fields, createLinkFunction, deleteFunction) {
    let cardDiv;
    let btnBox;    
    for (const key in fields) {
      cardDiv = document.createElement('div');
      cardDiv.className = 'products__card';
      const imgDiv = document.createElement('div');
      imgDiv.className = 'products__img';
      const img = document.createElement('img');
      img.src = `data:image;base64,${item.imageSrc}`;
      imgDiv.append(img);
      const ul = document.createElement('ul');

      const phoneLi = document.createElement('li');
      phoneLi.innerHTML = `Phone:<span>${item.fullName}</span>`;

      const priceLi = document.createElement('li');
      priceLi.innerHTML = `Price:<span>${item.price} $</span>`;

      const amoundLi = document.createElement('li');
      amoundLi.innerHTML = `Amound:<span>${item.amound}</span>`;

      const seller = document.createElement('li');
      seller.innerHTML = `Seller:<span>${item.sellers}</span>`;

      ul.append(phoneLi, priceLi, amoundLi, seller);

      cardDiv.append(imgDiv, ul);
    }

    if (createLinkFunction && deleteFunction) {
      btnBox = document.createElement('div');
      btnBox.className = 'btn__box';

      const editLink = document.createElement('button');
      editLink.type = 'button';
      editLink.className = 'btn edit';
      editLink.setAttribute('data-id', createLinkFunction(item._id));
      editLink.textContent = 'Edit';

      const cartBtn = document.createElement('button')
      cartBtn.type = 'button'
      cartBtn.className = 'btn cart'
      cartBtn.setAttribute('data-id', item._id)
      cartBtn.textContent = 'Add to cart'

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn delete';
      deleteButton.type = 'button';
      deleteButton.setAttribute('data-id', item._id);
      deleteButton.textContent = 'Delete';

      btnBox.append(editLink, deleteButton);
      cardDiv.appendChild(btnBox);
      cardDiv.appendChild(cartBtn);
    }

    return cardDiv;
  }

  //------------------------Creation list products--------
  static createProducts(data, fields, createLinkFunction, deleteFunction) {
    const productsDiv = document.createElement('div');
    productsDiv.className = 'products';

    data.forEach((item) => {
      const productCard = this.createProductCard(item, fields, createLinkFunction, deleteFunction);
      productsDiv.appendChild(productCard);
    });

    return productsDiv;
  }
  //------------------------Creation sort form--------------
  static creatFormSearch() {
    if (document.getElementById('sidebar')) {
      const sidebar = document.getElementById('sidebar')
      //---Form search--
      const formSearch = document.createElement('form')
      // formSearch.setAttribute('action', '/products/search')
      // formSearch.setAttribute('method', 'post')
      formSearch.setAttribute('id','search-form')
      formSearch.className = 'form__search'
      //---input search name--
      const inputSearch = document.createElement('input')
      inputSearch.type = 'text'
      inputSearch.name ='search'
      inputSearch.placeholder = 'Search...'
      formSearch.append(inputSearch)
      //---button search--
      const btnSearch = document.createElement('button')
      btnSearch.type ='submit'
      btnSearch.className = 'btn btn-search'
      btnSearch.textContent = 'Search'
      //---Append form to sidebar--
      formSearch.append(btnSearch)
      //---Append form to sidebar--
      if (sidebar)
      sidebar.append(formSearch)
    }
  }
  static creatOthersSearchForm(data) {
    if (document.getElementById('sidebar')) {
      const sidebar = document.getElementById('sidebar')
      //---Form all search--
      const formAllSearch = document.createElement('form')
      formAllSearch.setAttribute('id','all-form-search')
      formAllSearch.className = 'form form__all-search'
      //--- search brand--
      const brandBox = document.createElement('div')
      brandBox.className = 'form-all-search brend-box'

      const textBrand = document.createElement('p')
      textBrand.textContent = 'Search by brand:'
      brandBox.append(textBrand)

      const uniqueBrand = [... new Set(data.map((el) => el.brand))]
      uniqueBrand.forEach((inp) => {
        const labelBr = document.createElement('label')
        const checkBoxUni = document.createElement('input')
        checkBoxUni.type = 'checkbox'
        checkBoxUni.name = 'brand'
        checkBoxUni.value = inp
        labelBr.textContent = inp
        labelBr.append(checkBoxUni)
        brandBox.append(labelBr)
      })
      //---- search sellers---
      const sellersBox = document.createElement('div')
      sellersBox.className = 'form-all-search sellers-box'

      const textSeller = document.createElement('p')
      textSeller.textContent = 'Search by seller:'
      sellersBox.append(textSeller)
      
      const uniqueSeller = [... new Set(data.map((el) =>
        el.sellers.seller))]       
      uniqueSeller.forEach((inp) => {
        const labelSeller = document.createElement('label')
        const checkboxSeller = document.createElement('input')
        checkboxSeller.type = 'checkbox'
        checkboxSeller.name = 'seller'
        checkboxSeller.value = inp
        labelSeller.textContent = inp
        labelSeller.append(checkboxSeller)
        sellersBox.append(labelSeller)
      })
      //--- search price--
      const priceRange = document.createElement('div')
      priceRange.className = 'form-all-search price-box'
      const labelPrice = document.createElement('label')
      labelPrice.textContent = 'Search by price:'
      const priceInputMin = document.createElement('input')
      priceInputMin.type = 'number'
      priceInputMin.name ='min_price'
      priceInputMin.placeholder = 'Min price'
      const priceInputMax = document.createElement('input')
      priceInputMax.type = 'number'
      priceInputMax.name ='max_price'
      priceInputMax.placeholder = 'Max price'
      priceRange.append(labelPrice, priceInputMin, priceInputMax)
      formAllSearch.append(brandBox, sellersBox, priceRange)
      //--- button search--
      const btnAllSearch = document.createElement('button')
      btnAllSearch.type ='submit'
      btnAllSearch.className = 'btn btn__all-search'
      btnAllSearch.textContent = 'Search'
      //--- Append form to sidebar--
      formAllSearch.append(btnAllSearch)
      //---Append form to sidebar--
      if (sidebar)
        sidebar.append(formAllSearch)
    }
  }

  //------------------------Creation sort select--------
  static creatSortSelect() {
// Creat form     
  const formSel = document.createElement('form')       
  formSel.action = '/products/sort'
  formSel.method = 'post'
  formSel.className = 'form'
    // Creat select
  const select = document.createElement('select')
  select.name = 'sort'
    select.className = 'products__sort'
    //Creat options in the select
    const optionNone = document.createElement('option')
    optionNone.textContent = 'Sort'
  const optionAsc = document.createElement('option')
    optionAsc.value = 'asc'
    optionAsc.textContent = 'Ascending Price'
    const optionDesc = document.createElement('option')
    optionDesc.textContent = 'Descending Price'
    optionDesc.value = 'desc'
    const optionAscData = document.createElement('option')
    optionAscData.textContent = 'Data added Newer'
    optionAscData.value = 'data-asc'
    const optionDeskData = document.createElement('option')
    optionDeskData.textContent = 'Data added Later'
    optionDeskData.value = 'data-desc'
    // Append options to select
    select.appendChild(optionNone)
    select.appendChild(optionAsc)
    select.appendChild(optionDesc)
    select.appendChild(optionAscData)
    select.appendChild(optionDeskData)
    // Append select to form
    formSel.append(select)
    const boxTitle = document.querySelector('.products__title');
    boxTitle.appendChild(formSel)
  }
  // ----------------Generation of all products----------
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const products = this.createProducts();

    wrapper.append(products);
    document.body.appendChild(wrapper);
  }
}
