/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    variants: {
        notification: {
            display: 'inline-flex',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
            width: 5,
            height: 5,
            color: 'white',
            fontSize: 'xs',
            backgroundColor: 'blue.500',
            border: '1px solid',
            borderColor: 'white',
            borderRadius: 'full'
        },
        plpBadge: {
            backgroundColor: '#17a2b8 !important',
            position: 'absolute',
            top: '10px',
            left: '-11px',
            zIndex: '999',
            display: 'inline-block',
            letterSpacing: '.3rem',
            padding: '3px 15px 5px',
            color: '#fff',
            textAlign: 'center',
            fontFamily: "HK Grotesk, sans-serif",
            _before: {
                content: "''", borderLeft: "12px solid transparent", borderRight: "0 solid transparent", borderTop: "14px solid #6227c3", position: "absolute", bottom: "-14px", left: "0"
            }
        }
    }
}
