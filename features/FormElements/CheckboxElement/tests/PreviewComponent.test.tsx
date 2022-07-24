import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import PreviewComponent from "../PreviewComponent";

const LABEL_TEXT = "Some question here.";
const CHECKBOX_CONTAINER_TEST_ID = "element-checkbox-preview-checkboxContainer";
const ERROR_NODE_TEST_ID = "element-checkbox-preview-errorNode";
const OPTIONS = [
    {key: "Key 1", value: "Value 1"},
    {key: "Key 2", value: "Value 2"},
]

describe("Checkbox Element : Preview Component", () => {
    it("should contain all necessary DOM elements", () => {
        // DOM elements that must be present are- 
        // Label, Checkboxes with corresponding labels, P Tag.
        render(
            <PreviewComponent 
                inputLabel={LABEL_TEXT} 
                options={OPTIONS} 
                isRequired={true} 
                externalError=""
                setResponse={() => {}}
            />
        );

        const labelQuestionNode = screen.getByLabelText(LABEL_TEXT);
        expect(labelQuestionNode).toBeInTheDocument();

        const checkboxNodes = screen.getAllByTestId(CHECKBOX_CONTAINER_TEST_ID);
        expect(checkboxNodes).toHaveLength(OPTIONS.length);

        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);
        expect(errorNode).toBeInTheDocument();
    });

    it("should contain as many checkboxes as number of options provided", () => {
        render(
            <PreviewComponent 
                inputLabel="" 
                options={OPTIONS} 
                isRequired={true} 
                externalError=""
                setResponse={() => {}}
            />
        );

        const checkboxNodes = screen.getAllByTestId(CHECKBOX_CONTAINER_TEST_ID);

        // Check the number of checkboxes that are present.
        expect(checkboxNodes).toHaveLength(OPTIONS.length);

        OPTIONS.forEach(option => {
            // Check that the label with given key is present.
            const checkboxNode = screen.getByRole("checkbox", {name: option.key});
            expect(checkboxNode).toBeInTheDocument();
        });
    });

    it("should display error when passed externally", () => {
        render(
            <PreviewComponent 
                inputLabel="" 
                options={OPTIONS} 
                isRequired={true} 
                externalError="External Error"
                setResponse={() => {}}
            />
        );

        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);
        expect(errorNode).toBeInTheDocument();
        expect(errorNode).toHaveTextContent("External Error");
    })

    it("should trigger callback with correct parameters when all inputs are correct", async () => {
        const user = userEvent.setup();
        const setResponseCallback = jest.fn();

        render(
            <PreviewComponent 
                inputLabel="" 
                options={OPTIONS} 
                isRequired={true} 
                externalError="External Error"
                setResponse={setResponseCallback}
            />
        );

        // Select the first checkbox node. 
        const firstCheckboxNode = screen.getByRole("checkbox", {name: OPTIONS[0].key});

        // Click on the first checkbox.
        await user.click(firstCheckboxNode);

        // Ensure callback is triggered correctly.
        expect(setResponseCallback).toHaveBeenCalledWith([OPTIONS[0].key]);

        // Click the checkbox again and no options should be present in the callback.
        await user.click(firstCheckboxNode);
        expect(setResponseCallback).toHaveBeenCalledWith([]);
    })
});
