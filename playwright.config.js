// @ts-check
import { defineConfig, devices } from '@playwright/test';
require ('dotenv').config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 90 * 1000, 
  worker: 1,
  expect: {
    timeout: 15000
  },

  reporter: [['html'],
  ['allure-playwright']],
  use: {
    browserName: 'chromium',
    headless: true,
  }
});
module.exports = config;