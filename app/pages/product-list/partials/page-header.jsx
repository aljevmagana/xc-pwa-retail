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

// Utilities
import { getAssetUrl } from 'pwa-kit-react-sdk/ssr/universal/utils'

//Image
const imageBanner = getAssetUrl('static/img/photo/erii-gutierrez-487083-unsplash.jpg');
// Project Components
import Breadcrumb from '../../../components/breadcrumb'

const PageHeader = ({ category, productSearchResult, isLoading, searchQuery, ...otherProps }) => {
    const styles = useMultiStyleConfig('PlpHeading', {
        variant: 'plpHeadingImage',
    })



    return (
        <Box width="100%" {...otherProps} data-testid="sf-product-list-breadcrumb">
            <Spacer />

            <>
                <Box>
                    <AspectRatio ratio={32/9}>
                        <Box>
                            <Box style={{position:"absolute", zIndex:"1"}}>
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
                                    <Text fontSize="2.1vh">Lorem ipsum Description,  consectetur adipisicing elit, sed do eiusmod tempor incididunt</Text>
                                </Flex>
                                </Stack>                            
                            </Box>
                            <Box {...styles}>
                            <Image src={imageBanner} alt="categoryBanner" objectFit="cover" />
                            </Box>
                        </Box>
                    </AspectRatio>

                </Box>
            </>

            {/* Breadcrumb */}


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
