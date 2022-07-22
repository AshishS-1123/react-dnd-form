import React, { MouseEvent } from "react";
import { KeyValuePair } from ".";

export interface Props {
    option: KeyValuePair,
    id: string, // unique id for this component. Used when deleting this option
    deleteSelf: (id: string) => void,
}

// Renders a single option using a key-value pair
function OptionPreview(props: Props): JSX.Element {
    const handleDeleteButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        props.deleteSelf(props.id);
    }

    return (
        <>
            <span className="component-optionContainer-preview-key">
                {props.option.key}
            </span>
            <span className="component-optionContainer-preview-value">
                {props.option.value}
            </span>
            <button 
                className="component-optionContainer-preview-delete"
                onClick={handleDeleteButtonClick}
            >
                Delete
            </button>
        </>
    );
}

export default OptionPreview;