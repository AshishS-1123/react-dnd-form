import React from "react";
import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import PreviewComponent from "../PreviewComponent";
import { allowedInputs, allowedInputTypes } from "../CreationDialog";

const INPUT_LABEL = "Enter some input here.";
const INPUT_TEST_ID = "element-input-preview-input";
const INPUT_ERROR_TEST_ID = "element-input-preview-error";
const ERROR_MESSAGE = "This field must not be empty.";
const INPUT_TEXT = "Some response";

describe("Input Element : Preview Component", () => {
    it("should contain the correct DOM elements", () => {
        // DOM elements that must be present are Label, Input, P Tag
        render(
            <PreviewComponent 
                inputLabel={INPUT_LABEL} 
                inputType="email"
                isRequired={true} 
                setResponse={() => {}} 
            />
        );

        const labelNode = screen.getByLabelText(INPUT_LABEL);
        expect(labelNode).toBeInTheDocument();

        const inputNode = screen.getByTestId(INPUT_TEST_ID);
        expect(inputNode).toBeInTheDocument();
        // Check that the type of input is correct.
        expect(inputNode).toHaveAttribute("type", "email");

        const pNode = screen.getByTestId(INPUT_ERROR_TEST_ID);
        expect(pNode).toBeInTheDocument();
        // No error displayed initially.
        expect(pNode).toHaveTextContent("");
    });

    it("should display different input types correctly", () => {
        const {rerender} = render(
            <PreviewComponent 
                inputLabel={INPUT_LABEL} 
                inputType="text"
                isRequired={true} 
                setResponse={() => {}} 
            />
        );

        allowedInputs.forEach((inputType) => {
            // Rerender the component with each of the allowed input types.
            rerender(
                <PreviewComponent
                    inputLabel={INPUT_LABEL}
                    inputType={inputType as allowedInputTypes}
                    isRequired={true}
                    setResponse={() => {}}
                />
            );

            // Check that the correct inputs are displayed.
            const inputNode = screen.getByTestId(INPUT_TEST_ID);
            expect(inputNode).toHaveAttribute("type", inputType);
        });
    });

    it("should display error when input is not provided but is required", async () => {
        const user = userEvent.setup();

        render(
            <PreviewComponent 
                inputLabel={INPUT_LABEL} 
                inputType="text"
                isRequired={true} 
                setResponse={() => {}} 
            />
        );

        const inputNode = screen.getByTestId(INPUT_TEST_ID);
        const errorNode = screen.getByTestId(INPUT_ERROR_TEST_ID);

        // Focus the input, then remove focus without typing anything.

        // To do this, first click on the input.
        await user.click(inputNode);
        // Then, click somewhere else to lose focus.
        await user.click(document.body);
        

        // Error message should be displayed.
        expect(errorNode).toHaveTextContent(ERROR_MESSAGE);
    });

    it("should not display error when input is not provided and is not required", async () => {
        const user = userEvent.setup();

        render(
            <PreviewComponent 
                inputLabel={INPUT_LABEL} 
                inputType="text"
                isRequired={false} 
                setResponse={() => {}} 
            />
        );

        const inputNode = screen.getByTestId(INPUT_TEST_ID);
        const errorNode = screen.getByTestId(INPUT_ERROR_TEST_ID);

        // Focus the input, then remove focus without typing anything.

        // To do this, first type empty string in input.
        await user.click(inputNode);
        // Then, click somewhere else to lose focus.
        await user.click(document.body);

        // No error message should be displayed.
        expect(errorNode).toBeEmptyDOMElement();
    });

    it("should trigger callback with correct parameters when input changes", async () => {
        const user = userEvent.setup();
        const setResponseCallback = jest.fn();

        render(
            <PreviewComponent
                inputLabel={INPUT_LABEL}
                inputType="text"
                isRequired={true}
                setResponse={setResponseCallback}
            />
        );

        const inputNode = screen.getByTestId(INPUT_TEST_ID);
        
        // Type some text.
        await user.type(inputNode, INPUT_TEXT);

        // Make sure that the callback is triggered.
        expect(setResponseCallback).toHaveBeenCalledWith(INPUT_TEXT);
    });
});
