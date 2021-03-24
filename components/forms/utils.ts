export type FormState = {
  status: 'idle' | 'submitting' | 'success' | 'error';
  error: null | string;
};

export type FormAction =
  | { type: 'SUBMIT_FORM' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; payload: { err: Error } };

export const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case 'SUBMIT_FORM':
      return {
        ...state,
        status: 'submitting',
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        status: 'success',
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.payload.err,
      };
  }
};
