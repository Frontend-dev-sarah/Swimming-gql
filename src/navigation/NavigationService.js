import * as React from 'react';

export const navigationRef = React.createRef();

// function used to navigate from everywhere in the app without passing navigation
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
