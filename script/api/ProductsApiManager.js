class ProductsApiManager {
  static async getProducts() {
    return RequestManager.fetchData('/products');
  }
  static async getEditProd(path) {    
    const product = await RequestManager.fetchData(path);
    if (product) {
      sessionStorage.setItem('productEdit', JSON.stringify(product));
      window.location.href = '../products/add.html';
    } else {
      console.error('Failed to fetch product data.');
    }
  }
  static async addProduct(url, form) {
    return RequestManager.postFormRequest(url, form);
  }
  static async searchFormProducts(url) {
    return RequestManager.fetchData(url);
  }
  static async editProduct(id, data) {
    const url = RequestManager.getServerRoute(`/products/add/${id}`);
    return RequestManager.postFormRequest(url, data);
  }
  static async postSortForm(data) {
    return RequestManager.sortProdRequest('/products/sort', data);
  }
  static async deleteProduct(id) {
    return RequestManager.deleteRequest(`/products/${id}`, id);
  }
}