export type { ClientClass } from './sdk';
export type { AsyncContextStrategy } from './asyncContext/types';
export type { Carrier } from './carrier';
export type { OfflineStore, OfflineTransportOptions } from './transports/offline';
export type { ServerRuntimeClientOptions } from './server-runtime-client';
export type { RequestDataIntegrationOptions } from './integrations/requestdata';
export type { IntegrationIndex } from './integration';

export * from './tracing';
export * from './semanticAttributes';
export { createEventEnvelope, createSessionEnvelope, createSpanEnvelope } from './envelope';
export {
  captureCheckIn,
  withMonitor,
  captureException,
  captureEvent,
  captureMessage,
  lastEventId,
  close,
  flush,
  setContext,
  setExtra,
  setExtras,
  setTag,
  setTags,
  setUser,
  isInitialized,
  isEnabled,
  startSession,
  endSession,
  captureSession,
  addEventProcessor,
} from './exports';
export {
  getCurrentScope,
  getIsolationScope,
  getGlobalScope,
  withScope,
  withIsolationScope,
  getClient,
} from './currentScopes';
export {
  getDefaultCurrentScope,
  getDefaultIsolationScope,
} from './defaultScopes';
export { setAsyncContextStrategy } from './asyncContext';
export { getMainCarrier } from './carrier';
export { makeSession, closeSession, updateSession } from './session';
export { SessionFlusher } from './sessionflusher';
export { Scope } from './scope';
export { notifyEventProcessors } from './eventProcessors';
export { getEnvelopeEndpointWithUrlEncodedAuth, getReportDialogEndpoint } from './api';
export { BaseClient } from './baseclient';
export { ServerRuntimeClient } from './server-runtime-client';
export { initAndBind, setCurrentClient } from './sdk';
export { createTransport } from './transports/base';
export { makeOfflineTransport } from './transports/offline';
export { makeMultiplexedTransport } from './transports/multiplexed';
export { SDK_VERSION } from './version';
export {
  getIntegrationsToSetup,
  addIntegration,
  defineIntegration,
} from './integration';
export { applyScopeDataToEvent, mergeScopeData } from './utils/applyScopeDataToEvent';
export { prepareEvent } from './utils/prepareEvent';
export { createCheckInEnvelope } from './checkin';
export { hasTracingEnabled } from './utils/hasTracingEnabled';
export { isSentryRequestUrl } from './utils/isSentryRequestUrl';
export { handleCallbackErrors } from './utils/handleCallbackErrors';
export { parameterize } from './utils/parameterize';
export {
  spanToTraceHeader,
  spanToJSON,
  spanIsSampled,
  spanToTraceContext,
  getSpanDescendants,
  getStatusMessage,
  getRootSpan,
  getActiveSpan,
  addChildSpanToSpan,
} from './utils/spanUtils';
export { parseSampleRate } from './utils/parseSampleRate';
export { applySdkMetadata } from './utils/sdkMetadata';
export { DEFAULT_ENVIRONMENT } from './constants';
export { addBreadcrumb } from './breadcrumbs';
export { functionToStringIntegration } from './integrations/functiontostring';
export { inboundFiltersIntegration } from './integrations/inboundfilters';
export { linkedErrorsIntegration } from './integrations/linkederrors';
export { moduleMetadataIntegration } from './integrations/metadata';
export { requestDataIntegration } from './integrations/requestdata';
export { captureConsoleIntegration } from './integrations/captureconsole';
export { debugIntegration } from './integrations/debug';
export { dedupeIntegration } from './integrations/dedupe';
export { extraErrorDataIntegration } from './integrations/extraerrordata';
export { rewriteFramesIntegration } from './integrations/rewriteframes';
export { sessionTimingIntegration } from './integrations/sessiontiming';
export { zodErrorsIntegration } from './integrations/zoderrors';
export { thirdPartyErrorFilterIntegration } from './integrations/third-party-errors-filter';
export { metrics } from './metrics/exports';
export type { MetricData } from '@sentry/types';
export { metricsDefault } from './metrics/exports-default';
export { BrowserMetricsAggregator } from './metrics/browser-aggregator';
export { getMetricSummaryJsonForSpan } from './metrics/metric-summary';
export { addTracingHeadersToFetchRequest, instrumentFetchRequest } from './fetch';
export { trpcMiddleware } from './trpc';
export { captureFeedback } from './feedback';

// eslint-disable-next-line deprecation/deprecation
export { getCurrentHubShim, getCurrentHub } from './getCurrentHubShim';
