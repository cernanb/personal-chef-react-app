import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import numeral from 'numeral'

const StyledLead = styled.div`
  width: 31%;
  text-align: center;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
`


const ClientCard = (props) => {
  return (
    <StyledLead>
      <Link to={`/households/clients/${props.id}`}>{props.name}</Link>
      <h3>{props.address}</h3>
      <h3>{numeral(props.monthly_rate).format('$0,0.00')}</h3>
    </StyledLead>
  )
}

export default ClientCard