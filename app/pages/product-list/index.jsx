/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { useHistory, useParams } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { Helmet } from 'react-helmet'

import Link from '../../components/link'

// Components
import {
    Box,
    Button,
    Center,
    Container,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Flex,
    FormControl,
    Grid,
    HStack,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalCloseButton,
    ModalOverlay,
    Select,
    SimpleGrid,
    Spacer,
    Stack,
    Text,
    useDisclosure,
    useMultiStyleConfig
} from '@chakra-ui/react'

// Project Components
import Pagination from './partials/pagination'
import ProductTile, { Skeleton as ProductTileSkeleton } from '../../components/product-tile'
import { HideOnDesktop } from '../../components/responsive'
import Refinements from './partials/refinements'
import SelectedRefinements from './partials/selected-refinements'
import EmptySearchResults from './partials/empty-results'
import PageHeader from './partials/page-header'
import ProductViewModal from './partials/product-view-modal'

// Icons
import { FilterIcon, ChevronDownIcon } from '../../components/icons'

// Hooks
import useBasket from '../../commerce-api/hooks/useBasket'
import { useLimitUrls, usePageUrls, useSortUrls, useSearchParams, useVariationAttributes } from '../../hooks'
import useCustomerProductLists from '../../commerce-api/hooks/useCustomerProductLists'
import { useToast } from '../../hooks/use-toast'
import { parse as parseSearchParams } from '../../hooks/use-search-params'
import { useVariant as useVariant } from '../../hooks/use-variant'
import { useProduct as useProduct } from '../../hooks/use-product'

// Others
import { CategoriesContext } from '../../contexts'
import { HTTPNotFound } from 'pwa-kit-react-sdk/ssr/universal/errors'

// Constants
import { DEFAULT_LIMIT_VALUES, customerProductListTypes } from '../../constants'
import useNavigation from '../../hooks/use-navigation'
import LoadingSpinner from '../../components/loading-spinner'
import { API_ERROR_MESSAGE } from '../../constants'

// NOTE: You can ignore certain refinements on a template level by updating the below
// list of ignored refinements.
const REFINEMENT_DISALLOW_LIST = ['c_isNew']

/*
 * This is a simple product listing page. It displays a paginated list
 * of product hit objects. Allowing for sorting and filtering based on the
 * allowable filters and sort refinements.
 */
const ProductList = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const basket = useBasket()


    const [sortOpen, setSortOpen] = useState(false)
    const { formatMessage } = useIntl()
    const navigate = useNavigation()

    const history = useHistory()
    const params = useParams()
    const [searchParams, { stringify: stringifySearchParams }] = useSearchParams()
    const { categories } = useContext(CategoriesContext)
    const [filtersLoading, setFiltersLoading] = useState(false)
    const productListEventHandler = (event) => {
        if (event.action === 'add') {
            showWishlistItemAdded(event.item?.quantity)
        }
    }
    const [reverse, setReverse] = useState(true);

    const showError = () => {
        showToast({
            title: formatMessage(
                { defaultMessage: '{errorMessage}' },
                { errorMessage: API_ERROR_MESSAGE }
            ),
            status: 'error'
        })
    }

    const customerProductLists = useCustomerProductLists({
        eventHandler: productListEventHandler,
        errorHandler: showError
    })
    const showToast = useToast()
    const {
        searchQuery,
        productSearchResult,
        // eslint-disable-next-line react/prop-types
        staticContext,
        location,
        isLoading,
        ...rest
    } = props

    const [wishlist, setWishlist] = useState({})
    // keep track of the items has been add/remove to/from wishlist
    const [wishlistLoading, setWishlistLoading] = useState([])

    // Product being selected from Quick View or Add to Cart
    const [productSelect, setProductSelect] = useState();
    const [openQuickView, setOpenQuickView] = useState(false);

    const { total, sortingOptions } = productSearchResult || {}

    // Get the current category from global state.
    let category = undefined
    if (!searchQuery) {
        category = categories[params.categoryId]
    }

    const basePath = `${location.pathname}${location.search}`
    // Reset scroll position when `isLoaded` becomes `true`.
    useEffect(() => {
        isLoading && window.scrollTo(0, 0)
        setFiltersLoading(isLoading)
    }, [isLoading])

    // Get urls to be used for pagination, page size changes, and sorting.
    const pageUrls = usePageUrls({ total })
    const sortUrls = useSortUrls({ options: sortingOptions })
    const limitUrls = useLimitUrls()


    // If we are loaded and still have no products, show the no results component.
    const showNoResults = !isLoading && productSearchResult && !productSearchResult?.hits
    useEffect(() => {
        if (customerProductLists.data && productSearchResult) {
            // find the first wishlist in customer product list
            const wishlist = customerProductLists.data.find(
                (list) => list.type === customerProductListTypes.WISHLIST
            )
            setWishlist(wishlist)
        }


    }, [customerProductLists.data, productSearchResult])

    useEffect(() => {
        // finds the price ranges in productsearch result
        try {
            let priceValue = "";
            productSearchResult?.refinements.filter((filterItem) => {
                if (filterItem.attributeId == 'price') {
                    priceValue = filterItem
                    minMaxPriceProcess(priceValue)
                }
            })
        } catch (e) {

        }
    }, [productSearchResult])


    // function to get the minimum and maximum price base on the original price range
    const minMaxPriceProcess = (priceValue) => {
        let priceRangeList = [];
        let minMaxPrice = [];
        if (priceValue) {
            let priceArray = priceValue.values
            priceArray.forEach((price) => {
                let priceString = price.value.replace("(", "").replace(")", "").replace("..", ",")
                priceString = priceString.split(',').map(Number)
                let iterator = priceString.values();
                for (const value of iterator) {
                    priceRangeList.push(value)
                }
            })
            let min = Math.min(...priceRangeList);
            let max = Math.max(...priceRangeList);

            let priceStringValue = `(` + `${min}` + `..` + `${max}` + `)`;
            minMaxPrice.push(min, max)

            let priceSearchParamRefine = (searchParams?.refine) ? searchParams?.refine : { price: null }

            productSearchResult?.refinements.push({ attributeId: 'price_range', label: 'Price Range', values: priceStringValue, priceRefine: priceSearchParamRefine });
            return;
        }
        return;
    }

    /**
     * Removes product from wishlist
     */
    const removeItemFromWishlist = async (product) => {
        try {
            setWishlistLoading([...wishlistLoading, product.productId])
            // Extract productListItem corresponding to product from wishlist
            const productListItem = wishlist.customerProductListItems?.find(
                (item) => item.productId === product.productId
            )
            await customerProductLists.deleteCustomerProductListItem(wishlist, productListItem)

            showToast({
                title: formatMessage({ defaultMessage: 'Item removed from wishlist' }),
                status: 'success',
                id: product.productId
            })
            // remove the loading id
            setWishlistLoading(wishlistLoading.filter((id) => id !== product.productId))
        } catch (err) {
            showError()
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
                { quantity }
            ),
            status: 'success',
            action: toastAction
        })
    }

    const addItemToWishlist = async (product) => {
        try {
            setWishlistLoading([...wishlistLoading, product.productId])
            // If product-lists have not loaded we push "Add to wishlist" event to eventQueue to be
            // processed once the product-lists have loaded.
            if (!customerProductLists?.loaded) {
                const event = {
                    item: { ...product, id: product.productId, quantity: 1 },
                    action: 'add',
                    listType: customerProductListTypes.WISHLIST
                }

                customerProductLists.addActionToEventQueue(event)
            } else {
                const quantity = 1
                const wishlist = customerProductLists.getProductListPerType(
                    customerProductListTypes.WISHLIST
                )
                await customerProductLists.createCustomerProductListItem(wishlist, {
                    productId: product.productId,
                    priority: 1,
                    quantity,
                    public: false,
                    type: 'product'
                })
                showWishlistItemAdded(quantity)
                setWishlistLoading(wishlistLoading.filter((id) => id !== product.productId))
            }
        } catch (err) {
            showError()
        }
    }
    // Toggles filter on and off
    const toggleFilter = (value, attributeId, selected, allowMultiple = true) => {
        const searchParamsCopy = { ...searchParams }

        // Remove the `offset` search param if present.
        delete searchParamsCopy.offset

        // If we aren't allowing for multiple selections, simply clear any value set for the
        // attribute, and apply a new one if required.
        if (!allowMultiple) {
            delete searchParamsCopy.refine[attributeId]

            if (!selected) {
                searchParamsCopy.refine[attributeId] = value.value
            }
        } else {
            // Get the attibute value as an array.
            let attributeValue = searchParamsCopy.refine[attributeId] || []
            let values = Array.isArray(attributeValue) ? attributeValue : attributeValue.split('|')

            // Either set the value, or filter the value out.
            if (!selected) {
                values.push(value.value)
            } else {
                values = values.filter((v) => v !== value.value)
            }

            // Update the attribute value in the new search params.
            searchParamsCopy.refine[attributeId] = values

            // If the update value is an empty array, remove the current attribute key.
            if (searchParamsCopy.refine[attributeId].length === 0) {
                delete searchParamsCopy.refine[attributeId]
            }
        }

        navigate(`${location.pathname}?${stringifySearchParams(searchParamsCopy)}`)
    }

    // Clears all filters
    const resetFilters = () => {
        navigate(window.location.pathname)
    }

    // Show 25, 50, 100, All
    const showByTemplate = (showByValue, index) => {
        let activeText = (`${productSearchResult?.limit}` == showByValue) ? 'active' : ''
        return (
            <Flex key={index}>
                {
                    (activeText) ?
                    <Link 
                        fontSize="0.9rem" 
                        href={limitUrls[index]}
                        style={{
                            borderBottom: "solid 2px #495057", 
                            width: "25px", 
                            textAlign: "center"
                        }}
                    >{showByValue}</Link>
                    :
                    <Link fontSize="0.9rem" className={activeText} href={limitUrls[index]}>{showByValue}</Link>
                }
                
            </Flex>
        )
    }

    // Showing 1 of X Page
    const showingXofX = () => {
        let x_limit = productSearchResult?.limit || 0;
        let x_offset = productSearchResult?.offset || 0;
        let x_string = "";

        let x1 = 0
        let x2 = 0

        if (x_offset == 0) {
            x1 = 1
            x2 = x_limit
        } else {
            x1 = x_offset
            x2 = x_offset + x_limit
        }

        return (
                <Text>
                    Showing <b>{x1} - {x2}</b> of <b>{total}</b> products
                </Text>
        )
    }

    // function that handles quick Add to Cart, quick ATC are disabled if product are more than 1
    const handleAddToCart = async (product) => {
        const quantity = 1
        try {
            if (!product?.orderable || !quantity) return
            // The basket accepts an array of `ProductItems`, so lets create a single
            // item array to add to the basket.
            const productItems = [
                {
                    productId: product.representedProduct.id,
                    quantity,
                    price: product.price
                }
            ]
            basket.addItemToBasket(productItems)
            window.scrollTo(0, 0);
        } catch (error) {
            showError(error)
        }
    }
    const getProductDetails = async (product) => {
        setProductSelect(product);

        if (product) {
            displayQuickView()
        }
    }

    /* Trigger Product Tile Quickview */
    const displayQuickView = () => {
        setOpenQuickView(true);
    }

    let selectedSortingOptionLabel = productSearchResult?.sortingOptions.find(
        (option) => option.id === productSearchResult?.selectedSortingOption
    )

    // API does not always return a selected sorting order
    if (!selectedSortingOptionLabel) {
        selectedSortingOptionLabel = productSearchResult?.sortingOptions[0]
    }


    return (
        <>


            {/* PLP Page Center Title  */}
            <Flex
                style={{ position: "relative", marginTop: "5%" }}
            >
                <PageHeader
                    searchQuery={searchQuery}
                    category={category}
                    productSearchResult={productSearchResult}
                    isLoading={isLoading}
                />
            </Flex>
            <Spacer />
            <Container maxWidth="1140px" variant="plpContainer" maxW="container.lg">

                <Box
                    className="sf-product-list-page"
                    data-testid="sf-product-list-page"
                    layerStyle="page"
                    /* paddingTop={{ base: 1, lg: 8 }} */
                    paddingTop={'0px !important'}
                    {...rest}
                >
                    <Helmet>
                        <title>{category?.pageTitle}</title>
                        <meta name="description" content={category?.pageDescription} />
                        <meta name="keywords" content={category?.pageKeywords} />
                    </Helmet>
                    {showNoResults ? (
                        <EmptySearchResults searchQuery={searchQuery} category={category} />
                    ) : (
                        <>
                            {/* Header */}

                            <Stack
                                display={{ base: 'none', lg: 'flex' }}
                                direction="row"
                                justify="flex-start"
                                align="flex-start"
                                spacing={4}
                                marginBottom={6}
                            >


                                <Box flex={1} paddingTop={'45px'}>
                                    <SelectedRefinements
                                        filters={productSearchResult?.refinements}
                                        toggleFilter={toggleFilter}
                                        selectedFilterValues={productSearchResult?.selectedRefinements}
                                    />
                                </Box>
                            </Stack>

                            {/* <HideOnDesktop>
                            <Stack spacing={6}>
                                <PageHeader
                                    searchQuery={searchQuery}
                                    category={category}
                                    productSearchResult={productSearchResult}
                                    isLoading={isLoading}
                                />
                                <Stack
                                    display={{ base: 'flex', md: 'none' }}
                                    direction="row"
                                    justify="flex-start"
                                    align="center"
                                    spacing={1}
                                    height={12}
                                    borderColor="gray.100"
                                >
                                    <Flex align="center">
                                        <Button
                                            fontSize="sm"
                                            colorScheme="black"
                                            variant="outline"
                                            marginRight={2}
                                            display="inline-flex"
                                            leftIcon={<FilterIcon boxSize={5} />}
                                            onClick={onOpen}
                                        >
                                            <FormattedMessage defaultMessage="Filter" />
                                        </Button>
                                    </Flex>
                                    <Flex align="center">
                                        <Button
                                            maxWidth="245px"
                                            fontSize="sm"
                                            marginRight={2}
                                            colorScheme="black"
                                            variant="outline"
                                            display="inline-flex"
                                            rightIcon={<ChevronDownIcon boxSize={5} />}
                                            onClick={() => setSortOpen(true)}
                                        >
                                            {formatMessage(
                                                {
                                                    defaultMessage: 'Sort By: {sortOption}'
                                                },
                                                {
                                                    sortOption: selectedSortingOptionLabel?.label
                                                }
                                            )}
                                        </Button>
                                    </Flex>
                                </Stack>
                            </Stack>
                            <Box marginBottom={4}>
                                <SelectedRefinements
                                    filters={productSearchResult?.refinements}
                                    toggleFilter={toggleFilter}
                                    selectedFilterValues={productSearchResult?.selectedRefinements}
                                />
                            </Box>
                        </HideOnDesktop> */}

                            {/* Body  */}
                            <Grid templateColumns={{ base: '1fr', md: '280px 1fr' }} columnGap={6}>
                                <Stack display={{ base: 'none', md: 'flex' }}>
                                    <Refinements
                                        isLoading={filtersLoading}
                                        toggleFilter={toggleFilter}
                                        filters={productSearchResult?.refinements}
                                        selectedFilters={searchParams.refine}
                                    />
                                </Stack>
                                <Box>
                                    {/* Sort By Filter */}
                                    <SimpleGrid columns={{ sm: 2, md: 2, lg: 3 }} className="plp-main-sortby-container" margintop="1rem" marginBottom="1rem" gap={6}>
                                        <Box>

                                            <Flex align="center" justify="center" marginBottom="1rem">
                                                <Center>
                                                    <Box>
             
                                                        <Text fontSize="0.9rem" marginRight=".5rem">
                                                            {
                                                                showingXofX()
                                                            }
                                                        </Text>

                                                    </Box>
                                                </Center>
                                            </Flex>

                                        </Box>
                                        <Box>
                                            <Flex align="center" justify="center" marginBottom="1rem">
                                                <Center>
                                                    <Box>
                                                        <Text fontSize="0.9rem" marginRight=".5rem">{'Show '}</Text>
                                                    </Box>
                                                    <Box>
                                                        <Center>
                                                            <HStack>
                                                                {
                                                                    DEFAULT_LIMIT_VALUES.map((limitvalue, index) => {
                                                                        return showByTemplate(limitvalue, index);
                                                                    })
                                                                }
                                                            </HStack>
                                                        </Center>
                                                    </Box>
                                                </Center>
                                            </Flex>
                                        </Box>
                                        <Box>
                                            <Flex align="center" justify="center" margintop="1rem" marginBottom="1rem">
                                                <Center>
                                                    <Box
                                                    >
                                                        <Text fontSize="0.9rem">Sort by</Text>
                                                    </Box>
                                                    <Box>
                                                        <Sort
                                                            sortUrls={sortUrls}
                                                            productSearchResult={productSearchResult}
                                                            basePath={basePath}
                                                        />
                                                    </Box>
                                                </Center>
                                            </Flex>
                                        </Box>
                                    </SimpleGrid>

                                    <Spacer />
                                    {/* PLP Grids */}
                                    <SimpleGrid
                                        columns={{ sm: 1, md: 2, lg: 3 }}
                                        spacingX={6}
                                        spacingY={{ base: 12, lg: 16 }}
                                    >
                                        {isLoading || !productSearchResult
                                            ? new Array(searchParams.limit)
                                                .fill(0)
                                                .map((value, index) => (
                                                    <ProductTileSkeleton key={index} />
                                                ))
                                            : productSearchResult.hits.map((productSearchItem) => {
                                                const isInWishlist = wishlist?.customerProductListItems
                                                    ?.map(({ productId }) => productId)
                                                    .includes(productSearchItem.productId)
                                                return (
                                                    <ProductTile
                                                        category={category?.name}
                                                        isWishlistLoading={wishlistLoading.includes(
                                                            productSearchItem.productId
                                                        )}
                                                        data-testid={`sf-product-tile-${productSearchItem.productId}`}
                                                        key={productSearchItem.productId}
                                                        productSearchItem={productSearchItem}
                                                        onAddToWishlistClick={() =>
                                                            addItemToWishlist(productSearchItem)
                                                        }
                                                        onRemoveWishlistClick={() => {
                                                            removeItemFromWishlist(productSearchItem)
                                                        }}
                                                        onQuickViewClick={() => {
                                                            getProductDetails(productSearchItem)
                                                        }}
                                                        handleAddToCart={() => {
                                                            handleAddToCart(productSearchItem);
                                                        }}

                                                        isInWishlist={isInWishlist}
                                                    />
                                                )
                                            })}
                                    </SimpleGrid>
                                    {/* Footer */}
                                    <Flex
                                        justifyContent={['center', 'center']}
                                        paddingTop={8}
                                    >
                                        <Center>
                                            <Pagination currentURL={basePath} urls={pageUrls} />
                                        </Center>
                                        {/*
                                            Our design doesn't call for a page size select. Show this element if you want
                                            to add one to your design.
                                        */}
                                        <Select
                                            display="none"
                                            value={basePath}
                                            onChange={({ target }) => {
                                                history.push(target.value)
                                            }}
                                        >
                                            {limitUrls.map((href, index) => (
                                                <option key={href} value={href}>
                                                    {DEFAULT_LIMIT_VALUES[index]}
                                                </option>
                                            ))}
                                        </Select>
                                    </Flex>
                                </Box>
                            </Grid>
                        </>
                    )}
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        size="full"
                        motionPreset="slideInBottom"
                        scrollBehavior="inside"
                    >
                        <ModalOverlay />
                        <ModalContent top={0} marginTop={0}>
                            <ModalHeader>
                                <Text fontWeight="bold" fontSize="2xl">
                                    <FormattedMessage defaultMessage="Filter" />
                                </Text>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody py={4}>
                                {filtersLoading && <LoadingSpinner />}
                                <Refinements
                                    toggleFilter={toggleFilter}
                                    filters={productSearchResult?.refinements}
                                    selectedFilters={productSearchResult?.selectedRefinements}
                                />
                            </ModalBody>

                            <ModalFooter
                                // justify="space-between"
                                display="block"
                                width="full"
                                borderTop="1px solid"
                                borderColor="gray.100"
                                paddingBottom={10}
                            >
                                <Stack>
                                    <Button width="full" onClick={onClose}>
                                        {formatMessage(
                                            {
                                                defaultMessage: 'View {prroductCount} items'
                                            },
                                            {
                                                prroductCount: productSearchResult?.total
                                            }
                                        )}
                                    </Button>
                                    <Button width="full" variant="outline" onClick={() => resetFilters()}>
                                        <FormattedMessage defaultMessage="Clear Filters" />
                                    </Button>
                                </Stack>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Drawer
                        placement="bottom"
                        isOpen={sortOpen}
                        onClose={() => setSortOpen(false)}
                        size="sm"
                        motionPreset="slideInBottom"
                        scrollBehavior="inside"
                        isFullHeight={false}
                        height="50%"
                    >
                        <DrawerOverlay />
                        <DrawerContent marginTop={0}>
                            <DrawerHeader boxShadow="none">
                                <Text fontWeight="bold" fontSize="2xl">
                                    <FormattedMessage defaultMessage="Sort By" />
                                </Text>
                            </DrawerHeader>
                            <DrawerCloseButton />
                            <DrawerBody>
                                {sortUrls.map((href, idx) => (
                                    <Button
                                        width="full"
                                        onClick={() => {
                                            setSortOpen(false)
                                            history.push(href)
                                        }}
                                        fontSize={'md'}
                                        key={idx}
                                        marginTop={0}
                                        variant="menu-link"
                                    >
                                        <Text
                                            as={
                                                selectedSortingOptionLabel?.label ===
                                                productSearchResult?.sortingOptions[idx]?.label && 'u'
                                            }
                                        >
                                            {productSearchResult?.sortingOptions[idx]?.label}
                                        </Text>
                                    </Button>
                                ))}
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                    {
                        (openQuickView) ? <ProductViewModal product={productSelect} isOpen={openQuickView} onOpen={onOpen} onClose={() => { setOpenQuickView(false) }} props={props} /> : <></>
                    }

                </Box>
            </Container>
        </>

    )
}

ProductList.getTemplateName = () => 'product-list'

ProductList.shouldGetProps = ({ previousLocation, location }) =>
    !previousLocation ||
    previousLocation.pathname !== location.pathname ||
    previousLocation.search !== location.search

ProductList.getProps = async ({ res, params, location, api }) => {
    const { categoryId } = params
    const urlParams = new URLSearchParams(location.search)
    let searchQuery = urlParams.get('q')
    let isSearch = false

    if (searchQuery) {
        isSearch = true
    }
    // In case somebody navigates to /search without a param
    if (!categoryId && !isSearch) {
        // We will simulate search for empty string
        return { searchQuery: ' ', productSearchResult: {} }
    }

    const searchParams = parseSearchParams(location.search, false)

    if (!searchParams.refine.includes(`cgid=${categoryId}`) && categoryId) {
        searchParams.refine.push(`cgid=${categoryId}`)
    }

    // only search master products
    searchParams.refine.push('htype=master')

    // Set the `cache-control` header values to align with the Commerce API settings.
    if (res) {
        res.set('Cache-Control', 'public, must-revalidate, max-age=900')
    }

    const [category, productSearchResult] = await Promise.all([
        isSearch
            ? Promise.resolve()
            : api.shopperProducts.getCategory({
                parameters: { id: categoryId, levels: 0 }
            }),
        api.shopperSearch.productSearch({
            parameters: searchParams
        })
    ])

    // Apply disallow list to refinements.
    productSearchResult.refinements = productSearchResult.refinements.filter(
        ({ attributeId }) => !REFINEMENT_DISALLOW_LIST.includes(attributeId)
    )

    // The `isomorphic-sdk` returns error objects when they occur, so we
    // need to check the category type and throw if required.
    if (category?.type?.endsWith('category-not-found')) {
        throw new HTTPNotFound(category.detail)
    }

    return { searchQuery: searchQuery, productSearchResult }
}

const Sort = ({ sortUrls, productSearchResult, basePath, ...otherProps }) => {
    const intl = useIntl()
    const history = useHistory()
    const styles = useMultiStyleConfig('Select', {
        variant: 'plpSort'
    })

    return (
        <>
            <Box>
                <FormControl data-testid="sf-product-list-sort" id="page_sort" width="auto" {...otherProps}>
                    <Select
                        value={basePath.replace(/(offset)=(\d+)/i, '$1=0')}
                        onChange={({ target }) => {
                            history.push(target.value)
                        }}
                        /* width="240px" */
                        {...styles}
                        icon={<ChevronDownIcon boxSize={5} />}
                    >
                        {sortUrls.map((href, index) => (
                            <option key={href} value={href}>
                                {intl.formatMessage(
                                    {
                                        defaultMessage: '{sortOption}'
                                    },
                                    {
                                        sortOption: productSearchResult?.sortingOptions[index]?.label
                                    }
                                )}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </Box>


        </>
    )
}

ProductList.propTypes = {
    /**
     * The search result object showing all the product hits, that belong
     * in the supplied category.
     */
    productSearchResult: PropTypes.object,
    /*
     * Indicated that `getProps` has been called but has yet to complete.
     *
     * Notes: This prop is internally provided.
     */
    isLoading: PropTypes.bool,
    /*
     * Object that represents the current location, it consists of the `pathname`
     * and `search` values.
     *
     * Notes: This prop is internally provided.
     */
    location: PropTypes.object,
    searchQuery: PropTypes.string,
    onAddToWishlistClick: PropTypes.func,
    onRemoveWishlistClick: PropTypes.func,
    handleAddToCart: PropTypes.func
}

export default ProductList


Sort.propTypes = {
    sortUrls: PropTypes.array,
    productSearchResult: PropTypes.object,
    basePath: PropTypes.string
}
