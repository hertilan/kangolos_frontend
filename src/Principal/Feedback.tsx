import React, { useState } from 'react'
interface showFeedbackProp{
     onClose: () => void;
}

const Feedback :React.FC<showFeedbackProp>= ({onClose}) => {
      const [feedback, setFeedback] = useState('');

      const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    alert('Thank you for your feedback!');
  };
  return (
        <div className="fixed inset-0 bg-gray-600/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Submit Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 mb-4"
                rows={5}
                placeholder="Enter your feedback or suggestions..."
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default Feedback
