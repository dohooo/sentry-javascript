export * from './exports';

export { contextLinesIntegration } from './integrations/contextlines';
export { httpClientIntegration } from './integrations/httpclient';
export { remoteConfigIntegration } from './integrations/remoteconfig';
export { reportingObserverIntegration } from './integrations/reportingobserver';

export {
  captureConsoleIntegration,
  debugIntegration,
  extraErrorDataIntegration,
  rewriteFramesIntegration,
  sessionTimingIntegration,
  captureFeedback,
} from '@sentry/core';

export { replayIntegration, getReplay } from '@sentry-internal/replay';
export type {
  ReplayEventType,
  ReplayEventWithTime,
  ReplayBreadcrumbFrame,
  ReplayBreadcrumbFrameEvent,
  ReplayOptionFrameEvent,
  ReplayFrame,
  ReplayFrameEvent,
  ReplaySpanFrame,
  ReplaySpanFrameEvent,
} from '@sentry-internal/replay';

export { replayCanvasIntegration } from '@sentry-internal/replay-canvas';

import { feedbackAsyncIntegration } from './feedbackAsync';
import { feedbackSyncIntegration } from './feedbackSync';
export { feedbackAsyncIntegration, feedbackSyncIntegration, feedbackSyncIntegration as feedbackIntegration };
export { getFeedback, sendFeedback } from '@sentry-internal/feedback';

export { defaultRequestInstrumentationOptions, instrumentOutgoingRequests } from './tracing/request';
export {
  browserTracingIntegration,
  startBrowserTracingNavigationSpan,
  startBrowserTracingPageLoadSpan,
} from './tracing/browserTracingIntegration';
export type { RequestInstrumentationOptions } from './tracing/request';
export {
  // eslint-disable-next-line deprecation/deprecation
  addTracingExtensions,
  registerSpanErrorInstrumentation,
  getActiveSpan,
  getRootSpan,
  startSpan,
  startInactiveSpan,
  startSpanManual,
  withActiveSpan,
  getSpanDescendants,
  setMeasurement,
  getSpanStatusFromHttpCode,
  setHttpStatus,
  makeMultiplexedTransport,
  moduleMetadataIntegration,
  zodErrorsIntegration,
} from '@sentry/core';
export type { Span } from '@sentry/types';
export { makeBrowserOfflineTransport } from './transports/offline';
export { browserProfilingIntegration } from './profiling/integration';
