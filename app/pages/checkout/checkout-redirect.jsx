/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import useAdyen from '../../commerce-api/hooks/useAdyen'
import useNavigation from '../../hooks/use-navigation'
import useCustomer from '../../commerce-api/hooks/useCustomer'
import useBasket from '../../commerce-api/hooks/useBasket'
import {CheckoutProvider, useCheckout} from './util/checkout-context'
import usePaymentForms from './util/usePaymentForms'
import CheckoutSkeleton from './partials/checkout-skeleton'

const Checkout = () => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    const query = useQuery()
    const adyen = useAdyen()
    const navigate = useNavigation()
    const {placeOrder, setGlobalError} = useCheckout()
    const {reviewOrder} = usePaymentForms()
    const sessionId = query.get('sessionId')
    const redirectResult = query.get('redirectResult')
    useEffect(() => {
        const createCheckout = async () => {
            const checkout = await adyen.createRedirectSession({
                session: {id: sessionId},
                onPaymentCompleted: async (result, component) => {
                    if (result.resultCode === 'Refused' || result.resultCode === 'Error') {
                        // Handle errors
                        setGlobalError(
                            'There is an error processing your payment, please try again.'
                        )
                        navigate('/checkout')
                    } else {
                        await reviewOrder()
                        await placeOrder()
                        navigate('/checkout/confirmation')
                    }
                },
                onError: (error, component) => {
                    console.error(error)
                    // TODO
                }
            })
            checkout.submitDetails({details: {redirectResult}}) // we finalize the redirect flow with the reeived payload
        }
        createCheckout()
    }, [])

    return <div>Redirect Page</div>
}

const CheckoutRedirect = () => {
    const customer = useCustomer()
    const basket = useBasket()

    if (!customer || !customer.customerId || !basket || !basket.basketId) {
        return <CheckoutSkeleton />
    }

    return (
        <CheckoutProvider>
            <Checkout />
        </CheckoutProvider>
    )
}

export default CheckoutRedirect
