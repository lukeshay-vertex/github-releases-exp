import TestRenderer from 'react-test-renderer';

export const findDiv = (
  testInstance: TestRenderer.ReactTestInstance
): TestRenderer.ReactTestInstance =>
  testInstance.find((el) => el.type === 'div');

export const findDivs = (
  testInstance: TestRenderer.ReactTestInstance
): TestRenderer.ReactTestInstance[] =>
  testInstance.findAll((el) => el.type === 'div');
