import { describe, expect, it } from "vitest";
import { loadConfig, validateConfig } from "../src/config";

describe("source timezone defaults", () => {
  it("defaults @thsottiaux announcements to America/Los_Angeles", () => {
    const config = loadConfig({});
    expect(config.username).toBe("thsottiaux");
    expect(config.sourceTimezone).toBe("America/Los_Angeles");
  });

  it("does not impose the Tibo timezone on other monitored accounts", () => {
    const config = loadConfig({ X_USERNAME: "someone_else" });
    expect(config.sourceTimezone).toBeUndefined();
  });

  it("lets SOURCE_TIMEZONE override the canonical default", () => {
    const config = loadConfig({
      X_USERNAME: "thsottiaux",
      SOURCE_TIMEZONE: "Europe/London",
    });
    expect(config.sourceTimezone).toBe("Europe/London");
  });
});

describe("email recipient config", () => {
  it("falls back to EMAIL_T0 if EMAIL_TO is missing", () => {
    const config = loadConfig({ EMAIL_T0: "user@example.com" });
    expect(config.emailTo).toEqual(["user@example.com"]);
  });

  it("deduplicates EMAIL_TO and EMAIL_T0", () => {
    const config = loadConfig({
      EMAIL_TO: "a@example.com, b@example.com",
      EMAIL_T0: "b@example.com, c@example.com",
    });
    expect(config.emailTo).toEqual([
      "a@example.com",
      "b@example.com",
      "c@example.com",
    ]);
  });
});

describe("generic SMTP config", () => {
  it("loads QQ SMTP settings without exposing credentials", () => {
    const config = loadConfig({
      SMTP_HOST: "smtp.qq.com",
      SMTP_PORT: "465",
      SMTP_USER: "sender@qq.com",
      SMTP_PASSWORD: "hidden-app-password",
      EMAIL_TO: "recipient@example.com",
    });
    expect(config.smtpHost).toBe("smtp.qq.com");
    expect(config.smtpPort).toBe(465);
    expect(config.smtpUser).toBe("sender@qq.com");
    expect(config.smtpPassword).toBe("hidden-app-password");
    expect(validateConfig(config)).toEqual([]);
  });
});

