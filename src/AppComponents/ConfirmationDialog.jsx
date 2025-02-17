import React from "react";

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-gray-900">
        <h3 className="text-xl font-semibold mb-4">{message}</h3>
        <div className="flex justify-between mt-4">
          <button
            onClick={onConfirm}
            className="p-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="p-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
