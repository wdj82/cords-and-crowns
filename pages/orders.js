// import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import styled from 'styled-components';

// import allOrdersQuery from '../lib/allOrdersQuery';
// import formatMoney from '../lib/formatMoney';

function OrdersPage() {
    // const { data: session, status } = useSession();
    // console.log({ session, status });
    // console.log(orders);

    // if (status === 'authenticated') {
    //     return (
    //         <>
    //             <p>Signed in as {session.user.email}</p>
    //             <button type='button' onClick={() => signOut()}>
    //                 Sign out
    //             </button>
    //             {orders ? (
    //                 orders.map((order) => (
    //                     <div key={order.id}>
    //                         <div>Shipped To: {order.address.name}</div>
    //                         <div>Order ID: {order.id}</div>
    //                         <div>Status: {order.orderStatus}</div>
    //                         <div>
    //                             Total: <Bold>{formatMoney(order.total)}</Bold>
    //                         </div>
    //                         <br />
    //                     </div>
    //                 ))
    //             ) : (
    //                 <div>No order history</div>
    //             )}
    //         </>
    //     );
    // }

    return (
        <>
            <p>not signed in</p>
            {/* <button type='button' onClick={() => signIn()}> */}
            Sign in
            {/* </button> */}
        </>
    );
}

// export async function getServerSideProps(ctx) {
//     const session = await getSession(ctx);
//     if (session) {
//         // authenticated get the order history for this email
//         const { orders } = await allOrdersQuery(session.user.email);
//         // console.log(orders);
//         return {
//             props: {
//                 session,
//                 orders,
//             },
//         };
//     }
//     return { props: { session } };
// }

export const Bold = styled.span`
    font-weight: var(--bold);
`;

export default OrdersPage;
