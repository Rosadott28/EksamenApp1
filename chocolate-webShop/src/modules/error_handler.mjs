//-----------------------------------------------------------
let errorTimer = null;
let activeError = null;
export function errorHandler(error) {
  clearTimeout(errorTimer);
  if (activeError) {
    activeError.remove();
  }
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("notification-message");
  errorMessage.textContent = "Something went wrong. Please try again.";
  errorMessage.setAttribute("role", "alert");
  document.body.appendChild(errorMessage);
  activeError = errorMessage;

  errorTimer = setTimeout(() => {
    errorMessage.remove();
    activeError = null;
  }, 4000);
  console.error(error);
}

//-----------------------------------------------------------

// add more functions below for handling errors if needed
