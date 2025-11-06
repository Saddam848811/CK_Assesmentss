function handleClick() {
  var name = document.getElementById("name").value.trim();
  var age = document.getElementById("age").value.trim();

  var namePattern = /^[A-Za-z\s]+$/;

  console.log("Name:", name);
  console.log("Age:", age);

  if (name === "") {
    alert("User name is empty!");
    return;
  }

  if (!namePattern.test(name)) {
    alert("Please enter a valid name (letters only)!");
    return;
  }

  if (age === "" || isNaN(age)) {
    alert("Please enter a valid age!");
    return;
  }

  if (Number(age) < 18) {
    alert("Age must be 18 or older!");
    return;
  }

  window.location.href = "https://example.com";
}
