export const createWrapperAndAppendToBody = (selector: string) => {
    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('id' , selector)
    document.body.append(wrapperElement)

    return wrapperElement
}