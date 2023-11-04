import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Pemilihan OSIS AL-KAUTSAR Masa Bakti 2023-2024',
    description: 'Pemilihan umum Organisasi Siswa Intra Sekolah disingkat OSIS adalah sebuah organisasi yang terdiri dari para siswa yang bertujuan untuk mewakili dan memperjuangkan kepentingan siswa di dalam sekolah.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}