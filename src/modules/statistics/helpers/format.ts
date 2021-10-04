/* eslint-disable import/extensions */
import Intl from 'intl';
import 'intl/locale-data/jsonp/en-ZA.js';

/**
 * @param value - value to be formatted
 */
export function formatFigure(value: number) {
  const search = ',';
  const replaceWith = ' ';

  return new Intl.NumberFormat('en-US', {
    notation: 'standard',
  })
    .format(value)
    .split(search)
    .join(replaceWith);
}
