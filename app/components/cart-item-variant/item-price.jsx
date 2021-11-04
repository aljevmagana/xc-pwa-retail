/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage, FormattedNumber} from 'react-intl'
import {Stack, Text} from '@chakra-ui/react'
import useBasket from '../../commerce-api/hooks/useBasket'
import {useCartItemVariant} from '.'
import {DEFAULT_CURRENCY} from '../../constants'

/**
 * In the context of a cart product item variant, this component renders the item's
 * pricing, taking into account applied discounts as well as base item prices.
 */
const ItemPrice = ({currency, ...props}) => {
    const variant = useCartItemVariant()
    const basket = useBasket()

    const {price, priceAfterItemDiscount} = variant

    const displayPrice = priceAfterItemDiscount ? Math.min(price, priceAfterItemDiscount) : price

    const hasDiscount = displayPrice !== price

    return (
        <Stack
            textAlign={["right", "center"]}
            alignItems={["right", "center"]}
        >
            <Text fontSize="0.9rem">
                <FormattedNumber
                    style="currency"
                    currency={currency || basket.currency || DEFAULT_CURRENCY}
                    value={displayPrice}
                />
            
                {hasDiscount && (
                    <Text
                        as="span"
                        fontSize="0.75rem"
                        fontWeight="normal"
                        textDecoration="line-through"
                        color="gray.500"
                        marginLeft={1}
                    >
                        <FormattedNumber
                            style="currency"
                            currency={currency || basket.currency || DEFAULT_CURRENCY}
                            value={price}
                        />
                    </Text>
                )}
            </Text>
        </Stack>
    )
}

ItemPrice.propTypes = {
    currency: PropTypes.string
}

export default ItemPrice
