import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";

export interface Props {
    onSubmit: (inputQuestion: string, isRequired: boolean) => void,
}

function CreationDialog(props: Props) {
    const [inputQuestion, setInputQuestion] = useState("");
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

    const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        // Verify that the inputs are correct.
        if(inputQuestion === "") {
            setErrorMessage("Input field cannot be empty");
            return;
        }

        // Disable the submit button first.
        setSubmitDisabled(true);

        // Trigger callback here.
        props.onSubmit(inputQuestion, isRequired);
    }

    return (
        <form role="form">
            <label 
                htmlFor="boolean-question-input"
                id="boolean-question-label"
            >
                Question you want the user to see
            </label>

            <input 
                id="boolean-question-input" 
                data-testid="element-boolean-creation-input"
                value={inputQuestion}
                onChange={handleInputChange}
            />

            <p data-testid="element-boolean-creation-error">{errorMessage}</p>

            <input 
                type="checkbox" 
                role="checkbox" 
                id="question-checkbox"
                value={String(isRequired)}
                onChange={handleCheckboxChange}
            />

            <button 
                type="submit" 
                role="button" 
                id="element-boolean-creation-submit"
                onClick={handleFormSubmit}
                disabled={submitDisabled}
            />
        </form>
    );
}

export default CreationDialog;