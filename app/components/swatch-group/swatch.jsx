/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Button, Box, Center, useMultiStyleConfig, Text} from '@chakra-ui/react'
import {Link as RouteLink} from 'react-router-dom'

/**
 * The Swatch Component displays item inside `SwatchGroup`
 */
const Swatch = (props) => {
    const {
        disabled,
        selected,
        label,
        children,
        href,
        variant = 'square',
        onChange,
        value,
        name
    } = props
    const styles = useMultiStyleConfig('SwatchGroup', {variant, disabled, selected})

    let hoverStyle = {}
    let buttonHeight = ""
    let checkedStyle ={}
    if(variant !== 'circle'){
        buttonHeight="30px"
        hoverStyle = {
            background: "#868e96",
            color: "white",
        }
        checkedStyle = {
            background: "#868e96",
            color: "white"
        }
    } else{
        checkedStyle={
            borderColor: "#495057",
            border: "2px"
        }
        hoverStyle = {
            borderColor: "#696969"
        }
    }
    return (
        <Button
            {...styles.swatch}
            as={RouteLink}
            to={href}
            aria-label={name}
            onClick={(e) => {
                e.preventDefault()
                onChange(value, href)
            }}
            aria-checked={selected}
            variant="outline"
            border="1px"
            borderColor="#ced4da"
            fontSize="0.6875rem"
            _checked={checkedStyle}
            maxHeight={buttonHeight}
            _hover={hoverStyle}
        >
            <Text casing="uppercase">
                <Center {...styles.swatchButton}>
                    {children}
                    {label && <Box>{label}</Box>}
                </Center>
            </Text>
        </Button>
    )
}

Swatch.displayName = 'Swatch'

Swatch.propTypes = {
    /**
     * The children to be rendered within swatch item.
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    /**
     * Indicates whether the option is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Indicates whether the option is selected.
     * This props is provided internally by SwatchGroup
     */
    selected: PropTypes.bool,
    /**
     * The shape of the Swatch
     */
    variant: PropTypes.oneOf(['square', 'circle']),
    /**
     * The label of the option.
     */
    label: PropTypes.string,
    /**
     *  The url of this option
     */
    href: PropTypes.string,
    /**
     * This function is called whenever the user selects an option.
     * It is passed the new value.
     */
    onChange: PropTypes.func,
    /**
     * The value for the option.
     */
    value: PropTypes.string,
    /**
     * The display value for each swatch
     */
    name: PropTypes.string
}

export default Swatch
