import {
    Text,
    HStack,
    Box,
    Avatar,
    Stack,
} from "@chakra-ui/react";

export default function ChatBox({ data }) {
    return data.map((item) => <MessageItem key={item?.id} item={item} />);
}

function MessageItem({ item }) {
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
    let dateObject = new Date(item?.created).toString();
    const dateParts = dateObject.split(" ");
    const monthString = dateParts[1];
    const dayString = dateParts[2];
    let timeString = dateParts[4].substring(0, 5);
    timeString = timeString.replace(/^[0:]+(?=\d[\d:]{3})/, '');
    const dateString = `${monthString} ${parseInt(dayString,10)} at ${timeString}`;

    return (
        <Box mt="5">
            <HStack>
                <Avatar
                    bg="orange.400"
                    size="md"
                    name={item?.name}
                    src={item?.avatarUrl}
                />{" "}
                <Stack>
                    <HStack spacing="20px">
                        <Text>
                            <b>{item?.name}</b>
                        </Text>
                        <Text color="grey">{dateString}</Text>
                    </HStack>
                    <Text>{item?.message}</Text>
                </Stack>
            </HStack>
        </Box>
    );
}
