import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import './NavBarSearch.scss';
import Icon from '@edudoor/ui/components/Icon';
import useClickOutside from '@edudoor/ui/hooks/useClickOutside';
import classNames from 'classnames';
import EImage from '@edudoor/ui/components/Image';
import IfElse from '@edudoor/ui/components/IfElse';
import useCaptureKeyDown from '@edudoor/ui/hooks/useCaptureKeyDown';
import { SearchSuggestion } from '@edudoor/common/types/api';
import withContext from '@edudoor/ui/hoc/withContext';
import { WebComponentState } from '@edudoor/ui/reducers/reducers';
import WebComponent from '@edudoor/ui/components/WebComponent';
import Spinner from '@edudoor/ui/components/Spinner';

const SearchSuggestionView: React.FunctionComponent<SearchSuggestionViewProps> = ({
  suggestion,
  onClickSuggestion,
  searchText,
}) => {
  return (
    <div key={suggestion.text} className="search-suggestion" onClick={onClickSuggestion}>
      <span className="search-suggestion__icon">
        <IfElse condition={suggestion.image || suggestion.icon}>
          <React.Fragment>
            {suggestion.icon && <Icon icon={suggestion.icon} />}
            {suggestion.image && <EImage src={suggestion.image} />}
          </React.Fragment>
          <Icon icon="search" />
        </IfElse>
      </span>
      <span
        className={classNames({
          'search-suggestion__text': true,
          selected: suggestion.text.toLowerCase() === (searchText || '').toLowerCase(),
        })}
      >
        {suggestion.text}
      </span>
    </div>
  );
};

const NavBarSearch: React.FunctionComponent<NavBarSearchProps> = props => {
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predictedText, setPredictedText] = useState('');
  const searchElement = useRef(undefined);
  const inputElement = useRef(undefined);
  const [mainSuggestions, setMainSuggestions] = useState<Array<SearchSuggestion>>([]);
  const [suggestions, setSuggestions] = useState<Array<SearchSuggestion>>([]);

  useEffect(() => {
    if (props.state) {
      setLoading(props.state.fetching);
      if (props.state.data?.suggestions && props.state.data?.suggestions?.length) {
        setMainSuggestions(props.state.data?.suggestions);
      }
    }
  }, [props.state]);

  useClickOutside(() => {
    setFocused(false);
  }, searchElement);

  useEffect(() => {
    if (mainSuggestions.length) {
      setSuggestions(mainSuggestions);
    }
  }, [mainSuggestions]);

  useEffect(() => {
    if (props.suggestions && props.suggestions.length) {
      setMainSuggestions(props.suggestions);
    }
  }, [props.suggestions]);

  useEffect(() => {
    if (props.searchText !== searchText) {
      setSearchText(props.searchText);
    }
  }, [props.searchText]);

  useEffect(() => {
    if (submit) {
      props.onSearch(searchText);
      setSubmit(false);
    }
  }, [submit, searchText]);

  useEffect(() => {
    if (!searchText) {
      setPredictedText('');
    }
    setSuggestions(
      mainSuggestions.filter(suggestion => {
        return suggestion.text.toLowerCase().includes((searchText || '').toLowerCase());
      })
    );
  }, [searchText]);

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
        setSubmit(true);
        props.onSearch(searchText);
      }
    },
    [predictedText]
  );

  const onChange = (e: any) => {
    const text = e.target.value;
    setSearchText(text);
  };

  useEffect(() => {
    if (suggestions && searchText) {
      const prediction = suggestions.find(suggestion => {
        return suggestion.text.toLowerCase().startsWith(searchText.toLowerCase());
      });
      setPredictedText(prediction?.text || '');
    } else {
      setPredictedText('');
    }
  }, [suggestions, searchText]);

  return (
    <div
      className={classNames({
        'ed-search__bar': true,
        focused,
        suggestions: mainSuggestions.length || props.state,
      })}
      ref={searchElement}
    >
      <div className="ed-search__bar--input">
        <div className="ed-search__bar__input__leftIcon">
          <IfElse condition={loading}>
            <Spinner width={20} height={20} />
            <Icon icon="search" onClick={() => {}} />
          </IfElse>
        </div>
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
              setSearchText('');
              setSubmit(true);
            }}
          />
        )}
      </div>
      <div className="ed-search__bar--suggestions">
        <WebComponent data={suggestions} loading={loading} empty={<div className="no-suggestions">No results</div>}>
          {() => {
            return (
              <React.Fragment>
                {suggestions.map(suggestion => (
                  <SearchSuggestionView
                    suggestion={suggestion}
                    searchText={searchText}
                    onClickSuggestion={() => {
                      setFocused(false);
                      setSearchText(suggestion.text);
                      setSubmit(true);
                    }}
                  />
                ))}
              </React.Fragment>
            );
          }}
        </WebComponent>
      </div>
    </div>
  );
};

export interface SearchSuggestionViewProps {
  suggestion: SearchSuggestion;
  searchText: string;
  onClickSuggestion: MouseEventHandler;
}

export interface NavBarSearchProps {
  placeholder?: string;
  suggestions?: Array<SearchSuggestion>;
  searchText?: string;
  onSearch: (search: string) => void;
  state?: WebComponentState<{ suggestions: Array<SearchSuggestion> }>;
}

const { ContextConsumer, Context } = withContext(NavBarSearch, {});

export const NavBarSearchContext = Context;

export default ContextConsumer;
