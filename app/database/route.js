export async function GET(req) {
    const data = await (await fetch('https://json-server.junaganz.repl.co/', { cache: 'no-cache', method: 'GET' })).json()
    return Response.json(data)
}

export async function POST(req) {
    let { dipilih, type, kode } = await req.json()
    if (!["smp","smk"].includes(type)) return Response.json({ status: false, message: "type is not recognize" })
    const db = await (await fetch('https://json-server.junaganz.repl.co/', { cache: 'no-cache', method: 'GET' })).json()
    let indexUsed = db.kodePemilih[type].findIndex((v) => kode.trim() == v.kode.trim())
    
    if (!db.kodePemilih[type][indexUsed]) {
        return Response.json({ status: false, message: "code not found" })
    }
    
    if (db.kodePemilih[type][indexUsed].used) {
        return Response.json({ status: false, message: "code has used" })
    } 
    
    if (type == "smp") {
        let isValid = db.smpCalon[dipilih]
        if (!isValid) {
            return Response.json({ status: false, message: `calon ${type} ${dipilih} not found` })
        }
        db.smpCalon[dipilih].dipilih += 1
    } else if (type == "smk") {
        let isValid = db.smkCalon[dipilih]
        if (!isValid) {
            return Response.json({ status: false, message: `calon ${type} ${dipilih} not found` })
        }
        db.smkCalon[dipilih].dipilih += 1
    }
    
    db.kodePemilih[type][indexUsed].used = true 
    
    fetch('https://json-server.junaganz.repl.co/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(db),
    })
    
    return Response.json({ status: true, message: "passed" })
}