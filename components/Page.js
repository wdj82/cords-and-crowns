import styled from 'styled-components';
import Header from './Header';

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
`;

export default Page;
