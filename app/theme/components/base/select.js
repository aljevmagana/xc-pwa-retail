import { background } from "@chakra-ui/styled-system"

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const mdSize = {height: 11, h: 11, borderRadius: 'base'}

export default {
    sizes: {
        md: {
            field: mdSize
        }
    },
    variants: {
        plpSort:{
            display: "inline-block", 
            width: "100%", 
            height: "calc(1.5em + 1.2rem + 2px)", 
            padding: "0.6rem 1.75rem 0.6rem 0.75rem", 
            fontSize: "0.9rem", 
            fontWeight: "400", 
            lineHeight: "1.5", 
            color: "#495057", 
            verticalAlign: "middle", 
            border: "1px solid #ced4da", 
            borderRadius: "0", 
            WebkitAppearance: "none", 
            MozAppearance: "none", 
            appearance: "none",
            padding:"0.6rem 0rem 0.6rem 0.75rem"
        }
    }
}
