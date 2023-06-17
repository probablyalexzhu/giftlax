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

export default function GiftListInput({ item, eventList, handleListChange }) {

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
            defaultValue={item?.gifts}
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
