const TIMEOUT = 100

const remapJson = json => {
	json.forEach(obj => {
		obj['title'] = obj['productTitle']
		delete obj['productTitle']
		obj['price'] = obj['price']['value']
	})

	return json
}

export default {
	getProducts: (cb) => {
  	return fetch(`http://tech.work.co/shopping-cart/products.json`)
      .then(response => response.json())
      .then(json => cb(remapJson(json)))
  },
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
