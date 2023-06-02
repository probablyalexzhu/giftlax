// code from https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
"use client";

import { signIn, signOut } from "next-auth/react";
import NextLink from "next/link";
import React from "react";
import { Button, Icon } from "@chakra-ui/react";
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
                Log In
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
            <Button
                color="white"
                variant="link"
                size="lg"
                leftIcon=<CustomIcon />
            >
                Home
            </Button>
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
