import { useState, useEffect } from 'react';
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import BookingService from "./BookingService";
import './App.css';


function App() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    BookingService.getBookings()
      .then(bookings => setBookings(bookings));
  }, []);

  const createBooking = newBooking => {
    BookingService.addBooking(newBooking)
      .then(savedBooking => setBookings([ ...bookings, savedBooking ]));
  };

  const updateBooking = updatedBooking => {
    BookingService.updateBooking(updatedBooking);

    const updatedBookingIndex = bookings.findIndex(booking => booking._id === updatedBooking._id);
    const updatedBookings = [...bookings];
    updatedBookings[updatedBookingIndex] = updatedBooking;
    setBookings(updatedBookings);
  };

  const deleteBooking = idToDelete => {

    BookingService.deleteBooking(idToDelete);

    setBookings(bookings.filter(booking => booking._id !== idToDelete));
  }

  return (
    <div id="app">
      <BookingForm addBooking={createBooking}/>
      <BookingList 
        bookings={bookings}
        updateBooking={updateBooking}
        deleteBooking={deleteBooking}
      />
    </div>
  );
}

export default App;