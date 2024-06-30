
import React, { act } from 'react';
import {  render, screen } from '@testing-library/react';
import Page from '../app/page'
import fetchMock from 'jest-fetch-mock';
import { mockHotels } from '../mockdata/hotels';

jest.mock('../components/MapView', () => () => <div data-testid="component-c">Mocked map component</div>);

fetchMock.enableMocks();

describe('Home Page',  () => {
    it('Hotels displayed on load and filters are being applied', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockHotels));
        await act(async () => {
          render(<Page />);

        });
        screen.getByText('Hotel Finder');
        screen.getByText('Hoteles');
        const hotelsList = screen.getByTestId('hotels-list');
        const filter2Stars = screen.getByTestId('filter-2-Stars');

        expect(hotelsList.childNodes.length).toBe(4);
          
        await act(async () => {
          filter2Stars.click();
        });
   
        expect(hotelsList.childNodes.length).toBe(2);
    })
});