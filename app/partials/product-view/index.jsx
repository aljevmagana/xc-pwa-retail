/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useHistory, useLocation} from 'react-router-dom'
import {FormattedMessage, useIntl} from 'react-intl'

import {
    Flex,
    Heading,
    Button,
    Skeleton,
    Box,
    Text,
    VStack,
    HStack,
    Select,
    Fade,
    useDisclosure,
    useTheme,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Image
} from '@chakra-ui/react'

import {StarIcon} from '@chakra-ui/icons'

import {useProduct} from '../../hooks'

// project components
import SwatchGroup from '../../components/swatch-group'
import Swatch from '../../components/swatch-group/swatch'
import ImageGallery from '../../components/image-gallery'
import Breadcrumb from '../../components/breadcrumb'
import Link from '../../components/link'
import withRegistration from '../../hoc/with-registration'
import {DEFAULT_CURRENCY} from '../../constants'
import {Skeleton as ImageGallerySkeleton} from '../../components/image-gallery'
import AddToCartModal from '../../components/add-to-cart-modal'
import RecommendedProducts from '../../components/recommended-products'
import {HideOnDesktop, HideOnMobile} from '../../components/responsive'
import {BasketIcon, WishlistIcon, WishlistSolidIcon} from '../../components/icons'

const ProductViewHeader = ({name, price, currency, category, description}) => {
    const intl = useIntl()
    const tempReviews ={
        reviewCount: 25,
        rating: 4,
    }
    return (
        <VStack spacing={6} align="flex-start" marginBottom={[4, 4, 4, 0, 0]}>
            {/* Title */}
            <Skeleton isLoaded={name}>
                <Heading fontSize="2.7rem">{`${name}`}</Heading>
            </Skeleton>

            {/* Price */}
            <Skeleton isLoaded={price} >
                <Box marginBottom="20px">
                    <HStack spacing="25%">
                        <HStack>
                            <Text fontWeight="300" fontSize="1.35rem" aria-label="price" align="left">
                                {intl.formatNumber(price, {
                                    style: 'currency',
                                    currency: currency || DEFAULT_CURRENCY
                                })} 
                            </Text>
                            <Text as="s" fontSize="0.9rem" align="left" color="gray">
                                {intl.formatNumber((price + 1), {
                                    style: 'currency',
                                    currency: currency || DEFAULT_CURRENCY
                                })}
                            </Text>
                        </HStack>
                        <Box display="flex" mt="2" alignItems="center">
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                <StarIcon
                                    key={i}
                                    color={i < tempReviews.rating ? "purple.500" : "gray.300"}
                                    m="0.9"
                                />
                                ))}
                            <Box color="gray.600" fontSize="sm" w="100px" pl="5px">
                                {tempReviews.reviewCount} REVIEWS
                            </Box>
                        </Box>
                    </HStack>
                </Box>
                <Skeleton isLoaded={description}>
                    <Box marginBottom="15px" textAlign="left" fontSize="0.9rem" maxWidth="450">
                        <div>{description}</div>
                    </Box>
                </Skeleton>
            </Skeleton>
        </VStack>
    )
}

ProductViewHeader.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    currency: PropTypes.string,
    category: PropTypes.array
}

const ButtonWithRegistration = withRegistration(Button)

/**
 * Render a product detail view that includes name, image gallery, price,
 * variant selections, action buttons
 */
const ProductView = ({
    product,
    category,
    showFullLink = false,
    imageSize = 'md',
    isCustomerProductListLoading = false,
    addToCart,
    updateCart,
    addToWishlist,
    updateWishlist,
    isProductLoading
}) => {
    const intl = useIntl()
    const history = useHistory()
    const location = useLocation()
    const {
        isOpen: isAddToCartModalOpen,
        onOpen: onAddToCartModalOpen,
        onClose: onAddToCartModalClose
    } = useDisclosure()
    const theme = useTheme()

    const {
        showLoading,
        showInventoryMessage,
        inventoryMessage,
        quantity,
        setQuantity,
        variant,
        variationParams,
        variationAttributes,
        stepQuantity,
        stockLevel
    } = useProduct(product)
    const canAddToWishlist = !isProductLoading
    const canOrder = !isProductLoading && variant?.orderable && quantity <= stockLevel

    const renderActionButtons = () => {
        const buttons = []

        const handleCartItem = () => {
            if (!addToCart && !updateCart) return null
            if (updateCart) {
                updateCart(variant, quantity)
                return
            }
            addToCart(variant, quantity)
            onAddToCartModalOpen()
        }

        const handleWishlistItem = () => {
            if (!updateWishlist && !addToWishlist) return null
            if (updateWishlist) {
                updateWishlist(variant, quantity)
                return
            }
            addToWishlist(variant, quantity)
        }

        if (addToCart || updateCart) {
            buttons.push(
                <Button
                    key="cart-button"
                    onClick={handleCartItem}
                    disabled={!canOrder}
                    width="175px"
                    variant="outline"
                    marginBottom={4}
                    background="#343a40"
                    color="white"
                    py="30px"
                    marginTop={4}
                    fontSize="0.7875rem"
                    _hover={{
                        background: "black",
                        color: "white",
                      }}
                >
                    <BasketIcon pr="5px"/>
                    {updateCart
                        ? intl.formatMessage({defaultMessage: 'UPDATE'})
                        : intl.formatMessage({defaultMessage: 'ADD TO CART'})}
                </Button>
            )
        }

        if (addToWishlist || updateWishlist) {
            buttons.push(
                <ButtonWithRegistration
                    key="wishlist-button"
                    onClick={handleWishlistItem}
                    disabled={isCustomerProductListLoading || !canAddToWishlist}
                    isLoading={isCustomerProductListLoading}
                    width="175px"
                    variant="outline"
                    marginBottom={4}
                    ml="10px"
                    fontSize="12px"
                    color="gray" 
                    type="submit"
                    _hover={{
                        background: "gray",
                        color: "white",
                      }}
                >
                    {updateWishlist
                    ? <WishlistSolidIcon pr="5px" /> :
                    <WishlistIcon pr="5px" />
                }
                    {updateWishlist
                        ? intl.formatMessage({defaultMessage: 'UPDATE'})
                        : intl.formatMessage({defaultMessage: 'ADD TO WISHLIST'})}
                </ButtonWithRegistration>
            )
        }

        return buttons
    }

    useEffect(() => {
        if (isAddToCartModalOpen) {
            onAddToCartModalClose()
        }
    }, [location.pathname])

    return (
        <Flex direction={'column'} data-testid="product-view">
            {/* Basic information etc. title, price, breadcrumb*/}      
            <Box display={['block', 'block', 'block', 'none']}>
                <ProductViewHeader
                    name={product?.name}
                    price={product?.price}
                    currency={product?.currency}
                    category={category}
                    description={product?.shortDescription || product?.pageDescription}
                />
            </Box>
            <Flex direction={['column', 'column', 'column', 'row']}>
                <Box flex={1} mr={[0, 0, 0, 8, 8]}>
                    {product ? (
                        <>
                            <ImageGallery
                                size={imageSize}
                                imageGroups={product.imageGroups}
                                selectedVariationAttributes={variationParams}
                            />
                            <HideOnMobile>
                                {showFullLink && product && (
                                    <Link to={`/product/${product.master.masterId}`}>
                                        <Text color="gray.600">
                                            {intl.formatMessage({
                                                defaultMessage: 'See full details'
                                            })}
                                        </Text>
                                    </Link>
                                )}
                            </HideOnMobile>
                        </>
                    ) : (
                        <ImageGallerySkeleton />
                    )}
                </Box>

                {/* Variations & Quantity Selector */}
                <VStack align="stretch" spacing={8} flex={1} marginBottom={[16, 16, 16, 0, 0]} w="25%">
                    {category && (
                        <Skeleton isLoaded={category}>
                            <Breadcrumb categories={category} />
                        </Skeleton>
                    )}
                    <Box position="sticky" top="20px" zIndex={2}>
                        <Box display={['none', 'none', 'none', 'block']}>
                            <ProductViewHeader
                                name={product?.name}
                                price={product?.price}
                                currency={product?.currency}
                                category={category}
                                description={product?.shortDescription || product?.pageDescription}
                            />
                        </Box>
                        <VStack align="stretch" spacing={4}>
                            {/*
                                Customize the skeletons shown for attributes to suit your needs. At the point
                                that we show the skeleton we do not know how many variations are selectable. So choose
                                a a skeleton that will meet most of your needs.
                            */}
                            {showLoading ? (
                                <>
                                    {/* First Attribute Skeleton */}
                                    <Skeleton height={6} width={32} />
                                    <Skeleton height={20} width={64} />

                                    {/* Second Attribute Skeleton */}
                                    <Skeleton height={6} width={32} />
                                    <Skeleton height={20} width={64} />
                                </>
                            ) : (
                                <>
                                    {/* Attribute Swatches */}
                                    {variationAttributes.map((variationAttribute) => {
                                        const {
                                            id,
                                            name,
                                            selectedValue,
                                            values = []
                                        } = variationAttribute

                                        return (
                                            <SwatchGroup
                                                key={id}
                                                onChange={(_, href) => {
                                                    if (!href) return
                                                    history.replace(href)
                                                }}
                                                variant={id === 'color' ? 'circle' : 'square'}
                                                value={selectedValue?.value}
                                                displayName={selectedValue?.name || ''}
                                                label={name}
                                            >
                                                {values.map(({href, name, image, value, orderable}) => (
                                                    <Swatch
                                                        key={value}
                                                        href={href}
                                                        disabled={!orderable}
                                                        value={value}
                                                        name={name}
                                                    >
                                                        {image ? (
                                                            <Box
                                                                height="100%"
                                                                width="100%"
                                                                minWidth="32px"
                                                                backgroundRepeat="no-repeat"
                                                                backgroundSize="cover"
                                                                backgroundColor={name.toLowerCase()}
                                                                backgroundImage={
                                                                    image
                                                                        ? `url(${image.disBaseLink})`
                                                                        : ''
                                                                }
                                                            />
                                                        ) : (
                                                            name
                                                        )}
                                                    </Swatch>
                                                ))}
                                            </SwatchGroup>
                                        )
                                    })}
                                </>
                            )}

                            {/* Quantity Selector */}
                            <Box paddingBottom="40px">
                                <VStack align="stretch" maxWidth={'125px'}>
                                    <Box fontWeight="600">
                                        <HStack spacing="4px">
                                            <Text>Items</Text>
                                            <Text fontSize=".8rem" color="gray.600">(required)</Text>
                                        </HStack>
                                    </Box>
                                    <NumberInput
                                        value={quantity}
                                        onChange={(value) => {
                                            setQuantity(parseInt(value))
                                        }}
                                        min={1}
                                        step={stepQuantity}
                                        max={stockLevel}
                                        size="sm"
                                        maxW={20}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </VStack>
                        </Box>
                        <HideOnDesktop>
                            {showFullLink && product && (
                                <Link to={`/product/${product.master.masterId}`}>
                                    <Text color="gray.600">
                                        {intl.formatMessage({
                                            defaultMessage: 'See full details'
                                        })}
                                    </Text>
                                </Link>
                            )}
                        </HideOnDesktop>
                    </VStack>

                    <Box display={['none', 'none', 'none', 'block']}>
                        {!showLoading && showInventoryMessage && (
                            <Fade in={true}>
                                <Text color="orange.600" fontWeight={600} marginBottom={8}>
                                    {inventoryMessage}
                                </Text>
                            </Fade>
                        )}
                        {renderActionButtons()}
                    </Box>
                    </Box>
                </VStack>
            </Flex>
            {/*Add to Cart Button for mobile versions*/}
            <Box
                position="fixed"
                bg="white"
                width="100%"
                display={['block', 'block', 'block', 'none']}
                p={[4, 4, 6]}
                left={0}
                bottom={0}
                zIndex={2}
                boxShadow={theme.shadows.top}
            >
                {renderActionButtons()}
            </Box>

            {isAddToCartModalOpen && (
                <AddToCartModal
                    product={product}
                    variant={variant}
                    quantity={quantity}
                    isOpen={isAddToCartModalOpen}
                    onClose={onAddToCartModalClose}
                >
                    <RecommendedProducts
                        title={<FormattedMessage defaultMessage="You Might Also Like" />}
                        recommender={'pdp-similar-items'}
                        products={product && [product.id]}
                        mx={{base: -4, md: -8, lg: 0}}
                        shouldFetch={() => product?.id}
                    />
                </AddToCartModal>
            )}
        </Flex>
    )
}

ProductView.propTypes = {
    product: PropTypes.object,
    category: PropTypes.array,
    isProductLoading: PropTypes.bool,
    isCustomerProductListLoading: PropTypes.bool,
    addToCart: PropTypes.func,
    addToWishlist: PropTypes.func,
    updateCart: PropTypes.func,
    updateWishlist: PropTypes.func,
    showFullLink: PropTypes.bool,
    imageSize: PropTypes.oneOf(['sm', 'md'])
}

export default ProductView
