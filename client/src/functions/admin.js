import axios from 'axios'

export const getOrders = async (authtoken) =>
  axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  })

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  )
