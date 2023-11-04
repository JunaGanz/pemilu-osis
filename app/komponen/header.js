import Image from 'next/image'
import logo_osis from '@/public/src/logo_osis.png'
import logo_ak from '@/public/src/logo_ak.png'

export default function Header() {
    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-center p-3 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <div className="-m-2 p-1.5 flex">
                        <Image className="h-20 w-auto" src={logo_osis} alt="Logo OSIS" />
                        <Image className="h-20 w-auto" src={logo_ak} alt="Logo SMK AL-KAUTSAR" />
                    </div>
                </div>
            </nav>
        </header>
    )
}