import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { AlertMinor } from '@shopify/polaris-icons';
import { Icon } from '@shopify/polaris';
import 'react-phone-input-2/lib/style.css';
import './phone-input.scss';

type PropsType = {
  value: string;
  label: string;
  country?: string;
  onChange: (phone: string) => void;
  error?: string;
  isOnboarding?: boolean;
  id?: string;
};

const PhoneInputComponent: React.FC<PropsType> = ({
  value,
  label,
  country,
  onChange,
  isOnboarding,
  error,
  id,
}: PropsType) => (
  <>
    <div id={id} style={{ marginBottom: '0.4rem' }}>
      {label}
    </div>
    <PhoneInput
      country={country ?? 'il'}
      value={value}
      onChange={(phone) => onChange(phone)}
      inputStyle={{
        maxWidth: '100%',
        minWidth: '100%',
        borderRadius: 3,
        borderColor: error ? '#bf0711' : 'rgb(196, 205, 213)',
        color: error ? '#f4406b' : '#637381',
        backgroundColor: error ? '#fbeae5' : '#fff',
        height: isOnboarding ? 38 : 36,
        boxShadow: isOnboarding ? 'inset 0px 1px 2px rgba(102, 113, 123, 0.21)' : '',
      }}
      buttonStyle={{
        backgroundColor: error ? '#fbeae5' : '#fff',
        borderColor: error ? '#bf0711' : 'rgb(196, 205, 213)',
      }}
      dropdownStyle={{ zIndex: 100, height: 100, fontSize: '0.9em' }}
    />
    {error && (
      <div className="phone-input-errors">
        <Icon source={AlertMinor} color="critical" />
        <span>{error}</span>
      </div>
    )}
  </>
);

export default PhoneInputComponent;
