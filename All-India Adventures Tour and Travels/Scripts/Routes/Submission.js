function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
window.onload = function() {
    var detailsContainer = document.getElementById("details");
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('name');
    var email = urlParams.get('email');
    var phone = urlParams.get('phone');
    var age = urlParams.get('age');
    var gender = urlParams.get('gender');
    var destination = urlParams.get('destination');
    var bookingId = getUrlParameter('bookingID');
    if (destination === "Kashmir") {
        destination = "Goa"; 
    }
    if (destination === "Kashmirr") {
        destination = "Goa"; 
    }
    if (destination === "Istanbul") {
        destination = "Munnar"; 
    }
    if (destination === "Paris") {
        destination = "Japiur"; 
    }
    if (destination === "Bali") {
        destination = "Manali"; 
    }
    if (destination === "Balii") {
        destination = "Agra"; 
    }
    if (destination === "Delhi") {
        destination = "Delhi"; 
    }
    if (destination === "Dubai") {
        destination = "Hyderabad"; 
    }
    var package = urlParams.get('package');

    var detailsHTML = `
    <tr><td><strong>Name:</strong></td><td id="name">${name}</td></tr>
    <tr><td><strong>Email:</strong></td><td id="email">${email}</td></tr>
    <tr><td><strong>Booking ID:</strong></td><td id="phone">${phone}</td></tr>
    <tr><td><strong>Trip Start Date:</strong></td><td id="age">${age}</td></tr>
    <tr><td><strong>No of Guests In The Trip:</strong></td><td id="gender">${gender}</td></tr>
    <tr><td><strong>Destination:</strong></td><td id="destination">${destination}</td></tr>
    <tr><td><strong>Package:</strong></td><td id="package">${package}</td></tr>
`;

    detailsContainer.innerHTML = detailsHTML;
}

function editDetails() {
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var ageElement = document.getElementById("age");
    var genderElement = document.getElementById("gender");
    var destinationElement = document.getElementById("destination");
    var packageElement = document.getElementById("package");

    nameElement.contentEditable = true;
    emailElement.contentEditable = true;
    phoneElement.contentEditable = true;
    ageElement.contentEditable = true;
    genderElement.contentEditable = true;
    destinationElement.contentEditable = true;
    packageElement.contentEditable = true;

    var editButton = document.getElementById("editButton");
    editButton.textContent = "Save Details";
    editButton.setAttribute("onclick", "saveDetails()");
}

function saveDetails() {
    var name = document.getElementById("name").textContent;
    var email = document.getElementById("email").textContent;
    var phone = document.getElementById("phone").textContent;
    var age = document.getElementById("age").textContent;
    var gender = document.getElementById("gender").textContent;
    var destination = document.getElementById("destination").textContent;
    var package = document.getElementById("package").textContent;

    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var ageElement = document.getElementById("age");
    var genderElement = document.getElementById("gender");
    var destinationElement = document.getElementById("destination");
    var packageElement = document.getElementById("package");

    nameElement.contentEditable = false;
    emailElement.contentEditable = false;
    phoneElement.contentEditable = false;
    ageElement.contentEditable = false;
    genderElement.contentEditable = false;
    destinationElement.contentEditable = false;
    packageElement.contentEditable = false;

    var editButton = document.getElementById("editButton");
    editButton.textContent = "Edit Details";
    editButton.setAttribute("onclick", "editDetails()");

}

function submitDetails() {
    var name = document.getElementById("name").textContent;
    var email = document.getElementById("email").textContent;
    var phone = document.getElementById("phone").textContent;
    var age = document.getElementById("age").textContent;
    var gender = document.getElementById("gender").textContent;
    var destination = document.getElementById("destination").textContent;
    var package = document.getElementById("package").textContent;

    var formData = {
        name: name,
        email: email,
        phone: phone,
        age: age,
        gender: gender,
        destination: destination,
        package: package
    };

    fetch('https://script.google.com/macros/s/AKfycbwkNuTEonsykdz6oLyAQNNovZG8EQKOLG6CuvFZvyh_p7n3E4Zd9YiYw6rMhEIh50dD/exec', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);

            sendConfirmationEmail(name, email, package, formData);
        })
        .catch(error => {
            console.error(error);
            alert("Error submitting details.");
        });
}

function sendConfirmationEmail(name, email, package, formData) {

    emailjs.init("s5uCgxIB5BadFy6SE");

    var emailParams = {
        from_name: "All-India Adventures Tour and Travels",
        to_name: name,
        to_email: email,
        package: package,

        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        destination: formData.destination
    };

    emailjs.send("service_8j54vr4", "template_gbdtaap", emailParams)
        .then(function(response) {
            console.log("Confirmation email sent successfully!", response);

            window.location.href = "/Routes/Thankyou.html";
        }, function(error) {
            console.error("Error sending confirmation email:", error);
            alert("There was an error sending the confirmation email. Please try again later.");
        });
}

function downloadDetails() {
    var detailsContent = document.getElementById("details").innerHTML;
    var encodedDetailsContent = encodeURIComponent(detailsContent);
    var dataUri = "data:text/html," + encodedDetailsContent;

    var link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", "Registration Details.html");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}