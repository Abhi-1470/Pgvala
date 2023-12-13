import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs"; // Import dayjs

function DatePicker({ selectedDate, setSelectedDate }) {
    const [selectedDatejs, setSelectedDatejs] = React.useState(dayjs());

  const handleDateChange = (date) => {
    console.log(date.format("dd-MM-yyyy"));
    setSelectedDatejs(date);
    setSelectedDate(date.format()); // You can use .format() to get the date as a string
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker 
        slotProps={{
          actionBar: {
            actions: [],
          },
        }}
        value={selectedDatejs}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}

export default DatePicker;
