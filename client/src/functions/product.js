import axios from 'axios'

export const createCategory = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  })
}
