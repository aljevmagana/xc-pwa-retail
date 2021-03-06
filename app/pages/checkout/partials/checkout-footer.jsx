/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {useIntl} from 'react-intl'
import {
    Box,
    StylesProvider,
    useMultiStyleConfig,
    Divider,
    Text,
    HStack,
    Flex,
    Spacer,
    useStyles
} from '@chakra-ui/react'
import LinksList from '../../../components/links-list'
import {VisaIcon, MastercardIcon, AmexIcon, DiscoverIcon} from '../../../components/icons'
import {HideOnDesktop, HideOnMobile} from '../../../components/responsive'

const CheckoutFooter = ({...otherProps}) => {
    const styles = useMultiStyleConfig('CheckoutFooter')
    const intl = useIntl()

    return (
        <Box as="footer" {...styles.container} {...otherProps}>
            <Box {...styles.content}>
                <StylesProvider value={styles}>
                    <Box maxWidth={'1140px'} mx="auto" display="flex" py={8} justifyContent={"space-between"}>
                        <LinksList
                            links={[
                                {
                                    href: '/',
                                    text: intl.formatMessage({
                                        id: 'footer.link.shipping',
                                        defaultMessage: 'Shipping'
                                    })
                                },
                                {
                                    href: '/',
                                    text: intl.formatMessage({
                                        id: 'footer.link.returns_exchanges',
                                        defaultMessage: 'Returns & Exchanges'
                                    })
                                }
                            ]}
                            variant="horizontal"
                            // {...styles.customerService}
                        />
                        <LegalLinks variant="horizontal" />
                    </Box>              
                    <HideOnDesktop>
                        <CreditCardIcons marginTop={4} marginBottom={4} />
                    </HideOnDesktop>

                    {/* <Divider {...styles.horizontalRule} /> */}

                    <Box {...styles.bottomHalf}>
                        <Box maxWidth={'1140px'} mx="auto" display="flex" py={4} justifyContent={"space-between"}>
                            <Text {...styles.copyright} m="0">
                                &copy;{' '}
                                {intl.formatMessage({
                                    id: 'footer.message.copyright',
                                    defaultMessage:
                                        '2021 Salesforce. All rights reserved.'
                                })}
                            </Text>

                            <HideOnDesktop>
                                <LegalLinks variant="vertical" />
                            </HideOnDesktop>
                            <HideOnMobile>
                                <Flex>
                                    <CreditCardIcons />
                                </Flex>
                            </HideOnMobile>
                        </Box>
                    </Box>
                </StylesProvider>
            </Box>
        </Box>
    )
}

export default CheckoutFooter

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
            color="gray.200"
            variant={variant}
        />
    )
}
LegalLinks.propTypes = {
    variant: PropTypes.oneOf(['vertical', 'horizontal'])
}

const CreditCardIcons = (props) => {
    const styles = useStyles()
    return (
        <HStack sizing={2} {...props}>
            <VisaIcon {...styles.creditCardIcon} />
            <MastercardIcon {...styles.creditCardIcon} />
            <AmexIcon {...styles.creditCardIcon} />
            <DiscoverIcon {...styles.creditCardIcon} />
        </HStack>
    )
}
