import Head from 'next/head';
import { QueryClient, dehydrate } from 'react-query';
import styled from 'styled-components';

import ProductGrid from '../components/ProductGrid';
import Select from '../components/Select';
import { getProducts } from '../util/gqlUtil';

function ProductsPage() {
    return (
        <Wrapper>
            <Head>
                <title>Cords&amp;Crowns</title>
            </Head>
            <MainColumn>
                <Header>
                    <div>
                        <Title>Skulls</Title>
                    </div>

                    <SortFilterWrapper>
                        <Select label='Sort' value='newest'>
                            <option value='newest'>Newest Releases</option>
                            <option value='price'>Price</option>
                        </Select>
                    </SortFilterWrapper>
                </Header>
                <Spacer />
                <ProductGrid />
            </MainColumn>
            <LeftColumn>SideBar</LeftColumn>
        </Wrapper>
    );
}

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery('products', () => getProducts());
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: baseline;
`;

const LeftColumn = styled.div`
    flex-basis: 248px;
`;

const MainColumn = styled.div`
    flex: 1;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: var(--medium);
`;

const SortFilterWrapper = styled.div``;

const Spacer = styled.span`
    display: block;
    width: 32px;
    min-width: 32px;
    height: 32px;
    min-height: 32px;
`;

export default ProductsPage;
