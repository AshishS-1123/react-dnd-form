import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import CreationDialog from "../CreationDialog";

const LABEL_TEXT = "Question you want the user to see.";
const INPUT_TEST_ID = "element-checkbox-creation-input";
const KEY_INPUT_TEST_ID = "add-option-container-key-input";
const VALUE_INPUT_TEST_ID = "add-option-container-value-input";
const ERROR_NODE_TEST_ID = "element-checkbox-creation-error";
const OPTION_CONTAINER_TEST_ID = "component-optionContainer-container";
const ERROR_MESSAGE = "Please provide at least one option";

describe("Checkbox Element : Creation Dialog", () => {
    it("should contain the correct DOM elements", () => {
        // DOM elements that must be present are-
        // Label (for question), Input, P Tag (error), OptionContainer, Submit
        render(<CreationDialog onSubmit={() => {}}/>);

        const labelNode = screen.getByLabelText(LABEL_TEXT);
        expect(labelNode).toBeInTheDocument();

        const inputNode = screen.getByTestId(INPUT_TEST_ID);
        expect(inputNode).toBeInTheDocument();
        // Input should be empty initially.
        expect(inputNode).toHaveValue("");

        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);
        expect(errorNode).toBeInTheDocument();
        // No error message initially.
        expect(errorNode).toBeEmptyDOMElement();

        const optionsNode = screen.getByTestId(OPTION_CONTAINER_TEST_ID);
        expect(optionsNode).toBeInTheDocument();

        const submitButton = screen.getByRole("button", {name: "Create Element"});
        expect(submitButton).toBeInTheDocument();
    });

    it("should display error message when no input question is provided", async () => {
        const user = userEvent.setup();
        render(<CreationDialog onSubmit={() => {}}/>);

        const submitButton = screen.getByRole("button", {name: "Create Element"});
        const inputNode = screen.getByTestId(INPUT_TEST_ID);
        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);
        const addKeyInputNode = screen.getByTestId(KEY_INPUT_TEST_ID);
        const addValueInputNode = screen.getByTestId(VALUE_INPUT_TEST_ID);
        const addOptionButtonNode = screen.getByRole("button", {name: "Add Option"});

        // Adding an option should remove the error.
        await user.type(addKeyInputNode, "Key 1");
        await user.type(addValueInputNode, "Value 1");
        
        // Click on the add button.
        await user.click(addOptionButtonNode);
        
        // Now submit form in creation dialog.
        await user.click(submitButton);
        
        // There should be error message saying input is required
        expect(errorNode).toHaveTextContent("Please provide input question");
        
        // Type something in input and error should disappear.
        await user.type(inputNode, "Some input");

        expect(errorNode).toBeEmptyDOMElement();
    })

    it("should render error message when no options for checkbox are provided", async () => {
        const user = userEvent.setup();
        render(<CreationDialog onSubmit={() => {}}/>);

        const submitButton = screen.getByRole("button", {name: "Create Element"});
        const inputNode = screen.getByTestId(INPUT_TEST_ID);
        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);
        const addKeyInputNode = screen.getByTestId(KEY_INPUT_TEST_ID);
        const addValueInputNode = screen.getByTestId(VALUE_INPUT_TEST_ID);
        const addOptionButtonNode = screen.getByRole("button", {name: "Add Option"});

        // Necessary, otherwise it gives wrong error message.
        await user.type(inputNode, "Some text");

        // Click on the submit button, without adding any options.
        await user.click(submitButton);

        // Check that an error message is displayed.
        expect(errorNode).toHaveTextContent(ERROR_MESSAGE);

        // Adding an option should remove the error.
        await user.type(addKeyInputNode, "Key 1");
        await user.type(addValueInputNode, "Value 1");
        
        // Click on the add button.
        await user.click(addOptionButtonNode);

        // Now submit form in creation dialog.
        await user.click(submitButton);

        // The error should be gone.
        expect(errorNode).toBeEmptyDOMElement();
    });

    it("should trigger callback when submit button is pressed", async () => {
        const user = userEvent.setup();
        const onSubmitCallback = jest.fn();
        render(<CreationDialog onSubmit={onSubmitCallback}/>);

        const submitButton = screen.getByRole("button", {name: "Create Element"});
        const inputNode = screen.getByTestId(INPUT_TEST_ID);
        const addKeyInputNode = screen.getByTestId(KEY_INPUT_TEST_ID);
        const addValueInputNode = screen.getByTestId(VALUE_INPUT_TEST_ID);
        const addOptionButtonNode = screen.getByRole("button", {name: "Add Option"});

        await user.type(inputNode, "Some input");

        // Adding an option should remove the error.
        await user.type(addKeyInputNode, "Key 1");
        await user.type(addValueInputNode, "Value 1");
        
        // Click on the add button.
        await user.click(addOptionButtonNode);

        // Now submit form in creation dialog.
        await user.click(submitButton);

        // Check that callback is triggered.
        expect(onSubmitCallback).toHaveBeenCalledWith("Some input", [{key: "Key 1", value: "Value 1"}]);
    });
});
