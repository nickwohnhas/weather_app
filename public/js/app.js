window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault()
    const locationDiv = document.getElementById("location")
    document.getElementById("forecast").innerText = "Loading..."
    locationDiv.innerText = ""
    const address = document.querySelector('input').value
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          document.getElementById("forecast").innerText = data.error
        } else {
          document.getElementById("forecast").innerText = data.result
          locationDiv.innerText = data.location
        }
      })
    })
  })
});


