import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import OptionContainer from "..";

const OPTION_PREVIEW_TEST_ID = "component-optionContainer-preview-mainContainer";
const OPTION_PREVIEW_DELETE_BUTTON_TEST_ID = "component-optionContainer-preview-delete";
const ADD_OPTION_CONTAINER_TEST_ID = "component-optionContainer-addContainer-mainContainer";
const ADD_OPTION_SUBMIT_BUTTON_NAME = "Add Option";
const KEY_INPUT_TEST_ID = "add-option-container-key-input";
const VALUE_INPUT_TEST_ID = "add-option-container-value-input";

describe("Component : Option Container : Container", () => {
    it("should contain the correct DOM elements", () => {
        // Should contain OptionPreview components, and AddOptionContainer.
        render(<OptionContainer setOptionsExternal={() => {}}/>);

        const previewNodes = screen.queryAllByTestId(OPTION_PREVIEW_TEST_ID);
        // The options must be present in the DOM.
        // The number of options that are present should be equal to the number of options in props.
        expect(previewNodes).toHaveLength(0);

        const addOptionContainerNode = screen.getByTestId(ADD_OPTION_CONTAINER_TEST_ID);
        expect(addOptionContainerNode).toBeInTheDocument();
    });

    it("should add option when submit button in AddOptionContainer is clicked", async () => {
        const user = userEvent.setup();
        const setOptionsCallback = jest.fn();
        render(<OptionContainer setOptionsExternal={setOptionsCallback}/>);

        const addOptionButton = screen.getByRole("button", {name: ADD_OPTION_SUBMIT_BUTTON_NAME});
        const keyInputNode = screen.getByTestId(KEY_INPUT_TEST_ID);
        const valueInputNode = screen.getByTestId(VALUE_INPUT_TEST_ID);

        // Type something in the key and value inputs.
        const newOption = { key: "Some Key", value: "Some Value"};
        await user.type(keyInputNode, newOption.key);
        await user.type(valueInputNode, newOption.value);
        
        // Click the submit button.
        await user.click(addOptionButton);

        // The callback for setting options should have been called.
        expect(setOptionsCallback).toHaveBeenCalledWith([newOption]);
    });

    it("should remove option when corresponding delete button is clicked", async () => {
        const user = userEvent.setup();
        const setOptionsCallback = jest.fn();
        render(<OptionContainer setOptionsExternal={setOptionsCallback}/>);

        const keyInputNode = screen.getByTestId(KEY_INPUT_TEST_ID);
        const valueInputNode = screen.getByTestId(VALUE_INPUT_TEST_ID);
        const addOptionButton = screen.getByRole("button", {name: ADD_OPTION_SUBMIT_BUTTON_NAME});

        // Add some options to make testing easier.
        const newOptions = [
            { key: "Some Key 1", value: "Some Value 1"},
            { key: "Some Key 2", value: "Some Value 2"},
            { key: "Some Key 3", value: "Some Value 3"},
        ];

        for (let i = 0; i < newOptions.length; ++i) {
            await user.clear(keyInputNode);
            await user.type(keyInputNode, newOptions[i].key);
            await user.clear(valueInputNode);
            await user.type(valueInputNode, newOptions[i].value);

            // Click on the add button.
            await user.click(addOptionButton);
        }

        // Adding these options should have triggered the callback.
        expect(setOptionsCallback).toHaveBeenCalledWith(newOptions);

        // Select a OptionPreview and click on the delete button.
        const previewDeleteNodes = screen.getAllByTestId(OPTION_PREVIEW_DELETE_BUTTON_TEST_ID);
        // Click on the first option's delete button.
        await user.click(previewDeleteNodes[0]);

        // Callback should be triggered with correct params.
        expect(setOptionsCallback).toHaveBeenCalledWith(newOptions.slice(1));
    });

    it("should not allow duplicate options to be rendered", async () => {
        const user = userEvent.setup();
        const setOptionsCallback = jest.fn();
        render(<OptionContainer setOptionsExternal={setOptionsCallback}/>);

        const keyInputNode = screen.getByTestId(KEY_INPUT_TEST_ID);
        const valueInputNode = screen.getByTestId(VALUE_INPUT_TEST_ID);
        const addOptionButton = screen.getByRole("button", {name: ADD_OPTION_SUBMIT_BUTTON_NAME});

        const option = {
            key: "Some Key",
            value: "Some Value"
        }
        // Add a key value pair.
        await user.type(keyInputNode, option.key);
        await user.type(valueInputNode, option.value);
        await user.click(addOptionButton);

        // TODO: Remove the need to do this.
        await user.clear(keyInputNode);
        await user.clear(valueInputNode);

        // Add this same key again.
        await user.type(keyInputNode, option.key);
        await user.type(valueInputNode, option.value);
        await user.click(addOptionButton);

        // This should have triggered callback with only one option.
        expect(setOptionsCallback).toHaveBeenLastCalledWith([{key: option.key, value: option.value}]);
    });
});
