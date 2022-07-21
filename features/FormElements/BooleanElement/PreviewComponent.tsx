// This component renders the form element
// based on the inputs given by user in CreationDialog.
import React, { useState } from "react";
import ToggleButton from "../../../components/ToggleButton";

export interface Props {
    inputLabel: string, // This is the label of question displayed to user.
    isRequired: boolean, // Flag indicating whether answering this question is necessary.
    setResponse: (userResponse: boolean) => void, // Callback to be called every time user response changes.
}

function PreviewComponent(props: Props) {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleButtonToggled = (): void => {
        setIsSwitchOn(prevState => {
            // Update the response in parent component.
            props.setResponse(!prevState);
            // Then set state in this component.
            return !prevState;
        });
    }

    return (
        <>
            <span id="">{props.inputLabel}</span>
            <ToggleButton isOn={isSwitchOn} toggleState={handleButtonToggled}/>
        </>
    );
}

export default PreviewComponent;