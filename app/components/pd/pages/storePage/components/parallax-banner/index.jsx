/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Text} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { Parallax, Background } from 'react-parallax'

const ParallaxBanner = (props) => {
    const {image, heading, subheading, ctaStyle, category, textAlignment} = props
    return (
        <Parallax
            blur={10}
            bgImage={image.path}>

        </Parallax>
    )
}

ParallaxBanner.displayName = 'StorePage'

ParallaxBanner.propTypes = {
    /**
     * A list of regions that form the PD page
     */
    image: PropTypes.object.isRequired,
    heading: PropTypes.string.isRequired,
    subheading: PropTypes.string,
    ctaStyle: PropTypes.string,
    category: PropTypes.string,
    textAlignment: PropTypes.string
}

export default ParallaxBanner
