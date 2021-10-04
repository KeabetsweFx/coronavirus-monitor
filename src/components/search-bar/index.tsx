import React, { useState, useEffect } from 'react';

import Feather from 'react-native-vector-icons/Feather';

import { Colors } from 'public/colors';
import { SearchIconBox, SearchInputContainer, SearchTextInput } from './styles';

/**
 * Renders the search bar component
 *
 * @param props - search bar props
 */
export function SearchBar(props: Props) {
  const { onChange, placeholder } = props;
  const [text, onChangeText] = useState('');

  useEffect(() => {
    onChange(text);
  }, [onChange, text]);

  return (
    <SearchInputContainer>
      <SearchIconBox>
        <Feather name="search" color={Colors.tundora} size={20} />
      </SearchIconBox>
      <SearchTextInput
        placeholder={placeholder}
        returnKeyType="search"
        value={text}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.gray}
        underlineColorAndroid={Colors.transparent}
        clearButtonMode="while-editing"
      />
    </SearchInputContainer>
  );
}
/** Type definitions */
interface Props {
  placeholder: string;
  onChange(text: string): void;
}
