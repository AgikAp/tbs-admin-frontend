import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, { useEffect } from 'react'
import useWebSocket from "react-use-websocket";

export default function Transaction({ value, index, transactions, setTransactions, liveSync }) {
  if (liveSync) {
    const { lastJsonMessage } = useWebSocket(
      import.meta.env.VITE_APP_WEB_SOCKET_BASE_URL.concat('/ws?groupid=', value.transaction_code),
      {
        share: false,
        shouldReconnect: () => true
      }
    )

    useEffect(() => {
      const tempTransaction = [...transactions]
      tempTransaction[index].order_status = lastJsonMessage?.status ?? tempTransaction[index].order_status
      tempTransaction[index].payment_status = lastJsonMessage?.payment ?? tempTransaction[index].payment_status

      setTransactions(tempTransaction)

    }, [lastJsonMessage])
  }

  return (
    <tr className={`${value.need_refund ? 'bg-orange-700' : ''}`}>
      <th>{index + 1}</th>
      <td>{value.transaction_code}</td>
      <td>{value.item}</td>
      <td>{moment(value.time).format('DD-MMMM-yyyy hh:mm:ss')}</td>
      <td>{value.order_status}</td>
      <td>{value.payment_status}</td>
      <td><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></td>
    </tr>
  )
}
