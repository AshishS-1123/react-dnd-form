import React from "react";

export interface Props {
    displayName: string,
}

function DisplayName(props: Props) {
    return (
        <>
            <span>{props.displayName}</span>
        </>
    );
}

export default DisplayName;