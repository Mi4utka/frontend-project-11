import './styles.scss';
import _ from 'lodash';
import * as yup from 'yup';
import 'bootstrap';
import onChange from 'on-change';

const validate = (url, watchedState) => {
  const schema = yup.string().required().url().notOneOf(watchedState.alreadyAdded.names);
  return shema.validate(url);
};
const state = {
  currentAdd: {
    status: 'start',
    empty: 'false',
  },
  alreadyAdded: {
    urls: [],
  },
};
const watchedState = onChange(state, (path, prev, current) => {});
const form = document.querySelector('form');
const inputElem = document.getElementById('url-input');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = inputElem.value;

  if (_.isEmpty(inputValue)) {
    watchedState.currentAdd.empty = true;
    return;
  }
  validate(inputElem, watchedState)
    .catch((e) => {
      switch (e.name) {
        case 'ValidationError': state.status = error;
          break;
      }
    }).then(() => {
      watchedState.alreadyAdded.urls.push(inputValue);
    });
});
