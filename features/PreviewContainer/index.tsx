import React, { useContext } from "react";
import { FormDataContext } from "../../store/Provider";

export interface Props {

}

function PreviewContainer(props: Props): JSX.Element {
    const { creationDialogData } = useContext(FormDataContext);

    return (
        <></>
    );
}

export default PreviewContainer;
