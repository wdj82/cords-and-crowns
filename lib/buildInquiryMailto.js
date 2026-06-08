import formatMoney from './formatMoney';

const CONTACT_EMAIL = 'cordsandcrowns@gmail.com';

// build a mailto: link pre-filled with the item(s) a customer wants to buy
export default function buildInquiryMailto(items = []) {
    const lines = items.map((item) => `- ${item.name} — ${formatMoney(item.price)}`);

    let body = `Hi, I'd like to buy the following:\n\n${lines.join('\n')}`;

    if (items.length > 1) {
        const subtotal = items.reduce((sum, item) => sum + item.price, 0);
        body += `\n\nSubtotal: ${formatMoney(subtotal)}`;
    }

    const subject = 'Purchase inquiry — Cords & Crowns';

    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
