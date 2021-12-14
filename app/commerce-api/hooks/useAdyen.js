/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {useState} from 'react'
import {useCommerceAPI} from '../utils'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

const useAdyen = () => {
    const api = useCommerceAPI()
    const [state, setState] = useState({
        adyen: {
            checkout: 0
        }
    })

    return {
        ...state,

        async createPaymentComponent(type, paymentContainer, additionalConfig) {
            const config = api._config?.adyenConfig
            const paymentSession = await api.adyen.createPaymentSession({
                parameters: {
                    returnUrl: `${getAppOrigin()}/en-US/checkout/handleShopperRedirect`
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
                        .create(type, {instantPaymentTypes: ['paywithgoogle', 'applepay']})
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

        async createRedirectSession(additionalConfig) {
            const config = api._config?.adyenConfig
            // Import Adyen Library dynamically
            const AdyenCheckout = (await import('@adyen/adyen-web')).default
            const configuration = {
                ...additionalConfig,
                environment: config.environment,
                clientKey: config.clientKey
            }
            return await AdyenCheckout(configuration)
        }
    }
}

export default useAdyen
