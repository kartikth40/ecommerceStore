let initialState = []

// load cart items from local storage
if (window) {
  if (localStorage.getItem('cart')) {
    initialState = JSON.parse(localStorage.getItem('cart'))
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.payload
    default:
      return state
  }
}
