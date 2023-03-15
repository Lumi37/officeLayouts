let lastRequestTime = null

export function timerForNextRequest(e){
    if(!lastRequestTime)
        lastRequestTime = Date.now()
    const dateTimeNow = Date.now()
    console.log(Math.floor((dateTimeNow - lastRequestTime) / 1000))
    
}