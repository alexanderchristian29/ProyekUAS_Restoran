import { Anton, Inter, Kanit, Lusitana } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const kanit = Kanit({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
});

const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export { inter, kanit, anton, lusitana };