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
import { useRef } from "react";
import { AddIcon } from "@chakra-ui/icons";

export default function GreenButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
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
                        <Button colorScheme="green" mr={3} onClick={onClose}>
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

