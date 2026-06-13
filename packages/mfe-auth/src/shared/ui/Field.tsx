import { FC, ReactNode } from 'react';
import { field, label } from '../styles';

interface FieldProps {
  label: string;
  children: ReactNode;
}

const Field: FC<FieldProps> = ({ label: labelText, children }) => (
  <div style={field}>
    <label style={label}>{labelText}</label>
    {children}
  </div>
);

export default Field;
