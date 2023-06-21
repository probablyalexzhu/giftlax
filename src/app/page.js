"use client";

import {
    ChakraProvider,
    extendTheme,
    Text,
    Heading,
    Center,
    HStack,
    Divider,
} from "@chakra-ui/react";
import { User } from "./components/user.component";

const customTheme = {
    // extension of theme for future use
};

export const theme = extendTheme({ customTheme });

export default async function Home() {
    return (
        <ChakraProvider theme={theme} padding="20">
            <Center mt="200px" color="black">
                <Heading
                    bgGradient="linear(to-l, teal.500, green.500)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold"
                    size="6xl"
                >
                    Never miss a gift-giving opportunity again.
                </Heading>
            </Center>
            <Center mt="100px" mb="50px" color="black">
                <Text fontSize="2xl">
                    The simple site that effortlessly tracks all your
                    special occasions, gift ideas, and expenses, <b>Giftlax</b>.
                </Text>
            </Center>
            <Center>
                <Divider width="70%" />
            </Center>
            <Center mt="50px" color="black">
                <HStack spacing="20">
                    <User />
                </HStack>
            </Center>
        </ChakraProvider>
    );
}
