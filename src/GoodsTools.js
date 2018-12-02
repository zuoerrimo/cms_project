let obj = {}
// 获取商品数据
obj.getGoodsList = function() {
  return JSON.parse(window.localStorage.getItem('goodsList') || '{}')
}
// 保存数据
obj.saveGoodsList = function(goodsList) {
  window.localStorage.setItem('goodsList', JSON.stringify(goodsList))
}
// 新增商品
obj.add = function(goods) {
  // 判断当前goodslist是否包含改商品，有则追加，无则赋值
  let goodsList = this.getGoodsList()
  if (goodsList[goods.id]) {
    goodsList[goods.id] += goods.num
  } else {
    goodsList[goods.id] = goods.num
  }
  this.saveGoodsList(goodsList)
}

// 获取购物车数量总数
obj.getTotalCount = function() {
  let goodsList = this.getGoodsList()
  let values = Object.values(goodsList)
  let sum = 0;
  values.forEach(val => sum += val);
  return sum
}

export default obj