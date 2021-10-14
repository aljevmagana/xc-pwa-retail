/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Link as RouteLink} from 'react-router-dom'
import {useIntl} from 'react-intl'

// Components
import {
    Breadcrumb as ChakraBreadcrumb,
    BreadcrumbItem as ChakraBreadcrumbItem,
    BreadcrumbLink as ChakraBreadcrumbLink,
    // Hooks
    useStyleConfig
} from '@chakra-ui/react'

// Icons
import {ChevronRightIcon} from '../icons'

// Others
import {categoryUrlBuilder} from '../../utils/url'

/**
 * A simplification of the Chakra `Breadcrumb` component for our project needs. Given
 * a list of categories, display a breadcrumb and it's items.
 */
const Breadcrumb = ({variant, colour, categories, ...rest}) => {
    const intl = useIntl()
    const styles = useStyleConfig('Breadcrumb')

    //Dynamic styling props
    const renderStyle = (variant) ? {...styles.container} : {...styles[variant]}

    return (
        <ChakraBreadcrumb
            className="sf-breadcrumb"
            {...renderStyle}
            /* separator={<ChevronRightIcon {...styles.icon} />} */
            separator={'/'}
            {...rest}
            style={{color:colour}}
        >
            {categories.map((category) => (
                <ChakraBreadcrumbItem key={category.id} data-testid="sf-crumb-item">
                    <ChakraBreadcrumbLink 
                        as={RouteLink}
                        to={categoryUrlBuilder(category, intl.locale)}
                        {...styles.link}
                    >
                        {category.name}
                    </ChakraBreadcrumbLink>
                </ChakraBreadcrumbItem>
            ))}
        </ChakraBreadcrumb>
    )
}

Breadcrumb.displayName = 'Breadcrumb'

Breadcrumb.propTypes = {
    /**
     * The categories to be displayed in this breadcrumb.
     */
    categories: PropTypes.array,
    colour: PropTypes.string
}

export default Breadcrumb
