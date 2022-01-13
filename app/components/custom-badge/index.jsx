/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Box, Img, Text, AspectRatio, useTheme,useStyleConfig} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

import {ChevronRightIcon} from '../icons'

/**
 * CustomBadge component is used on content pages like home page.
 * This component is used to promote categories, it consistents
 * of an image and a category title link.
 */
const CustomBadge = ({product}) => {
    const styles = useStyleConfig('CustomBadge')
    return (
        <Box {...styles.ribbon} className="ribbon ribbon-info">
            {product?.c_badge}
        </Box>
    )
}

CustomBadge.displayName = 'CustomBadge'

export default CustomBadge
