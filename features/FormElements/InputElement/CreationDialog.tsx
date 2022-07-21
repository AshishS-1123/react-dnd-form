import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";

type allowedInputTypes = "email" | "number" | "url" | "text" | "date" | "datetime-local";
const allowedInputs = ["email", "number", "url", "text", "date", "datetime-local"];

export interface Props {
    onSubmit: (
        inputQuestion: string, 
        isRequired: boolean, 
        inputType: allowedInputTypes
    ) => void,
}

function CreationDialog(props: Props) {
    const [inputQuestion, setInputQuestion] = useState("");
    const [inputType, setInputType] = useState<allowedInputTypes>("text")
    const [isRequired, setIsRequired] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setInputQuestion(event.target.value);

        // Clear error if any.
        if (event.target.value !== "" && errorMessage !== "") {
            setErrorMessage("");
        }
    }

    const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setIsRequired(event.target.checked);
    }

    const handleDropdownChanged: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setInputType(event.target.value as allowedInputTypes);
    }

    const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        // Verify that the inputs are correct.
        if(inputQuestion === "") {
            setErrorMessage("Input field for user question must not be empty");
            return;
        }

        // Disable the submit button first.
        setSubmitDisabled(true);

        // Trigger callback here.
        props.onSubmit(inputQuestion, isRequired, inputType);
    }

    return (
        <form>
            <label
                htmlFor="input-question-input"
                id="input-question-label"
            >
                Question you want the user to see
            </label>

            <input 
                id="input-question-input"
                data-testid="element-input-creation-input"
                value={inputQuestion}
                onChange={handleInputChange}
            />

            <p data-testid="element-input-creation-error">{errorMessage}</p>

            <input 
                type="checkbox" 
                role="checkbox" 
                id="question-checkbox"
                value={String(isRequired)}
                onChange={handleCheckboxChange}
            />

            <select
                name="input-select-dropdown"
                data-testid="element-input-type-dropdown"
                onChange={handleDropdownChanged}
                defaultValue={inputType}
            >
                {
                    allowedInputs.map(currType => {
                        return <option value={currType} key={currType}>{currType}</option>
                    })
                }
            </select>

            <button 
                type="submit" 
                role="button" 
                id="element-input-creation-submit"
                onClick={handleFormSubmit}
                disabled={submitDisabled}
            />
        </form>
    );
}

export default CreationDialog;
