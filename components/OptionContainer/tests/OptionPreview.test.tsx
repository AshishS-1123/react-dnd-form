import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import OptionPreview from "../OptionPreview";

describe("Components : Option Container : Option Preview", () => {
    it("should contain the correct DOM elements", () => {
        // DOM elements that must be present are- P (for key), P (for value), Button (for deleting)
        render(
            <OptionPreview 
                option={{key: "Key Prop", value:"Value Prop"}} 
                id="1234"
                deleteSelf={() => {}}
            />
        );

        const keyParaNode = screen.getByText("Key Prop");
        expect(keyParaNode).toBeInTheDocument();

        const valueParaNode = screen.getByText("Value Prop");
        expect(valueParaNode).toBeInTheDocument();
        
        const deleteButton = screen.getByRole("button");
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).toHaveTextContent("Delete");
    });

    it("should trigger callback when delete button is pressed", async () => {
        const user = userEvent.setup();
        const deleteSelfCallback = jest.fn();
        const optionId = "1234";

        render(
            <OptionPreview 
                option={{key: "Key Prop", value:"Value Prop"}} 
                id={optionId}
                deleteSelf={deleteSelfCallback}
            />
        );

        const deleteButton = screen.getByRole("button");

        // Click on the delete button.
        await user.click(deleteButton);

        // The callback should have been triggered.
        expect(deleteSelfCallback).toHaveBeenCalledWith(optionId);
    });
});
