window.addEventListener("load", main);

state = {
    todoDictionary: [],
    local_id: undefined,
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
    prevSelected: undefined
}

async function main() {
    initWelcomeSegment()
    await tryFetchCalenderInfo()
    loadLocalStorage();
    initTodoList(state.local_id);
    addEventListeners();
    createCalender();
}