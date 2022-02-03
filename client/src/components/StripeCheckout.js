import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createPaymentIntent } from '../functions/stripe'
import { createOrder, emptyUserCart } from '../functions/user'
import { AiOutlineDollarCircle, AiOutlineCheckCircle } from 'react-icons/ai'
import { getRefreshedIdToken } from '../functions/getRefreshedIdToken'

const StripeCheckout = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { coupon, cart } = useSelector((state) => ({ ...state }))

  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [cartTotal, setCartTotal] = useState(0)
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [payable, setPayable] = useState(0)

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (
      !cart.length ||
      !history.location.state ||
      !history.location.state.from === 'checkout'
    ) {
      history.push('/cart')
      return
    }

    const load = async () => {
      setLoading(true)
      setToken(await getRefreshedIdToken())
      createPaymentIntent(await getRefreshedIdToken(), coupon)
        .then((res) => {
          setClientSecret(res.data.clientSecret)
          // additional response receives on successful payment
          setCartTotal(res.data.cartTotal.toFixed(2))
          setTotalAfterDiscount(res.data.totalAfterDiscount)
          setPayable((res.data.payable / 100).toFixed(2))
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log('ERROR CREATING STRIPE PAYMENT INTENT -->', err)
        })
    }
    load()
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
    } else {
      createOrder(payload, token).then((res) => {
        if (res.data.ok) {
          if (window) localStorage.removeItem('cart')
          dispatch({
            type: 'ADD_TO_CART',
            payload: [],
          })
          dispatch({
            type: 'COUPON_APPLIED',
            payload: false,
          })
          emptyUserCart(token)
        }
      })
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }

  const handleChange = async (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : '')
  }

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  const inrCurrencyFormat = (amount) => {
    return amount.toString().replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') // to indian currency formatting - commas
  }

  return (
    <div className="container">
      {loading ? (
        <div className="spinner black" id="spinner"></div>
      ) : (
        <>
          <h1 className="heading">
            {succeeded ? 'Ordered successfully' : 'Complete your purchase'}
          </h1>
          {coupon && totalAfterDiscount ? (
            <p className="coupon-applied">
              Total after discount: &#8377;
              {inrCurrencyFormat(totalAfterDiscount)}
            </p>
          ) : (
            <p className="coupon-applied">
              Total amount: &#8377;{inrCurrencyFormat(payable)}
            </p>
          )}
          <div className="TotalPayable">
            <div>
              <AiOutlineDollarCircle />
              Total: &#8377;{inrCurrencyFormat(cartTotal)}
            </div>
            <div>
              <AiOutlineCheckCircle />
              Payable: &#8377;{inrCurrencyFormat(payable)}
            </div>
          </div>
          <form
            id="payment-form"
            className="stripe-form"
            onSubmit={handleSubmit}
          >
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
            <button
              id="submit"
              className="stripe-button"
              disabled={processing || disabled || succeeded}
            >
              <span id="button-text">
                {processing ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  'Pay now'
                )}
              </span>
            </button>
            {error && (
              <div id="card-error" role="alert">
                {error}
              </div>
            )}

            <p
              className={succeeded ? 'result-message' : 'result-message hidden'}
            >
              Payment succeeded
            </p>
          </form>
        </>
      )}
    </div>
  )
}

export default StripeCheckout
