import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import './NavBarSearch.scss';
import Icon from '@doorward/ui/components/Icon';
import useClickOutside from '@doorward/ui/hooks/useClickOutside';
import classNames from 'classnames';
import EImage from '@doorward/ui/components/Image';
import IfElse from '@doorward/ui/components/IfElse';
import useCaptureKeyDown from '@doorward/ui/hooks/useCaptureKeyDown';
import { SearchSuggestion } from '@doorward/common/types/api';
import withContext from '@doorward/ui/hoc/withContext';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import WebComponent from '@doorward/ui/components/WebComponent';
import Spinner from '@doorward/ui/components/Spinner';

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

const NavBarSearchComponent: React.FunctionComponent<NavBarSearchProps> = props => {
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

  useClickOutside(e => {
    setFocused(false);
    setSubmit(true);
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
        e.preventDefault();
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
    if (props.instantSearch) {
      setSubmit(true);
    }
  };

  useEffect(() => {
    if (suggestions && searchText) {
      const prediction = suggestions.find(suggestion => {
        return suggestion.text.toLowerCase().startsWith(searchText.toLowerCase());
      });
      let predictionText = prediction?.text || '';
      if (predictionText) {
        const endText = predictionText.substring(searchText.length);
        predictionText = searchText + endText;
      }
      setPredictedText(predictionText);
    } else {
      setPredictedText('');
    }
  }, [suggestions, searchText]);

  return (
    <div
      className={classNames({
        'ed-search__bar': true,
        focused,
        empty: !searchText,
        suggestions: mainSuggestions.length || props.state,
        collapsed: props.collapsed,
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
          <input type="text" className="prediction" disabled value={predictedText || ''} />
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
            value={searchText || ''}
            onChange={onChange}
          />
        </div>
        <Icon
          className="search-icon"
          icon="close"
          onClick={() => {
            setSearchText('');
            if (!focused) {
              setSubmit(true);
            }
          }}
        />
      </div>
      <div className="ed-search__bar--suggestions">
        <WebComponent data={suggestions} loading={loading} empty={<div className="no-suggestions">No suggestions</div>}>
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
  instantSearch?: boolean;
  searchText?: string;
  onSearch: (search: string) => void;
  state?: WebComponentState<{ suggestions: Array<SearchSuggestion> }>;
  collapsed?: boolean;
}

const { ContextConsumer: NavBarSearch, Context } = withContext(NavBarSearchComponent, {});

export const NavBarSearchContext = Context;

export default NavBarSearch;
