var tbox = document.getElementById('scbx');
var listbox = document.querySelector('[role=listbox]');
var options = document.querySelectorAll('[role=option]');

var o_length = options.length;
var indx = 0;

tbox.addEventListener('keydown', function(e) {
    if (e.keyCode == 40) {
        for (var i = 0; i < o_length; i++) {
            options[i].setAttribute('tabIndex', i);
        }
        options[0].focus();
        tbox.value = options[0].getAttribute('value');
    }
});

listbox.addEventListener('keydown', function(e) {
    if (e.keyCode == 40 && indx != o_length-1) {
        indx++;
        options[indx].focus();
        tbox.value = options[indx].getAttribute('value');
    } else if (e.keyCode == 38 && indx != 0) {
        indx--;
        options[indx].focus();
        tbox.value = options[indx].getAttribute('value');
    }
});

tbox.addEventListener('focus', function() {
    indx = 0;
});

for (var i = 0; i < o_length; i++) {
    options[i].addEventListener('click', function(e){
        tbox.value = this.getAttribute('value');
    });
}
