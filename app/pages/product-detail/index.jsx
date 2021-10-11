/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import {FormattedMessage, useIntl} from 'react-intl'
import useNavigation from '../../hooks/use-navigation'
import {StarIcon} from '@chakra-ui/icons'

// Components
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Center,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Textarea,
    Text,
    Select,
    SimpleGrid,
    Stack,
    StackDivider,
    VStack,
    HStack
} from '@chakra-ui/react'

// Hooks
import useBasket from '../../commerce-api/hooks/useBasket'
import useCustomerProductLists from '../../commerce-api/hooks/useCustomerProductLists'
import {useVariant} from '../../hooks'
import useEinstein from '../../commerce-api/hooks/useEinstein'

// Project Components
import RecommendedProducts from '../../components/recommended-products'
import ProductView from '../../partials/product-view'

// Others/Utils
import {HTTPNotFound} from 'pwa-kit-react-sdk/ssr/universal/errors'

// constant
import {API_ERROR_MESSAGE, customerProductListTypes} from '../../constants'
import {rebuildPathWithParams} from '../../utils/url'
import {useHistory} from 'react-router-dom'
import {useToast} from '../../hooks/use-toast'

const ProductDetail = ({category, product, isLoading}) => {
    const {formatMessage} = useIntl()
    const basket = useBasket()
    const history = useHistory()
    const einstein = useEinstein()

    const [primaryCategory, setPrimaryCategory] = useState(category)

    const variant = useVariant(product)

    const productListEventHandler = (event) => {
        if (event.action === 'add') {
            showWishlistItemAdded(event.item?.quantity)
        }
    }

    const showError = (error) => {
        console.log(error)
        showToast({
            title: formatMessage(
                {defaultMessage: '{errorMessage}'},
                {errorMessage: API_ERROR_MESSAGE}
            ),
            status: 'error'
        })
    }

    const customerProductLists = useCustomerProductLists({
        eventHandler: productListEventHandler,
        errorHandler: showError
    })
    const navigate = useNavigation()
    const showToast = useToast()

    const handleAddToCart = async (variant, quantity) => {
        try {
            if (!variant?.orderable || !quantity) return
            // The basket accepts an array of `ProductItems`, so lets create a single
            // item array to add to the basket.
            const productItems = [
                {
                    productId: variant.productId,
                    quantity,
                    price: variant.price
                }
            ]

            basket.addItemToBasket(productItems)
        } catch (error) {
            showError(error)
        }
    }

    const showWishlistItemAdded = (quantity) => {
        const toastAction = (
            <Button variant="link" onClick={() => navigate('/account/wishlist')}>
                View
            </Button>
        )
        showToast({
            title: formatMessage(
                {
                    defaultMessage:
                        '{quantity} {quantity, plural, one {item} other {items}} added to wishlist'
                },
                {quantity}
            ),
            status: 'success',
            action: toastAction
        })
    }

    const addItemToWishlist = async (quantity) => {
        try {
            // If product-lists have not loaded we push "Add to wishlist" event to eventQueue to be
            // processed once the product-lists have loaded.

            // @TODO: move the logic to useCustomerProductLists
            // PDP shouldn't need to know the implementation detail of the event queue
            // PDP should just do "customerProductLists.addItem(item)"!
            if (!customerProductLists?.loaded) {
                const event = {
                    item: {...product, quantity},
                    action: 'add',
                    listType: customerProductListTypes.WISHLIST
                }

                customerProductLists.addActionToEventQueue(event)
            } else {
                const wishlist = customerProductLists.getProductListPerType(
                    customerProductListTypes.WISHLIST
                )
                const productListItem = wishlist.customerProductListItems?.find(
                    ({productId}) => productId === product.id
                )
                // if the product already exists in wishlist, update the quantity
                if (productListItem) {
                    await customerProductLists.updateCustomerProductListItem(wishlist, {
                        ...productListItem,
                        quantity: productListItem.quantity + parseInt(quantity)
                    })
                    showWishlistItemAdded(quantity)
                } else {
                    // other wise, just create a new product list item with given quantity number
                    await customerProductLists.createCustomerProductListItem(wishlist, {
                        productId: product.id,
                        priority: 1,
                        quantity,
                        public: false,
                        type: 'product'
                    })
                    showWishlistItemAdded(quantity)
                }
            }
        } catch (error) {
            showError(error)
        }
    }

    // This page uses the `primaryCategoryId` to retrieve the category data. This attribute
    // is only available on `master` products. Since a variation will be loaded once all the
    // attributes are selected (to get the correct inventory values), the category information
    // is overridden. This will allow us to keep the initial category around until a different
    // master product is loaded.
    useEffect(() => {
        if (category) {
            setPrimaryCategory(category)
        }
    }, [category])

    useEffect(() => {
        if (product) {
            einstein.sendViewProduct(product)
        }
    }, [product])

    // update the variation attributes parameter on the url accordingly as the variant changes
    useEffect(() => {
        const updatedUrl = rebuildPathWithParams(`${location.pathname}${location.search}`, {
            pid: variant?.productId
        })
        history.replace(updatedUrl)
    }, [variant])

    const temporaryReviews= [{
        name:"Han Solo",
        rating:"4",
        reviewText:"a falcon every thousand years",
        image:"",
        date:"OCT 2021"
    },{
        name:"Luke Skywalker",
        rating:"5",
        reviewText:"Not your son",
        image:"",
        date:"OCT 2021"
    }]

    return (
        <Box
            className="sf-product-detail-page"
            layerStyle="page"
            data-testid="product-details-page"
            justifyContent="center"
            pt="7.5%"
            pl="5%"
            pr="5%"
        >
            <Helmet>
                <title>{product?.pageTitle}</title>
                <meta name="description" content={product?.pageDescription} />
            </Helmet>

            <Stack spacing={16}>
                <ProductView
                    product={product}
                    category={primaryCategory?.parentCategoryTree || []}
                    addToCart={(variant, quantity) => handleAddToCart(variant, quantity)}
                    addToWishlist={(variant, quantity) => addItemToWishlist(quantity)}
                    isProductLoading={isLoading}
                    isCustomerProductListLoading={customerProductLists.showLoader}
                />

                {/* Information Tabs */}
                <Center>
                <Stack direction="row" w="100%" align="center">
                    <Tabs w="80%">
                        <TabList>
                            {/* Details */}
                            <Tab>Description</Tab>
                            {/* Size & Fit */}
                            <Tab>Additional Information</Tab>
                            {/* Reviews */}
                            <Tab>Reviews</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel mb={6} mt={4}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product?.longDescription
                                    }}
                                />
                            </TabPanel>
                            <TabPanel mb={6} mt={4}>
                                {formatMessage({defaultMessage: 'Coming Soon'})}
                            </TabPanel>
                            <TabPanel mb={6} mt={4}>
                                <VStack
                                  divider={<StackDivider borderColor="gray.200" />}
                                  spacing={4}
                                  align="stretch"
                                  > 
                                {temporaryReviews.map((r, i)  => {
                                    return(<>

                                        <Box maxW="lg" overflow="hidden" id={r.name + i}>
                                            <HStack>
                                                <Box alignItems="center" textAlign="center">
                                                    <Avatar name={r.name} size="lg"  src="https://bit.ly/broken-link" />
                                                    <Text fontSize="14" mt="1">{r.date}</Text>
                                                </Box>
                                                <Box m="5" >
                                                    <Heading m="5" mb="0" as="h4" size="md">{r.name}</Heading>
                                                    <Box display="flex" ml="5" mt="1">
                                                                {Array(5)
                                                                    .fill("")
                                                                    .map((_, i) => (
                                                                    <StarIcon
                                                                        boxSize="3"
                                                                        key={i}
                                                                        color={i < r.rating ? "yellow.500" : "gray.300"}
                                                                        m="0.9"
                                                                        
                                                                    />
                                                                    ))}
                                                            </Box>
                                                    <Text m="5" mt="2">{r.reviewText}</Text>
                                                </Box>
                                            </HStack>
                                        </Box>
                                    </>
                                )})}
                                    <Stack spacing={4}>
                                            <h1>
                                                <b>Leave a Review</b>
                                            </h1>
                                            <Box
                                                color="gray.500"
                                                fontWeight="normal"
                                                letterSpacing="wide"
                                                fontSize="xs"
                                                textTransform="uppercase"
                                                ml="2"
                                            >
                                                <form>
                                                <Stack spacing={4}>
                                                    <SimpleGrid columns={2} spacing={10}>
                                                        <Box>
                                                            <FormControl isRequired>
                                                                <FormLabel>Your Name</FormLabel>
                                                                <Input placeholder="Enter your name" />
                                                            </FormControl>
                                                        </Box>
                                                        <Box>
                                                        <div>Your Rating * </div>
                                                            <Select width="20%">
                                                                <option value="star5">5 Stars</option>
                                                                <option value="star4">4 Stars</option>
                                                                <option value="star3">3 Stars</option>
                                                                <option value="star2">2 Stars</option>
                                                                <option value="star1">1 Stars</option>
                                                            </Select>
                                                        </Box>
                                                    </SimpleGrid>
                                                    <FormControl isRequired>
                                                        <FormLabel>Your Email</FormLabel>
                                                        <Input placeholder="Enter your email" />
                                                    </FormControl>
                                                    <FormControl isRequired>
                                                        <FormLabel>Review Text</FormLabel>
                                                        <Textarea placeholder="Enter your review" />
                                                    </FormControl>
                                                    <ButtonGroup variant="outline">
                                                        <Button 
                                                        color="gray" 
                                                        width="125px"  
                                                        type="submit"
                                                        _hover={{
                                                            background: "gray",
                                                            color: "white",
                                                          }}
                                                        >
                                                            Post Review
                                                        </Button>
                                                    </ButtonGroup>
                                                </Stack>
                                                </form>
                                            </Box>
                                    </Stack>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Box display={['none', 'none', 'none', 'block']} flex={4}></Box>
                </Stack>
                </Center>
                

                {/* Product Recommendations */}
                <Stack spacing={16}>
                    <RecommendedProducts
                        title={<FormattedMessage defaultMessage="Complete The Set" />}
                        recommender={'complete-the-set'}
                        products={product && [product.id]}
                        mx={{base: -4, md: -8, lg: 0}}
                        shouldFetch={() => product?.id}
                    />

                    <RecommendedProducts
                        title={<FormattedMessage defaultMessage="You Might Also Like" />}
                        recommender={'pdp-similar-items'}
                        products={product && [product.id]}
                        mx={{base: -4, md: -8, lg: 0}}
                        shouldFetch={() => product?.id}
                    />

                    <RecommendedProducts
                        title={<FormattedMessage defaultMessage="Recently Viewed" />}
                        recommender={'viewed-recently-einstein'}
                        mx={{base: -4, md: -8, lg: 0}}
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

ProductDetail.getTemplateName = () => 'product-detail'

ProductDetail.shouldGetProps = ({previousLocation, location}) => {
    const previousParams = new URLSearchParams(previousLocation?.search || '')
    const params = new URLSearchParams(location.search)

    // If the product changed via the pathname or `pid` param, allow updated
    // data to be retrieved.
    return (
        previousLocation?.pathname !== location.pathname ||
        previousParams.get('pid') !== params.get('pid')
    )
}

ProductDetail.getProps = async ({params, location, api}) => {
    const {productId} = params
    let category, product
    const urlParams = new URLSearchParams(location.search)

    product = await api.shopperProducts.getProduct({
        parameters: {
            id: urlParams.get('pid') || productId,
            allImages: true
        }
    })

    if (product?.primaryCategoryId) {
        category = await api.shopperProducts.getCategory({
            parameters: {id: product?.primaryCategoryId, levels: 1}
        })
    }

    // The `commerce-isomorphic-sdk` package does not throw errors, so
    // we have to check the returned object type to inconsistencies.
    if (typeof product?.type === 'string') {
        throw new HTTPNotFound(product.detail)
    }
    if (typeof category?.type === 'string') {
        throw new HTTPNotFound(category.detail)
    }

    return {category, product}
}

ProductDetail.propTypes = {
    /**
     * The category object used for breadcrumb construction.
     */
    category: PropTypes.object,
    /**
     * The product object to be shown on the page..
     */
    product: PropTypes.object,
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool,
    /**
     * The current react router match object. (Provided internally)
     */
    match: PropTypes.object
}

export default ProductDetail
