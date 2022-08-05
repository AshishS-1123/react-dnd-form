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
        <form role="form" className="p-5 flex flex-col">
            <label 
                htmlFor="boolean-question-input"
                id="boolean-question-label"
                className="subpixel-antialiased font-medium mb-5"
            >
                Question you want the user to see
            </label><br />

            <input 
                id="boolean-question-input" 
                data-testid="element-boolean-creation-input"
                value={inputQuestion}
                onChange={handleInputChange}
                className="px-3 py-3 mb-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
            />

            <p 
                data-testid="element-boolean-creation-error"
                className="mb-5"
            >
                {errorMessage}
            </p>

            <label
                htmlFor="question-checkbox"
            >
                Is this input required?&nbsp;
                <input 
                    type="checkbox" 
                    role="checkbox" 
                    id="question-checkbox"
                    value={String(isRequired)}
                    onChange={handleCheckboxChange}
                />
            </label>

            <button 
                type="submit" 
                role="button" 
                id="element-boolean-creation-submit"
                onClick={handleFormSubmit}
                disabled={submitDisabled}
            >Add Element</button>
        </form>
    );
}

export default CreationDialog;