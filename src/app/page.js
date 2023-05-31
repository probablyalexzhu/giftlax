"use client";

import GreenButton from "./components/GreenButton.js";
import EventList from "./components/EventList.js";
import {
    ChakraProvider,
    Flex,
    Box,
    extendTheme,
    Stack,
    Spacer,
    Text,
} from "@chakra-ui/react";
import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
  } from "./components/buttons.component";
import { User } from "./components/user.component";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect} from 'next/navigation'
import { useSession } from 'next-auth/react'

const customTheme = {
    // extension of theme for future use
};

export const theme = extendTheme({ customTheme });

export default async function Home() {
    return (
        <ChakraProvider theme={theme} padding="20">
            <LoginButton />
            <LogoutButton />
            <User />
        </ChakraProvider>
    );
}
