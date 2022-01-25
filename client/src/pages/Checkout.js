import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from '../functions/user'
import { toast } from 'react-toastify'

const Checkout = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [totalAfterDiscount, setTotalAfterDiscount] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    setLoading(true)
    try {
      getUserCart(user.token)
        .then((res) => {
          setLoading(false)
          setProducts(res.data.products)
          setTotal(res.data.cartTotal)
        })
        .catch((err) => {
          setLoading(false)
          console.log('Error getting User Cart from database -> ', err)
        })
    } catch (err) {
      console.log(err)
      // usually if user refreshes the checkout page
      history.push('/cart')
    }
  }, [])

  const emptyCart = () => {
    //remove from local storage
    if (window) {
      localStorage.removeItem('cart')
    }

    //remove from redux
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    })

    //remove from backend
    emptyUserCart(user.token)
      .then((res) => {
        setProducts([])
        setTotal(0)
        toast.success('Cart is empty. Continue Shopping.')
        history.push('/shop')
      })
      .catch((err) => {
        console.log('Error Empty Cart -->', err)
        toast.error('Error While Clearing the cart')
      })
  }

  const saveAddressToDb = (e) => {
    e.preventDefault()
    saveUserAddress(user.token, address)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true)
          toast.success('Address saved')
        }
      })
      .catch((err) => {
        toast.error('Error in saving Address')
        console.log('SAVE ADDRESS ERR -->', err)
      })
  }

  const handleCouponApply = () => {
    applyCoupon(user.token, coupon).then((res) => {
      if (!res.data.err) {
        setTotalAfterDiscount(res.data)
        setCouponApplied(true)
        console.log('Valid Coupon', res.data)
        // push to redux
      } else if (res.data.err) {
        setCouponError(res.data.err)
        setCouponApplied(false)
        // update redux state
      }
    })
  }

  return (
    <Container>
      <LeftContainer>
        <Heading>Delivery Address</Heading>
        <AddressForm>
          <AddressTextArea
            required={true}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></AddressTextArea>
          <AddressSubmitButton
            disabled={!address.length}
            onClick={saveAddressToDb}
          >
            {address.length ? 'Save' : 'Fill in your address first'}
          </AddressSubmitButton>
        </AddressForm>
        <br />
        <br />
        <br />
        <h4>Got Coupon ?</h4>
        <br />
        <CouponContainer>
          <CouponInput
            type="text"
            value={coupon}
            onChange={(e) => {
              setCoupon(e.target.value)
              setCouponError('')
              setCouponApplied(false)
            }}
          />
          <CouponApplyButton
            onClick={handleCouponApply}
            disabled={coupon.length < 6 || couponError || couponApplied}
            couponError={couponError}
            couponApplied={couponApplied}
          >
            {!couponApplied ? (couponError ? couponError : 'Apply') : 'Applied'}
          </CouponApplyButton>
        </CouponContainer>
      </LeftContainer>
      <OrderSummaryContainer>
        {loading ? (
          <Heading>Loading...</Heading>
        ) : (
          <>
            <Heading>Order Summary</Heading>
            <SubHeading>Products - {products.length}</SubHeading>
          </>
        )}

        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <Calc>
              <Left>
                {p.product.title} ({p.color}){' '}
                <Multiplier>x{p.count} </Multiplier>
              </Left>
              <Right>
                <CurrencySymbol>&#8377; </CurrencySymbol> {p.price * p.count}
              </Right>
            </Calc>
          </div>
        ))}
        <Hr />
        <TotalPay>
          Cart Total = <CurrencySymbol> &#8377;</CurrencySymbol>
          {total}
        </TotalPay>
        <Hr />
        <Buttons>
          <PlaceOrderButton disabled={!products.length || !addressSaved}>
            Place Order
          </PlaceOrderButton>
          <EmptyCartButton onClick={emptyCart} disabled={!products.length}>
            Empty Cart
          </EmptyCartButton>
        </Buttons>
      </OrderSummaryContainer>
    </Container>
  )
}

export default Checkout

const Container = styled.div`
  margin-top: 70px;
  display: flex;
`
const Heading = styled.h1`
  margin-bottom: 1rem;
`
const LeftContainer = styled.div`
  margin: 2rem;
  padding: 0 1rem;
  width: 50vw;
  min-height: calc(100vh - 4rem - 70px);
`

const AddressForm = styled.form``
const AddressTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  resize: none;
  font-size: 20px;
  font-family: georgia, verdana;
  padding: 20px;
  border: 5px solid rgba(0, 0, 255, 0.2);
  outline: none;
  &:focus {
    border: 5px solid rgba(0, 0, 255, 0.4);
  }
`
const AddressSubmitButton = styled.button`
  padding: 10px 20px;
  background-color: rgba(0, 0, 255, 0.2);
  color: black;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: 0.1s all;

  &:hover:enabled {
    background-color: rgba(0, 0, 255, 0.4);
  }
`

const OrderSummaryContainer = styled.div`
  margin: 2rem 0;
  padding: 0 1rem;
  width: calc(50vw - 6rem);
`
const SubHeading = styled.h2`
  margin-bottom: 1rem;
`
const Calc = styled.p`
  font-size: 20px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  font-size: 20px;
  margin: 10px;
`
const Left = styled.span`
  font-weight: bold;
`
const Right = styled.span``
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const PlaceOrderButton = styled.button`
  width: 180px;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.1s all;
  &:hover:enabled {
    border-radius: 5px;
    transform: scale(1.05);
  }
  &:active:enabled {
    transform: scale(0.97);
  }

  &:disabled,
  &[disabled] {
    background-color: white;
    color: grey;
    cursor: not-allowed;
  }
`
const EmptyCartButton = styled(PlaceOrderButton)``
const CurrencySymbol = styled.span`
  display: inline-block;
  margin-left: 5px;
`
const Multiplier = styled.span`
  font-weight: bold;
  font-size: 15px;
  padding: 3px;
`
const Hr = styled.hr`
  margin: 1rem 0;
`
const TotalPay = styled.div`
  font-weight: bold;
  font-size: 30px;
`
const CouponContainer = styled.div`
  display: flex;
`
const CouponInput = styled.input`
  width: 200px;
  font-size: 20px;
  padding: 4px;
  margin-right: 20px;
  text-transform: uppercase;
`
const CouponApplyButton = styled.button`
  width: 180px;
  padding: 10px;
  font-size: 20px;
  background-color: white;
  border: 2px solid black;
  cursor: pointer;
  transition: 0.1s all;
  &:hover:enabled {
    border-radius: 5px;
    transform: scale(1.05);
    background: rgba(0, 255, 0, 0.2);
  }
  &:active:enabled {
    transform: scale(0.97);
    background: rgba(0, 255, 0, 0.5);
  }
  &:disabled,
  &[disabled] {
    background-color: ${(props) =>
      props.couponError
        ? 'rgba(255, 0, 0, 0.8)'
        : props.couponApplied
        ? 'rgba(0, 255, 0, 0.8)'
        : 'white'};

    color: ${(props) =>
      props.couponError ? 'white' : props.couponApplied ? 'black' : 'grey'};
    cursor: not-allowed;
    border: ${(props) =>
      props.couponError || props.couponApplied ? 'none' : 'grey solid 1px'};
  }
`
