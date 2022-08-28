import { isEmpty } from "lodash";

const Footer = ({footer, footerMenus}) => {
    
    if (isEmpty(footerMenus)){
        return null;
    }
    return 'Footer'
}

export default Footer;