import React from 'react';
import {Text} from 'react-native';

const textHighlight = (text, highlight, Wrapper) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gim'));

  const result = parts.map((part) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <Wrapper key={`${Math.random()}-${part}`}>{part}</Wrapper>
    ) : (
      <Text key={`${Math.random()}-${part}`}>{part}</Text>
    ),
  );

  return result;
};

export default textHighlight;
