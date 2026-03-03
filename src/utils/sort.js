export const sortArrayByName = (array) => {
  let tempArray = array.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  let resultArray = []
  tempArray.forEach((val, i) => {
    val.priority = (i + 1)
    resultArray.push(val)
  });

  return resultArray
};

export const sortArrayByPrice = (array) => {
  let tempArray = array.sort((a, b) => {
    let priceAindex = a.prices.findIndex(val => val.level === 'special')
    let priceBindex = b.prices.findIndex(val => val.level === 'special')

    let priceA = count(a.prices[priceAindex])
    let priceB = count(b.prices[priceBindex])
    return priceA - priceB;
  });

  let resultArray = []
  tempArray.forEach((val, i) => {
    val.priority = (i + 1)
    resultArray.push(val)
  });

  return resultArray
};

const count = (price) => {
  if (price.type === 'amount') {
    return price.price + price.margin
  } else {
    return price.price + ((price.price * price.margin) / 100)
  }
}
