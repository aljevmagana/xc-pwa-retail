/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {useState} from 'react'
import {useCommerceAPI} from '../utils'

/**
 * Hook for retrieving and managing state of Search Suggestions
 */
const usePageDesigner = () => {
    const api = useCommerceAPI()
    const [state, setState] = useState({page: 0})
    return {
        ...state,

        // Check if the page designer response is loaded
        get loaded() {
            return !!state.page
        },

        /**
         * Retrieves page designer serialized page from api based on pageId
         *
         * @param {input} string
         */
        async getPage(pageId) {
            const response = await api.shopperPageDesigner.getSerializedPage({
                parameters: {
                    pageId: pageId
                }
            })
            const pages = response.c_result.pages
            if (pages.length) {
                setState({page: pages[0]})
            }
        }
    }
}

export default usePageDesigner
