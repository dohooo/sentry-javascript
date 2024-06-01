import { E2E_TEST_DSN } from '$env/static/private';
import * as Sentry from '@sentry/sveltekit';
import { setupSidecar } from '@spotlightjs/spotlight/sidecar';

Sentry.init({
  environment: 'qa', // dynamic sampling bias to keep transactions
  dsn: E2E_TEST_DSN,
  debug: !!process.env.DEBUG,
  tunnel: `http://localhost:3031/`, // proxy server
  tracesSampleRate: 1.0,
  spotlight: import.meta.env.DEV,
});

// not logging anything to console to avoid noise in the test output
export const handleError = Sentry.handleErrorWithSentry(() => {});

export const handle = Sentry.sentryHandle();

if (import.meta.env.DEV) {
  setupSidecar();
}
