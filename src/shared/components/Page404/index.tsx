import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@shopify/polaris';
import picture from '../../../assets/images/404.svg';
import './page404.scss';

type Props = {
  description?: string;
  buttonTitle?: string;
  onClick?: () => void;
};

const Page404: React.FC<Props> = ({ description, buttonTitle, onClick }: Props) => {
  const history = useHistory();

  return (
    <div className="not-found__wrapper">
      <div className="Polaris-TextContainer not-found__text" style={{ maxWidth: '350px' }}>
        <p
          className="Polaris-DisplayText Polaris-DisplayText--sizeSmall"
          style={{ fontWeight: 'bold' }}
        >
          The Page you&apos;re looking for couldn&apos;t be found
        </p>
        <div className="Polaris-EmptyState__Content" style={{ maxWidth: '44rem' }}>
          <span>
            {description ||
              'Check the web app address and try again, or try navigating to the page from your profile.'}
          </span>
        </div>
        <Button primary onClick={() => (onClick ? onClick() : history.push('/my-profile'))}>
          {buttonTitle || 'Go to your profile'}
        </Button>
      </div>
      <div className="img-wrapper">
        <img src={picture} alt="" />
      </div>
    </div>
  );
};

export default Page404;
