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
    Box,
    Button,
    ButtonGroup,
    Center,
    FormControl,
    FormLabel,
    Image,
    Input,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Table,
    Td,
    Tr,
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

    const temporaryAddInfo={
        productNum:"1234567890",
        packaging:"N/A",
        weight:"2 Pounds",
        dimensions:"1x1x1",
        origin:"Taiwan",
        manufacturer:"Enigma Industries",
        releaseDate:"2021",
        materials:"Cotton"
    }

    return (
        <Box
            className="sf-product-detail-page"
            layerStyle="page"
            data-testid="product-details-page"
            justifyContent="center"
            pt={["5rem", "7.5%"]}
            pl="15px"
            pr="15px"
            maxWidth={["none","540px","720px", "960px", "1140px"]}
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
                    <Tabs w="100%" color="#868e96">
                        <TabList borderBottom="1px">
                            {/* Details */}
                            <Tab textTransform="uppercase" letterSpacing=".1em" fontSize=".8rem" _selected={{ color: "black", borderColor:"currentColor"}}>
                                Description
                            </Tab>
                            {/* Size & Fit */}
                            <Tab textTransform="uppercase" letterSpacing=".1em" fontSize=".8rem" _selected={{ color: "black", borderColor:"currentColor"}}>
                                Additional Information
                            </Tab>
                            {/* Reviews */}
                            <Tab textTransform="uppercase" letterSpacing=".1em" fontSize=".8rem" _selected={{ color: "black", borderColor:"currentColor"}}>
                                Reviews
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel mb={6} mt={4}>
                                <Text color="#868e96" fontSize="0.9rem">{product?.longDescription}</Text>
                            </TabPanel>
                            <TabPanel mb={6} mt={4}>
                                <Stack direction={["column", "row"]} fontSize="0.7875rem">
                                    <Table>
                                        <Tr>
                                            <Td>PRODUCT #</Td>
                                            <Td color="gray.600">{temporaryAddInfo.productNum}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td >AVAILABLE PACKAGING</Td>
                                            <Td color="gray.600">{temporaryAddInfo.packaging}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>WEIGHT</Td>
                                            <Td color="gray.600" >{temporaryAddInfo.weight}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td >DIMENSIONS</Td>
                                            <Td color="gray.600" >{temporaryAddInfo.dimensions}</Td>
                                        </Tr>
                                    </Table>
                                    <Table>
                                        <Tr>
                                            <Td>ORIGIN</Td>
                                            <Td color="gray.600" >{temporaryAddInfo.origin}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td >MANUFACTURER</Td>
                                            <Td color="gray.600">{temporaryAddInfo.manufacturer}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td >RELEASE DATE</Td>
                                            <Td color="gray.600" >{temporaryAddInfo.releaseDate}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td >MATERIALS</Td>
                                            <Td color="gray.600" >{temporaryAddInfo.materials}</Td>
                                        </Tr>
                                    </Table>
                                </Stack>
                            </TabPanel>
                            <TabPanel mb={6} mt={4} maxWidth={["100%", "83.33%"]}>
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
                                                <Image
                                                    borderRadius="full"
                                                    boxSize="115px"
                                                    src="https://bit.ly/sage-adebayo"
                                                    alt="Segun Adebayo"
                                                    p="7px"
                                                    border="solid 1px rgba(0, 0, 0, 0.125)"
                                                />
                                                    <Text fontSize="14" mt="1">{r.date}</Text>
                                                </Box>
                                                <Box m="5" >
                                                    <Text m="5" mb="0" as="h4" size="md" fontSize="1.125rem">{r.name}</Text>
                                                    <Box display="flex" ml="5" mt="1">
                                                                {Array(5)
                                                                    .fill("")
                                                                    .map((_, i) => (
                                                                    <StarIcon
                                                                        boxSize="3"
                                                                        key={i}
                                                                        color={i < r.rating ? "#ffd65a" : "gray.300"}
                                                                        m="0.9"
                                                                        
                                                                    />
                                                                    ))}
                                                            </Box>
                                                    <Text m="5" mt="2" fontSize="0.9rem">{r.reviewText}</Text>
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
                                                color="#868e96"
                                                fontWeight="normal"
                                                letterSpacing="wide"
                                                fontSize="0.9rem"
                                                textTransform="uppercase"
                                                ml="2"
                                            >
                                                <form>
                                                <Stack spacing={4}>
                                                    <SimpleGrid columns={2} spacing={10}>
                                                        <Box>
                                                            <FormControl isRequired>
                                                                <FormLabel fontWeight="normal">Your Name</FormLabel>
                                                                <Input fontSize="0.9rem" placeholder="Enter your name" />
                                                            </FormControl>
                                                        </Box>
                                                        <Box textAlign="left">
                                                            <VStack alignItems="left">
                                                                <Text fontWeight="normal">Your Rating * </Text>
                                                                <Select color="#495057" fontSize="0.9rem">
                                                                    <option value="star5">★★★★★(5/5)</option>
                                                                    <option value="star4">★★★★☆(4/5)</option>
                                                                    <option value="star3">★★★☆☆(3/5)</option>
                                                                    <option value="star2">★★☆☆☆(2/5)</option>
                                                                    <option value="star1">★☆☆☆☆(1/5)</option>
                                                                </Select>
                                                            </VStack>
                                                        </Box>
                                                    </SimpleGrid>
                                                    <FormControl isRequired>
                                                        <FormLabel fontWeight="normal">Your Email</FormLabel>
                                                        <Input fontSize="0.9rem" placeholder="Enter your email" />
                                                    </FormControl>
                                                    <FormControl isRequired>
                                                        <FormLabel fontWeight="normal">Review Text</FormLabel>
                                                        <Textarea fontSize="0.9rem" placeholder="Enter your review" />
                                                    </FormControl>
                                                    <ButtonGroup variant="outline">
                                                        <Button 
                                                            color="#343a40" 
                                                            width="125px"  
                                                            type="submit"
                                                            fontSize="0.6875rem"
                                                            letterSpacing=".3em"
                                                            textTransform="uppercase"
                                                            _hover={{
                                                                background: "black",
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
