export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_HOUSEHOLDS_SUCCESS": {
      return action.households
    }
    case "ADD_HOUSEHOLD_SUCCESS": {
      return [...state, action.household]
    }
    case "CREATE_NOTE_SUCCESS": {
      return state.map(
        h =>
          h.id === parseInt(action.note.household_id, 10)
            ? Object.assign({}, h, { notes: h.notes.concat(action.note) })
            : h
      )
    }
    case "ADD_MEAL_TO_HOUSEHOLD": {
      const newState = state.map(h => {
        if (h.id === action.householdId) {
          const updatedHousehold = Object.assign({}, h, {
            meal_ids: h.meal_ids.concat(action.mealId)
          })
          return updatedHousehold
        } else {
          return h
        }
      })

      return newState
    }
    case "CONVERT_LEAD_COMPLETE": {
      const newState = state.map(
        h => (h.id === action.client.id ? action.client : h)
      )
      return newState
    }
    case "CREATE_ENGAGEMENT_SUCCESS": {
      return state.map(h => {
        if (h.id === +action.engagement.household_id) {
          if (!h.engagement || h.engagement.date > action.engagement.date) {
            return Object.assign({}, h, {
              engagement: Object.assign({}, action.engagement, { meal_ids: [] })
            })
          }
          return h
        } else {
          return h
        }
      })
    }
    case "ADD_MEAL_TO_ENGAGEMENT": {
      return state.map(h => {
        if (h.id === +action.householdId) {
          return Object.assign({}, h, {
            engagement: Object.assign({}, h.engagement, {
              meal_ids: h.engagement.meal_ids.concat(action.mealId)
            })
          })
        } else {
          return h
        }
      })
    }
    default: {
      return state
    }
  }
}
