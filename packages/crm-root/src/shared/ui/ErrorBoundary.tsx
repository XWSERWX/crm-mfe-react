import { Component, ReactNode } from 'react';
import { COLORS } from '../styles';

interface Props {
  moduleName: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem', textAlign: 'center', color: COLORS.danger }}>
          <h3>Модуль «{this.props.moduleName}» недоступен</h3>
          <p style={{ color: COLORS.gray }}>Убедитесь, что MFE-сервис запущен, и обновите страницу.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
