/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {useState} from 'react'
import {useCommerceAPI} from '../utils'
import useNavigation from '../../hooks/use-navigation'
import {useCheckout} from '../../pages/checkout/util/checkout-context'
import usePaymentForms from '../../pages/checkout/util/usePaymentForms'

const useAdyen = () => {
    const api = useCommerceAPI()
    const [state, setState] = useState({
        adyen: {
            checkout: 0
        }
    })

    return {
        ...state,

        async createPaymentSession(type, paymentContainer, additionalConfig) {
            const config = api._config?.adyenConfig
            const paymentSession = await api.adyen.createPaymentSession({
                parameters: {
                    returnUrl: 'http://localhost:3000/checkout/handleShopperRedirect'
                }
            })
            // Import Adyen Library dynamically
            const AdyenCheckout = (await import('@adyen/adyen-web')).default

            // Import styles dynamically
            await import('@adyen/adyen-web/dist/adyen.css')

            const response = paymentSession.c_result.response
            if (response) {
                const configuration = {
                    ...additionalConfig,
                    session: {
                        id: response.id,
                        sessionData: response.sessionData
                    },
                    environment: config.environment,
                    clientKey: config.clientKey,
                    paymentMethodsConfiguration: {
                        card: {
                            showPayButton: false
                        },
                        paywithgoogle: {
                            showPayButton: true
                        },
                        paypal: {
                            showPayButton: true
                        }
                    }
                }
                if (configuration) {
                    const checkout = await AdyenCheckout(configuration)
                    const checkoutInstance = checkout
                        .create(type, {instantPaymentTypes: ['paywithgoogle']})
                        .mount(paymentContainer.current)
                    setState({
                        adyen: {
                            checkout: checkoutInstance
                        }
                    })
                    return checkoutInstance
                }
            }
        },

        async createRedirectSession(sessionId) {
            const config = api._config?.adyenConfig
            const navigate = useNavigation()
            const {placeOrder, setGlobalError} = useCheckout()
            const {reviewOrder} = usePaymentForms()
            // Import Adyen Library dynamically
            const AdyenCheckout = (await import('@adyen/adyen-web')).default
            const configuration = {
                session: {id: sessionId},
                environment: config.environment,
                clientKey: config.clientKey,
                onPaymentCompleted: async (result, component) => {
                    if (result.resultCode === 'Refused' || result.resultCode === 'Error') {
                        // Handle errors
                        setGlobalError(
                            'There is an error processing your payment, please try again.'
                        )
                        window.scrollTo({top: 0})
                        component.setStatus('ready')
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
            }
            return await AdyenCheckout(configuration)
        }
    }
}

export default useAdyen
