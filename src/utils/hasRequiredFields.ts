export const hasRequiredFields = (obj: Record<string, any> , requiredFields: string[]) => {
    return requiredFields.every(field => {
        return Object.hasOwn(obj , field)
    })
}