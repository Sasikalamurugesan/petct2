import React, { useState } from 'react';
import DogImg from '../assets/img/dogs/dog-appointment.png';
import Swal from 'sweetalert2';
const Appointment = () => {
  // Define an array of available time slots
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  // State to store the selected date and time slot
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   
    
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Appointment Booked successfully.',
    });
  };

  return (
    <section className='bg-yellow-secondary py-12 lg:pb-12 lg:mt-32 relative min-h-[584px]'>
      <div className='container mx-auto'>
        <div>
          {}
          <div className='hidden w-full max-w-[790px] mx-auto lg:flex justify-center'>
            <img src={DogImg} alt='' />
          </div>
          <form className='bg-yellow py-8 px-6 w-full max-w-[790px] h-[500px] mx-auto lg:-mt-5 rounded-[60px] text-center flex flex-col justify-start items-center gap-y-4'>

            <h2 className='h2 my-4'>Get an appointment</h2>
            <input className='input-control' type='text' placeholder='Full name' />
            <input className='input-control' type='text' placeholder='Email address' />
            <input className='input-control' type='text' placeholder='Phone number' />

           
            <input
              className='input-control'
              type='date'
              value={selectedDate}
              onChange={handleDateChange}
            />

         
            <select
              className='input-control'
              value={selectedTimeSlot}
              onChange={handleTimeSlotChange}
            >
              <option value='' disabled>Time </option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>

            <button className='btn w-full max-w-[514px]' onClick={handleSubmit}>Send</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
