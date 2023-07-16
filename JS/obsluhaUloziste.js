export function nacistZLocalStorage() {
    return JSON.parse(localStorage.getItem('pojistenci')) || [];
}

export function ulozDoLocalStorage(pojistenci) {
    localStorage.setItem('pojistenci', JSON.stringify(pojistenci));
}