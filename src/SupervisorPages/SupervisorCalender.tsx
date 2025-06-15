import React, { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import AddEvent from './AddEvent';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location?: string;
  description?: string;
  client?: string;
}

const SupervisorCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Team Meeting', date: new Date(2023, 5, 15), time: '10:00 AM', location: 'Conference Room A' },
    { id: 2, title: 'Project Deadline', date: new Date(2023, 5, 20), time: '11:59 PM', description: 'Submit final report' },
    { id: 3, title: 'Client Call', date: new Date(2023, 5, 22), time: '2:30 PM', client: 'ABC Corp' },
  ]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  // Modal handlers
  const openAddEventModal = () => {
    setShowAddEventModal(true);
  };

  const closeAddEventModal = () => {
    setShowAddEventModal(false);
  };

  const handleAddEvent = (newEventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      id: Date.now(),
      ...newEventData
    };
    setEvents([...events, newEvent]);
    closeAddEventModal();
  };

  // Calendar navigation
  const nextMonth = () => setCurrentDate(addDays(endOfMonth(currentDate), 1));
  const prevMonth = () => setCurrentDate(addDays(startOfMonth(currentDate), -1));

  // Calendar rendering
  const header = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    );
  };

  const daysOfWeek = () => {
    const startDate = startOfWeek(currentDate);
    return (
      <div className="grid grid-cols-7 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="text-center font-medium text-gray-500 py-2">
            {format(addDays(startDate, i), 'EEE')}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dayEvents = events.filter(event => isSameDay(event.date, day));
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);

        days.push(
          <div
            key={day.toString()}
            className={`min-h-24 p-2 border border-gray-200 ${
              !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white hover:bg-gray-50'
            } ${isSelected ? 'bg-indigo-50 border-indigo-300' : ''}`}
            onClick={() => setSelectedDate(day)}
          >
            <div className="flex justify-between">
              <span className={`text-sm ${
                isToday ? 'bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
              }`}>
                {format(day, 'd')}
              </span>
              {isToday && !isSelected && (
                <span className="h-2 w-2 bg-indigo-600 rounded-full"></span>
              )}
            </div>
            <div className="mt-1 space-y-1 max-h-20 overflow-y-auto">
              {dayEvents.map(event => (
                <div 
                  key={event.id} 
                  className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate"
                  onClick={(e) => e.stopPropagation()}
                >
                  {event.time} - {event.title}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  const selectedDateEvents = events.filter(event => isSameDay(event.date, selectedDate));

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Calendar</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        {header()}
        {daysOfWeek()}
        {renderCells()}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Events for {format(selectedDate, 'MMMM d, yyyy')}
        </h3>
        
        {selectedDateEvents.length > 0 ? (
          <div className="space-y-4">
            {selectedDateEvents.map(event => (
              <div key={event.id} className="border-l-4 border-indigo-500 pl-4 py-2">
                <h4 className="font-medium text-gray-800">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.time}</p>
                {event.location && (
                  <p className="text-sm text-gray-600 mt-1">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </p>
                )}
                {event.description && (
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                )}
                {event.client && (
                  <p className="text-sm text-gray-600 mt-1">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Client: {event.client}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No events scheduled for this day.</p>
        )}
      </div>

      {/* Add Event Button */}
      <button 
        onClick={openAddEventModal}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-gray-600/60 flex items-center justify-center p-4 z-50">
          <AddEvent
            initialDate={selectedDate}
            onSave={handleAddEvent}
            onCancel={closeAddEventModal}
          />
        </div>
      )}
    </div>
  );
};

export default SupervisorCalendar;