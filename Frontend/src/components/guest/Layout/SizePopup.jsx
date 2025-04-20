import React from 'react';
import '../../../scss/SizePopup.scss';


const SizePopup = ({ sizes, selectedSize, setShowSizePopup, handleSizeSelect }) => {
    return (
        <div className="size-popup-overlay">
            <div className="size-popup">
                <h3>Beden Seçiniz</h3>
                <div className="size-grid">
                    
                    {sizes?.map((size) => (
                        <button
                            key={size.value}
                            className={`size-btn ${selectedSize?.value === size.value ? 'selected' : ''}`}
                            onClick={() => handleSizeSelect(size)}
                        >
                            {size.value} ({size.label})
                        </button>
                    ))}
                </div>
                <button
                    className="confirm-btn"
                    onClick={() => setShowSizePopup(false)}
                >
                    Kapat
                </button>
            </div>
        </div>
    );
};

export default SizePopup;