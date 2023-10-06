import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Model, SurveyValidator } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import Loader from './Loader';
import Ajv from 'ajv';

import { json } from '../json';
import { themeJson } from '../theme';

function SurveyComponent() {
  const [surveyConfig, setSurveyConfig] = useState({
    popupDelay: 5,
    displayLimit: 3,
    popupInterval: 1,
    firstPopupTitle:
      'On a scale from 0 to 10, how likely are you to recommend Pivony to a colleague?',
    popupTitleMoreThan5: 'Title of >5 answer popup',
    popupTitleLessThan5: 'Title of ≤5 answer popup',
  });
  const surveyConfigSchema = {
    type: 'object',
    properties: {
      popupDelay: { type: 'number' },
      displayLimit: { type: 'number' },
      popupInterval: { type: 'number' },
      firstPopupTitle: { type: 'string' },
      popupTitleMoreThan5: { type: 'string' },
      popupTitleLessThan5: { type: 'string' },
    },
    required: [
      'popupDelay',
      'displayLimit',
      'popupInterval',
      //   'firstPopupTitle',
      //   'popupTitleMoreThan5',
      //   'popupTitleLessThan5',
    ],
  };

  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const ajv = new Ajv();
  const validate = ajv.compile(surveyConfigSchema);
  const [showSurvey, setShowSurvey] = useState(false);
  useEffect(() => {
    axios
      .get('https://survey-backend-xb1s.onrender.com/config')
      .then((response) => {
        console.log(response.data);
        if (!validate(response.data)) {
          console.log(validate.errors);
          // return;
          console.log('Invalid config, using default config');
          alert(
            'Invalid config, using default config' +
              '\n\n' +
              JSON.stringify(validate.errors, null, 3)
          );
          setIsLoadingConfig(false);
          setSurveyConfig({
            popupDelay: response.data.popupDelay || 5,
            displayLimit: response.data.displayLimit || 3,
            popupInterval: response.data.popupInterval || 1,
            firstPopupTitle:
              response.data.firstPopupTitle ||
              'On a scale from 0 to 10, how likely are you to recommend Pivony to a colleague?',
            popupTitleMoreThan5:
              response.data.popupTitleMoreThan5 || 'Title of >5 answer popup',
            popupTitleLessThan5:
              response.data.popupTitleLessThan5 || 'Title of ≤5 answer popup',
          });
        } else {
          console.log('Valid config');
          setSurveyConfig(response.data);
          setIsLoadingConfig(false);
          json.pages[0].elements[0].title = {
            default: response.data.firstPopupTitle,
            fr: response.data.firstPopupTitle,
          };
          json.pages[1].elements[0].title['default'] =
            response.data.popupTitleLessThan5;
          json.pages[1].elements[1].title['default'] =
            response.data.popupTitleMoreThan5;
        }
      });
  }, []);

  if (isLoadingConfig) {
    return <Loader />;
  }

  const surveyModel = new Model(json);
  surveyModel.applyTheme(themeJson);
  surveyModel.onComplete.add((sender, options) => {
    setIsLoadingConfig(true);
    console.log(JSON.stringify(sender.data, null, 3));
    axios
      .post('https://survey-backend-xb1s.onrender.com/answer', sender.data)
      .then((response) => {
        console.log(response);
        setIsLoadingConfig(false);
        setShowSurvey(false);
        alert('Thank you for your feedback!');
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingConfig(false);
        setShowSurvey(false);
        alert('Something went wrong, please try again later');
      });
  });

  //by default, the survey start with nps-score = 9
  surveyModel.data = {
    'nps-score': 9,
  };

  const displayCount = parseInt(localStorage.getItem('displayCount')) || 0;
  if (displayCount < surveyConfig.displayLimit) {
    setTimeout(() => {
      setShowSurvey(true);
      console.log('Inside setTimeout');
      localStorage.setItem('displayCount', (displayCount + 1).toString());
    }, surveyConfig.popupDelay * 1000);
    setInterval(() => {
      setShowSurvey(true);
      console.log('Inside setInterval');
      // reload page
      window.location.reload();
    }, surveyConfig.popupInterval * 60 * 1000);
  }

  if (!showSurvey) {
    return <Loader />;
  }

  return <Survey model={surveyModel} />;
}

export default SurveyComponent;
