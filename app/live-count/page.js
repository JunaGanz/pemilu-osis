"use client"
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import dataStatic from '@/public/src/dataStatic.js'
import Header from '@/app/komponen/header.js'
import Footer from '@/app/komponen/footer.js'

let loadedCallback = null
let loaded = false

const Odometer = dynamic(async () => {
    const mod = await import("react-odometerjs")
    loaded = true
    if (loadedCallback != null) {
        loadedCallback()
    }
    return mod
}, {
    ssr: false,
    loading: () => 0
})

function CreateOdometer({ type, idvote }) {
    const [odometerLoaded, setOdometerLoaded] = useState(loaded)
    const [odometerValue, setOdometerValue] = useState(0)
    
    loadedCallback = () => {
        setOdometerLoaded(true)
    }

    useEffect(() => {
        if (odometerLoaded) {
            setOdometerValue(0)
        }
    }, [odometerLoaded])
    
    
    useEffect(() => {
        const refreshVote = async () => {
            const data = await (await fetch('/database', { cache: 'no-cache', method: 'GET' })).json()
            if (type === "smp") {
                setOdometerValue(data.smpCalon[idvote].dipilih)
            } else if (type === "smk") {
                setOdometerValue(data.smkCalon[idvote].dipilih)
            }
        }
        setInterval(refreshVote, 1000)
    }, [odometerValue])
    
    return (
        <Odometer
          value={odometerValue}
          format="d"
          theme="train-station"
        />
    )
}

export default function Home({ searchParams }) {
  //  let key = searchParams.key
   // if (key && key == 'vote')
   
    return (
        <>
            <div className="fixed z-10 w-[100%]">
                <Header />
                <h1 className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white sm:w-auto select-none"><marquee>Pemungutan Suara Dari Pemilihan OSIS SMP-SMK AL-KAUTSAR Masa Bakti 2023-2024</marquee></h1>
            </div>
            <div className="flex flex-wrap gap-5 pt-40">
                {Object.keys(dataStatic.smpCalon).map((noUrut) => {
                    let { ketua, wakil, visi, misi } = dataStatic.smpCalon[noUrut]
                    return (
                        <div key={noUrut} className="w-[313px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                            <div className="md:flex">
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{noUrut}</div>
                                    <div className="block mt-1 text-lg leading-tight font-medium text-black"><span className="hover:underline">{ketua}</span> & <span className="hover:underline">{wakil}</span></div>
                                    <div className="text-center">
                                        <div className="text-2xl">
                                            <CreateOdometer type="smp" idvote={noUrut} />
                                        </div>
                                        <p>Perolehan Suara</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-wrap gap-5 pt-8 border-t mt-8">
                {Object.keys(dataStatic.smkCalon).map((noUrut) => {
                    let { ketua, wakil, visi, misi } = dataStatic.smkCalon[noUrut]
                    return (
                        <div key={noUrut} className="w-[313px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                            <div className="md:flex">
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{noUrut}</div>
                                    <div className="block mt-1 text-lg leading-tight font-medium text-black"><span className="hover:underline">{ketua}</span> & <span className="hover:underline">{wakil}</span></div>
                                    <div className="text-center">
                                        <div className="text-2xl">
                                            <CreateOdometer type="smk" idvote={noUrut} />
                                        </div>
                                        <p>Perolehan Suara</p>
                                    </div>
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