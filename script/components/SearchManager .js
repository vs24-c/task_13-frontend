
class SearchManager  {
  constructor(data) {
    this.data = data
    this.fuse = null
    this.initFuse()
  }

  initFuse() {
    const options = {
      keys: ['fullName', 'brand', 'model', 'sellers.seller', 'amound'],
      threshold: 0.4,
    }
    this.fuse = new Fuse(this.data, options)
  }

  updateData(newData) {
    this.data = newData
    this.initFuse()
  }

  searchByKeyword(keyword) {
    if (!this.fuse) {
      console.error("Fuse.js was not initialized")
      return []
    }
    return this.fuse.search(keyword).map((result) => result.item)
  }
}