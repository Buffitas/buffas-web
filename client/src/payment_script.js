const button = document.getElementsByClassName("buy-button");
button.addEventListener("click", () =>{
    fetch('/create-checkout-sesssion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            items:[
                { id: 1, quantity: 3},
                { id: 2, quantity: 1},
            ],
        }),
    })
    .then(res => {
        if (res.ok) return res.json()
        return res.json().then(jsson = Promise.reject(json))
    })
    .then(({url}) => {
        window.location = url
    })
    .catch(e => {
        console.error(e.error)
    })
})