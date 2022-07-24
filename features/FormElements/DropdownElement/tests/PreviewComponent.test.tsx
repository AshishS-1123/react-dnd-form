import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import PreviewComponent from "../PreviewComponent";

const LABEL_TEXT = "Some question here.";
const DROPDOWN_CONTAINER_TEST_ID = "element-dropdown-preview-select";
const ERROR_NODE_TEST_ID = "element-dropdown-preview-errorNode";
const OPTIONS = [
    {key: "Key 1", value: "Value 1"},
    {key: "Key 2", value: "Value 2"},
]

describe("Dropdown Element : Preview Component", () => {
    it("should contain all necessary DOM elements", () => {
        // DOM elements that must be present are- 
        // Label, Dropdown with corresponding labels, P Tag.
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

        const dropdownNode = screen.getByTestId(DROPDOWN_CONTAINER_TEST_ID);
        expect(dropdownNode).toBeInTheDocument();

        const errorNode = screen.getByTestId(ERROR_NODE_TEST_ID);
        expect(errorNode).toBeInTheDocument();
    });

    it("should contain as many options as number of options provided in props", () => {
        render(
            <PreviewComponent 
                inputLabel="" 
                options={OPTIONS} 
                isRequired={true} 
                externalError=""
                setResponse={() => {}}
            />
        );

        const optionNodes = screen.getAllByRole("option");
        // We are adding 1 here, as there is a default selected option reading "Select an Option"
        expect(optionNodes).toHaveLength(OPTIONS.length + 1);

        // Check that all the options are present.
        OPTIONS.forEach(option => {
            const optionNode = screen.getByRole("option", {name: option.key}) as HTMLOptionElement;
            expect(optionNode).toBeInTheDocument();
            // No option should be selected by default.
            expect(optionNode.selected).toBeFalsy();
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

        const selectNode = screen.getByRole("combobox");
        const optionNode = screen.getByRole("option", { name: OPTIONS[0].key}) as HTMLOptionElement;

        await user.selectOptions(
            selectNode,
            optionNode
        );

        // Check that this option was selected.
        expect(optionNode.selected).toBeTruthy();

        // Callback should be triggered.
        expect(setResponseCallback).toHaveBeenCalledTimes(1);
        expect(setResponseCallback).toHaveBeenCalledWith(OPTIONS[0].value);
    })
});
