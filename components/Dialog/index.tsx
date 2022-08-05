import React, { MouseEventHandler } from "react";

export interface Props {
    isOpen: boolean,
    closeDialog: MouseEventHandler<HTMLButtonElement | HTMLDivElement>,
    children?: JSX.Element
}

const CONTAINER_STYLES = "fixed w-screen h-screen top-0 left-0 bg-white z-25 flex justify-center";
const BACKDROP_STYLES = "fixed w-screen h-screen top-0 left-0 bg-white z-25 ";
const CONTENT_STYLES = "relative w-1/2 h-max border-2 z-50 mt-10";

function Dialog(props: Props): JSX.Element {
    const dialogVisibility = props.isOpen ? "visible" : "hidden";

    return (
        <div 
            role="dialog" 
            style={{visibility: dialogVisibility}} 
            className={CONTAINER_STYLES}
        >
            <div 
                data-testid="dialog-backdrop-testId"
                style={{width: "100vw", height: "100vh"}}
                className={BACKDROP_STYLES}
                onClick={props.closeDialog}
            ></div>
            <div 
                className={CONTENT_STYLES}
                data-testid="dialog-content-testId"
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