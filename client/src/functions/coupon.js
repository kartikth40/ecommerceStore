import axios from 'axios'

export const getCoupons = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/coupons`)
}

export const removeCoupon = async (couponId, authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authToken,
    },
  })
}

export const createCoupon = async (coupon, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authToken,
      },
    }
  )
}
