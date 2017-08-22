export default (state = [], action) => {
  switch(action.type) {
    case 'FETCH_HOUSEHOLDS_SUCCESS': {
      return action.households
    }
    case 'ADD_HOUSEHOLD_SUCCESS': {
      return [...state, action.household]
    }
    case 'ADD_MEAL_TO_HOUSEHOLD': {
      const newState = state.map(h => {
        if (h.id === action.householdId) {
          const updatedHousehold = Object.assign({}, h, {meal_ids: h.meal_ids.concat(action.mealId)})
          return updatedHousehold
        } else {
          return h
        }
      })

      return newState
    }
    default: {
      return state
    }
  }
}