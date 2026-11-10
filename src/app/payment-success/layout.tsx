import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Payment Confirmation — ChatDocket',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PaymentSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

