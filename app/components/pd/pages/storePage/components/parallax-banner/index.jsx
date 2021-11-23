/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {Button, Box, Container, Text, VStack, useMultiStyleConfig, useTheme } from '@chakra-ui/react'
import Link from '../../../../../link'
import PropTypes from 'prop-types'
import { Parallax, Background } from 'react-parallax'


const ParallaxBanner = (props) => {
    const {image:{focalPoint:{x = 0, y = 0},...image}, heading, subheading, ctaStyle, category, textAlignment} = props
    const theme = useTheme()
    const styles = useMultiStyleConfig("HomePage")
    const insideStyles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "100%",
        whiteSpace: "normal"
    };
    const imageAlign = `${(+x * 100).toFixed(2)}% ${(+y * 100).toFixed(2)}%`
    let alignment = "center";
    let buttonStyle;

    if(textAlignment === "left"){
        alignment = "flex-start"
    }
    if(textAlignment === "right"){
        alignment = "flex-end"
    }
    if(ctaStyle === "primary"){
        buttonStyle = {...styles.parallaxsection.buttonsolid}
    }
    if(ctaStyle === "secondary"){
        buttonStyle = {...styles.parallaxsection.buttonoutline}
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
                        <Container maxW={["100%", "726px", "960px", "1140px"]}>
                            <div style={insideStyles} >
                                <Box width="70%" marginLeft="15%" marginRight="15%">
                                    <VStack alignItems={["center", alignment]} textAlign={["center", textAlignment]}>
                                        <Box>
                                            <Text fontSize={["2.7rem", "3.3rem", "4.5rem", "4.5rem"]} textShadow="1px 1px black" isTruncated {...styles.parallaxsection.heading1} >
                                                {heading}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize={["1.125rem", "1.125rem", "1.8rem", "1.8rem"]} textShadow="1.5px 1px black" style={{ ...styles.parallaxsection.stretchtext }}>
                                                {subheading}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Link to={`/category/${category}`}>
                                                <Button {...buttonStyle}>
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
