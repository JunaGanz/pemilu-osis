import Link from 'next/link'
import Header from '@/app/komponen/header.js'
import Footer from '@/app/komponen/footer.js'

const  navLinks = [
    {
        name: "Pilih OSIS SMP",
        url: "/pilih-osis/smp"
    },
    {
        name: "Pilih OSIS SMK",
        url: "/pilih-osis/smk"
    },
    {
        name: "Live Count",
        url: "/live-count"
    }
]

export default function NotFound() {
    
    return (
        <>
            <div className="fixed z-10 w-[100%]">
                <Header />
                <h1 className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white sm:w-auto select-none"><marquee>Website pemilihan OSIS SMP-SMK AL-KAUTSAR Masa Bakti 2023-2024</marquee></h1>
            </div>
            <div className="pt-40">
                <h1 className="text-center font-bold text-2xl">NAVIGASI HALAMAN</h1>
                <p className="justify-center mx-6">Website ini diciptakan untuk menjembatani siswa/siswi SMP-SMK AL-KAUTSAR dalam memilih OSIS SMP-SMK AL-KAUTSAR. Silahkan klik salah satu tautan dibawah untuk melihat apa saja yang ada di website.</p>
                <div className="max-w-[313px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="p-8">
                        {navLinks.map(({ name, url }) => {
                            return (<Link className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-0.5" href={url}>{name}</Link>)
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}