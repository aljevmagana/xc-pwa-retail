/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    parts: ['container', 'list', 'listitem', 'listitemsx', 'heading'],
    baseStyle: {
        container: {
            color: 'black'
        },
        list: {
            fontSize: 'sm',
            color: '#868e96'
        },
        headinglink: {
            display: 'inline-flex'
        },
        heading: {
            paddingBottom: 3,
            fontFamily: '"HK Grotesk", sans-serif',
            letterSpacing: '0.1em',
            fontSize: '0.9em',
            textTransform: 'uppercase',
            color: '#343a40'

        }
    },
    variants: {
        vertical: {
            display: "block",
            padding: "0.5rem 1rem",
            marginBottom: "0.5rem !important",
            _hover: {
                color: "#212529",
                backgroundColor: "#e9ecef"
            },
            _active: {
                backgroundColor: "#e9ecef"
            },
            _focus: {
                backgroundColor: "#e9ecef"
            }
        },
        horizontal: {
            listitem: {
                borderLeft: '1px solid',
                paddingLeft: 2
            },
            listitemsx: {
                '&:first-of-type': {
                    borderLeft: 0,
                    paddingLeft: 0
                }
            }
        }
    },
    defaultProps: {
        variant: 'vertical'
    }
}
