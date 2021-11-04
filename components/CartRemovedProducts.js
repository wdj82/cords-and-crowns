function RemovedProducts({ names }) {
    const plural = names.length > 1;
    return (
        <div>
            <h2>
                {plural ? 'Some products' : 'A product'} in your cart {plural ? 'have' : 'has'} sold out and been
                removed from your cart:
            </h2>
            <div>
                {names.map((name) => (
                    <div key={name}>{name}</div>
                ))}
            </div>
            <h2>We&apos;re sorry for any inconvenience</h2>
        </div>
    );
}

export default RemovedProducts;
