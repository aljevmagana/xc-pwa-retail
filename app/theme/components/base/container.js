/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        maxWidth: '100%'
    },
    variants: {
        form: {
            maxWidth: '522px',
            px: 0
        },
        plpContainer:{
            maxWidth: 'container.xxl',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: {base: 8, lg: 10},
            paddingBottom: 8,
            paddingLeft: [4, 4, 6, 8],
            paddingRight: [4, 4, 6, 8]
        }
    }
}
