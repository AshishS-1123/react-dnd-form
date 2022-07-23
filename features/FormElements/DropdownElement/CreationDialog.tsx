import React, { ChangeEvent, MouseEvent, useState } from "react";
import OptionContainer, { KeyValuePair } from "../../../components/OptionContainer";

export interface Props {
    onSubmit: (inputQuestion: string, options: KeyValuePair[]) => void,
}

function CreationDialog(props: Props): JSX.Element {
    const [input, setInput] = useState<string>("");
    const [options, setOptions] = useState<KeyValuePair[]>([]);
    const [error, setError] = useState<string>("");

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);

        if (event.target.value !== "" && error !== "") {
            setError("");
        }
    }

    const handleSetOptions = (newOptions: KeyValuePair[]) => {
        setOptions(newOptions);
    }

    const handleCreateButtonClick = (event: MouseEvent) => {
        event.preventDefault();

        // Check that at least one option is present.
        if (options.length === 0) {
            // Display error message.
            setError("Please provide at least one option");
            return;
        }

        if (input === "") {
            // Display error message.
            setError("Please provide input question");
            return;
        }

        setError("");
        props.onSubmit(input, options);
    }

    return (
        <form role="form">
            <label
                htmlFor="element-checkbox-creation-input"
                id="element-checkbox-creation-label"
            >
                Question you want the user to see.
            </label>

            <input
                type="text"
                id="element-checkbox-creation-input"
                data-testid="element-checkbox-creation-input"
                value={input}
                onChange={inputChangeHandler}
            />

            <p
                data-testid="element-checkbox-creation-error"
            >
                {error}
            </p>

            <OptionContainer setOptionsExternal={handleSetOptions}/>

            <button 
                type="submit"
                name="Create Element"
                onClick={handleCreateButtonClick}
            >
                Create Element
            </button>
        </form>
    );
}

export default CreationDialog;
