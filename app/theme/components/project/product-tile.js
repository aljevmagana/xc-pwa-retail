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
            position: 'relative'
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
                borderBottom: "2px solid #6e2ed5",
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
            

                fontSize:'0.9rem',
                fontWeight: '700',
                color:'#343a40 !important',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textDecoration: 'none'
            

        },
        rating: {},
        variations: {}
    }),
    parts: ['container', 'imageWrapper', 'image', 'price', 'title', 'rating', 'variations']
}
