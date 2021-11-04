/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {
    Box,
    Button, 
    Stack, 
    Text, 
    Select, 
    Grid, 
    GridItem, 
    HStack,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useNumberInput
} from '@chakra-ui/react'
import CartItemVariant from '../cart-item-variant'
import CartItemVariantImage from '../cart-item-variant/item-image'
import CartItemVariantName from '../cart-item-variant/item-name'
import CartItemVariantAttributes from '../cart-item-variant/item-attributes'
import CartItemVariantPrice from '../cart-item-variant/item-price'
import LoadingSpinner from '../loading-spinner'
import {noop} from '../../utils/utils'
import {useProduct} from '../../hooks'
import { HideOnDesktop, HideOnMobile } from '../responsive'

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

    function HookUsage() {
        const {
          getInputProps,
          getIncrementButtonProps,
          getDecrementButtonProps,
        } = useNumberInput({
          step: stepQuantity,
          defaultValue: product.quantity,
          min: 1,
          max: stockLevel,
          precision: 0,
          onChange: (value) => {
            onItemQuantityChange(parseInt(value))
        },
        })
      
        const inc = getIncrementButtonProps()
        const dec = getDecrementButtonProps()
        const input = getInputProps()
      
        return (
          <HStack marginLeft={["45%", "5%"]} marginRight={[0, "5%"]}>  
            <Text fontSize="0.6875rem" color="#868e96" px=".2rem" {...dec}>-</Text>
            <Input 
                {...input} 
                textAlign="center" 
                width="50%"
                minWidth="40px" 
                height={["50%", "calc(1.5em + 1.2rem + 2px)"]} 
                fontSize="0.9rem"
                borderStyle={["none", "solid"]}
            />
            <Text fontSize="0.6875rem" color="#868e96" px=".2rem" {...inc}  >+</Text>
          </HStack>
        )
      }
    
    return (
        <Box position="relative" data-testid={`sf-cart-item-${product.productId}`} borderBottom="1px solid" borderBottomColor="#e9ecef" width="100%">
            <CartItemVariant variant={product}>
                {showLoading && <LoadingSpinner />}
                <Stack>
                    <Grid templateColumns={["repeat(5, 1fr)","repeat(12, 1fr)"]} alignItems={["none", "center"]} padding="1.2rem 2rem" gap={[4, 0]}>
                        <GridItem colSpan={[4, 5]} minWidth="min-content">
                            <HStack>
                                <CartItemVariantImage width={['80px', '80px']} mr={[0, 4]} />
                                <Stack spacing={1} fontSize="0.9rem">
                                    <CartItemVariantName />
                                    <CartItemVariantAttributes />
                                </Stack>
                            </HStack>
                        </GridItem>
                        <HideOnDesktop>
                            <GridItem colSpan={1} minWidth="min-content" float="right" alignItems="start">
                                {secondaryActions}
                            </GridItem>
                        </HideOnDesktop>
                        <GridItem colSpan={2} textAlign="left" display={["block", "none"]}>
                            <Text fontSize="0.9rem" color="#868e96">Price per item</Text>
                        </GridItem>    
                        <GridItem colSpan={[3, 2]} textAlign={["right", "center"]}>
                            <Text fontSize="0.9rem">${product.basePrice}</Text>
                        </GridItem>
                        <GridItem colSpan={2} textAlign="left" display={["block", "none"]}>
                            <Text fontSize="0.9rem" color="#868e96">Quantity</Text>
                        </GridItem>
                        <GridItem GridItem colSpan={[3, 2]} minWidth="min-content" alignContent="center" textAlign="center">
                            <HookUsage />
                        </GridItem>
                        <GridItem colSpan={2} textAlign="left" display={["block", "none"]}>
                            <Text fontSize="0.9rem" color="#868e96">Total Price</Text>
                        </GridItem>
                        <GridItem colSpan={[3, 2]} minWidth="min-content">
                            <Stack>
                                <CartItemVariantPrice />
                            </Stack>
                        </GridItem>
                        <HideOnMobile>
                            <GridItem colSpan={1} minWidth="min-content">
                                {secondaryActions}
                            </GridItem>
                        </HideOnMobile>

                    </Grid>
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
