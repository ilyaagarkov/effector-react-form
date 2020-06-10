import {Store, Event} from 'effector';
import {SyntheticEvent} from 'react';

type Message = string | void;

type Messages<Values> = {
  [key in keyof Values]?: Values[key] extends Record<string, unknown>
    ? Messages<Values[key]> : Message;
};

export type SubmitParams<Values> = {
  values: Values,
  errors: Messages<Values>,
  errorsInline: Record<string, Message>,
  fieldsInline: Record<string, FieldState>,
  form: FormState,
};

export type OnSubmit<Values> = (params: SubmitParams<Values>) => void;

export type FormState = {
  submitted: boolean,
  hasError: boolean,
}

export type FieldState = {
  touched: boolean,
  changed: boolean,
  blurred: boolean,
  active: boolean,
};

export type ControllerParams = {
  name: string,
  validate?: (value: any) => Message,
};

export type ControllerInjectedResult = {
  input: {
    name: string,
    value,
    onChange: (event: any) => void,
    onFocus: (event: any) => void,
    onBlur: (event: any) => void,
  },
  error: Message,
  form: FormState,
  validate?: (value: any) => Message,
  setFieldState: ({field: string, state: FieldState}) => void;
  fieldState: FieldState,
};

export type Controller = () => ControllerInjectedResult;

export type ControllerHof = (a: ControllerParams) => Controller;

type ResultHook<Values> = {
  controller: ControllerHof,
  handleSubmit: (onSubmit: OnSubmit<Values>) => (e: SyntheticEvent<HTMLFormElement>) => void,
  setValue: Event<{name: string, value: any}>,
  setError: Event<{field: string, error: Message}>
  $values: Store<Values>,
  $errorsInline: Store<Record<string, Message>>,
  $errors: Store<Messages<Values>>,
  $fieldsInline: Store<Record<string, FieldState>>
}

type UseFormParams<Values> = undefined | {
  $values?: Store<Values>
  $errors?: Store<Record<string, Message>>,
  $fields?: Store<Record<string, FieldState>>,
  $form?: Store<FormState>,
}

