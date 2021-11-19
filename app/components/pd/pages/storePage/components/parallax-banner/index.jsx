/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Button, Box, Container, Link, Text, VStack, useMultiStyleConfig, useTheme } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { Parallax, Background } from 'react-parallax'


const ParallaxBanner = (props) => {
    const {image, heading, subheading, ctaStyle, category, textAlignment} = props
    const theme = useTheme()
    const styles = useMultiStyleConfig("HomePage")
    const insideStyles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "100%"
    };
    
     let imageAlignX = (image.focalPoint.x * 100).toFixed(2).toString() + "%"
     let imageAlignY = (image.focalPoint.y * 100).toFixed(2).toString() + "%"
     let imageAlign = imageAlignX + " " + imageAlignY
     let alignment = "center";
     console.log(imageAlign)

    if(textAlignment === "left"){
        alignment = "flex-start"
        insideStyles.left = "calc(50% + 30px)"
    }
    if(textAlignment === "right"){
        alignment = "flex-end"
        insideStyles.left = "calc(50% - 30px)"
    }

    return (
        <Parallax
            bgImage={image.fullUrl}
            strength={400}
            bgImageStyle={{
                aspectRatio: "32/10",
                objectFit: "cover",
                objectPosition: `${imageAlign}`,
                height: "100%",
                left: "50%"
            }}
            style={{ height: "100vh" }}>
                <div style={{ height: '100vh' }}>
                    <Background>
                        <Container maxW={["100%", "726px", "960px", "1140px"]} >
                            <div style={insideStyles}  >
                                <Box>
                                    <VStack alignItems={alignment}>
                                        <Box>
                                            <Text fontSize={"4.5rem"} textShadow="1px 1px black" isTruncated {...styles.parallaxsection.heading1} >
                                                {heading}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize={"1.8rem"} textShadow="1px 1px black" style={{ ...styles.parallaxsection.stretchtext }}>
                                                {subheading}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Link href={`category/${category}`}>
                                                <Button {...styles.parallaxsection.buttonoutline}>
                                                    See Look Book
                                                </Button>
                                            </Link>
                                        </Box>
                                    </VStack>
                                </Box>
                            </div>
                        </Container>
                    </Background>
                </div>
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
