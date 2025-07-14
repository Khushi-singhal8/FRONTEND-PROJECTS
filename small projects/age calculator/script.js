function calculateAge() {
  const dobInput = document.getElementById('dob');
  const result = document.getElementById('result');

  // Check if a date was selected
  if (!dobInput.value) {
    result.innerText = "Please enter your date of birth.";
    return;
  }

  const dob = new Date(dobInput.value);
  const today = new Date();

  if (dob > today) {
    result.innerText = "Date of birth cannot be in the future!";
    return;
  }

  let ageYears = today.getFullYear() - dob.getFullYear();
  let ageMonths = today.getMonth() - dob.getMonth();
  let ageDays = today.getDate() - dob.getDate();

  // Adjust if birthday hasn't occurred yet this year
  if (ageDays < 0) {
    ageMonths--;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += previousMonth.getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  result.innerHTML = `🎉 You are <strong>${ageYears}</strong> years, <strong>${ageMonths}</strong> months, and <strong>${ageDays}</strong> days old.`;
}
