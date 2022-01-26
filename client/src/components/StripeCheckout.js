import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { createPaymentIntent } from '../functions/stripe'
import '../stripe.css'

const StripeCheckout = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      setClientSecret(res.data.clientSecret)
    })
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

  return (
    <div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
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

        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment succeeded
        </p>
      </form>
    </div>
  )
}

export default StripeCheckout
