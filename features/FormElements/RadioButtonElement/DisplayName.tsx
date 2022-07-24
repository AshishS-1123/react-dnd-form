import React from "react";
import Image from "next/image";
import IconImage from "../../../public/images/radio.png";
import { DISPLAY_NAME_STYLE } from "../../constants";

export interface Props {
}

function DisplayName(props: Props) {
    return (
        <div className={DISPLAY_NAME_STYLE}>
            <Image alt="radio-button-element" src={IconImage} width="38px" height="20px" />
            <span className="content-center gap-2 p-2">Radio Button</span>
        </div>
    );
}

export default DisplayName;