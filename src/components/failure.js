import React from 'react';

const Failure = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8d7da', // Light red background
    };

    const boxStyle = {
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        color: '#721c24', // Dark red text
    };

    const linkStyle = {
        display: 'inline-block',
        marginTop: '1rem',
        textDecoration: 'none',
        color: '#721c24',
        fontWeight: 'bold',
        border: '1px solid #721c24',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h4 style={headingStyle}>❌ Payment Failed</h4>
                <p>Something went wrong with your payment. Please try again.</p>
                <a href="/" style={linkStyle}>Back to Home</a>
            </div>
        </div>
    );
};

export default Failure;