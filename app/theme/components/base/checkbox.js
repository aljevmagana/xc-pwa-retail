/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        container: {style: {alignItems: 'baseline'}},
        label: {
            width: 'full'
        },
        control: {
            marginTop: '2px',
            _checked: {
                backgroundColor: 'gray.900',
                borderColor: 'gray.900',
                _hover: {
                    bg: 'gray.900',
                    borderColor: 'gray.900'
                }
            }
        }
    },
    sizes: {
        md: {
            label: {fontSize: 'sm'}
        }
    }
}
