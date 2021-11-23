/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Text} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ParallaxBanner from '../../components/parallax-banner'

const renderComponent = (component, index) => {
    switch (component.typeId) {
        case 'pwa_components.parallaxBanner':
            return (
                <ParallaxBanner
                    key={index}
                    image={component.data.image}
                    heading={component.data.heading}
                    subheading={component.data.subheading}
                    ctaStyle={component.data.ctaStyle}
                    category={component.data.category}
                    textAlignment={component.data.textAlignment}
                />
            )
        default:
            return ''
    }
}

const MainRegion = (props) => {
    const {components} = props
    return components?.map((component, index) => {
        return renderComponent(component, index)
    })
}

MainRegion.displayName = 'StorePage'

MainRegion.propTypes = {
    /**
     * A list of regions that form the PD page
     */
    components: PropTypes.array.isRequired
}

export default MainRegion
