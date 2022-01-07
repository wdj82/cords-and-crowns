import Head from 'next/head';
import { useState } from 'react';
import { QueryClient, dehydrate } from 'react-query';
import styled from 'styled-components';

import ProductGrid from '../components/ProductGrid';
import SideBar from '../components/SideBar';
// import Select from '../components/Select';
import allProductsQuery from '../lib/allProductsQuery';
import allSlugsQuery from '../lib/allSlugsQuery';
import { QUERIES } from '../util/constants';
// import sendEmailTest from '../lib/sendEmailTest';

function ProductsPage() {
    // const [currentPage] = useState('All Products');

    return (
        <ProductGrid />
        // <Wrapper>
        //     <Head>
        //         <title>Cords &amp; Crowns</title>
        //     </Head>
        //     <MainColumn>
        //         <Header>
        //             <div>
        //                 <Title>{currentPage}</Title>
        //             </div>
        //             {/* <SortFilterWrapper>
        //                 <Select label='Sort' value='newest'>
        //                     <option value='newest'>Newest Releases</option>
        //                     <option value='price'>Price</option>
        //                 </Select>
        //             </SortFilterWrapper> */}
        //         </Header>
        //         <Spacer />
        //         <ProductGrid />
        //     </MainColumn>
        //     <LeftColumn>
        //         <SideBar />

        //         {/* <button type='button' onClick={sendEmailTest}>
        //             send email
        //         </button> */}
        //     </LeftColumn>
        // </Wrapper>
    );
}

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery('slugs', () => allSlugsQuery());
    await queryClient.prefetchQuery('products', () => allProductsQuery());
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        // revalidate doesn't work currently on netlify?
        revalidate: 60,
    };
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: baseline;
`;

const LeftColumn = styled.div`
    flex-basis: 248px;
    font-size: 1.5rem;
`;

const MainColumn = styled.div`
    flex: 1;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    @media ${QUERIES.phone} {
        padding: 32px;
        padding-bottom: 0px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: var(--medium);
`;

// const SortFilterWrapper = styled.div``;

const Spacer = styled.span`
    display: block;
    width: 32px;
    min-width: 32px;
    height: 32px;
    min-height: 32px;

    @media ${QUERIES.phone} {
        height: 16px;
        min-height: 16px;
    }
`;

export default ProductsPage;
