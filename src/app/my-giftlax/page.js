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
    Skeleton,
    Spinner,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Giftlax() {
    const [data, setData] = useState([]);
    const [myJSON, setState] = useState("nothing yet");
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/callback/google?callbackUrl=/my-giftlax");
        },
    });
    const pb = new PocketBase("http://127.0.0.1:8090");
    
    // when NextAuth session loads in, fetch from db using session email
    useEffect(() => {
        getDatabaseEvents();
    }, [session]);
    
    async function getDatabaseEvents() {
        // this filter method could be made more secure in the future
        const records = await pb.collection('events').getFullList({
            filter: `email="${ session?.user?.email }"`,
            sort: 'date',
        });
        setState(JSON.stringify(records));
        setData(records);
    }

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
        <ChakraProvider padding="20">
            {/* <Text>JSON string: {myJSON}</Text> */}
            <HStack spacing="10" padding="20">
                <Box width="100%">
                    <Stack spacing="20px">
                        
                        <HStack spacing="20">
                            <Text fontSize="4xl">
                                <b>Today:</b> {date}
                            </Text>
                            <Spacer />
                            {status === "loading" ?
                                (<Spinner/>)
                                    : 
                                (<UserBar
                                    name = {session?.user?.name}
                                    link = {session?.user?.image}
                                />)
                            }
                            <GreenButton email={session?.user?.email}/>
                        </HStack>
                        {status === "loading" ?
                            (<Stack spacing="30px" padding="5">
                                <Skeleton height='150px' />
                                <Skeleton height='150px' />
                                <Skeleton height='150px' />
                            </Stack>)
                                 : 
                            (<EventList data={data}/>)
                        }
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