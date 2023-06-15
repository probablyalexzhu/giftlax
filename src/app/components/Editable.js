import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    IconButton,
    Input,
    useEditableControls,
    Flex,
    ButtonGroup,
    Button
} from "@chakra-ui/react";
import { CheckIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import PocketBase from "pocketbase";

export default function EditableTextInput({ item }) {

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

    /* Here's a custom control */
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();

        return isEditing ? (
            <ButtonGroup justifyContent="left" size="sm">
                <IconButton
                    icon={<CheckIcon />}
                    {...getSubmitButtonProps()}
                    colorScheme="green"
                    onClick={() => handleUpdate(eventList) }
                />
                <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent="left">
                <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    {...getEditButtonProps()}
                />
            </Flex>
        );
    }

    return (
        <Editable
            textAlign="left"
            defaultValue={eventList}
            fontSize="2xl"
            isPreviewFocusable={false}
        >
            <EditablePreview />
            {/* Here is the custom input */}
            <Input
                as={EditableInput}
                value={eventList}
                onChange={handleListChange}
            />
            <EditableControls />
        </Editable>
    );
}
