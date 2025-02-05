import { test, expect } from "@playwright/test";

function getRandomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function getRandomNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://staging.tracer.byteswrite.com/signup");
  const defaultOTP = "290524";
  await page.locator('input[name="emailId"]').fill(`email${getRandomString(5)}@example.com`);
  await page.getByRole("button", { name: "Send OTP" }).click();
  await page.locator('input[name="otp"]').click();
  await page.locator('input[name="otp"]').fill(defaultOTP);
  await page.click('button:has-text("Verify OTP")');
  await expect(page).toHaveURL(/.*form/);
});

test("should fill signup form successfully", async () => {

  const phoneNumber = getRandomNumber(10);
  const personalEmail = `email${getRandomString(5)}@example.com`;
  const employeeId = getRandomNumber(8);
  const title = `Title-${getRandomString()}`;
  const university = `University-${getRandomString()}`;
  const ScholarURL = `https://scholar.google.com/citations?user=${getRandomNumber(5)}`;
  const ScopusURL = `https://scopus.com/authid/detail.uri?authorId=${getRandomNumber(5)}`;
  

  await expect(page).toHaveURL(/.*form/);

  // Fill Title
    await page.getByRole("combobox").filter({ hasText: "Enter title" }).click();
    await page.getByRole("option", { name: "Mr", exact: true }).click();

    // Fill First Name
    await page.locator('input[name="firstName"]').fill("John");

    // Fill Last Name
    await page.locator('input[name="lastName"]').fill("Doe");

    // Fill Phone Number
    await page.locator('input[name="phNo"]').fill(phoneNumber);

    // Fill Personal Email id
    await page.locator('input[name="emailId"]').fill(personalEmail);

    // Fill Birth Date
    await page.getByRole("button", { name: "Enter date of birth" }).click();
    await page.getByRole("button", { name: "Monday, February 3rd," }).click();

    // Fill Gender
    await page.locator('select[name="personalInfo.gender"]').selectOption("Male");

    // Fill Employee Id
    await page.locator('input[name="employeeId"]').fill(employeeId);

    // Fill joining Date
    await page.getByRole("button", { name: "Enter Joining date" }).click();
    await page.getByRole("button", { name: "Tuesday, February 4th," }).click();

    // Fill Designation
    await page.locator('select[name="designation"]').selectOption("Dean");

    // Fill departments
    await page.getByRole("combobox").filter({ hasText: "Select departments" }).click();
    await page.locator("div").filter({ hasText: /^Department of Microbiology$/ }).first().click();
    await page.locator("div").filter({ hasText: /^Department of Computer Science$/ }).first().click();

    // Fill programs
    await page.getByRole("combobox").filter({ hasText: "Select programs" }).click();
    await page.locator("div").filter({ hasText: /^MTECH-CSE-Regular$/ }).first().click();
    await page.locator("div").filter({ hasText: /^BPHARMA-Regular$/ }).first().click();

    // Fill Social Links
    await page.locator('input[name="socialLinks.googleScholarURL"]').fill(ScholarURL);
    await page.locator('input[name="socialLinks.scopusURL"]').fill(ScopusURL);

    // Fill Domain Expertise
    await page.getByRole("combobox").filter({hasText: "Select your areas of expertise or professional interests"}).click();
    await page.locator("div") .filter({ hasText: /^Education Technology$/ }).first().click();
    await page.locator("div").filter({ hasText: /^Educational Psychology$/ }).first().click();

    // Fill Bio
    await page.locator('textarea[name="bio"]').fill("Test");

    // Fill Education
    await page.getByRole('combobox').filter({ hasText: 'Select your qualification' }).click();
    await page.locator('div').filter({ hasText: /^Doctorate \(PHD\)$/ }).first().click();

    // Fill Degree
    await page.getByRole('combobox').filter({ hasText: 'Select degree' }).click();
    await page.getByText('Doctor of Philosophy (PhD) in Computer Science').click();

    // Fill Dissertion Title
    await page.locator('input[name="education.doctorateDetails[0].dissertationTitle"]').fill(title);

    // Fill Completion Year
    await page.getByRole('combobox').filter({ hasText: 'Select completion year' }).click();
    await page.getByRole('option', { name: '-23' }).click();

    // Fill University Name
    await page.getByRole('textbox', { name: 'Enter university name' }).click();
    await page.getByRole('textbox', { name: 'Enter university name' }).fill(university);

    // Fill University Country
    await page.getByRole('combobox').filter({ hasText: 'Select university country' }).click();
    await page.getByRole('option', { name: 'India', exact: true }).click();

    // Fill University State
    await page.getByRole('combobox').filter({ hasText: 'Select university state' }).click();
    await page.getByRole('dialog').locator('div').filter({ hasText: 'Maharashtra' }).nth(3).click();

    // Fill University City
    await page.getByRole('combobox').filter({ hasText: 'Select university city' }).click();
    await page.locator('div').filter({ hasText: /^Pune$/ }).first().click();

    // Click Submit
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page).toHaveURL(/.*login/);

});
