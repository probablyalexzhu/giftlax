"use client";
import { useEffect, useState } from 'react';
import PocketBase from "pocketbase";
import GreenButton from "../components/GreenButton.js";
import EventList from "../components/EventList.js";
import { User } from "../components/user.component"
import {
    ChakraProvider,
    Flex,
    Box,
    extendTheme,
    Stack,
    HStack,
    Spacer,
    Text,
    Avatar,
    VStack,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Giftlax() {

    // const [name, updateName] = useState("");
    // const [imgLink, updateLink] = useState("");
    // const [email, updateEmail] = useState("");

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/callback/google?callbackUrl=/my-giftlax");
        },
    });

    // // event handler
    // useEffect(() => {
    //    if(status === "authenticated") {
    //         console.log("authenticated!")
    //         updateName(session.user.name);
    //         updateLink(session.user.image);
    //         updateEmail(session.user.email);
    //     } else {
    //         console.log("cry")
    //     }
    // });    

    useEffect(() => {
        getDatabaseStuff();
    }, [session]);

    const [myJSON, setState] = useState("nothing yet");
    async function getDatabaseStuff() {
        const pb = new PocketBase("http://127.0.0.1:8090");

        // getFullList is DEFINITELY A FUTURE SECURITY ISSUE TO ADDRESS
        const records = await pb.collection('events').getFullList({
            filter: `email="${ session?.user?.email }"`
        });
        setState(JSON.stringify(records));

        console.log("name: " + session?.user?.name);
        console.log(myJSON);
    }
    console.log("json in the wild: " + myJSON);

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

    // if(status === "loading") {
    //     return <div>Loading</div>
    // }
    return (
        <ChakraProvider padding="20">
            <Text>me jsonny: {myJSON}</Text>
            {/* <AsyncTest /> */}
            <HStack spacing="10" padding="20">
                <Box width="100%">
                    <Stack spacing="20px">
                        
                        <HStack spacing="20">
                            <Text fontSize="4xl">
                                <b>Today:</b> {date}
                            </Text>
                            <Spacer />
                            <UserBar
                                name = {session?.user?.name}
                                link = {session?.user?.image}
                            />
                            <GreenButton />
                        </HStack>
                        <EventList />
                    </Stack>
                </Box>
            </HStack>
        </ChakraProvider>
    );
}

export const UserBar = (props) => {
    return (
        <ChakraProvider>
            <HStack spacing="15px">
                <Text fontSize="lg"><b>{props.name}</b></Text>
                <Avatar bg="orange.400" size="sm" name={props.name} src={props.link} />{" "}
            </HStack>
        </ChakraProvider>
    );
};