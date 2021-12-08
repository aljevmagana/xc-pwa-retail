/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        button: {
            color: 'black'
        },
        container: {},
        text: {
            whiteSpace: 'nowrap',
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 2,
            paddingBottom: 2
        },
        buttonnumber: {
            position: "relative",
            display: "block",
            padding: "0.5rem 0.75rem",
            marginLeft: "-1px",
            fontWeight: "normal",
            lineHeight: 1.25,
            color: "#868e96",
            background: "#fff",
            backgroundColor: "#fff",
            border: "1px solid #dee2e6",
            borderRadius: "0px !important",
            textDecoration: "none",
            width:"auto",
            height:"36px",
            minWidth: "34px",
            _hover: {
                zIndex: 2,
                color: "#868e96",
                textDecoration: "none",
                backgroundColor: "#e9ecef",
                borderColor: "#dee2e6"
            },
            _active: {
                zIndex: 3,
                color: "#fff",
                backgroundColor: "#9a6ee2 !important",
                borderColor: "#9a6ee2 !important"
            }
        }
    },
    parts: ['button', 'container', 'text']
}
