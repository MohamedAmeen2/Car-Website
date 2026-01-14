window.onload = function () {
  updatePrice();
};

function calculateInstallmentPrice(installmentMonths, extraRate) {
  var originalPrice = 30995;

  var totalPrice = originalPrice * (1 + extraRate);
  var monthlyInstallment = totalPrice / installmentMonths;

  return {
    totalPrice: totalPrice.toFixed(2),
    monthlyInstallment: monthlyInstallment.toFixed(2),
  };
}

function updatePrice() {
  var paymentMethod = document.querySelector(
    'input[name="payment"]:checked'
  ).value;
  var regularPrice = document.getElementById("totalPrice");
  var monthlyInstallment = document.getElementById("monthlyInstallment");
  var installmentsDiv = document.getElementById("installments");

  if (paymentMethod === "installments") {
    installmentsDiv.style.display = "block";
    document
      .getElementsByName("installment")
      .forEach(function (installmentRadio) {
        installmentRadio.removeAttribute("disabled");
      });
  } else {
    installmentsDiv.style.display = "none";
    document
      .getElementsByName("installment")
      .forEach(function (installmentRadio) {
        installmentRadio.checked = false;
        installmentRadio.setAttribute("disabled", "disabled");
      });
  }

  if (paymentMethod === "cash") {
    regularPrice.textContent = "Total Price: $30,995";
    monthlyInstallment.textContent = "";
    document.getElementById("priceSection").style.display = "block";
  }
}

function selectInstallment() {
  var installmentRadios = document.getElementsByName("installment");
  var extraRate = 0;
  var installmentMonths = 0;

  for (var i = 0; i < installmentRadios.length; i++) {
    if (installmentRadios[i].checked) {
      if (installmentRadios[i].value === "6") {
        extraRate = 0.2;
        installmentMonths = 6;
      } else if (installmentRadios[i].value === "12") {
        extraRate = 0.35;
        installmentMonths = 12;
      }
      break;
    }
  }

  var priceDetails = calculateInstallmentPrice(installmentMonths, extraRate);

  var regularPrice = document.getElementById("totalPrice");
  var monthlyInstallment = document.getElementById("monthlyInstallment");

  regularPrice.textContent =
    "Total Price with Installments: $" + priceDetails.totalPrice;
  monthlyInstallment.textContent =
    "Monthly Installment: $" +
    priceDetails.monthlyInstallment +
    " (" +
    installmentMonths +
    " months)";
}

function validateForm() {
  var countryInput = document.getElementById("country");
  var cityInput = document.getElementById("city");
  var stateInput = document.getElementById("state");
  var streetInput = document.getElementById("street");
  var postalCodeInput = document.getElementById("postal_code");
  var colorRadios = document.getElementsByName("color");
  var paymentRadios = document.getElementsByName("payment");
  var installmentRadios = document.getElementsByName("installment");

  var countryValue = countryInput.value.trim();
  var cityValue = cityInput.value.trim();
  var stateValue = stateInput.value.trim();
  var streetValue = streetInput.value.trim();
  var postalCodeValue = postalCodeInput.value.trim();
  var selectedColor = getSelectedRadioValue(colorRadios);
  var selectedPayment = getSelectedRadioValue(paymentRadios);
  var selectedInstallment = getSelectedRadioValue(installmentRadios);

  var lettersOnlyRegex = /^[A-Za-z]+$/;
  var numbersOnlyRegex = /^\d+$/;

  if (countryValue === "") {
    alert("Please enter your country.");
    countryInput.focus();
    return false;
  }

  if (!lettersOnlyRegex.test(countryValue)) {
    alert("Country name should contain only letters.");
    countryInput.focus();
    return false;
  }

  if (cityValue === "") {
    alert("Please enter your city.");
    cityInput.focus();
    return false;
  }

  if (!lettersOnlyRegex.test(cityValue)) {
    alert("City name should contain only letters.");
    cityInput.focus();
    return false;
  }

  if (stateValue === "") {
    alert("Please enter your state.");
    stateInput.focus();
    return false;
  }

  if (!lettersOnlyRegex.test(stateValue)) {
    alert("State name should contain only letters.");
    stateInput.focus();
    return false;
  }

  if (streetValue === "") {
    alert("Please enter your street address.");
    streetInput.focus();
    return false;
  }

  if (postalCodeValue === "") {
    alert("Please enter your postal code.");
    postalCodeInput.focus();
    return false;
  }

  if (!numbersOnlyRegex.test(postalCodeValue)) {
    alert("Postal code should contain only numbers.");
    postalCodeInput.focus();
    return false;
  }

  if (!selectedColor) {
    alert("Please select a car color.");
    return false;
  }

  if (!selectedPayment) {
    alert("Please select a payment method.");
    return false;
  }

  if (selectedPayment === "installments" && !selectedInstallment) {
    alert("Please select an installment option.");
    return false;
  }

  return true;
}

function getSelectedRadioValue(radioButtons) {
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i].value;
    }
  }
  return null;
}

function redirectToPaymentInfo() {
  if (validateForm()) {
    window.location.href = "paymentinfo.html";
  }
}

var form = document.getElementById("carForm");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  validateForm();
});

document
  .getElementById("payNowButton")
  .addEventListener("click", redirectToPaymentInfo);
