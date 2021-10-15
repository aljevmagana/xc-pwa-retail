/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { Link as RouteLink, useHistory } from 'react-router-dom'

// Components
import {
    Button,
    ButtonGroup,
    Flex,
    Link,
    Stack,
    Select,
    Text,

    // Hooks
    useStyleConfig
} from '@chakra-ui/react'

// Icons
import { ChevronLeftIcon, ChevronRightIcon } from '../../../components/icons'

// Constants
const SELECT_ID = 'pagination'

// Helpers
const isServer = typeof window === 'undefined'

/**
 * The pagination component is a simple component allowing you to navigate
 * from one page  to the next by means of previous or next buttons, or directly
 * using a select drop down.
 */
const Pagination = (props) => {
    const intl = useIntl()
    const styles = useStyleConfig('PlpPagination')
    const history = useHistory()
    const { urls, currentURL, ...rest } = props

    const currentIndex = urls.indexOf(currentURL) > 0 ? urls.indexOf(currentURL) : 0
    const prev = urls[currentIndex - 1]
    const next = urls[currentIndex + 1]

    // Determine the current page index.
    return (
        <Flex data-testid="sf-pagination" className="sf-pagination" {...styles.container} {...rest}>
            {/* Previous Button */}
            <Button

                as={isServer ? Link : RouteLink}
                // Because we are using a button component as a link, the isDisabled flag isn't working
                // as intended, the workaround is to use the current url when its disabled.
                href={prev || currentURL}
                to={prev || currentURL}
                aria-label="Previous Page"
                /* isDisabled={!prev} */
                {...styles.prevbutton}
            >
                <Text {...styles.text} >
                    {intl.formatMessage({
                        id: 'pagination.actions.prev',
                        defaultMessage: 'Prev'
                    })}
                </Text>
            </Button>

            {/* Direct Page Selection */}
            {/* <Flex paddingLeft={4} paddingRight={4}>
                <Select
                    id={SELECT_ID}
                    onChange={(e) => {
                        history.push(e.target.value)
                    }}
                    value={currentURL}
                    height={11}
                >
                    {urls.map((href, index) => (
                        <option key={index} value={href}>
                            {index + 1}
                        </option>
                    ))}
                </Select>

                <Text {...styles.text}>
                    {intl.formatMessage({
                        id: 'pagination.actions.current_page_verb',
                        defaultMessage: 'of'
                    })}{' '}
                    {urls.length}
                </Text>
            </Flex> */}

            <Flex>
                <Stack direction="row" spacing={0} >
                    {urls.map((href, index) => (

                        <Button
                            key={index}
                            value={href}
                            onClick={(e) => {
                                history.push(e.target.value)
                            }}
                            style={ (index == currentIndex) ? {
                                zIndex: 3,
                                color: "#fff",
                                backgroundColor: "#9a6ee2",
                                borderColor: "#9a6ee2"
                            } : {} }
                            _active={{
                                bg: "#dddfe2",
                                transform: "scale(0.98)",
                                borderColor: "#bec3c9",
                            }}
                            {...styles.buttonnumber}
                        >

                            {index + 1}

                        </Button>



                    ))}
                </Stack>
            </Flex>

            {/* Next Button */}
            <Button
                as={isServer ? Link : RouteLink}
                // Because we are using a button component as a link, the isDisabled flag isn't working
                // as intended, the workaround is to use the current url when its disabled.
                href={next || currentURL}
                to={next || currentURL}
                aria-label="Next Page"
                /* isDisabled={!next} */
                {...styles.nextbutton}
            >
                <Text {...styles.text}>
                    {intl.formatMessage({
                        id: 'pagination.actions.next',
                        defaultMessage: 'Next'
                    })}
                </Text>
            </Button>
        </Flex>
    )
}

Pagination.displayName = 'Pagination'

Pagination.propTypes = {
    /**
     * A list of URL's representing the pages that can be navigated to.
     */
    urls: PropTypes.array.isRequired,
    /**
     * The URL representing the current page
     */
    currentURL: PropTypes.string
}

export default Pagination
