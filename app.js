var tbox = document.getElementById('scbx'),
    listbox = document.querySelector('[role=listbox]'),
    xhr = new XMLHttpRequest(),
    requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=",
    response,
    indx = 0,
    minChar = 3,
    resultLimit = 5,
    options;

function elementEvent() {
    for (var i = 0; i < options.length; i++) {
        options[i].addEventListener('click', function(e) {
            tbox.value = this.getAttribute('value');
            // You can use the redirect like:
            // window.location.href = "https://www.google.com/search?q=" + this.getAttribute('value');
        });
    }
}

function setTab() {
    options = listbox.querySelectorAll('[role=option]');
    if (typeof(options.length) != 'undefined') {
        for (var i = 0; i < options.length; i++) {
            options[i].setAttribute('tabIndex', i);
        }
    }
    elementEvent();
}

function clearChilds() {
    if (typeof(options.length) != 'undefined') {
        for (var i = 0; i < options.length; i++) {
            listbox.removeChild(options[i]);
        }
    }
}

tbox.addEventListener('keyup', function(e) {

    let length = tbox.value.length;

    if (length >= minChar) {

        if (e.keyCode == 40) {
            setTab();
            options[indx].focus();
            tbox.value = options[indx].getAttribute('value');
        }

        if (length >= minChar) {
            listbox.classList.remove('hide');

            if (e.keyCode != 40 && e.keyCode != 38) {
                xhr.open('GET', requestUrl + tbox.value, true);
                xhr.send();
                xhr.onreadystatechange = processRequest;
                function processRequest(e) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        response = JSON.parse(xhr.responseText);

                        // Clear Viewed Results
                        clearChilds();

                        for (var i = 0; i < resultLimit - 1; i++) {
                            // Check Exists And Get Data

                            if(typeof(response.results[i]) != 'undefined') {
                                var text = response.results[i].address_components[i].short_name;
                                var t_value = response.results[i].formatted_address;

                                // Create Element
                                var li = document.createElement("LI");
                                var text = document.createTextNode(text);
                                var o_role = document.createAttribute("role");
                                var o_value = document.createAttribute("value");

                                o_role.value = "option";
                                o_value.value = t_value;

                                li.appendChild(text);
                                li.setAttributeNode(o_role);
                                li.setAttributeNode(o_value);
                                listbox.appendChild(li);
                            }
                        }
                    }
                    setTab();
                }

            }
        }

        if (e.keyCode == 38 && indx == 0) {
            options[options.length - 1].focus();
            indx = options.length - 1;
        }

    } else {
        listbox.classList.add('hide');
    }

});

listbox.addEventListener('keyup', function(e) {
    if (e.keyCode == 40) {
        if (indx == options.length - 1) {
            tbox.focus();
            indx = 0;
        } else {
            indx++;
            options[indx].focus();
            tbox.value = options[indx].getAttribute('value');
        }
    }
    if (e.keyCode == 38) {
        if (indx == 0) {
            options[indx].focus();
            tbox.focus();
            indx = 0;
        } else {
            indx--;
            options[indx].focus();
            tbox.value = options[indx].getAttribute('value');
        }
    }
    if (e.keyCode == 13) {
        tbox.value = options[indx].getAttribute('value');
        // You can use the redirect like:
        // window.location.href = "https://www.google.com/search?q=" + options[indx].getAttribute('value');
    }

});

tbox.addEventListener('focus', function() {
    indx = 0;
});
