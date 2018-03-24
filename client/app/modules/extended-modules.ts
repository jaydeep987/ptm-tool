import * as React from 'react';

/**
 * https://github.com/zilverline/react-tap-event-plugin/issues/58
 * Macmee commented on Apr 6, 2017
 */
declare module 'react' {
  /* tslint:disable-next-line:interface-name */
  interface DOMAttributes<T> {
      onTouchTap?: React.EventHandler<React.TouchEvent<T>>;
  }
}
