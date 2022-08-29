import {sanitize} from '../../../utils/miscellaneous';
import { isArray, isEmpty } from "lodash";
import Link from 'next/dist/client/link';
import { getIconComponentByName } from '../../../utils/icon-map';

const Footer = ({footer, footerMenus}) => {

    return (
        <footer className="bg-teal-500 p-6">
            <div className="flex flex-wrap -mx-1 overflow-hidden">

                <div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
                    <div dangerouslySetInnerHTML={{ __html:sanitize(footer?.sidebarOne)}} />
                </div>

                <div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
                    <div dangerouslySetInnerHTML={{ __html:sanitize(footer?.sidebarTwo)}} />
                </div>

                <div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
                    {! isEmpty(footerMenus) && isArray(footerMenus) ? (
                        <ul>
                        {footerMenus?.map(footerMenu =>(
                            <li key={footerMenu?.node?.id}>
                                <Link href={footerMenu?.node?.path}>
                                    <a>
                                        {footerMenu?.node?.label}
                                    </a>
                                </Link>
                            </li>
                        ))}
                        </ul>
                    ) : null }
                </div>

            </div>

            <div className="flex flex-wrap -mx-1 mt-8 overflow-hidden">

                <div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/2">
                    {footer?.copyrightText}
                </div>

                <div className=" flex justify-end my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/2">
                    { !isEmpty(footer?.socialLinks ) && isArray(footer?.socialLinks) ? (
                        <ul className='flex '>
                            {footer?.socialLinks.map( socialLink => (
                                <li key={socialLink?.iconName} className="ml-4 ">
                                    <a href={socialLink?.iconUrl}>
                                        { getIconComponentByName( socialLink?.iconName)}
                                    </a>
                                </li>
                            ) ) }
                        </ul>
                    ) : null }
                </div>

            </div>
        </footer>
    )
}

export default Footer;