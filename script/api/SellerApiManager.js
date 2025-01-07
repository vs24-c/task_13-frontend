class SellerApiManager {
  static async addSeller(url, data) { 
    return RequestManager.postRequest(url, data);
  }

  static async getSellers() {
    const sellersAll = await RequestManager.fetchData('/sellers')    
    return sellersAll;
  }
}