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
    Checkbox
} from "@chakra-ui/react";
import { useRef } from "react";

export default function EventModalButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    return (
        <>
            <Button size="md" onClick={onOpen}>
                Edit
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Entry</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Entry name</FormLabel>
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
                        <Checkbox colorScheme="green" mt={4}>Recurs Annually</Checkbox>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={onClose}>
                            Save Entry
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
