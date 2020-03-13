import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ListLabelCont, ListCont, Pkt, LeftCont, RightCont } from '../CommonComps/CommonComps'
import metrics, { mqs } from '../../theme/metrics'
import { IoIosCopy } from 'react-icons/io'
// import TxChart from '../TxChart/TxChart'
// import RespHash from '../RespHash/RespHash'
import EaringChart from '../EarningChart/EarningChart'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { commafy } from '../../utils'

import { motion } from 'framer-motion'
import { Row, Column, ItemCont, Label, BrdCont, Content } from '../BlockStats/BlockStats'
const ListDataCont = styled.div`
  padding: ${metrics.padding}rem;
  display: flex;
  @media ${mqs.small} {
    flex-direction: column;
  }
  /* @media all and (max-width: 500px) {
    flex-direction: column;
  } */
`
const MetaCont = styled.div`
  flex:1;
  border-right: 1px solid ${({ theme }) => theme.colors.pktGreyLight};
  padding-right: ${metrics.padding}rem;
  margin-right: ${metrics.padding}rem;
  display: flex;
  flex-flow: column nowrap;
  /* min-width: 50%; */
  @media ${mqs.small} {
    border-right-width: 0;
    margin-right: 0;
    padding-right: 0;
  }

`

const ChartCont = styled.div`
  /* flex: 1; */
  @media ${mqs.small} {
    text-align: center;
    width: 100%;
    min-height: 200px;
    display: flex;
    justify-content: center;
  }
`

// const StatRow = styled.div`
//   display: flex;
//   flex:1;
//   align-items: center;
// `
// const StatCell = styled.div`
//   display: flex;
//   padding: 1rem;
//   flex:1;
// `

// const StatCellLabel = styled.div`
//   font-weight: 700;
//   padding-right: 1rem;
// `
// const StatCellValue = styled.div`
//   font-style: italic;
// `

const CopyBt = styled(motion.button)`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-left: 10px;
  background-color: ${({ theme }) => theme.colors.pktGrey};
  display: inline-block;
  position: relative;
  top: -3px;
  border-width: 0;
  svg{
    width: 15px;
    height: 15px;
    position: absolute;
    top: 2px;
    left: 2px;
    /* bottom: 1px; */
  }
`

const HashCont = styled.div`
  white-space: nowrap;
  min-width:0;
  display: flex; 
`
const Hash = styled.div`
overflow: hidden;
text-overflow: ellipsis;
margin-right: 10px;
`

const AddrLabel = styled.div`
  margin-right: 10px;
  font-size: 1.8em;
  margin-bottom: -2px; /* TODO(cjd): This is a mess */
`

const BalanceLabel = styled.div`
  margin-right: 10px;
  font-size: 1.3em;
`

const AddrStats = ({ meta, addr, dailyTr }) => {
  return (
    <ListCont>
      <ListLabelCont>
        <LeftCont>
          <AddrLabel>
            Address
          </AddrLabel>
          <BalanceLabel>
            <Pkt amt={meta.balance}/>
          </BalanceLabel>
        </LeftCont>
        <RightCont>
          <HashCont>
              <Hash>{addr}</Hash>
              <CopyToClipboard text={addr}
                onCopy={() => console.log('copy !!!', addr)}>
                {/* <GenBt icn='copy' /> */}
                <CopyBt
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                ><IoIosCopy /></CopyBt>
              </CopyToClipboard>
            </HashCont>
        </RightCont>
      </ListLabelCont>
      <ListDataCont>
        <MetaCont>
          <Row>
            <Column full>
              <ItemCont>
                  <p><Label>Confirmed Balance</Label> <Content><Pkt amt={meta.balance}/></Content></p>
              </ItemCont>
            </Column>
          </Row>
          {meta.unconfirmedReceived && parseFloat(meta.unconfirmedReceived) > 0 &&
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>Unconfirmed</Label> <Content><Pkt amt={meta.unconfirmedReceived}/></Content></p>
                </BrdCont>
              </ItemCont>
            </Column>
          </Row>
          }
          {meta.burned && parseFloat(meta.burned) > 0 &&
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>Burned</Label> <Content><Pkt amt={meta.burned}/></Content></p>
                </BrdCont>
              </ItemCont>
            </Column>
          </Row>
          }
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>Transactions</Label> <Content>{commafy(meta.recvCount + meta.spentCount)}</Content></p>
                </BrdCont>
              </ItemCont>
            </Column>
          </Row>
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>Mining payouts</Label> <Content>{commafy(meta.mineCount)}</Content></p>
                </BrdCont>
              </ItemCont>
            </Column>
          </Row>
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>Mined in the last 24h</Label> <Content><Pkt amt={meta.mined24}/></Content></p>
                </BrdCont>
              </ItemCont>
            </Column>
          </Row>
        </MetaCont>
        <ChartCont>
          {dailyTr ? <EaringChart txData={dailyTr} /> : 'Loading'}
        </ChartCont>
      </ListDataCont>
    </ListCont>
  )
}

AddrStats.propTypes = {
  meta: PropTypes.object.isRequired,
  addr: PropTypes.string.isRequired,
  dailyTr: PropTypes.array.isRequired
  // lastBlock: PropTypes.number.isRequired
}

// HomeStats.defaultProps = {

// }

export default AddrStats
