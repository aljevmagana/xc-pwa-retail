/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Text,
    Divider,
    SimpleGrid,
    useMultiStyleConfig,
    StylesProvider,
    Select,
    Stack,
    useStyles,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    FormControl,
    Flex
} from '@chakra-ui/react'
import {useIntl} from 'react-intl'

import LinksList from '../links-list'
import SocialIcons from '../social-icons'
import {HideOnDesktop, HideOnMobile} from '../responsive'
import {defaultLocaleMessages} from '../_app'
import {SUPPORTED_LOCALES} from '../../constants'
import {buildUrlLocale} from '../../utils/url'
import {DeliveryTime} from '../../components/icons'
import {SpriteMoney} from '../../components/icons'
import {CustomerSupport} from '../../components/icons'
import {BrandLogo} from '../icons'

const Feature = ({ title, text, icon, borderRight }) => {
    return (
      <Stack direction={'row'} align={'center'} justify={'center'} borderRight={borderRight} borderColor="gray.200" fontSize="0.9rem">
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          mb={1}>
          {icon}
        </Flex>
        <Flex direction={'column'} >
            <Text fontWeight={600} letterSpacing="0.1em" mb="0.5rem">{title}</Text>
            <Text color={'gray.200'} fontSize="0.7875rem" color="#868e96">{text}</Text>
        </Flex>
      </Stack>
    );
};

const Footer = ({...otherProps}) => {
    const styles = useMultiStyleConfig('Footer')
    const intl = useIntl()

    return (
        <Box as="footer" {...styles.container} {...otherProps}>
            <Box py={24} bg="#f8f9fa">
                <SimpleGrid columns={{ base: 1, md: 3 }} maxWidth={'1140px'} mx="auto">
                    <Feature borderRight="1px"
                        icon={<DeliveryTime color="black" boxSize={12}/>}
                        title={'FREE SHIPPING & RETURN'}
                        text={
                            'Free Shipping over $300'
                        }
                    />
                    <Feature borderRight="1px"
                        icon={<SpriteMoney color="black" boxSize={12}/>}
                        title={'MONEY BACK GUARANTEE'}
                        text={
                            '30 Days Money Back Guarantee'
                        }
                    />
                    <Feature borderRight="0"
                        icon={<CustomerSupport color="black" boxSize={12}/>}
                        title={'020-800-456-747'}
                        text={
                            '24/7 Available Support'
                        }
                    />
                </SimpleGrid>
            </Box>
            <Box {...styles.content} bgColor="#dee2e6">

                <StylesProvider value={styles}>
                    <HideOnMobile>
                        <SimpleGrid columns={4} spacing={3} py={24} maxWidth={'1140px'} mx="auto">
                            <Stack spacing={6}>
                                <Box>
                                    <BrandLogo {...styles.logo} width={16}/>
                                </Box>
                                <Text fontSize={'sm'}>
                                    © 2020 Chakra Templates. All rights reserved
                                </Text>
                                <Stack direction={'row'} spacing={6}>
                                    <SocialIcons variant="flex-start" color='#868e96' {...styles.socialIcons} />
                                </Stack>
                            </Stack>

                            <LinksList
                                heading={intl.formatMessage({
                                    id: 'footer.column.account',
                                    defaultMessage: 'Shop'
                                })}
                                links={[
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.order_status',
                                            defaultMessage: 'For Women'
                                        })
                                    },
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.signin_create_account',
                                            defaultMessage: 'For Men'
                                        })
                                    },
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.order_status1',
                                            defaultMessage: 'Stores'
                                        })
                                    },
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.order_status2',
                                            defaultMessage: 'Our Blog'
                                        })
                                    },
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.order_status3',
                                            defaultMessage: 'Shop'
                                        })
                                    }
                                ]}
                            />
                            <LinksList
                                heading={intl.formatMessage({
                                    id: 'footer.column.our_company',
                                    defaultMessage: 'Company'
                                })}
                                links={[
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.store_locator',
                                            defaultMessage: 'Login'
                                        })
                                    },
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.about_us',
                                            defaultMessage: 'Register'
                                        })
                                    },
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.store_locator1',
                                            defaultMessage: 'Wishlist'
                                        })
                                    },
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.store_locator2',
                                            defaultMessage: 'Our Products'
                                        })
                                    },
                                    {
                                        href: '/',
                                        text: intl.formatMessage({
                                            id: 'footer.link.store_locator3',
                                            defaultMessage: 'Checkouts'
                                        })
                                    }
                                ]}
                            />
                            <Box>
                                <Subscribe />
                            </Box>
                        </SimpleGrid>
                    </HideOnMobile>

                    <HideOnDesktop>
                        <Subscribe />
                    </HideOnDesktop>

                    {/* <Box {...styles.localeSelector}>
                        <FormControl
                            data-testid="sf-footer-locale-selector"
                            id="locale_selector"
                            width="auto"
                            {...otherProps}
                        >
                            <Select
                                value={intl.locale}
                                onChange={({target}) => {
                                    // Update the `locale` in the URL.
                                    const newUrl = buildUrlLocale(intl.locale, target.value)
                                    window.location = newUrl
                                }}
                                variant="filled"
                                {...styles.localeDropdown}
                            >
                                {SUPPORTED_LOCALES.map((locale) => (
                                    <option key={locale} value={locale}>
                                        {intl.formatMessage(defaultLocaleMessages[locale])}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Box> */}

                    <Box {...styles.bottomHalf}>
                        <Box maxWidth={'1140px'} mx="auto" display="flex" py={4}>
                            <Text {...styles.copyright}>
                                &copy;{' '}
                                {intl.formatMessage({
                                    id: 'footer.message.copyright',
                                    defaultMessage:
                                        '2021 Salesforce. All rights reserved.'
                                })}
                            </Text>

                            <SocialIcons variant="flex-end" pinterestInnerColor="black" {...styles.socialIcons} />

                            {/* <HideOnDesktop>
                                <LegalLinks variant="vertical" />
                            </HideOnDesktop>
                            <HideOnMobile>
                                <LegalLinks variant="horizontal" />
                            </HideOnMobile> */}
                        </Box>
                    </Box>
                </StylesProvider>
            </Box>
        </Box>
    )
}

export default Footer

const Subscribe = ({...otherProps}) => {
    const styles = useStyles()
    const intl = useIntl()

    return (
        <Box {...styles.subscribe} {...otherProps}>
            <Heading {...styles.subscribeHeading}>
                {intl.formatMessage({
                    id: 'footer.subscribe.heading.first_to_know',
                    defaultMessage: 'Be the first to know'
                })}
            </Heading>
            <Text {...styles.subscribeMessage}>
                {intl.formatMessage({
                    id: 'footer.subscribe.description.sign_up',
                    defaultMessage: 'Sign up to stay in the loop about the hottest deals'
                })}
            </Text>

            <Box>
                <InputGroup>
                    <Input type="email" placeholder="you@email.com" {...styles.subscribeField} />
                    <InputRightElement {...styles.subscribeButtonContainer}>
                        <Button variant="footer">
                            {intl.formatMessage({
                                id: 'footer.subscribe.button.sign_up',
                                defaultMessage: 'Sign Up'
                            })}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>

            {/* <SocialIcons variant="flex-start" pinterestInnerColor="black" {...styles.socialIcons} /> */}
        </Box>
    )
}

const LegalLinks = ({variant}) => {
    const intl = useIntl()
    return (
        <LinksList
            links={[
                {
                    href: '/',
                    text: intl.formatMessage({
                        id: 'footer.link.terms_conditions',
                        defaultMessage: 'Terms & Conditions'
                    })
                },
                {
                    href: '/',
                    text: intl.formatMessage({
                        id: 'footer.link.privacy_policy',
                        defaultMessage: 'Privacy Policy'
                    })
                },
                {
                    href: '/',
                    text: intl.formatMessage({
                        id: 'footer.link.site_map',
                        defaultMessage: 'Site Map'
                    })
                }
            ]}
            color="black"
            variant={variant}
        />
    )
}
LegalLinks.propTypes = {
    variant: PropTypes.oneOf(['vertical', 'horizontal'])
}
