import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { LinkLikeComponentProps } from '@shopify/polaris/dist/types/latest/src/utilities/link/types';

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

export default function AppLink({
  children,
  url = '',
  external,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
  ...rest
}: LinkLikeComponentProps): JSX.Element {
  // react-router only supports links to pages it can handle itself. It does not
  // support arbirary links, so anything that is not a path-based link should
  // use a reglar old `a` tag
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    rest.target = '_blank';
    rest.rel = 'noopener noreferrer';
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
}
