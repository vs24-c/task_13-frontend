class SellerManager {
  static async create(data) {    
    try {
      const inpPrice = document.getElementById('price-label');
      const label = document.createElement('label');
      label.textContent = 'Check Sellers';

      const select = document.createElement('select');
      select.name = 'sellers';
      select.className = 'sellers-dropdown';
      data.sellers.forEach((el) => {
        const option = document.createElement('option');
        option.value = el._id; 
        option.textContent = el.seller; 
        select.append(option); 
      });

      label.append(select);

      inpPrice.parentNode.insertBefore(label, inpPrice.nextSibling);
    } catch (error) {
      console.error('Error in creating select:', error);
    }
  }
}
