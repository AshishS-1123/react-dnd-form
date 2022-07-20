import React from "react";
import  {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import CreationDialog from "../CreationDialog";

const CREATION_LABEL_TEXT = "Question you want the user to see";
const CREATION_INPUT_TEST_ID = "element-boolean-creation-input";
const CREATION_ERROR_TEST_ID = "element-boolean-creation-error";
const CREATION_EMPTY_INPUT_ERROR_MSG = "Input field cannot be empty";

describe("Boolean Element : Creation Dialog", () => {
    it('should contain necessary elements building the form', () => {
        // Elements that must be present-
        // Label (for question), Input (for answer), Submit button, P Tag (for errors), Checkbox (is required)

        render(<CreationDialog onSubmit={() => {}}/>);

        // check that a label for taking user input exists.
        const labelNode = screen.getByLabelText(CREATION_LABEL_TEXT);
        expect(labelNode).toBeInTheDocument();

        // check that a corresponding input exists.
        const inputNode = screen.getByTestId(CREATION_INPUT_TEST_ID);
        expect(inputNode).toBeInTheDocument();

        // Check that a submit button exists.
        const submitButtonNode = screen.getByRole('button');
        expect(submitButtonNode).toBeInTheDocument();

        // There should be a <p> tag that currently contains no text,
        // but will later be used for displaying error messages.
        const errorNode = screen.getByTestId(CREATION_ERROR_TEST_ID);
        expect(errorNode).toBeInTheDocument();
        // Initially, this should not contain any text.
        expect(errorNode).toHaveTextContent("");

        // There should be a checkbox to know if this input is required.
        const checkboxNode = screen.getByRole('checkbox');
        expect(checkboxNode).toBeInTheDocument();
        // This checkbox should be unchecked initially.
        expect(checkboxNode).not.toBeChecked();
    });

    it('should validate input after submit button is pressed, and display appropriate message', async () => {
        const user = userEvent.setup();

        render(<CreationDialog onSubmit={() => {}}/>);
        const inputNode = screen.getByTestId(CREATION_INPUT_TEST_ID);
        const submitButtonNode = screen.getByRole('button');
        const errorNode = screen.getByTestId(CREATION_ERROR_TEST_ID);

        // First, hit the submit button with no text in the input.
        await user.click(submitButtonNode);

        // This should display error in the error node.
        expect(errorNode).toHaveTextContent(CREATION_EMPTY_INPUT_ERROR_MSG);

        // Then, type something in the input node.
        await user.type(inputNode, "Some random string");

        // Now, the error message should be gone.
        expect(errorNode).toHaveTextContent("");
    });

    it('should trigger callback when submit button is clicked', async () => {
        const user = userEvent.setup();
        const submitCallback = jest.fn();

        render(<CreationDialog onSubmit={submitCallback}/>);
        const inputNode = screen.getByTestId(CREATION_INPUT_TEST_ID);
        const checkboxNode = screen.getByRole('checkbox');
        const submitButtonNode = screen.getByRole('button');

        // Type some random text,
        await user.type(inputNode, "Some random string");

        // Check the isRequired box.
        await user.click(checkboxNode);

        // Now, submit the form.
        await user.click(submitButtonNode);

        // This should have triggered the callback.
        // Also, check that the parameters are correct.
        expect(submitCallback).toHaveBeenCalledWith("Some random string", true);

        // After clicking the submit button, the button should be disabled.
        // This will prevent the user from triggering multiple callbacks when 
        // the API request takes too long.
        expect(submitButtonNode).toBeDisabled();
    });
    
})