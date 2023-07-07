import {ReactNode, useLayoutEffect , useState} from "react";
import {createPortal} from "react-dom";
import {createWrapperAndAppendToBody} from "../../utils/createWrapperAndAppendToBody";

interface IPortalProps {
    children: ReactNode,
    wrapperSelector?: string
}

export const Portal = ({children , wrapperSelector = "portal-wrapper"}: IPortalProps) => {
    const [wrapperElement , setWrapperElement] = useState<HTMLElement | null>(null)

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperSelector)
        let createdWrapper = false

        if(!element) {
            element = createWrapperAndAppendToBody(wrapperSelector)
            createdWrapper = true
        }

        setWrapperElement(element)

        return () => {
            if(createdWrapper) {
                element?.remove()
            }
        }

    } , [wrapperSelector])

    if(wrapperElement == null) return null

    return createPortal(children , wrapperElement)
}