export const cartInitialState = []

export function CartReducer (state, action) {
  const { type: ActionType, payload: ActionPayload } = action

  switch (ActionType) {
    case 'ADD_TO_CART': {
      console.log('ADD_TO_CART', ActionPayload)
      const { id } = ActionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        return newState
      }

      return [...state, { ...ActionPayload, quantity: 1 }]
    }

    case 'REMOVE_FROM_CART': {
      console.log('REMOVE_FROM_CART', ActionPayload)
      const { id } = ActionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)
      console.log(ActionPayload)
      console.log('productInCartIndex', productInCartIndex)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        if (state[productInCartIndex].quantity > 1) {
          newState[productInCartIndex].quantity -= 1
          return newState
        }
        else {
          newState.splice(productInCartIndex, 1)
          return newState
        }
      }

      return [...state]
    }

    case 'CLEAR_CART': {
      return cartInitialState
    }
  }

  return state
}
