/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        container: {display: 'flex'},
        label: {
            width: 'full'
        },
        control: {
            backgroundColor: 'white',
            _checked: {
                backgroundColor: 'gray.900',
                borderColor: 'gray.900',
                _hover: {
                    backgroundColor: 'gray.700',
                    borderColor: 'gray.700'
                }
            },
            _indeterminate: {}
        }
    },
    sizes: {
        md: {
            container: {alignItems: 'flex-start'},
            control: {marginTop: '0.25em'},
            label: {marginLeft: 3}
        }
    }
}
