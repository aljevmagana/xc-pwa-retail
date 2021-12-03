/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import useAdyen from '../../commerce-api/hooks/useAdyen'

const CheckoutRedirect = () => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    const query = useQuery()
    const adyen = useAdyen()
    const sessionId = query.get('sessionId')
    const redirectResult = query.get('redirectResult')
    useEffect(() => {
        const createCheckout = async () => {
            const checkout = await adyen.createRedirectSession(sessionId)
            checkout.submitDetails({details: {redirectResult}}) // we finalize the redirect flow with the reeived payload
        }
        createCheckout()
    }, [])

    return <div>{JSON.stringifyquery}</div>
}

export default CheckoutRedirect
