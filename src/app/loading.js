export default function Loading() {
    return (
      <div style={spinnerStyle}>
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }
  
  // Inline styles for the spinner
  const spinnerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };
  
  