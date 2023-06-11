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
    Text,
    Icon
} from "@chakra-ui/react";
import { FiGift } from "react-icons/fi";

export default function GiftModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button size="lg" rightIcon=<CustomIcon /> onClick={onOpen}>
                Gifts
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>hello!</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

function CustomIcon() {
    return <Icon as={FiGift} />;
}
