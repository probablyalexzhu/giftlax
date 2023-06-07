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
    Box
} from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import PocketBase from "pocketbase";

export default function GreenButton(email) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const emailString = JSON.parse(JSON.stringify(email)).email;

    function handleSubmit(emailString) {
        onClose();
        createDatabaseEvent(emailString);
    }
    
    async function createDatabaseEvent(emailString) {
        const pb = new PocketBase("http://127.0.0.1:8090");

        // example create data
        const data = {
            "name": "test",
            "gifts": "test",
            "date": "2022-01-01 10:00:00.123Z",
            "email": emailString
        };

        const record = await pb.collection('events').create(data);
    }

    return (
        <>
            <Box padding="5">
                <Button
                    size="lg"
                    colorScheme="green"
                    rightIcon={<AddIcon />}
                    aria-label="New Event"
                    onClick={onOpen}
                >New Event</Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Event name</FormLabel>
                            <Input ref={initialRef} placeholder="Name" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Budget</FormLabel>
                            <Input placeholder="Budget (optional)" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Date</FormLabel>
                            <Input
                                placeholder="Select Date"
                                size="md"
                                type="date"
                            />
                        </FormControl>
                        <Checkbox colorScheme="green" mt={4}>
                            Recurs Annually
                        </Checkbox>
                    </ModalBody>

                    <ModalFooter>
                        {/* () => makes it only run fxn on click */}
                        <Button colorScheme="green" mr={3} onClick={() => handleSubmit(emailString)}>
                            Save Event
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

