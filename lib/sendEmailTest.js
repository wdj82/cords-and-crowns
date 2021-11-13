async function sendEmailTest() {
    await fetch('/api/emailtest').then((resp) => resp.json());
}

export default sendEmailTest;
