/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import { AspectRatio, Button, Box, Center, Container, Flex, Heading, Img, Link, Text, VStack, useMultiStyleConfig, useTheme } from '@chakra-ui/react'
import { Parallax, Background } from 'react-parallax'
import { getAssetUrl } from 'pwa-kit-react-sdk/ssr/universal/utils'
import { HideOnMobile, HideOnDesktop } from '../../components/responsive'

const insideStyles1 = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
};

const insideStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
};


const insideStylesMobile = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
};

const Hero = ({ title, label, img, actions, isMobile, ...props }) => {
    const { src, alt } = img
    const theme = useTheme()
    const styles = useMultiStyleConfig("HomePage")
    let bgAffterEffect, textEffect;
    
    return (
        <div>

            <Parallax
                className="parallaxsection"
                bgImage={getAssetUrl('static/img/photo/dmitriy-ilkevich-437760-unsplash-parallax.jpg')}
                strength={400}
                bgImageStyle={{
                    aspectRatio: "32/10",
                    objectFit: "cover",
                    objectPosition: "left center",
                    height: "100%",
                    left: "50%"
                }}
                strength={400}
                style={{ height: "100vh" }}
            >
                <div style={{ height: '100vh' }}>
                <Background style={bgAffterEffect}>


                    <Container>
                        <HideOnMobile>
                            <div style={insideStyles}>
                                <Box>
                                    <VStack>

                                        <Box>
                                            <Heading as="h1" size={["sm", "sm"]} style={{ ...styles.parallaxsection.stretchtext }}>
                                                Just Arrived
                                            </Heading>
                                        </Box>
                                        <Box>


                                            <Text fontSize={["4rem", "6rem"]} isTruncated {...styles.parallaxsection.heading1} >
                                                Autumn Vibes
                                            </Text>

                                        </Box>
                                        <Box>
                                            <Link href="/en-US/category/womens-clothing-tops">
                                                <Button {...styles.parallaxsection.buttonoutline}>

                                                    See Look Book
                                                </Button>
                                            </Link>
                                        </Box>
                                    </VStack>
                                </Box>
                            </div>
                        </HideOnMobile>

                        <HideOnDesktop>
                            <div style={insideStylesMobile}>
                                <Box>
                                    <VStack>

                                        <Box>
                                            <Heading as="h1" size={["sm", "sm"]} style={{ ...styles.parallaxsection.stretchtext }}>
                                                Just Arrived
                                            </Heading>
                                        </Box>
                                        <Box>

                                            <Text fontSize={["3.3rem", "6rem"]} maxWidth={["320", "100%"]} isTruncated {...styles.parallaxsection.heading1mobile} >
                                                Autumn Vibes
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Link href="/en-US/category/womens-clothing-tops">
                                                <Button {...styles.parallaxsection.buttonoutline}>

                                                    See Look Book
                                                </Button>
                                            </Link>
                                        </Box>
                                    </VStack>
                                </Box>
                            </div>
                        </HideOnDesktop>

                    </Container>


                </Background>
                </div>

            </Parallax>

            <Parallax
                className="parallaxsection"
                bgImage={getAssetUrl('static/img/photo/serrah-galos-494279-unsplash-parallax.jpg')}
                bgImageStyle={{
                    aspectRatio: "32/10",
                    objectFit: "cover",
                    objectPosition: "right center",
                    height: "100%",
                    left: "50%"
                }}
                strength={400}
                style={{ height: "100vh" }}
            >
                <div style={{ height: '100vh' }}>
                    <Background>
                        <Container maxWidth="1140px">
                            <div style={{ ...styles.parallaxsection.container2 }} >
                                <Box>
                                    <VStack align="stretch">
                                        <Box>
                                            <Text fontSize={["3.5rem", "6rem"]} {...styles.parallaxsection.heading2} isTruncated>
                                                Ethnic <br />
                                                Sweaters
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text {...styles.parallaxsection.subtext}>
                                                Trendy. Comfy. Beautiful
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Link href="/en-US/category/womens-clothing-jackets">
                                                <Button {...styles.parallaxsection.buttonsolid}>
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


            <Parallax
                className="parallaxsection"
                bgImage={getAssetUrl('static/img/photo/kyle-loftus-592041-unsplash-parallax.jpg')}
                bgImageStyle={{
                    aspectRatio: "32/10",
                    objectFit: "cover",
                    objectPosition: "left center",
                    height: "100%",
                    left: "50%"
                }}
                strength={400}
                style={{ height: "100vh" }}
            >
                <div style={{ height: '100vh' }}>
                    <Background>
                        <Container textAlign={["left", "right"]} maxWidth="1140px">
                            <HideOnMobile>
                                <div style={{ ...styles.parallaxsection.container3 }}>
                                    <Box>
                                        <VStack textAlign={["left", "right"]} align="stretch">
                                            <Box>
                                                <Heading as="h5" size="sm" style={{ ...styles.parallaxsection.stretchtext }}>
                                                    Our Favourites
                                                </Heading>
                                            </Box>
                                            <Box>
                                                <Text fontSize={["1.5rem", "4.5rem"]} isTruncated {...styles.parallaxsection.heading3} >
                                                    Shirts
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Text  {...styles.parallaxsection.subtext}>
                                                    Vestibulum tortor quam. <br /> Feugiat vitae, ultricies eget.
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Link href="/en-US/category/mens-clothing-dress-shirts">
                                                    <Button {...styles.parallaxsection.buttonoutline}>
                                                        See Look Book
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </VStack>
                                    </Box>
                                </div>
                            </HideOnMobile>
                            <HideOnDesktop>
                                <div style={{ ...styles.parallaxsection.container3mobile }}>
                                    <Box>
                                        <VStack textAlign={["left"]} align="stretch">
                                            <Box>
                                                <Heading as="h5" size="sm" style={{ ...styles.parallaxsection.stretchtext }}>
                                                    Our Favourites
                                                </Heading>
                                            </Box>
                                            <Box>
                                                <Text fontSize={["2.7rem"]} isTruncated {...styles.parallaxsection.heading3mobile} >
                                                    Shirts
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Text  {...styles.parallaxsection.subtext}>
                                                    Vestibulum tortor quam. <br /> Feugiat vitae, ultricies eget.
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Link href="/en-US/category/mens-clothing-dress-shirts">
                                                    <Button {...styles.parallaxsection.buttonoutline}>
                                                        See Look Book
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </VStack>
                                    </Box>
                                </div>
                            </HideOnDesktop>

                        </Container>
                    </Background>
                </div>
            </Parallax>

            <Parallax
                className="parallaxsection"
                bgImage={getAssetUrl('static/img/photo/serrah-galos-494312-unsplash-parallax.jpg')}
                bgImageStyle={{
                    aspectRatio: "32/10",
                    objectFit: "cover",
                    height: "100%",
                    left: "50%"
                }}
                strength={400}
                style={{ height: "100vh" }}
            >
                <div style={{ height: '100vh' }}>
                    <Background>
                        <Container>
                            <HideOnMobile>
                                <div style={insideStyles}>
                                    <Box>
                                        <VStack>

                                            <Box>

                                                <Heading as="h1" size="3xl" isTruncated {...styles.parallaxsection.heading4} >
                                                    Men's Collection
                                                </Heading>

                                            </Box>
                                            <Box>
                                                <Link href="/en-US/category/mens-clothing">
                                                    <Button {...styles.parallaxsection.buttonsolidlarge}>
                                                        See Look Book
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </VStack>
                                    </Box>
                                </div>
                            </HideOnMobile>
                            <HideOnDesktop>
                                <div style={insideStylesMobile}>
                                    <Box>
                                        <VStack>

                                            <Box>
                                                <Text isTruncated {...styles.parallaxsection.heading4mobile} >
                                                    Men's <br /> Collection
                                                </Text>

                                            </Box>
                                            <Box>
                                                <Link href="/en-US/category/mens-clothing">
                                                    <Button {...styles.parallaxsection.buttonsolidlarge}>
                                                        See Look Book
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </VStack>
                                    </Box>
                                </div>
                            </HideOnDesktop>
                        </Container>
                    </Background>
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
