document.addEventListener('DOMContentLoaded', function () {
    var btnNumbers = document.querySelectorAll('.btn-number');
    var inputNumbers = document.querySelectorAll('.input-number');

    btnNumbers.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            var fieldName = btn.getAttribute('data-field');
            var type = btn.getAttribute('data-type');
            var input = document.querySelector("input[name='" + fieldName + "']");
            var currentVal = parseInt(input.value);

            if (!isNaN(currentVal)) {
                if (type === 'minus') {
                    if (currentVal > parseInt(input.getAttribute('min'))) {
                        input.value = currentVal - 1;
                        input.dispatchEvent(new Event('change'));
                    }
                    if (parseInt(input.value) === parseInt(input.getAttribute('min'))) {
                        btn.setAttribute('disabled', true);
                    }

                } else if (type === 'plus') {
                    if (currentVal < parseInt(input.getAttribute('max'))) {
                        input.value = currentVal + 1;
                        input.dispatchEvent(new Event('change'));
                    }
                    if (parseInt(input.value) === parseInt(input.getAttribute('max'))) {
                        btn.setAttribute('disabled', true);
                    }
                }
            } else {
                input.value = 0;
            }
        });
    });

    inputNumbers.forEach(function (input) {
        input.addEventListener('focusin', function () {
            input.dataset.oldValue = input.value;
        });

        input.addEventListener('change', function () {
            var minValue = parseInt(input.getAttribute('min'));
            var maxValue = parseInt(input.getAttribute('max'));
            var valueCurrent = parseInt(input.value);

            var name = input.getAttribute('name');
            if (valueCurrent >= minValue) {
                document.querySelector(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttribute('disabled');
            } else {
                alert('Sorry, the minimum value was reached');
                input.value = input.dataset.oldValue;
            }
            if (valueCurrent <= maxValue) {
                document.querySelector(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttribute('disabled');
            } else {
                alert('Sorry, the maximum value was reached');
                input.value = input.dataset.oldValue;
            }
        });

        input.addEventListener('keydown', function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ([46, 8, 9, 27, 13, 190].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    });
});
