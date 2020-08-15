import { backupSourceAPIQueryStrings } from './popup/helper';

export function showNotification(message, context, snackbarPlaceholderId, timeout) {
  const snackbar = document.getElementById(snackbarPlaceholderId);
  snackbar.innerText = message;

  snackbar.classList.add('show');
  if (context === 'positive') snackbar.classList.add('snackbar-positive');
  else if (context === 'negative') snackbar.classList.add('snackbar-negative');

  setTimeout(() => {
    snackbar.className = '';
    snackbar.classList.add('snackbar');
  }, timeout || 1100);
}

export function removeNode(className) {
  const sectionContentParagraph = document.querySelector(`.${className}`);
  if (sectionContentParagraph) {
    sectionContentParagraph.parentNode.removeChild(sectionContentParagraph);
  }
}

export function restoreInitialContent(context) {
  const sectionContent = document.querySelector(`.section-content--${context}`);

  const sectionContentInitialInfo = document.querySelector(`.section-content--${context} .initial-info`);

  if (!sectionContentInitialInfo) {
    let initialInfoElement;
    if (context === 'primary') {
      initialInfoElement = `<p></p>`;
    } else if (context === 'bookmarks') {
      initialInfoElement = `<p class="initial-info bookmarks__initial-info has-text-tomato">
              No Bookmarks yet
            </p>`;
    }
    const parser = new DOMParser();
    const parsed = parser.parseFromString(initialInfoElement, 'text/html');
    const tags = parsed.getElementsByTagName('p');

    sectionContent.querySelector('.row').appendChild(tags[0]);
  }
}

export async function fetchSources() {
  const getSourceURL = 'https://api.creativecommons.engineering/v1/sources';
  const data = await fetch(getSourceURL);
  // console.log(data);

  return data.json();
}

export async function getLatestSources() {
  let sources = {};
  try {
    const result = await fetchSources();
    result.forEach(source => {
      sources[source.display_name] = source.source_name;
    });
    return sources;
  } catch (error) {
    showNotification('Unable to fetch sources. Using backup sources', 'negative', 'snackbar-bookmarks', 2500);
    sources = backupSourceAPIQueryStrings;
    return sources;
  }
}

export function removeChildNodes(targetNode) {
  while (targetNode.lastChild) {
    targetNode.removeChild(targetNode.lastChild);
  }
}

export async function fetchImageData(imageId) {
  const url = `https://api.creativecommons.engineering/v1/images/${imageId}`;
  const data = await fetch(url);
  const responseCode = data.status;
  const res = await data.json();

  return [res, responseCode];
}

export function allowCheckingOneTypeOfCheckbox(checkboxesWrapper1, checkboxesWrapper2) {
  const checkboxesFirst = checkboxesWrapper1.querySelectorAll('input[type=checkbox]');
  const checkboxesSecond = checkboxesWrapper2.querySelectorAll('input[type=checkbox]');

  [
    [checkboxesFirst, checkboxesSecond],
    [checkboxesSecond, checkboxesFirst],
  ].forEach(item => {
    Array.prototype.forEach.call(item[0], element => {
      element.addEventListener('click', e => {
        if (e.target.checked) {
          Array.prototype.forEach.call(item[1], licenseElement => {
            // eslint-disable-next-line no-param-reassign
            licenseElement.checked = false;
          });
        }
      });
    });
  });
}

export const activeBookmarkIdContainers = [
  'bookmarksImageIds0',
  'bookmarksImageIds1',
  'bookmarksImageIds2',
  'bookmarksImageIds3',
];

export const keyNames = [
  'bookmarks0',
  'bookmarks1',
  'bookmarks2',
  'bookmarks3',
  'bookmarks4',
  'bookmarks5',
  'bookmarks6',
  'bookmarks7',
  'bookmarks8',
  'bookmarks9',
  'bookmarksImageIds0',
  'bookmarksImageIds1',
  'bookmarksImageIds2',
  'bookmarksImageIds3',
  'bookmarksLength',
];

export const activeBookmarkContainers = [
  'bookmarks0',
  'bookmarks1',
  'bookmarks2',
  'bookmarks3',
  'bookmarks4',
  'bookmarks5',
  'bookmarks6',
  'bookmarks7',
  'bookmarks8',
  'bookmarks9',
];
