/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        container: {
            minHeight: 4,
            fontSize: 'sm'
        },
        plpContainer:{
            fontSize: "0.7875rem", display: "flex", MsFlexWrap: "wrap", flexWrap: "wrap", padding: "2rem 0", marginBottom: "0", listStyle: "none", backgroundColor: "transparent", borderRadius: "0"
        },
        icon: {
            display: 'flex',
            boxSize: 4,
            color: 'grey'
        },
        link: {
            paddingTop: 3,
            paddingBottom: 3

        },
        plpLink: {
            paddingLeft: "0.5rem",
            color: "white !important"
            
        },
        plpListItem: {
            color: "white !important"
            
        }
    },
    parts: ['container', 'icon', 'link']
}
