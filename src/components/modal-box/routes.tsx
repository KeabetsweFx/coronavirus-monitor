import { State } from 'components/modal-box';

export const MODAL_ROUTES: Record<string, Omit<State, 'isVisible'>> = {
  'country-stats': {},
  select: {},
  'country-picker': {
    animationIn: 'slideInUp',
  },
};
