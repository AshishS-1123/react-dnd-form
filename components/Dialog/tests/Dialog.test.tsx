import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Dialog from "..";

const BACKDROP_TEST_ID = "dialog-backdrop-testId";
const CONTENT_TEST_ID = "dialog-content-testId";
const CLOSE_BUTTON_TEST_ID = "dialog-close-testId"

describe ("Components : Dialog", () => {
    it("should be displayed if isOpen prop is true", () => {
        render(<Dialog isOpen={true} closeDialog={() => {}}/>);

        // The dialog should exist and be visible when isOpen is true.
        const dialogNode = screen.getByRole('dialog');
        expect(dialogNode).toBeInTheDocument();
        expect(dialogNode).toBeVisible();
    });

    it("should not be displayed if isOpen prop is false", () => {
        render(<Dialog isOpen={false} closeDialog={() => {}}/>);

        // The dialog should not be rendered when isOpen is false.
        const dialogNode = screen.queryByRole('dialog');
        expect(dialogNode).toBeNull();
    });

    it("should contain a backdrop spanning the entire screen, but not part of the modal", () => {
        render(<Dialog isOpen={true} closeDialog={() => {}} />);

        // The Dialog component will contain a DOM element of role="dialog".
        // This element will then contain 2 other elements-
        // one will be the actual dialog where the children passed as props will be rendered using composition
        // the other will be the backdrop.
        const backdropNode = screen.getByTestId(BACKDROP_TEST_ID);
        const dialogContentNode = screen.getByTestId(CONTENT_TEST_ID);

        // Both of these nodes should be present in the DOM.
        expect(backdropNode).toBeInTheDocument();
        expect(dialogContentNode).toBeInTheDocument();

        // the backdrop should cover the entire screen.
        expect(backdropNode).toHaveStyle("width: 100vw");
        expect(backdropNode).toHaveStyle("height: 100vh");

        // The dialog node should be the topmost element so user can only see it.
        expect(Number(dialogContentNode.style.zIndex)).toBeGreaterThan(0);
    });

    it("should contain a button for closing dialog, that also triggers a callback", async () => {
        const closeDialogCallback = jest.fn();
        const user = userEvent.setup();

        render(<Dialog isOpen={true} closeDialog={closeDialogCallback}/>);

        // Closing the dialog will be handled through callbacks.
        // So, we test that the callback method gets called when the dialog needs to be closed.

        // Find the close dialog button.
        const closeDialogButton = screen.getByTestId(CLOSE_BUTTON_TEST_ID);
        expect(closeDialogButton).toBeInTheDocument();

        // Simulate click event on this button.
        await user.click(closeDialogButton);
        
        // Then, the closeDialogCallback should get called.
        expect(closeDialogCallback).toHaveBeenCalled();
    });

    it("should render children in the content dialog",() => {
        render(
            <Dialog isOpen={true} closeDialog={() => {}}>
                <p>This is the child</p>
            </Dialog>
        );

        const childNode = screen.getByText('This is the child');
        const dialogContentNode = screen.getByTestId(CONTENT_TEST_ID);

        // The children should be rendered in the content node and not in the backdrop or anywhere else.
        expect(childNode).toBeInTheDocument();
        expect(childNode.parentNode).toBe(dialogContentNode);
    });
});
