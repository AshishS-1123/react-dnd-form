import React, { ChangeEvent, MouseEvent, useState } from "react";
import { KeyValuePair } from ".";

export interface Props {
    addOption: (option: KeyValuePair) => void, // Request parent to add this option to global list.
    errorMessage: string, // Parent sets error when duplicate keys are present.
}

function AddOptionContainer(props: Props): JSX.Element {
    const [key, setKey] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value);
    }

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleFormSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // Ensure both inputs are not empty.
        if (key === "" || value === "") {
            setError("Both inputs are compulsory.");
            return;
        }

        setError("");

        props.addOption({key, value});
    }
    
    return (
        <>
            <label id="add-option-container-key-label" htmlFor="add-option-container-key-input">
                Key
            </label>
            <input 
                id="add-option-container-key-input" 
                type="text" 
                data-testid="add-option-container-key-input"
                value={key}
                onChange={handleKeyChange}
            />

            <label id="add-option-container-value-label" htmlFor="add-option-container-value-input">
                Value
            </label>
            <input 
                id="add-option-container-value-input" 
                type="text" 
                data-testid="add-option-container-value-input"
                value={value}
                onChange={handleValueChange}
            />
            
            <p data-testid="add-option-container-error-node">{`${error}${props.errorMessage}`}</p>

            <button 
                type="submit"
                onClick={handleFormSubmit}
            >
                Add Option
            </button>
        </>
    );
}

export default AddOptionContainer;