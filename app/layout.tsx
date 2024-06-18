import '@app/ui/global.css'
import { anton, kanit, lusitana } from './ui/fonts';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`${kanit} ${anton}`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
//df