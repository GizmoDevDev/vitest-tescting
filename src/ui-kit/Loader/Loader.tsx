import clsx from 'clsx';
import React from 'react';
import './Loader.css';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize | keyof typeof LoaderSize;
  className?: string;
};

export const Loader = ({
  loading = true,
  size = LoaderSize.l,
  className,
}: LoaderProps) => {
  if (!loading) return null;
  return <div className={clsx('loader', `loader_size-${size}`, className)} />
};
