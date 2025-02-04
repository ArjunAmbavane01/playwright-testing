import { test, expect } from "@playwright/test";

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://staging.tracer.byteswrite.com/signup");
  const defaultOTP = "290524";
  await page.locator('input[name="emailId"]').fill("testemail@example.com");
  await page.getByRole("button", { name: "Send OTP" }).click();
  await page.locator('input[name="otp"]').click();
  await page.locator('input[name="otp"]').fill(defaultOTP);
  await page.click('button:has-text("Verify OTP")');
  await expect(page).toHaveURL(/.*form/);
});

test("should fill signup form successfully", async () => {
  await expect(page).toHaveURL(/.*form/);

  // Fill Title
  //   await page.getByRole("combobox").filter({ hasText: "Enter title" }).click();
  //   await page.getByRole("option", { name: "Mr", exact: true }).click();

  //   // Fill First Name
  //   await page.locator('input[name="firstName"]').fill("John");

  //   // Fill Last Name
  //   await page.locator('input[name="lastName"]').fill("Doe");

  //   // Fill Phone Number
  //   await page.locator('input[name="phNo"]').fill("1234567890");

  //   // Fill Personal Email id
  //   await page.locator('input[name="emailId"]').fill("test.example@gmail.com");

  //   // Fill Birth Date
  //   await page.getByRole("button", { name: "Enter date of birth" }).click();
  //   await page.getByRole("button", { name: "Monday, February 3rd," }).click();

  //   // Fill Gender
  //   await page.locator('select[name="personalInfo.gender"]').selectOption("Male");

  //   // Fill Employee Id
  //   await page.locator('input[name="employeeId"]').fill("1234567890");

  //   // Fill joining Date
  //   await page.getByRole("button", { name: "Enter Joining date" }).click();
  //   await page.getByRole("button", { name: "Monday, February 4th," }).click();

  // Fill Designation
  await page.locator('select[name="designation"]').selectOption("Dean");

  // Fill departments
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select departments" })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Department of Microbiology$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Department of Computer Science$/ })
    .first()
    .click();

  // Fill programs
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select programs" })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^MTECH-CSE-Regular$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^BPHARMA-Regular$/ })
    .first()
    .click();

  // Fill Social Links
  await page
    .locator('input[name="socialLinks.googleScholarURL"]')
    .fill("https://scholar.google.com/citations?user=000");
  await page
    .locator('input[name="socialLinks.scopusURL"]')
    .fill("https://scopus.com/authid/detail.uri?authorId=000");

  // Fill Domain Expertise
  await page
    .getByRole("combobox")
    .filter({
      hasText: "Select your areas of expertise or professional interests",
    })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Education Technology$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Educational Psychology$/ })
    .first()
    .click();

  // Fill Bio
  await page.locator('textarea[name="bio"]').fill("Test");
});
