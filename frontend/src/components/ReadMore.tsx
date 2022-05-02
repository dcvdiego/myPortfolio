import React, { useState } from 'react';

interface IReadMoreProps {
  children: React.ReactNode;
  word?: string;
  style?: React.CSSProperties;
}
const ReadMore: React.FunctionComponent<IReadMoreProps> = ({ ...props }) => {
  const { children, word } = props;
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <p
        dangerouslySetInnerHTML={{
          __html: isReadMore
            ? word
              ? (text as string)!
                  .replaceAll(word, `<b>${word}</b>`)
                  .slice(0, 150) + '...'
              : (text as string)!.slice(0, 150)
            : word
            ? (text as string)!.replaceAll(word, `<b>${word}</b>`)
            : (text as string),
        }}
      />
      <span style={{ cursor: 'pointer' }} onClick={toggleReadMore}>
        {isReadMore ? 'Read more' : ' Show less'}
      </span>
    </>
  );
};

export default ReadMore;
