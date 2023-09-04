import { useState, useEffect } from 'react';

const Booking = ({booking, updateBooking, deleteBooking}) => {

  const [checkedInClass, setCheckedInClass] = useState("");
  const [checkInButtonText, setCheckInButtonText] = useState("");

  useEffect(() => {
    if (booking.checked_in) {
      setCheckedInClass('checked-in');
      setCheckInButtonText('Check Out')
    } else {
      setCheckedInClass('checked-out');
      setCheckInButtonText('Check In')
    }
  }, [booking.checked_in]);

  const toggleCheckIn = () => {
    updateBooking({
      _id: booking._id,
      name: booking.name,
      email: booking.email,
      checked_in: !booking.checked_in
    });
  }

  const handleDeleteBooking = () => {
    deleteBooking(booking._id);
  }

  return (
    <div className="booking-info">
      <h3 className={checkedInClass}>{booking.name}</h3>
      <p>{booking.email}</p>
      <button onClick={toggleCheckIn}>{checkInButtonText}</button>
      <button onClick={handleDeleteBooking}>
        <span></span> Delete Booking
      </button>
    </div>
  )
};

export default Booking;