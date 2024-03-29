document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("bookingId").value;
    var age = document.getElementById("age").value;
    var gender = document.querySelector('input[name="mygender"]:checked').value;
    var destination = document.querySelector('input[name="destination"]:checked').value;
    var package = document.querySelector('input[name="locations"]:checked').value;
    var tncChecked = document.getElementById("tnc").checked;
    var bookingId = document.getElementById("bookingId").value;
    if (!name || !email || !phone || !age || !gender || !destination || !package || !tncChecked) {
        alert("Please fill out all fields.");
        return;
    }

    var url = `/Routes/submission.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&age=${encodeURIComponent(age)}&gender=${encodeURIComponent(gender)}&destination=${encodeURIComponent(destination)}&package=${encodeURIComponent(package)}`;

    window.location.href = url;
});

document.getElementById("generateBookingId").addEventListener("click", function() {
    var chars = '0123456789';
    var length = 8;
    var bookingId = '';
    for (var i = 0; i < length; i++) {
        bookingId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("bookingId").value = bookingId;
});