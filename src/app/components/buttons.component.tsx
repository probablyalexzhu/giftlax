// code from https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
"use client";

import { signIn, signOut } from "next-auth/react";
import NextLink from "next/link";
import Image from "next/image";
import React from "react";
import { Button, Icon, Heading, HStack } from "@chakra-ui/react";
import { FiGift } from "react-icons/fi";

export const LoginButton = () => {
    return (
        <Button color="white" variant="link" size="lg" onClick={() => signIn()}>
            Log In
        </Button>
    );
};

export const LogoutButton = () => {
    return (
        <Button
            color="white"
            variant="link"
            size="lg"
            onClick={() => signOut()}
        >
            Log Out
        </Button>
    );
};

export const LoginButton2 = (props) => {
    const { name } = props;
    if (name == "") {
        return (
            <Button
                colorScheme="green"
                size="lg"
                variant="solid"
                onClick={() => signIn()}
            >
                Sign Up
            </Button>
        );
    } else {
        return (
            <NextLink href="/my-giftlax" passHref>
                <Button colorScheme="green" size="lg" variant="solid">
                    Open Giftlax
                </Button>
            </NextLink>
        );
    }
};

export const HomeButton = () => {
    return (
        <NextLink href="/" passHref>
            <HStack>
                <Image
                    src="/logoOnly.png"
                    alt="Giftlax Logo"
                    width="50"
                    height="50"
                    style={{ width: "auto", height: "auto" }}
                />
                <Heading color="white" size="xl">
                    Giftlax
                </Heading>
            </HStack>
        </NextLink>
    );
};

export const GiftlaxButton = () => {
    return (
        <NextLink href="/my-giftlax" passHref>
            <Button
                color="white"
                colorScheme="orange"
                variant="solid"
                size="lg"
            >
                My Giftlax
            </Button>
        </NextLink>
    );
};

function CustomIcon() {
    return <Icon as={FiGift} />;
}
