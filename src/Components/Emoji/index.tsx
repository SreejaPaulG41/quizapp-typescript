import React from 'react';
interface emojiProps{
    label: string;
    symbol: string;
}
const Emoji: React.FC<emojiProps> = ({label, symbol}) => (
    <span
        className="emoji"
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}
    >
        {symbol}
    </span>
);
export default Emoji;