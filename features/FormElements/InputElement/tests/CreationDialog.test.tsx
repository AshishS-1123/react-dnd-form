import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import CreationDialog from "../CreationDialog";

const CREATION_LABEL_TEXT = "Question you want the user to see";
const CREATION_INPUT_TEST_ID = "element-input-creation-input";
const CREATION_ERROR_TEST_ID = "element-input-creation-error";
const CREATION_DROPDOWN_TEST_ID = "element-input-type-dropdown";

describe("Input Element : Creation Dialog", () => {
    it("should contain a form with necessary DOM elements", () => {
        // Elements that must be present-
        // Label (for question), Input (for answer), Submit button, P Tag (for errors), Checkbox (is required)
        // Dropdown (for type of input tag)

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

        // Check if a dropdown menu is present.
        const dropDownNode = screen.getByTestId(CREATION_DROPDOWN_TEST_ID);
        expect(dropDownNode).toBeInTheDocument();

        // Check the number of options in the dropdown menu.
        expect(screen.getAllByRole('option').length).toBe(6);
        // The text option should be selected by default.
        expect((screen.getByRole('option', {name: "text"}) as HTMLOptionElement).selected).toBeTruthy();
    });

    it('should show error message if submitted without entering the question', async () => {
        const user = userEvent.setup();

        render(<CreationDialog onSubmit={() => {}}/>);
        const inputNode = screen.getByTestId(CREATION_INPUT_TEST_ID);
        const submitButtonNode = screen.getByRole('button');
        const errorNode = screen.getByTestId(CREATION_ERROR_TEST_ID);

        // First, hit the submit button with no text in the input.
        await user.click(submitButtonNode);

        // This should display error in the error node.
        expect(errorNode).toHaveTextContent("Input field for user question must not be empty");

        // Then, type something in the input node.
        await user.type(inputNode, "Some random string");

        // Now, the previous error should be gone.
        expect(errorNode).toHaveTextContent("");
    });

    it('should trigger callback when submit button is clicked without errors', async () => {
        const user = userEvent.setup();
        const onSubmitCallback = jest.fn();

        render(<CreationDialog onSubmit={onSubmitCallback}/>);
        const inputNode = screen.getByTestId(CREATION_INPUT_TEST_ID);
        const submitButtonNode = screen.getByRole('button');
        const dropDownNode = screen.getByTestId(CREATION_DROPDOWN_TEST_ID);

        // First type something in the input for question so we don't get error for that.
        await user.type(inputNode, "Some random string");

        // Now select some option from the dropdown menu.
        await user.selectOptions(dropDownNode, "email");

        // Make sure this option gets selected.
        expect((screen.getByRole('option', {name: "email"}) as HTMLOptionElement).selected).toBeTruthy();
        // For more confidence in the test, make sure some other option is not selected too.
        expect((screen.getByRole('option', {name: "url"}) as HTMLOptionElement).selected).not.toBeTruthy();

        // Now click on the submit button and make sure that the callback is called with correct parameters.
        await user.click(submitButtonNode)
        expect(onSubmitCallback).toHaveBeenCalledWith("Some random string", false, "email");
    });

    
    
});
