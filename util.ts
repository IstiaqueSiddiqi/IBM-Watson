
export const cacheName = 'audio-cache';

export const getAllRequestFromCache = async () => {
    const cache = await caches.open(cacheName);
    const requestArray = await cache.keys();
    // return requestArray;

    const arrayList = [];
    for (const request of requestArray) {
        let response = await cache.match(request);
        arrayList.push({ request, response });
    }
    return arrayList;
};

export const playAudio = (buffer: ArrayBuffer) => {
    const audioCtx = new AudioContext();
    const source = audioCtx.createBufferSource(); // creates a sound source
    audioCtx.decodeAudioData(buffer, decodedData => {
        source.buffer = decodedData; // tell the source which sound to play
        source.connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
        source.start(0); // play the source now
    });
    return source;
};