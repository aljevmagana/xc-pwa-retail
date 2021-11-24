/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

// This class allows integration with OCAPI Custom API Adyen
// https://github.com/SalesforceCommerceCloud/ocapi_hooks_collection
// This implementations coverts CAPI requests to OCAPI requests as there are fundamental differences between the APIS
// One major difference is OCAPI uses snake_case and CAPI uses camelCase for this reaso you will see a utility function in here that convert
// from camelCase to snake_case - camelCaseKeysToUnderscore
// createOcapiFetch is another utility function that returns the response from OCAPI in the fromat returned from CAPI
// Another utility function - checkRequiredParameters is used to check if the parameters or body objects necessary for a call are
// present in the request before making it

import {checkRequiredParameters, createOcapiFetch} from './utils'

class OcapiAdyen {
    constructor(config) {
        this.fetch = createOcapiFetch(config)
    }

    async createPaymentSession(...args) {
        const required = ['returnUrl']
        let requiredParametersError = checkRequiredParameters(args[0], required)
        if (requiredParametersError) {
            return requiredParametersError
        }

        let {
            parameters: {returnUrl}
        } = args[0]

        return this.fetch(
            `custom_objects/CustomApi/adyen-checkout-sessions?c_returnUrl=${returnUrl}`,
            'GET',
            args,
            'createPaymentSession'
        )
    }
}

export default OcapiAdyen
