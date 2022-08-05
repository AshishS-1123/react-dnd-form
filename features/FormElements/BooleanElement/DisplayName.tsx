import React from "react";
import Image from "next/image";
import IconImage from "../../../public/images/boolean.png";
import { AllowedElements, DISPLAY_NAME_STYLE } from "../../constants";

export interface Props {
    onClick: (elementType: AllowedElements) => void,
}

function DisplayName(props: Props) {
    return (
        <div className={DISPLAY_NAME_STYLE} onClick={() => props.onClick("boolean")}>
            <Image alt="boolean-element" src={IconImage} width="38px" height="24px"/>
            <span className="content-center gap-2 p-2" style={{fontFamily: "Mulish"}}>Boolean</span>
        </div>
    );
}

export default DisplayName;