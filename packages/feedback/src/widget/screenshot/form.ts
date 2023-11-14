import { logger } from '@sentry/utils';

import type { FeedbackComponent } from '../../types';
import { takeScreenshot } from '../../util/takeScreenshot';
import { createElement } from '../util/createElement';

interface ScreenshotFormProps {
  onEditScreenshot: () => void;
  onEditCutout: () => void;
  onTakeScreenshot: (image: string) => void;
}

export interface ScreenshotFormComponent extends FeedbackComponent<HTMLDivElement> {
  setFormPreview: (image: string) => void;
  setFormCutoutPreview: (image: string) => void;
}

/**
 * Component for taking screenshots in feedback dialog
 */
export function ScreenshotForm({
  onEditCutout,
  onEditScreenshot,
  onTakeScreenshot,
}: ScreenshotFormProps): ScreenshotFormComponent {
  const handleAddScreenshot = async (): Promise<void> => {
    try {
      const image = await takeScreenshot();
      onTakeScreenshot(image);
      setScreenshotPreview(image);
    } catch (e) {
      __DEBUG_BUILD__ && logger.error(e);
    }
  };

  const addScreenshotButton = createElement(
    'button',
    {
      className: 'btn btn--default',
      type: 'button',
      'aria-hidden': 'false',
      onClick: handleAddScreenshot,
    },
    'Add Screenshot',
  );
  const imageEl = createElement('img', { className: 'screenshot-preview__image' });
  const cutoutImageEl = createElement('img', {
    className: 'screenshot-preview__image screenshot-preview__image__cutout',
    // src: screenshotCutoutPreview,
  });
  const editScreenshotButton = createElement(
    'button',
    {
      className: 'screenshot-preview',
      type: 'button',
      'aria-label': 'Edit screenshot',
      'aria-hidden': 'true',
      onClick: onEditScreenshot,
    },
    [imageEl],
  );
  const editCutoutButton = createElement(
    'button',
    {
      className: 'screenshot-preview',
      type: 'button',
      'aria-label': 'Edit screenshot cutout',
      'aria-hidden': 'true',
      onClick: onEditCutout,
    },
    cutoutImageEl,
  );
  const screenshotPreviewWrapper = createElement(
    'div',
    { className: 'screenshot-preview__wrapper', 'aria-hidden': 'true' },
    [editScreenshotButton, editCutoutButton],
  );

  function setScreenshotPreview(image: string): void {
    if (!image) {
      screenshotPreviewWrapper.setAttribute('aria-hidden', 'true');
      editScreenshotButton.setAttribute('aria-hidden', 'false');
      addScreenshotButton.setAttribute('aria-hidden', 'false');
    }

    imageEl.setAttribute('src', image);
    screenshotPreviewWrapper.setAttribute('aria-hidden', 'false');
    editScreenshotButton.setAttribute('aria-hidden', 'false');
    addScreenshotButton.setAttribute('aria-hidden', 'true');
  }

  function setScreenshotCutoutPreview(image: string): void {
    if (!image) {
      screenshotPreviewWrapper.setAttribute('aria-hidden', 'true');
      addScreenshotButton.setAttribute('aria-hidden', 'false');
      editCutoutButton.setAttribute('aria-hidden', 'true');
    }

    cutoutImageEl.setAttribute('src', image);
    screenshotPreviewWrapper.setAttribute('aria-hidden', 'false');
    editCutoutButton.setAttribute('aria-hidden', 'false');
    addScreenshotButton.setAttribute('aria-hidden', 'true');
  }

  const el = createElement('div', { className: 'screenshot-editor__row' }, [
    createElement('label', {}, 'Screenshot'),
    screenshotPreviewWrapper,
    addScreenshotButton,
  ]);

  return {
    get el() {
      return el;
    },
    setFormPreview: setScreenshotPreview,
    setFormCutoutPreview: setScreenshotCutoutPreview,
  };
}