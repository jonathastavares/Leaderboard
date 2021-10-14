/* eslint-disable import/no-extraneous-dependencies */
import './style.css';
import fetch from 'cross-fetch';

const gameId = 'Jonathas2021';
const submit = document.getElementById('submit');
const reload = document.getElementById('reload');
const list = document.querySelector('.scores-list');
const name = document.getElementById('name');
const score = document.getElementById('score');
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`;

function populate(data) {
  list.innerHTML = '<li class="d-flex justify-content-around"><span>Name</span> <span>score</span></li>';
  data.forEach((result) => {
    const { user, score } = result;
    const listItem = document.createElement('li');
    const userContain = document.createElement('span');
    userContain.innerHTML = user;
    const scoreContain = document.createElement('span');
    scoreContain.innerHTML = score;
    listItem.appendChild(userContain);
    listItem.appendChild(scoreContain);
    listItem.classList.add('d-flex');
    listItem.classList.add('justify-content-around');
    list.appendChild(listItem);
  });
}

const createScore = async () => {
  if (name.value && score.value) {
    (async () => {
      await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user: name.value, score: score.value }) }).then((response) => response.json());
    })();
  }
};

const loadScore = async () => {
  const response = await fetch(url);
  const data = await response.json();

  populate(data.result);
};

submit.addEventListener('click', createScore);
reload.addEventListener('click', loadScore);

window.onload = () => {
  loadScore();
};
