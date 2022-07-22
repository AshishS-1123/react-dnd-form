import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import AddOptionContainer from "../AddOptionContainer";

const KEY_LABEL_TEXT = "Key";
const VALUE_LABEL_TEXT = "Value";
const KEY_INPUT_TEST_ID = "add-option-container-key-input";
const VALUE_INPUT_TEST_ID = "add-option-container-value-input";
const ERROR_NODE_TEST_ID = "add-option-container-error-node";
const ERROR_MESSAGE = "Both inputs are compulsory.";

describe("Components : Option Container : Add Option Container", () => {
    it("should contain the correct DOM elements", () => {
        // DOM elements that must be present are- Label1, Label2, Input1, Input2, Submit, P Tag.
        render(<AddOptionContainer addOption={() => {}} errorMessage=""/>);

        const keyLabelNode = screen.getByLabelText(KEY_LABEL_TEXT);
        expect(keyLabelNode).toBeInTheDocument();

        const valueLabelNode = screen.getByLabelText(VALUE_LABEL_TEXT);
        expect(valueLabelNode).toBeInTheDocument();

        const keyInputNode = screen.getByTestId(KEY_INPUT_TEST_ID);
        expect(keyInputNode).toBeInTheDocument();

        const valueInputNode = screen.getByTestId(VALUE_INPUT_TEST_ID);
        expect(valueInputNode).toBeInTheDocument();
        
        const submitButtonNode = screen.getByRole("button");
        expect(submitButtonNode).toBeInTheDocument();

        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);
        expect(errorNode).toBeInTheDocument();
        // There should be no error by default.
        expect(errorNode).toBeEmptyDOMElement();
    });

    it("should show error if submit button is pressed without entering both inputs", async () => {
        const user = userEvent.setup();

        render(<AddOptionContainer addOption={() => {}} errorMessage=""/>);

        const keyInputNode = screen.getByTestId(KEY_INPUT_TEST_ID);
        const valueInputNode = screen.getByTestId(VALUE_INPUT_TEST_ID);
        const submitButtonNode = screen.getByRole("button");
        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);

        const keyValues = [
            {key: "", value: ""},
            {key: "", value: "Random Value"},
            {key: "Random Key", value: ""},
        ];

        for(let idx = 0; idx < keyValues.length; ++idx) {
            const keyValue = keyValues[idx];

            // If key is present, type it.
            if (keyValue.key !== "") {
                await user.type(keyInputNode, keyValue.key);
            } else {
                await user.clear(keyInputNode);
            }

            // If value is present, type it.
            if (keyValue.value !== "") {
                await user.type(valueInputNode, keyValue.value);
            } else {
                await user.clear(valueInputNode);
            }

            // Click on the submit button.
            await user.click(submitButtonNode);

            // This should show an error message.
            expect(errorNode).toHaveTextContent(ERROR_MESSAGE);
        };
    });

    it("should show error based on value of prop", () => {
        render(<AddOptionContainer addOption={() => {}} errorMessage={ERROR_MESSAGE}/>);

        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);
        expect(errorNode).toHaveTextContent(ERROR_MESSAGE);
    });

    it("should trigger callback with correct parameters when submit button is clicked", async () => {
        const user = userEvent.setup();
        const addOptionCallback = jest.fn();
        render(<AddOptionContainer addOption={addOptionCallback} errorMessage=""/>);

        const keyInputNode = screen.getByTestId(KEY_INPUT_TEST_ID);
        const valueInputNode = screen.getByTestId(VALUE_INPUT_TEST_ID);
        const submitButtonNode = screen.getByRole("button");
        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);

        // Type text in both inputs.
        await user.type(keyInputNode, "Some random key");
        await user.type(valueInputNode, "Some random value");

        // Click the submit button.
        await user.click(submitButtonNode);

        // There should be no error message.
        expect(errorNode).toBeEmptyDOMElement();

        // The callback should have been called with the correct parameters.
        expect(addOptionCallback).toHaveBeenCalledWith({ key: "Some random key", value: "Some random value" });
    });

    it("should clear inputs after submitting", async () => {
        const user = userEvent.setup();
        const addOptionCallback = jest.fn();
        render(<AddOptionContainer addOption={addOptionCallback} errorMessage=""/>);

        const keyInputNode = screen.getByTestId(KEY_INPUT_TEST_ID);
        const valueInputNode = screen.getByTestId(VALUE_INPUT_TEST_ID);
        const submitButtonNode = screen.getByRole("button");
        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);

        // Type text in both inputs.
        await user.type(keyInputNode, "Some random key");
        await user.type(valueInputNode, "Some random value");

        // Click the submit button.
        await user.click(submitButtonNode);

        // Check that the inputs are clear.
        expect(keyInputNode).toHaveValue("");
        expect(valueInputNode).toHaveValue("");
    });
});
