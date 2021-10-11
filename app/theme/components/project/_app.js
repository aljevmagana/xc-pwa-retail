/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import theme from '@chakra-ui/theme'

export default {
    baseStyle: {
        container: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transparent',
            minWidth: '375px',
            position: 'relative'
        },
        headerWrapper: {
            position: 'absolute',
            top: 0,
            zIndex: theme.zIndices.sticky,
            width: '100%'
        }
    },
    parts: ['container']
}