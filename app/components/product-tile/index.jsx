/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { WishlistIcon, WishlistSolidIcon } from '../icons'

//Font Awesome Icons
import {
    FaExpandArrowsAlt,
    FaSearch,
    FaShoppingCart
} from 'react-icons/fa';

// Components
import {
    AspectRatio,
    Button,
    Badge,
    Box,
    Center,
    Flex,
    Grid,
    Icon,
    Img,
    IconButton,
    ScaleFade,
    Skeleton as ChakraSkeleton,
    Stack,
    Text,
    useDisclosure,
    useMultiStyleConfig,
    Wrap,
    WrapItem
} from '@chakra-ui/react'

// Hooks
import { useIntl } from 'react-intl'

// Other
import { productUrlBuilder } from '../../utils/url'
import Link from '../link'
import withRegistration from '../../hoc/with-registration'
import { useVariant, useVariationAttributes } from '../../hooks';

const IconButtonWithRegistration = withRegistration(IconButton)

// Component Skeleton
export const Skeleton = () => {
    const styles = useMultiStyleConfig('ProductTile')

    //Transition effect
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Box data-testid="sf-product-tile-skeleton">
            <Stack spacing={2}>
                <Box {...styles.imageWrapper}>
                    <AspectRatio ratio={4 / 3} {...styles.image}>
                        <ChakraSkeleton />
                    </AspectRatio>
                </Box>
                <ChakraSkeleton width="80px" height="20px" />
                <ChakraSkeleton width={{ base: '120px', md: '220px' }} height="12px" />
            </Stack>
        </Box>
    )
}

/**
 * The ProductTile is a simple visual representation of a product search hit
 * object. It will show it's default image, name and price.
 */
const ProductTile = (props) => {
    const intl = useIntl()

    // eslint-disable-next-line react/prop-types
    const {
        category,
        productSearchItem,
        // eslint-disable-next-line react/prop-types
        staticContext,
        onAddToWishlistClick,
        onRemoveWishlistClick,
        isInWishlist,
        isWishlistLoading,
        onQuickViewClick,
        handleAddToCart,
        ...rest

    } = props
    const { currency, image, price, productName } = productSearchItem
    const styles = useMultiStyleConfig('ProductTile', { isLoading: isWishlistLoading })

    return (

        <Grid>
            <Link
                data-testid="product-tile"
                to={productUrlBuilder({ id: productSearchItem?.productId }, intl.local)}
                {...styles.container}
                {...rest}
            >
                <Box>
                    <Box className={'plp-sub-product-tile-container'} {...styles.imageWrapper}>
                        {
                            /* For Update Once the Actual Field is available this needs to be dynamic */
                            (productSearchItem?.price < 70) ? <Badge variant="plpBadge">Fresh</Badge> : ""

                        }
                        <AspectRatio {...styles.image} ratio={9 / 14}>
                            <>
                                <Img className={'plp-sub-product-tile-image'} alt={image.alt} src={image.disBaseLink} />
                            </>
                        </AspectRatio>

                        {onAddToWishlistClick && onRemoveWishlistClick && (
                            <>
                                {isInWishlist ? (
                                    <IconButton
                                        aria-label={intl.formatMessage({
                                            defaultMessage: 'wishlist-solid'
                                        })}
                                        icon={<WishlistSolidIcon />}
                                        variant="unstyled"
                                        {...styles.iconButton}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (isWishlistLoading) return
                                            onRemoveWishlistClick()
                                        }}
                                    />
                                ) : (
                                    <IconButtonWithRegistration
                                        aria-label={intl.formatMessage({
                                            defaultMessage: 'wishlist'
                                        })}
                                        icon={<WishlistIcon />}
                                        variant="unstyled"
                                        {...styles.iconButton}
                                        onClick={() => {
                                            if (isWishlistLoading) return
                                            onAddToWishlistClick()
                                        }}
                                    />
                                )}
                            </>
                        )}

                        <Wrap className="plp-overlay-container" {...styles.productOverlay} spacing="5px" justify="center">
                            {/* <WrapItem>
                                <Center w="40px" h="40px">
                                    <Button
                                        disabled={(productSearchItem?.variationAttributes.length > 1) ? true : false}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleAddToCart()
                                        }}
                                        className="button-left"
                                        colorScheme="gray"
                                        variant="outline"
                                        {...styles.productOverlayButtonOutline}
                                    >
                                        <Icon as={FaShoppingCart} />
                                    </Button>
                                </Center>
                            </WrapItem> */}
                            <WrapItem>
                                <Center w="auto" h="40px">
                                    <Button {...styles.productOverlayButton} colorScheme="gray">
                                        <Icon as={FaSearch} /> <Text>View</Text>
                                    </Button>
                                </Center>
                            </WrapItem>
                            {/* <WrapItem>
                                <Center w="40px" h="40px">
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onQuickViewClick()
                                        }}
                                        colorScheme="gray"
                                        variant="outline"
                                        {...styles.productOverlayButtonOutline}
                                    >
                                        <Icon as={FaExpandArrowsAlt} />
                                    </Button>
                                </Center>
                            </WrapItem> */}
                        </Wrap>
                    </Box>
                </Box>

            </Link>

            <Box {...styles.producttext}>
                {/* Price */}
                <Text {...styles.categoryname} aria-label="cateogry name">
                    {category}
                </Text>

                <Link>
                    {/* Title */}
                    <Text {...styles.title} aria-label="product name">
                        {productName}
                    </Text>
                </Link>

                {/* Price */}
                <Text {...styles.price} aria-label="price">
                    {intl.formatNumber(price, { style: 'currency', currency })}
                </Text>
            </Box>

        </Grid>


    )
}

ProductTile.displayName = 'ProductTile'

ProductTile.propTypes = {
    /**
     * The product search hit that will be represented in this
     * component.
     */
    productSearchItem: PropTypes.object.isRequired,
    /**
     * Types of lists the product/variant is added to. (eg: wishlist)
     */
    isInWishlist: PropTypes.bool,
    /**
     * Callback function to be invoked when the user add item to wishlist
     */
    onAddToWishlistClick: PropTypes.func,
    /**
     * Callback function to be invoked when the user removes item to wishlist
     */
    onRemoveWishlistClick: PropTypes.func,
    isWishlistLoading: PropTypes.bool
}

export default ProductTile
