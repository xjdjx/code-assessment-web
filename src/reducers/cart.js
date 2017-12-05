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
    case REMOVE_FROM_CART:
      state.splice(state.indexOf(action.productId),1)
      return state
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  const { productId } = action
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    case REMOVE_FROM_CART:
      delete state[productId]
      return state
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

export const cartViz = (state = initialState.cartVisible, action) => {
  console.log("state: ",state);
  switch (action.type) {
    case OPEN_CART:
      state = true
      return true
    case CLOSE_CART:
      state = false
      return false
    default:
      return state
  }
}

export const getCartViz = state => state.cartViz

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
        cartViz: cartViz(state.cartVisible, action)
      }
  }
}

export default cart
