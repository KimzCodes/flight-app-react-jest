import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FlightsTableView from "../components/flights/FlightsTableView/FlightsTableView";

const mockStore = configureStore([]);

it("should render table rows with Code, Capacity, Departure Date", () => {
  const records = [
    {
      id: 1,
      code: "ABC",
      capacity: 10,
      departureDate: "2023-01-01",
      img: "",
    },
    {
      id: 2,
      code: "DEF",
      capacity: 15,
      departureDate: "2023-02-01",
      img: "",
    },
  ];

  const initialState = {
    darkMode: {
      darkModeOn: true,
    },
  };

  const store = mockStore(initialState);

  const selectRecordMock = jest.fn();

  render(
    <Provider store={store}>
      <FlightsTableView
        records={records}
        startIndex={1}
        selectRecord={selectRecordMock}
      />
    </Provider>
  );

  records.forEach((record) => {
    expect(screen.getByText(record.code)).toBeInTheDocument();
    expect(screen.getByText(record.capacity.toString())).toBeInTheDocument();
    expect(screen.getByText(record.departureDate)).toBeInTheDocument();
  });
});
