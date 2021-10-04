/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {AspectRatio, Box, Flex, Heading, Img, Text, VStack, useTheme} from '@chakra-ui/react'
import { Parallax, Background } from 'react-parallax'
import {getAssetUrl} from 'pwa-kit-react-sdk/ssr/universal/utils'

const insideStyles = {
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
};

const Hero = ({title, label, img, actions, ...props}) => {
    const {src, alt} = img
    const theme = useTheme()

    return (
        <div>
            <Parallax bgImage={getAssetUrl('static/img/photo/dmitriy-ilkevich-437760-unsplash-parallax.jpg')} style={{ height: '100%' }}>
                <div style={{ height: '100vh' }}>
                    <div style={insideStyles}> Just arrived</div>
                </div>
            </Parallax>

            <Parallax bgImage={getAssetUrl('static/img/photo/serrah-galos-494279-unsplash-parallax.jpg')} style={{ height: '100%' }}>
                <div style={{ height: '100vh' }}>
                    <div style={insideStyles}>Dynamic Blur</div>
                </div>
            </Parallax>

            <Parallax bgImage={getAssetUrl('static/img/photo/kyle-loftus-592041-unsplash-parallax.jpg')} style={{ height: '100%' }}>
                <div style={{ height: '100vh' }}>
                    <div style={insideStyles}>Reverse direction</div>
                </div>
            </Parallax>

            <Parallax bgImage={getAssetUrl('static/img/photo/serrah-galos-494312-unsplash-parallax.jpg')} style={{ height: '100%' }}>
                <div style={{ height: '100vh' }}>
                    <div style={insideStyles}>renderProp</div>
                </div>
            </Parallax>
        </div>
    )
}

Hero.displayName = 'Hero'

Hero.propTypes = {
    /**
     * Promotion label
     */
    label: PropTypes.string,
    /**
     * Hero component image
     */
    img: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string
    }),
    /**
     * Hero component main title
     */
    title: PropTypes.string,
    /**
     * Call to action component(s)
     */
    actions: PropTypes.element
}

export default Hero
