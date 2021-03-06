import ApiService from '../../../services/Api'

const addHousehold = household => {
  return {
    type: 'ADD_HOUSEHOLD_SUCCESS',
    household,
  }
}

export const convertLead = (id, monthlyRate, history) => {
  return dispatch => {
    return ApiService.post(
      `/households/${id}/convert`,
      monthlyRate
    ).then(client => {
      dispatch(convertLeadComplete(client))
      history.push(`/households/clients/${client.id}`)
    })
  }
}

export const fetchHouseholdsComplete = households => {
  return {
    type: 'FETCH_HOUSEHOLDS_SUCCESS',
    households,
  }
}

const convertLeadComplete = client => {
  return {
    type: 'CONVERT_LEAD_COMPLETE',
    client,
  }
}

export const createHousehold = (household, history) => {
  const { client } = household
  return dispatch => {
    const newHousehold = { household }
    return ApiService.post(`/households`, newHousehold).then(data => {
      dispatch(addHousehold(data))
      client
        ? history.push(`/households/clients`)
        : history.push(`/households/leads`)
    })
  }
}

export const fetchHouseholds = () => {
  return dispatch => {
    return ApiService.get(`/households`).then(data => {
      dispatch(fetchHouseholdsComplete(data))
    })
  }
}
