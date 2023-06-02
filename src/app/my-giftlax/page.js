"use client";

import GreenButton from "../components/GreenButton.js";
import EventList from "../components/EventList.js";
import {
    ChakraProvider,
    Flex,
    Box,
    extendTheme,
    Stack,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const customTheme = {
    // extension of theme for future use
};

export const theme = extendTheme({ customTheme });

export default async function Home() {
    // const session = await getServerSession(authOptions); // culprit
    // console.log(session);

    // protect doc
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/callback/google?callbackUrl=/my-giftlax");
        },
    });

    const current = new Date();
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = weekday[current.getDay()];
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let monthName = month[current.getMonth()];
    const date = `${day} ${monthName} ${current.getDate()}, ${current.getFullYear()}`;
    return (
        <ChakraProvider theme={theme} padding="20">
            <Flex spacing="10" padding="20">
                <GreenButton />
                <Spacer />
                <Box width="95%">
                    <Stack spacing="20px">
                        <Text fontSize="3xl">
                            <b>Today:</b> {date}
                        </Text>
                        <EventList />
                    </Stack>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}
