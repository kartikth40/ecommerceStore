import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AdminNav from '../../../components/nav/AdminNav'
import { Container, Content, Heading } from '../AdminDashboard'
import { TiDelete } from 'react-icons/ti'
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from '../../../functions/coupon'
import { getRefreshedIdToken } from '../../../functions/getRefreshedIdToken'
import device from '../../../mediaQueries'

const CreateCoupon = () => {
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState(new Date())
  const [discount, setDiscount] = useState('')
  const [loading, setLoading] = useState('')
  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setToken(await getRefreshedIdToken())
      getCoupons()
        .then((res) => {
          setLoading(false)
          setCoupons(res.data)
        })
        .catch((err) => {
          console.log('ERROR LOADING COUPONS LIST -->', err)
          setLoading(false)
        })
    }
    load()
  }, [])

  const handleCreateCouponSubmit = (e) => {
    e.preventDefault()
    if (name.length < 6 || name.length > 12) {
      toast.error(
        'Coupon name should be more than 6 and less then 12 characters'
      )
      return
    }
    setLoading(true)
    createCoupon({ name, expiry, discount }, token)
      .then((res) => {
        getCoupons()
          .then((res) => {
            setCoupons(res.data)
          })
          .catch((err) => {
            console.log('ERROR LOADING COUPONS LIST -->', err)
          })
        setLoading(false)
        setName('')
        setDiscount('')
        setExpiry(new Date())
        toast.success(`"${res.data.name}" is created`)
      })
      .catch((err) => {
        setLoading(false)
        toast.error('Error in creating this coupon')
        console.log('ERROR CREATING A NEW COUPON -->', err)
      })
  }

  const handleRemove = (couponId) => {
    if (window.confirm('Delete ?')) {
      setLoading(true)
      removeCoupon(couponId, token)
        .then((res) => {
          getCoupons()
            .then((res) => {
              setCoupons(res.data)
            })
            .catch((err) => {
              console.log('ERROR LOADING COUPONS LIST -->', err)
            })
          setLoading(false)
          toast.error(`Coupon "${res.data.name}" deleted`)
        })
        .catch((err) => {
          console.log('ERROR DELETING COUPON -->', err)
          setLoading(false)
        })
    }
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>{loading ? 'loading...' : 'Coupons'}</Heading>
        <CouponCreateForm onSubmit={handleCreateCouponSubmit}>
          <FormInput>
            <FormGroup>
              <Label>Coupon name</Label>
              <NameInput
                type="text"
                pattern="[a-zA-Z0-9]*"
                minlength="6"
                maxlength="12"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Discount %</Label>
              <DiscountInput
                type="number"
                min="1"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Expiry Date</Label>
              <StyledDatePicker
                selected={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </FormGroup>
          </FormInput>

          <SubmitButton type="submit">Create</SubmitButton>
        </CouponCreateForm>
        <CouponsList>
          {coupons.map((c) => (
            <Card key={c.name}>
              <div>
                <ExpiryDate>{new Date(c.expiry).toDateString()}</ExpiryDate>
                <Name>{c.name}</Name>
                <Discount>{c.discount} % OFF</Discount>
              </div>

              <DeleteIcon onClick={() => handleRemove(c._id)} />
            </Card>
          ))}
        </CouponsList>
      </Content>
    </Container>
  )
}

export default CreateCoupon

const CouponCreateForm = styled.form`
  margin: 20px 0;
`

const FormInput = styled.div`
  display: flex;
  @media screen and ${device.tablet} {
    flex-direction: column;
  }
`
const FormGroup = styled.div`
  margin: 0 20px 20px 0;
`
const Label = styled.label`
  display: block;
`
const NameInput = styled.input`
  font-size: 20px;
  padding: 10px;
  text-transform: uppercase;
`
const DiscountInput = styled.input`
  font-size: 20px;
  padding: 10px;
`
const StyledDatePicker = styled(DatePicker)`
  font-size: 20px;
  padding: 10px;
`
const SubmitButton = styled.button`
  background-color: black;
  background-image: linear-gradient(10deg, #000000 0%, #434343 74%);
  color: white;
  display: block;
  font-size: 30px;
  padding: 10px 20px;
  margin: 1rem 0;
  border: none;
  border-radius: 10px;
  transition: 250ms all;
  &:hover {
    opacity: 0.85;
    border-radius: 50px;
  }
  &:active {
    opacity: 0.5;
    border-radius: 50px 50px 0 50px;
  }

  @media screen and ${device.mobile} {
    font-size: 20px;
  }
`
const CouponsList = styled.div`
  color: white;
  display: flex;
  padding: 3rem;
  overflow-x: scroll;
  // background: #17141d;
  @media screen and ${device.tablet} {
    margin-bottom: 5rem;
  }
`
const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 200px;
  width: 250px;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: inset -5px 5px 20px rgba(255, 255, 255, 0.1),
    -10px 5px 20px rgba(0, 0, 0, 0.5);
  background: #17141d;
  transition: 0.2s;

  &:hover {
    transform: translateY(-1rem);
  }

  &:not(:first-child) {
    margin-left: -130px;
  }

  &:focus-within ~ &,
  &:hover ~ & {
    transform: translateX(100px);
  }
`
const ExpiryDate = styled.div``
const Name = styled.div`
  font-size: 25px;
  margin: 10px 0;
`
const Discount = styled.div`
  background: white;
  color: black;
  padding: 5px 10px;
  font-size: 20px;
`
const DeleteIcon = styled(TiDelete)`
  font-size: 40px;
  color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  cursor: pointer;
  transition: 0.2s;

  ${Card}:hover & {
    transform: translate(-50%, 45px);
    opacity: 1;
  }
  &:hover {
    font-size: 50px;
  }
`
