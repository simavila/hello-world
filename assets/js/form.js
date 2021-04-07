// Checking if all form has been filled to enable button
window.addEventListener('load', function () {
    let currForm1 = document.getElementById('test-form');
    // Validate on input:
    currForm1.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener(('input'), () => {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid')
                input.classList.add('is-valid');

            } else {
                input.classList.remove('is-valid')
                input.classList.add('is-invalid');
            }
            var is_valid = $('.form-control').length === $('.form-control.is-valid').length;
            $("#submit-form").attr("disabled", !is_valid);

            // Redirecting to success page
            $("#submit-form").click(function () {
                document.location.href = "success.html"
            });

        });
    });
    // Validate on submit:
    currForm1.addEventListener('submit', function (event) {
        if (currForm1.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        currForm1.classList.add('was-validated');
    }, false);
});


// Handling data and storing in Google Sheets
var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbxUYa61EhWSEgJKDjgvVWbQ8bYKpclz2Qx1_F4jeSM6Et-E5Aoq0Ezh-3zDNSQZ9CXLZg/exec'

// Helper function to serialize data
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// Fetching data from form to Google Sheets
$('#submit-form').on('click', function (e) {
    e.preventDefault();
    var jqxhr = $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: $form.serializeObject()
    })
})

