import { Icon, Popover, Spinner } from '@shopify/polaris';
import { SendMajor } from '@shopify/polaris-icons';
import React, { useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import smile from '../../../../../../assets/images/chat/smile.svg';

import styles from './input.module.scss';
import { useAppSelector } from '../../../../../../main/store/hooks';

type EmojiObject = {
  activeSkinTone: string;
  emoji: string;
  names: string[];
  originalUnified: string;
  unified: string;
};

type Props = {
  currentMsgValue: string;
  onChange: (str: string) => void;
  handleOnKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
  disabled?: boolean;
};

export const ChatDialogInput: React.FC<Props> = ({
  currentMsgValue,
  onChange,
  handleOnKeyDown,
  onSend,
  disabled,
}: Props): JSX.Element => {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const inputRef = useRef(null);

  const loading = useAppSelector((state) => state.chat.sendMessageLoading);

  const toggleEmojiPopover = () => setEmojiOpen((prev) => !prev);

  const onEmojiClick = (event: React.SyntheticEvent, emoji: EmojiObject) => {
    onChange(currentMsgValue + emoji.emoji);
    toggleEmojiPopover();
    if (inputRef && inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.input}>
        <Popover
          active={emojiOpen}
          onClose={toggleEmojiPopover}
          activator={
            <button
              type="button"
              className={styles.smile}
              onClick={toggleEmojiPopover}
              disabled={disabled}
            >
              <img src={smile} alt="smile" />
            </button>
          }
        >
          <Picker onEmojiClick={onEmojiClick} />
        </Popover>

        <input
          value={currentMsgValue}
          ref={inputRef}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleOnKeyDown}
          type="text"
          placeholder="Type a message"
          disabled={disabled}
        />
      </div>
      <button type="button" onClick={onSend} className={styles.send} disabled={disabled}>
        {loading ? <Spinner size="small" /> : <Icon source={SendMajor} />}
      </button>
    </div>
  );
};
