/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {extendTheme} from '@chakra-ui/react'

// Foundational style overrides
import styles from './foundations/styles'
import colors from './foundations/colors'
import gradients from './foundations/gradients'
import sizes from './foundations/sizes'
import space from './foundations/space'
import layerStyles from './foundations/layerStyles'
import shadows from './foundations/shadows'
import fonts from './foundations/fonts'

// Base component style overrides
import Alert from './components/base/alert'
import Accordion from './components/base/accordion'
import Badge from './components/base/badge'
import Button from './components/base/button'
import Checkbox from './components/base/checkbox'
import Container from './components/base/container'
import Drawer from './components/base/drawer'
import FormLabel from './components/base/formLabel'
import Icon from './components/base/icon'
import Input from './components/base/input'
import Modal from './components/base/modal'
import Radio from './components/base/radio'
import Select from './components/base/select'
import Skeleton from './components/base/skeleton'
import Tooltip from './components/base/tooltip'
import Popover from './components/base/popover'

// Project Component style overrides
import App from './components/project/_app'
import Breadcrumb from './components/project/breadcrumb'
import CustomBadge from './components/project/custom-badge'
import Header from './components/project/header'
import Heading from './components/project/heading'
import HomePage from './components/project/homepage.js'
import ListMenu from './components/project/list-menu'
import Footer from './components/project/footer'
import CheckoutFooter from './components/project/checkout-footer'
import LinksList from './components/project/links-list'
import DrawerMenu from './components/project/drawer-menu'
import NestedAccordion from './components/project/nested-accordion'
import LocaleSelector from './components/project/locale-selector'
import OfflineBanner from './components/project/offline-banner'
import Pagination from './components/project/pagination'
import PlpPagination from './components/project/plp-pagination'
import PriceRangeSlider from './components/project/pricerange-slider'
import PlpHeading from './components/project/plp-heading'
import ProductTile from './components/project/product-tile'
import ProductList from './foundations/product-list'
import Refinements from './components/project/refinements'
import SocialIcons from './components/project/social-icons'
import SwatchGroup from './components/project/swatch-group'
import ImageGallery from './components/project/image-gallery'

// Please refer to the Chakra-Ui theme customization docs found
// here https://chakra-ui.com/docs/theming/customize-theme to learn
// more about extending and overriding themes for your project.
const overrides = {
    styles,
    layerStyles,
    colors,
    sizes,
    space,
    gradients,
    shadows,
    fonts,
    components: {
        // base components
        Accordion,
        Alert,
        Badge,
        Button,
        Checkbox,
        Container,
        Drawer,
        FormLabel,
        Icon,
        Input,
        Modal,
        Popover,
        Radio,
        Select,
        Skeleton,
        Tooltip,

        // project components
        App,
        Breadcrumb,
        CustomBadge,
        Header,
        Heading,
        HomePage,
        Footer,
        CheckoutFooter,
        LinksList,
        ListMenu,
        DrawerMenu,
        NestedAccordion,
        LocaleSelector,
        OfflineBanner,
        SocialIcons,
        Pagination,
        PlpPagination,
        PriceRangeSlider,
        PlpHeading,
        ProductList,
        ProductTile,
        Refinements,
        SwatchGroup,
        ImageGallery
    }
}

export default extendTheme(overrides)
