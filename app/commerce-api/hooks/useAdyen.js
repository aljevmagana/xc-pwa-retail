/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {useState} from 'react'
import {useCommerceAPI} from '../utils'
import AdyenCheckout from '@adyen/adyen-web'

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
                    returnUrl: 'localhost:3000/checkout'
                }
            })
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
                    showPayButton: false,
                    paymentMethodsConfiguration: {
                        paypal: {
                            onInit: function(data, actions) {
                                console.log(data, actions)
                            },
                            blockPayPalCreditButton: false
                        }
                    }
                }
                if (configuration) {
                    const checkout = await AdyenCheckout(configuration)
                    const checkoutInstance = checkout.create(type).mount(paymentContainer.current)
                    setState({
                        adyen: {
                            checkout: checkoutInstance
                        }
                    })
                    return checkoutInstance
                }
            }
        }
    }
}

export default useAdyen
