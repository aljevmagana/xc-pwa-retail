/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Button, Box, Container, Heading, Link, Text, VStack, useMultiStyleConfig, useTheme } from '@chakra-ui/react'
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
        transform: "translate(-50%,-50%)"
    };
    console.log(image)
    return (
        <Parallax
            bgImage={image.fullUrl}
            strength={400}
            bgImageStyle={{
                aspectRatio: "32/10",
                objectFit: "cover",
                objectPosition: "left center",
                height: "100%",
                left: "50%"
            }}
            style={{ height: "100vh" }}>
                <div style={{ height: '100vh' }}>
                    <Background>
                        <Container>
                            <div style={insideStyles}>
                                <Box>
                                    <VStack>
                                        <Box>
                                            <Heading as="h1" size={"sm"} style={{ ...styles.parallaxsection.stretchtext }}>
                                                {heading}
                                            </Heading>
                                        </Box>
                                        <Box>
                                            <Text fontSize={"6rem"} isTruncated {...styles.parallaxsection.heading1} >
                                                {subheading}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Link href={category}>
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
