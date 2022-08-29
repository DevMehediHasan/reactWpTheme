import DOMPurify from "dompurify";



export const sanitize = (content) => {
    return process.browser ? DOMPurify.sanitize(content): content
}