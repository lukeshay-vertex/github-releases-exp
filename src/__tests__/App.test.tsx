import React from 'react';
import TestRender from 'react-test-renderer';
import App from '../App';
import * as TestUtils from '../__mocks__/testUtils';

describe('App', () => {
  let testRenderer: TestRender.ReactTestRenderer;
  let testInstance: TestRender.ReactTestInstance;

  beforeEach(() => {
    testRenderer = TestRender.create(<App />);
    testInstance = testRenderer.root;
  });

  it('should render a div.', async () => {
    expect(TestUtils.findDiv(testInstance)).toBeDefined();
  });

  it('should match tree snapshot.', async () => {
    expect(testRenderer.toTree()).toMatchSnapshot();
  });

  it('should match JSON snapshot.', async () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
