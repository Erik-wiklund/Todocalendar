window.addEventListener("load", main);

async function main() {
    initWelcomeSegment()
    await tryFetchCalenderInfo()
    loadLocalStorage();
    initTodoList(local_id);
    addEventListeners();
    createCalender();
}