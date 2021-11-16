/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Wrap} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import MainRegion from './regions/main-region'

const StorePage = (props) => {
    const {regions} = props
    return (
        <Wrap direction="row" align="center" display="flex" flexWrap="wrap">
            {regions.map(function(region, index) {
                if (region.id === 'main') {
                    return <MainRegion key={index} components={region.components} />
                } else {
                    return ''
                }
            })}
        </Wrap>
    )
}

StorePage.displayName = 'StorePage'

StorePage.propTypes = {
    /**
     * A list of regions that form the PD page
     */
    regions: PropTypes.array.isRequired
}

export default StorePage
