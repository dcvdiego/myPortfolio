import React, { useState } from 'react';
const ReadMore = (props: any) => {
  const text = props.children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <p
        dangerouslySetInnerHTML={{
          __html: isReadMore
            ? text
                .replaceAll(props.word, `<b>${props.word}</b>`)
                .slice(0, 150) + '...'
            : text.replaceAll(props.word, `<b>${props.word}</b>`),
        }}
      />
      <span style={{ cursor: 'pointer' }} onClick={toggleReadMore}>
        {isReadMore ? 'Read more' : ' Show less'}
      </span>
    </>
  );
};

export default ReadMore;
