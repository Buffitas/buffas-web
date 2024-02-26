import React, { useState } from 'react';

const SizeDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h2>Dropdown Example</h2>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select a size:</option>
        <option value="Size S">S</option>
        <option value="Size ">M</option>
        <option value="Size L">L</option>
        <option value="Size XL">XL</option>
        {/* Add more options as needed */}
      </select>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default SizeDropdown;
