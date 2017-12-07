import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  OPEN_CART,
  CLOSE_CART
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {},
  cartVisible: false
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    default:
      return state
  }
}

const quantityById = (state = initialState, action) => {
  const { productId } = action
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state.quantityById,
        [productId]: (state.quantityById[productId] || 0) + 1
      }
    case REMOVE_FROM_CART:
      const updatedQuantity = state.quantityById[productId] - 1

      if (updatedQuantity < 1){
        delete state.quantityById[productId]
        state.addedIds.splice(state.addedIds.indexOf(action.productId),1)
        return state.quantityById
      } else {
        return { ...state.quantityById,
          [productId]: updatedQuantity
        }
      }
    default:
      return state.quantityById
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cartVisible = (state = initialState.cartVisible, action) => {
  switch (action.type) {
    case OPEN_CART:
      state = true
      return state
    case CLOSE_CART:
      state = false
      return state
    default:
      return state
  }
}

export const getCartVisible = state => state.cartVisible

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state, action),
        cartVisible: cartVisible(state.cartVisible, action)
      }
  }
}

export default cart
