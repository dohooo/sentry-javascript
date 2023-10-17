import type { FeedbackComponent, FeedbackConfigurationWithDefaults, FeedbackFormData } from '../types';
import { SubmitButton } from './SubmitButton';
import { createElement as h } from './util/createElement';

interface Props {
  /**
   * A default name value to render the input with. Empty strings are ok.
   */
  defaultName: string;
  /**
   * A default email value to render the input with. Empty strings are ok.
   */
  defaultEmail: string;
  options: FeedbackConfigurationWithDefaults;
  onCancel?: (e: Event) => void;
  onSubmit?: (feedback: FeedbackFormData) => void;
}

interface FormComponent extends FeedbackComponent<HTMLFormElement> {
  /**
   * Shows the error message
   */
  showError: (message: string) => void;

  /**
   * Hides the error message
   */
  hideError: () => void;

  /**
   * Disables the submit button
   */
  setSubmitDisabled: () => void;

  /**
   * Enables the submit button
   */
  setSubmitEnabled: () => void;
}

function retrieveStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value === 'string') {
    return value.trim();
  }
  return '';
}

/**
 * Creates the form element
 */
export function Form({
  options: {
    showName,
    showEmail,
    isAnonymous,

    nameLabel,
    namePlaceholder,
    emailLabel,
    emailPlaceholder,
    messageLabel,
    messagePlaceholder,
    cancelButtonLabel,
    submitButtonLabel,
  },

  defaultName,
  defaultEmail,
  onCancel,
  onSubmit,
}: Props): FormComponent {
  const {
    $el: $submit,
    setDisabled: setSubmitDisabled,
    setEnabled: setSubmitEnabled,
  } = SubmitButton({
    label: submitButtonLabel,
  });

  function handleSubmit(e: Event): void {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }

    try {
      if (onSubmit) {
        const formData = new FormData(e.target as HTMLFormElement);
        const feedback = {
          name: retrieveStringValue(formData, 'name'),
          email: retrieveStringValue(formData, 'email'),
          message: retrieveStringValue(formData, 'message'),
        };

        onSubmit(feedback);
      }
    } catch {
      // pass
    }
  }

  const $error = h('div', {
    className: 'form__error-container form__error-container--hidden',
    ariaHidden: 'true',
  });

  function showError(message: string): void {
    $error.textContent = message;
    $error.classList.remove('form__error-container--hidden');
    $error.setAttribute('ariaHidden', 'false');
  }

  function hideError(): void {
    $error.textContent = '';
    $error.classList.add('form__error-container--hidden');
    $error.setAttribute('ariaHidden', 'true');
  }

  const $name = h('input', {
    id: 'name',
    type: showName ? 'text' : 'hidden',
    ariaHidden: showName ? 'false' : 'true',
    name: 'name',
    className: 'form__input',
    placeholder: namePlaceholder,
    value: defaultName,
  });

  const $email = h('input', {
    id: 'email',
    type: showEmail ? 'text' : 'hidden',
    ariaHidden: showEmail ? 'false' : 'true',
    name: 'email',
    className: 'form__input',
    placeholder: emailPlaceholder,
    value: defaultEmail,
  });

  const $message = h('textarea', {
    id: 'message',
    autoFocus: 'true',
    rows: '5',
    name: 'message',
    className: 'form__input form__input--textarea',
    placeholder: messagePlaceholder,
    onKeyup: (e: Event) => {
      if (!(e.currentTarget instanceof HTMLTextAreaElement)) {
        return;
      }

      if (e.currentTarget.value) {
        setSubmitEnabled();
      } else {
        setSubmitDisabled();
      }
    },
  });

  const $cancel = h(
    'button',
    {
      type: 'button',
      className: 'btn btn--default',
      onClick: (e: Event) => {
        onCancel && onCancel(e);
      },
    },
    cancelButtonLabel,
  );

  const $form = h(
    'form',
    {
      className: 'form',
      onSubmit: handleSubmit,
    },
    [
      $error,

      !isAnonymous &&
        showName &&
        h(
          'label',
          {
            htmlFor: 'name',
            className: 'form__label',
          },
          [nameLabel, $name],
        ),
      !isAnonymous && !showName && $name,

      !isAnonymous &&
        showEmail &&
        h(
          'label',
          {
            htmlFor: 'email',
            className: 'form__label',
          },
          [emailLabel, $email],
        ),
      !isAnonymous && !showEmail && $email,

      h(
        'label',
        {
          htmlFor: 'message',
          className: 'form__label',
        },
        [messageLabel, $message],
      ),

      h(
        'div',
        {
          className: 'btn-group',
        },
        [$submit, $cancel],
      ),
    ],
  );

  return {
    $el: $form,
    setSubmitDisabled,
    setSubmitEnabled,
    showError,
    hideError,
  };
}
