import formatMoney from './formatMoney';

function createHTML(email, id, order, seconds) {
    const { address } = order.address;
    const orderItems = order.orderItems.create;

    const items = orderItems.reduce(
        (prev, curr) =>
            prev.concat(
                `<tr style="border-width: 1px 0 1px 0; border-style:solid;">
                    <td style="padding:8px; padding-right:16px;">
                        <img src='${curr.image}' style="width: 152px;height: 114px;display: block;" />
                    </td>
                    <td style="padding:8px; padding-right:16px; text-align:right; vertical-align:middle;">
                        ${curr.name}
                    </td>
                    <td style="padding:8px; padding-right:16px; text-align:right; vertical-align:middle;">
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

        <style type="text/css">
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

            h1 {
                font-size: 2rem;
                margin-bottom: 16px;
            }

            h2 {
                font-size: 1.2rem;
            }
        </style>
        <body style="padding:48px; width:600px; min-width:440px; height:100%;">
            <header style="margin-bottom:36px; text-align:center;">
                <h1>Cords and Crowns</h1>
                <h2>Order Confirmation</h2>
                <h3>Thank you for your order! We'll email you when it ships
            </header>
            <table style="width:100%;">
                <tbody>
                    <tr>
                        <td style="padding:8px; text-align:left;">
                            <strong>Order #</strong>:<br>${id}<br>
                            <strong>Order Date:</strong> ${orderDate}<br>
                            Total: <strong>${formatMoney(order.total)}</strong>
                        </td>
                        <td style="padding:8px; text-align:left;">
                            <strong>Shipping To:</strong><br>
                            ${order.address.name}<br>
                            ${address.line1} ${address.line2 || ''}<br>
                            ${address.city}, ${address.state} ${address.postal_code}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style="margin:16px 0;">Ordered Items:</div>
            <table style="width:100%;">
                <tbody>
                    ${items}
                </tbody>
            </table>
            <table style="width:100%;"'>
                <tbody>
                    <tr>
                        <td style="padding:8px; padding-right:16px; text-align:right; width:100px;">
                            Subtotal:
                        </td>
                        <td style="padding:8px; padding-right:16px; text-align:right; width:100px;">
                            ${formatMoney(order.subtotal)}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:8px; padding-right:16px; text-align:right; width:100px;">
                            Tax:
                        </td>
                        <td style="padding:8px; padding-right:16px; text-align:right; width:100px;">
                            ${formatMoney(order.tax)}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:8px; padding-right:16px; text-align:right; width:100px;">
                            Total:
                        </td>
                        <td style="padding:8px; padding-right:16px; text-align:right; width:100px;">
                            <strong>${formatMoney(order.total)}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
            <footer style="margin-top:48px;">
                Please <a href="cordsandcrowns@gmail.com">email</a> us if you have any questions about your order
            </footer>
        </body>
    `;
}

export default createHTML;
