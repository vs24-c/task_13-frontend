class ScrollPaginationManager {
  constructor() {
    this.loadPage = null
    this.currentPage = 0
    this.totalPage = 0
    this.loading = false
  }
    
  async init(loadPageFunction) {
    this.loadPage = loadPageFunction
  }

  async initData(currentPage, totalPage) {
    this.currentPage = currentPage
    this.totalPage = totalPage
  }
  async loadingPageList() {
    if (this.loading || this.currentPage >= this.totalPage ) return
    this.loading = true;

    try {    
      await this.loadPage(this.currentPage)
      console.log(this.currentPage);
      this.currentPage++
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      this.loading = false;
    }
  }

  async handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement  
    if (scrollTop + clientHeight >= scrollHeight - 100) {   
      await this.loadingPageList()
    }
  }
}