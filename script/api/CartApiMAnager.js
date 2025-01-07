

class CartApiManager {

  static async creatCart(data) {
    return RequestManager.postRequest('/cart', data)
  }

  static async getCart(id) {
    return RequestManager.fetchData('/cart/getlist')
  }

  static async updateCurrentAmound(id, data) {    
    return RequestManager.postRequest(`/cart/${id}`, data)
  }

  static async deleteProduct(id,data) {
    return RequestManager.deleteRequest(`/cart/${id}`, data)
  }
}