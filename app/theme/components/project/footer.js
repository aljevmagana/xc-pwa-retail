/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    parts: [
        'container',
        'content',
        'subscribe',
        'subscribeField',
        'subscribeButtonContainer',
        'subscribeHeading',
        'subscribeMessage',
        'localeSelector',
        'bottomHalf',
        'horizontalRule',
        'copyright',
        'socialIcons'
    ],
    baseStyle: {
        container: {
            width: 'full',
            background: 'gray.100',
            color: 'black'
        },
        content: {
            maxWidth: 'container.xxl',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'black'
        },
        subscribe: {
            maxWidth: {base: '21.5rem', lg: 'none'}
        },
        subscribeField: {
            background: 'white',
            color: 'gray.900'
        },
        subscribeButtonContainer: {
            width: 'auto'
        },
        subscribeHeading: {
            fontSize: 'md',
            marginBottom: 2
        },
        subscribeMessage: {
            fontSize: 'sm',
            marginBottom: 4
        },
        localeSelector: {
            display: 'inline-block',
            marginTop: 8,
            marginBottom: 5
        },
        localeDropdown: {
            background: 'gray.800',
            _hover: {
                background: 'whiteAlpha.500'
            }
        },
        bottomHalf: {
            maxWidth: {base: '34.5rem', lg: '100%'},
            color: '#dee2e6',
            background: '#343a40'
        },
        horizontalRule: {
            marginBottom: 4
        },
        copyright: {
            fontSize: 'sm',
            marginTop: 3
            
        },
        creditCardIcon: {
            width: '38px',
            height: '22px'
        },
    }
}
