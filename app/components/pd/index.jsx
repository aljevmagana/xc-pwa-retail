/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import StorePage from './pages/storePage'

const PdPage = (props) => {
    const {pageType, regions} = props
    if (pageType === 'storePage') {
        return <StorePage regions={regions} />
    } else {
        return ''
    }
}

PdPage.displayName = 'pdPage'

PdPage.propTypes = {
    /**
     * PD Page Type
     */
    pageType: PropTypes.string.isRequired,
    /**
     * A list of regions that form the PD page
     */
    regions: PropTypes.array.isRequired
}

export default PdPage
