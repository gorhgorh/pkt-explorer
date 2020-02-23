import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  FirstListCell,
  // ListCell,
  ListRow,
  ListLabel,
  ListLabelCont,
  ListCont
} from '../CommonComps/CommonComps'
import { displayPKT } from '../../utils'
import RespHash from '../RespHash/RespHash'

const cells = {
  address: 'address',
  balance: 'balance'
}

const AddrLink = styled(Link)`
  color: ${({ theme }) => theme.colors.pktBlueLight};
`

export const RichListLabels = ({ cells }) => <ListLabelCont>{
  Object.keys(cells).map((header) => <ListLabel key={header}>{header}</ListLabel>)
}</ListLabelCont>

export const RichListRowCont = ({ row, hashW }) => {
  return <ListRow>
    <FirstListCell>
      <AddrLink to={`/address/${row.address}`}><RespHash hash={row.address} title={row.address} size={hashW}/></AddrLink>
    </FirstListCell>
    <div>
      {Math.floor(displayPKT(row.balance))}
    </div>
  </ListRow>
}

const RichList = ({ listData, hashW }) => {
  return (
    listData
      ? <ListCont>
        <RichListLabels cells={cells} />
        {/* Mapping over rich list addresses */}
        {listData.map((row) => <RichListRowCont row={row} key={row.address} hashW={ hashW || 400}/>)}
      </ListCont>
      : <div>loading</div>
  )
}

RichList.propTypes = {
  listData: PropTypes.array,
  hashW: PropTypes.number
}

RichListRowCont.propTypes = {
  row: PropTypes.shape({
    address: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }).isRequired,
  hashW: PropTypes.number
}

RichListLabels.propTypes = {
  cells: PropTypes.PropTypes.shape({
    address: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }).isRequired
}

RichList.defaultProps = {}

export default RichList
