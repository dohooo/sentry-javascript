// biome-ignore lint/nursery/noUnusedImports: reason
import { Fragment, h } from 'preact'; // eslint-disable-line @typescript-eslint/no-unused-vars
import type { VNode } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { SUCCESS_MESSAGE_TIMEOUT } from '../../constants';
import type { FeedbackFormData } from '../../types';
import { DialogHeader } from './DialogHeader';
import type { Props as HeaderProps } from './DialogHeader';
import type { Props as FormProps } from './Form';
import { Form } from './Form';
import { SuccessIcon } from './SuccessIcon';

interface Props extends HeaderProps, FormProps {
  successMessageText: string;
  onFormSubmitted: () => void;
  open: boolean;
}

export function Dialog({ open, onFormSubmitted, successMessageText, ...props }: Props): VNode {
  const successIconHtml = useMemo(() => ({ __html: SuccessIcon().outerHTML }), []);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleOnSuccessClick = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    onFormSubmitted();
  }, [timeoutId]);

  const onSubmitSuccess = useCallback(
    (data: FeedbackFormData) => {
      props.onSubmitSuccess(data);
      setTimeoutId(
        setTimeout(() => {
          onFormSubmitted();
          setTimeoutId(null);
        }, SUCCESS_MESSAGE_TIMEOUT),
      );
    },
    [onFormSubmitted],
  );

  return (
    <Fragment>
      {timeoutId ? (
        <div class="success-message" onClick={handleOnSuccessClick}>
          {successMessageText}
          <span class="success-icon" dangerouslySetInnerHTML={successIconHtml} />
        </div>
      ) : (
        <dialog class="dialog" onClick={props.onFormClose} open={open}>
          <div
            class="dialog__content"
            onClick={e => {
              // Stop event propagation so clicks on content modal do not propagate to dialog (which will close dialog)
              e.stopPropagation();
            }}
          >
            <DialogHeader {...props} />
            <Form {...props} onSubmitSuccess={onSubmitSuccess} />
          </div>
        </dialog>
      )}
    </Fragment>
  );
}
