//function runs whenever a form is submitted sends it to server to check if the email and password are correct
async function paymentRequest(event) {
    wevent.preventDefault();

    //selects the form element from form.hmtl
    const formData = document.querySelector('#addCreditForm');

    //create a new object that stores email and password
    const addPayment = {
        username: sessionStorage.getItem('username'),
        credit: formData.elements.namedItem('credit').value,
    };

    // turns addPayment object into JSON string
    const serializedMessage = JSON.stringify(addPayment);

    // posts JSON string to the server at the end point /login
    const response = await fetch('/payment', { method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        body: serializedMessage
                    }
                )

    const json = await response.json();


    if (response.status === 200) {
        window.location.href = "/";
        sessionStorage.setItem('id', json.id);
        sessionStorage.setItem('email', json.email);
        sessionStorage.setItem('name', json.name);
        sessionStorage.setItem('userType', json.userType);
        sessionStorage.setItem('wallet', json.wallet);
        console.log(sessionStorage.getItem('id'));
        console.log(sessionStorage.getItem('email'));
        console.log(sessionStorage.getItem('name'));
        console.log(sessionStorage.getItem('userType'));
        console.log(sessionStorage.getItem('wallet'));

        if(sessionStorage.getItem('userType').toLowerCase() === 'admin') {
            window.location.href = "/admin";
        }
        else {
            window.location.href = "/";
        }
    }
    else {
        const incorrectDetails = document.createElement('p');
        incorrectDetails.innerText = json;
        document.getElementById('loginContainer').appendChild(incorrectDetails);

        document.getElementById('password').value = ''; 
    }

}

//Selects form element from form.html and adds a loginAttempt event listener

const form = document.querySelector('#loginForm');
form.addEventListener('submit', loginAttempt);