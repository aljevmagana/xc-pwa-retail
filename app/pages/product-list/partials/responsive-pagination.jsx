/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Flex,
    Link,
    Radio,
    RadioGroup,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Spacer,
    Stack,
    Text,
    useMultiStyleConfig
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Pagination from 'react-responsive-pagination';
import { useIntl } from 'react-intl'
import { Link as RouteLink, useHistory } from 'react-router-dom'

// Helpers
const isServer = typeof window === 'undefined'

const stylingpagination = {
    ".pagination": {
        justifyContent: "center",
        display: "flex",
        paddingLeft: "0",
        listStyle: "none",
        maxWidth: "280px"

        
    },
    ".page-item .page-link": {
        position: "relative",
        display: "block",
        margin: "0 0px",
        border: "1px solid #dee2e6",
        padding: "5px 10px",
        borderRadius: "0px",
        color: "#868e96",
        textDecoration: "none",
        outline: "transparent",
        lineHeight: 1.25,
        marginLeft: "-1\npx"
        
    },
    ".page-item a.page-link:hover": { backgroundColor: "#e9ecef"},
    ".page-item.active .page-link": {
        color: "#ffffff",
        backgroundColor: "#9a6ee2",
    },
    ".page-item.active .page-link:hover": {
        color: "#ffffff",
        backgroundColor: "#9a6ee2",
    },
    ".page-item.active .sr-only": {
        display:"none"
    },
    ".page-item.disabled .page-link": {
        color: "#6c757d",
        pointerEvents: "none",
        cursor: "auto",
        display: "block !important",
    },
    ".page-item:first-child": {
        color: "#868e96",

        'span:first-child': {
            display:"none"
        },
        'span.sr-only': {
            position:"relative",
        },
        "a.page-link": {
            color: "#868e96"
        },
        "a.page-link:hover": {
            backgroundColor: "#e9ecef"
        }
    },
    ".page-item:last-child": {
        color: "#868e96",
        'span:first-child': {
            display:"none"
        },
        'span.sr-only': {
            position:"relative",
        },
        "a.page-link": {
            color: "#868e96"
        },
        "a.page-link:hover": {
            backgroundColor: "#e9ecef"
        }
    },
}


const ResponsivePagination = (props) => {
    const intl = useIntl()
    const { urls, currentURL, currentTotal, ...rest } = props
    const [currentPage, setCurrentPage] = useState(1 + urls.indexOf(currentURL));

    const urlList = [];
    const history = useHistory();
    const styles = useMultiStyleConfig('ResponsivePagination');

    urls.forEach((url) => {
        urlList.push(url)
    })

    const prev = urls[currentPage - 1]
    const next = urls[currentPage + 1]
    
    useEffect(() => {
        try {
            urls.forEach((url) => {
                urlList.push(url)
            })

            history.push(urlList[currentPage - 1])
        } catch (error) {

        }
    }, [currentPage])


    const totalPages = urls.length;


    const setPage = (value) => {
        setCurrentPage(value)
    }

    return (
        <div>
            <Box className={'responsive-pagination'} css={stylingpagination} >
                <Pagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setPage}
                    maxWidth={400}
                />
            </Box>
        </div>
    )
}

ResponsivePagination.propTypes = {

}

export default ResponsivePagination
