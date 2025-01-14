import { setupPageInDesktopView, setDataOpenUrlAttributeOnWindowOpen, initializeWindowPaqArray } from "../pageobjects/page";

describe("When I visit the home page", () => {
  let page;

  beforeEach(async () => {
    page = await setupPageInDesktopView("/", true);
    await setDataOpenUrlAttributeOnWindowOpen();
    await initializeWindowPaqArray();
  });

  describe("and select an organization", () => {
    beforeEach(async () => {
      await page.searchForm.fillInSearch("Slack");
      const searchResult = $("div=Slack (slack.com)");
      await searchResult.waitForDisplayed();
      await searchResult.click();
    });

    it("tracks site search", async () => {
      (await page.hasTracked("trackSiteSearch", "slack.com")).should.be.true;
    });

    it("updates the url", async () => {
      await browser.waitUntil(async () => (await browser.getUrl()).indexOf("slack") > 1);
      (await browser.getUrl()).should.match(/d\/slack.com/);
    });

    it("focuses the name field", async () => {
      (await (await page.personalInfoForm.selectElementByLabel("Full name")).isFocused()).should
        .be.true;
    });

    describe("and fill in the form with invalid data and submit", () => {
      beforeEach(async () => {
        await page.personalInfoForm.fillIn("Full name", "");
        await page.personalInfoForm.fillIn("Additional identifying information", "");
        await page.personalInfoForm.submit();
      });

      it("does not display the mail dialog", async () => {
        (await page.mailDialog.isVisible).should.be.false;
      });
    });

    describe("and fill in the form with valid data and submit", () => {
      beforeEach(async () => {
        await page.personalInfoForm.fillIn("Full name", "Rob");
        await page.personalInfoForm.fillIn(
          "Additional identifying information",
          "10 Downing Street"
        );
        await page.personalInfoForm.select("Regulation", "GDPR (European Union)");

        await page.personalInfoForm.submit();
      });

      it("displays the mail dialog", async () => {
        (await page.mailDialog.isVisible).should.be.true;
        (await page.mailDialog.openInGmail.isDisplayed()).should.be.true;
        (await page.mailDialog.openInOutlook.isDisplayed()).should.be.true;
        (await page.mailDialog.openInYahooMail.isDisplayed()).should.be.true;
        (await page.mailDialog.openDefault.isDisplayed()).should.be.true;
        (await page.mailDialog.copy.isDisplayed()).should.be.true;
      });

      describe("and click open in Gmail", () => {
        let mailTo;

        beforeEach(async () => {
          await page.mailDialog.openInGmail.click();

          mailTo = page.parseMailToFromGmailUrl(await page.dataOpenUrlAttribute);
        });

        it("opens a mailto url", async () => {
          mailTo.to.should.be.equal("feedback@slack.com");
          mailTo.subject.should.be.equal(
            "Data deletion request"
          );
          mailTo.body.should.match(
            /Rob/,
            "Email body should contain users name"
          );
          mailTo.body.should.match(
            /10 Downing Street/,
            "Email body should contain users home address"
          );
          mailTo.body.should.match(
            /To whom it may concern:\n\nI am writing to request that you erase all my personal information/,
            "Email body should contain expected content"
          );
          mailTo.body.should.contain(
            "General Data Protection Regulation (GDPR)",
            "Should contain GDPR"
          );

          (await page.hasTracked(
            "trackEvent",
            "Erasure Request",
            "Send GDPR Request",
            "slack.com"
          )).should.be.true;
        });

        describe("thank you message", () => {
          it("shows a thank you message", async () => {
            (await page.thanksMessage.isVisible).should.be.true;
            expect(await page.thanksMessage.title).to.equal("Thank You");
            expect(await page.thanksMessage.text).to.contain(
              "request email should have opened in your email application"
            );
            (await page.thanksMessage.btn.isDisplayed()).should.be.true;

            (await page.thanksMessage.socialShare.exists).should.be.true;
            expect(await page.thanksMessage.extensionChromeButton).to.equal(
              "https://chrome.google.com/webstore/detail/opt-out-one-click-gdpr-er/dedldhojjkgbejnmmfpmbnbihmmpfbpd?hl=en-GB"
            );
            expect(await page.thanksMessage.extensionFirefoxButton).to.equal(
              "https://addons.mozilla.org/en-GB/android/addon/opt-out/"
            );

            await page.thanksMessage.socialShare.linkedIn.click();
            (await page.dataOpenUrlAttribute).should.contain("linkedin.com");
            (await page.hasTracked(
              "trackEvent",
              "Social Share",
              "Social Share From thankyou",
              "linkedin"
            )).should.be.true;

            await page.thanksMessage.socialShare.twitter.click();
            (await page.dataOpenUrlAttribute).should.contain("twitter.com");
            (await page.hasTracked(
              "trackEvent",
              "Social Share",
              "Social Share From thankyou",
              "twitter"
            )).should.be.true;

            await page.thanksMessage.socialShare.facebook.click();
            (await page.dataOpenUrlAttribute).should.contain("facebook.com");
            (await page.hasTracked(
              "trackEvent",
              "Social Share",
              "Social Share From thankyou",
              "facebook"
            )).should.be.true;
          });

          it("should hide thanks message after clicking 'Find another organization' and focus search form", async () => {
            (await page.thanksMessage.isVisible).should.be.true;

            const button = await page.thanksMessage.btn;
            await button.waitForClickable();
            await button.click();

            (await page.thanksMessage.isVisible).should.be.false;
            (await page.searchIsFocused()).should.be.true;
            (await page.personalInfoForm.isVisible).should.be.false;
          });
        });
      });
    });
  });

  describe("and perform a search with no results", () => {
    beforeEach(async () => {
      await page.searchForm.fillInSearch("abcxyz123");
      await $("li*=Can't find an organization?").click();
    });

    describe("and fill in the form with valid data and submit and click open in Gmail", () => {
      let mailTo;

      beforeEach(async () => {
        await page.personalInfoForm.fillIn("Organization name", "abcxyz123");
        await page.personalInfoForm.fillIn("Organization domain", "abcxyz123.com");
        await page.personalInfoForm.fillIn("Organization email", "dpo@abcxyz123.com");
        await page.personalInfoForm.fillIn("Full name", "Rob");
        await page.personalInfoForm.select("Regulation", "CCPA (California)");
        await page.personalInfoForm.fillIn(
          "Additional identifying information",
          "10 Downing Street"
        );
        await page.personalInfoForm.submit();
        await page.mailDialog.openInGmail.click();
        mailTo = page.parseMailToFromGmailUrl(await page.dataOpenUrlAttribute);
      });

      it("opens a mailto url", async () => {
        mailTo.to.should.be.equal("dpo@abcxyz123.com");
        mailTo.subject.should.be.equal(
          "Data deletion request"
        );
        mailTo.body.should.match(/Rob/, "Email body should contain users name");
        mailTo.body.should.match(
          /10 Downing Street/,
          "Email body should contain users home address"
        );
        mailTo.body.should.match(
          /I am writing to request that you delete all my personal information/,
          "Email body should contain expected content"
        );
      });
    });

    describe("and fill in the form with an invalid organization email and submit", () => {
      beforeEach(async () => {
        await page.personalInfoForm.fillIn("Organization name", "abcxyz123");
        await page.personalInfoForm.fillIn("Organization domain", "abcxyz123.com");
        await page.personalInfoForm.fillIn("Organization email", "dpo@abcxyz123");
        await page.personalInfoForm.fillIn("Full name", "Rob");
        await page.personalInfoForm.select("Regulation", "CCPA (California)");
        await page.personalInfoForm.fillIn(
          "Additional identifying information",
          "10 Downing Street"
        );
        await page.personalInfoForm.submit();
      });

      it("focuses the organization email field", async () => {
        (await (await page.personalInfoForm
          .selectElementByLabel("Organization email"))
          .isFocused()).should.be.true;
      });

      it("does not display the mail dialog", async () => {
        (await page.mailDialog.isVisible).should.be.false;
      });

      it("does not show the thank you message", async () => {
        (await page.thanksMessage.isVisible).should.be.false;
      });
    });
  });
});
