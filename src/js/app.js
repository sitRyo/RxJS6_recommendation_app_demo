import { requestJSON } from './modules/util';
import { fromEvent, merge, from, of, Observable } from 'rxjs';
import { mergeMap, map, startWith, combineLatest, tap } from 'rxjs/operators';

// api endpoint
const githubURL = "https://api.github.com/users?since=";

var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var refreshClickStream = fromEvent(refreshButton, 'click');
var close1ClickStream = fromEvent(closeButton1, 'click');
var close2ClickStream = fromEvent(closeButton2, 'click');
var close3ClickStream = fromEvent(closeButton3, 'click');

var requestStream = refreshClickStream
  .pipe(
    startWith('startup click'),
    map(() => {
      var randomOffset = Math.floor(Math.random()*500);
      return 'https://api.github.com/users?since=' + randomOffset;
    })
  );

const responseStream = requestStream
  .pipe(
    mergeMap(requestURL => requestJSON(requestURL)),
    map(json => JSON.parse(json)),
  );

function createSuggestionStream(closeClickStream) {
  return closeClickStream
    .pipe(
      startWith('startup click'),
      tap(val => console.log(`BEFORE COMBINELATEST: ${val}`)),
      combineLatest(responseStream, (click, listUsers) => {
        const idx = Math.floor(Math.random() * listUsers.length);
        return listUsers[idx];
      })
    )
};

var suggestion1Stream = createSuggestionStream(close1ClickStream);
var suggestion2Stream = createSuggestionStream(close2ClickStream);
var suggestion3Stream = createSuggestionStream(close3ClickStream);

function renderSuggestion(suggestedUser, selector) {
  var suggestionEl = document.querySelector(selector);
  if (suggestedUser === null) {
    suggestionEl.style.visibility = 'hidden';
  } else {
    suggestionEl.style.visibility = 'visible';
    var usernameEl = suggestionEl.querySelector('.username');
    usernameEl.href = suggestedUser.html_url;
    usernameEl.textContent = suggestedUser.login;
    var imgEl = suggestionEl.querySelector('img');
    imgEl.src = "";
    imgEl.src = suggestedUser.avatar_url;
  }
}

suggestion1Stream.subscribe(suggestedUser => {
  renderSuggestion(suggestedUser, '.suggestion1');
});

suggestion2Stream.subscribe(suggestedUser => {
  renderSuggestion(suggestedUser, '.suggestion2');
});

suggestion3Stream.subscribe(suggestedUser => {
  renderSuggestion(suggestedUser, '.suggestion3');
});
