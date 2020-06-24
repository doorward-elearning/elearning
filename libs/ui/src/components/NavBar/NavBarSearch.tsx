import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import './NavBarSearch.scss';
import Icon from '@edudoor/ui/components/Icon';
import useClickOutside from '@edudoor/ui/hooks/useClickOutside';
import { Icons } from '@edudoor/ui/types/icons';
import classNames from 'classnames';
import EImage from '@edudoor/ui/components/Image';
import IfElse from '@edudoor/ui/components/IfElse';
import useCaptureKeyDown from '@edudoor/ui/hooks/useCaptureKeyDown';

export interface SearchSuggestion {
  title: string;
  image?: string;
  icon?: Icons;
}

const SearchSuggestionView: React.FunctionComponent<SearchSuggestionViewProps> = ({
  suggestion,
  onClickSuggestion,
}) => {
  return (
    <div key={suggestion.title} className="search-suggestion" onClick={onClickSuggestion}>
      <span className="search-suggestion__icon">
        <IfElse condition={suggestion.image || suggestion.icon}>
          <React.Fragment>
            {suggestion.icon && <Icon icon={suggestion.icon} />}
            {suggestion.image && <EImage src={suggestion.image} />}
          </React.Fragment>
          <Icon icon="search" />
        </IfElse>
      </span>
      <span className="search-suggestion__title">{suggestion.title}</span>
    </div>
  );
};

const NavBarSearch: React.FunctionComponent<NavBarSearchProps> = props => {
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);
  const [predictedText, setPredictedText] = useState('');
  const searchElement = useRef(undefined);
  const inputElement = useRef(undefined);
  const [suggestions, setSuggestions] = useState<Array<SearchSuggestion>>([]);

  useClickOutside(() => {
    setFocused(false);
  }, searchElement);

  useEffect(() => {
    setSuggestions(props.suggestions || []);
  }, [props.suggestions]);

  useEffect(() => {
    if (props.searchText !== searchText) {
      setSearchText(props.searchText);
    }
  }, [props.searchText]);

  useEffect(() => {
    if (!focused) {
      if (searchText !== props.searchText) {
        props.onSearch(searchText);
      }
    }
  }, [focused, searchText]);

  useCaptureKeyDown(
    inputElement,
    e => {
      if (e.keyCode === 9) {
        e.preventDefault();
        if (predictedText) {
          setSearchText(predictedText);
        }
      } else if (e.keyCode === 13) {
        setFocused(false);
      }
    },
    [predictedText]
  );

  const onChange = (e: any) => {
    const text = e.target.value;
    setSearchText(text);

    if (suggestions && text) {
      const prediction = suggestions.find(suggestion => {
        return suggestion.title.toLowerCase().startsWith(text.toLowerCase());
      });
      setPredictedText(prediction?.title || '');
    } else {
      setPredictedText('');
    }
  };

  useEffect(() => {
    if (!searchText) {
      setPredictedText('');
    }
  }, [searchText]);

  return (
    <div
      className={classNames({
        'ed-search__bar': true,
        focused,
        suggestions: suggestions.length,
      })}
      ref={searchElement}
    >
      <div className="ed-search__bar--input">
        <Icon icon="search" onClick={() => {}} />
        <div className="ed-search__bar--input__input">
          <input type="text" className="prediction" disabled value={predictedText} />
          <input
            type="text"
            autoComplete="off"
            className="form-control"
            onFocus={() => {
              setFocused(true);
            }}
            placeholder={props.placeholder || 'Search...'}
            name="search"
            ref={inputElement}
            value={searchText}
            onChange={onChange}
          />
        </div>
        {searchText && (
          <Icon
            icon="close"
            onClick={() => {
              setFocused(false);
              setSearchText('');
            }}
          />
        )}
      </div>
      <div className="ed-search__bar--suggestions">
        {suggestions.map(suggestion => (
          <SearchSuggestionView
            suggestion={suggestion}
            onClickSuggestion={() => {
              setFocused(false);
              setSearchText(suggestion.title);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export interface SearchSuggestionViewProps {
  suggestion: SearchSuggestion;
  onClickSuggestion: MouseEventHandler;
}

export interface NavBarSearchProps {
  placeholder?: string;
  suggestions?: Array<SearchSuggestion>;
  searchText?: string;
  onSearch: (search: string) => void;
}

export default NavBarSearch;
