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
        'subscribeButton',
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
            background: 'transparent',
            fontSize: '0.9rem',
            color: 'gray.900'
        },
        subscribeButtonContainer: {
            width: 'auto'
        },
        subscribeButton: {
            background: 'transparent',
            fontSize: 'xl'
        },
        subscribeHeading: {
            marginBottom: 4,
            textTransform: 'uppercase',
            color: '#343a40',
            letterSpacing: '0.1em',
            fontSize: '0.9rem'
        },
        subscribeMessage: {
            marginBottom: 4,
            fontSize: '0.9rem',
            color: '#868e96'
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
            maxWidth: '100%',
            color: '#dee2e6',
            background: '#343a40'
        },
        bottomHalfContent: {
            maxWidth:'1140px', 
            mx:'auto', 
            display:'flex',
            py: 4,
            justifyContent:'space-between',
            alignItems: {base: 'center', lg: 'left'},
            flexDirection: {base: 'column', lg: 'row'}
        },
        horizontalRule: {
            marginBottom: 4
        },
        copyright: {
            fontSize: 'sm',
            marginTop: 3,
            marginBottom: {base: 4, lg : 0}     
        },
        creditCardIcon: {
            width: '38px',
            height: '22px'
        },
    }
}
