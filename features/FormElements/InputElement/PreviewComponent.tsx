// This component renders the form element
// based on the inputs given by user in CreationDialog.
import React, { ChangeEvent, FocusEvent, useState } from "react";
import { allowedInputTypes } from "./CreationDialog";

export interface Props {
    inputLabel: string, // This is the label of question displayed to user.
    isRequired: boolean, // Flag indicating whether answering this question is necessary.
    inputType: allowedInputTypes, // Type of input to be displayed. 
    setResponse: (userResponse: string) => void, // Callback to be called every time user response changes.
}

function PreviewComponent(props: Props) {
    const [userResponse, setUserResponse] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
        // If the input loses focus, check if any text is present in it.
        // If the input is empty, display an error message.
        if (userResponse === "" && props.isRequired === true) {
            setErrorMessage("This field must not be empty.");
        } else {
            setErrorMessage("");
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserResponse(event.target.value);
        props.setResponse(event.target.value);
    }

    return (
        <>
            <label htmlFor="element-input-preview-input" id="element-input-preview-label">
                {props.inputLabel}
            </label>
            <input 
                type={props.inputType} 
                id="element-input-preview-input"
                data-testid="element-input-preview-input"
                onBlur={handleInputBlur}
                value={userResponse}
                onChange={handleInputChange}
            />
            <p data-testid="element-input-preview-error">{errorMessage}</p>
        </>
    );
}

export default PreviewComponent;