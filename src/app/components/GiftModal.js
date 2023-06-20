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
import GiftListInput from "./GiftListInput.js"
import NotesInput from "./NotesInput.js"
import PocketBase from "pocketbase";

export default function GiftModal({ item }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [eventList, setList] = useState(item?.gifts);
    const handleListChange = (event) => setList(event.target.value);
    const [eventNotes, setNotes] = useState(item?.notes);
    const handleNotesChange = (event) => setNotes(event.target.value);
    const recordId = item?.id;
    const toast = useToast();

    function handleUpdate(eventList, eventNotes) {
        toast({
            title: "Gifts updated.",
            description: "We've updated those gifts for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        onClose();
        updateDatabaseEvent(eventList, eventNotes);
    }

    async function updateDatabaseEvent(eventList, eventNotes) {
        console.log(eventList);
        console.log(eventNotes);
        
        const pb = new PocketBase("http://127.0.0.1:8090");
        // console.log(eventDate);
        // edit data
        const data = {
            gifts: eventList,
            notes: eventNotes,
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
                        <GiftListInput item={item} eventList={eventList} handleListChange={handleListChange}/>

                        <FormLabel mt={4}>Notes</FormLabel>
                        <NotesInput item={item} eventNotes={eventNotes} handleNotesChange={handleNotesChange}/>
                    </ModalBody>
                    <ModalFooter>
                            <Button
                                colorScheme="green"
                                mr={3}
                                onClick={() =>
                                    handleUpdate(eventList, eventNotes)
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
