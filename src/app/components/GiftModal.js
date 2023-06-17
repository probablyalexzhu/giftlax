import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Box,
    Tooltip,
    useToast,
    Spacer,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Icon,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiGift } from "react-icons/fi";
import EditableTextInput from "./Editable.js"
import PocketBase from "pocketbase";

export default function GiftModal({ item }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [eventList, setList] = useState(item?.gifts);
    const handleListChange = (event) => setList(event.target.value);
    const recordId = item?.id;

    function handleUpdate(eventList) {
        // toast({
        //     title: "Event updated.",
        //     description: "We've updated that event for you.",
        //     status: "success",
        //     duration: 5000,
        //     isClosable: true,
        // });
        onClose();
        updateDatabaseEvent(eventList);
    }

    async function updateDatabaseEvent(eventList) {
        console.log(eventList);
        const pb = new PocketBase("http://127.0.0.1:8090");
        // console.log(eventDate);
        // edit data
        const data = {
            gifts: eventList,
        };
        const record = await pb.collection("events").update(recordId, data);
        console.log("bazinga")
    }

    return (
        <>
            <Button size="lg" rightIcon=<CustomIcon /> onClick={onOpen}>
                Gifts
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Gifts</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel>Gift List</FormLabel>
                        <EditableTextInput item={item} eventList={eventList} handleListChange={handleListChange}/>
                    </ModalBody>
                    <ModalFooter>
                            <Button
                                colorScheme="green"
                                mr={3}
                                onClick={() =>
                                    handleUpdate(eventList)
                                }
                            >
                                Update Gifts
                            </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

function CustomIcon() {
    return <Icon as={FiGift} />;
}
