/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        button: {
            fontWeight: "normal",
            position: "relative",
            display: "block",
            padding: "0.5rem 0.75rem",
            marginLeft: "-1px",
            lineHeight: 1.25,
            color: "#868e96",
            backgroundColor: "#fff",
            border: "1px solid #dee2e6",
            borderRadius: "0px",
            textDecoration: "none",
            width:"auto",
            height:"36px",
            _hover: {
                backgroundColor: "#fff",
            }  
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
        },
        prevbutton: {
            fontWeight: "normal",
            position: "relative",
            display: "block",
            padding: "0.5rem 0.75rem",
            marginLeft: "0",
            lineHeight: 1.25,
            color: "#868e96",
            backgroundColor: "#fff",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            backgroundColor: "#fff",
            border: "1px solid #dee2e6",
            borderRadius: "0px",
            textDecoration: "none",
            width:"auto",
            height:"36px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
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
            },
        },
        nextbutton: {
            fontWeight: "normal",
            position: "relative",
            display: "block",
            padding: "0.5rem 0.75rem",
            marginLeft: "0",
            lineHeight: 1.25,
            color: "#868e96",
            borderTopRightRadius: "0", 
            borderBottomRightRadius: "0",
            backgroundColor: "#fff",
            border: "1px solid #dee2e6",
            borderRadius: "0px",
            textDecoration: "none",
            width:"auto",
            height:"36px",
            _active: {
                zIndex: 3,
                color: "#fff",
                backgroundColor: "#9a6ee2 !important",
                borderColor: "#9a6ee2 !important"
            },
            _hover: {
                zIndex: 2,
                color: "#868e96",
                textDecoration: "none",
                backgroundColor: "#e9ecef",
                borderColor: "#dee2e6"
            },
        },
        container: {
            'button.chakra-button.active': {
                backgroundColor: "violet",
                color: "#fff"
            }
        },
        text: {
            lineHeight: 1.25,
            color: "#868e96",
            textTransform: "uppercase",
            letterSpacing: "0.1em"
        }
    },
    variants: {

    },
    parts: ['button', 'container', 'text', 'buttonnumber', 'nextbutton', 'prevbutton']
}
