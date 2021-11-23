/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { Box, Button, Container, Grid, GridItem, Stack } from '@chakra-ui/react'
import { getAssetUrl } from 'pwa-kit-react-sdk/ssr/universal/utils'
import { Link } from 'react-router-dom'
import Section from '../../components/section'
import BasicTile from '../../components/basic-tile'

import Search from '../../components/search'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const SearchMobile = () => {
    const intl = useIntl()

    return (
        <Box data-testid="search-mobile" layerStyle="page">
            <Container>
                <Section
                    title={intl.formatMessage({
                        defaultMessage: 'Search'
                    })}
                >
                    <Search />
                </Section>
            </Container>
        </Box>
    )
}

SearchMobile.getTemplateName = () => 'searchmobile'
SearchMobile.propTypes = {
    recommendations: PropTypes.array,
    isLoading: PropTypes.bool
}

SearchMobile.getProps = async () => { }

export default SearchMobile
