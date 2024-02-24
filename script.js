async function getSongs(){
    let get = await fetch("/songs")
    return get
}

async function main() {
    let a = await getSongs()
    let url = await a.text()
    console.log(url);
    
    
    
}

main()