import {
  matcherHint,
  printReceived,
  printExpected,
  RECEIVED_COLOR as receivedColor,
  INVERTED_COLOR as invertedColor,
} from 'jest-matcher-utils';

import {Node} from '../types';

import {assertIsNode} from './utilities';

export function toContainText<Props>(
  this: jest.MatcherUtils,
  node: Node<Props>,
  text: string,
) {
  assertIsNode(node, {
    expectation: 'toContainText',
    isNot: this.isNot,
  });

  const nodeText = node.text();
  const matchIndex = nodeText.indexOf(text);
  const pass = matchIndex >= 0;

  const message = pass
    ? () =>
        `${matcherHint('.not.toContainText', node.toString())}\n\n` +
        `Expected the element:\n  ${receivedColor(node.toString())}\n` +
        `Not to contain text:\n  ${printExpected(text)}\n` +
        `But it did:\n  ${printReceivedWithHighlight(
          nodeText,
          matchIndex,
          text.length,
        )}\n`
    : () =>
        `${matcherHint('.not.toContainText', node.toString())}\n\n` +
        `Expected the element:\n  ${receivedColor(node.toString())}\n` +
        `With text content:\n  ${printReceived(nodeText)}\n` +
        `To contain string:\n  ${printExpected(text)}\n`;

  return {pass, message};
}

export function toContainHtml<Props>(
  this: jest.MatcherUtils,
  node: Node<Props>,
  text: string,
) {
  assertIsNode(node, {
    expectation: 'toContainHtml',
    isNot: this.isNot,
  });

  const nodeHtml = node.html();
  const matchIndex = nodeHtml.indexOf(text);
  const pass = matchIndex >= 0;

  const message = pass
    ? () =>
        `${matcherHint('.not.toContainHtml', node.toString())}\n\n` +
        `Expected the element:\n  ${receivedColor(node.toString())}\n` +
        `Not to contain HTML:\n  ${printExpected(text)}\n` +
        `But it did:\n  ${printReceivedWithHighlight(
          nodeHtml,
          matchIndex,
          text.length,
        )}\n`
    : () =>
        `${matcherHint('.not.toContainHtml', node.toString())}\n\n` +
        `Expected the element:\n  ${receivedColor(node.toString())}\n` +
        `With HTML content:\n  ${printReceived(nodeHtml)}\n` +
        `To contain HTML:\n  ${printExpected(text)}\n`;

  return {pass, message};
}

function printReceivedWithHighlight(
  text: string,
  start: number,
  length: number,
) {
  return receivedColor(
    `"${text.slice(0, start)}${invertedColor(
      text.slice(start, start + length),
    )}${text.slice(start + length)}"`,
  );
}
