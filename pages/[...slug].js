import client from '../src/apollo/client';
import {GET_PAGES_URI} from '../src/queries/pages/get-pages';
import {isEmpty} from 'lodash';
import {GET_PAGE} from '../src/queries/pages/get-page';
import {useRouter} from 'next/router';
import Layout from '../src/components/layout';

import {FALLBACK, handleRedirectsAndReturnData, isCustomPageUri} from '../src/utils/slugs';

const Page = ( {data} ) => {
	const router = useRouter();

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	return (
        <Layout data={data}>
            {router?.query?.slug.join("/")}
        </Layout>
    );
}

export default Page;

export async function getStaticProps( {params} ) {
	const {data} = await client.query( {
		query: GET_PAGE,
		variables: {
			uri: params?.slug.join( '/' ),
		},
	} );

	return {
        props: {
            data: {
                header: data?.header || [],
                menus: {
                    headerMenus: data?.headerMenus?.edges || [],
                    footerMenus: data?.footerMenus?.edges || [],
                },
                footer: data?.footer || [],
                page:data?.page ?? {},
                path: params?.slug.join("/"),
            }
        },
        revalidate: 1,
    };
}

/**
 * Since the page name uses catch-all routes,
 * for example [...slug],
 * that's why params would contain slug which is an array.
 * For example, If we need to have dynamic route '/foo/bar'
 * Then we would add paths: [ params: { slug: ['foo', 'bar'] } } ]
 * Here slug will be an array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar
 *
 * At build time next js will will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
 */
export async function getStaticPaths() {
	const {data} = await client.query( {
		query: GET_PAGES_URI
	} );

	const pathsData = [];

	data?.pages?.nodes && data?.pages?.nodes.map( page => {
		if ( ! isEmpty( page?.uri ) && ! isCustomPageUri(page?.uri) ) {
			const slugs = page?.uri?.split( '/' ).filter( pageSlug => pageSlug );
			pathsData.push( {params: {slug: slugs}} );
		}
	} );

	return {
		paths: pathsData,
		fallback: FALLBACK
	};
}