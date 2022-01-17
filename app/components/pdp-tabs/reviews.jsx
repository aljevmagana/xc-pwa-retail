/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    Image,
    Input,
    Textarea,
    Text,
    Select,
    SimpleGrid,
    Stack,
    StackDivider,
    VStack,
    HStack
} from '@chakra-ui/react'
import {StarIcon} from '@chakra-ui/icons'

const Reviews = () => {
    const temporaryReviews = [
        {
            name: 'Han Solo',
            rating: '4',
            reviewText: 'a falcon every thousand years',
            image: '',
            date: 'OCT 2021'
        },
        {
            name: 'Luke Skywalker',
            rating: '5',
            reviewText: 'Not your son',
            image: '',
            date: 'OCT 2021'
        }
    ]
    return (
        <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
            {temporaryReviews.map((r, i) => {
                return (
                    <>
                        <Box maxW="lg" overflow="hidden" key={r.name + i}>
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
                                    <Text fontSize="14" mt="1">
                                        {r.date}
                                    </Text>
                                </Box>
                                <Box m="5">
                                    <Text m="5" mb="0" as="h4" size="md" fontSize="1.125rem">
                                        {r.name}
                                    </Text>
                                    <Box display="flex" ml="5" mt="1">
                                        {Array(5)
                                            .fill('')
                                            .map((_, i) => (
                                                <StarIcon
                                                    boxSize="3"
                                                    key={i}
                                                    color={i < r.rating ? '#ffd65a' : 'gray.300'}
                                                    m="0.9"
                                                />
                                            ))}
                                    </Box>
                                    <Text m="5" mt="2" fontSize="0.9rem">
                                        {r.reviewText}
                                    </Text>
                                </Box>
                            </HStack>
                        </Box>
                    </>
                )
            })}
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
                                        background: 'black',
                                        color: 'white'
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
    )
}

export default Reviews
