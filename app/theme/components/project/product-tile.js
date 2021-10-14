import { textDecoration } from "@chakra-ui/styled-system";

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: (props) => ({
        container: {
            position: 'relative',
            _hover: {
                '.plp-overlay-container': {
                    display: "block"
                },
                '.plp-sub-product-tile-image': {
                    opacity: "0.3"
                },
                '.button-right': {
                    WebkitTransform: "none !important",
                    transform: "none !important",
                    opacity: "1 !important",
                    transitionDuration: "5s !important",
                    transitionDelay: "2s !important",
                    transform: "translateX(73px) !important",
                },
            }
        },
        iconButton: {
            position: 'absolute',
            top: 2,
            right: 2,
            opacity: `${props.isLoading ? 0.5 : 1}`
        },
        imageWrapper: {
            borderBottom: "2px solid #495057",
            _hover: {
                borderBottom: "2px solid #6e2ed5"
            }
        },
        image: {
        },
        price: {
            color: "#868e96 !important",
            margin: "0",
            fontFamily: "HK Grotesk, sans-serif",
            fontSize: "0.9rem",
            fontWeight: "400",
            lineHeight: "1.5",
            textAlign: "left",
            backgroundColor: "#fff"
        },
        categoryname: {
            fontSize: "0.7875rem",
            color: "#868e96 !important",
            marginBottom: "0.25rem !important"
        },
        producttext: {
            padding: "0.5rem 0 0.5rem"
        },
        title: {


            fontSize: '0.9rem',
            fontWeight: '700',
            color: '#343a40 !important',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textDecoration: 'none'


        },
        productOverlay: {
            display: "none",
            top: "45%",
            position: "absolute",
            textAlign: "center",
            width: "100%",
        },
        productOverlayButton: {
            backgroundColor: "#fff",
            borderRadius: "0",
            color: "#fff",
            cursor: "pointer",
            backgroundColor: "#343a40",
            borderColor: "#343a40",
            fontSize: "0.6875rem",
            width: "auto",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: ".3em",
            marginLeft: ".5rem",
            marginRight: ".5rem",

            _hover: {
                color: "#fff",
                backgroundColor: "#23272b",
                borderColor: "#1d2124"
            },
            p: {
                marginLeft: "0.5rem !important"
            }
        },
        productOverlayButtonOutline: {
            backgroundColor: "#fff",
            color: "#343a40",
            border: "1px solid transparent",
            borderColor: "#343a40",
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: ".3em",
            lineHeight: [1, 1.5],
            padding: "0.6rem 0.75rem",
            fontSize: "0.6875rem",
            borderRadius: "0",
            _hover: {
                backgroundColor: "#343a40",
                color: "#fff",

            },
        },
        rating: {},
        variations: {}
    }),
    parts: ['container', 'imageWrapper', 'image', 'price', 'title', 'productOverlay', 'rating', 'variations']
}
