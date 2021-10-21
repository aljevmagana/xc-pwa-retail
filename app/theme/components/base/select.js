import { background } from "@chakra-ui/styled-system"

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const mdSize = {height: 11, h: 11, borderRadius: '0'}

export default {
    sizes: {
        md: {
            field: mdSize
        }
    },
    variants: {
        plpSort:{
            fontSize: "0.9rem",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#495057",
            verticalAlign: "middle",
            border: "0 !important",
            paddingInlineStart: "inherit",
            paddingInlineEnd: "inherit",
            height:"auto",
            background:"#fff url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e) right 0.75rem center/8px 10px no-repeat"

        }
    }
}
