import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import dayjs from "dayjs";


function TimePicker({ selectedTime, setSelectedTime }) {
  const [selectedTimejs, setSelectedTimejs] = React.useState(
    dayjs(selectedTime)
  );
  const handleTimeChange = (time) => {
    setSelectedTimejs(time); // Update the local state
    console.log(time.format("HH:mm"));
    // Pass the selected time back to the parent component
    setSelectedTime(time.format("HH:mm")); // You can use .format() to get the time as a string
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticTimePicker
        value={selectedTimejs}
        slotProps={{
          actionBar: {
            actions: [],
          },
        }}
        onChange={handleTimeChange}
      />
    </LocalizationProvider>
  );
}

export default TimePicker;
