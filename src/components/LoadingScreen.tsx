import React from 'react';
import { Generating3DLoader } from './three/Generating3DLoader';

interface LoadingScreenProps {
  firstName: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ firstName }) => {
  return <Generating3DLoader firstName={firstName} />;
};

