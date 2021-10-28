/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        container: {
            flex: 1
        },
        icon: {
            width: {base:'5', lg:'5'},
            height: {base:'auto', lg:'5'},
        },
        item: {
            textAlign: 'center',
            paddingLeft: {base:'0', lg:'2'},
            paddingRight: {base:'2', lg: '2'},
            minWidth: {base:'auto'},
            height: {base:'auto'}
        }
    },
    variants: {
        'flex-start': {
            container: {
                justifyContent: 'flex-start'
            },
            item: {
                flex: 0
            }
        },
        'flex-end': {
            container: {
                justifyContent: 'flex-end'
            },
            item: {
                flex: 0
            }
        },
        flex: {
            container: {
                justifyContent: 'center'
            },
            item: {
                flex: 1
            }
        }
    },
    parts: ['container', 'item', 'icon'],
    defaultProps: {
        variant: 'flex-start'
    }
}
