import React, { useCallback, useContext, useEffect, useState } from 'react';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { CreateQuestionBody } from '@doorward/common/dtos/body';
import Spacer from '@doorward/ui/components/Spacer';
import Icon from '@doorward/ui/components/Icon';
import QuestionView, { QuestionViewTypes } from '../../components/UI/AssessmentView/QuestionView';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';
import Button from '@doorward/ui/components/Buttons/Button';
import { useSelector } from 'react-redux';
import translate from '@doorward/common/lang/translate';
import { FormContext } from '@doorward/ui/components/Form';
import _, { add, round } from 'lodash';
import BadgeControl from '@doorward/ui/components/BadgeControl';
import './styles/SingleQuestionAssessment.scss';
import Panel from '@doorward/ui/components/Panel';
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';
import Grid from '@doorward/ui/components/Grid';
import classNames from 'classnames';

const DisplayQuestion: React.FunctionComponent<DisplayQuestionProps> = ({
  section,
  view,
  questionNumber,
  onReadyToSave,
}) => {
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(section.questions[0]);
  const { formikProps } = useContext(FormContext);
  const [bookMark, setBookMark] = useState([]);

  useEffect(() => {
    onReadyToSave(JSON.stringify(formikProps.values.submission));
  }, [formikProps.values]);

  const previous = useCallback(
    (index) => {
      if (index > 0) {
        setIndex(index - 1);
      }
    },
    [index]
  );

  const next = useCallback(
    (index) => {
      if (index < section.questions.length - 1) {
        setIndex(index + 1);
      }
    },
    [index]
  );
  const onClickQuestionNumber = useCallback(
    (index) => {
      setIndex(index);
      setCurrentQuestion(section.questions[index]);
    },
    [index]
  );
  const mark = useCallback(
    (index) => {
      if (bookMark.includes(index)) {
        setBookMark(bookMark.filter((i) => i !== index));
      } else {
        bookMark.push(index);
      }
    },
    [index]
  );
  useEffect(() => {
    setBookMark(bookMark);
  }, [bookMark]);

  useEffect(() => {
    setCurrentQuestion(section.questions[index]);
    setIndex(index);
  }, [index]);

  const getQuestionsAnswered = useCallback(
    (section: QuestionSectionEntity) => {
      const result = [];
      section.questions.forEach((question) => {
        if (Object.keys(_.pickBy(formikProps.values.submission, _.identity)).includes(question.id)) {
          result.push(question.id);
        }
      });
      return result;
    },
    [formikProps.values]
  );

  const getDisabled = (section) => {
    const questionsAnswered = getQuestionsAnswered(section);

    let disableQuestion = !section.config.questions.allCompulsory && !section.config.questions?.answers?.answerAll;

    disableQuestion = disableQuestion && questionsAnswered.length === section.config.questions.numRequired;
    disableQuestion = disableQuestion && !questionsAnswered.includes(currentQuestion.id);
    return disableQuestion;
  };

  return (
    <div>
      <Panel>
        <div style={{ display: 'grid', width: 'min-content', height: 'min-content', gridGap: '5px' }}>
          {section.questions.map((question, index) => {
            const questionsAnswered = getQuestionsAnswered(section);
            if (currentQuestion.id === question.id) {
              return (
                <div style={{ gridRowStart: 1, gridRowEnd: -1 }}>
                  <Button
                    bordered={true}
                    className={classNames('button', {
                      primary: true,
                    })}
                    theme="primary"
                    onClick={() => onClickQuestionNumber(index)}
                  >
                    {index + 1}
                  </Button>
                </div>
              );
            } else if (bookMark.includes(index)) {
              return (
                <div style={{ gridRowStart: 1, gridRowEnd: -1 }}>
                  <BadgeControl value={null} bookmark={true}>
                    <Button
                      bordered={true}
                      theme="success"
                      className={classNames('button', {
                        error: true,
                      })}
                      onClick={() => onClickQuestionNumber(index)}
                    >
                      {index + 1}
                    </Button>
                  </BadgeControl>
                </div>
              );
            } else if (questionsAnswered.includes(question.id)) {
              return (
                <div style={{ gridRowStart: 1, gridRowEnd: -1 }}>
                  <BadgeControl value={null} bookmark={false}>
                    <Button
                      bordered={true}
                      theme="success"
                      className={classNames('button', {
                        success: true,
                      })}
                      onClick={() => onClickQuestionNumber(index)}
                    >
                      {index + 1}
                    </Button>
                  </BadgeControl>
                </div>
              );
            } else
              return (
                <div style={{ gridRowStart: 1, gridRowEnd: -1 }}>
                  <Button
                    bordered={true}
                    className={classNames('button', {
                      default: true,
                    })}
                    theme="default"
                    onClick={() => onClickQuestionNumber(index)}
                  >
                    {index + 1}
                  </Button>
                </div>
              );
          })}
        </div>
      </Panel>
      <Spacer />

      <Panel>
        {view === QuestionViewTypes.EXAM_MODE ? (
          <div>
            <QuestionView
              disabled={getDisabled(section)}
              question={currentQuestion}
              view={view}
              bookMark={(index) => mark(index)}
              questionNumber={index + 1}
            />
            <div style={{ display: 'grid', gridColumnGap: 0 }}>
              <div style={{ gridColumnStart: 1 }}>
                {index > 0 && (
                  <Button theme="default" onClick={() => previous(index)}>
                    {translate('previous')}
                  </Button>
                )}
              </div>

              <div style={{ gridColumnStart: 12 }}>
                {index < section.questions.length - 1 && (
                  <Button theme="default" onClick={() => next(index)}>
                    {translate('next')}
                  </Button>
                )}
              </div>
            </div>

            <Spacer />
          </div>
        ) : (
          <QuestionView
            disabled={getDisabled(section)}
            question={currentQuestion}
            view={view}
            questionNumber={index + 1}
          />
        )}
      </Panel>
    </div>
  );
};

export interface DisplayQuestionProps {
  section: QuestionSectionEntity;
  view?: QuestionViewTypes;
  questionNumber?: number;
  onReadyToSave: (submission: string) => void;
}

export default DisplayQuestion;
