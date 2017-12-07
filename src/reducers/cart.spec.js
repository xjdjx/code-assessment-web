import cart from './cart'

describe('reducers', () => {
  describe('cart', () => {
    const initialState = {
      addedIds: [],
      quantityById: {},
      cartVisible: false
    }

    it('should provide the initial state', () => {
      expect(cart(undefined, {})).toEqual(initialState)
    })

    it('should handle CHECKOUT_REQUEST action', () => {
      expect(cart({}, { type: 'CHECKOUT_REQUEST' })).toEqual(initialState)
    })

    it('should handle CHECKOUT_FAILURE action', () => {
      expect(cart({}, { type: 'CHECKOUT_FAILURE', cart: 'cart state' })).toEqual('cart state')
    })

    it('should handle ADD_TO_CART action', () => {
      expect(cart(initialState, { type: 'ADD_TO_CART', productId: 1 })).toEqual({
        addedIds: [ 1 ],
        quantityById: { 1: 1 },
        cartVisible: false
      })
    })


    it('should handle REMOVE_FROM_CART action', () => {
      const populatedState = {
        addedIds: [1],
        quantityById: {1:1},
        cartVisible: false
      }

      expect(cart(populatedState, { type: 'REMOVE_FROM_CART', productId: 1 })).toEqual({
        addedIds: [],
        quantityById: {},
        cartVisible: false
      })
    })

    describe('when product is already in cart', () => {
      it('should handle ADD_TO_CART action', () => {
        const state = {
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 1 },
          cartVisible: false
        }

        expect(cart(state, { type: 'ADD_TO_CART', productId: 2 })).toEqual({
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 2 },
          cartVisible: false
        })
      })

      it('should handle REMOVE_FROM_CART action', () => {
        const state = {
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 1 },
          cartVisible: false
        }

        expect(cart(state, { type: 'REMOVE_FROM_CART', productId: 1 })).toEqual({
          addedIds: [ 2 ],
          quantityById: { 2: 1 },
          cartVisible: false
        })
      })

    })
  })
})
