/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Box} from '@chakra-ui/react'
import Seo from '../../components/seo'
import usePageDesigner from '../../commerce-api/hooks/usePageDesigner'
import PdPage from '../../components/pd'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = () => {
    const pageDesigner = usePageDesigner()

    useEffect(() => {
        pageDesigner.getPage('homepage')
    }, [])
    const page = pageDesigner.page

    return (
        <Box data-testid="home-page" layerStyle="page">
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />
            {pageDesigner?.loaded && <PdPage pageType={page.typeId} regions={page.regions} />}
        </Box>
    )
}

Home.getTemplateName = () => 'home'
Home.propTypes = {
    recommendations: PropTypes.array,
    isLoading: PropTypes.bool
}

Home.getProps = async () => {}

export default Home
