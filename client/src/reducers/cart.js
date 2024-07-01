export const cartInitialState = []

export function CartReducer (state, action) {
  const { type: ActionType, payload: ActionPayload } = action

  switch (ActionType) {
    case 'ADD_TO_CART': {
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
      const { id } = ActionPayload
      return state.filter(item => item.id !== id)
    }

    case 'CLEAR_CART': {
      return cartInitialState
    }
  }

  return state
}
