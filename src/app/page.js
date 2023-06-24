"use client";
import {
    ChakraProvider,
    extendTheme,
    Text,
    Heading,
    Center,
    HStack,
    Divider,
    Image,
    Card,
    CardBody,
    Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { User } from "./components/user.component";

const customTheme = {
    // extension of theme for future use
};

export const theme = extendTheme({ customTheme });

export default async function Home() {
    return (
        <ChakraProvider theme={theme} padding="20">
            <Center mt="100px" color="black">
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
                    <b>Giftlax</b>, the simple site that effortlessly tracks all
                    your special occasions, gift ideas, and expenses.
                </Text>
            </Center>
            <Center mt="50px" mb="100px" color="black">
                <HStack spacing="20">
                    <User />
                </HStack>
            </Center>
            <Center>
                <Divider width="70%" />
            </Center>
            <Center mt="100px" color="black">
                <Heading
                    bgGradient="linear(to-l, orange.600, orange.500)"
                    bgClip="text"
                    fontSize="xl"
                    fontWeight="extrabold"
                    size="xl"
                >
                    Keep track of everything with this clean interface...
                </Heading>
            </Center>
            <Center mt="20px" color="black">
                <Card maxW="4xl">
                    <CardBody>
                        <Image src="/screenshot2.png" />
                    </CardBody>
                </Card>
            </Center>
            <Center mt="100px" color="black">
                <Heading
                    bgGradient="linear(to-l, orange.600, orange.500)"
                    bgClip="text"
                    fontSize="xl"
                    fontWeight="extrabold"
                    size="xl"
                >
                    ...built with some pretty cool tech.
                </Heading>
            </Center>
            <Center mt="20px" color="black">
                <Image src="/stack.png" />
            </Center>
            <Center mt="100px" color="black">
                <Text width="50%">
                    <b>Disclaimer:</b> Giftlax is a personal project I built to learn
                    cool technologies like React, how to work with databases,
                    and how to deploy full-stack projects. However, please keep in mind that Giftlax is
                    more of an experiment than a fully polished product, so there might be
                    bugs, vulnerabilities, or limitations that could affect its
                    performance or compromise user data (but your Google account
                    is safe).
                </Text>
            </Center>
            <Center>
                <Text width="50%" mt="20px">
                    <b>For more:</b> If you're curious and want to dig deeper into the project, you
                    can find the source code and other details on the GitHub
                    page and blog post. Thanks for visiting! --Alex Zhu
                </Text>
            </Center>
            <Center mt="20px" mb="200px">
                <HStack spacing="20px">
                    <Link href="https://github.com/probablyalexzhu/giftlax" isExternal>
                        GitHub <ExternalLinkIcon mx="4px" />
                    </Link>
                    <Link href="https://probablyalexzhu.github.io/" isExternal>
                        Blog <ExternalLinkIcon mx="4px" />
                    </Link>
                </HStack>
            </Center>
        </ChakraProvider>
    );
}
