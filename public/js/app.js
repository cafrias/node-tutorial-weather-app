window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather_form");

  const weatherErrorElement = document.getElementById("weather_error");
  const weatherResultElement = document.getElementById("weather_result");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const addressInput = document.querySelector('input[name="address"]');
    if (!addressInput) {
      throw new Error("No address input found");
    }

    const addressValue = addressInput.value;
    if (!addressValue) {
      throw new Error("Validation Error: address value is required");
    }

    const urlEncodedAddess = encodeURIComponent(addressValue);
    fetch(`/weather?address=${urlEncodedAddess}`)
      .then(data => data.json())
      .then(result => {
        const { forecast, location, error } = result;
        if (error) {
          weatherErrorElement.innerText = error;
          weatherResultElement.innerHTML = "";
          return;
        }

        weatherErrorElement.innerText = "";
        weatherResultElement.innerHTML = `
          <strong>${location}</strong>: ${forecast}
        `;
      });
  });
});
