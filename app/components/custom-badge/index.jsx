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
 * BasicTile component is used on content pages like home page.
 * This component is used to promote categories, it consistents
 * of an image and a category title link.
 */
const CustomBadge = () => {
    const styles = useStyleConfig('CustomBadge')
    return (
        <Box>
        <div class="ribbon ribbon-info">{...styles.ribbon} Fresh</div>
        </Box>
    )
}

CustomBadge.displayName = 'CustomBadge'

BasicTile.propTypes = {
}

export default CustomBadge
