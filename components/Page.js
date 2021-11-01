import styled from 'styled-components';
import Header from './Header';

import { QUERIES } from '../util/constants';

function Page({ children }) {
    return (
        <>
            <Header />
            <Main>{children}</Main>
        </>
    );
}

const Main = styled.div`
    padding: 64px 32px;

    @media ${QUERIES.phone} {
        padding: 48px 0px;
    }
`;

export default Page;
