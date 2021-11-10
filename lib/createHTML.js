import formatMoney from './formatMoney';

function createHTML(email, id, order, seconds) {
    const { address } = order.address;
    const orderItems = order.orderItems.create;

    const items = orderItems.reduce(
        (prev, curr) =>
            prev.concat(
                `<tr>
                    <td>
                        <img src='${curr.image}'/>
                    </td>
                    <td>
                        ${curr.name}
                    </td>
                    <td>
                        <strong>${formatMoney(curr.price)}</strong>
                    </td>
                </tr>`,
            ),
        '',
    );

    const date = new Date(null);
    date.setSeconds(seconds);
    const orderDate = `Ordered on: ${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;

    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>

        <style>
            *,
            *:before,
            *:after {
                box-sizing: border-box;
                line-height: 1.5;
                font-family: 'Raleway', sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: auto;
            }

            html,
            body,
            div,
            span,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            table,
            tbody,
            thead,
            tr,
            th,
            td,
            img,
            strong,
            label,
            footer,
            header {
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                vertical-align: baseline;
            }

            table {
                border-collapse: collapse;
                border-spacing: 0;
            }

            html,
            body {
                height: 100%;
            }

            body {
                padding: 48px;
                width: 600px;
                min-width: 440px;
            }

            img {
                width: 152px;
                height: 114px;
                display: block;
                margin-right: -80px;
            }

            header {
                margin-bottom: 36px;
                text-align: center;
            }

            h1 {
                font-size: 2rem;
                margin-bottom: 16px;
            }

            h2 {
                font-size: 1.2rem;
            }

            table {
                width: 100%;
            }

            td,
            th {
                padding: 8px;
                text-align: left;
            }

            #total {
                width: 100%;
                text-align: right;
            }

            footer {
                margin-top: 48px;
            }

            #itemTable td {
                vertical-align: middle;
            }

            #itemTable tr {
                border-top: 1px solid;
                border-bottom: 1px solid;
            }

            #itemTable td {
                text-align: right;
                padding-right: 16px;
            }

            #spacer {
                margin: 16px 0;
            }

            #tableTotal td {
                text-align: right;
            }

            #tableTotal td {
                padding-right: 16px;
                width: 100px;
            }
        </style>

        <body>
            <header>
                <h1>Cords and Crowns</h1>
                <h2>Order Confirmation</h2>
                <h3>Thank you for your order! We'll email you when it ships
            </header>
            <table id='summary'>
                <tbody>
                    <tr>
                        <td>
                            <strong>Order #</strong>:<br>${id}<br>
                            <strong>Order Date:</strong> ${orderDate}</br>
                            Total: <strong>${formatMoney(order.total)}</strong>
                        </td>
                        <td>
                            <strong>Shipping To:</strong><br>
                            ${order.address.name}<br>
                            ${address.line1} ${address.line2 || ''}<br>
                            ${address.city}, ${address.state} ${address.postal_code}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id='spacer'>Ordered Items:</div>
            <table id='itemTable'>
                <tbody>
                    ${items}
                </tbody>
            </table>
            <table id='tableTotal'>
                <tbody>
                    <tr>
                        <td>
                            Subtotal:
                        </td>
                        <td>
                            ${formatMoney(order.subtotal)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Tax:
                        </td>
                        <td>
                            ${formatMoney(order.tax)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Total:
                        </td>
                        <td>
                            <strong>${formatMoney(order.total)}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
            <footer>
                Please <a href="cordsandcrowns@gmail.com">email</a> us if you have any questions about your order
            </footer>
        </body>
    `;
}

export default createHTML;
