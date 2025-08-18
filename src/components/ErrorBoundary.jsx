
// --- FILE: src/components/ErrorBoundary.jsx ---
import React from "react"; // Ya importado

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de repuesto
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Algo salió mal.</h2>
          <p>Hemos sido notificados y estamos trabajando para solucionarlo.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Intentar de nuevo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
// --- END OF FILE: src/components/ErrorBoundary.jsx ---
