import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
// imported as a connected component!
import DocCheckoutContainer from '../../src/Containers/DocCheckoutContainer';
import doc from '../../src/Reducers/Reports/doc';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();

const initialState = {
  report: {
    doc,
    docObservation: '',
  },
};

const store = mockStore(initialState);

describe('Testing StockFoodCheckoutScreen', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <DocCheckoutContainer />,
      { context: { store } },
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
