/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {useIntl} from 'react-intl'

export default function usePromoCodeFields({form: {control, errors}, prefix = ''}) {
    const {formatMessage} = useIntl()

    const fields = {
        code: {
            name: `${prefix}code`,
            label: formatMessage({defaultMessage: 'Promo Code'}),
            type: 'text',
            defaultValue: '',
            rules: {required: formatMessage({defaultMessage: 'Please provide a valid promo code'})},
            error: errors[`${prefix}code`],
            control
        }
    }

    return fields
}
