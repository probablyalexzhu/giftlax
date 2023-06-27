"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    ChakraProvider,
    Box,
    Stack,
    HStack,
    Text,
    Avatar,
    Skeleton,
    Spinner,
    Center,
    FormControl,
    Input,
    Button,
    Divider,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import PocketBase from "pocketbase";
import ChatBox from "../components/ChatBox.js";

export default function Chat() {
    useEffect(() => {
        // fired on component mount.
        return () => {
            // fired on component unmount.
            pb.collection("chat").unsubscribe("*");
        };
    }, []);

    const [data, setData] = useState([]);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/callback/google?callbackUrl=/chat");
        },
    });
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    const [message, setMessage] = useState("");
    const handleMessageChange = (event) => setMessage(event.target.value);

    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    yourDate = yourDate.toISOString().split("T")[0];
    // console.log(yourDate);
    let yourDateFilter = `created > '${yourDate}'`;
    // console.log(yourDateFilter);
    // console.log(session?.user?.name);
    // console.log(session?.user?.image);

    // when NextAuth session loads in, fetch from db using session email
    useEffect(() => {
        getDatabaseEvents();
    }, [session]);

    async function getDatabaseEvents() {
        // for initial page opening
        // this filter method could be made more secure in the future
        let records = await pb.collection("chat").getList(1, 20, {
            sort: "-created",
            filter: yourDateFilter,
        });
        setData(records.items);

        // for live updates
        pb.collection("chat").subscribe("*", async function (e) {
            // console.log("update received");

            // this filter method could be made more secure in the future
            records = await pb.collection("chat").getList(1, 20, {
                sort: "-created",
                filter: yourDateFilter,
            });
            setData(records.items);
        });
    }

    // console.log(data);

    function handleSubmit() {
        createDatabaseEvent();
        setMessage("");
    }

    async function createDatabaseEvent() {
        if (message == "" || message.length > 75) return;
        const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
        // console.log("hello");
        // console.log(session?.user?.name);
        // console.log(message);
        // create data
        const data = {
            name: session?.user?.name,
            avatarUrl: session?.user?.image,
            message: message,
        };

        const record = await pb.collection("chat").create(data);
    }

    return (
        <ChakraProvider>
            <Center spacing="20px">
                <Stack>
                    <HStack width="50%" maxWidth="4xl" mt="100px">
                        <Stack>
                            <Text fontSize="4xl">
                                <b>Chat</b>
                            </Text>
                            <Text>
                                Feel free to discuss gift ideas! Please keep
                                chat appropriate. Messages are cleared within 24
                                hours.
                            </Text>
                            <Divider></Divider>
                            {status === "loading" ? (
                                <Skeleton height="400px" />
                            ) : (
                                <Box
                                    overflowY="auto"
                                    maxHeight="380px"
                                    minWidth="3xl"
                                >
                                    <ChatBox data={data} />
                                </Box>
                            )}
                        </Stack>
                    </HStack>
                    <Box>
                        <HStack mt="20px">
                            <FormControl isRequired>
                                <Input
                                    placeholder="Message other Giftlax users"
                                    value={message}
                                    onChange={handleMessageChange}
                                />
                            </FormControl>
                            <Button
                                colorScheme="green"
                                mr={3}
                                onClick={() => handleSubmit()}
                                rightIcon={<ChatIcon />}
                            >
                                Send
                            </Button>
                        </HStack>
                        <HStack width="50%" mt="20px">
                            {status === "loading" ? (
                                <Spinner />
                            ) : (
                                <UserBar
                                    name={session?.user?.name}
                                    link={session?.user?.image}
                                />
                            )}
                        </HStack>
                    </Box>
                </Stack>
            </Center>
        </ChakraProvider>
    );
}

function UserBar(props) {
    // console.log("propagations");
    // console.log(props);

    return (
        <HStack>
            <Avatar
                bg="orange.400"
                size="sm"
                name={props?.name}
                src={props?.link}
            />{" "}
            <Text fontSize="lg">{props?.name}</Text>
        </HStack>
    );
}
