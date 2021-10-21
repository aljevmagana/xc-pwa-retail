/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Box, Flex, Stack, Text, Select, Grid, GridItem, HStack} from '@chakra-ui/react'
import CartItemVariant from '../cart-item-variant'
import CartItemVariantImage from '../cart-item-variant/item-image'
import CartItemVariantName from '../cart-item-variant/item-name'
import CartItemVariantAttributes from '../cart-item-variant/item-attributes'
import CartItemVariantPrice from '../cart-item-variant/item-price'
import LoadingSpinner from '../loading-spinner'
import {noop} from '../../utils/utils'
import {useProduct} from '../../hooks'

/**
 * Component representing a product item usually in a list with details about the product - name, variant, pricing, etc.
 * @param {Object} product Product to be represented in the list item.
 * @param {node} primaryAction Child component representing the most prominent action to be performed by the user.
 * @param {node} secondaryActions Child component representing the other actions relevant to the product to be performed by the user.
 * @param {func} onItemQuantityChange callback function to be invoked whenever item quantity changes.
 * @param {boolean} showLoading Renders a loading spinner with overlay if set to true.
 * @returns A JSX element representing product item in a list (eg: wishlist, cart, etc).
 */
const ProductItem = ({
    product,
    primaryAction,
    secondaryActions,
    onItemQuantityChange = noop,
    showLoading = false
}) => {
    const {stepQuantity, stockLevel} = useProduct(product)
    console.log(product)
    return (
        <Box position="relative" data-testid={`sf-cart-item-${product.productId}`} borderBottom="1px solid" borderBottomColor="#e9ecef">
            <CartItemVariant variant={product}>
                {showLoading && <LoadingSpinner />}
                <Stack align="flex-start">
                    <Flex width="full" alignItems="flex-start" backgroundColor="white">
                        <Grid templateColumns="repeat(12, 1fr)" alignItems="center" padding="1.2rem 2rem" >
                            <GridItem colSpan={5}>
                                <HStack>
                                    <CartItemVariantImage width={['80px', '80px']} mr={4} />
                                    <Stack spacing={1}>
                                        <CartItemVariantName />
                                        <CartItemVariantAttributes />
                                    </Stack>
                                </HStack>
                            </GridItem>
                            <GridItem colSpan={2} textAlign="center">
                                <Text fontSize="0.9rem">${product.basePrice}</Text>
                            </GridItem>
                            <GridItem colSpan={2}>
                                
                                    <Select
                                        onChange={(e) => onItemQuantityChange(e.target.value)}
                                        value={product.quantity}
                                        width="50%"
                                        marginLeft="25%"
                                        size="sm"
                                    >
                                        {new Array(stockLevel).fill(0).map((_, index) => {
                                            if ((index + 1) % stepQuantity === 0) {
                                                return (
                                                    <option key={index} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                )
                                            }
                                        })}
                                    </Select>
                                
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Stack>
                                    <CartItemVariantPrice />
                                    <Box display={['none', 'block', 'block', 'block']}>
                                        {primaryAction}
                                    </Box>
                                </Stack>
                            </GridItem>
                            <GridItem colSpan={1}>
                                {secondaryActions}
                            </GridItem>

                        </Grid>
                    </Flex>
                    {!showLoading && (
                        <Box display={['block', 'none', 'none', 'none']} w={'full'}>
                            {primaryAction}
                        </Box>
                    )}
                </Stack>
            </CartItemVariant>
        </Box>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object,
    onItemQuantityChange: PropTypes.func,
    onAddItemToCart: PropTypes.func,
    showLoading: PropTypes.bool,
    isWishlistItem: PropTypes.bool,
    primaryAction: PropTypes.node,
    secondaryActions: PropTypes.node
}

export default ProductItem
