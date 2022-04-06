import Head from 'next/head';
import styled from 'styled-components';

import Header from './Header';
import SideBar from './SideBar';

import { QUERIES } from '../util/constants';

function Page({ children }) {
    return (
        <>
            <Header />
            <Wrapper>
                <Head>
                    <title>Cords &amp; Crowns</title>
                </Head>
                <MainColumn>
                    <TitleWrapper>
                        <div>
                            <Title>All Products</Title>
                        </div>
                        {/* <SortFilterWrapper>
                        <Select label='Sort' value='newest'>
                            <option value='newest'>Newest Releases</option>
                            <option value='price'>Price</option>
                        </Select>
                    </SortFilterWrapper> */}
                    </TitleWrapper>
                    <Spacer />
                    {/* <ProductGrid /> */}
                    <Main>{children}</Main>
                </MainColumn>
                <LeftColumn>
                    <SideBar />

                    {/* <button type='button' onClick={sendEmailTest}>
                    send email
                </button> */}
                </LeftColumn>
            </Wrapper>
            {/* <Main>{children}</Main> */}
        </>
    );
}

const Main = styled.div`
    padding: 64px 32px;

    @media ${QUERIES.phone} {
        padding: 0;
    }
`;

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

const TitleWrapper = styled.header`
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

export default Page;
