/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isServer } from '../../../utils/utils'
// Components
import { AspectRatio, Box, Heading, Image, Flex, Text, Fade, Spacer, Stack, useMultiStyleConfig } from '@chakra-ui/react'
import { Parallax, Background } from 'react-parallax'
import { HideOnMobile, HideOnDesktop } from '../../../components/responsive'
// Utilities
import { getAssetUrl } from 'pwa-kit-react-sdk/ssr/universal/utils'

//Image
const imageBanner = getAssetUrl('static/img/photo/erii-gutierrez-487083-unsplash.jpg');
// Project Components
import Breadcrumb from '../../../components/breadcrumb'

const PageHeader = ({ category, productSearchResult, isLoading, searchQuery, ...otherProps }) => {
    const styles = useMultiStyleConfig('PlpHeading')



    return (
        <Box width="100%" {...otherProps} data-testid="sf-product-list-breadcrumb">
            <Spacer />
            <>
                <HideOnDesktop>
                    <Box {...styles.plpHeadingImageMobile}>
                        <Parallax
                            className="parallaxsection"
                            bgImage={imageBanner}
                            strength={400}
                            bgImageStyle={{
                                aspectRatio: "32/10",
                                objectFit: "cover",
                                height: "58.5vh",
                                
                            }}
                            style={{maxHeight:"50vh"}}

                        >

                            <Box height={['50vh', '85vh']}>
                                <AspectRatio style={{ paddingBottom: "100%" }} ratio={32 / 10}>
                                    <Background>
                                        <Box style={{ position: "absolute", zIndex: "1", top: "15vh" }}>
                                            <Stack>
                                                <Flex align="center" justify="center">
                                                    {' Home / ', category && <Breadcrumb variant='plpContainer' colour='white' categories={category.parentCategoryTree} />}
                                                    {searchQuery && <Text>Search Results for</Text>}
                                                </Flex>
                                                {/* Category Title */}
                                                <Flex color="white" align="center" justify="center">
                                                    <Heading fontSize={["2.025rem", "4.05rem"]} marginBottom="3vh" variant="plpHeading">
                                                        {`${category?.name || searchQuery || ''}`}
                                                    </Heading>
                                                    {/* <Heading as="h2" size="lg" marginRight={2}>
                                                        {isServer ? (
                                                            <Fragment>({productSearchResult?.total})</Fragment>
                                                        ) : (
                                                            // Fade in the total when available. When it's changed or not available yet, do not render it
                                                            !isLoading && <Fade in={true}>({productSearchResult?.total})</Fade>
                                                        )}
                                                    </Heading> 
                                                */}
                                                </Flex>
                                                <Flex color="white !important" align="center" justify="center">
                                                    <Text textAlign="center" padding={"0 1rem"} fontSize={["1rem", "1.215rem"]}>Lorem ipsum Description,  consectetur adipisicing elit, sed do eiusmod tempor incididunt</Text>
                                                </Flex>
                                            </Stack>
                                        </Box>
                                    </Background>
                                </AspectRatio>
                            </Box>
                        </Parallax>
                    </Box>
                </HideOnDesktop>
                <HideOnMobile>
                    <Box {...styles.plpHeadingImage}>
                        <Parallax
                            className="parallaxsection"
                            bgImage={imageBanner}
                            strength={400}
                            bgImageStyle={{
                                aspectRatio: "32/10",
                                objectFit: "cover",
                                height: "62vh",
                                top: "0vh",
                            }}
                            style={{maxHeight:"57vh"}}

                        >

                            <Box height={['50vh', '85vh']}>
                                <AspectRatio style={{ paddingBottom: "100%" }} ratio={32 / 10}>
                                    <Background>
                                        <Box style={{ position: "absolute", zIndex: "1", top: "15vh" }}>
                                            <Stack>
                                                <Flex align="center" justify="center">
                                                    {' Home / ', category && <Breadcrumb variant='plpContainer' colour='white' categories={category.parentCategoryTree} />}
                                                    {searchQuery && <Text>Search Results for</Text>}
                                                </Flex>
                                                {/* Category Title */}
                                                <Flex color="white" align="center" justify="center">
                                                    <Heading fontSize={["2.025rem", "4.05rem"]} marginBottom="3vh" variant="plpHeading">
                                                        {`${category?.name || searchQuery || ''}`}
                                                    </Heading>
                                                    {/* <Heading as="h2" size="lg" marginRight={2}>
                                                        {isServer ? (
                                                            <Fragment>({productSearchResult?.total})</Fragment>
                                                        ) : (
                                                            // Fade in the total when available. When it's changed or not available yet, do not render it
                                                            !isLoading && <Fade in={true}>({productSearchResult?.total})</Fade>
                                                        )}
                                                    </Heading> 
                                                */}
                                                </Flex>
                                                <Flex color="white !important" align="center" justify="center">
                                                    <Text textAlign="center" fontSize={["1rem", "1.215rem"]}>Lorem ipsum Description,  consectetur adipisicing elit, sed do eiusmod tempor incididunt</Text>
                                                </Flex>
                                            </Stack>
                                        </Box>
                                    </Background>
                                </AspectRatio>
                            </Box>
                        </Parallax>
                    </Box>
                </HideOnMobile>
            </>
        </Box>
    )
}

PageHeader.propTypes = {
    category: PropTypes.object,
    productSearchResult: PropTypes.object,
    isLoading: PropTypes.bool,
    searchQuery: PropTypes.string
}

export default PageHeader
