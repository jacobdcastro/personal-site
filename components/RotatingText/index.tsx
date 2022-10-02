// @ts-nocheck
import React, { useState, useEffect, useRef, FC } from 'react';
import {
  PrimaryLetter,
  SecondaryLetter as SecondaryLetterStyles,
} from './Animations';

interface Props {
  fullText: string;
  shorthandLetters: number[];
}

const SecondaryLetter: FC<{ show: boolean }> = ({ children, show }) => {
  const elRef = useRef(null);

  useEffect;

  return <span ref={elRef}>{children}</span>;
};

// ex: { fullText: 'twitter', shorthandLetters: [0,1]}
// makes 'TW' shorthand

const RotatingText = (/*{ fullText, shorthandLetters }: Props */) => {
  const [showFullText, setShowFullText] = useState(false);

  const fullText = 'testing';
  const shorthandLetters = [0, 2];

  const expandLetter = (element: Element) => {
    const letterWidth = element.scrollWidth;
    element.style.width = letterWidth + 'px';
  };

  return (
    <>
      <div className="text-white flex monument">
        {fullText.split('').map((letter, index) =>
          shorthandLetters.includes(index) ? (
            <span key={index}>
              {/* letter with rotate animation, always visible and has room in flex flow */}
              {letter}
            </span>
          ) : (
            <SecondaryLetter show={showFullText} key={index}>
              {/* letter invisible and made position absolute to take out of flex flow if inactive */}
              {letter}
            </SecondaryLetter>
          )
        )}
      </div>
      <button onClick={() => setShowFullText(!showFullText)}>active</button>
    </>
  );
};

export default RotatingText;

// desktop
// just a link that's hoverable, on hover changes to fulltext
// no a11y needed

// mobile
// starts as a button, reveals link onClick
// a11y: button is labeled "button to show link"
