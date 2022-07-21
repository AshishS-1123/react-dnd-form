import React, { MouseEventHandler } from "react";

export interface Props {
    isOpen: boolean,
    closeDialog: MouseEventHandler<HTMLButtonElement | HTMLDivElement>,
    children?: JSX.Element
}

function Dialog(props: Props): JSX.Element {
    const dialogVisibility = props.isOpen ? "visible" : "hidden";

    return (
        <div role="dialog" style={{visibility: dialogVisibility}}>
            <div 
                data-testid="dialog-backdrop-testId"
                style={{width: "100vw", height: "100vh"}}
            >
            </div>

            <div 
                data-testid="dialog-content-testId"
                style={{zIndex: "100"}}
            >
                {props.children}
                <button 
                    type="button"
                    role="button" 
                    data-testid="dialog-close-testId"
                    onClick={props.closeDialog}
                ></button>
            </div>
        </div>
    );
}

export default Dialog;