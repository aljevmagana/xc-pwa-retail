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
                <Box {...styles.plpHeadingImage}>
                    <Parallax
                        className="parallaxsection"
                        bgImage={imageBanner}
                        strength={400}
                        bgImageStyle={{
                            aspectRatio: "32/10",
                            objectFit: "cover",
                            height:"100%",
                            top:"4.5vh",
                            width:"100%"
                        }}
                        
                    >
                        <div style={{ height: '57vh' }}>
                            <AspectRatio style={{paddingBottom:"100%"}} ratio={32 / 10}>
                                <Background>
                                    <Box style={{ position: "absolute", zIndex: "1", top: "18vh" }}>
                                        <Stack>
                                            <Flex align="center" justify="center">
                                                {' Home / ', category && <Breadcrumb variant='plpContainer' colour='white' categories={category.parentCategoryTree} />}
                                                {searchQuery && <Text>Search Results for</Text>}
                                            </Flex>
                                            {/* Category Title */}
                                            <Flex color="white" align="center" justify="center">
                                                <Heading fontSize="6.4vh" marginBottom="3vh" variant="plpHeading">
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
                                                <Text textAlign="center" fontSize={{ sm: "1.8vh", md:"2.1vh"}}>Lorem ipsum Description,  consectetur adipisicing elit, sed do eiusmod tempor incididunt</Text>
                                            </Flex>
                                        </Stack>
                                    </Box>
                                </Background>
                            </AspectRatio>
                        </div>
                    </Parallax>
                </Box>

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
