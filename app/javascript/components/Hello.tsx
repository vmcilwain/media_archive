// app/javascript/components/Hello.tsx
import React from 'react';

interface Props {
  name: string;
}

const Hello: React.FC<Props> = ({ name }) => <h1>Hello {name}!</h1>;

export default Hello;
