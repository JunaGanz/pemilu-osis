"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Image from 'next/image'
import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Carousel } from 'react-responsive-carousel'
import dataStatic from '@/public/src/dataStatic.js'
import Header from '@/app/komponen/header.js'
import Footer from '@/app/komponen/footer.js'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Vote() {
    const [isPassed, setIsPassed] = useState(false)
    const [open, setOpen] = useState(false)
    const [textAlert, setTextAlert] = useState('')
    const [loading, setLoading] = useState(false)
    const [noUrutDipilih, setNoUrutDipilih] = useState('')
    const cancelButtonRef = useRef(null)
    const cancelButtonRef2 = useRef(null)
    
    const Alertt = ({ text }) => (<p className="text-sm text-red-600">{text}</p>)
    
    const voteCalon = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data =  new FormData(e.target)
        const kode = data.get("kode-pemilih").trim()
        const type = "smk"
        
        try {
            const res = await (await fetch('/database', { cache: 'no-cache', method: 'POST', body: JSON.stringify({ dipilih: noUrutDipilih, type, kode }) })).json()
            
            if (!res.status && res.message == `calon ${type} ${noUrutDipilih} not found`) {
                setLoading(false)
                document.getElementById("kode").value = ""
                setTextAlert(`Calon OSIS ${type.toUpperCase()} dengan No. Urut ${noUrutDipilih} tidak ditemukan!`)
            } else if (!res.status && res.message == "type is not recognize") {
                setLoading(false)
                document.getElementById("kode").value = ""
                setTextAlert(`Ada kesalahan dalam hal ini! silahkan hubungi developer untuk perbaiki`)
            } else if (!res.status && res.message == "code not found") {
                setLoading(false)
                document.getElementById("kode").value = ""
                setTextAlert(`${data.get("kode-pemilih").trim()} adalah kode yang tidak valid! Masukkan kode yang valid.`)
            } else if (!res.status && res.message == "code has used") {
                setLoading(false)
                document.getElementById("kode").value = ""
                setTextAlert(`${data.get("kode-pemilih").trim()} adalah kode yang sudah digunakan untuk vote! Masukkan kode lain.`)
            } else if (res.status && res.message == "passed") {
                setOpen(false)
                setLoading(false)
                document.getElementById("kode").value = ""
                setTimeout(() => setIsPassed(true), 300)
            }
        } catch {
            setLoading(false)
            setTextAlert(`Ada yang salah! coba lagi...`)
        }
    }
    
    const batalVote = () => {
        setOpen(false)
        setTimeout(() => {
            setLoading(false)
            setIsPassed(false)
            setNoUrutDipilih('')
            setTextAlert('')
        }, 300)
    }
    
    const passedVote = () => {
        setIsPassed(false)
        setTimeout(() => {
            setOpen(false)
            setLoading(false)
            setNoUrutDipilih('')
            setTextAlert('')
        }, 300)
    }
    
    const openPilih = (dipilih) => {
        setOpen(true)
        setNoUrutDipilih(dipilih)
    }
    
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => { return }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <form onSubmit={voteCalon}>
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <ExclamationTriangleIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title as="h3" className="text-base font-bold leading-6 text-gray-900">Masukkan Kode Pemilih</Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-black-500">Catatan: Untuk memilih {noUrutDipilih ? <span><span className="font-bold text-black">No. Urut {noUrutDipilih}</span> sebagai <span className="font-bold text-black">OSIS SMK AL-KAUTSAR </span></span> : ''}pastikan anda sudah punya kode pemilih valid yang telah panitia berikan.</p>
                                                        <input id="kode" className="rounded-md" name="kode-pemilih" placeholder="masukkan disini..." required/>
                                                        <Alertt text={textAlert} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            {loading ? <div className="inline-flex w-full justify-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"><svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/><span className="sr-only">Loading...</span></svg></div> : ''}
                                            <button
                                                type="submit"
                                                className={classNames(loading ? "hidden" : "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto")}
                                            >
                                                Lanjut
                                            </button>
                                            <button
                                                type="button"
                                                className={classNames(loading ? "hidden" : "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto")}
                                                onClick={batalVote}
                                                ref={cancelButtonRef}
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={isPassed} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef2} onClose={passedVote}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-bold leading-6 text-gray-900">Berhasil Memilih</Dialog.Title>
                                                <div className="mt-2">
                                                    {noUrutDipilih ? function (){
                                                        let { ketua, wakil, visi, misi, image } = dataStatic.smkCalon[noUrutDipilih]
                                                        return (<p className="text-sm text-black-500">Selamat anda telah berhasil memilih <span className="font-bold text-black">No. Urut {noUrutDipilih} {ketua} & {wakil}</span> sebagai <span className="font-bold text-black">OSIS SMK AL-KAUTSAR</span> nanti. Kalau sudah memilih silahkan lihat perhitungan suara secara live ya!!</p>)
                                                    }() : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={passedVote}
                                            ref={cancelButtonRef2}
                                        >
                                            Keluar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="fixed z-10 w-[100%]">
                <Header />
                <h1 className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white sm:w-auto select-none"><marquee>Pemilihan OSIS SMK AL-KAUTSAR Masa Bakti 2023-2024</marquee></h1>
            </div>
            <div className="flex flex-wrap gap-5 pt-40">
                {Object.keys(dataStatic.smkCalon).map((noUrut) => {
                    let { ketua, wakil, visi, misi, image } = dataStatic.smkCalon[noUrut]
                    return (
                        <div key={noUrut} className="max-w-[313px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                            <div className="md:flex">
                                <div className="md:shrink-0">
                                    <Carousel
                                        autoPlay={true}
                                        infiniteLoop={true}
                                        showThumbs={false}
                                        showStatus={false}
                                        showArrows={false}
                                        showIndicators={false}
                                    >
                                        {image.map((url, i) => {
                                            let titleImg = `${ketua} & ${wakil} Image ${i+1}`
                                            return (<Image className="h-100 w-full object-cover md:h-full md:w-50 bg-indigo-600" src={url} alt={titleImg} placeholder="blur" />)
                                        })}
                                    </Carousel>
                                </div>
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{noUrut}</div>
                                    <div className="block mt-1 text-lg leading-tight font-medium text-black"><span className="hover:underline">{ketua}</span> & <span className="hover:underline">{wakil}</span></div>
                                    <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" closed>
                                        <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
                                            Visi & Misi
                                        </summary>
                                        <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Visi</div>
                                            {visi.split('\n').map((v, i) => {
                                                return (<p key={i+1} className="italic">"{v}"</p>)
                                            })}
                                            <br/>
                                            <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Misi</div>
                                            {misi.split('\n').map((v, i) => {
                                                return (<p key={i+1}><span className="text-bold text-black">{i+1}. </span>{v}</p>)
                                            })}
                                        </div>
                                    </details>
                                    <p className="mt-2 text-slate-500">Catatan: Pilihlah sesuai dengan hati nurani dan kepercayaan kalian.</p>
                                    <button onClick={() => openPilih(noUrut)} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Pilih</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Footer />
        </>
    )
}